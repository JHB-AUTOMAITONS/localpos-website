import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { AppFrame, Barcode, Chip, Panel } from './parts'
import { BILL_ITEMS, BILL_TOTAL } from './sample'

/** Four corner brackets of the scan frame, drawn with borders. */
const CORNERS = [
  'left-3 top-3 rounded-tl-lg border-l-2 border-t-2',
  'right-3 top-3 rounded-tr-lg border-r-2 border-t-2',
  'bottom-3 left-3 rounded-bl-lg border-b-2 border-l-2',
  'bottom-3 right-3 rounded-br-lg border-b-2 border-r-2',
]

const SCAN_MODES = ['USB scanner', 'Bluetooth', 'Type the code']
const PACK_CODE = '8901234500014'
const PIECES = BILL_ITEMS.reduce((s, i) => s + i.qty, 0)

/** A product pack under a red scan beam, next to the bill it is filling. */
export function BarcodeScanPreview({ className }: { className?: string }) {
  return (
    <AppFrame sidebar={false} title="LocalPOS · Scan to bill" className={className}>
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="font-display text-[14px] font-bold text-ink">Scan to bill</div>
        <Chip tone="brand">
          <i className="size-1.5 rounded-full bg-brand-500" />
          Scanner connected
        </Chip>
      </div>

      <div className="grid gap-2.5 @[480px]:grid-cols-[1fr_1.1fr]">
        <Panel>
          <div className="relative grid h-[184px] place-items-center overflow-hidden rounded-xl border border-violet-100 bg-violet-50">
            {CORNERS.map((c) => (
              <i key={c} aria-hidden="true" className={cn('absolute size-5 border-violet-500', c)} />
            ))}
            <div className="w-[68%] max-w-[170px] rounded-xl border border-gold-200 bg-gold-50 p-2.5 text-center shadow-card">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-800">Sunrise Select</div>
              <div className="font-display text-[15px] font-bold leading-tight text-ink">Toor Dal</div>
              <div className="text-[10.5px] text-ink-3">1 kg · Pack</div>
              <div className="mt-2 rounded-md bg-white p-1.5">
                <Barcode code={PACK_CODE} height={30} />
                <div className="tnum mt-0.5 text-center text-[10px] tracking-[0.1em] text-ink-3">{PACK_CODE}</div>
              </div>
            </div>
            <span className="scan-beam animate-scan absolute inset-x-4 top-[46%] z-10 h-0.5 rounded-full bg-coral-500 shadow-[0_0_10px_2px_rgb(238_106_79/0.55)]" aria-hidden="true" />
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-2 rounded-lg bg-paper px-2.5 py-1.5 text-[11px]">
            <span className="flex items-center gap-1.5 text-ink-2">
              <Icon name="scan" size={13} className="text-violet-700" />
              Last read
            </span>
            <span className="tnum font-semibold text-ink">{PACK_CODE}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SCAN_MODES.map((m) => (
              <Chip key={m} tone="violet">
                {m}
              </Chip>
            ))}
          </div>
        </Panel>

        <Panel title="Scanned items" action={`${BILL_ITEMS.length} lines`}>
          <ul className="space-y-1">
            {BILL_ITEMS.map((it, i) => (
              <li key={it.name} className={cn('flex items-center gap-2 rounded-lg px-2 py-1.5', i === 0 && 'bg-brand-50 ring-1 ring-brand-200')}>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11.5px] font-semibold text-ink">{it.name}</span>
                  <span className="tnum mt-0.5 flex items-center gap-1.5 text-[10px] text-ink-3">
                    {it.qty} × {rupees(it.rate)}
                    {i === 0 && (
                      <Chip tone="brand">
                        <Icon name="check" size={10} strokeWidth={3} />
                        Scanned
                      </Chip>
                    )}
                  </span>
                </span>
                <span className="tnum text-[11.5px] font-bold text-ink">{rupees(it.qty * it.rate)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-line pt-2">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] text-ink-3">Total · {PIECES} pcs</span>
              <span className="tnum font-display text-[17px] font-bold text-ink">{rupees(BILL_TOTAL)}</span>
            </div>
            <div className="mt-2 grid place-items-center rounded-lg bg-brand-600 py-1.5 text-[11px] font-semibold text-white">Charge {rupees(BILL_TOTAL)}</div>
          </div>
        </Panel>
      </div>
    </AppFrame>
  )
}

interface PriceLabel {
  name: string
  price: number
  note: string
  code: string
}

const LABELS: PriceLabel[] = [
  { name: 'Toor Dal 1 kg', price: 160, note: 'Pack of 1', code: '8901234500014' },
  { name: 'Sunflower Oil 1 L', price: 148, note: 'Pouch · 1 L', code: '8901234500021' },
  { name: 'Basmati Rice 5 kg', price: 610, note: 'Bag · 5 kg', code: '8901234500038' },
  { name: 'Tea Powder 250 g', price: 120, note: '250 g', code: '8901234500045' },
  { name: 'Biscuits Family Pack', price: 50, note: 'Pack of 6', code: '8901234500052' },
  { name: 'Sugar 1 kg', price: 46, note: 'Pack of 1', code: '8901234500069' },
]

/** A sheet of six barcode price labels ready to print. */
export function LabelSheetPreview({ className }: { className?: string }) {
  return (
    <div className={cn('@container overflow-hidden rounded-xl border border-line bg-white text-left text-[12px] leading-snug text-ink-2 shadow-app', className)}>
      <div className="flex items-center justify-between gap-2 border-b border-line bg-paper px-3 py-2">
        <span className="flex min-w-0 items-center gap-1.5 text-[11.5px] font-bold text-ink">
          <Icon name="tag" size={14} className="shrink-0 text-brand-700" />
          <span className="truncate">Print labels · 6 of 6 selected</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold text-white">
          <Icon name="printer" size={12} />
          Print
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-paper-2/60 p-3 @[480px]:grid-cols-3">
        {LABELS.map((l) => (
          <div key={l.code} className="rounded-lg border border-line bg-white p-2">
            <div className="flex items-start justify-between gap-1.5">
              <span className="min-w-0 truncate text-[11px] font-bold text-ink">{l.name}</span>
              <span className="grid size-3.5 shrink-0 place-items-center rounded-[4px] bg-brand-600 text-white">
                <Icon name="check" size={10} strokeWidth={3.2} />
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between gap-1">
              <span className="tnum font-display text-[15px] font-extrabold leading-none text-ink">{rupees(l.price)}</span>
              <span className="truncate text-[10px] text-ink-3">{l.note}</span>
            </div>
            <div className="mt-1.5">
              <Barcode code={l.code} height={24} />
              <div className="tnum mt-0.5 text-center text-[10px] tracking-[0.08em] text-ink-3">{l.code}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden items-center justify-between border-t border-line px-3 py-1.5 text-[10.5px] text-ink-3 @[480px]:flex">
        <span>Label size 50 × 25 mm · 3 per row</span>
        <span className="tnum">6 labels · 1 sheet</span>
      </div>
    </div>
  )
}
