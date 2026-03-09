'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts'
import type { FinancialInputs, MeadCalculations } from '@/lib/types'

interface Props {
  inputs: FinancialInputs
  calculations: MeadCalculations
}

function fmt(n: number, prefix = ''): string {
  const abs = Math.abs(n)
  let s: string
  if (abs >= 1e9) s = (n / 1e9).toFixed(1) + 'B'
  else if (abs >= 1e6) s = (n / 1e6).toFixed(1) + 'M'
  else if (abs >= 1e3) s = (n / 1e3).toFixed(1) + 'K'
  else s = n.toFixed(0)
  return prefix ? `${prefix}${s}` : s
}

function roceColor(roce: number): string {
  if (roce >= 20) return '#34d058'
  if (roce >= 15) return '#f0b429'
  if (roce >= 10) return '#4a9eff'
  return '#f85149'
}

export default function RoceDecomposition({ inputs, calculations }: Props) {
  const c = calculations
  const currency = inputs.currency === 'USD' ? '$' : inputs.currency + ' '

  // Capital employed waterfall data
  const waterfallData = [
    { name: 'Total Assets', value: inputs.totalAssets, color: '#4a9eff' },
    { name: '– Excess Cash', value: -c.excessCash, color: '#f0b429' },
    { name: '– Spont. Liab.', value: -c.spontaneousLiabilities, color: '#f0b429' },
    { name: 'CE Total', value: c.capitalEmployedTotal, color: '#34d058' },
    { name: '– Goodwill', value: -inputs.goodwillAndIntangibles, color: '#f85149' },
    { name: 'CE Tangible', value: c.capitalEmployedTangible, color: '#34d058' },
  ]

  const tableRows = [
    { label: 'Total Assets', value: fmt(inputs.totalAssets, currency), note: '' },
    { label: '– Excess Cash', value: `(${fmt(c.excessCash, currency)})`, note: `cash > ${currency}${fmt(inputs.revenue * 0.02)}` },
    { label: '– Spontaneous Liab.', value: `(${fmt(c.spontaneousLiabilities, currency)})`, note: 'current liab. – short-term debt' },
    { label: '= CE Total', value: fmt(c.capitalEmployedTotal, currency), note: '', bold: true },
    { label: '– Goodwill & Intangibles', value: `(${fmt(inputs.goodwillAndIntangibles, currency)})`, note: '' },
    { label: '= CE Tangible', value: fmt(c.capitalEmployedTangible, currency), note: '', bold: true },
  ]

  const roceCol = roceColor(c.roceTotal)

  return (
    <div className="space-y-6">
      {/* Capital employed build-up table */}
      <div>
        <h3 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-3">
          Capital Employed Build-Up
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.label} className="border-b border-border/40 last:border-0">
                  <td className={`py-2 pr-4 ${row.bold ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
                    {row.label}
                  </td>
                  <td className={`py-2 text-right font-mono ${row.bold ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
                    {row.value}
                  </td>
                  <td className="py-2 pl-4 text-text-muted text-xs">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROCE Decomposition table */}
      <div>
        <h3 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-3">
          ROCE Decomposition
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">EBIT Margin</span>
              <span className="font-mono text-text-primary">{c.ebitMargin.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">× Capital Turnover (Total)</span>
              <span className="font-mono text-text-primary">{c.capitalTurnoverTotal.toFixed(2)}x</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="text-text-secondary font-medium">= ROCE (Total)</span>
              <span className="font-mono font-bold" style={{ color: roceCol }}>
                {c.roceTotal.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">EBIT Margin</span>
              <span className="font-mono text-text-primary">{c.ebitMargin.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">× Capital Turnover (Tangible)</span>
              <span className="font-mono text-text-primary">{c.capitalTurnoverTangible.toFixed(2)}x</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="text-text-secondary font-medium">= ROCE (Tangible)</span>
              <span className="font-mono font-bold" style={{ color: roceColor(c.roceTangible) }}>
                {c.roceTangible.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 p-3 bg-surface-alt rounded text-sm">
          <span className="text-text-muted">Goodwill Drag: </span>
          <span className="font-mono text-yellow">{c.goodwillDrag.toFixed(1)}pp</span>
          <span className="text-text-muted ml-3 text-xs">
            (tangible ROCE – reported ROCE)
          </span>
        </div>
      </div>

      {/* Waterfall Chart */}
      <div>
        <h3 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-3">
          Capital Employed Waterfall
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: '#8b96a8', fontSize: 10 }}
                axisLine={{ stroke: '#1e2530' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) => fmt(v)}
                tick={{ fill: '#8b96a8', fontSize: 10 }}
                axisLine={{ stroke: '#1e2530' }}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [fmt(value, currency), 'Value']}
                contentStyle={{
                  backgroundColor: '#0d1117',
                  border: '1px solid #1e2530',
                  borderRadius: '6px',
                  color: '#e2e8f0',
                  fontSize: '12px',
                }}
              />
              <ReferenceLine y={0} stroke="#1e2530" />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                {waterfallData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
