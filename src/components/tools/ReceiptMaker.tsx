import { useEffect, useMemo, useState } from 'react'
import { DocActions } from '@/components/templates/DocActions'
import { DocSheet } from '@/components/templates/DocSheet'
import type { TBlock, TemplateDoc } from '@/components/templates/types'
import { CTAButton } from '@/components/ui/CTAButton'
import { amountInWords, money, toNumber } from '@/lib/money'
import { FieldGroup, ToolInput, ToolSelect, ToolTextArea } from './controls'
import { showDate } from './docBuilder'

const METHODS = ['Cash', 'UPI', 'Card', 'Bank transfer', 'Cheque', 'Other']
const REFERENCE_LABEL: Record<string, string> = { UPI: 'UPI reference no.', Card: 'Card slip / approval no.', 'Bank transfer': 'UTR / transaction no.', Cheque: 'Cheque no. and bank', Cash: 'Reference', Other: 'Reference' }

const SAMPLE = {
  business: 'Sri Lakshmi Traders',
  address: '14 Market Road, Chickpet, Bengaluru, Karnataka 560053',
  phone: '98765 43210',
  gstin: '',
  number: 'RCPT/26-27/001',
  date: '',
  from: 'Anand Stores',
  fromContact: 'Mysuru · 91234 56780',
  amount: '5000',
  method: 'UPI',
  reference: '123456789012',
  towards: 'Part payment against invoice no. INV/26-27/001',
  balance: '8978',
  receivedBy: '',
}
type Fields = typeof SAMPLE
const BLANK: Fields = { ...Object.fromEntries(Object.keys(SAMPLE).map((k) => [k, ''])), method: 'Cash' } as Fields

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function buildReceipt(f: Fields): TemplateDoc {
  const amount = toNumber(f.amount)
  const contact = [f.gstin && `GSTIN: ${f.gstin}`, f.phone && `Phone: ${f.phone}`].filter(Boolean).join(' · ')
  const rows = (list: Array<[string, string]>) => list.filter(([, v], i) => i === 0 || v.trim() !== '')
  const blocks: TBlock[] = [
    { t: 'title', text: 'Payment Receipt' },
    { t: 'org', name: f.business, lines: [f.address, contact].filter(Boolean) },
    {
      t: 'pairs',
      cols: [
        { heading: 'Received from', rows: rows([['Name', f.from], ['Contact', f.fromContact]]) },
        { heading: 'Receipt details', rows: [['Receipt no.', f.number], ['Date', showDate(f.date)]] },
      ],
    },
    {
      t: 'table',
      head: ['Particulars', 'Details'],
      rows: [
        ['Amount received (₹)', money(amount)],
        ['Payment method', f.method],
        ...(f.reference.trim() ? [[REFERENCE_LABEL[f.method] ?? 'Reference', f.reference]] : []),
        ...(f.towards.trim() ? [['Towards', f.towards]] : []),
        ...(f.balance.trim() ? [['Balance due (₹)', money(toNumber(f.balance))]] : []),
      ],
      keep: [0],
    },
    { t: 'text', label: 'Amount in words', text: amountInWords(amount) },
    { t: 'sign', labels: [f.receivedBy.trim() ? `Received by: ${f.receivedBy}` : `For ${f.business || 'the business'} (Receiver’s signature)`] },
  ]
  const safe = f.number.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return { id: 'receipt', name: 'Payment Receipt', description: '', fileName: safe ? `receipt-${safe}` : 'receipt', blocks }
}

/** Makes a payment receipt from a short form. Nothing is stored or sent anywhere. */
export function ReceiptMaker() {
  const [f, setF] = useState<Fields>(SAMPLE)
  const doc = useMemo(() => buildReceipt(f), [f])
  // Filled in after the page loads, so the prerendered HTML does not carry the build date.
  useEffect(() => {
    setF((s) => (s.date ? s : { ...s, date: today() }))
  }, [])
  const field = (key: keyof Fields) => ({ value: f[key], onChange: (e: { target: { value: string } }) => setF((s) => ({ ...s, [key]: e.target.value })) })
  const amountError = f.amount.trim() !== '' && toNumber(f.amount) === 0 ? 'Enter an amount greater than zero, in digits.' : undefined

  return (
    <div className="grid gap-7 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3">
          <p className="text-[0.92rem] text-ink-2">The form starts with sample details so you can see the result.</p>
          <CTAButton size="sm" variant="secondary" onClick={() => setF({ ...BLANK, date: today() })}>
            Clear the form
          </CTAButton>
        </div>

        <FieldGroup title="Your business">
          <div className="grid gap-3 sm:grid-cols-2">
            <ToolInput label="Business name" autoComplete="organization" {...field('business')} />
            <ToolInput label="Phone" inputMode="tel" {...field('phone')} />
            <ToolInput label="Address" wrapperClassName="sm:col-span-2" {...field('address')} />
            <ToolInput label="GSTIN" hint="Optional." {...field('gstin')} />
          </div>
        </FieldGroup>

        <FieldGroup title="Payment received">
          <div className="grid gap-3 sm:grid-cols-2">
            <ToolInput label="Receipt no." {...field('number')} />
            <ToolInput label="Payment date" type="date" {...field('date')} />
            <ToolInput label="Received from" {...field('from')} />
            <ToolInput label="Payer’s address or phone" {...field('fromContact')} />
            <ToolInput label="Amount (₹)" inputMode="decimal" error={amountError} {...field('amount')} />
            <ToolSelect label="Payment method" {...field('method')}>
              {METHODS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </ToolSelect>
            <ToolInput label={REFERENCE_LABEL[f.method] ?? 'Reference'} {...field('reference')} />
            <ToolInput label="Balance due (₹)" inputMode="decimal" hint="Optional. Leave empty if fully paid." {...field('balance')} />
            <ToolTextArea label="Towards" rows={2} wrapperClassName="sm:col-span-2" placeholder="What the payment is for, e.g. against invoice no. 104" {...field('towards')} />
            <ToolInput label="Received by" hint="Name of the person who took the payment." {...field('receivedBy')} />
          </div>
        </FieldGroup>
      </form>

      <div className="xl:sticky xl:top-24 xl:self-start">
        <h3 className="font-display text-[1.15rem] font-semibold text-ink">Preview</h3>
        <DocActions doc={doc} className="mt-2" />
        <DocSheet doc={doc} />
        <p className="mt-3 text-[0.86rem] text-ink-3">Nothing you type is saved or sent anywhere. Download or print the receipt before you close this page.</p>
      </div>
    </div>
  )
}
