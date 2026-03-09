import type { FinancialInputs, MeadCalculations, ScoreBreakdown } from './types'

// ─── Capital Employed ───────────────────────────────────────────────────────

export function calculateExcessCash(inputs: FinancialInputs): number {
  return Math.max(0, inputs.cash - inputs.revenue * 0.02)
}

export function calculateSpontaneousLiabilities(inputs: FinancialInputs): number {
  return inputs.totalCurrentLiabilities - inputs.shortTermDebt
}

export function calculateCapitalEmployedTotal(inputs: FinancialInputs): number {
  const excessCash = calculateExcessCash(inputs)
  const spontaneousLiabilities = calculateSpontaneousLiabilities(inputs)
  return inputs.totalAssets - excessCash - spontaneousLiabilities
}

export function calculateCapitalEmployedTangible(inputs: FinancialInputs): number {
  const ceTotal = calculateCapitalEmployedTotal(inputs)
  return ceTotal - inputs.goodwillAndIntangibles
}

// ─── ROCE ────────────────────────────────────────────────────────────────────

export function calculateMaintenanceCapexEstimate(inputs: FinancialInputs): number {
  const assetIntensity = inputs.revenue > 0 ? inputs.netPPE / inputs.revenue : 0
  const ratio = assetIntensity > 0.4 ? 0.65 : assetIntensity > 0.15 ? 0.50 : 0.35
  return inputs.totalCapex * ratio
}

// ─── Main Calculation Function ───────────────────────────────────────────────

export function calculateMead(inputs: FinancialInputs): MeadCalculations {
  // Capital employed
  const excessCash = calculateExcessCash(inputs)
  const spontaneousLiabilities = calculateSpontaneousLiabilities(inputs)
  const capitalEmployedTotal = calculateCapitalEmployedTotal(inputs)
  const capitalEmployedTangible = calculateCapitalEmployedTangible(inputs)

  // ROCE decomposition
  const capitalTurnoverTotal = capitalEmployedTotal !== 0 ? inputs.revenue / capitalEmployedTotal : 0
  const capitalTurnoverTangible = capitalEmployedTangible !== 0 ? inputs.revenue / capitalEmployedTangible : 0
  const ebitMargin = inputs.revenue !== 0 ? (inputs.ebit / inputs.revenue) * 100 : 0
  const roceTotal = capitalEmployedTotal !== 0 ? (inputs.ebit / capitalEmployedTotal) * 100 : 0
  const roceTangible = capitalEmployedTangible !== 0 ? (inputs.ebit / capitalEmployedTangible) * 100 : 0
  const goodwillDrag = roceTangible - roceTotal

  // Owner earnings
  const assetIntensity = inputs.revenue > 0 ? inputs.netPPE / inputs.revenue : 0
  const growthCapex = inputs.totalCapex - inputs.maintenanceCapex
  const ownerEarningsConsolidated = inputs.netIncome + inputs.depreciation - inputs.maintenanceCapex
  const ownerEarningsAttributable = inputs.netIncomeToCommon + inputs.depreciation - inputs.maintenanceCapex
  const ownerEarningsPerShare = inputs.sharesOutstanding !== 0 ? ownerEarningsAttributable / inputs.sharesOutstanding : 0
  const oeToNiRatio = inputs.netIncomeToCommon !== 0 ? (ownerEarningsAttributable / inputs.netIncomeToCommon) * 100 : 0
  const nopat = inputs.ebit * (1 - inputs.effectiveTaxRate)
  const freeCashFlow = nopat + inputs.depreciation - inputs.totalCapex

  // Balance sheet
  const netDebt = inputs.totalDebt - inputs.cash
  const netDebtToEbitCurrent = inputs.ebit !== 0 ? netDebt / inputs.ebit : 0
  const netDebtToEbitTrough = inputs.troughEbit > 0 ? netDebt / inputs.troughEbit : null
  const cashConversionCycle = null // Requires AR, inventory, AP data not in FinancialInputs

  const commonEquity = inputs.totalEquity - inputs.minorityEquity
  const bookValuePerShare = inputs.sharesOutstanding !== 0 ? commonEquity / inputs.sharesOutstanding : 0
  const tangibleBookPerShare = inputs.sharesOutstanding !== 0
    ? (commonEquity - inputs.goodwillAndIntangibles) / inputs.sharesOutstanding
    : 0
  const priceToBook = bookValuePerShare !== 0 ? inputs.stockPrice / bookValuePerShare : null
  const priceToTangibleBook = tangibleBookPerShare !== 0 ? inputs.stockPrice / tangibleBookPerShare : null

  // $1 test and share count
  const marketValueCreated = inputs.marketCapNow - inputs.marketCap5yrAgo
  const dollarTest = inputs.retainedEarnings5yr > 0 ? marketValueCreated / inputs.retainedEarnings5yr : null
  const shareCountChange = inputs.sharesOutstanding5yrAgo > 0
    ? ((inputs.sharesOutstanding - inputs.sharesOutstanding5yrAgo) / inputs.sharesOutstanding5yrAgo) * 100
    : null

  // Valuation bridge
  const capitalEmployedPerShare = inputs.sharesOutstanding !== 0 ? capitalEmployedTotal / inputs.sharesOutstanding : 0
  const multipleOfCapitalPaid = capitalEmployedPerShare !== 0 ? inputs.stockPrice / capitalEmployedPerShare : 0
  const goingInYield = multipleOfCapitalPaid !== 0 ? roceTotal / multipleOfCapitalPaid : 0
  const impliedPriceBase = inputs.sharesOutstanding !== 0 && inputs.requiredReturn > 0
    ? inputs.ebit / (inputs.requiredReturn / 100) / inputs.sharesOutstanding
    : 0
  const marginOfSafetyBase = impliedPriceBase !== 0
    ? ((impliedPriceBase - inputs.stockPrice) / impliedPriceBase) * 100
    : null

  // Mid-cycle and trough implied prices (for cyclical companies)
  // Mid-cycle: average of current EBIT and trough EBIT (simple heuristic)
  const midCycleEbit = inputs.troughEbit > 0 ? (inputs.ebit + inputs.troughEbit) / 2 : null
  const impliedPriceMidCycle = midCycleEbit !== null && inputs.sharesOutstanding !== 0 && inputs.requiredReturn > 0
    ? midCycleEbit / (inputs.requiredReturn / 100) / inputs.sharesOutstanding
    : null
  const impliedPriceTrough = inputs.troughEbit > 0 && inputs.sharesOutstanding !== 0 && inputs.requiredReturn > 0
    ? inputs.troughEbit / (inputs.requiredReturn / 100) / inputs.sharesOutstanding
    : null
  const marginOfSafetyMidCycle = impliedPriceMidCycle !== null && impliedPriceMidCycle !== 0
    ? ((impliedPriceMidCycle - inputs.stockPrice) / impliedPriceMidCycle) * 100
    : null

  // Scores
  const scores = calculateScores(inputs, {
    roceTotal,
    goodwillDrag,
    oeToNiRatio,
    ownerEarningsAttributable,
    dollarTest,
    shareCountChange,
    netDebtToEbitCurrent,
    netDebtToEbitTrough,
  })

  const totalScore = Object.values(scores).reduce((sum, v) => sum + v, 0)
  const maxScore = 100
  const verdict = getVerdict(totalScore, maxScore)

  return {
    excessCash,
    spontaneousLiabilities,
    capitalEmployedTotal,
    capitalEmployedTangible,
    capitalTurnoverTotal,
    capitalTurnoverTangible,
    ebitMargin,
    roceTotal,
    roceTangible,
    goodwillDrag,
    assetIntensity,
    growthCapex,
    ownerEarningsConsolidated,
    ownerEarningsAttributable,
    ownerEarningsPerShare,
    oeToNiRatio,
    freeCashFlow,
    netDebt,
    netDebtToEbitCurrent,
    netDebtToEbitTrough,
    cashConversionCycle,
    bookValuePerShare,
    tangibleBookPerShare,
    priceToBook,
    priceToTangibleBook,
    marketValueCreated,
    dollarTest,
    shareCountChange,
    capitalEmployedPerShare,
    multipleOfCapitalPaid,
    goingInYield,
    impliedPriceBase,
    impliedPriceMidCycle,
    impliedPriceTrough,
    marginOfSafetyBase,
    marginOfSafetyMidCycle,
    scores,
    totalScore,
    maxScore,
    verdict,
  }
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

interface ScoreInputs {
  roceTotal: number
  goodwillDrag: number
  oeToNiRatio: number
  ownerEarningsAttributable: number
  dollarTest: number | null
  shareCountChange: number | null
  netDebtToEbitCurrent: number
  netDebtToEbitTrough: number | null
}

export function calculateScores(inputs: FinancialInputs, calcs: ScoreInputs): ScoreBreakdown {
  // ROCE level (0–30)
  let roceLevel: number
  if (calcs.roceTotal >= 20) roceLevel = 30
  else if (calcs.roceTotal >= 15) roceLevel = 22
  else if (calcs.roceTotal >= 10) roceLevel = 14
  else if (calcs.roceTotal >= 5) roceLevel = 6
  else roceLevel = 0

  // Cyclicality discount (subtracted)
  let cyclicalityDiscount: number
  if (inputs.cyclicalityFlag === 'highly_cyclical') cyclicalityDiscount = -8
  else if (inputs.cyclicalityFlag === 'moderate') cyclicalityDiscount = -4
  else cyclicalityDiscount = 0

  // Goodwill drag (0–10)
  let goodwillDrag: number
  if (calcs.goodwillDrag < 5) goodwillDrag = 10
  else if (calcs.goodwillDrag < 15) goodwillDrag = 6
  else goodwillDrag = 2

  // Owner earnings quality (0–10)
  let ownerEarningsQuality: number
  if (calcs.oeToNiRatio >= 90) ownerEarningsQuality = 10
  else if (calcs.oeToNiRatio >= 70) ownerEarningsQuality = 6
  else if (calcs.ownerEarningsAttributable > 0) ownerEarningsQuality = 3
  else ownerEarningsQuality = 0

  // $1 test (0–15)
  let dollarTestScore: number
  if (calcs.dollarTest === null) dollarTestScore = 0
  else if (calcs.dollarTest >= 1.5) dollarTestScore = 15
  else if (calcs.dollarTest >= 1.0) dollarTestScore = 10
  else if (calcs.dollarTest >= 0.5) dollarTestScore = 5
  else dollarTestScore = 0

  // Share count trend (0–10)
  let shareCountTrend: number
  if (calcs.shareCountChange === null) shareCountTrend = 0
  else if (calcs.shareCountChange <= -5) shareCountTrend = 10
  else if (calcs.shareCountChange <= 0) shareCountTrend = 7
  else if (calcs.shareCountChange <= 5) shareCountTrend = 4
  else shareCountTrend = 0

  // Debt discipline (0–10) — use trough ratio for cyclical companies
  const debtRatio = inputs.cyclicalityFlag !== 'stable' && calcs.netDebtToEbitTrough !== null
    ? calcs.netDebtToEbitTrough
    : calcs.netDebtToEbitCurrent
  let debtDisciplineScore: number
  if (debtRatio <= 1) debtDisciplineScore = 10
  else if (debtRatio <= 2) debtDisciplineScore = 7
  else if (debtRatio <= 3) debtDisciplineScore = 3
  else debtDisciplineScore = 0

  // Moat (0–10)
  let moatDurabilityScore: number
  if (inputs.moatDurability === 'widening') moatDurabilityScore = 2
  else if (inputs.moatDurability === 'stable') moatDurabilityScore = 1
  else moatDurabilityScore = 0
  const moat = Math.min(10, Math.max(0, inputs.moatTypes + moatDurabilityScore * 2))

  // Management & accounting (0–5)
  let orientationScore: number
  if (inputs.managementOrientation === 'owner_oriented') orientationScore = 2
  else if (inputs.managementOrientation === 'mixed') orientationScore = 1
  else orientationScore = 0

  let accountingScore: number
  if (inputs.accountingQuality === 'conservative') accountingScore = 2
  else if (inputs.accountingQuality === 'standard') accountingScore = 1
  else accountingScore = 0

  let debtDiscScore: number
  if (inputs.debtDiscipline === 'conservative') debtDiscScore = 2
  else if (inputs.debtDiscipline === 'moderate') debtDiscScore = 1
  else debtDiscScore = 0

  const managementAccounting = Math.min(5, Math.max(0, orientationScore + accountingScore + debtDiscScore))

  return {
    roceLevel,
    cyclicalityDiscount,
    goodwillDrag,
    ownerEarningsQuality,
    dollarTest: dollarTestScore,
    shareCountTrend,
    debtDiscipline: debtDisciplineScore,
    moat,
    managementAccounting,
  }
}

export function getVerdict(totalScore: number, maxScore: number): 'strong_candidate' | 'watchlist' | 'weak' | 'pass' {
  const ratio = totalScore / maxScore
  if (ratio >= 0.75) return 'strong_candidate'
  if (ratio >= 0.55) return 'watchlist'
  if (ratio >= 0.38) return 'weak'
  return 'pass'
}
