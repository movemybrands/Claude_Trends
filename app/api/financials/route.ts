import { NextRequest, NextResponse } from 'next/server'
import { fetchFinancials } from '@/lib/fmp'
import { calculateMaintenanceCapexEstimate } from '@/lib/mead'
import type { FinancialInputs } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { ticker?: string }
    const ticker = body.ticker?.trim().toUpperCase()

    if (!ticker) {
      return NextResponse.json({ error: 'Ticker symbol is required.' }, { status: 400 })
    }

    const apiKey = process.env.FMP_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'FMP_API_KEY environment variable is not configured.' },
        { status: 500 }
      )
    }

    const result = await fetchFinancials(ticker, apiKey)

    if ('error' in result && result.error) {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }

    const { inputs: partialInputs, dataGaps } = result

    // Estimate maintenance capex using asset intensity heuristic
    // We need a full inputs object for the estimate, so cast to full with defaults
    const fullInputs = partialInputs as FinancialInputs
    const maintenanceCapexEstimate = calculateMaintenanceCapexEstimate(fullInputs)
    fullInputs.maintenanceCapex = maintenanceCapexEstimate
    fullInputs.maintenanceCapexSource = 'estimated'

    return NextResponse.json({ inputs: fullInputs, dataGaps })
  } catch (err) {
    console.error('Financials API error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
