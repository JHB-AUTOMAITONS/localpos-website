import { useMemo, useState } from 'react'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'

interface DemoItem {
  id: string
  name: string
  price: number
  stock: number
}

const ITEMS: DemoItem[] = [
  { id: 'dal', name: 'Toor Dal 1 kg', price: 160, stock: 38 },
  { id: 'oil', name: 'Sunflower Oil 1 L', price: 148, stock: 12 },
  { id: 'rice', name: 'Basmati Rice 5 kg', price: 610, stock: 64 },
  { id: 'tea', name: 'Tea Powder 250 g', price: 120, stock: 91 },
  { id: 'bis', name: 'Biscuits Family Pack', price: 50, stock: 7 },
  { id: 'sug', name: 'Sugar 1 kg', price: 46, stock: 4 },
]

const MODES = ['Cash', 'UPI', 'Card'] as const
type Mode = (typeof MODES)[number]

/** A small working counter: add items, pick a payment mode, charge, and watch stock drop. Sample data only. */
export function PosDemo() {
  const [stock, setStock] = useState<Record<string, number>>(() => Object.fromEntries(ITEMS.map((i) => [i.id, i.stock])))
  const [cart, setCart] = useState<Record<string, number>>({})
  const [mode, setMode] = useState<Mode>('UPI')
  const [paid, setPaid] = useState<{ total: number; mode: Mode } | null>(null)
  const [billNo, setBillNo] = useState(2042)

  const lines = useMemo(() => ITEMS.filter((i) => cart[i.id]).map((i) => ({ ...i, qty: cart[i.id] })), [cart])
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0)
  const count = lines.reduce((s, l) => s + l.qty, 0)

  const add = (item: DemoItem) => {
    if (paid) return
    setCart((c) => {
      const next = (c[item.id] ?? 0) + 1
      return next > stock[item.id] ? c : { ...c, [item.id]: next }
    })
  }
  const change = (id: string, delta: number) => {
    setCart((c) => {
      const next = (c[id] ?? 0) + delta
      const copy = { ...c }
      if (next <= 0) delete copy[id]
      else if (next <= stock[id]) copy[id] = next
      return copy
    })
  }
  const charge = () => {
    if (!total) return
    setStock((s) => {
      const copy = { ...s }
      for (const l of lines) copy[l.id] -= l.qty
      return copy
    })
    setPaid({ total, mode })
  }
  const newBill = () => {
    setCart({})
    setPaid(null)
    setBillNo((n) => n + 1)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
      <div className="rounded-[22px] border border-line bg-white p-4 shadow-card sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-[1.1rem] font-semibold text-ink">Tap an item to add it</h3>
          <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[0.78rem] font-semibold text-ink-3">Sample items</span>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {ITEMS.map((item) => {
            // Once the bill is charged, stock has already been reduced, so nothing is "pending" any more.
            const left = stock[item.id] - (paid ? 0 : (cart[item.id] ?? 0))
            const out = left <= 0
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => add(item)}
                  disabled={out || !!paid}
                  aria-label={`Add ${item.name}, ${rupees(item.price)}`}
                  className="group flex h-full w-full flex-col items-start rounded-xl border border-line bg-paper p-3 text-left transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <span className="text-[0.95rem] font-semibold leading-snug text-ink">{item.name}</span>
                  <span className="tnum mt-1 font-bold text-brand-700">{rupees(item.price)}</span>
                  <span className={cn('tnum mt-2 text-[0.8rem]', left < 8 ? 'font-semibold text-coral-700' : 'text-ink-3')}>{out ? 'Out of stock' : `${left} in stock`}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <p className="mt-4 text-[0.875rem] text-ink-3">Watch the stock count fall once you charge the bill. That is what happens at your real counter.</p>
      </div>

      <div className="@container relative">
        <div className="receipt rounded-t-[18px] p-5 font-mono sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[0.72rem] uppercase tracking-[0.18em] text-ink-3">Current bill</div>
              <div className="text-[1.05rem] font-bold text-ink">Bill #{billNo}</div>
            </div>
            <div className="text-[0.78rem] text-ink-3">{count} {count === 1 ? 'item' : 'items'}</div>
          </div>
          <div className="perforation my-3" aria-hidden="true" />

          {lines.length === 0 ? (
            <p className="py-6 text-center font-sans text-[0.95rem] text-ink-3">The bill is empty. Tap an item to start.</p>
          ) : (
            <ul className="space-y-2.5">
              {lines.map((l) => (
                <li key={l.id} className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[0.85rem] @[24rem]:flex-nowrap">
                  <span className="min-w-0 basis-full truncate @[24rem]:flex-1 @[24rem]:basis-0">{l.name}</span>
                  {!paid ? (
                    <span className="flex items-center gap-1">
                      <button type="button" aria-label={`Remove one ${l.name}`} onClick={() => change(l.id, -1)} className="grid size-8 place-items-center rounded-md bg-paper-2 text-ink hover:bg-paper-3">
                        <Icon name="minus" size={14} strokeWidth={2.6} />
                      </button>
                      <b className="tnum w-5 text-center">{l.qty}</b>
                      <button type="button" aria-label={`Add one more ${l.name}`} onClick={() => change(l.id, 1)} className="grid size-8 place-items-center rounded-md bg-paper-2 text-ink hover:bg-paper-3">
                        <Icon name="plus" size={14} strokeWidth={2.6} />
                      </button>
                    </span>
                  ) : (
                    <b className="tnum">×{l.qty}</b>
                  )}
                  <span className="tnum ml-auto min-w-16 text-right">{rupees(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="perforation my-3" aria-hidden="true" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-3" aria-live="polite">
            <span className="text-[0.9rem] font-bold text-ink">Total</span>
            <span className="tnum text-[1.4rem] font-bold text-ink sm:text-[1.6rem]">{rupees(total)}</span>
          </div>

          {!paid ? (
            <>
              <fieldset className="mt-4">
                <legend className="sr-only">Payment mode</legend>
                <div className="grid grid-cols-3 gap-2 font-sans">
                  {MODES.map((m) => (
                    <label key={m} className={cn('cursor-pointer rounded-lg border py-2 text-center text-[0.9rem] font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500', mode === m ? 'border-brand-400 bg-brand-100 text-brand-800' : 'border-line bg-white text-ink-2 hover:bg-paper')}>
                      <input type="radio" name="pos-demo-mode" value={m} checked={mode === m} onChange={() => setMode(m)} className="sr-only" />
                      {m}
                    </label>
                  ))}
                </div>
              </fieldset>
              <button
                type="button"
                onClick={charge}
                disabled={!total}
                className="mt-3 w-full rounded-xl bg-brand-600 py-3.5 font-sans text-[1.02rem] font-bold text-white shadow-[0_10px_22px_-10px_rgb(10_127_95/0.75)] transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-paper-3 disabled:text-ink-3 disabled:shadow-none"
              >
                {total ? `Charge ${rupees(total)}` : 'Add items to charge'}
              </button>
            </>
          ) : (
            <div className="relative mt-4 font-sans" role="status">
              <span className="stamp-in inline-block -rotate-[9deg] rounded-md border-[3px] border-brand-600 px-4 py-1 font-display text-[1.5rem] font-extrabold uppercase tracking-[0.14em] text-brand-600" style={{ ['--i' as string]: -1 }}>
                Paid
              </span>
              <p className="mt-3 text-[0.95rem] text-ink-2">
                {rupees(paid.total)} received by {paid.mode}. Stock has been updated.
              </p>
              <button type="button" onClick={newBill} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-line-strong bg-white px-4 py-2.5 text-[0.95rem] font-semibold text-ink hover:border-brand-300 hover:bg-brand-50">
                <Icon name="plus" size={16} strokeWidth={2.6} /> Start a new bill
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
