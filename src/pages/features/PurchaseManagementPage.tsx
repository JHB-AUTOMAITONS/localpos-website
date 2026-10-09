import { BenefitsSection } from '@/components/Benefits'
import { FeatureFrame, featureCrumbs } from '@/components/FeatureFrame'
import { FloatNote } from '@/components/FloatNote'
import { PageHero } from '@/components/PageHero'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeature } from '@/data/features'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { AreaChart } from '@/mockups/charts'
import { Chip } from '@/mockups/parts'
import { PurchaseOrderPreview } from '@/mockups/PurchasePreview'

const feature = getFeature('purchase-management-software')

const PIPELINE = [
  { stage: 'Ordered', tone: 'sky' as const, cards: [{ po: 'PO-121', supplier: 'Green Valley Foods', amount: 18400 }, { po: 'PO-120', supplier: 'Daily Dairy Supplies', amount: 7250 }] },
  { stage: 'Received', tone: 'gold' as const, cards: [{ po: 'PO-118', supplier: 'Fresh Mart Wholesale', amount: 34600 }] },
  { stage: 'Billed', tone: 'violet' as const, cards: [{ po: 'PO-116', supplier: 'Sunrise Packaging', amount: 5200 }, { po: 'PO-115', supplier: 'Fresh Mart Wholesale', amount: 21800 }] },
  { stage: 'Paid', tone: 'brand' as const, cards: [{ po: 'PO-112', supplier: 'Green Valley Foods', amount: 16900 }] },
]

const SUPPLIERS = [
  { name: 'Fresh Mart Wholesale', owed: 86400, due: 'Due in 4 days', tone: 'gold' as const },
  { name: 'Green Valley Foods', owed: 18400, due: 'Due in 12 days', tone: 'sky' as const },
  { name: 'Sunrise Packaging', owed: 5200, due: 'Overdue by 3 days', tone: 'coral' as const },
]

const PRICE_HISTORY = [142, 144, 143, 148, 152, 158, 160]

export default function PurchaseManagementPage() {
  return (
    <FeatureFrame feature={feature}>
      <PageHero
        crumbs={featureCrumbs(feature)}
        eyebrow="Features · Purchase management"
        title={feature.h1}
        intro={feature.intro}
        tint="coral"
        layout="split"
        points={['Orders to suppliers', 'Stock updates on receipt', 'Supplier balances']}
        visual={
          <div className="relative pb-6 lg:pr-4">
            <ProductScreenshot alt="Purchase management software showing a purchase order, its progress from ordered to paid and the supplier balance">
              <PurchaseOrderPreview />
            </ProductScreenshot>
            <FloatNote icon="package" tint="gold" title="Goods received" text="Stock +36 · Toor Dal 1 kg" className="absolute -bottom-3 left-2 hidden [animation-delay:700ms] sm:flex lg:-left-5" />
          </div>
        }
      />

      <BenefitsSection id="purchase-benefits" title={feature.h2Main} lead="Buying is where stock and money meet. Keeping both in one system means they always agree." benefits={feature.benefits} tint="coral" variant="rows" tone="paper" />

      <Section tone="soft" labelledBy="purchase-pipeline-heading">
        <SectionHeading id="purchase-pipeline-heading" eyebrow="Where every order stands" eyebrowTone="coral" title="See every purchase order at a glance" lead="From the first order to the final payment, each purchase sits in a clear stage, so nothing waits unnoticed. Sample data." />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.map((col, i) => (
            <Reveal key={col.stage} delay={i * 70}>
              <section aria-label={`${col.stage}, ${col.cards.length} orders`} className="h-full rounded-[22px] border border-line bg-white/70 p-3">
                <div className="flex items-center justify-between px-2 pb-3 pt-1">
                  <Chip tone={col.tone}>{col.stage}</Chip>
                  <span className="tnum text-[0.85rem] font-semibold text-ink-3">{col.cards.length}</span>
                </div>
                <ul className="space-y-2.5">
                  {col.cards.map((c) => (
                    <li key={c.po} className="rounded-xl border border-line bg-white p-3.5 shadow-card">
                      <div className="flex items-center justify-between text-[0.8rem] text-ink-3">
                        <span className="tnum font-semibold">{c.po}</span>
                        <span className="tnum font-bold text-ink">{rupees(c.amount)}</span>
                      </div>
                      <div className="mt-1 font-semibold text-ink">{c.supplier}</div>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white" labelledBy="purchase-flow-heading">
        <SectionHeading id="purchase-flow-heading" eyebrow="The buying flow" eyebrowTone="coral" title={feature.stepsHeading} />
        <StepList steps={feature.steps} variant="cards" tint="coral" className="mx-auto mt-12 max-w-4xl" />
      </Section>

      <Section tone="paper" labelledBy="purchase-suppliers-heading">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="purchase-suppliers-heading" eyebrow="Suppliers" eyebrowTone="coral" title="Know what you owe, and when it is due" align="left" lead="Each supplier has a running balance. Pay on time, avoid surprises and keep good relationships." />
            <ul className="mt-8 space-y-3">
              {SUPPLIERS.map((s) => (
                <li key={s.name}>
                  <Reveal>
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 shadow-card">
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-ink">{s.name}</div>
                        <div className="mt-1">
                          <Chip tone={s.tone}>{s.due}</Chip>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[0.75rem] font-medium text-ink-3">You owe</div>
                        <div className="tnum font-display text-[1.2rem] font-bold text-ink">{rupees(s.owed)}</div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="rounded-[22px] border border-line bg-white p-5 shadow-card sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                <div>
                  <div className="text-[0.75rem] font-bold uppercase tracking-wide text-ink-3">Price history · sample data</div>
                  <div className="font-display text-[1.15rem] font-semibold text-ink">Toor Dal 1 kg, cost price</div>
                </div>
                <Chip tone="coral">▲ 13% in 6 months</Chip>
              </div>
              <AreaChart data={PRICE_HISTORY} color="#ee6a4f" className={cn('mt-6 h-[170px]')} />
              <div className="mt-3 flex justify-between text-[0.78rem] text-ink-3">
                {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <p className="mt-4 text-[0.92rem] text-ink-2">Spot a supplier whose prices keep creeping up, and ask for a better rate with the numbers in hand.</p>
            </div>
          </Reveal>
        </div>
      </Section>
    </FeatureFrame>
  )
}
