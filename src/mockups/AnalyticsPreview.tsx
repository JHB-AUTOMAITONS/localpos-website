import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { AreaChart, Donut, Meter } from './charts'
import { AppFrame, Chip, Kpi, Panel } from './parts'
import { DAY_SALES, MONTH_SALES, WEEK_SALES } from './sample'

export type ReportRange = 'day' | 'week' | 'month'

export const RANGE_LABEL: Record<ReportRange, string> = { day: 'Today', week: '7 days', month: '30 days' }

const DATA: Record<ReportRange, { points: number[]; axis: string[]; sales: number; bills: number; avg: number; profit: number; growth: string }> = {
  day: { points: DAY_SALES, axis: ['9 am', '12 pm', '3 pm', '6 pm', '9 pm'], sales: 48250, bills: 126, avg: 383, profit: 9650, growth: '12%' },
  week: { points: WEEK_SALES, axis: ['Mon', 'Wed', 'Fri', 'Sun'], sales: 315000, bills: 842, avg: 374, profit: 62800, growth: '8%' },
  month: { points: MONTH_SALES, axis: ['1 Sep', '8 Sep', '15 Sep', '22 Sep', '30 Sep'], sales: 1486000, bills: 3910, avg: 380, profit: 296000, growth: '15%' },
}

const TOP_ITEMS = [
  { name: 'Basmati Rice 5 kg', value: 94 },
  { name: 'Toor Dal 1 kg', value: 78 },
  { name: 'Sunflower Oil 1 L', value: 66 },
  { name: 'Tea Powder 250 g', value: 51 },
  { name: 'Biscuits Family Pack', value: 38 },
]

const CATEGORIES = [
  { label: 'Grocery', value: 46, color: '#13966f' },
  { label: 'Snacks', value: 24, color: '#f6b232' },
  { label: 'Beverages', value: 18, color: '#3b8def' },
  { label: 'Household', value: 12, color: '#7c63f0' },
]

/** Sales analytics: trend, key numbers, best sellers and category split. `range` switches the dataset. */
export function AnalyticsPreview({ className, range = 'week', showRange = true }: { className?: string; range?: ReportRange; /** false shows a static period chip instead of a switcher that looks clickable but is not. */ showRange?: boolean }) {
  const d = DATA[range]
  return (
    <AppFrame active="reports" title="LocalPOS · Reports" className={className}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-display text-[15px] font-bold text-ink">Sales report</div>
        {showRange ? (
          <div className="flex rounded-lg bg-white p-0.5 ring-1 ring-line">
            {(Object.keys(RANGE_LABEL) as ReportRange[]).map((r) => (
              <span key={r} className={cn('rounded-md px-2.5 py-1 text-[10.5px] font-semibold', r === range ? 'bg-brand-600 text-white' : 'text-ink-2')}>
                {RANGE_LABEL[r]}
              </span>
            ))}
          </div>
        ) : (
          <Chip tone="neutral">{RANGE_LABEL[range]}</Chip>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 @[520px]:grid-cols-4">
        <Kpi label="Sales" value={rupees(d.sales)} delta={`${d.growth} vs last period`} />
        <Kpi label="Bills" value={d.bills.toLocaleString('en-IN')} delta="Steady" />
        <Kpi label="Average bill" value={rupees(d.avg)} delta="3% higher" />
        <Kpi label="Estimated profit" value={rupees(d.profit)} tone="gold" delta="20% margin" />
      </div>

      <Panel title="Sales trend" className="mt-2">
        <AreaChart data={d.points} className="h-[110px] @[520px]:h-[130px]" />
        <div className="mt-2 flex justify-between text-[9.5px] text-ink-3">
          {d.axis.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
      </Panel>

      <div className="mt-2 grid gap-2 @[560px]:grid-cols-[1.4fr_1fr]">
        <Panel title="Best sellers" action="Full report">
          <ul className="space-y-2">
            {TOP_ITEMS.map((t) => (
              <li key={t.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
                <span className="truncate text-[11px] font-medium text-ink">{t.name}</span>
                <span className="tnum text-[10.5px] font-bold text-ink-2">{t.value} sold</span>
                <Meter value={t.value} max={100} className="col-span-2" />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="By category" className="hidden @[560px]:block">
          <div className="flex flex-col items-center gap-3">
            <Donut slices={CATEGORIES} size={92} />
            <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-1">
              {CATEGORIES.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5 text-[10.5px]">
                  <i className="size-2 rounded-full" style={{ background: c.color }} />
                  <span className="text-ink-2">{c.label}</span>
                  <b className="tnum ml-auto text-ink">{c.value}%</b>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>
    </AppFrame>
  )
}
