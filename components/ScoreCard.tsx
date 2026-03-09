'use client'

import Link from 'next/link'
import type { MeadCalculations, ScoreBreakdown } from '@/lib/types'

interface ScoreCardProps {
  calculations: MeadCalculations
  ticker: string
  onSave?: () => void
  onDelete?: () => void
  onRerunAI?: () => void
  isSaving?: boolean
  isDeleting?: boolean
  isRerunning?: boolean
  isSaved?: boolean
}

const VERDICT_CONFIG = {
  strong_candidate: { label: 'Strong Candidate', bg: 'bg-green/20', text: 'text-green', border: 'border-green/40' },
  watchlist: { label: 'Watchlist', bg: 'bg-yellow/20', text: 'text-yellow', border: 'border-yellow/40' },
  weak: { label: 'Weak', bg: 'bg-accent/20', text: 'text-accent', border: 'border-accent/40' },
  pass: { label: 'Pass', bg: 'bg-red/20', text: 'text-red', border: 'border-red/40' },
}

const SCORE_ROWS: { key: keyof ScoreBreakdown; label: string; max: number; canBeNegative?: boolean }[] = [
  { key: 'roceLevel', label: 'ROCE Quality', max: 30 },
  { key: 'cyclicalityDiscount', label: 'Cyclicality', max: 0, canBeNegative: true },
  { key: 'goodwillDrag', label: 'Goodwill Drag', max: 10 },
  { key: 'ownerEarningsQuality', label: 'Owner Earnings', max: 10 },
  { key: 'dollarTest', label: '$1 Test', max: 15 },
  { key: 'shareCountTrend', label: 'Share Count', max: 10 },
  { key: 'debtDiscipline', label: 'Debt Discipline', max: 10 },
  { key: 'moat', label: 'Moat', max: 10 },
  { key: 'managementAccounting', label: 'Mgmt & Accounting', max: 5 },
]

function ProgressBar({ value, max, canBeNegative }: { value: number; max: number; canBeNegative?: boolean }) {
  if (canBeNegative) {
    // For cyclicality discount (negative values)
    const pct = Math.abs(value) / 8 * 100
    return (
      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow/60 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    )
  }
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  const color = pct >= 70 ? 'bg-green' : pct >= 40 ? 'bg-yellow' : 'bg-red'
  return (
    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export default function ScoreCard({
  calculations,
  ticker,
  onSave,
  onDelete,
  onRerunAI,
  isSaving,
  isDeleting,
  isRerunning,
  isSaved,
}: ScoreCardProps) {
  const { totalScore, maxScore, verdict, scores } = calculations
  const verdictConfig = VERDICT_CONFIG[verdict]
  const pct = Math.round((totalScore / maxScore) * 100)

  return (
    <div className="bg-surface border border-border rounded-lg p-5 flex flex-col gap-5">
      {/* Score display */}
      <div className="text-center">
        <div className="font-mono text-5xl font-bold text-text-primary">
          {totalScore}
        </div>
        <div className="font-mono text-text-muted text-sm mt-1">/ {maxScore}</div>
        <div className="mt-1 font-mono text-text-secondary text-xs">{pct}%</div>
      </div>

      {/* Verdict badge */}
      <div
        className={`
          ${verdictConfig.bg} ${verdictConfig.text} ${verdictConfig.border}
          border rounded-md px-3 py-2 text-center font-mono text-sm font-medium
        `}
      >
        {verdictConfig.label}
      </div>

      {/* Score breakdown */}
      <div className="space-y-2">
        {SCORE_ROWS.map(({ key, label, max, canBeNegative }) => {
          const value = scores[key]
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs text-text-muted w-32 shrink-0">{label}</span>
              <ProgressBar value={value} max={max} canBeNegative={canBeNegative} />
              <span className={`font-mono text-xs w-8 text-right shrink-0 ${canBeNegative && value < 0 ? 'text-yellow' : 'text-text-secondary'}`}>
                {value > 0 ? value : canBeNegative && value < 0 ? value : value}
              </span>
            </div>
          )
        })}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 pt-2 border-t border-border">
        <Link
          href={`/analyze/${ticker}/edit`}
          className="w-full text-center bg-surface-alt hover:bg-border text-text-secondary text-sm py-2 px-3 rounded-md border border-border transition-colors"
        >
          Edit Data
        </Link>
        {onRerunAI && (
          <button
            onClick={onRerunAI}
            disabled={isRerunning}
            className="w-full bg-surface-alt hover:bg-border text-accent text-sm py-2 px-3 rounded-md border border-border/60 transition-colors disabled:opacity-50"
          >
            {isRerunning ? 'Running…' : 'Re-run AI Analysis'}
          </button>
        )}
        {onSave && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="w-full bg-accent/20 hover:bg-accent/30 text-accent text-sm py-2 px-3 rounded-md border border-accent/40 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving…' : isSaved ? 'Saved ✓' : 'Save Analysis'}
          </button>
        )}
        {onDelete && isSaved && (
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="w-full bg-red/10 hover:bg-red/20 text-red text-sm py-2 px-3 rounded-md border border-red/30 transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  )
}
