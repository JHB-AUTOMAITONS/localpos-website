import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export interface ComparisonRow {
  topic: string
  before: string
  after: string
}

interface ComparisonSectionProps {
  title: string
  lead?: string
  eyebrow?: string
  beforeLabel?: string
  afterLabel?: string
  rows: ComparisonRow[]
  id?: string
}

/** Before/after: how it is done on paper and phone notes versus on one screen. */
export function ComparisonSection({
  title,
  lead,
  eyebrow = 'The difference',
  beforeLabel = 'Notebooks and guesswork',
  afterLabel = 'With LocalPOS',
  rows,
  id = 'comparison-heading',
}: ComparisonSectionProps) {
  return (
    <Section tone="paper" labelledBy={id}>
      <SectionHeading id={id} eyebrow={eyebrow} eyebrowTone="coral" title={title} lead={lead} />
      <Reveal className="mt-12">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[24px] border border-line bg-white shadow-card md:grid-cols-2">
          <div className="border-b border-line bg-paper-2 p-6 sm:p-8 md:border-b-0 md:border-r">
            <div className="flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-ink-3">
              <Icon name="clipboard" size={16} /> {beforeLabel}
            </div>
            <ul className="mt-5 space-y-5">
              {rows.map((r) => (
                <li key={r.topic}>
                  <div className="text-[0.78rem] font-bold uppercase tracking-wide text-ink-3">{r.topic}</div>
                  <p className="mt-1 text-ink-2">{r.before}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative bg-white p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-brand-700">
              <Icon name="sparkles" size={16} /> {afterLabel}
            </div>
            <ul className="mt-5 space-y-5">
              {rows.map((r) => (
                <li key={r.topic} className="flex gap-3">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <div>
                    <div className="text-[0.78rem] font-bold uppercase tracking-wide text-brand-700">{r.topic}</div>
                    <p className="mt-1 font-medium text-ink">{r.after}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
