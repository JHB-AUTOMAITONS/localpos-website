import { Icon } from '@/components/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import type { FaqItem } from '@/lib/seo'

interface FAQSectionProps {
  faqs: FaqItem[]
  title?: string
  lead?: string
  id?: string
  tone?: 'paper' | 'soft' | 'white'
}

/**
 * Accessible FAQ accordion built on native <details>, so every answer is in the HTML
 * for crawlers and works without JavaScript. The page passes the same data to <Seo faqs>.
 */
export function FAQSection({ faqs, title = 'Frequently asked questions', lead, id = 'faq', tone = 'paper' }: FAQSectionProps) {
  const headingId = `${id}-heading`
  return (
    <Section tone={tone} labelledBy={headingId} id={id}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.55fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow tone="sky">Answers</Eyebrow>
          <h2 id={headingId} className="h2-xl mt-4">
            {title}
          </h2>
          {lead && <p className="lead mt-4">{lead}</p>}
          <div className="mt-6 hidden lg:block">
            <p className="text-[0.95rem] text-ink-3">Still have a question?</p>
            <CTAButton to="/contact-us/" variant="secondary" className="mt-3">
              Talk to our team
            </CTAButton>
          </div>
        </div>

        <Reveal>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-line bg-white shadow-card transition-colors open:border-brand-200 open:bg-white">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-2xl px-5 py-4 text-left font-display text-[1.0625rem] font-semibold leading-snug text-ink marker:content-none [&::-webkit-details-marker]:hidden sm:px-6 sm:py-5 sm:text-[1.125rem]">
                  <span>{f.q}</span>
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-200 group-open:rotate-45">
                    <Icon name="plus" size={16} strokeWidth={2.4} />
                  </span>
                </summary>
                <div className="px-5 pb-5 text-[1.0125rem] leading-relaxed text-ink-2 sm:px-6 sm:pb-6">{f.a}</div>
              </details>
            ))}
          </div>
          <div className="mt-6 lg:hidden">
            <CTAButton to="/contact-us/" variant="secondary" className="w-full sm:w-auto">
              Talk to our team
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
