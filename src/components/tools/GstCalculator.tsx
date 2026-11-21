import { useState } from 'react'
import { calculateGst, type GstMode } from '@/lib/gst'
import { cn } from '@/lib/cn'
import { money, toNumber } from '@/lib/money'
import { Choice, ToolInput } from './controls'

const RATES = ['0.25', '3', '5', '12', '18', '28', '40']

type Supply = 'intra' | 'inter'

/** Adds GST to an amount or takes it out of one, and shows the working. All arithmetic is in lib/gst.ts. */
export function GstCalculator() {
  const [amount, setAmount] = useState('1000')
  const [rate, setRate] = useState('18')
  const [mode, setMode] = useState<GstMode>('add')
  const [supply, setSupply] = useState<Supply>('intra')

  const a = toNumber(amount)
  const r = toNumber(rate)
  const rateError = Number(rate) > 100 ? 'Enter a rate between 0 and 100.' : undefined
  const res = calculateGst(a, Math.min(r, 100), mode)
  const half = money(r / 2).replace(/\.?0+$/, '')
  const rateText = String(r)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="space-y-5">
        <Choice
          label="What do you want to do?"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'add', label: 'Add GST' },
            { value: 'remove', label: 'Remove GST' },
          ]}
        />
        <ToolInput
          label={mode === 'add' ? 'Amount before GST (₹)' : 'Amount including GST (₹)'}
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 1000"
          hint={mode === 'add' ? 'The price without tax, also called the taxable value.' : 'The final price the customer pays (MRP or bill total).'}
        />
        <div>
          <span className="block text-[0.86rem] font-semibold text-ink">GST rate</span>
          <div role="group" aria-label="GST rate" className="mt-1 flex flex-wrap gap-1.5">
            {RATES.map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={rate === v}
                onClick={() => setRate(v)}
                className={cn('min-h-10 min-w-[3.4rem] rounded-lg border px-3 text-[0.9375rem] font-semibold transition-colors', rate === v ? 'border-brand-700 bg-brand-700 text-white' : 'border-line-strong bg-white text-ink hover:border-brand-300 hover:bg-brand-50')}
              >
                {v}%
              </button>
            ))}
          </div>
          <ToolInput label="Or type another rate (%)" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} error={rateError} wrapperClassName="mt-3 max-w-[14rem]" />
        </div>
        <Choice
          label="Where is the buyer?"
          value={supply}
          onChange={setSupply}
          options={[
            { value: 'intra', label: 'Same state (CGST + SGST)' },
            { value: 'inter', label: 'Another state (IGST)' },
          ]}
        />
      </div>

      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5 sm:p-6" aria-live="polite">
        <h3 className="font-display text-[1.15rem] font-semibold text-ink">Result</h3>
        <dl className="mt-3 divide-y divide-brand-200 text-[1rem]">
          <Row label="Amount before GST" value={res.net} />
          {supply === 'intra' ? (
            <>
              <Row label={`CGST at ${half}%`} value={res.cgst} />
              <Row label={`SGST at ${half}%`} value={res.sgst} />
            </>
          ) : (
            <Row label={`IGST at ${rateText}%`} value={res.tax} />
          )}
          <Row label="Total GST" value={res.tax} />
          <Row label="Amount including GST" value={res.gross} strong />
        </dl>

        <div className="mt-5 rounded-xl bg-white p-4 text-[0.95rem] text-ink-2">
          <p className="font-semibold text-ink">How this was worked out</p>
          {mode === 'add' ? (
            <ul className="tnum mt-2 space-y-1">
              <li>
                GST = {money(a)} × {rateText} ÷ 100 = <strong>{money(res.tax)}</strong>
              </li>
              <li>
                Total = {money(res.net)} + {money(res.tax)} = <strong>{money(res.gross)}</strong>
              </li>
            </ul>
          ) : (
            <ul className="tnum mt-2 space-y-1">
              <li>
                Amount before GST = {money(a)} × 100 ÷ (100 + {rateText}) = <strong>{money(res.net)}</strong>
              </li>
              <li>
                GST = {money(res.gross)} − {money(res.net)} = <strong>{money(res.tax)}</strong>
              </li>
            </ul>
          )}
          <p className="mt-2 text-[0.9rem] text-ink-3">
            {supply === 'intra' ? 'For a sale within one state the GST is split equally between CGST and SGST.' : 'For a sale to another state the whole GST is charged as IGST.'} Figures are rounded to the nearest paisa.
          </p>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, strong }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={cn('flex items-baseline justify-between gap-4 py-2.5', strong && 'pt-3')}>
      <dt className={cn(strong ? 'font-semibold text-ink' : 'text-ink-2')}>{label}</dt>
      <dd className={cn('tnum text-ink', strong ? 'font-display text-[1.5rem] font-bold' : 'font-semibold')}>₹{money(value)}</dd>
    </div>
  )
}
