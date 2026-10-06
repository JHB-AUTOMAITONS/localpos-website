import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { PricingCard, type Period } from '@/components/PricingCard'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { COMPARISON, PLANS } from '@/data/pricing'
import { Seo } from '@/lib/head'
import { cn } from '@/lib/cn'
import type { FaqItem } from '@/lib/seo'
import { CTASection } from '@/sections/CTASection'
import { FAQSection } from '@/sections/FAQSection'

const FAQS: FaqItem[] = [
  { q: 'Can I see LocalPOS before I choose a plan?', a: 'Yes. Book a free demo and we will show you LocalPOS working with your kind of business, so you can see what each part does before deciding.' },
  { q: 'How do I get current pricing?', a: 'Pricing is being finalised. Book a demo or contact us and we will share current plan details with you.' },
  { q: 'Which plan is right for a single shop?', a: 'A single counter usually starts with the plan built around billing, GST and stock. If you plan to add barcode billing, purchase tracking or more branches, ask about the next plan up during your demo.' },
]

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing/' },
]

export default function PricingPage() {
  const hasPrices = PLANS.some((p) => p.price.monthly !== null || p.price.yearly !== null)
  const [period, setPeriod] = useState<Period>('monthly')

  return (
    <>
      <Seo
        title="Pricing | LocalPOS"
        description="Compare LocalPOS plans for a single shop, a growing business or several branches, and book a free demo to see which fits."
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
              Simple plans that grow with your business
            </h1>
            <p className="lead mx-auto mt-5 max-w-2xl">Start with the basics at one counter, and add more as you open more shelves, more staff and more shops. Every plan includes a free demo first.</p>

            {hasPrices && (
              <div role="radiogroup" aria-label="Billing period" className="mx-auto mt-8 flex w-fit rounded-xl bg-white p-1 shadow-card ring-1 ring-line">
                {(['monthly', 'yearly'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={period === p}
                    onClick={() => setPeriod(p)}
                    className={cn('rounded-lg px-5 py-2 text-[0.95rem] font-semibold capitalize transition', period === p ? 'bg-brand-600 text-white' : 'text-ink-2 hover:text-ink')}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!hasPrices && (
            <p className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-dashed border-gold-300 bg-gold-50 px-5 py-4 text-left text-[0.95rem] text-gold-800">
              <Icon name="alert" size={20} className="mt-0.5 shrink-0" />
              <span>
                <strong className="font-semibold">Pricing is being finalised.</strong> The plans below show how packages are structured. Prices and plan contents are placeholders until they are confirmed.
              </span>
            </p>
          )}
        </Container>
      </section>

      <Section tone="paper" labelledBy="plans-heading" compact className="!pt-10">
        <h2 id="plans-heading" className="sr-only">
          Plans
        </h2>
        <ul className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-3 lg:gap-6">
          {PLANS.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 80} className="h-full">
                <PricingCard plan={p} period={period} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft" labelledBy="compare-heading">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="compare-heading" className="h2-xl">
            Compare plans side by side
          </h2>
          <p className="lead mt-4">What each plan includes at a glance. Contents are placeholders until final packaging is confirmed.</p>
        </div>
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <div role="region" aria-label="Plan comparison table, scrollable" tabIndex={0} className="relative overflow-x-auto rounded-[22px] border border-line bg-white shadow-card">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">Features included in each LocalPOS plan</caption>
              <thead>
                <tr className="border-b border-line bg-paper-2">
                  <th scope="col" className="px-5 py-4 text-[0.8rem] font-bold uppercase tracking-wide text-ink-3">Feature</th>
                  {PLANS.map((p) => (
                    <th key={p.id} scope="col" className={cn('px-4 py-4 text-center font-display text-[1.05rem] font-bold', p.recommended ? 'text-brand-700' : 'text-ink')}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-line last:border-b-0">
                    <th scope="row" className="px-5 py-3.5 text-[0.97rem] font-medium text-ink">{row.feature}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className={cn('px-4 py-3.5 text-center', PLANS[i].recommended && 'bg-brand-50/60')}>
                        {typeof v === 'string' ? (
                          <span className="text-[0.92rem] font-semibold text-ink-2">{v}</span>
                        ) : v ? (
                          <>
                            <Icon name="check" size={18} strokeWidth={3} className="mx-auto text-brand-600" />
                            <span className="sr-only">Included</span>
                          </>
                        ) : (
                          <>
                            <span aria-hidden="true" className="mx-auto block h-0.5 w-3 rounded bg-line-strong" />
                            <span className="sr-only">Not included</span>
                          </>
                        )}
                      </td>
                    ))}
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
