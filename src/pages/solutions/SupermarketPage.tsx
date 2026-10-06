import { BenefitsSection } from '@/components/Benefits'
import { FloatNote } from '@/components/FloatNote'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { PainPointsSection } from '@/components/PainPoints'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { SolutionFrame, solutionCrumbs } from '@/components/SolutionFrame'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getSolution } from '@/data/solutions'
import { cn } from '@/lib/cn'
import { BarcodeScanPreview } from '@/mockups/BarcodePreview'
import { Meter } from '@/mockups/charts'
import { SupermarketCountersPreview } from '@/mockups/SupermarketPreview'

const solution = getSolution('supermarket-billing-software')

const RANGE_TIPS = [
  { title: 'Find any item fast', text: 'Search by name or scan the barcode. Categories keep a long range easy to browse.' },
  { title: 'Bring your range in bulk', text: 'Add many items at once instead of typing each one when you first move to LocalPOS.' },
  { title: 'Keep prices and tax consistent', text: 'Set the price and GST on the item once, and every counter uses the same figures.' },
]

const LANES = [
  { name: 'Counter 1', queue: 3 },
  { name: 'Counter 2', queue: 2 },
  { name: 'Counter 3', queue: 6 },
  { name: 'Counter 4', queue: 0 },
  { name: 'Counter 5', queue: 1 },
]

export default function SupermarketPage() {
  return (
    <SolutionFrame solution={solution}>
      <PageHero
        crumbs={solutionCrumbs(solution)}
        eyebrow="Solutions · Supermarket"
        title={solution.h1}
        intro={solution.intro}
        tint="sky"
        layout="split"
        points={['Scan-first checkout', 'Many counters, one stock', 'Alerts for fast movers']}
        visual={
          <div className="relative pb-6 lg:pr-4">
            <ProductScreenshot alt="Supermarket billing software showing six billing counters with queue lengths and fast-moving items running low">
              <SupermarketCountersPreview />
            </ProductScreenshot>
            <FloatNote icon="bell" tint="coral" title="Milk 500 ml running low" text="14 left · reorder at 60" className="absolute -bottom-3 right-3 hidden [animation-delay:800ms] sm:flex lg:-right-4" />
          </div>
        }
      />

      <PainPointsSection id="supermarket-pain" title="What slows a supermarket down" points={solution.painPoints} variant="grid" tone="soft" />

      <BenefitsSection id="supermarket-highlights" title={solution.h2Main} lead="Speed at the lane and clarity behind it." benefits={solution.highlights} tint="sky" variant="rows" tone="paper" eyebrow="Built for supermarkets" />

      <Section tone="white" labelledBy="supermarket-scan-heading">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading id="supermarket-scan-heading" eyebrow="At the lane" eyebrowTone="sky" title="Supermarket POS software that keeps up with the scanner" align="left" lead="Scan, scan, scan. Each item lands on the bill with its price and tax, and stock drops across every counter at once." />
            <StepList steps={solution.workflow} variant="stack" tint="sky" className="mt-10" />
          </div>
          <Reveal>
            <ProductScreenshot alt="POS software for supermarket scanning items at the counter, with the bill building up on the right">
              <BarcodeScanPreview />
            </ProductScreenshot>
          </Reveal>
        </div>
      </Section>

      <Section tone="soft" labelledBy="supermarket-lanes-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
              <div className="text-[0.75rem] font-bold uppercase tracking-wide text-ink-3">People waiting right now · sample data</div>
              <ul className="mt-5 space-y-4">
                {LANES.map((l) => (
                  <li key={l.name} className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3">
                    <span className="text-[0.92rem] font-semibold text-ink">{l.name}</span>
                    <Meter value={l.queue} max={8} color={l.queue >= 6 ? '#ee6a4f' : '#3b8def'} className={l.queue === 0 ? 'opacity-40' : undefined} />
                    <span className={cn('tnum text-[0.9rem] font-bold', l.queue >= 6 ? 'text-coral-700' : 'text-ink-2')}>{l.queue}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-coral-50 px-4 py-3 text-[0.9rem] font-medium text-coral-700">
                <Icon name="alert" size={17} className="mt-0.5 shrink-0" /> Counter 3 is the busiest. Open another lane to clear the queue.
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading id="supermarket-lanes-heading" eyebrow="Multi-counter" eyebrowTone="sky" title="See every counter, not just your own" align="left" lead="When several counters bill at the same time, you need the whole floor in view. See which lane is busy, which is idle, and how each cashier is doing, then close every counter separately at the end of the day." />
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="supermarket-range-heading">
        <SectionHeading id="supermarket-range-heading" eyebrow="Big ranges" eyebrowTone="sky" title="Thousands of items without thousands of headaches" />
        <ul className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
          {RANGE_TIPS.map((t, i) => (
            <li key={t.title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="h-full rounded-[22px] border border-sky-100 bg-sky-50 p-6">
                  <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{t.title}</h3>
                  <p className="mt-2 text-ink-2">{t.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </SolutionFrame>
  )
}
