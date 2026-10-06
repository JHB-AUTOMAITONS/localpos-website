import { Icon } from '@/components/Icon'
import { rupees } from '@/lib/format'
import { Bars, Donut } from './charts'
import { AppFrame, Avatar, Chip, Kpi, Panel } from './parts'

const MODES = [
  { label: 'UPI', value: 52, color: '#13966f' },
  { label: 'Cash', value: 31, color: '#f6b232' },
  { label: 'Card', value: 17, color: '#3b8def' },
]

const AGEING = [
  { label: '0–7 d', value: 8200 },
  { label: '8–30 d', value: 12450 },
  { label: '31–60 d', value: 4300 },
  { label: '60+ d', value: 1800 },
]

const DUES = [
  { name: 'Meena Traders', amount: 12450, age: '18 days', tone: 'gold' as const },
  { name: 'Ravi Kumar', amount: 2190, age: '6 days', tone: 'sky' as const },
  { name: 'Suresh Stores', amount: 1800, age: '64 days', tone: 'coral' as const },
]

/** Payment tracking: money in, money out, and who still owes you. */
export function PaymentsPreview({ className }: { className?: string }) {
  return (
    <AppFrame active="parties" title="LocalPOS · Payments" className={className}>
      <div className="grid grid-cols-2 gap-2 @[520px]:grid-cols-3">
        <Kpi label="Received today" value={rupees(41900)} delta="86% of sales" />
        <Kpi label="To collect" value={rupees(26750)} tone="gold" delta="9 customers" />
        <div className="col-span-2 @[520px]:col-span-1">
          <Kpi label="To pay suppliers" value={rupees(86400)} tone="coral" delta="3 due this week" />
        </div>
      </div>

      <div className="mt-2 grid gap-2 @[560px]:grid-cols-2">
        <Panel title="How money came in today">
          <div className="flex items-center gap-4">
            <Donut slices={MODES} size={84} center={<span className="text-[10px] leading-tight text-ink-3">Total<br /><b className="tnum text-[12px] text-ink">{rupees(41900)}</b></span>} />
            <ul className="space-y-1.5">
              {MODES.map((m) => (
                <li key={m.label} className="flex items-center gap-1.5 text-[11px]">
                  <i className="size-2 rounded-full" style={{ background: m.color }} />
                  <span className="w-9 text-ink-2">{m.label}</span>
                  <b className="tnum text-ink">{rupees(Math.round((41900 * m.value) / 100))}</b>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel title="Dues by age">
          <div className="h-[84px]">
            <Bars data={AGEING.map((a) => a.value)} labels={AGEING.map((a) => a.label)} highlight={1} color="#f6b232" muted="#fdeec6" />
          </div>
        </Panel>
      </div>

      <Panel title="Follow up today" action="See all dues" className="mt-2">
        <ul className="divide-y divide-line">
          {DUES.map((d, i) => (
            <li key={d.name} className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0">
              <Avatar name={d.name} index={i + 1} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11.5px] font-semibold text-ink">{d.name}</span>
                <span className="block text-[10px] text-ink-3">Oldest bill {d.age} ago</span>
              </span>
              <span className="tnum text-[11.5px] font-bold text-ink">{rupees(d.amount)}</span>
              <Chip tone={d.tone} className="hidden @[420px]:inline-flex">
                <Icon name="bell" size={10} /> Remind
              </Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </AppFrame>
  )
}
