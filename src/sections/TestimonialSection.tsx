import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TESTIMONIALS, type Testimonial } from '@/data/testimonials'

/** Renders only when real testimonials exist in data/testimonials.ts. */
export function TestimonialSection({ items = TESTIMONIALS }: { items?: Testimonial[] }) {
  if (items.length === 0) return null
  return (
    <Section tone="soft" labelledBy="testimonials-heading">
      <SectionHeading id="testimonials-heading" eyebrow="In their words" title="What business owners say about LocalPOS" />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map((t, i) => (
          <li key={t.name}>
            <Reveal delay={i * 80} className="h-full">
              <figure className="flex h-full flex-col rounded-[22px] border border-line bg-white p-6 shadow-card">
                <blockquote className="text-[1.0625rem] leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 text-[0.92rem]">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="text-ink-3">
                    {t.role}, {t.business}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
