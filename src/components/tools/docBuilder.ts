import type { TemplateDoc, TBlock } from '@/components/templates/types'
import { amountInWords, money, round2, toNumber } from '@/lib/money'

/** The four documents the builder makes. They share one form and one calculation; the labels and a few extra fields differ. */
export type DocKind = 'invoice' | 'quotation' | 'proforma' | 'purchase-order'
export type TaxMode = 'intra' | 'inter' | 'none'

export interface ExtraField {
  key: string
  label: string
  type: 'text' | 'date' | 'textarea'
  /** Where the value appears in the document: with the number and date, in a delivery column, or as a paragraph under the table. */
  group: 'meta' | 'delivery' | 'text'
  sample: string
  placeholder?: string
}

export interface DocConfig {
  title: string
  fileName: string
  /** Form group titles. */
  usTitle: string
  themTitle: string
  /** Heading above the other party in the document. */
  themHeading: string
  detailsHeading: string
  numberLabel: string
  numberSample: string
  dateLabel: string
  deliveryHeading?: string
  extras: ExtraField[]
  terms: string
  /** A fixed line printed on the document. */
  footnote?: string
  themSample: { name: string; address: string; gstin: string; phone: string }
  signLabels: (business: string) => string[]
}

const us = { name: 'Sri Lakshmi Traders', address: '14 Market Road, Chickpet, Bengaluru, Karnataka 560053', gstin: '29ABCDE1234F1Z5', phone: '98765 43210', email: 'billing@example.com' }
const customer = { name: 'Anand Stores', address: '7 Gandhi Bazaar, Mysuru, Karnataka 570001', gstin: '29PQRSX5678K1Z2', phone: '91234 56780' }
const authorised = (business: string) => `For ${business || 'the business'} (Authorised signatory)`

export const DOC_CONFIGS: Record<DocKind, DocConfig> = {
  invoice: {
    title: 'Tax Invoice',
    fileName: 'invoice',
    usTitle: 'Your business (seller)',
    themTitle: 'Customer',
    themHeading: 'Bill to',
    detailsHeading: 'Invoice details',
    numberLabel: 'Invoice no.',
    numberSample: 'INV/26-27/001',
    dateLabel: 'Invoice date',
    extras: [
      { key: 'due', label: 'Due date', type: 'date', group: 'meta', sample: '' },
      { key: 'pos', label: 'Place of supply', type: 'text', group: 'meta', sample: 'Karnataka (29)', placeholder: 'State and code' },
    ],
    terms: 'Payment is due by the due date shown above.\nGoods once sold are taken back only as per our return policy.',
    themSample: customer,
    signLabels: (b) => ['Receiver’s signature', authorised(b)],
  },
  quotation: {
    title: 'Quotation',
    fileName: 'quotation',
    usTitle: 'Your business',
    themTitle: 'Customer',
    themHeading: 'Quotation for',
    detailsHeading: 'Quotation details',
    numberLabel: 'Quotation no.',
    numberSample: 'QTN/26-27/001',
    dateLabel: 'Quotation date',
    extras: [{ key: 'valid', label: 'Valid until', type: 'date', group: 'meta', sample: '' }],
    terms: 'Prices are valid until the date shown above.\nDelivery within 7 working days of a confirmed order.\n50% advance with the order, balance on delivery.',
    themSample: customer,
    signLabels: (b) => ['Accepted by (customer)', authorised(b)],
  },
  proforma: {
    title: 'Proforma Invoice',
    fileName: 'proforma-invoice',
    usTitle: 'Your business (seller)',
    themTitle: 'Buyer',
    themHeading: 'Buyer',
    detailsHeading: 'Proforma details',
    numberLabel: 'Proforma no.',
    numberSample: 'PI/26-27/001',
    dateLabel: 'Date',
    deliveryHeading: 'Shipping',
    extras: [
      { key: 'valid', label: 'Valid until', type: 'date', group: 'meta', sample: '' },
      { key: 'shipTo', label: 'Ship to', type: 'text', group: 'delivery', sample: '7 Gandhi Bazaar, Mysuru, Karnataka 570001', placeholder: 'Delivery address' },
      { key: 'dispatch', label: 'Mode of dispatch', type: 'text', group: 'delivery', sample: 'Road transport', placeholder: 'Courier, transport, pickup' },
      { key: 'dispatchDate', label: 'Expected dispatch', type: 'date', group: 'delivery', sample: '' },
      { key: 'payment', label: 'Payment terms', type: 'text', group: 'text', sample: '100% advance before dispatch.' },
      { key: 'bank', label: 'Bank details', type: 'textarea', group: 'text', sample: 'Account name: Sri Lakshmi Traders\nAccount no.: 0000 0000 0000 · IFSC: ABCD0000000' },
    ],
    terms: 'Goods will be dispatched after the advance is received.\nA tax invoice will be issued at the time of supply.',
    footnote: 'This is a proforma invoice and not a tax invoice.',
    themSample: customer,
    signLabels: (b) => [authorised(b)],
  },
  'purchase-order': {
    title: 'Purchase Order',
    fileName: 'purchase-order',
    usTitle: 'Your business (buyer)',
    themTitle: 'Supplier',
    themHeading: 'Supplier',
    detailsHeading: 'Order details',
    numberLabel: 'PO no.',
    numberSample: 'PO/26-27/001',
    dateLabel: 'Order date',
    deliveryHeading: 'Delivery',
    extras: [
      { key: 'expected', label: 'Expected delivery', type: 'date', group: 'delivery', sample: '' },
      { key: 'deliverTo', label: 'Deliver to', type: 'text', group: 'delivery', sample: '14 Market Road, Chickpet, Bengaluru, Karnataka 560053', placeholder: 'Shop or godown address' },
      { key: 'payment', label: 'Payment terms', type: 'text', group: 'text', sample: 'Within 30 days of delivery, by bank transfer.' },
    ],
    terms: 'Please quote this PO number on your delivery challan and invoice.\nGoods that do not match the order or arrive damaged will be returned.',
    themSample: { name: 'Mysore Agro Mills', address: '52 Industrial Suburb, Mysuru, Karnataka 570008', gstin: '29PQRSX5678K1Z2', phone: '91234 56780' },
    signLabels: (b) => ['Supplier’s acceptance', authorised(b)],
  },
}

export interface Item {
  id: number
  desc: string
  hsn: string
  qty: string
  rate: string
  disc: string
  gst: string
}

export interface DocState {
  /** Text fields: us.name, us.address, us.gstin, us.phone, us.email, them.*, number, date, terms, notes, and one per extra field. */
  f: Record<string, string>
  items: Item[]
  tax: TaxMode
  roundOff: boolean
}

export const MAX_ITEMS = 50

export function sampleState(kind: DocKind): DocState {
  const c = DOC_CONFIGS[kind]
  const f: Record<string, string> = {
    'us.name': us.name,
    'us.address': us.address,
    'us.gstin': us.gstin,
    'us.phone': us.phone,
    'us.email': us.email,
    'them.name': c.themSample.name,
    'them.address': c.themSample.address,
    'them.gstin': c.themSample.gstin,
    'them.phone': c.themSample.phone,
    number: c.numberSample,
    date: '',
    terms: c.terms,
    notes: '',
  }
  for (const e of c.extras) f[e.key] = e.sample
  return {
    f,
    tax: 'intra',
    roundOff: true,
    items: [
      { id: 1, desc: 'Basmati rice, 25 kg bag', hsn: '1006', qty: '4', rate: '1900', disc: '0', gst: '5' },
      { id: 2, desc: 'Mobile phone charger', hsn: '8504', qty: '10', rate: '220', disc: '5', gst: '18' },
    ],
  }
}

export function blankState(kind: DocKind): DocState {
  const f: Record<string, string> = { number: '', date: '', terms: '', notes: '' }
  for (const k of ['name', 'address', 'gstin', 'phone', 'email']) {
    f[`us.${k}`] = ''
    f[`them.${k}`] = ''
  }
  for (const e of DOC_CONFIGS[kind].extras) f[e.key] = ''
  return { f, tax: 'intra', roundOff: true, items: [{ id: 1, desc: '', hsn: '', qty: '1', rate: '', disc: '0', gst: '18' }] }
}

export interface Totals {
  lines: Array<{ gross: number; discount: number; taxable: number; tax: number; total: number }>
  subtotal: number
  discount: number
  taxable: number
  tax: number
  cgst: number
  sgst: number
  roundOff: number
  grand: number
}

/**
 * Per line: gross = qty x rate, discount = gross x disc%, taxable = gross - discount, tax = taxable x GST%. Each is rounded to paise,
 * and the totals are sums of the rounded lines, so the document always adds up when someone checks it with a calculator.
 */
export function computeTotals(state: DocState): Totals {
  const lines = state.items.map((it) => {
    const gross = round2(toNumber(it.qty) * toNumber(it.rate))
    const discount = round2((gross * Math.min(toNumber(it.disc), 100)) / 100)
    const taxable = round2(gross - discount)
    const tax = state.tax === 'none' ? 0 : round2((taxable * Math.min(toNumber(it.gst), 100)) / 100)
    return { gross, discount, taxable, tax, total: round2(taxable + tax) }
  })
  const sum = (k: 'gross' | 'discount' | 'taxable' | 'tax') => round2(lines.reduce((s, l) => s + l[k], 0))
  const subtotal = sum('gross')
  const discount = sum('discount')
  const taxable = sum('taxable')
  const tax = sum('tax')
  const cgst = state.tax === 'intra' ? round2(tax / 2) : 0
  const sgst = state.tax === 'intra' ? round2(tax - cgst) : 0
  const exact = round2(taxable + tax)
  const grand = state.roundOff ? Math.round(exact) : exact
  return { lines, subtotal, discount, taxable, tax, cgst, sgst, roundOff: round2(grand - exact), grand }
}

/** "2026-11-21" -> "21 Nov 2026". Anything else is returned as typed. */
export function showDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return iso
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(m[2]) - 1]
  return month ? `${Number(m[3])} ${month} ${m[1]}` : iso
}

const trimNumber = (v: string): string => String(toNumber(v))
const pairs = (rows: Array<[string, string]>): Array<[string, string]> => rows.filter(([, v]) => v.trim() !== '')

export function buildDocument(kind: DocKind, state: DocState): TemplateDoc {
  const c = DOC_CONFIGS[kind]
  const { f } = state
  const t = computeTotals(state)
  const anyDiscount = t.discount > 0
  const taxed = state.tax !== 'none'

  const head = ['#', 'Description', 'HSN/SAC', 'Qty', 'Rate', ...(anyDiscount ? ['Disc %'] : []), ...(taxed ? ['Taxable value', 'GST %'] : []), 'Amount']
  const rows = state.items.map((it, i) => {
    const l = t.lines[i]
    return [String(i + 1), it.desc, it.hsn, trimNumber(it.qty), money(toNumber(it.rate)), ...(anyDiscount ? [`${trimNumber(it.disc)}%`] : []), ...(taxed ? [money(l.taxable), `${trimNumber(it.gst)}%`] : []), money(l.total)]
  })
  const totals: Array<[string, string]> = []
  if (anyDiscount) totals.push(['Subtotal', money(t.subtotal)], ['Discount', money(t.discount)])
  if (taxed) {
    totals.push(['Taxable value', money(t.taxable)])
    if (state.tax === 'intra') totals.push(['CGST', money(t.cgst)], ['SGST', money(t.sgst)])
    else totals.push(['IGST', money(t.tax)])
  }
  if (t.roundOff !== 0) totals.push(['Round off', `${t.roundOff > 0 ? '+' : '-'}${money(Math.abs(t.roundOff))}`])
  totals.push([taxed ? 'Grand total (₹)' : 'Total (₹)', money(t.grand)])

  const contact = [f['us.gstin'] && `GSTIN: ${f['us.gstin']}`, f['us.phone'] && `Phone: ${f['us.phone']}`, f['us.email'] && `Email: ${f['us.email']}`].filter(Boolean).join(' · ')
  const extra = (group: ExtraField['group']) => c.extras.filter((e) => e.group === group)
  const delivery = pairs(extra('delivery').map((e): [string, string] => [e.label, e.type === 'date' ? showDate(f[e.key]) : f[e.key]]))

  const blocks: TBlock[] = [
    { t: 'title', text: taxed || kind !== 'invoice' ? c.title : 'Invoice' },
    { t: 'org', name: f['us.name'], lines: [f['us.address'], contact].filter(Boolean) },
    {
      t: 'pairs',
      cols: [
        { heading: c.themHeading, rows: [['Name', f['them.name']], ...pairs([['Address', f['them.address']], ['GSTIN', f['them.gstin']], ['Phone', f['them.phone']]])] },
        { heading: c.detailsHeading, rows: [[c.numberLabel, f.number], [c.dateLabel, showDate(f.date)], ...pairs(extra('meta').map((e): [string, string] => [e.label, e.type === 'date' ? showDate(f[e.key]) : f[e.key]]))] },
        ...(delivery.length && c.deliveryHeading ? [{ heading: c.deliveryHeading, rows: delivery }] : []),
      ],
    },
    { t: 'table', head, align: head.map((h) => (h === '#' || h === 'HSN/SAC' ? 'c' : h === 'Description' ? 'l' : 'r')), rows, totals },
    { t: 'text', label: 'Amount in words', text: amountInWords(t.grand) },
    ...extra('text')
      .filter((e) => f[e.key].trim())
      .map((e): TBlock => ({ t: 'text', label: e.label, text: f[e.key] })),
    ...(f.terms.trim() ? [{ t: 'text', label: 'Terms and conditions', text: f.terms } as TBlock] : []),
    ...(f.notes.trim() ? [{ t: 'text', label: 'Notes', text: f.notes } as TBlock] : []),
    ...(c.footnote ? [{ t: 'text', label: 'Please note', text: c.footnote } as TBlock] : []),
    { t: 'sign', labels: c.signLabels(f['us.name']) },
  ]
  const safe = f.number.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return { id: kind, name: c.title, description: '', fileName: safe ? `${c.fileName}-${safe}` : c.fileName, blocks }
}
