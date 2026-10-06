const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
const inr2 = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** Format a number as Indian rupees, e.g. 125000 -> "₹1,25,000". */
export function rupees(value: number, decimals = false): string {
  return `₹${(decimals ? inr2 : inr).format(value)}`
}

/** Format a number with Indian digit grouping and no currency symbol. */
export function num(value: number): string {
  return inr.format(value)
}

/** "2026-09-14" -> "14 Sep 2026" (stable across server and client). */
export function longDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
