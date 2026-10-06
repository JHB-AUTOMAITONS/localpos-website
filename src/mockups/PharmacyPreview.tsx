import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { AppFrame, Chip } from './parts'

type Urgency = 'coral' | 'gold' | 'sky' | 'brand'

const TILES: Array<{ label: string; value: number; tone: Urgency }> = [
  { label: 'Expired', value: 3, tone: 'coral' },
  { label: 'Expiring in 30 days', value: 7, tone: 'gold' },
  { label: 'Expiring in 60 days', value: 12, tone: 'sky' },
  { label: 'In date', value: 214, tone: 'brand' },
]

const TILE_STYLE: Record<Urgency, { box: string; value: string; dot: string }> = {
  coral: { box: 'border-coral-100 bg-coral-50', value: 'text-coral-700', dot: 'bg-coral-500' },
  gold: { box: 'border-gold-200 bg-gold-50', value: 'text-gold-700', dot: 'bg-gold-400' },
  sky: { box: 'border-sky-100 bg-sky-50', value: 'text-sky-700', dot: 'bg-sky-500' },
  brand: { box: 'border-brand-200 bg-brand-50', value: 'text-brand-700', dot: 'bg-brand-500' },
}

const STATUS_LABEL: Record<Urgency, string> = {
  coral: 'Expired',
  gold: 'In 30 days',
  sky: 'In 60 days',
  brand: 'In date',
}

interface Batch {
  medicine: string
  batch: string
  expiry: string
  qty: number
  unit: string
  status: Urgency
}

/** Sample stock as of 6 Oct 2026, nearest expiry first. */
const BATCHES: Batch[] = [
  { medicine: 'Cough syrup 100 ml', batch: 'B2406C', expiry: 'Sep 2026', qty: 18, unit: 'bottles', status: 'coral' },
  { medicine: 'Amoxicillin 250 mg', batch: 'B2398K', expiry: 'Oct 2026', qty: 40, unit: 'strips', status: 'gold' },
  { medicine: 'Antacid gel 170 ml', batch: 'B2402M', expiry: 'Oct 2026', qty: 22, unit: 'bottles', status: 'gold' },
  { medicine: 'Paracetamol 500 mg strip', batch: 'B2407A', expiry: 'Nov 2026', qty: 120, unit: 'strips', status: 'sky' },
  { medicine: 'ORS sachet', batch: 'B2409F', expiry: 'Jan 2027', qty: 300, unit: 'sachets', status: 'brand' },
  { medicine: 'Vitamin C 500 mg strip', batch: 'B2412H', expiry: 'Feb 2027', qty: 85, unit: 'strips', status: 'brand' },
]

const TOTAL_BATCHES = TILES.reduce((s, t) => s + t.value, 0)

/** Three columns on narrow widths; batch number and a separate quantity column appear from 480px. */
const COLS = 'grid-cols-[minmax(0,1fr)_auto_auto] @[480px]:grid-cols-[1.5fr_.8fr_.8fr_.9fr_.9fr]'

const HEAD: Array<{ label: string; cls?: string }> = [
  { label: 'Medicine' },
  { label: 'Batch', cls: 'hidden @[480px]:block' },
  { label: 'Expiry' },
  { label: 'Qty', cls: 'hidden @[480px]:block' },
  { label: 'Status' },
]

/** Batch-wise stock with expiry tracking, colour-coded by how soon each batch runs out of date. Sample data only. */
export function PharmacyBatchesPreview({ className }: { className?: string }) {
  return (
    <AppFrame title="LocalPOS · Batches & expiry" active="items" className={className}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <div>
          <div className="font-display text-[15px] font-bold leading-tight text-ink">Batches &amp; expiry</div>
          <div className="text-[10.5px] text-ink-3">Nearest expiry first · 6 Oct 2026</div>
        </div>
        <Chip tone="sky">
          <Icon name="clock" size={11} /> Sell oldest batch first
        </Chip>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 @[480px]:grid-cols-4">
        {TILES.map((t) => {
          const s = TILE_STYLE[t.tone]
          return (
            <div key={t.label} className={cn('rounded-xl border p-2.5', s.box)}>
              <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-ink-2">
                <i className={cn('size-1.5 shrink-0 rounded-full', s.dot)} />
                {t.label}
              </div>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className={cn('tnum font-display text-[20px] font-bold leading-none', s.value)}>{t.value}</span>
                <span className="text-[10px] text-ink-3">batches</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-2 overflow-hidden rounded-xl border border-line bg-white">
        <div className={cn('grid gap-2 bg-paper-2 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-ink-3', COLS)}>
          {HEAD.map((h) => (
            <span key={h.label} className={h.cls}>
              {h.label}
            </span>
          ))}
        </div>
        <ul className="divide-y divide-line">
          {BATCHES.map((b) => (
            <li key={b.batch} className={cn('grid items-center gap-2 px-2.5 py-2', COLS, b.status === 'coral' && 'bg-coral-50/60')}>
              <span className="min-w-0">
                <span className="block truncate text-[11.5px] font-semibold text-ink">{b.medicine}</span>
                <span className="tnum block text-[10px] text-ink-3 @[480px]:hidden">
                  {b.qty} {b.unit}
                </span>
              </span>
              <span className="tnum hidden text-ink-3 @[480px]:block">{b.batch}</span>
              <span className="tnum text-[11px] text-ink-2">{b.expiry}</span>
              <span className="tnum hidden text-[11px] font-semibold text-ink @[480px]:block">
                {b.qty} {b.unit}
              </span>
              <span>
                <Chip tone={b.status}>{STATUS_LABEL[b.status]}</Chip>
              </span>
            </li>
          ))}
        </ul>
        <div className="tnum flex items-center justify-between gap-2 border-t border-line bg-paper px-2.5 py-1.5 text-[10px] text-ink-3">
          <span>
            Showing {BATCHES.length} of {TOTAL_BATCHES} batches
          </span>
          <span>Sample data</span>
        </div>
      </div>
    </AppFrame>
  )
}
