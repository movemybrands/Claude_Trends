'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { FinancialInputs, MeadCalculations, AiAnalysis, Analysis } from '@/lib/types'
import ScoreCard from '@/components/ScoreCard'
import ModuleCard from '@/components/ModuleCard'
import RoceDecomposition from '@/components/RoceDecomposition'
import ValuationBridge from '@/components/ValuationBridge'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PrefetchData {
  inputs: FinancialInputs
  dataGaps: string[]
}

interface AnalyzeResponse {
  calculations: MeadCalculations
  aiAnalysis: AiAnalysis | null
  error?: string
}

// ─── Helper components ────────────────────────────────────────────────────────

function fmt(n: number | null | undefined, prefix = '', suffix = '', decimals = 1): string {
  if (n === null || n === undefined) return '—'
  const abs = Math.abs(n)
  let s: string
  if (abs >= 1e9) s = (n / 1e9).toFixed(decimals) + 'B'
  else if (abs >= 1e6) s = (n / 1e6).toFixed(decimals) + 'M'
  else if (abs >= 1e3) s = (n / 1e3).toFixed(decimals) + 'K'
  else s = n.toFixed(decimals)
  return `${prefix}${s}${suffix}`
}

function Num({ value, prefix = '', suffix = '', decimals = 1, colorize = false }: {
  value: number | null | undefined
  prefix?: string
  suffix?: string
  decimals?: number
  colorize?: boolean
}) {
  const text = fmt(value, prefix, suffix, decimals)
  if (colorize && value !== null && value !== undefined) {
    const color = value >= 0 ? 'text-green' : 'text-red'
    return <span className={`font-mono ${color}`}>{text}</span>
  }
  return <span className="font-mono text-text-primary">{text}</span>
}

function Row({ label, value, note }: { label: string; value: React.ReactNode; note?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
      <span className="text-text-secondary text-sm">{label}</span>
      <div className="flex items-center gap-3">
        {note && <span className="text-text-muted text-xs">{note}</span>}
        <span className="text-sm">{value}</span>
      </div>
    </div>
  )
}

function DataGapsBanner({ gaps, ticker }: { gaps: string[]; ticker: string }) {
  const manualGaps = gaps.filter((g) => g.includes('manual entry') || g.includes('qualitative'))
  if (manualGaps.length === 0) return null
  return (
    <div className="bg-yellow/10 border border-yellow/40 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-yellow font-mono text-sm font-medium mb-1">Data Gaps Detected</p>
          <p className="text-text-secondary text-xs mb-2">
            The following fields need manual entry for a complete analysis:
          </p>
          <ul className="space-y-0.5">
            {manualGaps.slice(0, 5).map((g) => (
              <li key={g} className="text-text-muted text-xs font-mono">· {g}</li>
            ))}
            {manualGaps.length > 5 && (
              <li className="text-text-muted text-xs font-mono">· …and {manualGaps.length - 5} more</li>
            )}
          </ul>
        </div>
        <Link
          href={`/analyze/${ticker}/edit`}
          className="shrink-0 bg-yellow/20 hover:bg-yellow/30 border border-yellow/40 text-yellow text-xs font-mono px-3 py-1.5 rounded transition-colors"
        >
          Edit Data →
        </Link>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyzePage() {
  const params = useParams()
  const router = useRouter()
  const ticker = (params.ticker as string).toUpperCase()

  const [inputs, setInputs] = useState<FinancialInputs | null>(null)
  const [calculations, setCalculations] = useState<MeadCalculations | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysis | null>(null)
  const [dataGaps, setDataGaps] = useState<string[]>([])
  const [savedId, setSavedId] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isRerunning, setIsRerunning] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // ─── Load data ──────────────────────────────────────────────────────────────

  const runAnalysis = useCallback(async (inp: FinancialInputs) => {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: inp }),
    })
    const data = await res.json() as AnalyzeResponse
    if (data.calculations) {
      setCalculations(data.calculations)
      setAiAnalysis(data.aiAnalysis)
    }
    return data
  }, [])

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      setError(null)

      // 1. Check if we came from the dashboard with prefetched data
      const prefetchKey = `prefetch_${ticker}`
      const prefetchRaw = sessionStorage.getItem(prefetchKey)

      if (prefetchRaw) {
        sessionStorage.removeItem(prefetchKey)
        try {
          const prefetch = JSON.parse(prefetchRaw) as PrefetchData
          setInputs(prefetch.inputs)
          setDataGaps(prefetch.dataGaps ?? [])
          await runAnalysis(prefetch.inputs)
          setIsLoading(false)
          return
        } catch {
          // Fall through to other methods
        }
      }

      // 2. Check saved analyses
      try {
        const savedRes = await fetch('/api/analyses')
        const savedData = await savedRes.json() as Analysis[]
        if (Array.isArray(savedData)) {
          const match = savedData.find((a) => a.inputs.ticker === ticker)
          if (match) {
            setInputs(match.inputs)
            setCalculations(match.calculations)
            setAiAnalysis(match.aiAnalysis)
            setSavedId(match.id)
            setIsLoading(false)
            return
          }
        }
      } catch {
        // Fall through
      }

      // 3. Fetch fresh from FMP
      try {
        const fmpRes = await fetch('/api/financials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticker }),
        })
        const fmpData = await fmpRes.json() as { inputs?: FinancialInputs; dataGaps?: string[]; error?: string }

        if (!fmpRes.ok || fmpData.error) {
          setError(fmpData.error ?? 'Failed to fetch financial data.')
          setIsLoading(false)
          return
        }

        const inp = fmpData.inputs!
        setInputs(inp)
        setDataGaps(fmpData.dataGaps ?? [])
        await runAnalysis(inp)
      } catch {
        setError('Failed to load data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    void load()
  }, [ticker, runAnalysis])

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async function handleSave() {
    if (!inputs || !calculations) return
    setIsSaving(true)
    try {
      if (savedId) {
        await fetch('/api/analyses', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: savedId, updates: { inputs, calculations, aiAnalysis } }),
        })
      } else {
        const res = await fetch('/api/analyses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputs, calculations, aiAnalysis, notes: '' }),
        })
        const data = await res.json() as Analysis
        setSavedId(data.id)
      }
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch {
      // silent
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!savedId) return
    setIsDeleting(true)
    try {
      await fetch('/api/analyses', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: savedId }),
      })
      router.push('/')
    } catch {
      setIsDeleting(false)
    }
  }

  async function handleRerunAI() {
    if (!inputs) return
    setIsRerunning(true)
    try {
      await runAnalysis(inputs)
      if (savedId && calculations) {
        await fetch('/api/analyses', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: savedId, updates: { aiAnalysis } }),
        })
      }
    } finally {
      setIsRerunning(false)
    }
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-accent text-lg mb-2">Analysing {ticker}…</div>
          <div className="text-text-muted text-sm">Fetching data and running Mead calculations</div>
        </div>
      </main>
    )
  }

  if (error || !inputs || !calculations) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red font-mono text-lg mb-2">Error</div>
          <div className="text-text-secondary text-sm mb-6">{error ?? 'Could not load analysis.'}</div>
          <Link href="/" className="text-accent hover:underline font-mono text-sm">← Back to Dashboard</Link>
        </div>
      </main>
    )
  }

  const c = calculations
  const inp = inputs
  const currency = inp.currency === 'USD' ? '$' : inp.currency + ' '

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/" className="text-text-muted text-xs hover:text-accent font-mono">
              ← Dashboard
            </Link>
            <div className="flex items-baseline gap-3 mt-1">
              <h1 className="font-serif text-2xl text-text-primary">{inp.companyName}</h1>
              <span className="font-mono text-accent text-sm">{inp.ticker}</span>
              <span className="text-text-muted text-xs font-mono">FY{inp.fiscalYear}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-2xl text-text-primary">{currency}{inp.stockPrice.toFixed(2)}</div>
            <div className="text-text-muted text-xs font-mono">{inp.currency} · {inp.sharesOutstanding.toFixed(1)}M shares</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Data gaps banner */}
        <DataGapsBanner gaps={dataGaps} ticker={ticker} />

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar — score card */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-6">
              <ScoreCard
                calculations={c}
                ticker={ticker}
                onSave={handleSave}
                onDelete={handleDelete}
                onRerunAI={handleRerunAI}
                isSaving={isSaving}
                isDeleting={isDeleting}
                isRerunning={isRerunning}
                isSaved={!!savedId || saveSuccess}
              />
            </div>
          </aside>

          {/* Module cards */}
          <div className="flex-1 space-y-5">

            {/* Module 1: Capital Employed & ROCE */}
            <ModuleCard
              title="Capital Employed & ROCE"
              moduleNumber={1}
              score={c.scores.roceLevel + c.scores.cyclicalityDiscount + c.scores.goodwillDrag}
              maxScore={40}
              aiField="roceInterpretation"
              aiAnalysis={aiAnalysis}
            >
              <RoceDecomposition inputs={inp} calculations={c} />
            </ModuleCard>

            {/* Module 2: Owner Earnings */}
            <ModuleCard
              title="Owner Earnings"
              moduleNumber={2}
              score={c.scores.ownerEarningsQuality}
              maxScore={10}
              aiField="ownerEarningsInterpretation"
              aiAnalysis={aiAnalysis}
            >
              <div className="space-y-4">
                {/* Asset intensity */}
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-text-muted">Asset Intensity:</span>
                  <span className="font-mono text-text-primary">{c.assetIntensity.toFixed(2)}</span>
                  <span className="text-text-muted text-xs">
                    ({c.assetIntensity > 0.4 ? 'High — capex est. 65%' : c.assetIntensity > 0.15 ? 'Medium — capex est. 50%' : 'Low — capex est. 35%'})
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                    inp.maintenanceCapexSource === 'confirmed'
                      ? 'bg-green/20 text-green border border-green/40'
                      : 'bg-yellow/20 text-yellow border border-yellow/40'
                  }`}>
                    {inp.maintenanceCapexSource}
                  </span>
                </div>

                {/* OE table */}
                <div>
                  <Row
                    label="Net Income (Consolidated)"
                    value={<Num value={inp.netIncome} prefix={currency} />}
                  />
                  {inp.minorityInterest !== 0 && (
                    <Row
                      label="Net Income to Common (Attributable)"
                      value={<Num value={inp.netIncomeToCommon} prefix={currency} />}
                      note="after minority"
                    />
                  )}
                  <Row label="+ Depreciation & Amortisation" value={<Num value={inp.depreciation} prefix={currency} />} />
                  <Row
                    label={`– Maintenance CapEx (${inp.maintenanceCapexSource})`}
                    value={<Num value={inp.maintenanceCapex} prefix={currency} />}
                  />
                  <Row
                    label="= Owner Earnings (Consolidated)"
                    value={<Num value={c.ownerEarningsConsolidated} prefix={currency} colorize />}
                  />
                  {inp.minorityInterest !== 0 && (
                    <Row
                      label="= Owner Earnings (Attributable)"
                      value={<Num value={c.ownerEarningsAttributable} prefix={currency} colorize />}
                    />
                  )}
                  <Row label="OE / Share" value={<Num value={c.ownerEarningsPerShare} prefix={currency} />} />
                  <Row label="OE / Net Income Ratio" value={<Num value={c.oeToNiRatio} suffix="%" />} />
                  <Row label="Growth CapEx" value={<Num value={c.growthCapex} prefix={currency} />} />
                  <Row label="Free Cash Flow (NOPAT basis)" value={<Num value={c.freeCashFlow} prefix={currency} colorize />} />
                </div>

                {/* Growth vs harvest */}
                <div className={`p-3 rounded-md text-sm font-mono ${
                  c.growthCapex > 0
                    ? 'bg-green/10 border border-green/30 text-green'
                    : 'bg-yellow/10 border border-yellow/30 text-yellow'
                }`}>
                  {c.growthCapex > 0
                    ? `Growth mode — ${currency}${fmt(c.growthCapex).replace(currency, '')} allocated to expansion`
                    : 'Harvest mode — no growth capex detected'}
                </div>
              </div>
            </ModuleCard>

            {/* Module 3: Moat Assessment */}
            <ModuleCard
              title="Moat Assessment"
              moduleNumber={3}
              score={c.scores.moat}
              maxScore={10}
              aiField="moatAssessment"
              aiAnalysis={aiAnalysis}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-muted text-xs font-mono mb-2 uppercase">Moat Sources</p>
                    <div className="font-mono text-2xl text-text-primary">{inp.moatTypes}</div>
                    <p className="text-text-muted text-xs">distinct moat types identified</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs font-mono mb-2 uppercase">Durability</p>
                    <span className={`inline-block px-2 py-1 rounded text-sm font-mono ${
                      inp.moatDurability === 'widening'
                        ? 'bg-green/20 text-green border border-green/40'
                        : inp.moatDurability === 'stable'
                        ? 'bg-accent/20 text-accent border border-accent/40'
                        : 'bg-red/20 text-red border border-red/40'
                    }`}>
                      {inp.moatDurability}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-text-muted text-xs font-mono mb-2 uppercase">Cyclicality</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-mono ${
                    inp.cyclicalityFlag === 'stable'
                      ? 'bg-green/20 text-green border border-green/40'
                      : inp.cyclicalityFlag === 'moderate'
                      ? 'bg-yellow/20 text-yellow border border-yellow/40'
                      : 'bg-red/20 text-red border border-red/40'
                  }`}>
                    {inp.cyclicalityFlag.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-text-muted text-xs">
                  Complete moat analysis requires manual qualitative assessment on the Edit Data page.
                  Set moat type count (0–3) and durability to update the score.
                </p>
              </div>
            </ModuleCard>

            {/* Module 4: Management & Capital Allocation */}
            <ModuleCard
              title="Management & Capital Allocation"
              moduleNumber={4}
              score={c.scores.dollarTest + c.scores.shareCountTrend + c.scores.managementAccounting}
              maxScore={30}
              aiField="managementAssessment"
              aiAnalysis={aiAnalysis}
            >
              <div className="space-y-4">
                {/* $1 test */}
                <div>
                  <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">$1 Test (5-Year)</h3>
                  <Row label="Retained Earnings (5yr sum)" value={<Num value={inp.retainedEarnings5yr} prefix={currency} />} />
                  <Row label="Market Cap 5yr Ago" value={<Num value={inp.marketCap5yrAgo} prefix={currency} />} />
                  <Row label="Market Cap Now" value={<Num value={inp.marketCapNow} prefix={currency} />} />
                  <Row label="Market Value Created" value={<Num value={c.marketValueCreated} prefix={currency} colorize />} />
                  <Row
                    label="Dollar Test (Value Created per $1 Retained)"
                    value={
                      c.dollarTest !== null
                        ? <span className={`font-mono ${c.dollarTest >= 1 ? 'text-green' : 'text-red'}`}>
                            {c.dollarTest.toFixed(2)}x
                          </span>
                        : <span className="font-mono text-text-muted">—</span>
                    }
                  />
                </div>

                {/* Share count */}
                <div>
                  <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Share Count Trend</h3>
                  <Row label="Shares 5yr Ago" value={<Num value={inp.sharesOutstanding5yrAgo} suffix="M" />} />
                  <Row label="Shares Now" value={<Num value={inp.sharesOutstanding} suffix="M" />} />
                  <Row
                    label="Change"
                    value={
                      c.shareCountChange !== null
                        ? <span className={`font-mono ${c.shareCountChange <= 0 ? 'text-green' : 'text-red'}`}>
                            {c.shareCountChange > 0 ? '+' : ''}{c.shareCountChange.toFixed(1)}%
                          </span>
                        : <span className="font-mono text-text-muted">—</span>
                    }
                  />
                </div>

                {/* Capital allocation grid */}
                <div>
                  <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Capital Allocation Framework</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Orientation', value: inp.managementOrientation.replace('_', ' ') },
                      { label: 'Debt Discipline', value: inp.debtDiscipline },
                      { label: 'Accounting Quality', value: inp.accountingQuality },
                    ].map((item) => (
                      <div key={item.label} className="bg-surface-alt rounded p-2 text-center">
                        <p className="text-text-muted text-xs mb-1">{item.label}</p>
                        <p className="font-mono text-text-primary text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ModuleCard>

            {/* Module 5: Balance Sheet Health */}
            <ModuleCard
              title="Balance Sheet Health"
              moduleNumber={5}
              score={c.scores.debtDiscipline}
              maxScore={10}
              aiField="balanceSheetAssessment"
              aiAnalysis={aiAnalysis}
            >
              <div className="space-y-4">
                {/* Net debt */}
                <div>
                  <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Leverage</h3>
                  <Row label="Total Debt" value={<Num value={inp.totalDebt} prefix={currency} />} />
                  <Row label="Cash" value={<Num value={inp.cash} prefix={currency} />} />
                  <Row label="Net Debt" value={<Num value={c.netDebt} prefix={currency} colorize />} />
                  <div className="flex gap-6 mt-2">
                    <div>
                      <p className="text-text-muted text-xs mb-1">Net Debt / EBIT (Current)</p>
                      <p className={`font-mono text-lg ${Math.abs(c.netDebtToEbitCurrent) <= 2 ? 'text-green' : Math.abs(c.netDebtToEbitCurrent) <= 3 ? 'text-yellow' : 'text-red'}`}>
                        {c.netDebtToEbitCurrent.toFixed(1)}x
                      </p>
                    </div>
                    {c.netDebtToEbitTrough !== null && (
                      <div>
                        <p className="text-text-muted text-xs mb-1">Net Debt / EBIT (Trough) ⚠</p>
                        <p className={`font-mono text-lg ${Math.abs(c.netDebtToEbitTrough) <= 2 ? 'text-green' : 'text-yellow'}`}>
                          {c.netDebtToEbitTrough.toFixed(1)}x
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Book value */}
                <div>
                  <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Book Value</h3>
                  <Row label="Book Value / Share" value={<Num value={c.bookValuePerShare} prefix={currency} />} />
                  <Row label="Tangible Book / Share" value={<Num value={c.tangibleBookPerShare} prefix={currency} />} />
                  <Row label="Price / Book" value={c.priceToBook !== null ? <span className="font-mono text-text-primary">{c.priceToBook.toFixed(1)}x</span> : <span className="font-mono text-text-muted">—</span>} />
                  <Row label="Price / Tangible Book" value={c.priceToTangibleBook !== null ? <span className="font-mono text-text-primary">{c.priceToTangibleBook.toFixed(1)}x</span> : <span className="font-mono text-text-muted">—</span>} />
                </div>

                {/* Quality flags */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-surface-alt rounded p-2">
                    <p className="text-text-muted text-xs mb-1">Goodwill & Intangibles</p>
                    <p className="font-mono text-text-primary text-sm">{currency}{fmt(inp.goodwillAndIntangibles)}</p>
                    <p className="text-text-muted text-xs">
                      {inp.totalAssets > 0
                        ? `${((inp.goodwillAndIntangibles / inp.totalAssets) * 100).toFixed(0)}% of assets`
                        : '—'}
                    </p>
                  </div>
                  <div className="bg-surface-alt rounded p-2">
                    <p className="text-text-muted text-xs mb-1">Accounting Quality</p>
                    <p className={`font-mono text-sm ${
                      inp.accountingQuality === 'conservative' ? 'text-green'
                      : inp.accountingQuality === 'standard' ? 'text-text-primary'
                      : 'text-red'
                    }`}>
                      {inp.accountingQuality}
                    </p>
                  </div>
                </div>
              </div>
            </ModuleCard>

            {/* Module 6: Valuation Bridge */}
            <ModuleCard
              title="Valuation Bridge"
              moduleNumber={6}
              score={0}
              maxScore={0}
              aiField="valuationAssessment"
              aiAnalysis={aiAnalysis}
            >
              <ValuationBridge inputs={inp} calculations={c} />
            </ModuleCard>

            {/* AI Verdict */}
            {aiAnalysis && (
              <div className="bg-surface border border-accent/30 rounded-lg p-5">
                <h2 className="font-serif text-lg text-text-primary mb-3">AI Verdict</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{aiAnalysis.verdict}</p>
                {aiAnalysis.keyRisks && aiAnalysis.keyRisks.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Key Research Questions</h3>
                    <ul className="space-y-1.5">
                      {aiAnalysis.keyRisks.map((risk, i) => (
                        <li key={i} className="text-sm text-text-secondary flex gap-2">
                          <span className="text-accent font-mono text-xs shrink-0 mt-0.5">{i + 1}.</span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  )
}
