import type { FinancialInputs } from './types'

const FMP_BASE = 'https://financialmodelingprep.com/api/v3'

// ─── FMP Response Types ───────────────────────────────────────────────────────

interface FmpIncomeStatement {
  symbol: string
  date: string
  calendarYear: string
  revenue: number | null
  operatingIncome: number | null
  netIncome: number | null
  netIncomeDeduction: number | null
  minorityInterest: number | null
  incomeTaxExpense: number | null
  incomeBeforeTax: number | null
}

interface FmpBalanceSheet {
  date: string
  totalAssets: number | null
  cashAndCashEquivalents: number | null
  goodwillAndIntangibleAssets: number | null
  goodwill: number | null
  intangibleAssets: number | null
  totalCurrentLiabilities: number | null
  shortTermDebt: number | null
  totalDebt: number | null
  totalStockholdersEquity: number | null
  totalEquity: number | null
  minorityInterest: number | null
  propertyPlantEquipmentNet: number | null
}

interface FmpCashFlow {
  date: string
  depreciationAndAmortization: number | null
  capitalExpenditure: number | null
  weightedAverageShsOut: number | null
}

interface FmpQuote {
  symbol: string
  price: number | null
  name: string | null
}

// ─── Error Response ───────────────────────────────────────────────────────────

export interface FmpError {
  error: true
  message: string
}

export interface FmpResult {
  error?: false
  inputs: Partial<FinancialInputs>
  dataGaps: string[]
}

type FetchResult = FmpResult | FmpError

// ─── Helpers ─────────────────────────────────────────────────────────────────

function safeNum(value: number | null | undefined, fallback = 0): number {
  if (value === null || value === undefined || isNaN(value)) return fallback
  return value
}

function safeDiv(numerator: number, denominator: number | null | undefined): number {
  if (!denominator || denominator === 0) return 0
  return numerator / denominator
}

async function fetchFmpEndpoint<T>(url: string): Promise<T[] | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json() as T[] | { 'Error Message': string }
    if (!Array.isArray(data)) return null
    return data
  } catch {
    return null
  }
}

async function fetchFmpQuote(url: string): Promise<FmpQuote[] | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json() as FmpQuote[] | { 'Error Message': string }
    if (!Array.isArray(data)) return null
    return data
  } catch {
    return null
  }
}

// ─── Main Fetch Function ──────────────────────────────────────────────────────

export async function fetchFinancials(ticker: string, apiKey: string): Promise<FetchResult> {
  if (!apiKey) {
    return { error: true, message: 'FMP_API_KEY is not configured.' }
  }

  const symbol = ticker.toUpperCase().trim()
  if (!symbol) {
    return { error: true, message: 'Ticker symbol is required.' }
  }

  const [incomeData, balanceData, cashflowData, quoteData] = await Promise.all([
    fetchFmpEndpoint<FmpIncomeStatement>(
      `${FMP_BASE}/income-statement/${symbol}?limit=1&apikey=${apiKey}`
    ),
    fetchFmpEndpoint<FmpBalanceSheet>(
      `${FMP_BASE}/balance-sheet-statement/${symbol}?limit=1&apikey=${apiKey}`
    ),
    fetchFmpEndpoint<FmpCashFlow>(
      `${FMP_BASE}/cash-flow-statement/${symbol}?limit=1&apikey=${apiKey}`
    ),
    fetchFmpQuote(
      `${FMP_BASE}/quote/${symbol}?apikey=${apiKey}`
    ),
  ])

  if (!incomeData || incomeData.length === 0) {
    return { error: true, message: `No financial data found for ticker "${symbol}". Verify the symbol and your FMP API key.` }
  }

  const income = incomeData[0]
  const balance = balanceData?.[0]
  const cashflow = cashflowData?.[0]
  const quote = quoteData?.[0]

  const dataGaps: string[] = []

  // ─── Income Statement ───────────────────────────────────────────────────────

  const revenue = safeNum(income.revenue)
  if (!income.revenue) dataGaps.push('revenue')

  const ebit = safeNum(income.operatingIncome)
  if (!income.operatingIncome) dataGaps.push('ebit (operatingIncome)')

  const netIncome = safeNum(income.netIncome)
  if (!income.netIncome) dataGaps.push('netIncome')

  const minorityInterestIncome = safeNum(income.minorityInterest)

  // netIncomeToCommon: use netIncomeDeduction if available, else netIncome minus minority
  const netIncomeToCommon = income.netIncomeDeduction !== null && income.netIncomeDeduction !== undefined
    ? safeNum(income.netIncomeDeduction)
    : netIncome - minorityInterestIncome

  const incomeBeforeTax = safeNum(income.incomeBeforeTax)
  const incomeTaxExpense = safeNum(income.incomeTaxExpense)
  const effectiveTaxRate = incomeBeforeTax !== 0 ? safeDiv(incomeTaxExpense, incomeBeforeTax) : 0.25

  // Fiscal year from date string
  const fiscalYear = income.date ? parseInt(income.date.substring(0, 4), 10) : new Date().getFullYear()

  // ─── Balance Sheet ─────────────────────────────────────────────────────────

  const totalAssets = safeNum(balance?.totalAssets)
  if (!balance?.totalAssets) dataGaps.push('totalAssets')

  const cash = safeNum(balance?.cashAndCashEquivalents)

  // Goodwill and intangibles: try combined field first, then sum components
  let goodwillAndIntangibles: number
  if (balance?.goodwillAndIntangibleAssets !== null && balance?.goodwillAndIntangibleAssets !== undefined) {
    goodwillAndIntangibles = safeNum(balance.goodwillAndIntangibleAssets)
  } else {
    goodwillAndIntangibles = safeNum(balance?.goodwill) + safeNum(balance?.intangibleAssets)
  }

  const totalCurrentLiabilities = safeNum(balance?.totalCurrentLiabilities)
  const shortTermDebt = safeNum(balance?.shortTermDebt)
  const totalDebt = safeNum(balance?.totalDebt)

  // Equity: prefer totalStockholdersEquity (common equity), fall back to totalEquity
  const totalEquity = safeNum(balance?.totalStockholdersEquity ?? balance?.totalEquity)
  if (!balance?.totalStockholdersEquity && !balance?.totalEquity) dataGaps.push('totalEquity')

  const minorityEquity = safeNum(balance?.minorityInterest)
  const netPPE = safeNum(balance?.propertyPlantEquipmentNet)

  // ─── Cash Flow ─────────────────────────────────────────────────────────────

  const depreciation = safeNum(cashflow?.depreciationAndAmortization)
  if (!cashflow?.depreciationAndAmortization) dataGaps.push('depreciation')

  // FMP gives capex as negative — take abs value
  const totalCapex = Math.abs(safeNum(cashflow?.capitalExpenditure))

  // Shares outstanding in millions
  const sharesRaw = safeNum(cashflow?.weightedAverageShsOut)
  // FMP reports in absolute numbers; divide by 1e6 to get millions
  const sharesOutstanding = sharesRaw > 1e6 ? sharesRaw / 1e6 : sharesRaw
  if (!cashflow?.weightedAverageShsOut) dataGaps.push('sharesOutstanding')

  // ─── Quote ────────────────────────────────────────────────────────────────

  const stockPrice = safeNum(quote?.price)
  if (!quote?.price) dataGaps.push('stockPrice')

  const companyName = quote?.name ?? symbol

  // ─── Manual Entry Fields (leave as 0 — will be filled in edit page) ───────

  dataGaps.push(
    'sharesOutstanding5yrAgo (manual entry required)',
    'retainedEarnings5yr (manual entry required)',
    'marketCap5yrAgo (manual entry required)',
    'marketCapNow (manual — or calculate from sharesOutstanding * stockPrice)',
    'troughEbit (manual entry required for cyclical businesses)',
    'troughYear (manual entry required)',
    'moatTypes (qualitative — manual entry)',
    'moatDurability (qualitative — manual entry)',
    'cyclicalityFlag (qualitative — manual entry)',
    'managementOrientation (qualitative — manual entry)',
    'debtDiscipline (qualitative — manual entry)',
    'accountingQuality (qualitative — manual entry)'
  )

  const marketCapNow = stockPrice > 0 && sharesOutstanding > 0
    ? stockPrice * sharesOutstanding
    : 0

  const inputs: Partial<FinancialInputs> = {
    ticker: symbol,
    companyName,
    fiscalYear,
    currency: 'USD',
    revenue,
    ebit,
    netIncome,
    netIncomeToCommon,
    minorityInterest: minorityInterestIncome,
    depreciation,
    totalCapex,
    effectiveTaxRate,
    totalAssets,
    cash,
    goodwillAndIntangibles,
    totalCurrentLiabilities,
    shortTermDebt,
    totalDebt,
    totalEquity,
    minorityEquity,
    netPPE,
    sharesOutstanding,
    stockPrice,
    requiredReturn: 10, // default hurdle rate
    // 5yr historical — manual
    sharesOutstanding5yrAgo: 0,
    retainedEarnings5yr: 0,
    marketCap5yrAgo: 0,
    marketCapNow,
    // Trough — manual
    troughEbit: 0,
    troughYear: 0,
    // Maintenance capex — will be estimated in API route
    maintenanceCapex: 0,
    maintenanceCapexSource: 'estimated',
    // Qualitative — manual
    moatTypes: 0,
    moatDurability: 'stable',
    cyclicalityFlag: 'stable',
    managementOrientation: 'mixed',
    debtDiscipline: 'moderate',
    accountingQuality: 'standard',
  }

  return { inputs, dataGaps }
}
