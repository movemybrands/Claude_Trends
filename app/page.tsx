'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Analysis } from '@/lib/types'

const VERDICT_CONFIG = {
  strong_candidate: { label: 'Strong Buy', bg: 'bg-green/20', text: 'text-green', border: 'border-green/40' },
  watchlist: { label: 'Watchlist', bg: 'bg-yellow/20', text: 'text-yellow', border: 'border-yellow/40' },
  weak: { label: 'Weak', bg: 'bg-accent/20', text: 'text-accent', border: 'border-accent/40' },
  pass: { label: 'Pass', bg: 'bg-red/20', text: 'text-red', border: 'border-red/40' },
}

function VerdictBadge({ verdict }: { verdict: Analysis['calculations']['verdict'] }) {
  const cfg = VERDICT_CONFIG[verdict]
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-mono ${cfg.bg} ${cfg.text} border ${cfg.border}`}
    >
      {cfg.label}
    </span>
  )
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function DashboardPage() {
  const router = useRouter()
  const [ticker, setTicker] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loadingAnalyses, setLoadingAnalyses] = useState(true)

  useEffect(() => {
    fetch('/api/analyses')
      .then((r) => r.json())
      .then((data: Analysis[]) => {
        setAnalyses(Array.isArray(data) ? data.sort((a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ) : [])
      })
      .catch(() => setAnalyses([]))
      .finally(() => setLoadingAnalyses(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const sym = ticker.trim().toUpperCase()
    if (!sym) return

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/financials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: sym }),
      })

      const data = await res.json() as { inputs?: unknown; dataGaps?: string[]; error?: string }

      if (!res.ok || data.error) {
        setError(data.error ?? 'Failed to fetch financial data.')
        return
      }

      // Store prefetched data in sessionStorage for the analysis page to pick up
      sessionStorage.setItem(`prefetch_${sym}`, JSON.stringify(data))
      router.push(`/analyze/${sym}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="font-serif text-3xl text-text-primary">Mead Framework Screener</h1>
          <p className="text-text-secondary text-sm mt-1">
            Value investing analysis — ROCE · Owner Earnings · Moat · Management · Balance Sheet · Valuation
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Ticker input */}
        <section className="mb-10">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="Enter ticker symbol (e.g. AAPL)"
              className="flex-1 max-w-xs bg-surface border border-border rounded-md px-4 py-2.5 text-text-primary placeholder-text-muted font-mono text-sm focus:outline-none focus:border-accent transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !ticker.trim()}
              className="bg-accent hover:bg-accent/80 disabled:opacity-50 text-white font-mono text-sm px-5 py-2.5 rounded-md transition-colors"
            >
              {isLoading ? 'Fetching…' : 'Fetch & Analyse'}
            </button>
          </form>
          {error && (
            <p className="mt-3 text-red text-sm font-mono">{error}</p>
          )}
        </section>

        {/* Saved analyses table */}
        <section>
          <h2 className="font-serif text-xl text-text-primary mb-4">Saved Analyses</h2>

          {loadingAnalyses ? (
            <p className="text-text-muted font-mono text-sm">Loading…</p>
          ) : analyses.length === 0 ? (
            <div className="bg-surface border border-border rounded-lg p-8 text-center">
              <p className="text-text-muted text-sm">
                No saved analyses yet. Enter a ticker above to get started.
              </p>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 text-text-muted font-mono text-xs uppercase tracking-wider">
                      Ticker
                    </th>
                    <th className="text-left px-5 py-3 text-text-muted font-mono text-xs uppercase tracking-wider">
                      Company
                    </th>
                    <th className="text-left px-5 py-3 text-text-muted font-mono text-xs uppercase tracking-wider">
                      FY
                    </th>
                    <th className="text-left px-5 py-3 text-text-muted font-mono text-xs uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-left px-5 py-3 text-text-muted font-mono text-xs uppercase tracking-wider">
                      Verdict
                    </th>
                    <th className="text-left px-5 py-3 text-text-muted font-mono text-xs uppercase tracking-wider">
                      Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {analyses.map((analysis) => (
                    <tr
                      key={analysis.id}
                      onClick={() => router.push(`/analyze/${analysis.inputs.ticker}`)}
                      className="border-b border-border/40 last:border-0 hover:bg-surface-alt cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-3 font-mono text-accent font-medium">
                        {analysis.inputs.ticker}
                      </td>
                      <td className="px-5 py-3 text-text-primary">
                        {analysis.inputs.companyName}
                      </td>
                      <td className="px-5 py-3 font-mono text-text-secondary">
                        {analysis.inputs.fiscalYear}
                      </td>
                      <td className="px-5 py-3 font-mono text-text-primary">
                        {analysis.calculations.totalScore}/{analysis.calculations.maxScore}
                      </td>
                      <td className="px-5 py-3">
                        <VerdictBadge verdict={analysis.calculations.verdict} />
                      </td>
                      <td className="px-5 py-3 text-text-muted text-xs font-mono">
                        {formatDate(analysis.updatedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
