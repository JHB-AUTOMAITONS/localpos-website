import { useState } from 'react'
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
import { rupees } from '@/lib/format'
import { KitchenTicketPreview, RestaurantTablesPreview } from '@/mockups/RestaurantPreview'

const solution = getSolution('restaurant-billing-software')

const BILL_TOTAL = 1050

/** Split a table's bill between guests. Equal shares, rounded up to the nearest rupee. */
function SplitBill() {
  const [guests, setGuests] = useState(3)
  const share = Math.ceil(BILL_TOTAL / guests)
  return (
    <div className="rounded-[24px] border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[0.75rem] font-bold uppercase tracking-wide text-ink-3">Table 4 · sample bill</div>
          <div className="tnum font-display text-[2rem] font-bold leading-tight text-ink">{rupees(BILL_TOTAL)}</div>
          <div className="text-[0.88rem] text-ink-3">including GST</div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-paper-2 p-1.5" role="group" aria-label="Number of guests">
          <button type="button" aria-label="One guest fewer" disabled={guests <= 1} onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid size-10 place-items-center rounded-lg bg-white text-ink shadow-card disabled:opacity-40">
            <Icon name="minus" size={18} strokeWidth={2.6} />
          </button>
          <span className="tnum min-w-[4.5rem] text-center font-semibold text-ink">{guests} {guests === 1 ? 'guest' : 'guests'}</span>
          <button type="button" aria-label="One guest more" disabled={guests >= 8} onClick={() => setGuests((g) => Math.min(8, g + 1))} className="grid size-10 place-items-center rounded-lg bg-white text-ink shadow-card disabled:opacity-40">
            <Icon name="plus" size={18} strokeWidth={2.6} />
          </button>
        </div>
      </div>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2" aria-live="polite">
        {Array.from({ length: guests }, (_, i) => (
          <li key={i} className="flex items-center justify-between rounded-xl border border-coral-100 bg-coral-50 px-4 py-3">
            <span className="font-medium text-ink">Guest {i + 1}</span>
            <span className="tnum font-bold text-ink">{rupees(share)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.88rem] text-ink-3">You can also split by item, so each guest pays only for what they ordered.</p>
    </div>
  )
}

export default function RestaurantPage() {
  return (
    <SolutionFrame solution={solution}>
      <PageHero
        crumbs={solutionCrumbs(solution)}
        eyebrow="Solutions · Restaurant"
        title={solution.h1}
        intro={solution.intro}
        tint="coral"
        layout="split-reverse"
        points={['Table-wise orders', 'Kitchen order tickets', 'GST on every bill']}
        visual={
          <div className="relative pb-8 lg:pl-4">
            <ProductScreenshot alt="Restaurant billing software table map with a selected table’s order, send to kitchen and print bill buttons">
              <RestaurantTablesPreview />
            </ProductScreenshot>
            <FloatNote icon="utensils" tint="gold" title="Table 7 is ready to pay" className="absolute -top-4 left-2 hidden [animation-delay:800ms] sm:flex lg:-left-6" />
            <FloatNote icon="printer" tint="coral" title="KOT #318 sent to kitchen" text="Table 4 · 4 dishes" className="absolute -bottom-3 right-3 hidden [animation-delay:1100ms] sm:flex lg:-right-4" />
          </div>
        }
      />

      <PainPointsSection id="restaurant-pain" title="Where service slips between table, kitchen and bill" points={solution.painPoints} variant="grid" tone="soft" />

      <BenefitsSection id="restaurant-highlights" title={solution.h2Main} lead="Everyone on the floor sees the same orders at the same time." benefits={solution.highlights} tint="coral" variant="cards" tone="paper" eyebrow="Built for restaurants" />

      <Section tone="white" labelledBy="restaurant-flow-heading">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading id="restaurant-flow-heading" eyebrow="Kitchen workflow" eyebrowTone="coral" title={solution.workflowHeading} align="left" lead="An order taken at the table is on the kitchen’s printer in the same moment. No running, no shouting, no lost slips." />
            <StepList steps={solution.workflow} variant="stack" tint="coral" className="mt-10" />
          </div>
          <Reveal className="mx-auto w-full max-w-[300px]">
            <ProductScreenshot alt="Kitchen order ticket printed from the restaurant billing software">
              <KitchenTicketPreview />
            </ProductScreenshot>
          </Reveal>
        </div>
      </Section>

      <Section tone="soft" labelledBy="restaurant-split-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="restaurant-split-heading" eyebrow="At the end of the meal" eyebrowTone="coral" title="Split the bill without splitting the mood" align="left" lead="Guests who dine together rarely pay together. Divide a bill equally, by item, or merge two tables into one, in a few taps." />
          </div>
          <Reveal>
            <SplitBill />
          </Reveal>
        </div>
      </Section>
    </SolutionFrame>
  )
}
