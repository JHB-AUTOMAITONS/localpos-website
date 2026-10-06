import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { Meter } from './charts'
import { AppFrame, Chip, FakeSearch } from './parts'
import { STOCK } from './sample'

const FILTERS = [
  { label: 'All items', count: 248, active: true },
  { label: 'Low stock', count: 6 },
  { label: 'Out of stock', count: 2 },
]

/** Item and stock list with low-stock flags. */
export function InventoryPreview({ className }: { className?: string }) {
  return (
    <AppFrame active="items" title="LocalPOS · Items & stock" className={className}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <span
              key={f.label}
              className={cn('whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-semibold', f.active ? 'bg-ink text-paper' : 'bg-white text-ink-2 ring-1 ring-line')}
            >
              {f.label} <span className="tnum opacity-70">{f.count}</span>
            </span>
          ))}
        </div>
        <FakeSearch placeholder="Search items" className="hidden @[480px]:flex" />
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-line bg-white">
        <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-line bg-paper-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-ink-3 @[480px]:grid-cols-[1.4fr_1fr_.6fr_.8fr]">
          <span>Item</span>
          <span className="hidden @[480px]:block">Stock level</span>
          <span className="hidden text-right @[480px]:block">Price</span>
          <span className="text-right">Status</span>
        </div>
        {STOCK.map((s) => {
          const low = s.qty < s.min
          const critical = s.qty < 8
          return (
            <div key={s.sku} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line px-3 py-2 last:border-b-0 @[480px]:grid-cols-[1.4fr_1fr_.6fr_.8fr]">
              <div className="min-w-0">
                <div className="truncate text-[11.5px] font-semibold text-ink">{s.name}</div>
                <div className="tnum text-[10px] text-ink-3">
                  {s.sku} · <span className={cn(low && 'font-bold text-coral-700')}>{s.qty} {s.unit}</span>
                </div>
              </div>
              <div className="hidden @[480px]:block">
                <Meter value={s.qty} max={s.min * 2.2} color={critical ? '#ee6a4f' : low ? '#f6b232' : '#13966f'} />
                <div className="tnum mt-1 text-[10px] text-ink-3">Reorder at {s.min}</div>
              </div>
              <div className="tnum hidden text-right text-[11.5px] font-semibold text-ink @[480px]:block">{rupees(s.price)}</div>
              <div className="text-right">
                <Chip tone={critical ? 'coral' : low ? 'gold' : 'brand'}>{critical ? 'Reorder now' : low ? 'Running low' : 'In stock'}</Chip>
              </div>
            </div>
          )
        })}
      </div>
    </AppFrame>
  )
}
