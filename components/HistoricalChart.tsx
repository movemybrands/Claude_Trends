'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface DataPoint {
  [key: string]: number | string
}

interface LineConfig {
  dataKey: string
  color?: string
  label?: string
}

interface HistoricalChartProps {
  data: DataPoint[]
  lines: LineConfig[]
  xKey?: string
  yFormatter?: (value: number) => string
  height?: number
}

export default function HistoricalChart({
  data,
  lines,
  xKey = 'year',
  yFormatter = (v) => String(v),
  height = 200,
}: HistoricalChartProps) {
  const colors = ['#4a9eff', '#34d058', '#f0b429', '#f85149']

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <XAxis
            dataKey={xKey}
            tick={{ fill: '#8b96a8', fontSize: 10 }}
            axisLine={{ stroke: '#1e2530' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={yFormatter}
            tick={{ fill: '#8b96a8', fontSize: 10 }}
            axisLine={{ stroke: '#1e2530' }}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => [yFormatter(value), '']}
            contentStyle={{
              backgroundColor: '#0d1117',
              border: '1px solid #1e2530',
              borderRadius: '6px',
              color: '#e2e8f0',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ color: '#8b96a8', fontSize: '12px' }} />
          {lines.map((line, i) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color ?? colors[i % colors.length]}
              strokeWidth={2}
              dot={{ r: 3, fill: line.color ?? colors[i % colors.length] }}
              name={line.label ?? line.dataKey}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
