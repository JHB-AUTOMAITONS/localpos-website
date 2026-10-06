import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const STEPS = [
  {
    title: 'Set up your shop',
    body: 'Add your business name, address and GSTIN. They appear on every bill, so you never type them again.',
    visual: (
      <div className="space-y-2">
        {['Business name', 'GSTIN', 'Address'].map((l, i) => (
          <div key={l} className="rounded-lg border border-line bg-white px-3 py-2">
            <div className="text-[10px] font-medium text-ink-3">{l}</div>
            <div className={i === 0 ? 'text-[12px] font-semibold text-ink' : 'mt-1 h-1.5 w-2/3 rounded-full bg-paper-3'}>{i === 0 ? 'Sunrise General Store' : ''}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Add your items and customers',
    body: 'Enter items with price, tax and opening stock, or add many at once. Customers are created as you bill them.',
    visual: (
      <ul className="space-y-1.5">
        {[
          ['Toor Dal 1 kg', '₹160', '38'],
          ['Sunflower Oil 1 L', '₹148', '12'],
          ['Tea Powder 250 g', '₹120', '91'],
        ].map(([n, p, s]) => (
          <li key={n} className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2 text-[11.5px]">
            <span className="font-semibold text-ink">{n}</span>
            <span className="tnum text-ink-3">
              {p} · {s} in stock
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Start billing',
    body: 'Scan or search, take payment and print. Stock, payments and reports update themselves.',
    visual: (
      <div className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 p-3">
        <div>
          <div className="text-[10px] font-medium text-brand-800">Bill #2042</div>
          <div className="tnum font-display text-[20px] font-bold text-ink">₹1,468</div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-[11.5px] font-bold text-white">
          <Icon name="check" size={14} strokeWidth={3} /> Paid by UPI
        </span>
      </div>
    ),
  },
]

/** Three real steps to get started, each with a tiny preview of that moment. */
export function HowItWorks() {
  return (
    <Section tone="soft" labelledBy="how-heading">
      <SectionHeading id="how-heading" eyebrow="Getting started" eyebrowTone="brand" title="Start billing in three simple steps" lead="No long training and no big setup. Add the basics and you are ready for your first bill." />
      <ol className="relative mt-14 grid gap-6 lg:grid-cols-3">
        <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-[22px] hidden border-t-2 border-dashed border-line-strong lg:block" />
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative">
            <Reveal delay={i * 90} className="h-full">
              <div className="relative flex h-full flex-col rounded-[22px] border border-line bg-white p-6 shadow-card">
                <span className="relative -mt-12 mb-4 grid size-11 place-items-center rounded-full border-4 border-paper-2 bg-brand-600 font-display text-[1.1rem] font-bold text-white shadow-card">
                  {i + 1}
                </span>
                <h3 className="font-display text-[1.25rem] font-semibold leading-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-ink-2">{s.body}</p>
                <div aria-hidden="true" className="mt-auto pt-6">
                  <div className="rounded-2xl bg-paper-2 p-3">{s.visual}</div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
