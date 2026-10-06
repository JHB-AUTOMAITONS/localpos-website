import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { AppFrame, Avatar, Barcode, Chip, Panel } from './parts'

/** All figures below are fictional sample data, not a live gold rate. Weights are held in milligrams to keep the sums exact. */
const GROSS_MG = 24600
const STONE_MG = 800
const NET_MG = GROSS_MG - STONE_MG // 23.800 g
const RATE_PER_G = 9850 // sample rate for 22K, per gram
const MAKING_PER_G = 650 // sample making charge, per gram
const STONE_CHARGES = 3200 // sample flat charge

const grams = (mg: number) => `${(mg / 1000).toFixed(3)} g`

const METAL = (NET_MG * RATE_PER_G) / 1000
const MAKING = (NET_MG * MAKING_PER_G) / 1000
const TAXABLE = METAL + MAKING + STONE_CHARGES
const HALF_GST = (TAXABLE * 15) / 1000 // 1.5% each for CGST and SGST (sample)
const TOTAL = TAXABLE + HALF_GST * 2

const SPECS: Array<{ label: string; value: string; net?: boolean; badge?: string }> = [
  { label: 'Gross weight', value: grams(GROSS_MG) },
  { label: 'Stone weight', value: grams(STONE_MG) },
  { label: 'Net weight', value: grams(NET_MG), net: true },
  { label: 'Purity', value: '22K' },
  { label: 'Rate per gram', value: rupees(RATE_PER_G), badge: 'Sample rate' },
  { label: 'Pieces', value: '1' },
]

const LINES = [
  { label: 'Metal value', note: `${grams(NET_MG)} × ${rupees(RATE_PER_G)} / g`, amount: METAL },
  { label: 'Making charges', note: `${grams(NET_MG)} × ${rupees(MAKING_PER_G)} / g (sample)`, amount: MAKING },
  { label: 'Stone charges', note: 'Flat charge (sample)', amount: STONE_CHARGES },
]

/** One jewellery line: weights, purity and a transparent metal + making + stone + GST breakdown. */
export function JewelleryBillPreview({ className }: { className?: string }) {
  return (
    <AppFrame title="LocalPOS · Jewellery bill" active="billing" className={className}>
      <div className="grid items-start gap-2 @[560px]:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 space-y-2">
          <Panel>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Chip tone="gold">
                  <Icon name="tag" size={10} /> <span className="tnum">JW-0418</span>
                </Chip>
                <div className="mt-1.5 font-display text-[14px] font-bold leading-tight text-ink">Gold necklace, 22K</div>
              </div>
              <span className="flex items-center gap-1.5 text-[10.5px] text-ink-3 @[560px]:hidden">
                <Avatar name="Kavitha R" index={1} size={24} />
                Kavitha R
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-1.5 @[400px]:grid-cols-3 @[560px]:grid-cols-2 @[680px]:grid-cols-3">
              {SPECS.map((s) => (
                <div key={s.label} className={cn('rounded-lg px-2.5 py-1.5', s.net ? 'bg-brand-50 ring-1 ring-brand-200' : 'bg-paper')}>
                  <div className="text-[10px] text-ink-3">{s.label}</div>
                  <div className="flex flex-wrap items-center gap-x-1.5">
                    <span className={cn('tnum text-[12px] font-bold', s.net ? 'text-brand-800' : 'text-ink')}>{s.value}</span>
                    {s.badge && <Chip tone="gold">{s.badge}</Chip>}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Itemised calculation" action="Sample figures">
            <ul className="divide-y divide-line">
              {LINES.map((l) => (
                <li key={l.label} className="flex items-start justify-between gap-3 py-1.5 first:pt-0">
                  <span className="min-w-0">
                    <span className="block text-[11.5px] font-semibold text-ink">{l.label}</span>
                    <span className="tnum block text-[10px] text-ink-3">{l.note}</span>
                  </span>
                  <span className="tnum shrink-0 text-[11.5px] font-semibold text-ink">{rupees(l.amount, true)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-0.5 space-y-1 border-t border-line pt-2 text-[11px] text-ink-2">
              <div className="flex justify-between font-semibold text-ink">
                <dt>Taxable value</dt>
                <dd className="tnum">{rupees(TAXABLE, true)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>CGST 1.5% (sample)</dt>
                <dd className="tnum">{rupees(HALF_GST, true)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>SGST 1.5% (sample)</dt>
                <dd className="tnum">{rupees(HALF_GST, true)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-line pt-2">
                <dt className="font-display text-[13px] font-bold text-ink">Total</dt>
                <dd className="tnum font-display text-[17px] font-bold text-brand-700">{rupees(TOTAL, true)}</dd>
              </div>
            </dl>
            <span className="mt-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 py-2 text-[11.5px] font-semibold text-white">
              <Icon name="printer" size={13} /> Save &amp; print
            </span>
          </Panel>
        </div>

        <Panel title="Customer" action="Change" className="hidden @[560px]:block">
          <div className="flex items-center gap-2.5">
            <Avatar name="Kavitha R" index={1} size={34} />
            <div className="min-w-0">
              <div className="truncate text-[12px] font-bold text-ink">Kavitha R</div>
              <div className="text-[10.5px] text-ink-3">Customer since 2019</div>
            </div>
          </div>
          <dl className="mt-3 space-y-2 border-t border-line pt-2.5 text-[11px]">
            <div className="flex justify-between gap-2">
              <dt className="text-ink-3">Last purchase</dt>
              <dd className="text-right font-semibold text-ink">
                Gold bangles
                <span className="tnum block text-[10px] font-normal text-ink-3">14 Mar 2026</span>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-ink-3">Outstanding</dt>
              <dd className="flex items-center gap-1.5">
                <b className="tnum text-ink">{rupees(0)}</b>
                <Chip tone="brand">Clear</Chip>
              </dd>
            </div>
          </dl>
        </Panel>
      </div>
    </AppFrame>
  )
}

/** A hanging item tag: string, punched hole, tag number, weight, purity and a barcode. */
export function JewelleryTagPreview({ className }: { className?: string }) {
  return (
    <div className={cn('@container flex w-full justify-center pt-9', className)}>
      <div className="relative w-[190px] shrink-0">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-float">
          <span
            className="absolute left-1/2 top-2.5 size-3.5 -translate-x-1/2 rounded-full border border-line-strong bg-paper-2"
            style={{ boxShadow: 'inset 0 1px 2px rgb(19 33 28 / 0.2)' }}
          />
          <div className="px-4 pb-3 pt-7 text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-3">Sunrise Jewels</div>
            <div className="tnum mt-2 font-mono text-[13px] font-bold tracking-wide text-ink">JW-0418</div>
            <div className="font-display text-[15px] font-bold leading-tight text-ink">Gold necklace</div>
            <dl className="mt-2.5 grid grid-cols-2 gap-1.5 text-left">
              <div className="rounded-lg bg-brand-50 px-2 py-1">
                <dt className="text-[10px] text-ink-3">Net wt</dt>
                <dd className="tnum text-[11.5px] font-bold text-brand-800">{grams(NET_MG)}</dd>
              </div>
              <div className="rounded-lg bg-gold-50 px-2 py-1">
                <dt className="text-[10px] text-ink-3">Purity</dt>
                <dd className="tnum text-[11.5px] font-bold text-gold-800">22K</dd>
              </div>
            </dl>
            <div className="mt-3">
              <Barcode code="JW0418" height={30} />
            </div>
            <div className="mt-1 text-[10px] tracking-[0.25em] text-ink-3">JW 0418</div>
          </div>
          <div className="h-2 bg-gold-400" />
        </div>
        <svg viewBox="0 0 56 56" className="pointer-events-none absolute -top-9 left-1/2 h-14 w-14 -translate-x-1/2" aria-hidden="true">
          <path d="M25 53 C6 38 10 3 28 3 C46 3 50 38 31 53" fill="none" stroke="#e89a14" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
