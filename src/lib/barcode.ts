/** The barcode types the generator supports, and the rules for what each can hold. */
export type BarcodeFormat = 'CODE128' | 'EAN13' | 'EAN8' | 'UPC' | 'CODE39' | 'ITF14'

export const BARCODE_FORMATS: Array<{ value: BarcodeFormat; label: string; hint: string; sample: string }> = [
  { value: 'CODE128', label: 'Code 128', hint: 'Letters, digits and symbols. A good choice for your own shop labels.', sample: 'SKU-10245' },
  { value: 'EAN13', label: 'EAN-13', hint: '12 digits (the check digit is added) or all 13 digits.', sample: '890123456789' },
  { value: 'EAN8', label: 'EAN-8', hint: '7 digits (the check digit is added) or all 8 digits.', sample: '8901234' },
  { value: 'UPC', label: 'UPC-A', hint: '11 digits (the check digit is added) or all 12 digits.', sample: '03600029145' },
  { value: 'CODE39', label: 'Code 39', hint: 'Capital letters, digits, space and - . $ / + %', sample: 'LOCALPOS 39' },
  { value: 'ITF14', label: 'ITF-14', hint: '13 digits (the check digit is added) or all 14 digits. Used on cartons.', sample: '1890123456789' },
]

/** GS1 check digit for a string of digits that does not yet include it (weights 3,1,3... from the right). */
export function gs1CheckDigit(digits: string): number {
  let sum = 0
  for (let i = 0; i < digits.length; i++) sum += Number(digits[digits.length - 1 - i]) * (i % 2 === 0 ? 3 : 1)
  return (10 - (sum % 10)) % 10
}

const GS1_LENGTH: Partial<Record<BarcodeFormat, number>> = { EAN13: 13, EAN8: 8, UPC: 12, ITF14: 14 }

export type BarcodeCheck = { ok: true; value: string } | { ok: false; error: string }

/** Validate what was typed. For the numeric retail formats the returned value always includes the check digit. */
export function checkBarcode(format: BarcodeFormat, raw: string): BarcodeCheck {
  const full = GS1_LENGTH[format]
  if (full) {
    const v = raw.replace(/[\s-]/g, '')
    const name = BARCODE_FORMATS.find((f) => f.value === format)!.label
    if (v === '') return { ok: false, error: `Enter ${full - 1} or ${full} digits.` }
    if (!/^\d+$/.test(v)) return { ok: false, error: `${name} holds digits only.` }
    if (v.length === full - 1) return { ok: true, value: v + gs1CheckDigit(v) }
    if (v.length === full) {
      const expected = gs1CheckDigit(v.slice(0, -1))
      return Number(v.at(-1)) === expected ? { ok: true, value: v } : { ok: false, error: `The last digit should be ${expected}. It is a check digit worked out from the others. Enter the first ${full - 1} digits and it is added for you.` }
    }
    return { ok: false, error: `${name} needs ${full - 1} or ${full} digits. You entered ${v.length}.` }
  }
  if (raw === '') return { ok: false, error: 'Type the text or number for the barcode.' }
  if (raw.length > 48) return { ok: false, error: 'That is too long to print as a readable barcode. Keep it to 48 characters or fewer.' }
  if (format === 'CODE39') {
    const v = raw.toUpperCase()
    return /^[0-9A-Z\-. $/+%]+$/.test(v) ? { ok: true, value: v } : { ok: false, error: 'Code 39 holds capital letters, digits, space and - . $ / + % only.' }
  }
  return /^[\x20-\x7e]+$/.test(raw) ? { ok: true, value: raw } : { ok: false, error: 'Code 128 holds English letters, digits and common symbols only.' }
}
