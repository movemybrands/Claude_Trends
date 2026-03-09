import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { calculateMead } from '@/lib/mead'
import type { FinancialInputs, MeadCalculations, AiAnalysis } from '@/lib/types'

const SYSTEM_PROMPT = `You are a rigorous value-investing analyst applying the Mead Framework to evaluate companies. You will receive financial inputs and pre-calculated metrics.

Your task: Return ONLY valid JSON matching this exact interface — no markdown, no preamble, no explanation outside the JSON:

{
  "roceInterpretation": "string (2-4 sentences of genuine analytical insight about ROCE quality and capital efficiency)",
  "ownerEarningsInterpretation": "string (2-4 sentences analyzing owner earnings conversion quality vs reported earnings)",
  "moatAssessment": "string (2-4 sentences on competitive moat strength, sources, and durability given the metrics)",
  "managementAssessment": "string (2-4 sentences on capital allocation quality, $1 test result, share count behavior)",
  "balanceSheetAssessment": "string (2-4 sentences on balance sheet strength, debt levels, and accounting quality)",
  "valuationAssessment": "string (2-4 sentences on the going-in yield, margin of safety, and price attractiveness)",
  "keyRisks": ["string", "string", "string"] (3-5 specific, company-specific research questions an investor must answer before buying),
  "verdict": "string (one paragraph synthesizing all six modules into a final buy/watch/pass judgement with price context)",
  "generatedAt": "string (ISO 8601 timestamp)"
}

Rules:
- Each text field must provide genuine analytical insight, not generic commentary
- keyRisks must be specific, actionable research questions tied to this company's actual numbers
- verdict must name a specific price or range and explain the risk/reward clearly
- If cyclicalityFlag is 'highly_cyclical' or 'moderate', flag whether current EBIT appears above, at, or below mid-cycle and what this implies for the stated valuation
- If minorityEquity > 10% of totalEquity, explicitly address the consolidated vs. attributable owner earnings gap
- Do not recalculate — interpret the numbers provided`

function buildUserMessage(inputs: FinancialInputs, calculations: MeadCalculations): string {
  return `Analyze this company using the Mead Framework:

COMPANY: ${inputs.companyName} (${inputs.ticker}) | FY${inputs.fiscalYear} | ${inputs.currency}

=== FINANCIAL INPUTS ===
Revenue: ${inputs.revenue.toLocaleString()}
EBIT: ${inputs.ebit.toLocaleString()}
Net Income: ${inputs.netIncome.toLocaleString()}
Net Income to Common: ${inputs.netIncomeToCommon.toLocaleString()}
Minority Interest (P&L): ${inputs.minorityInterest.toLocaleString()}
Depreciation: ${inputs.depreciation.toLocaleString()}
Total CapEx: ${inputs.totalCapex.toLocaleString()}
Maintenance CapEx: ${inputs.maintenanceCapex.toLocaleString()} (${inputs.maintenanceCapexSource})
Effective Tax Rate: ${(inputs.effectiveTaxRate * 100).toFixed(1)}%

Total Assets: ${inputs.totalAssets.toLocaleString()}
Cash: ${inputs.cash.toLocaleString()}
Goodwill & Intangibles: ${inputs.goodwillAndIntangibles.toLocaleString()}
Total Debt: ${inputs.totalDebt.toLocaleString()}
Total Equity: ${inputs.totalEquity.toLocaleString()}
Minority Equity: ${inputs.minorityEquity.toLocaleString()}
Net PPE: ${inputs.netPPE.toLocaleString()}

Shares Outstanding: ${inputs.sharesOutstanding.toFixed(2)}M
Stock Price: $${inputs.stockPrice.toFixed(2)}
Required Return (hurdle): ${inputs.requiredReturn}%

5yr Retained Earnings: ${inputs.retainedEarnings5yr.toLocaleString()}
Market Cap 5yr Ago: ${inputs.marketCap5yrAgo.toLocaleString()}
Market Cap Now: ${inputs.marketCapNow.toLocaleString()}
Trough EBIT: ${inputs.troughEbit.toLocaleString()}

=== QUALITATIVE FLAGS ===
Moat Types (count): ${inputs.moatTypes}
Moat Durability: ${inputs.moatDurability}
Cyclicality: ${inputs.cyclicalityFlag}
Management Orientation: ${inputs.managementOrientation}
Debt Discipline: ${inputs.debtDiscipline}
Accounting Quality: ${inputs.accountingQuality}

=== MEAD CALCULATIONS ===
Excess Cash: ${calculations.excessCash.toLocaleString()}
Spontaneous Liabilities: ${calculations.spontaneousLiabilities.toLocaleString()}
Capital Employed (Total): ${calculations.capitalEmployedTotal.toLocaleString()}
Capital Employed (Tangible): ${calculations.capitalEmployedTangible.toLocaleString()}

EBIT Margin: ${calculations.ebitMargin.toFixed(1)}%
Capital Turnover (Total): ${calculations.capitalTurnoverTotal.toFixed(2)}x
ROCE (Total): ${calculations.roceTotal.toFixed(1)}%
ROCE (Tangible): ${calculations.roceTangible.toFixed(1)}%
Goodwill Drag: ${calculations.goodwillDrag.toFixed(1)}pp

Asset Intensity: ${calculations.assetIntensity.toFixed(2)}
Growth CapEx: ${calculations.growthCapex.toLocaleString()}
Owner Earnings (Consolidated): ${calculations.ownerEarningsConsolidated.toLocaleString()}
Owner Earnings (Attributable): ${calculations.ownerEarningsAttributable.toLocaleString()}
OE per Share: $${calculations.ownerEarningsPerShare.toFixed(2)}
OE/NI Ratio: ${calculations.oeToNiRatio.toFixed(1)}%
Free Cash Flow: ${calculations.freeCashFlow.toLocaleString()}

Net Debt: ${calculations.netDebt.toLocaleString()}
Net Debt/EBIT (Current): ${calculations.netDebtToEbitCurrent.toFixed(1)}x
Net Debt/EBIT (Trough): ${calculations.netDebtToEbitTrough !== null ? calculations.netDebtToEbitTrough.toFixed(1) + 'x' : 'N/A'}
Book Value/Share: $${calculations.bookValuePerShare.toFixed(2)}
Tangible Book/Share: $${calculations.tangibleBookPerShare.toFixed(2)}
P/B: ${calculations.priceToBook !== null ? calculations.priceToBook.toFixed(1) + 'x' : 'N/A'}

Market Value Created (5yr): ${calculations.marketValueCreated.toLocaleString()}
Dollar Test: ${calculations.dollarTest !== null ? calculations.dollarTest.toFixed(2) + 'x' : 'N/A'}
Share Count Change (5yr): ${calculations.shareCountChange !== null ? calculations.shareCountChange.toFixed(1) + '%' : 'N/A'}

Capital Employed/Share: $${calculations.capitalEmployedPerShare.toFixed(2)}
Multiple of Capital Paid: ${calculations.multipleOfCapitalPaid.toFixed(1)}x
Going-In Yield: ${calculations.goingInYield.toFixed(1)}%
Implied Price (Base): $${calculations.impliedPriceBase.toFixed(2)}
Implied Price (Mid-Cycle): ${calculations.impliedPriceMidCycle !== null ? '$' + calculations.impliedPriceMidCycle.toFixed(2) : 'N/A'}
Implied Price (Trough): ${calculations.impliedPriceTrough !== null ? '$' + calculations.impliedPriceTrough.toFixed(2) : 'N/A'}
Margin of Safety (Base): ${calculations.marginOfSafetyBase !== null ? calculations.marginOfSafetyBase.toFixed(1) + '%' : 'N/A'}

=== SCORE ===
Total Score: ${calculations.totalScore} / ${calculations.maxScore}
Verdict: ${calculations.verdict}
Score Breakdown:
  ROCE Level: ${calculations.scores.roceLevel}
  Cyclicality Discount: ${calculations.scores.cyclicalityDiscount}
  Goodwill Drag: ${calculations.scores.goodwillDrag}
  Owner Earnings Quality: ${calculations.scores.ownerEarningsQuality}
  Dollar Test: ${calculations.scores.dollarTest}
  Share Count Trend: ${calculations.scores.shareCountTrend}
  Debt Discipline: ${calculations.scores.debtDiscipline}
  Moat: ${calculations.scores.moat}
  Management & Accounting: ${calculations.scores.managementAccounting}

Provide your analysis now.`
}

export async function POST(request: NextRequest) {
  let calculations: MeadCalculations | undefined

  try {
    const body = await request.json() as { inputs?: FinancialInputs }
    const inputs = body.inputs

    if (!inputs) {
      return NextResponse.json({ error: 'inputs is required.' }, { status: 400 })
    }

    // Run Mead calculations
    calculations = calculateMead(inputs)

    // Call Anthropic API
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicKey) {
      // Return calculations without AI analysis
      return NextResponse.json({ calculations, aiAnalysis: null })
    }

    const client = new Anthropic({ apiKey: anthropicKey })

    let aiAnalysis: AiAnalysis | null = null

    try {
      const message = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: buildUserMessage(inputs, calculations),
          },
        ],
      })

      const textContent = message.content.find((c) => c.type === 'text')
      if (textContent && textContent.type === 'text') {
        const parsed = JSON.parse(textContent.text) as AiAnalysis
        aiAnalysis = {
          ...parsed,
          generatedAt: new Date().toISOString(),
        }
      }
    } catch (aiError) {
      console.error('Anthropic API error (non-fatal):', aiError)
      aiAnalysis = null
    }

    return NextResponse.json({ calculations, aiAnalysis })
  } catch (err) {
    console.error('Analyze API error:', err)
    if (calculations) {
      return NextResponse.json({ calculations, aiAnalysis: null })
    }
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
