'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { FinancialInputs, Analysis, MeadCalculations, AiAnalysis } from '@/lib/types'

// ─── Form field components ────────────────────────────────────────────────────

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  )
}

function NumField({
  label,
  field,
  value,
  onChange,
  note,
  fmp = false,
  required = false,
  step = '1',
  min,
}: {
  label: string
  field: keyof FinancialInputs
  value: number
  onChange: (field: keyof FinancialInputs, value: number) => void
  note?: string
  fmp?: boolean
  required?: boolean
  step?: string
  min?: string
}) {
  return (
    <div className={`rounded-md p-3 ${required ? 'border border-yellow/40 bg-yellow/5' : 'bg-surface-alt'}`}>
      <div className="flex items-center justify-between mb-1">
        <label className="text-text-secondary text-sm">{label}</label>
        <div className="flex items-center gap-2">
          {fmp && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-accent/20 text-accent border border-accent/30 font-mono">
              FMP
            </span>
          )}
          {required && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-yellow/20 text-yellow border border-yellow/30 font-mono">
              Required
            </span>
          )}
        </div>
      </div>
      {note && <p className="text-text-muted text-xs mb-2">{note}</p>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(field, parseFloat(e.target.value) || 0)}
        step={step}
        min={min}
        className="w-full bg-surface border border-border rounded px-3 py-1.5 text-text-primary font-mono text-sm focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  )
}

function SelectField<T extends string>({
  label,
  field,
  value,
  options,
  onChange,
  note,
  required = false,
}: {
  label: string
  field: keyof FinancialInputs
  value: T
  options: { value: T; label: string }[]
  onChange: (field: keyof FinancialInputs, value: T) => void
  note?: string
  required?: boolean
}) {
  return (
    <div className={`rounded-md p-3 ${required ? 'border border-yellow/40 bg-yellow/5' : 'bg-surface-alt'}`}>
      <div className="flex items-center justify-between mb-1">
        <label className="text-text-secondary text-sm">{label}</label>
        {required && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-yellow/20 text-yellow border border-yellow/30 font-mono">
            Required
          </span>
        )}
      </div>
      {note && <p className="text-text-muted text-xs mb-2">{note}</p>}
      <select
        value={value}
        onChange={(e) => onChange(field, e.target.value as T)}
        className="w-full bg-surface border border-border rounded px-3 py-1.5 text-text-primary font-mono text-sm focus:outline-none focus:border-accent transition-colors"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

// ─── Default inputs ───────────────────────────────────────────────────────────

function defaultInputs(ticker: string): FinancialInputs {
  return {
    ticker,
    companyName: ticker,
    fiscalYear: new Date().getFullYear() - 1,
    currency: 'USD',
    revenue: 0,
    ebit: 0,
    netIncome: 0,
    netIncomeToCommon: 0,
    minorityInterest: 0,
    depreciation: 0,
    totalCapex: 0,
    effectiveTaxRate: 0.25,
    totalAssets: 0,
    cash: 0,
    goodwillAndIntangibles: 0,
    totalCurrentLiabilities: 0,
    shortTermDebt: 0,
    totalDebt: 0,
    totalEquity: 0,
    minorityEquity: 0,
    netPPE: 0,
    sharesOutstanding: 0,
    stockPrice: 0,
    requiredReturn: 10,
    sharesOutstanding5yrAgo: 0,
    retainedEarnings5yr: 0,
    marketCap5yrAgo: 0,
    marketCapNow: 0,
    troughEbit: 0,
    troughYear: 0,
    maintenanceCapex: 0,
    maintenanceCapexSource: 'estimated',
    moatTypes: 0,
    moatDurability: 'stable',
    cyclicalityFlag: 'stable',
    managementOrientation: 'mixed',
    debtDiscipline: 'moderate',
    accountingQuality: 'standard',
  }
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EditPage() {
  const params = useParams()
  const router = useRouter()
  const ticker = (params.ticker as string).toUpperCase()

  const [inputs, setInputs] = useState<FinancialInputs>(defaultInputs(ticker))
  const [savedId, setSavedId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load existing data
  useEffect(() => {
    async function load() {
      // Check saved analyses first
      try {
        const res = await fetch('/api/analyses')
        const data = await res.json() as Analysis[]
        if (Array.isArray(data)) {
          const match = data.find((a) => a.inputs.ticker === ticker)
          if (match) {
            setInputs(match.inputs)
            setSavedId(match.id)
            setIsLoading(false)
            return
          }
        }
      } catch {
        // ignore
      }

      // Try sessionStorage prefetch
      const prefetchRaw = sessionStorage.getItem(`prefetch_${ticker}`)
      if (prefetchRaw) {
        try {
          const prefetch = JSON.parse(prefetchRaw) as { inputs: FinancialInputs }
          setInputs(prefetch.inputs)
          setIsLoading(false)
          return
        } catch {
          // ignore
        }
      }

      // Fetch fresh
      try {
        const res = await fetch('/api/financials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticker }),
        })
        const data = await res.json() as { inputs?: FinancialInputs; error?: string }
        if (data.inputs) {
          setInputs(data.inputs)
        }
      } catch {
        // Use defaults
      }
      setIsLoading(false)
    }
    void load()
  }, [ticker])

  function update<K extends keyof FinancialInputs>(field: K, value: FinancialInputs[K]) {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  function updateNum(field: keyof FinancialInputs, value: number) {
    update(field, value as FinancialInputs[typeof field])
  }

  async function handleSave() {
    setIsSaving(true)
    setError(null)
    try {
      // Recalculate
      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs }),
      })
      const analyzeData = await analyzeRes.json() as {
        calculations: MeadCalculations
        aiAnalysis: AiAnalysis | null
      }

      if (!analyzeData.calculations) {
        setError('Failed to recalculate. Please try again.')
        return
      }

      // Save or update
      if (savedId) {
        await fetch('/api/analyses', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: savedId,
            updates: {
              inputs,
              calculations: analyzeData.calculations,
              aiAnalysis: analyzeData.aiAnalysis,
            },
          }),
        })
      } else {
        const saveRes = await fetch('/api/analyses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inputs,
            calculations: analyzeData.calculations,
            aiAnalysis: analyzeData.aiAnalysis,
            notes: '',
          }),
        })
        const saveData = await saveRes.json() as Analysis
        setSavedId(saveData.id)
      }

      router.push(`/analyze/${ticker}`)
    } catch {
      setError('Failed to save. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-muted font-mono">Loading…</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href={`/analyze/${ticker}`} className="text-text-muted text-xs hover:text-accent font-mono">
              ← {ticker} Analysis
            </Link>
            <h1 className="font-serif text-2xl text-text-primary mt-1">Edit Data — {ticker}</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-accent hover:bg-accent/80 disabled:opacity-50 text-white font-mono text-sm px-5 py-2.5 rounded-md transition-colors"
          >
            {isSaving ? 'Saving & Recalculating…' : 'Save & Recalculate'}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
        {error && (
          <div className="bg-red/10 border border-red/40 rounded-lg p-4 text-red text-sm font-mono">
            {error}
          </div>
        )}

        {/* Section 1: FMP Auto-populated fields */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-serif text-xl text-text-primary">FMP Auto-Populated Fields</h2>
            <span className="text-xs px-1.5 py-0.5 rounded bg-accent/20 text-accent border border-accent/30 font-mono">FMP</span>
          </div>
          <p className="text-text-muted text-sm mb-5">
            These fields were fetched from Financial Modeling Prep. You can override them if needed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FieldGroup title="Company">
              <div className="bg-surface-alt rounded-md p-3">
                <label className="text-text-secondary text-sm block mb-1">Company Name</label>
                <input
                  type="text"
                  value={inputs.companyName}
                  onChange={(e) => update('companyName', e.target.value)}
                  className="w-full bg-surface border border-border rounded px-3 py-1.5 text-text-primary font-mono text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div className="bg-surface-alt rounded-md p-3">
                <label className="text-text-secondary text-sm block mb-1">Currency</label>
                <input
                  type="text"
                  value={inputs.currency}
                  onChange={(e) => update('currency', e.target.value)}
                  className="w-full bg-surface border border-border rounded px-3 py-1.5 text-text-primary font-mono text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </FieldGroup>

            <FieldGroup title="Identity">
              <NumField label="Fiscal Year" field="fiscalYear" value={inputs.fiscalYear} onChange={updateNum} fmp step="1" />
              <NumField label="Stock Price" field="stockPrice" value={inputs.stockPrice} onChange={updateNum} fmp step="0.01" />
              <NumField label="Shares Outstanding (M)" field="sharesOutstanding" value={inputs.sharesOutstanding} onChange={updateNum} fmp step="0.01" />
            </FieldGroup>

            <FieldGroup title="Income Statement">
              <NumField label="Revenue" field="revenue" value={inputs.revenue} onChange={updateNum} fmp />
              <NumField label="EBIT (Operating Income)" field="ebit" value={inputs.ebit} onChange={updateNum} fmp />
              <NumField label="Net Income" field="netIncome" value={inputs.netIncome} onChange={updateNum} fmp />
              <NumField label="Net Income to Common" field="netIncomeToCommon" value={inputs.netIncomeToCommon} onChange={updateNum} fmp />
              <NumField label="Minority Interest (P&L)" field="minorityInterest" value={inputs.minorityInterest} onChange={updateNum} fmp />
              <NumField label="Depreciation & Amortisation" field="depreciation" value={inputs.depreciation} onChange={updateNum} fmp />
              <NumField label="Total CapEx" field="totalCapex" value={inputs.totalCapex} onChange={updateNum} fmp />
              <NumField label="Effective Tax Rate (0–1)" field="effectiveTaxRate" value={inputs.effectiveTaxRate} onChange={updateNum} fmp step="0.01" min="0" />
            </FieldGroup>

            <FieldGroup title="Balance Sheet">
              <NumField label="Total Assets" field="totalAssets" value={inputs.totalAssets} onChange={updateNum} fmp />
              <NumField label="Cash & Equivalents" field="cash" value={inputs.cash} onChange={updateNum} fmp />
              <NumField label="Goodwill & Intangibles" field="goodwillAndIntangibles" value={inputs.goodwillAndIntangibles} onChange={updateNum} fmp />
              <NumField label="Total Current Liabilities" field="totalCurrentLiabilities" value={inputs.totalCurrentLiabilities} onChange={updateNum} fmp />
              <NumField label="Short-Term Debt" field="shortTermDebt" value={inputs.shortTermDebt} onChange={updateNum} fmp />
              <NumField label="Total Debt" field="totalDebt" value={inputs.totalDebt} onChange={updateNum} fmp />
              <NumField label="Total Equity" field="totalEquity" value={inputs.totalEquity} onChange={updateNum} fmp />
              <NumField label="Minority Equity" field="minorityEquity" value={inputs.minorityEquity} onChange={updateNum} fmp />
              <NumField label="Net PPE" field="netPPE" value={inputs.netPPE} onChange={updateNum} fmp />
            </FieldGroup>
          </div>
        </section>

        {/* Section 2: Manual Entry Required */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-serif text-xl text-text-primary">Manual Entry Required</h2>
            <span className="text-xs px-1.5 py-0.5 rounded bg-yellow/20 text-yellow border border-yellow/30 font-mono">Required</span>
          </div>
          <p className="text-text-muted text-sm mb-5">
            These fields cannot be auto-populated from FMP. They are needed for the $1 test, cyclicality analysis, and moat scoring.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FieldGroup title="5-Year Historical">
              <NumField
                label="Shares Outstanding 5yr Ago (M)"
                field="sharesOutstanding5yrAgo"
                value={inputs.sharesOutstanding5yrAgo}
                onChange={updateNum}
                required
                note="Shares outstanding approx. 5 years ago"
              />
              <NumField
                label="Retained Earnings 5yr (cumulative)"
                field="retainedEarnings5yr"
                value={inputs.retainedEarnings5yr}
                onChange={updateNum}
                required
                note="Sum of net income minus dividends over last 5 years"
              />
              <NumField
                label="Market Cap 5yr Ago"
                field="marketCap5yrAgo"
                value={inputs.marketCap5yrAgo}
                onChange={updateNum}
                required
                note="Total market cap approximately 5 years ago"
              />
              <NumField
                label="Market Cap Now"
                field="marketCapNow"
                value={inputs.marketCapNow}
                onChange={updateNum}
                note="Defaults to stockPrice × sharesOutstanding"
              />
            </FieldGroup>

            <FieldGroup title="Trough EBIT (Cyclical Businesses)">
              <NumField
                label="Trough EBIT"
                field="troughEbit"
                value={inputs.troughEbit}
                onChange={updateNum}
                note="Worst EBIT in observable record. Leave 0 if not applicable."
              />
              <NumField
                label="Trough Year"
                field="troughYear"
                value={inputs.troughYear}
                onChange={updateNum}
                note="Year of trough EBIT (e.g. 2020)"
                step="1"
              />
            </FieldGroup>

            <FieldGroup title="Qualitative Assessments">
              <SelectField
                label="Moat Types (count)"
                field="moatTypes"
                value={String(inputs.moatTypes) as '0' | '1' | '2' | '3'}
                options={[
                  { value: '0', label: '0 — No identifiable moat' },
                  { value: '1', label: '1 — Single moat source' },
                  { value: '2', label: '2 — Two moat sources' },
                  { value: '3', label: '3 — Three or more moat sources' },
                ]}
                onChange={(field, value) => update(field as 'moatTypes', parseInt(value) as 0 | 1 | 2 | 3)}
                required
                note="Count of distinct moat sources: network effects, switching costs, cost advantage, intangibles"
              />
              <SelectField
                label="Moat Durability"
                field="moatDurability"
                value={inputs.moatDurability}
                options={[
                  { value: 'eroding', label: 'Eroding' },
                  { value: 'stable', label: 'Stable' },
                  { value: 'widening', label: 'Widening' },
                ]}
                onChange={(field, value) => update(field as 'moatDurability', value as FinancialInputs['moatDurability'])}
                required
              />
              <SelectField
                label="Cyclicality"
                field="cyclicalityFlag"
                value={inputs.cyclicalityFlag}
                options={[
                  { value: 'stable', label: 'Stable' },
                  { value: 'moderate', label: 'Moderate' },
                  { value: 'highly_cyclical', label: 'Highly Cyclical' },
                ]}
                onChange={(field, value) => update(field as 'cyclicalityFlag', value as FinancialInputs['cyclicalityFlag'])}
                required
              />
              <SelectField
                label="Management Orientation"
                field="managementOrientation"
                value={inputs.managementOrientation}
                options={[
                  { value: 'operator', label: 'Operator' },
                  { value: 'mixed', label: 'Mixed' },
                  { value: 'owner_oriented', label: 'Owner-Oriented' },
                ]}
                onChange={(field, value) => update(field as 'managementOrientation', value as FinancialInputs['managementOrientation'])}
                required
              />
              <SelectField
                label="Debt Discipline"
                field="debtDiscipline"
                value={inputs.debtDiscipline}
                options={[
                  { value: 'aggressive', label: 'Aggressive' },
                  { value: 'moderate', label: 'Moderate' },
                  { value: 'conservative', label: 'Conservative' },
                ]}
                onChange={(field, value) => update(field as 'debtDiscipline', value as FinancialInputs['debtDiscipline'])}
                required
              />
              <SelectField
                label="Accounting Quality"
                field="accountingQuality"
                value={inputs.accountingQuality}
                options={[
                  { value: 'aggressive', label: 'Aggressive' },
                  { value: 'standard', label: 'Standard' },
                  { value: 'conservative', label: 'Conservative' },
                ]}
                onChange={(field, value) => update(field as 'accountingQuality', value as FinancialInputs['accountingQuality'])}
                required
              />
            </FieldGroup>
          </div>
        </section>

        {/* Section 3: Overrides */}
        <section>
          <h2 className="font-serif text-xl text-text-primary mb-5">Overrides</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FieldGroup title="Maintenance CapEx">
              <NumField
                label="Maintenance CapEx"
                field="maintenanceCapex"
                value={inputs.maintenanceCapex}
                onChange={updateNum}
                note="Override the estimated figure from MD&A or company guidance"
              />
              <SelectField
                label="Source"
                field="maintenanceCapexSource"
                value={inputs.maintenanceCapexSource}
                options={[
                  { value: 'estimated', label: 'Estimated (asset intensity heuristic)' },
                  { value: 'confirmed', label: 'Confirmed (from MD&A or management)' },
                ]}
                onChange={(field, value) => update(field as 'maintenanceCapexSource', value as FinancialInputs['maintenanceCapexSource'])}
              />
            </FieldGroup>

            <FieldGroup title="Valuation Parameters">
              <NumField
                label="Required Return / Hurdle Rate (%)"
                field="requiredReturn"
                value={inputs.requiredReturn}
                onChange={updateNum}
                note="Your minimum acceptable rate of return (default: 10%)"
                step="0.5"
                min="1"
              />
            </FieldGroup>
          </div>
        </section>

        {/* Save button */}
        <div className="flex gap-4 pt-4 border-t border-border">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-accent hover:bg-accent/80 disabled:opacity-50 text-white font-mono text-sm px-6 py-2.5 rounded-md transition-colors"
          >
            {isSaving ? 'Saving & Recalculating…' : 'Save & Recalculate'}
          </button>
          <Link
            href={`/analyze/${ticker}`}
            className="text-text-secondary hover:text-text-primary font-mono text-sm px-4 py-2.5 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </main>
  )
}
