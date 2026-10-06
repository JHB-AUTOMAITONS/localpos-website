import { Fragment } from 'react'
import { Icon, type IconName } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { Meter } from './charts'
import { AppFrame, Chip, FakeSearch, Panel } from './parts'
import { BILL_TOTAL, INVOICES, type SampleInvoice } from './sample'

const statusTone = { Paid: 'brand', 'Part paid': 'gold', Due: 'coral' } as const

/** Sample register: the shared invoices plus one extra row, with a line-item count each. */
const EXTRA_INVOICE: SampleInvoice = { no: 'INV-2036', customer: 'Lakshmi Stores', amount: 3260, status: 'Paid', mode: 'UPI' }
const ITEM_COUNTS = [5, 3, 14, 6, 4, 9]
const ROWS = [...INVOICES, EXTRA_INVOICE].map((inv, i) => ({ ...inv, items: ITEM_COUNTS[i] }))

const TILES = [
  { label: 'Sales', value: rupees(48250), sub: '126 invoices', dot: 'bg-brand-500' },
  { label: 'Collected', value: rupees(33610), sub: 'UPI, cash, card', dot: 'bg-sky-500' },
  { label: 'Pending', value: rupees(14640), sub: 'From 5 customers', dot: 'bg-coral-500' },
]

const SELLERS = [
  { name: 'Biscuits Family Pack', sold: 58, rate: 50 },
  { name: 'Tea Powder 250 g', sold: 44, rate: 120 },
  { name: 'Toor Dal 1 kg', sold: 38, rate: 160 },
  { name: 'Sunflower Oil 1 L', sold: 29, rate: 148 },
  { name: 'Basmati Rice 5 kg', sold: 21, rate: 610 },
]

/* Register columns: 3 when narrow (or squeezed by the side panel), 5 when there is room. */
const WIDE = 'hidden @[480px]:block @[560px]:hidden @[720px]:block'
const NARROW = '@[480px]:hidden @[560px]:block @[720px]:hidden'
const ROW =
  'grid items-center gap-2 grid-cols-[minmax(0,1fr)_58px_68px] @[480px]:grid-cols-[74px_minmax(0,1.3fr)_40px_64px_70px] @[560px]:grid-cols-[minmax(0,1fr)_58px_68px] @[720px]:grid-cols-[74px_minmax(0,1.3fr)_40px_64px_70px]'

/** The day's sales register with totals, filters and the best sellers. */
export function SalesRegisterPreview({ className }: { className?: string }) {
  return (
    <AppFrame active="billing" title="LocalPOS · Sales" className={className}>
      <div className="flex items-center gap-2">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11px] font-semibold text-ink">
          <Icon name="calendar" size={13} className="text-brand-700" />
          Today
          <Icon name="chevron-down" size={12} className="text-ink-3" />
        </span>
        <div className="min-w-0 flex-1">
          <FakeSearch placeholder="Search invoice or customer" className="overflow-hidden whitespace-nowrap" />
        </div>
        <div className="hidden shrink-0 @[480px]:block">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11px] font-medium text-ink-2">
            All payment modes
            <Icon name="chevron-down" size={12} className="text-ink-3" />
          </span>
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {TILES.map((t) => (
          <div key={t.label} className="min-w-0 rounded-xl border border-line bg-white px-2.5 py-2">
            <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-ink-3">
              <i className={cn('size-1.5 rounded-full', t.dot)} />
              {t.label}
            </div>
            <div className="tnum mt-1 text-[14px] font-bold leading-none text-ink @[480px]:text-[16px]">{t.value}</div>
            <div className="mt-1 hidden truncate text-[10px] text-ink-3 @[400px]:block">{t.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-2.5 grid gap-2.5 @[560px]:grid-cols-[minmax(0,1fr)_190px]">
        <Panel title="Invoices" action="Export">
          <div className={cn(ROW, 'pb-1.5 text-[10px] font-bold uppercase tracking-wide text-ink-3')}>
            <span className={WIDE}>Invoice</span>
            <span>Customer</span>
            <span className={cn(WIDE, 'text-right')}>Items</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Status</span>
          </div>
          <ul className="divide-y divide-line">
            {ROWS.map((inv) => (
              <li key={inv.no} className={cn(ROW, 'py-1.5 first:pt-0 last:pb-0')}>
                <span className={cn(WIDE, 'tnum text-ink-3')}>{inv.no}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[11.5px] font-semibold text-ink">{inv.customer}</span>
                  <span className={cn(NARROW, 'tnum block truncate text-[10px] text-ink-3')}>
                    {inv.no} · {inv.items} items
                  </span>
                </span>
                <span className={cn(WIDE, 'tnum text-right text-ink-3')}>{inv.items}</span>
                <span className="tnum text-right text-[11.5px] font-bold text-ink">{rupees(inv.amount)}</span>
                <span className="flex justify-end">
                  <Chip tone={statusTone[inv.status]}>{inv.status}</Chip>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Best sellers today" action="Report" className="hidden self-start @[560px]:block">
          <div className="mb-2 text-[10px] text-ink-3">Units sold · revenue</div>
          <ul className="space-y-2.5">
            {SELLERS.map((s, i) => (
              <li key={s.name}>
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="truncate font-medium text-ink">{s.name}</span>
                  <b className="tnum text-ink">{s.sold}</b>
                </div>
                <Meter value={s.sold} max={SELLERS[0].sold} color={i === 0 ? '#13966f' : '#6cc8a5'} className="mt-1" />
                <div className="tnum mt-0.5 text-[10px] text-ink-3">{rupees(s.sold * s.rate)}</div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppFrame>
  )
}

interface FlowStep {
  icon: IconName
  kind: string
  no: string
  line: string
  status: string
  tone: 'violet' | 'sky' | 'brand' | 'gold' | 'coral'
  top: string
  tint: string
}

const FLOW: FlowStep[] = [
  { icon: 'file', kind: 'Quotation', no: 'QT-310', line: `${rupees(BILL_TOTAL)} · 5 items`, status: 'Accepted', tone: 'violet', top: 'border-t-violet-500', tint: 'bg-violet-100 text-violet-700' },
  { icon: 'clipboard', kind: 'Sales order', no: 'SO-205', line: `${rupees(BILL_TOTAL)} · 5 items`, status: 'Confirmed', tone: 'sky', top: 'border-t-sky-500', tint: 'bg-sky-100 text-sky-700' },
  { icon: 'receipt', kind: 'Invoice', no: 'INV-2041', line: `${rupees(BILL_TOTAL)} incl. GST`, status: 'Paid', tone: 'brand', top: 'border-t-brand-600', tint: 'bg-brand-100 text-brand-700' },
  { icon: 'wallet', kind: 'Payment', no: 'RCPT-512', line: `${rupees(BILL_TOTAL)} · UPI`, status: 'Settled', tone: 'gold', top: 'border-t-gold-400', tint: 'bg-gold-100 text-gold-700' },
  { icon: 'refresh', kind: 'Return', no: 'CN-07', line: `${rupees(160)} · 1 item`, status: 'Refunded', tone: 'coral', top: 'border-t-coral-500', tint: 'bg-coral-100 text-coral-700' },
]

/** Quotation to return: one document flows into the next without retyping. */
export function SalesFlowPreview({ className }: { className?: string }) {
  return (
    <div className={cn('@container text-left text-[12px] leading-snug text-ink-2', className)}>
      <ol className="flex flex-col @[720px]:flex-row @[720px]:items-stretch">
        {FLOW.map((s, i) => (
          <Fragment key={s.no}>
            {i > 0 && (
              <li aria-hidden="true" className="relative flex h-6 shrink-0 items-center justify-center @[720px]:h-auto @[720px]:w-6">
                <span className="absolute inset-y-0 left-1/2 w-px bg-line-strong @[720px]:hidden" />
                <span className="absolute inset-x-0 top-1/2 hidden h-px bg-line-strong @[720px]:block" />
                <span className="relative grid size-5 place-items-center rounded-full bg-white text-brand-600 ring-1 ring-line-strong">
                  <Icon name="chevron-right" size={12} strokeWidth={2.6} className="rotate-90 @[720px]:rotate-0" />
                </span>
              </li>
            )}
            <li className="flex min-w-0 @[720px]:flex-1">
              <div
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border border-line border-t-[3px] bg-white p-3 shadow-card @[720px]:flex-col @[720px]:items-start @[720px]:gap-2',
                  s.top,
                )}
              >
                <span className={cn('grid size-8 shrink-0 place-items-center rounded-lg', s.tint)}>
                  <Icon name={s.icon} size={16} />
                </span>
                <span className="min-w-0 flex-1 @[720px]:flex-none">
                  <span className="block text-[10.5px] font-semibold text-ink-3">{s.kind}</span>
                  <span className="tnum block text-[12.5px] font-bold text-ink">{s.no}</span>
                  <span className="tnum block text-[10.5px] text-ink-2">{s.line}</span>
                </span>
                <Chip tone={s.tone}>{s.status}</Chip>
              </div>
            </li>
          </Fragment>
        ))}
      </ol>
      <p className="mx-auto mt-3 flex w-fit max-w-full items-center justify-center gap-1.5 rounded-2xl bg-brand-50 px-3 py-1.5 text-center text-[11px] font-medium text-brand-800 ring-1 ring-brand-100">
        <Icon name="layers" size={13} className="shrink-0 text-brand-600" />
        Items, prices and tax carry forward at each step
      </p>
    </div>
  )
}
