import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { AreaChart, Donut, Meter, Spark } from './charts'
import { AppFrame, Chip, Kpi, Panel } from './parts'
import { DAY_SALES, INVOICES, SAMPLE_STORE, STOCK } from './sample'

const MODES = [
  { label: 'UPI', value: 52, color: '#13966f' },
  { label: 'Cash', value: 31, color: '#f6b232' },
  { label: 'Card', value: 17, color: '#3b8def' },
]

const statusTone = { Paid: 'brand', 'Part paid': 'gold', Due: 'coral' } as const

/** The main billing dashboard: sales, invoices, payments, GST and stock at a glance. */
export function DashboardPreview({ className }: { className?: string }) {
  const lowStock = STOCK.filter((s) => s.qty < s.min).slice(0, 3)
  return (
    <AppFrame title="LocalPOS · Dashboard" className={className}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-[10.5px] font-medium text-ink-3">Tue, 6 Oct</div>
          <div className="font-display text-[15px] font-bold leading-tight text-ink">Today at {SAMPLE_STORE}</div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-[11px] font-semibold text-white">
          <Icon name="plus" size={13} strokeWidth={2.6} /> New bill
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 @[520px]:grid-cols-4">
        <Kpi label="Sales today" value={rupees(48250)} delta="12% vs yesterday">
          <Spark data={[3, 5, 4, 7, 6, 9, 8]} className="hidden @[400px]:block" />
        </Kpi>
        <Kpi label="Invoices" value="126" delta="9 more than usual" />
        <Kpi label="GST collected" value={rupees(5120)} tone="gold" delta="Ready to report" />
        <Kpi label="Payments due" value={rupees(14640)} tone="coral" delta="5 customers" />
      </div>

      <div className="mt-2 grid gap-2 @[560px]:grid-cols-[1fr_1.55fr]">
        <Panel
          title={
            <span className="flex items-baseline gap-2">
              Sales today <span className="tnum font-display text-[15px] text-brand-700">{rupees(48250)}</span>
            </span>
          }
          action="Today · Week"
        >
          <AreaChart data={DAY_SALES} className="h-[86px]" />
          <div className="mt-2 flex justify-between text-[9.5px] text-ink-3">
            <span>9 am</span>
            <span>12 pm</span>
            <span>3 pm</span>
            <span>6 pm</span>
            <span>9 pm</span>
          </div>
        </Panel>
        <Panel title="Payment modes" className="hidden @[480px]:block @[560px]:order-first">
          <div className="flex items-center gap-3">
            <Donut slices={MODES} size={78} center={<span className="text-[9.5px] leading-tight text-ink-3">Paid<br /><b className="text-[12px] text-ink">126</b></span>} />
            <ul className="space-y-1.5">
              {MODES.map((m) => (
                <li key={m.label} className="flex items-center gap-1.5 text-[11px]">
                  <i className="size-2 rounded-full" style={{ background: m.color }} />
                  <span className="w-8 text-ink-2">{m.label}</span>
                  <b className="tnum text-ink">{m.value}%</b>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <div className="mt-2 grid gap-2 @[560px]:grid-cols-[1fr_1.55fr]">
        <Panel title="Recent invoices" action="View all">
          <ul className="divide-y divide-line">
            {INVOICES.slice(0, 4).map((inv) => (
              <li key={inv.no} className="flex items-center gap-2 py-1.5 first:pt-0 last:pb-0">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11.5px] font-semibold text-ink">{inv.customer}</span>
                  <span className="block text-[10px] text-ink-3">{inv.no} · {inv.mode}</span>
                </span>
                <span className="tnum text-[11.5px] font-bold text-ink">{rupees(inv.amount)}</span>
                <Chip tone={statusTone[inv.status]} className="hidden @[400px]:inline-flex">{inv.status}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Running low" action="Reorder" className="hidden @[480px]:block @[560px]:order-first">
          <ul className="space-y-2">
            {lowStock.map((s) => (
              <li key={s.sku}>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="truncate font-medium text-ink">{s.name}</span>
                  <span className={cn('tnum font-bold', s.qty < 8 ? 'text-coral-700' : 'text-gold-700')}>{s.qty} left</span>
                </div>
                <Meter value={s.qty} max={s.min} color={s.qty < 8 ? '#ee6a4f' : '#f6b232'} className="mt-1" />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppFrame>
  )
}
