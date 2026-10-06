import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { AppFrame, Chip, FakeSearch } from './parts'
import { BILL_ITEMS, BILL_TOTAL } from './sample'

const CATEGORIES = ['All items', 'Grocery', 'Snacks', 'Beverages', 'Household']
const TILES = [
  { name: 'Toor Dal 1 kg', price: 160, stock: 38 },
  { name: 'Sunflower Oil 1 L', price: 148, stock: 12 },
  { name: 'Basmati Rice 5 kg', price: 610, stock: 64 },
  { name: 'Tea Powder 250 g', price: 120, stock: 91 },
  { name: 'Biscuits Family Pack', price: 50, stock: 7 },
  { name: 'Sugar 1 kg', price: 46, stock: 4 },
  { name: 'Salt 1 kg', price: 24, stock: 52 },
  { name: 'Notebook A5', price: 35, stock: 80 },
]
const TILE_TONES = ['bg-brand-100 text-brand-800', 'bg-gold-100 text-gold-800', 'bg-coral-100 text-coral-700', 'bg-sky-100 text-sky-700', 'bg-violet-100 text-violet-700']

/** The counter billing screen: item grid on the left, the live bill and payment on the right. */
export function PosScreen({ className }: { className?: string }) {
  return (
    <AppFrame active="billing" title="LocalPOS · New bill" className={className}>
      <div className="grid gap-3 @[620px]:grid-cols-[1.25fr_1fr]">
        <div className="hidden min-w-0 @[620px]:block">
          <FakeSearch placeholder="Search item or scan barcode" />
          <div className="scrollbar-none mt-2.5 flex gap-1.5 overflow-x-auto">
            {CATEGORIES.map((c, i) => (
              <span key={c} className={cn('whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-semibold', i === 0 ? 'bg-ink text-paper' : 'bg-white text-ink-2 ring-1 ring-line')}>
                {c}
              </span>
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {TILES.map((t, i) => (
              <div key={t.name} className="rounded-xl border border-line bg-white p-2">
                <span className={cn('grid size-7 place-items-center rounded-lg text-[11px] font-bold', TILE_TONES[i % TILE_TONES.length])}>{t.name[0]}</span>
                <div className="mt-1.5 truncate text-[11px] font-semibold text-ink">{t.name}</div>
                <div className="flex items-center justify-between">
                  <span className="tnum text-[11px] font-bold text-brand-700">{rupees(t.price)}</span>
                  <span className={cn('tnum text-[9.5px]', t.stock < 10 ? 'font-bold text-coral-700' : 'text-ink-3')}>{t.stock} in stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-xl border border-line bg-white p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-medium text-ink-3">Current bill</div>
              <div className="font-display text-[14px] font-bold text-ink">Bill #2042</div>
            </div>
            <Chip tone="sky">Walk-in customer</Chip>
          </div>
          <FakeSearch placeholder="Search or scan item" className="mt-2.5 @[620px]:hidden" />
          <ul className="mt-2.5 divide-y divide-line">
            {BILL_ITEMS.map((it) => (
              <li key={it.name} className="flex items-center gap-2 py-1.5">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11.5px] font-semibold text-ink">{it.name}</span>
                  <span className="tnum block text-[10px] text-ink-3">{rupees(it.rate)} each</span>
                </span>
                <span className="flex items-center gap-1 rounded-md bg-paper-2 px-1 py-0.5 text-ink-2">
                  <Icon name="minus" size={11} strokeWidth={2.6} />
                  <b className="tnum w-3 text-center text-[11px] text-ink">{it.qty}</b>
                  <Icon name="plus" size={11} strokeWidth={2.6} />
                </span>
                <span className="tnum w-14 text-right text-[11.5px] font-bold text-ink">{rupees(it.qty * it.rate)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-2 space-y-1 border-t border-dashed border-line-strong pt-2 text-[11px]">
            <div className="flex justify-between text-ink-3">
              <dt>Discount</dt>
              <dd className="tnum">₹0</dd>
            </div>
            <div className="flex justify-between text-ink-3">
              <dt>GST included</dt>
              <dd className="tnum">{rupees(86.4, true)}</dd>
            </div>
            <div className="flex items-baseline justify-between text-ink">
              <dt className="font-semibold">Total</dt>
              <dd className="tnum font-display text-[20px] font-bold">{rupees(BILL_TOTAL)}</dd>
            </div>
          </dl>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-[11px] font-semibold">
            {['Cash', 'UPI', 'Card'].map((m) => (
              <span key={m} className={cn('rounded-lg py-1.5 text-center', m === 'UPI' ? 'bg-brand-100 text-brand-800 ring-1 ring-brand-300' : 'bg-white text-ink-2 ring-1 ring-line')}>
                {m}
              </span>
            ))}
          </div>
          <div className="mt-2 rounded-lg bg-brand-600 py-2.5 text-center text-[12.5px] font-bold text-white">Charge {rupees(BILL_TOTAL)}</div>
        </div>
      </div>
    </AppFrame>
  )
}
