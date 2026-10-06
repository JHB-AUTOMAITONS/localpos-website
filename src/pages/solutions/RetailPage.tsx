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
import { DayCloseSummaryPreview } from '@/mockups/RetailDayPreview'
import { PosScreen } from '@/mockups/PosScreen'

const solution = getSolution('retail-billing-software')

const DAY = [
  { time: '9:00 am', title: 'Open the counter', body: 'Your items, prices and stock are already in place. Log in and start billing.' },
  { time: '12:30 pm', title: 'Handle the lunch rush', body: 'Scan or search, take payment and move on. Hold a bill when a customer goes back for one more item.' },
  { time: '4:00 pm', title: 'Check what is running low', body: 'The low-stock list shows what to reorder before it sells out.' },
  { time: '9:00 pm', title: 'Close the day', body: 'Sales by payment mode are already worked out. Match the cash drawer and you are done.' },
]

export default function RetailPage() {
  return (
    <SolutionFrame solution={solution}>
      <PageHero
        crumbs={solutionCrumbs(solution)}
        eyebrow="Solutions · Retail"
        title={solution.h1}
        intro={solution.intro}
        tint="brand"
        layout="split"
        points={['Fast checkout', 'Stock follows sales', 'Daily sales in one view']}
        visual={
          <div className="relative pb-6 lg:pr-4">
            <ProductScreenshot alt="Retail billing software counter screen with an item grid, the live bill and payment buttons">
              <PosScreen />
            </ProductScreenshot>
            <FloatNote icon="boxes" tint="gold" title="Stock updated" text="Toor Dal 1 kg · 38 → 36" className="absolute -bottom-3 left-2 hidden [animation-delay:700ms] sm:flex lg:-left-5" />
          </div>
        }
      />

      <PainPointsSection id="retail-pain" title="Where a busy shop loses time and money" lead="Most retail problems are small, repeated many times a day." points={solution.painPoints} variant="notes" tone="soft" />

      <BenefitsSection id="retail-highlights" title={solution.h2Main} lead="Billing, stock, customers and reports, built around a counter that never stops." benefits={solution.highlights} tint="brand" variant="bento" tone="paper" eyebrow="Built for retail" />

      <Section tone="white" labelledBy="retail-day-heading">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading id="retail-day-heading" eyebrow={solution.workflowHeading} eyebrowTone="brand" title="POS software for retail that closes the day for you" align="left" lead="From the first customer to the last, LocalPOS keeps the numbers so you do not have to." />
            <ol className="mt-10 space-y-6 border-l-2 border-dashed border-line-strong pl-8">
              {DAY.map((d) => (
                <li key={d.time} className="relative">
                  <span className="absolute -left-[2.55rem] top-1 size-4 rounded-full border-4 border-white bg-brand-500 ring-1 ring-brand-200" />
                  <div className="font-mono text-[0.8rem] font-bold uppercase tracking-wider text-brand-700">{d.time}</div>
                  <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{d.title}</h3>
                  <p className="mt-1 text-ink-2">{d.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <Reveal className="lg:sticky lg:top-28">
            <ProductScreenshot alt="Retail POS software day-close summary showing sales by payment mode and a cash drawer that matches">
              <DayCloseSummaryPreview />
            </ProductScreenshot>
          </Reveal>
        </div>
      </Section>

      <Section tone="soft" labelledBy="retail-steps-heading" compact>
        <SectionHeading id="retail-steps-heading" eyebrow="Every sale" eyebrowTone="brand" title="Four moves cover almost every bill" />
        <StepList
          steps={[
            { title: 'Scan or search', body: 'Add the item by barcode or name.' },
            { title: 'Apply a discount', body: 'Where you offer one, within the limits you set.' },
            { title: 'Take payment', body: 'Cash, UPI, card or a mix.' },
            { title: 'Print or share', body: 'Stock and sales update on their own.' },
          ]}
          variant="rail"
          tint="brand"
          className="mt-12"
        />
      </Section>
    </SolutionFrame>
  )
}
