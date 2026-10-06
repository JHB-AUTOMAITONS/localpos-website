import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { Meter } from './charts'
import { AppFrame, Chip, Panel } from './parts'

interface PoLine {
  name: string
  ordered: number
  received: number
  rate: number
  gst: number
}

const LINES: PoLine[] = [
  { name: 'Toor Dal 1 kg', ordered: 40, received: 36, rate: 128, gst: 5 },
  { name: 'Sunflower Oil 1 L', ordered: 24, received: 24, rate: 118, gst: 5 },
  { name: 'Basmati Rice 5 kg', ordered: 20, received: 20, rate: 520, gst: 5 },
  { name: 'Tea Powder 250 g', ordered: 60, received: 60, rate: 96, gst: 5 },
  { name: 'Biscuits Family Pack', ordered: 48, received: 48, rate: 42, gst: 18 },
]

const SUBTOTAL = LINES.reduce((s, l) => s + l.received * l.rate, 0)
const GST_TOTAL = LINES.reduce((s, l) => s + (l.received * l.rate * l.gst) / 100, 0)

const META = [
  { label: 'Supplier', value: 'Fresh Mart Wholesale', sub: 'GSTIN 33BBBBB0000B1Z6', span: 'col-span-2 @[480px]:col-span-1' },
  { label: 'Order date', value: '02 Oct 2026', sub: undefined, span: '' },
  { label: 'Expected delivery', value: '06 Oct 2026', sub: undefined, span: '' },
]

const STEPS = [
  { label: 'Ordered', date: '02 Oct', done: true, next: false },
  { label: 'Received', date: '06 Oct', done: true, next: false },
  { label: 'Billed', date: 'Next', done: false, next: true },
  { label: 'Paid', date: '—', done: false, next: false },
]

const AGING = [
  { label: '0–30 days', amount: 48200, color: '#13966f' },
  { label: '31–60 days', amount: 26400, color: '#f6b232' },
  { label: '60+ days', amount: 11800, color: '#ee6a4f' },
]
const OWED = AGING.reduce((s, a) => s + a.amount, 0) // 86400

/*
 * The items table has two layouts: 5 columns when there is room for them and 3 columns when
 * the supplier panel (from 560px) squeezes it. Container-query ranges are expressed by
 * stacking min-width variants in ascending order.
 */
const WIDE = 'hidden @[480px]:block @[560px]:hidden @[720px]:block'
const NARROW = '@[480px]:hidden @[560px]:block @[720px]:hidden'
const ROW =
  'grid items-center gap-2 px-2.5 grid-cols-[minmax(0,1fr)_46px_68px] @[480px]:grid-cols-[minmax(0,1.4fr)_52px_minmax(0,1.2fr)_48px_70px] @[560px]:grid-cols-[minmax(0,1fr)_46px_68px] @[720px]:grid-cols-[minmax(0,1.4fr)_52px_minmax(0,1.2fr)_48px_70px]'

function ShortChip({ by }: { by: number }) {
  return <Chip tone="gold">Short by {by}</Chip>
}

/** A purchase order that has been partly received, with the supplier's running balance. */
export function PurchaseOrderPreview({ className }: { className?: string }) {
  return (
    <AppFrame active="items" title="LocalPOS · Purchase order" className={className}>
      <div className="grid gap-2.5 @[560px]:grid-cols-[minmax(0,1fr)_184px]">
        <div className="min-w-0 space-y-2.5">
          <Panel>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-700">
                  <Icon name="truck" size={16} />
                </span>
                <div>
                  <div className="text-[10.5px] font-medium text-ink-3">Purchase order</div>
                  <div className="tnum font-display text-[15px] font-bold leading-tight text-ink">PO-118</div>
                </div>
              </div>
              <Chip tone="gold">Partly received</Chip>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 @[480px]:grid-cols-3">
              {META.map((m) => (
                <div key={m.label} className={cn('min-w-0', m.span)}>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-ink-3">{m.label}</dt>
                  <dd className="mt-0.5 truncate text-[11.5px] font-semibold text-ink">
                    {m.value}
                    {m.sub && <span className="block text-[10px] font-normal text-ink-3">{m.sub}</span>}
                  </dd>
                </div>
              ))}
            </dl>

            <ol className="mt-3 grid grid-cols-4 border-t border-line pt-3">
              {STEPS.map((s, i) => (
                <li key={s.label} className="min-w-0 text-center">
                  <div className="flex items-center">
                    <span className={cn('h-0.5 flex-1', i === 0 ? 'bg-transparent' : s.done ? 'bg-brand-500' : 'bg-line-strong')} />
                    <span
                      className={cn(
                        'grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold',
                        s.done ? 'bg-brand-600 text-white' : s.next ? 'border-2 border-gold-400 bg-gold-50 text-gold-800' : 'border-2 border-line-strong bg-white text-ink-3',
                      )}
                    >
                      {s.done ? <Icon name="check" size={11} strokeWidth={3.2} /> : i + 1}
                    </span>
                    <span className={cn('h-0.5 flex-1', i === STEPS.length - 1 ? 'bg-transparent' : STEPS[i + 1].done ? 'bg-brand-500' : 'bg-line-strong')} />
                  </div>
                  <div className={cn('mt-1 text-[11px]', s.done ? 'font-semibold text-ink' : 'font-medium text-ink-3')}>{s.label}</div>
                  <div className="text-[10px] text-ink-3">{s.date}</div>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title={`Items · ${LINES.length}`} action="Receive rest">
            <div className="overflow-hidden rounded-lg border border-line">
              <div className={cn(ROW, 'bg-paper-2 py-1.5 text-[10px] font-bold uppercase tracking-wide text-ink-3')}>
                <span>Item</span>
                <span className={cn(WIDE, 'text-right')}>Ordered</span>
                <span className={WIDE}>Received</span>
                <span className={cn(NARROW, 'text-right')}>Qty</span>
                <span className={cn(WIDE, 'text-right')}>Rate</span>
                <span className="text-right">Amount</span>
              </div>
              {LINES.map((l) => {
                const short = l.ordered - l.received
                return (
                  <div key={l.name} className={cn(ROW, 'border-t border-line py-2', short > 0 && 'bg-gold-50/60')}>
                    <span className="min-w-0">
                      <span className="block truncate text-[11.5px] font-semibold text-ink">{l.name}</span>
                      {short > 0 && (
                        <span className={cn('mt-0.5 block', NARROW)}>
                          <ShortChip by={short} />
                        </span>
                      )}
                    </span>
                    <span className={cn(WIDE, 'tnum text-right text-ink-3')}>{l.ordered}</span>
                    <span className={WIDE}>
                      <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                        <b className="tnum text-ink">{l.received}</b>
                        {short > 0 && <ShortChip by={short} />}
                      </span>
                    </span>
                    <span className={cn(NARROW, 'tnum text-right text-ink-3')}>
                      <b className="text-ink">{l.received}</b>/{l.ordered}
                    </span>
                    <span className={cn(WIDE, 'tnum text-right text-ink-3')}>{rupees(l.rate)}</span>
                    <span className="tnum text-right font-bold text-ink">{rupees(l.received * l.rate)}</span>
                  </div>
                )
              })}
            </div>

            <dl className="ml-auto mt-3 w-full max-w-[230px] space-y-1 text-[11px]">
              <div className="flex justify-between gap-2">
                <dt>Subtotal</dt>
                <dd className="tnum">{rupees(SUBTOTAL, true)}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>GST (CGST + SGST)</dt>
                <dd className="tnum">{rupees(GST_TOTAL, true)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 border-t border-line pt-1.5 text-[13px] font-bold text-ink">
                <dt>Total</dt>
                <dd className="tnum">{rupees(SUBTOTAL + GST_TOTAL, true)}</dd>
              </div>
            </dl>
          </Panel>
        </div>

        <Panel title="Supplier balance" className="hidden self-start @[560px]:block">
          <div className="text-[10.5px] text-ink-3">You owe Fresh Mart Wholesale</div>
          <div className="tnum mt-1 font-display text-[20px] font-bold leading-none text-ink">{rupees(OWED)}</div>
          <div className="tnum mt-1.5 text-[10.5px] font-semibold text-coral-700">{rupees(AGING[2].amount)} is over 60 days</div>
          <ul className="mt-3 space-y-2">
            {AGING.map((a) => (
              <li key={a.label}>
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className="text-ink-3">{a.label}</span>
                  <span className="tnum font-semibold text-ink">{rupees(a.amount)}</span>
                </div>
                <Meter value={a.amount} max={OWED} color={a.color} className="mt-1" />
              </li>
            ))}
          </ul>
          <div className="mt-3 grid place-items-center rounded-full bg-brand-600 py-1.5 text-[11px] font-semibold text-white">Pay now</div>
          <div className="tnum mt-2 text-center text-[10px] text-ink-3">Last paid {rupees(40000)} · 28 Sep</div>
        </Panel>
      </div>
    </AppFrame>
  )
}
