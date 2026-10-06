import { FeatureCard } from '@/components/FeatureCard'
import { CTAButton } from '@/components/ui/CTAButton'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FEATURES } from '@/data/features'

/** All ten feature pages as tinted cards, with a demo prompt filling the last cells of the grid. */
export function FeatureGrid() {
  return (
    <Section tone="soft" labelledBy="feature-grid-heading">
      <SectionHeading
        id="feature-grid-heading"
        eyebrow="Everything in one place"
        title="Everything your shop needs, ready to use"
        lead="Ten connected parts of the same system. Start with billing, and add the rest as your business grows."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <li key={f.slug}>
            <Reveal delay={(i % 4) * 70} className="h-full">
              <FeatureCard feature={f} />
            </Reveal>
          </li>
        ))}
        <li className="sm:col-span-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col justify-between gap-6 rounded-[20px] border border-dashed border-line-strong bg-white p-6 sm:p-7">
              <div>
                <h3 className="h3-lg">Not sure where to begin?</h3>
                <p className="mt-2 text-ink-2">
                  Tell us what you sell and how you bill today. We will show you the parts of LocalPOS that will help the most, with your own kind of products.
                </p>
              </div>
              <div>
                <CTAButton to="/book-a-demo/" arrow>
                  Book a Free Demo
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </li>
      </ul>
    </Section>
  )
}
