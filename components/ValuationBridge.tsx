'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type { FinancialInputs, MeadCalculations } from '@/lib/types'

interface Props {
  inputs: FinancialInputs
  calculations: MeadCalculations
}

function mosColor(mos: number | null): string {
  if (mos === null) return '#8b96a8'
  if (mos >= 20) return '#34d058'
  if (mos >= 0) return '#f0b429'
  return '#f85149'
}

function fmt2(n: number): string {
  return `$${n.toFixed(2)}`
}

export default function ValuationBridge({ inputs, calculations: c }: Props) {
  const isCyclical = inputs.cyclicalityFlag !== 'stable'

  // Scenario table rows
  const scenarios = [
    {
      label: 'Base (current EBIT)',
      impliedPrice: c.impliedPriceBase,
      mos: c.marginOfSafetyBase,
    },
    ...(isCyclical && c.impliedPriceMidCycle !== null
      ? [{
        label: 'Mid-Cycle',
        impliedPrice: c.impliedPriceMidCycle,
        mos: c.marginOfSafetyMidCycle,
      }]
      : []),
    ...(isCyclical && c.impliedPriceTrough !== null
      ? [{
        label: 'Trough',
        impliedPrice: c.impliedPriceTrough,
        mos: null as number | null,
      }]
      : []),
  ]

  // Chart data
  const chartData = scenarios.map((s) => ({
    name: s.label,
    'Implied Price': parseFloat(s.impliedPrice.toFixed(2)),
    'Current Price': inputs.stockPrice,
  }))

  return (
    <div className="space-y-6">
      {/* Going-in Yield — prominent */}
      <div className="p-4 bg-surface-alt rounded-lg border border-border flex items-center justify-between">
        <div>
          <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-1">
            Going-In Yield
          </p>
          <p className="font-mono text-3xl font-bold text-accent">
            {c.goingInYield.toFixed(1)}%
          </p>
          <p className="text-text-muted text-xs mt-1">
            ROCE ÷ Multiple of Capital Paid
          </p>
        </div>
        <div className="text-right">
          <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-1">
            Multiple of Capital
          </p>
          <p className="font-mono text-xl text-text-primary">
            {c.multipleOfCapitalPaid.toFixed(1)}x
          </p>
          <p className="text-text-muted text-xs mt-1">
            Price ÷ CE/Share
          </p>
        </div>
      </div>

      {/* Scenario Table */}
      <div>
        <h3 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-3">
          Valuation Scenarios
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-text-muted font-mono text-xs">Scenario</th>
                <th className="text-right py-2 text-text-muted font-mono text-xs">Implied Price</th>
                <th className="text-right py-2 text-text-muted font-mono text-xs">Current Price</th>
                <th className="text-right py-2 text-text-muted font-mono text-xs">Margin of Safety</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => (
                <tr key={s.label} className="border-b border-border/40 last:border-0">
                  <td className="py-2 text-text-secondary">{s.label}</td>
                  <td className="py-2 text-right font-mono text-text-primary">{fmt2(s.impliedPrice)}</td>
                  <td className="py-2 text-right font-mono text-text-secondary">{fmt2(inputs.stockPrice)}</td>
                  <td
                    className="py-2 text-right font-mono"
                    style={{ color: mosColor(s.mos) }}
                  >
                    {s.mos !== null ? `${s.mos.toFixed(1)}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Valuation bridge details */}
      <div>
        <h3 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-3">
          Bridge Components
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">CE / Share</span>
            <span className="font-mono text-text-primary">${c.capitalEmployedPerShare.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Implied Price (Base)</span>
            <span className="font-mono text-text-primary">${c.impliedPriceBase.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Required Return</span>
            <span className="font-mono text-text-primary">{inputs.requiredReturn}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Current Price</span>
            <span className="font-mono text-text-primary">${inputs.stockPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div>
          <h3 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-3">
            Price Comparison
          </h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#8b96a8', fontSize: 10 }}
                  axisLine={{ stroke: '#1e2530' }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v: number) => `$${v}`}
                  tick={{ fill: '#8b96a8', fontSize: 10 }}
                  axisLine={{ stroke: '#1e2530' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                  contentStyle={{
                    backgroundColor: '#0d1117',
                    border: '1px solid #1e2530',
                    borderRadius: '6px',
                    color: '#e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  wrapperStyle={{ color: '#8b96a8', fontSize: '12px' }}
                />
                <ReferenceLine y={inputs.stockPrice} stroke="#f0b429" strokeDasharray="4 2" />
                <Bar dataKey="Implied Price" fill="#4a9eff" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Current Price" fill="#f0b429" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
