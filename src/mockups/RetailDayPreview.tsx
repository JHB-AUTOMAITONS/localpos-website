import { Icon } from '@/components/Icon'
import { rupees } from '@/lib/format'
import { Donut, Meter } from './charts'
import { AppFrame, Chip, Panel } from './parts'
import { SAMPLE_STORE } from './sample'

/** Fictional sample day. Payment modes add up to the day's total, and everything below is derived from these numbers. */
const CASH_SALES = 14350
const MODES = [
  { label: 'UPI', value: 24600, color: '#13966f' },
  { label: 'Cash', value: CASH_SALES, color: '#f6b232' },
  { label: 'Card', value: 6900, color: '#3b8def' },
  { label: 'Credit', value: 2400, color: '#7c63f0' },
]

const TOTAL = MODES.reduce((s, m) => s + m.value, 0) // 48,250
const BILLS = 126
const ITEMS_SOLD = 412
const AVG_BILL = Math.round(TOTAL / BILLS) // 383

const OPENING_FLOAT = 2000
const EXPENSES = 350
const EXPECTED_CASH = OPENING_FLOAT + CASH_SALES - EXPENSES
const COUNTED_CASH = 16000
const DIFFERENCE = COUNTED_CASH - EXPECTED_CASH

const SELLERS = [
  { name: 'Basmati Rice 5 kg', units: 19, rate: 610 },
  { name: 'Toor Dal 1 kg', units: 42, rate: 160 },
  { name: 'Tea Powder 250 g', units: 36, rate: 120 },
  { name: 'Sunflower Oil 1 L', units: 27, rate: 148 },
  { name: 'Biscuits Family Pack', units: 31, rate: 50 },
].map((s) => ({ ...s, amount: s.units * s.rate }))

const TOP_AMOUNT = SELLERS[0].amount

/** End-of-day summary: sales by payment mode, cash drawer check, top sellers and the Close day action. */
export function DayCloseSummaryPreview({ className }: { className?: string }) {
  return (
    <AppFrame title="LocalPOS · Day close" active="reports" className={className}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="text-[10.5px] font-medium text-ink-3">End of day · 6 Oct 2026</div>
          <div className="font-display text-[15px] font-bold leading-tight text-ink">{SAMPLE_STORE}</div>
        </div>
        <div className="text-right">
          <div className="text-[10.5px] font-medium text-ink-3">Total sales</div>
          <div className="tnum font-display text-[17px] font-bold leading-tight text-brand-700">{rupees(TOTAL)}</div>
        </div>
      </div>

      <div className="mt-3 grid items-start gap-2 @[560px]:grid-cols-[1.15fr_1fr]">
        <div className="min-w-0 space-y-2">
          <Panel title="Today's sales by payment mode">
            <div className="flex items-center gap-3">
              <Donut
                slices={MODES}
                size={88}
                center={
                  <span className="text-[10px] leading-tight text-ink-3">
                    Total
                    <b className="tnum block text-[11px] text-ink">{rupees(TOTAL)}</b>
                  </span>
                }
              />
              <ul className="min-w-0 flex-1 space-y-1.5">
                {MODES.map((m) => (
                  <li key={m.label} className="flex items-center gap-1.5 text-[11px]">
                    <i className="size-2 shrink-0 rounded-full" style={{ background: m.color }} />
                    <span className="flex-1 text-ink-2">{m.label}</span>
                    <b className="tnum text-ink">{rupees(m.value)}</b>
                    <span className="tnum w-8 text-right text-ink-3">{Math.round((m.value / TOTAL) * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>

          <Panel title="Cash drawer">
            <dl className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <dt className="text-ink-3">Expected</dt>
                <dd className="tnum font-bold text-ink">{rupees(EXPECTED_CASH)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-3">Counted</dt>
                <dd className="tnum font-bold text-ink">{rupees(COUNTED_CASH)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-1.5">
                <dt className="font-semibold text-ink">Difference</dt>
                <dd className="flex items-center gap-1.5">
                  <b className="tnum text-ink">{rupees(DIFFERENCE)}</b>
                  <Chip tone={DIFFERENCE === 0 ? 'brand' : 'coral'}>
                    <Icon name="check" size={10} strokeWidth={2.8} />
                    {DIFFERENCE === 0 ? 'Matches' : 'Check count'}
                  </Chip>
                </dd>
              </div>
            </dl>
            <p className="tnum mt-2 text-[10px] text-ink-3">
              Opening {rupees(OPENING_FLOAT)} + cash sales {rupees(CASH_SALES)} − expenses {rupees(EXPENSES)}
            </p>
          </Panel>
        </div>

        <div className="min-w-0 space-y-2">
          <Panel title="Top sellers" action="By sales" className="hidden @[560px]:block">
            <ul className="space-y-2.5">
              {SELLERS.map((s, i) => (
                <li key={s.name}>
                  <div className="flex items-baseline justify-between gap-2 text-[11px]">
                    <span className="truncate font-medium text-ink">{s.name}</span>
                    <span className="tnum shrink-0 font-bold text-ink">{rupees(s.amount)}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Meter value={s.amount} max={TOP_AMOUNT} color={i === 0 ? '#13966f' : '#6cc8a5'} className="flex-1" />
                    <span className="tnum shrink-0 text-[10px] text-ink-3">{s.units} sold</span>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <dl className="grid grid-cols-3 divide-x divide-line text-center">
              {[
                { label: 'Bills', value: String(BILLS) },
                { label: 'Items sold', value: String(ITEMS_SOLD) },
                { label: 'Average bill', value: rupees(AVG_BILL) },
              ].map((x) => (
                <div key={x.label} className="flex flex-col-reverse px-1">
                  <dt className="mt-0.5 text-[10px] text-ink-3">{x.label}</dt>
                  <dd className="tnum font-display text-[14px] font-bold leading-tight text-ink">{x.value}</dd>
                </div>
              ))}
            </dl>
            <span className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-brand-600 py-2 text-[11.5px] font-semibold text-white">
              <Icon name="circle-check" size={14} /> Close day
            </span>
          </Panel>
        </div>
      </div>
    </AppFrame>
  )
}
