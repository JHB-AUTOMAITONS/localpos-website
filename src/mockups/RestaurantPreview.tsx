import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { AppFrame, Chip, Panel, Receipt } from './parts'

type TableState = 'free' | 'ordering' | 'kitchen' | 'pay'

const STATE: Record<TableState, { label: string; tile: string; dot: string; text: string }> = {
  free: { label: 'Free', tile: 'border-brand-200 bg-brand-50', dot: 'bg-brand-500', text: 'text-brand-800' },
  ordering: { label: 'Ordering', tile: 'border-sky-100 bg-sky-50', dot: 'bg-sky-500', text: 'text-sky-700' },
  kitchen: { label: 'In kitchen', tile: 'border-gold-200 bg-gold-50', dot: 'bg-gold-400', text: 'text-gold-800' },
  pay: { label: 'Ready to pay', tile: 'border-coral-100 bg-coral-50', dot: 'bg-coral-500', text: 'text-coral-700' },
}

interface TableTile {
  id: string
  state: TableState
  /** Seats, guests or running amount. */
  a: string
  /** Elapsed time or a status word. */
  b: string
}

const TABLES: TableTile[] = [
  { id: 'T1', state: 'kitchen', a: rupees(1240), b: '18 min' },
  { id: 'T2', state: 'free', a: '2 seats', b: 'Free' },
  { id: 'T3', state: 'pay', a: rupees(860), b: '42 min' },
  { id: 'T4', state: 'ordering', a: '3 guests', b: '8 min' },
  { id: 'T5', state: 'free', a: '4 seats', b: 'Free' },
  { id: 'T6', state: 'kitchen', a: rupees(2150), b: '24 min' },
  { id: 'T7', state: 'ordering', a: '2 guests', b: '3 min' },
  { id: 'T8', state: 'free', a: '6 seats', b: 'Free' },
  { id: 'T9', state: 'pay', a: rupees(1480), b: '51 min' },
  { id: 'T10', state: 'free', a: '2 seats', b: 'Free' },
  { id: 'T11', state: 'kitchen', a: rupees(690), b: '11 min' },
  { id: 'T12', state: 'free', a: '4 seats', b: 'Free' },
]

const SELECTED = 'T4'
const GUESTS = 3

interface OrderLine {
  name: string
  qty: number
  rate: number
  note?: string
}

const ORDER: OrderLine[] = [
  { name: 'Paneer Butter Masala', qty: 1, rate: 260, note: 'Less spicy' },
  { name: 'Butter Naan', qty: 4, rate: 45 },
  { name: 'Veg Biryani', qty: 2, rate: 190 },
  { name: 'Fresh Lime Soda', qty: 3, rate: 60, note: 'No ice' },
]

const countOf = (s: TableState) => TABLES.filter((t) => t.state === s).length

/** Floor plan with live table status, plus the open order for the selected table. */
export function RestaurantTablesPreview({ className }: { className?: string }) {
  const subtotal = ORDER.reduce((s, i) => s + i.qty * i.rate, 0)
  const gst = Math.round(subtotal * 0.05)
  return (
    <AppFrame title="LocalPOS · Tables" active="billing" className={className}>
      <div className="grid gap-2 @[560px]:grid-cols-[1.15fr_1fr]">
        <Panel title="Ground floor" action={`${TABLES.length} tables`}>
          <ul className="grid grid-cols-3 gap-1.5 @[400px]:grid-cols-4 @[560px]:grid-cols-3 @[700px]:grid-cols-4">
            {TABLES.map((t) => {
              const s = STATE[t.state]
              return (
                <li
                  key={t.id}
                  className={cn('rounded-xl border px-2 py-1.5', s.tile, t.id === SELECTED && 'ring-2 ring-brand-600 ring-offset-2 ring-offset-white')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-ink">{t.id}</span>
                    <i className={cn('size-1.5 rounded-full', s.dot)} />
                  </div>
                  <div className={cn('tnum mt-1 text-[11px] font-semibold', s.text)}>{t.a}</div>
                  <div className="tnum text-[10px] text-ink-3">{t.b}</div>
                </li>
              )
            })}
          </ul>
          <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 border-t border-line pt-2">
            {(Object.keys(STATE) as TableState[]).map((k) => (
              <li key={k} className="flex items-center gap-1.5 text-[10.5px] text-ink-2">
                <i className={cn('size-2 rounded-full', STATE[k].dot)} />
                {STATE[k].label}
                <b className="tnum text-ink">{countOf(k)}</b>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title={`Table 4 · ${GUESTS} guests`}
          action={
            <Chip tone="neutral">
              <Icon name="users" size={10} /> Split bill
            </Chip>
          }
        >
          <ul className="divide-y divide-line">
            {ORDER.map((it) => (
              <li key={it.name} className="flex items-start gap-2 py-1.5 first:pt-0">
                <span className="tnum grid size-5 shrink-0 place-items-center rounded-md bg-paper-2 text-[10.5px] font-bold text-ink">{it.qty}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11.5px] font-semibold text-ink">{it.name}</span>
                  <span className="tnum block text-[10px] text-ink-3">{rupees(it.rate)} each</span>
                  {it.note && <span className="mt-0.5 block text-[10px] font-medium text-gold-800">Note: {it.note.toLowerCase()}</span>}
                </span>
                <span className="tnum text-[11.5px] font-bold text-ink">{rupees(it.qty * it.rate)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-1.5 space-y-0.5 border-t border-line pt-2 text-[11px] text-ink-2">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="tnum">{rupees(subtotal, true)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>GST 5% (2.5% + 2.5%)</dt>
              <dd className="tnum">{rupees(gst, true)}</dd>
            </div>
            <div className="flex items-baseline justify-between pt-1 text-[13px] font-bold text-ink">
              <dt>Total</dt>
              <dd className="tnum">{rupees(subtotal + gst, true)}</dd>
            </div>
          </dl>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <span className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-line-strong bg-white px-1.5 py-1.5 text-[11px] font-semibold text-ink">
              <Icon name="utensils" size={13} /> Send to kitchen
            </span>
            <span className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-600 px-1.5 py-1.5 text-[11px] font-semibold text-white">
              <Icon name="printer" size={13} /> Print bill
            </span>
          </div>
        </Panel>
      </div>
    </AppFrame>
  )
}

/** A thermal kitchen order ticket (KOT): quantities and notes only, no prices. */
export function KitchenTicketPreview({ className }: { className?: string }) {
  const itemCount = ORDER.reduce((s, i) => s + i.qty, 0)
  return (
    <Receipt className={cn('mx-auto w-full max-w-[250px] px-4 pb-5 pt-4', className)}>
      <div className="text-center">
        <div className="font-display text-[13px] font-bold uppercase tracking-[0.18em]">Kitchen order</div>
        <div className="mt-1.5">
          <Chip tone="brand">Dine-in</Chip>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <div className="text-[9.5px] uppercase tracking-wide text-ink-3">Table</div>
          <div className="font-display text-[28px] font-extrabold leading-none text-ink">4</div>
        </div>
        <div className="text-right text-[10.5px] leading-tight text-ink-3">
          <div className="text-[12px] font-bold text-ink">KOT #318</div>
          <div className="tnum">06 Oct · 8:42 pm</div>
          <div>{GUESTS} guests</div>
        </div>
      </div>
      <div className="perforation my-2.5" aria-hidden="true" />
      <ul className="space-y-2">
        {ORDER.map((it) => (
          <li key={it.name} className="flex gap-2">
            <span className="tnum w-7 shrink-0 text-[12px] font-bold text-ink">{it.qty}×</span>
            <span className="min-w-0">
              <span className="block font-semibold uppercase text-ink">{it.name}</span>
              {it.note && <span className="mt-0.5 inline-block rounded bg-gold-100 px-1.5 text-[10px] font-medium text-gold-800">{it.note}</span>}
            </span>
          </li>
        ))}
      </ul>
      <div className="perforation my-2.5" aria-hidden="true" />
      <div className="flex justify-between text-[10.5px] text-ink-3">
        <span className="tnum">{itemCount} items</span>
        <span>Captain: Arjun</span>
      </div>
    </Receipt>
  )
}
