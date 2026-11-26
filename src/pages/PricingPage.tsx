import { useState } from 'react'
import { PricingCard, type Period } from '@/components/PricingCard'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { MONTHS_FREE, MONTHLY_PRICE, PLAN, YEARLY_AT_MONTHLY_RATE, YEARLY_PRICE, YEARLY_SAVINGS } from '@/data/pricing'
import { rupees } from '@/lib/format'
import { Seo } from '@/lib/head'
import { cn } from '@/lib/cn'
import type { FaqItem } from '@/lib/seo'
import { CTASection } from '@/sections/CTASection'
import { FAQSection } from '@/sections/FAQSection'

const FAQS: FaqItem[] = [
  { q: 'Can I see LocalPOS before I choose a plan?', a: 'Yes. Book a free demo and we will show you LocalPOS working with your kind of business, so you can see what each part does before deciding.' },
  { q: 'How much does LocalPOS cost?', a: `LocalPOS is ${rupees(MONTHLY_PRICE)} per month billed monthly, or ${rupees(YEARLY_PRICE)} per year billed yearly. Both include every feature.` },
  { q: 'How much do I save with yearly billing?', a: `Twelve monthly payments come to ${rupees(YEARLY_AT_MONTHLY_RATE)}. The yearly plan is ${rupees(YEARLY_PRICE)}, so you save ${rupees(YEARLY_SAVINGS)} a year, which is approximately ${MONTHS_FREE} months free.` },
  { q: 'Is the yearly plan different from the monthly plan?', a: 'No. Both plans include the same features. The only difference is how often you are billed and the saving on yearly billing.' },
]

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing/' },
]

const BILLING_ROWS = [
  { label: 'Price', monthly: `${rupees(MONTHLY_PRICE)} / month`, yearly: `${rupees(YEARLY_PRICE)} / year` },
  { label: 'Cost over 12 months', monthly: rupees(YEARLY_AT_MONTHLY_RATE), yearly: rupees(YEARLY_PRICE) },
  { label: 'You save', monthly: '—', yearly: `${rupees(YEARLY_SAVINGS)} a year` },
  { label: 'Free months', monthly: '—', yearly: `Approximately ${MONTHS_FREE}` },
  { label: 'All features included', monthly: 'Yes', yearly: 'Yes' },
]

export default function PricingPage() {
  const [period, setPeriod] = useState<Period>('yearly')

  return (
    <>
      <Seo
        title="Pricing | LocalPOS"
        description={`LocalPOS costs ${rupees(MONTHLY_PRICE)} per month or ${rupees(YEARLY_PRICE)} per year. Save ${rupees(YEARLY_SAVINGS)} with yearly billing, and book a free demo to see it working.`}
        path="/pricing/"
        breadcrumbs={crumbs}
        faqs={FAQS}
      />

      <section aria-labelledby="page-heading" className="relative overflow-hidden pb-6 pt-6 sm:pb-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-12rem] size-[620px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-200/70 via-gold-100/40 to-transparent blur-3xl" />
          <div className="bg-grid absolute inset-0 opacity-60" />
        </div>
        <Container className="relative">
          <Breadcrumbs items={crumbs} className="mb-8 sm:mb-10" />
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 id="page-heading" className="display-2 mt-5">
              Simple pricing for your whole business
            </h1>
            <p className="lead mx-auto mt-5 max-w-2xl">One plan with every feature. Pay monthly, or go yearly and get approximately 2 months free. Book a free demo first.</p>

            <div role="radiogroup" aria-label="Billing period" className="mx-auto mt-8 flex w-fit rounded-xl bg-white p-1 shadow-card ring-1 ring-line">
              {(['monthly', 'yearly'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={period === p}
                  onClick={() => setPeriod(p)}
                  className={cn('flex items-center gap-2 rounded-lg px-4 py-2 text-[0.95rem] font-semibold capitalize transition sm:px-5', period === p ? 'bg-brand-600 text-white' : 'text-ink-2 hover:text-ink')}
                >
                  {p}
                  {p === 'yearly' && (
                    <span className={cn('rounded-full px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide', period === p ? 'bg-white/20 text-white' : 'bg-gold-50 text-gold-800')}>Save {rupees(YEARLY_SAVINGS)}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </Container>
      </section>

      <Section tone="paper" labelledBy="plans-heading" compact className="!pt-10">
        <h2 id="plans-heading" className="sr-only">
          Plans
        </h2>
        <div className="mx-auto max-w-3xl">
          <Reveal className="h-full">
            <PricingCard plan={PLAN} period={period} />
          </Reveal>
        </div>
      </Section>

      <Section tone="soft" labelledBy="compare-heading">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="compare-heading" className="h2-xl">
            Compare monthly and yearly billing
          </h2>
          <p className="lead mt-4">Every feature is included either way. Yearly billing costs less.</p>
        </div>
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div role="region" aria-label="Billing comparison table, scrollable" tabIndex={0} className="overflow-x-auto rounded-[22px] border border-line bg-white shadow-card">
            <table className="w-full min-w-[440px] text-left">
              <caption className="sr-only">LocalPOS monthly and yearly billing compared</caption>
              <thead>
                <tr className="border-b border-line bg-paper-2">
                  <th scope="col" className="px-5 py-4 text-[0.8rem] font-bold uppercase tracking-wide text-ink-3">Billing</th>
                  <th scope="col" className="px-4 py-4 text-center font-display text-[1.05rem] font-bold text-ink">Monthly</th>
                  <th scope="col" className="bg-brand-50/60 px-4 py-4 text-center font-display text-[1.05rem] font-bold text-brand-700">Yearly</th>
                </tr>
              </thead>
              <tbody>
                {BILLING_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-b-0">
                    <th scope="row" className="px-5 py-3.5 text-[0.97rem] font-medium text-ink">{row.label}</th>
                    <td className="px-4 py-3.5 text-center text-[0.97rem] font-semibold text-ink-2">{row.monthly}</td>
                    <td className="bg-brand-50/60 px-4 py-3.5 text-center text-[0.97rem] font-semibold text-brand-700">{row.yearly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <FAQSection faqs={FAQS} title="Pricing questions" lead="Not sure which plan fits? Ask us during a demo." id="pricing-faq" />
      <CTASection title="Find the right plan for your business" text="Book a free demo. Tell us how many counters, stores and people you have, and we will point you to the plan that fits." />
    </>
  )
}
