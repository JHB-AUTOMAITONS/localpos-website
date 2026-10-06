import { FeatureCard } from '@/components/FeatureCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeature } from '@/data/features'

/** Links to related feature pages, for visitors and for internal linking. */
export function RelatedFeatures({ slugs, title = 'Works well with' }: { slugs: string[]; title?: string }) {
  const features = slugs.map(getFeature)
  return (
    <Section tone="soft" labelledBy="related-heading" compact>
      <SectionHeading id="related-heading" title={title} align="left" as="h2" className="!max-w-none [&_h2]:text-[clamp(1.6rem,1.2rem+1.3vw,2.25rem)]" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <li key={f.slug}>
            <Reveal delay={i * 60} className="h-full">
              <FeatureCard feature={f} compact />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
