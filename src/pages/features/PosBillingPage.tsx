import { BenefitsSection } from '@/components/Benefits'
import { FeatureFrame, featureCrumbs } from '@/components/FeatureFrame'
import { FloatNote } from '@/components/FloatNote'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { PosDemo } from '@/components/demos/PosDemo'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeature } from '@/data/features'
import { PosScreen } from '@/mockups/PosScreen'

const feature = getFeature('pos-billing-software')

export default function PosBillingPage() {
  return (
    <FeatureFrame feature={feature}>
      <PageHero
        crumbs={featureCrumbs(feature)}
        eyebrow="Features · POS billing"
        title={feature.h1}
        intro={feature.intro}
        tint="brand"
        layout="split"
        points={feature.outcomes.slice(0, 3)}
        visual={
          <div className="relative pb-8 lg:pr-4">
            <ProductScreenshot alt="POS billing software screen with an item grid, the current bill and UPI selected as the payment mode">
              <PosScreen />
            </ProductScreenshot>
            <FloatNote icon="wallet" title="Split payment" text="₹1,000 cash + ₹468 UPI" className="absolute -bottom-2 left-2 hidden [animation-delay:600ms] sm:flex lg:-left-6" />
            <FloatNote icon="clock" tint="gold" title="2 bills on hold" text="Resume anytime" className="absolute -top-4 right-2 hidden [animation-delay:900ms] sm:flex" />
          </div>
        }
      />

      <BenefitsSection
        id="pos-benefits"
        title={feature.h2Main}
        lead="Counter work is repetitive and fast. Each part of LocalPOS is designed to take a step out of it."
        benefits={feature.benefits}
        tint="brand"
        variant="bento"
        tone="paper"
      />

      <Section tone="white" labelledBy="pos-demo-heading">
        <SectionHeading
          id="pos-demo-heading"
          eyebrow="Try it"
          eyebrowTone="gold"
          title="Ring up a bill on the demo counter"
          lead="Add a few items, choose how the customer pays and charge the bill. Everything here is sample data."
        />
        <Reveal className="mt-12">
          <PosDemo />
        </Reveal>
      </Section>

      <Section tone="soft" labelledBy="pos-steps-heading">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="pos-steps-heading" eyebrow="How it works" eyebrowTone="brand" title={feature.stepsHeading} align="left" lead="No menus to dig through. The same four moves handle almost every sale." />
            <ul className="mt-8 space-y-3">
              {feature.outcomes.map((o) => (
                <li key={o} className="flex items-center gap-3 text-ink">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <StepList steps={feature.steps} variant="receipt" />
          </Reveal>
        </div>
      </Section>
    </FeatureFrame>
  )
}
