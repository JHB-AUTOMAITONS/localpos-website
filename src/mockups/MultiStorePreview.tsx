import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { Meter } from './charts'
import { AppFrame, Chip, Kpi, Panel } from './parts'
import { STORES } from './sample'

const TRANSFER_STEPS = ['Requested', 'Packed', 'In transit', 'Received']

/** One view across all branches: combined numbers, a store comparison and a stock transfer in progress. */
export function MultiStorePreview({ className }: { className?: string }) {
  const max = Math.max(...STORES.map((s) => s.sales))
  const total = STORES.reduce((s, x) => s + x.sales, 0)
  return (
    <AppFrame active="stores" title="LocalPOS · All stores" className={className}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ink ring-1 ring-line">
          <Icon name="building" size={14} className="text-brand-700" />
          All stores <span className="text-ink-3">· 4</span>
          <Icon name="chevron-down" size={13} />
        </span>
        <Chip tone="neutral">Today</Chip>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Kpi label="Sales" value={rupees(total)} delta="9% vs yesterday" />
        <Kpi label="Bills" value="412" delta="31 more" />
        <Kpi label="Low-stock items" value="8" tone="coral" delta="2 stores" />
      </div>

      <Panel title="Store comparison" action="Compare" className="mt-2">
        <ul className="divide-y divide-line">
          {STORES.map((s) => (
            <li key={s.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 py-2 first:pt-0 last:pb-0 @[520px]:grid-cols-[1.1fr_1.4fr_auto_auto]">
              <span className="min-w-0">
                <span className="block truncate text-[11.5px] font-semibold text-ink">{s.name}</span>
                <span className="block text-[10px] text-ink-3">{s.city}</span>
              </span>
              <span className="tnum text-right text-[11.5px] font-bold text-ink @[520px]:order-3">{rupees(s.sales)}</span>
              <Meter value={s.sales} max={max} className="col-span-2 @[520px]:order-2 @[520px]:col-span-1" />
              <Chip tone={s.growth >= 0 ? 'brand' : 'coral'} className="hidden @[520px]:order-4 @[520px]:inline-flex">
                {s.growth >= 0 ? '▲' : '▼'} {Math.abs(s.growth)}%
              </Chip>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Stock transfer TR-27" action="Track" className="mt-2">
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <span className="font-semibold text-ink">Main Road → Market Street</span>
          <span className="tnum text-ink-3">24 items</span>
        </div>
        <ol className="mt-2.5 grid grid-cols-4 gap-1.5">
          {TRANSFER_STEPS.map((step, i) => (
            <li key={step} className="text-center">
              <div className={cn('mx-auto grid size-5 place-items-center rounded-full text-[9px] font-bold', i <= 2 ? 'bg-brand-600 text-white' : 'bg-paper-3 text-ink-3')}>
                {i < 2 ? <Icon name="check" size={11} strokeWidth={3} /> : i + 1}
              </div>
              <div className={cn('mt-1 text-[9.5px] leading-tight', i === 2 ? 'font-bold text-ink' : 'text-ink-3')}>{step}</div>
            </li>
          ))}
        </ol>
      </Panel>
    </AppFrame>
  )
}
