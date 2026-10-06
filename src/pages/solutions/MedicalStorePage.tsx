import { useState } from 'react'
import { BenefitsSection } from '@/components/Benefits'
import { FloatNote } from '@/components/FloatNote'
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
import { Chip } from '@/mockups/parts'
import { PharmacyBatchesPreview } from '@/mockups/PharmacyPreview'

const solution = getSolution('medical-store-billing-software')

const BATCHES = [
  { no: 'B2407A', expiry: 'Nov 2026', left: 36, tone: 'gold' as const, note: 'Expires first' },
  { no: 'B2501C', expiry: 'Mar 2027', left: 120, tone: 'brand' as const, note: 'In date' },
  { no: 'B2509F', expiry: 'Aug 2027', left: 240, tone: 'brand' as const, note: 'In date' },
]

const TABLETS_PER_STRIP = 10
const START_STRIPS = 24

/** Choose the batch to bill from. The oldest batch is suggested first. Sample data. */
function BatchPicker() {
  const [picked, setPicked] = useState(0)
  return (
    <div className="rounded-[22px] border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="text-[0.75rem] font-bold uppercase tracking-wide text-ink-3">Billing · sample data</div>
      <div className="font-display text-[1.15rem] font-semibold text-ink">Paracetamol 500 mg, strip of 10</div>
      <div role="radiogroup" aria-label="Choose the batch to sell from" className="mt-4 space-y-2.5">
        {BATCHES.map((b, i) => (
          <button
            key={b.no}
            type="button"
            role="radio"
            aria-checked={picked === i}
            onClick={() => setPicked(i)}
            className={cn('flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition', picked === i ? 'border-violet-400 bg-violet-50 ring-2 ring-violet-100' : 'border-line bg-white hover:bg-paper')}
          >
            <span className={cn('grid size-5 shrink-0 place-items-center rounded-full border-2', picked === i ? 'border-violet-500' : 'border-line-strong')}>
              {picked === i && <span className="size-2.5 rounded-full bg-violet-500" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-ink">Batch {b.no}</span>
              <span className="tnum block text-[0.85rem] text-ink-3">Expiry {b.expiry} · {b.left} strips</span>
            </span>
            <Chip tone={b.tone}>{b.note}</Chip>
          </button>
        ))}
      </div>
      <p className="mt-4 text-[0.9rem] text-ink-2" aria-live="polite">
        {picked === 0 ? 'Selling the oldest batch first keeps stock fresh and cuts waste.' : 'You can choose another batch when a customer asks for a specific one.'}
      </p>
    </div>
  )
}

/** Selling loose tablets from a strip: stock stays right in both units. */
function UnitCard() {
  const sold = 3
  const strips = START_STRIPS - 1
  const tablets = TABLETS_PER_STRIP - sold
  return (
    <div className="rounded-[22px] border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="text-[0.75rem] font-bold uppercase tracking-wide text-ink-3">Strips and tablets · sample data</div>
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        <div className="rounded-xl bg-paper-2 p-4">
          <div className="text-[0.8rem] text-ink-3">Before</div>
          <div className="tnum font-display text-[1.5rem] font-bold text-ink">{START_STRIPS}</div>
          <div className="text-[0.85rem] text-ink-2">strips</div>
        </div>
        <div className="text-[0.85rem] font-semibold text-violet-700">
          Sell {sold}
          <br />
          tablets
        </div>
        <div className="rounded-xl bg-violet-50 p-4">
          <div className="text-[0.8rem] text-ink-3">After</div>
          <div className="tnum font-display text-[1.5rem] font-bold text-ink">{strips}</div>
          <div className="text-[0.85rem] text-ink-2">strips + {tablets} tablets</div>
        </div>
      </div>
      <p className="mt-4 text-[0.9rem] text-ink-2">One strip is opened, three tablets are billed, and the seven that remain stay on record.</p>
    </div>
  )
}

export default function MedicalStorePage() {
  return (
    <SolutionFrame solution={solution}>
      <PageHero
        crumbs={solutionCrumbs(solution)}
        eyebrow="Solutions · Medical store"
        title={solution.h1}
        intro={solution.intro}
        tint="violet"
        layout="split-reverse"
        points={['Batch and expiry on every bill', 'Expiry alerts', 'Strip and tablet units']}
        visual={
          <div className="relative pb-6 lg:pl-4">
            <ProductScreenshot alt="Medical store billing software batch and expiry screen with colour-coded expiry status for each medicine">
              <PharmacyBatchesPreview />
            </ProductScreenshot>
            <FloatNote icon="alert" tint="coral" title="3 batches have expired" text="Remove them from the shelf" className="absolute -top-4 left-2 hidden [animation-delay:800ms] sm:flex lg:-left-6" />
          </div>
        }
      />

      <PainPointsSection id="medical-pain" title="The quiet losses in a pharmacy" lead="Most of them come from stock that nobody was watching." points={solution.painPoints} variant="notes" tone="soft" />

      <BenefitsSection id="medical-highlights" title={solution.h2Main} lead="Everything is tracked by batch, so expiry stops being a surprise." benefits={solution.highlights} tint="violet" variant="bento" tone="paper" eyebrow="Built for pharmacies" />

      <Section tone="white" labelledBy="medical-batch-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="medical-batch-heading" eyebrow="Billing by batch" eyebrowTone="violet" title="Pharmacy billing software that sells the oldest batch first" align="left" lead="When the same medicine sits in several batches, LocalPOS suggests the one that expires soonest. Staff can still pick another batch when a customer needs it." />
          </div>
          <Reveal>
            <BatchPicker />
          </Reveal>
        </div>
      </Section>

      <Section tone="soft" labelledBy="medical-units-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <UnitCard />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading id="medical-units-heading" eyebrow="Strips and tablets" eyebrowTone="violet" title="Billing software for a medical store that counts in strips and tablets" align="left" lead="Customers buy a full strip one minute and three tablets the next. Keep stock exact in both, with no mental arithmetic at the counter." />
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="medical-steps-heading">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="medical-steps-heading" eyebrow="At the counter" eyebrowTone="violet" title={solution.workflowHeading} align="left" lead="A short routine that keeps bills accurate and shelves fresh. Always follow the regulations that apply to your pharmacy." />
          </div>
          <StepList steps={solution.workflow} variant="stack" tint="violet" />
        </div>
      </Section>
    </SolutionFrame>
  )
}
