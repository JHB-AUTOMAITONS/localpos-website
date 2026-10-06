import { BenefitsSection } from '@/components/Benefits'
import { FeatureFrame, featureCrumbs } from '@/components/FeatureFrame'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeature } from '@/data/features'
import { rupees } from '@/lib/format'
import { Meter } from '@/mockups/charts'
import { Avatar, Chip } from '@/mockups/parts'
import { SalesFlowPreview, SalesRegisterPreview } from '@/mockups/SalesPreview'

const feature = getFeature('sales-management-software')

const TIERS = [
  { name: 'Retail', note: 'Walk-in customers', price: 160, tone: 'brand' as const },
  { name: 'Wholesale', note: '10 pieces or more', price: 148, tone: 'gold' as const },
  { name: 'Trade partner', note: 'Agreed rate', price: 142, tone: 'violet' as const },
]

const TEAM = [
  { name: 'Anita K', bills: 46, sales: 21800 },
  { name: 'Karthik S', bills: 38, sales: 17450 },
  { name: 'Divya R', bills: 29, sales: 9000 },
]

export default function SalesManagementPage() {
  const maxSales = Math.max(...TEAM.map((t) => t.sales))
  return (
    <FeatureFrame feature={feature}>
      <PageHero
        crumbs={featureCrumbs(feature)}
        eyebrow="Features · Sales management"
        title={feature.h1}
        intro={feature.intro}
        tint="brand"
        layout="center"
        points={['Quotes to invoices', 'Returns and credit notes', 'Clear daily register']}
        visual={
          <div className="rounded-[28px] border border-line bg-white/80 p-4 shadow-lift backdrop-blur sm:p-8">
            <div className="mb-5 text-center text-[0.8rem] font-bold uppercase tracking-[0.12em] text-ink-3">One sale, from quote to return</div>
            <ProductScreenshot alt="Sales management software document flow from quotation to sales order, invoice, payment and return">
              <SalesFlowPreview />
            </ProductScreenshot>
          </div>
        }
      />

      <BenefitsSection id="sales-benefits" title={feature.h2Main} lead="Every step of a sale is linked to the one before it, so nothing is typed twice and nothing gets lost." benefits={feature.benefits} tint="brand" variant="cards" tone="soft" />

      <Section tone="white" labelledBy="sales-register-heading">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading id="sales-register-heading" eyebrow="Daily register" eyebrowTone="brand" title="Sales management software for small business, with every bill in one list" align="left" lead="Open the register and see the day: each invoice, who it was for, how it was paid and what is still due." />
            <ul className="mt-6 space-y-3">
              {['Filter by date, customer, staff or payment mode', 'Spot unpaid and part-paid invoices at once', 'Open any bill to reprint, share or return it'].map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <ProductScreenshot alt="Retail sales management software register listing the day’s invoices with status and best sellers">
              <SalesRegisterPreview />
            </ProductScreenshot>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" labelledBy="sales-pricing-heading">
        <SectionHeading id="sales-pricing-heading" eyebrow="Pricing control" eyebrowTone="brand" title="One item, the right price for every kind of customer" lead="Keep separate price lists for retail and trade customers, and decide who on your team is allowed to change a price. Sample data." />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="h-full rounded-[22px] border border-line bg-white p-6 text-center shadow-card">
                <Chip tone={t.tone}>{t.name}</Chip>
                <div className="mt-4 text-[0.85rem] text-ink-3">Toor Dal 1 kg</div>
                <div className="tnum font-display text-[2.2rem] font-bold leading-tight text-ink">{rupees(t.price)}</div>
                <div className="mt-1 text-[0.9rem] text-ink-2">{t.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft" labelledBy="sales-team-heading">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="sales-team-heading" eyebrow="Know your team" eyebrowTone="brand" title="See who is selling what" align="left" lead="Every bill carries the name of the person who made it. At the end of the day, see each team member’s bills and sales side by side." />
          </div>
          <Reveal>
            <ul className="space-y-3 rounded-[22px] border border-line bg-white p-5 shadow-card sm:p-6">
              {TEAM.map((m, i) => (
                <li key={m.name} className="flex items-center gap-4">
                  <Avatar name={m.name} index={i} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-ink">{m.name}</span>
                      <span className="tnum font-bold text-ink">{rupees(m.sales)}</span>
                    </div>
                    <Meter value={m.sales} max={maxSales} className="mt-2" />
                    <div className="tnum mt-1 text-[0.8rem] text-ink-3">{m.bills} bills today · sample data</div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" labelledBy="sales-steps-heading">
        <SectionHeading id="sales-steps-heading" eyebrow="How it works" eyebrowTone="brand" title={feature.stepsHeading} />
        <StepList steps={feature.steps} variant="rail" tint="brand" className="mt-14" />
      </Section>
    </FeatureFrame>
  )
}
