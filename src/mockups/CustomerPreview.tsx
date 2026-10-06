import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { AppFrame, Avatar, Chip, FakeSearch } from './parts'
import { CUSTOMERS } from './sample'

const tagTone = { Regular: 'brand', Wholesale: 'violet', Credit: 'coral' } as const

const HISTORY = [
  { date: '06 Oct', text: 'INV-2041 · 5 items', amount: 1468, status: 'Paid' },
  { date: '28 Sep', text: 'INV-1987 · 8 items', amount: 2240, status: 'Paid' },
  { date: '14 Sep', text: 'INV-1930 · 3 items', amount: 640, status: 'Paid' },
]

/** Customer list with a profile panel: history, dues and tags in one place. */
export function CustomerPreview({ className }: { className?: string }) {
  const selected = CUSTOMERS[0]
  return (
    <AppFrame active="parties" title="LocalPOS · Customers" className={className}>
      <div className="grid gap-3 @[520px]:grid-cols-[1fr_1.15fr]">
        <div className="min-w-0">
          <FakeSearch placeholder="Search name or phone" />
          <ul className="mt-2.5 space-y-1.5">
            {CUSTOMERS.map((c, i) => (
              <li
                key={c.name}
                className={cn('flex items-center gap-2.5 rounded-xl border bg-white p-2', i === 0 ? 'border-brand-300 ring-1 ring-brand-200' : 'border-line')}
              >
                <Avatar name={c.name} index={i} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11.5px] font-semibold text-ink">{c.name}</span>
                  <span className="block text-[10px] text-ink-3">{c.phone}</span>
                </span>
                <span className="text-right">
                  <Chip tone={tagTone[c.tag as keyof typeof tagTone]}>{c.tag}</Chip>
                  {c.due > 0 && <span className="tnum mt-0.5 block text-[10px] font-bold text-coral-700">{rupees(c.due)} due</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden min-w-0 rounded-xl border border-line bg-white p-3 @[520px]:block">
          <div className="flex items-center gap-2.5">
            <Avatar name={selected.name} index={0} size={38} />
            <div className="min-w-0">
              <div className="font-display text-[14px] font-bold text-ink">{selected.name}</div>
              <div className="flex items-center gap-1 text-[10.5px] text-ink-3">
                <Icon name="phone" size={11} /> {selected.phone}
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
            {[
              { l: 'Total bought', v: rupees(selected.spent) },
              { l: 'Visits', v: '34' },
              { l: 'Pending', v: rupees(selected.due) },
            ].map((s) => (
              <div key={s.l} className="rounded-lg bg-paper p-1.5">
                <div className="tnum text-[12px] font-bold text-ink">{s.v}</div>
                <div className="text-[9.5px] text-ink-3">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[10.5px] font-bold uppercase tracking-wide text-ink-3">Recent purchases</div>
          <ul className="mt-1.5 space-y-1.5 border-l-2 border-line pl-3">
            {HISTORY.map((h) => (
              <li key={h.text} className="relative flex items-center justify-between gap-2 text-[11px]">
                <i className="absolute -left-[17px] top-1.5 size-2 rounded-full bg-brand-500 ring-2 ring-white" />
                <span className="min-w-0">
                  <span className="block truncate font-medium text-ink">{h.text}</span>
                  <span className="text-[10px] text-ink-3">{h.date}</span>
                </span>
                <span className="tnum font-bold text-ink">{rupees(h.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppFrame>
  )
}

