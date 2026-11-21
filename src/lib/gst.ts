import { round2 } from './money'

export type GstMode = 'add' | 'remove'

export interface GstResult {
  /** Value before tax. */
  net: number
  /** Total GST. */
  tax: number
  /** Value including tax. */
  gross: number
  /** Half of the tax each when the sale is within one state. cgst + sgst always equals tax. */
  cgst: number
  sgst: number
}

/**
 * GST on an amount.
 *   add:    the amount is before tax.   GST = amount x rate / 100,          total = amount + GST
 *   remove: the amount includes tax.    net = amount x 100 / (100 + rate),  GST   = amount - net
 * Every figure is rounded to paise. The halves are derived from the rounded tax (SGST = tax - CGST), so they always add back to it.
 */
export function calculateGst(amount: number, rate: number, mode: GstMode): GstResult {
  const a = Number.isFinite(amount) && amount > 0 ? amount : 0
  const r = Number.isFinite(rate) && rate > 0 ? rate : 0
  let net: number
  let tax: number
  let gross: number
  if (mode === 'add') {
    net = round2(a)
    tax = round2((a * r) / 100)
    gross = round2(net + tax)
  } else {
    gross = round2(a)
    net = round2((a * 100) / (100 + r))
    tax = round2(gross - net)
  }
  const cgst = round2(tax / 2)
  return { net, tax, gross, cgst, sgst: round2(tax - cgst) }
}
