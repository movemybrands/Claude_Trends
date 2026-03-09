import type { AiAnalysis } from '@/lib/types'

interface ModuleCardProps {
  title: string
  moduleNumber?: number
  score?: number
  maxScore?: number
  children: React.ReactNode
  aiField?: keyof Pick<AiAnalysis,
    | 'roceInterpretation'
    | 'ownerEarningsInterpretation'
    | 'moatAssessment'
    | 'managementAssessment'
    | 'balanceSheetAssessment'
    | 'valuationAssessment'
  >
  aiAnalysis?: AiAnalysis | null
}

export default function ModuleCard({
  title,
  moduleNumber,
  score,
  maxScore,
  children,
  aiField,
  aiAnalysis,
}: ModuleCardProps) {
  const aiText = aiField && aiAnalysis ? aiAnalysis[aiField] : null

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          {moduleNumber !== undefined && (
            <span className="text-text-muted font-mono text-xs">
              {String(moduleNumber).padStart(2, '0')}
            </span>
          )}
          <h2 className="font-serif text-lg text-text-primary">{title}</h2>
        </div>
        {score !== undefined && maxScore !== undefined && (
          <span className="font-mono text-sm text-text-secondary">
            {score}/{maxScore}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">{children}</div>

      {/* AI Interpretation */}
      {aiText && (
        <div className="px-5 pb-5 border-t border-border mt-0">
          <div className="mt-4 p-4 bg-surface-alt rounded-md border border-border">
            <p className="text-xs font-mono text-accent mb-2 uppercase tracking-wider">
              AI Analysis
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">{aiText}</p>
          </div>
        </div>
      )}
    </div>
  )
}
