import { cn } from '@/lib/cn'
import { num, rupees } from '@/lib/format'
import { Icon } from '@/components/Icon'
import { Meter } from './charts'
import { AppFrame, Avatar, Chip, Kpi, Panel } from './parts'

type CounterState = 'Billing' | 'Idle' | 'Closed'

const STATE_TONE = { Billing: 'brand', Idle: 'sky', Closed: 'neutral' } as const

interface Counter {
  no: number
  cashier: string
  state: CounterState
  queue: number
  bills: number
  total: number
}

const COUNTERS: Counter[] = [
  { no: 1, cashier: 'Meena K', state: 'Billing', queue: 3, bills: 58, total: 13420 },
  { no: 2, cashier: 'Arun P', state: 'Billing', queue: 2, bills: 51, total: 11860 },
  { no: 3, cashier: 'Divya S', state: 'Billing', queue: 6, bills: 74, total: 18940 },
  { no: 4, cashier: 'Kumar R', state: 'Idle', queue: 0, bills: 37, total: 8215 },
  { no: 5, cashier: 'Lakshmi N', state: 'Billing', queue: 1, bills: 45, total: 10390 },
  { no: 6, cashier: 'Sanjay V', state: 'Closed', queue: 0, bills: 12, total: 2975 },
]

const BUSIEST = COUNTERS.reduce((a, c) => (c.total > a.total ? c : a)).no
const OPEN = COUNTERS.filter((c) => c.state !== 'Closed').length
const BILLS_TOTAL = COUNTERS.reduce((s, c) => s + c.bills, 0)
const SALES_TOTAL = COUNTERS.reduce((s, c) => s + c.total, 0)

const LOW = [
  { name: 'Milk 500 ml', left: 14, min: 60, sold: 96 },
  { name: 'Bread', left: 9, min: 40, sold: 58 },
  { name: 'Eggs tray', left: 11, min: 30, sold: 34 },
  { name: 'Atta 5 kg', left: 18, min: 40, sold: 27 },
]

function Row({ label, value, alert }: { label: string; value: string; alert?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-ink-3">{label}</dt>
      <dd className={cn('tnum font-bold', alert ? 'text-coral-700' : 'text-ink')}>{value}</dd>
    </div>
  )
}

/** Live view of every billing counter plus the fast movers that are running low. */
export function SupermarketCountersPreview({ className }: { className?: string }) {
  return (
    <AppFrame title="LocalPOS · Counters" active="billing" className={className}>
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-[10.5px] font-medium text-ink-3">Today · 3:45 pm</div>
          <div className="font-display text-[15px] font-bold leading-tight text-ink">Billing counters</div>
        </div>
        <Chip tone="brand">
          <i className="size-1.5 rounded-full bg-brand-500" /> Live
        </Chip>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 @[400px]:grid-cols-3">
        <Kpi label="Bills per hour" value="46" />
        <Kpi label="Items scanned today" value={num(1962)} />
        <div className="col-span-2 @[400px]:col-span-1">
          <Kpi label="Open counters" value={`${OPEN} of ${COUNTERS.length}`} />
        </div>
      </div>

      <div className="mt-2 grid items-start gap-2 @[560px]:grid-cols-[1.7fr_1fr]">
        <div className="min-w-0">
          <ul className="grid grid-cols-2 gap-2 @[420px]:grid-cols-3 @[560px]:grid-cols-2">
            {COUNTERS.map((c, i) => {
              const busiest = c.no === BUSIEST
              const closed = c.state === 'Closed'
              return (
                <li
                  key={c.no}
                  className={cn('rounded-xl border p-2.5', busiest ? 'border-gold-300 bg-gold-50 ring-1 ring-gold-200' : closed ? 'border-line bg-paper-2' : 'border-line bg-white')}
                >
                  <div className="flex items-center gap-2">
                    <Avatar name={c.cashier} index={i} size={26} />
                    <div className="min-w-0">
                      <div className="truncate text-[11.5px] font-bold text-ink">Counter {c.no}</div>
                      <div className="truncate text-[10px] text-ink-3">{c.cashier}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Chip tone={STATE_TONE[c.state]}>{c.state}</Chip>
                    {busiest && (
                      <Chip tone="gold">
                        <Icon name="zap" size={10} /> Busiest
                      </Chip>
                    )}
                  </div>
                  <dl className="mt-2 space-y-0.5 border-t border-line pt-2 text-[10.5px]">
                    <Row label="Queue" value={closed ? '—' : String(c.queue)} alert={c.queue >= 5} />
                    <Row label="Bills today" value={String(c.bills)} />
                    <Row label="Today" value={rupees(c.total)} />
                  </dl>
                </li>
              )
            })}
          </ul>
          <p className="tnum mt-2 text-[10.5px] text-ink-3">
            All counters: <b className="text-ink">{BILLS_TOTAL} bills</b> · <b className="text-ink">{rupees(SALES_TOTAL)}</b> so far today
          </p>
        </div>

        <Panel
          title="Fast movers running low"
          action={
            <span className="inline-flex items-center gap-1 text-gold-700">
              Reorder <Icon name="arrow-right" size={11} strokeWidth={2.4} />
            </span>
          }
          className="hidden @[560px]:block"
        >
          <ul className="space-y-2.5">
            {LOW.map((p) => {
              const urgent = p.left / p.min < 0.3
              return (
                <li key={p.name}>
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="truncate font-medium text-ink">{p.name}</span>
                    <span className={cn('tnum shrink-0 font-bold', urgent ? 'text-coral-700' : 'text-gold-700')}>{p.left} left</span>
                  </div>
                  <Meter value={p.left} max={p.min} color={urgent ? '#ee6a4f' : '#f6b232'} className="mt-1" />
                  <div className="tnum mt-0.5 text-[10px] text-ink-3">{p.sold} sold today</div>
                </li>
              )
            })}
          </ul>
        </Panel>
      </div>
    </AppFrame>
  )
}
