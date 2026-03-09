export interface FinancialInputs {
  // Identity
  ticker: string
  companyName: string
  fiscalYear: number
  currency: string

  // Income statement
  revenue: number
  ebit: number
  netIncome: number
  netIncomeToCommon: number        // after minority deduction
  minorityInterest: number         // NI attributable to non-controlling interests
  depreciation: number
  totalCapex: number
  effectiveTaxRate: number

  // Balance sheet
  totalAssets: number
  cash: number
  goodwillAndIntangibles: number
  totalCurrentLiabilities: number
  shortTermDebt: number
  totalDebt: number
  totalEquity: number
  minorityEquity: number           // non-controlling interests on balance sheet
  netPPE: number

  // Per share
  sharesOutstanding: number
  stockPrice: number
  requiredReturn: number           // user's hurdle rate, default 10

  // 5-year historical (manual entry)
  sharesOutstanding5yrAgo: number
  retainedEarnings5yr: number      // cumulative net income minus dividends, 5yr sum
  marketCap5yrAgo: number
  marketCapNow: number

  // Trough year (for cyclical businesses)
  troughEbit: number               // worst EBIT in observable record
  troughYear: number

  // Maintenance capex
  maintenanceCapex: number         // estimated or confirmed
  maintenanceCapexSource: 'estimated' | 'confirmed'  // 'confirmed' if from MD&A

  // Qualitative
  moatTypes: number                // 0–3 distinct moat sources
  moatDurability: 'eroding' | 'stable' | 'widening'
  cyclicalityFlag: 'stable' | 'moderate' | 'highly_cyclical'
  managementOrientation: 'operator' | 'mixed' | 'owner_oriented'
  debtDiscipline: 'aggressive' | 'moderate' | 'conservative'
  accountingQuality: 'aggressive' | 'standard' | 'conservative'
}

export interface MeadCalculations {
  // Capital employed
  excessCash: number
  spontaneousLiabilities: number
  capitalEmployedTotal: number
  capitalEmployedTangible: number

  // ROCE
  capitalTurnoverTotal: number
  capitalTurnoverTangible: number
  ebitMargin: number
  roceTotal: number
  roceTangible: number
  goodwillDrag: number

  // Owner earnings
  assetIntensity: number
  growthCapex: number
  ownerEarningsConsolidated: number
  ownerEarningsAttributable: number
  ownerEarningsPerShare: number
  oeToNiRatio: number
  freeCashFlow: number

  // Balance sheet
  netDebt: number
  netDebtToEbitCurrent: number
  netDebtToEbitTrough: number | null
  cashConversionCycle: number | null
  bookValuePerShare: number
  tangibleBookPerShare: number
  priceToBook: number | null
  priceToTangibleBook: number | null

  // $1 test and share count
  marketValueCreated: number
  dollarTest: number | null
  shareCountChange: number | null

  // Valuation bridge
  capitalEmployedPerShare: number
  multipleOfCapitalPaid: number
  goingInYield: number
  impliedPriceBase: number
  impliedPriceMidCycle: number | null
  impliedPriceTrough: number | null
  marginOfSafetyBase: number | null
  marginOfSafetyMidCycle: number | null

  // Score
  scores: ScoreBreakdown
  totalScore: number
  maxScore: number
  verdict: 'strong_candidate' | 'watchlist' | 'weak' | 'pass'
}

export interface ScoreBreakdown {
  roceLevel: number
  cyclicalityDiscount: number
  goodwillDrag: number
  ownerEarningsQuality: number
  dollarTest: number
  shareCountTrend: number
  debtDiscipline: number
  moat: number
  managementAccounting: number
}

export interface Analysis {
  id: string
  createdAt: string
  updatedAt: string
  inputs: FinancialInputs
  calculations: MeadCalculations
  aiAnalysis: AiAnalysis | null
  notes: string
}

export interface AiAnalysis {
  roceInterpretation: string
  ownerEarningsInterpretation: string
  moatAssessment: string
  managementAssessment: string
  balanceSheetAssessment: string
  valuationAssessment: string
  keyRisks: string[]
  verdict: string
  generatedAt: string
}
