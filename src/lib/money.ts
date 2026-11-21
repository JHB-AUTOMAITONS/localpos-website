/** Money helpers for the calculators and document tools. */

/** Round to two decimals, half away from zero, without the usual binary surprises (1.005 -> 1.01). */
export function round2(n: number): number {
  const r = Math.round((Math.abs(n) + Number.EPSILON) * 100) / 100
  return n < 0 ? -r : r
}

const fmt2 = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** 118000 -> "1,18,000.00" (Indian digit grouping, always two decimals). */
export const money = (n: number): string => fmt2.format(round2(n) + 0)

/** Parse what someone typed into a number field. Empty, negative and non-numeric input count as 0. */
export function toNumber(v: string): number {
  const n = Number(String(v).replace(/,/g, '').trim())
  return Number.isFinite(n) && n > 0 ? n : 0
}

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

const below100 = (n: number): string => (n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? ` ${ONES[n % 10]}` : ''}`)
const below1000 = (n: number): string => [n >= 100 ? `${ONES[Math.floor(n / 100)]} Hundred` : '', below100(n % 100)].filter(Boolean).join(' ')

/** Whole number in words using the Indian system: 12345678 -> "One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight". */
function wordsIndian(n: number): string {
  if (n === 0) return 'Zero'
  const crore = Math.floor(n / 10000000)
  const lakh = Math.floor((n % 10000000) / 100000)
  const thousand = Math.floor((n % 100000) / 1000)
  const rest = n % 1000
  return [crore ? `${wordsIndian(crore)} Crore` : '', lakh ? `${below100(lakh)} Lakh` : '', thousand ? `${below100(thousand)} Thousand` : '', below1000(rest)].filter(Boolean).join(' ')
}

/** 1180.5 -> "Rupees One Thousand One Hundred Eighty and Fifty Paise Only". */
export function amountInWords(amount: number): string {
  const total = Math.round(round2(amount) * 100)
  const rupees = Math.floor(total / 100)
  const paise = total % 100
  if (rupees === 0 && paise > 0) return `${below100(paise)} Paise Only`
  return `Rupees ${wordsIndian(rupees)}${paise ? ` and ${below100(paise)} Paise` : ''} Only`
}
