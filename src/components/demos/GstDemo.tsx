import { useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'

type Supply = 'intra' | 'inter'
type Pricing = 'exclusive' | 'inclusive'

function Segmented<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: Array<{ value: T; label: string }> }) {
  const name = useId()
  return (
    <fieldset>
      <legend className="text-[0.85rem] font-semibold text-ink">{label}</legend>
      <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl bg-paper-2 p-1">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              'cursor-pointer rounded-lg px-3 py-2 text-center text-[0.9rem] font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500',
              value === o.value ? 'bg-white text-brand-800 shadow-card' : 'text-ink-2 hover:text-ink',
            )}
          >
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** A live GST split. Rates are typed in, so it never goes out of date. Sample calculator only. */
export function GstDemo() {
  const [amount, setAmount] = useState('10000')
  const [rate, setRate] = useState('18')
  const [supply, setSupply] = useState<Supply>('intra')
  const [pricing, setPricing] = useState<Pricing>('exclusive')
  const amountId = useId()
  const rateId = useId()

  const a = Math.max(0, parseFloat(amount) || 0)
  const r = Math.min(100, Math.max(0, parseFloat(rate) || 0))
  const taxable = pricing === 'exclusive' ? a : a / (1 + r / 100)
  const tax = pricing === 'exclusive' ? (a * r) / 100 : a - taxable
  const total = taxable + tax
  const half = tax / 2

  const inputClass =
    'mt-2 h-12 w-full rounded-xl border border-line-strong bg-white px-4 text-[1.05rem] font-semibold text-ink tnum placeholder:text-ink-3 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100'

  return (
    <div className="grid overflow-hidden rounded-[24px] border border-line bg-white shadow-card lg:grid-cols-[1fr_1.05fr]">
      <div className="space-y-5 p-6 sm:p-8">
        <div>
          <label htmlFor={amountId} className="text-[0.85rem] font-semibold text-ink">
            Item price (₹)
          </label>
          <input id={amountId} inputMode="decimal" className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))} />
        </div>

        <div>
          <label htmlFor={rateId} className="text-[0.85rem] font-semibold text-ink">
            GST rate (%)
          </label>
          <div className="mt-2 flex items-center gap-2">
            <input id={rateId} inputMode="decimal" className={cn(inputClass, 'mt-0 max-w-[7rem]')} value={rate} onChange={(e) => setRate(e.target.value.replace(/[^0-9.]/g, ''))} />
            {['5', '18'].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setRate(q)}
                aria-pressed={rate === q}
                className={cn('h-12 rounded-xl border px-4 text-[0.95rem] font-semibold transition', rate === q ? 'border-brand-400 bg-brand-100 text-brand-800' : 'border-line-strong bg-white text-ink-2 hover:bg-paper')}
              >
                {q}%
              </button>
            ))}
          </div>
          <p className="mt-2 text-[0.82rem] text-ink-3">Type any rate. Check the right rate for your item with your accountant.</p>
        </div>

        <Segmented
          label="Where is the customer?"
          value={supply}
          onChange={setSupply}
          options={[
            { value: 'intra', label: 'Same state' },
            { value: 'inter', label: 'Another state' },
          ]}
        />
        <Segmented
          label="Price you entered"
          value={pricing}
          onChange={setPricing}
          options={[
            { value: 'exclusive', label: 'Without tax' },
            { value: 'inclusive', label: 'With tax' },
          ]}
        />
      </div>

      <div className="border-t border-line bg-gold-50 p-6 sm:p-8 lg:border-l lg:border-t-0">
        <div className="receipt mx-auto max-w-sm rounded-t-xl p-5 font-mono sm:p-6" aria-live="polite">
          <div className="text-center text-[0.7rem] font-bold uppercase tracking-[0.25em] text-ink-3">Tax summary</div>
          <div className="perforation my-3" aria-hidden="true" />
          <dl className="space-y-2 text-[0.92rem]">
            <div className="flex justify-between">
              <dt className="text-ink-2">Taxable value</dt>
              <dd className="tnum font-semibold text-ink">{rupees(taxable, true)}</dd>
            </div>
            {supply === 'intra' ? (
              <>
                <div className="flex justify-between">
                  <dt className="text-ink-2">CGST @ {+(r / 2).toFixed(2)}%</dt>
                  <dd className="tnum text-ink">{rupees(half, true)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-2">SGST @ {+(r / 2).toFixed(2)}%</dt>
                  <dd className="tnum text-ink">{rupees(half, true)}</dd>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <dt className="text-ink-2">IGST @ {+r.toFixed(2)}%</dt>
                <dd className="tnum text-ink">{rupees(tax, true)}</dd>
              </div>
            )}
          </dl>
          <div className="perforation my-3" aria-hidden="true" />
          <div className="flex items-baseline justify-between">
            <span className="text-[0.95rem] font-bold text-ink">Invoice total</span>
            <span className="tnum text-[1.5rem] font-bold text-ink">{rupees(total, true)}</span>
          </div>
        </div>
        <p className="mt-5 text-center text-[0.9rem] text-ink-2">
          {supply === 'intra' ? 'Within your state, tax is shown as CGST and SGST.' : 'Across states, tax is shown as IGST.'}
        </p>
      </div>
    </div>
  )
}
