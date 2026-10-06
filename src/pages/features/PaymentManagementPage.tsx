import { useState } from 'react'
import { BenefitsSection } from '@/components/Benefits'
import { FeatureFrame, featureCrumbs } from '@/components/FeatureFrame'
import { FloatNote } from '@/components/FloatNote'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeature } from '@/data/features'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { Avatar } from '@/mockups/parts'
import { PaymentsPreview } from '@/mockups/PaymentsPreview'

const feature = getFeature('payment-management-software')

const BUCKETS = [
  { label: '0–7 days', people: [['Ravi Kumar', 2190], ['Divya Stores', 3010], ['Karthik S', 3000]] },
  { label: '8–30 days', people: [['Meena Traders', 12450]] },
  { label: '31–60 days', people: [['Lakshmi Textiles', 2500], ['Mohan P', 1800]] },
  { label: 'Over 60 days', people: [['Suresh Stores', 1800]] },
] as const

const SLIP = [
  { mode: 'UPI', amount: 21788 },
  { mode: 'Cash', amount: 12989 },
  { mode: 'Card', amount: 7123 },
]

export default function PaymentManagementPage() {
  const [active, setActive] = useState(1)
  const bucket = BUCKETS[active]
  const bucketTotal = (b: (typeof BUCKETS)[number]) => b.people.reduce((s, p) => s + p[1], 0)
  const all = BUCKETS.reduce((s, b) => s + bucketTotal(b), 0)

  return (
    <FeatureFrame feature={feature}>
      <PageHero
        crumbs={featureCrumbs(feature)}
        eyebrow="Features · Payment management"
        title={feature.h1}
        intro={feature.intro}
        tint="gold"
        layout="split"
        points={['Every payment mode', 'Part payments', 'Dues by age']}
        visual={
          <div className="relative pb-6 lg:pr-4">
            <ProductScreenshot alt="Payment management software showing money received by mode, dues by age and customers to follow up">
              <PaymentsPreview />
            </ProductScreenshot>
            <FloatNote icon="check" tint="brand" title="₹2,190 received" text="Ravi Kumar · UPI" className="absolute -top-4 right-2 hidden [animation-delay:800ms] sm:flex" />
          </div>
        }
      />

      <BenefitsSection id="payment-benefits" title={feature.h2Main} lead="Money coming in and going out should be as easy to see as the sales that caused it." benefits={feature.benefits} tint="gold" variant="bento" tone="paper" />

      <Section tone="soft" labelledBy="payment-slip-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="mx-auto max-w-sm">
              <div className="receipt rounded-t-xl p-6 font-mono">
                <div className="text-center text-[0.7rem] font-bold uppercase tracking-[0.25em] text-ink-3">Closing collection</div>
                <div className="mt-1 text-center text-[0.8rem] text-ink-3">Tue 6 Oct · sample data</div>
                <div className="perforation my-4" aria-hidden="true" />
                <dl className="space-y-2.5 text-[0.95rem]">
                  {SLIP.map((s) => (
                    <div key={s.mode} className="flex justify-between">
                      <dt className="text-ink-2">{s.mode}</dt>
                      <dd className="tnum font-semibold text-ink">{rupees(s.amount, true)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="perforation my-4" aria-hidden="true" />
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-ink">Total received</span>
                  <span className="tnum text-[1.4rem] font-bold text-ink">{rupees(41900, true)}</span>
                </div>
                <div className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-center font-sans text-[0.85rem] font-semibold text-brand-800">Cash in drawer matches the report</div>
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading id="payment-slip-heading" eyebrow="End of day" eyebrowTone="gold" title="Close the day knowing exactly how money came in" align="left" lead="Cash, UPI and card are totalled for you at closing. Match the drawer, check the bank, and go home without a calculator." />
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="payment-dues-heading">
        <SectionHeading id="payment-dues-heading" eyebrow="Try it" eyebrowTone="gold" title="Pick an age group and see who owes you" lead="Dues are grouped by how long they have been pending, so the oldest ones are never forgotten. Sample data." />
        <Reveal className="mt-12">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <div role="radiogroup" aria-label="Age of dues" className="grid grid-cols-2 gap-3">
              {BUCKETS.map((b, i) => {
                const on = i === active
                const total = bucketTotal(b)
                return (
                  <button
                    key={b.label}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setActive(i)}
                    className={cn('rounded-2xl border p-4 text-left transition', on ? 'border-gold-300 bg-gold-50 shadow-card' : 'border-line bg-white hover:bg-paper')}
                  >
                    <div className="text-[0.85rem] font-semibold text-ink-3">{b.label}</div>
                    <div className="tnum mt-1 font-display text-[1.5rem] font-bold text-ink">{rupees(total)}</div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-3">
                      <div className="h-full rounded-full bg-gold-400" style={{ width: `${(total / all) * 100}%` }} />
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="rounded-[22px] border border-line bg-white p-5 shadow-card sm:p-6" aria-live="polite">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[1.15rem] font-semibold text-ink">Pending for {bucket.label}</h3>
                <span className="tnum font-bold text-ink">{rupees(bucketTotal(bucket))}</span>
              </div>
              <ul className="mt-4 divide-y divide-line">
                {bucket.people.map(([name, amount], i) => (
                  <li key={name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <Avatar name={name} index={i} size={38} />
                    <span className="min-w-0 flex-1 font-semibold text-ink">{name}</span>
                    <span className="tnum font-bold text-ink">{rupees(amount)}</span>
                    <span className="hidden items-center gap-1 rounded-full bg-gold-100 px-2.5 py-1 text-[0.78rem] font-semibold text-gold-800 sm:inline-flex">
                      <Icon name="bell" size={12} /> Remind
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="paper" labelledBy="payment-steps-heading">
        <SectionHeading id="payment-steps-heading" eyebrow="How it works" eyebrowTone="gold" title={feature.stepsHeading} />
        <StepList steps={feature.steps} variant="rail" tint="gold" className="mt-14" />
      </Section>
    </FeatureFrame>
  )
}
