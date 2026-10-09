import { Link } from 'react-router'
import { Icon, type IconName } from '@/components/Icon'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FEATURE_META } from '@/data/featureMeta'
import { SOLUTION_META } from '@/data/solutionMeta'
import { Seo } from '@/lib/head'
import { organizationSchema } from '@/lib/seo'
import { cn } from '@/lib/cn'
import { TINTS } from '@/lib/tint'
import { CTASection } from '@/sections/CTASection'
import { StatsSection } from '@/sections/StatsSection'

const PRINCIPLES: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'sparkles', title: 'Simple before powerful', text: 'A feature that needs a manual is a feature that goes unused. We design each screen so a new team member can use it on day one.' },
  { icon: 'badge-check', title: 'Built for India, not adapted to it', text: 'Rupees, GSTIN, HSN codes, UPI and the way Indian shops actually bill are part of the product from the start.' },
  { icon: 'layers', title: 'Everything connected', text: 'A bill updates stock, stock informs purchases, payments settle dues and all of it feeds reports. No double entry.' },
  { icon: 'handshake', title: 'Plain about what it does', text: 'We describe the product in ordinary words and show it working before asking you to commit.' },
]

const VALUES = [
  { title: 'Respect the owner’s time', text: 'Every extra tap is a cost. We keep the common jobs short.' },
  { title: 'Make the numbers trustworthy', text: 'Totals, tax and stock should be right every time, or the software has failed.' },
  { title: 'Explain, do not impress', text: 'Clear words and honest limits beat clever marketing.' },
  { title: 'Grow with the business', text: 'What works for one counter should still work for ten.' },
]

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us/' },
]

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us | LocalPOS"
        description="LocalPOS exists to make billing and business software simple enough for any shop, restaurant or store. Learn what we believe and who we build for."
        path="/about-us/"
        breadcrumbs={crumbs}
        jsonLd={[organizationSchema()]}
      />

      <section aria-labelledby="page-heading" className="relative overflow-hidden pb-16 pt-6 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-40 size-[540px] rounded-full bg-gradient-to-br from-gold-200/80 via-gold-100/40 to-transparent blur-3xl" />
          <div className="bg-grid absolute inset-0 opacity-60" />
        </div>
        <Container className="relative">
          <Breadcrumbs items={crumbs} className="mb-8 sm:mb-10" />
          <div className="max-w-3xl">
            <Eyebrow>About LocalPOS</Eyebrow>
            <h1 id="page-heading" className="display-2 mt-5">
              Business software that feels as simple as a notebook
            </h1>
            <p className="lead mt-6 max-w-2xl">
              LocalPOS exists to give every shop, restaurant and store the tools bigger businesses take for granted, without the complexity that usually comes with them.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="soft" labelledBy="mission-heading">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow tone="brand">Our mission</Eyebrow>
          <h2 id="mission-heading" className="h2-xl mt-4">
            To make billing and business software simple enough for any owner to use on their first day.
          </h2>
        </div>
      </Section>

      <Section tone="paper" labelledBy="why-heading">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeading id="why-heading" eyebrow="Why we exist" eyebrowTone="coral" title="Because most small businesses still run on paper and memory" align="left" />
          <div className="prose-lp">
            <p>Walk into almost any shop and you will find the same things: handwritten bills, a stock register updated at night, a notebook of who owes what, and a calculator for tax. It works until the day it does not.</p>
            <p>Business software could fix this, but too much of it is built for accountants and IT teams, not for the person standing at the counter. It asks for training, setup and patience that a busy owner does not have.</p>
            <p>LocalPOS brings billing, stock, GST, payments and reports into one place and keeps each of them simple. The aim is that you spend your time on customers, not on paperwork.</p>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="philosophy-heading">
        <SectionHeading id="philosophy-heading" eyebrow="Product philosophy" eyebrowTone="brand" title="How we think about building LocalPOS" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={(i % 2) * 80} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-[22px] border border-line bg-paper p-5 sm:flex-row sm:p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                    <Icon name={p.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{p.title}</h3>
                    <p className="mt-2 text-ink-2">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <StatsSection
        title="LocalPOS at a glance"
        stats={[
          { value: String(FEATURE_META.length), label: 'connected parts of the platform' },
          { value: String(SOLUTION_META.length), label: 'business types we build for' },
          { value: '1', label: 'place to run it all' },
        ]}
      />

      <Section tone="soft" labelledBy="focus-heading">
        <SectionHeading id="focus-heading" eyebrow="Who we build for" eyebrowTone="gold" title="One platform, shaped for different kinds of business" lead="Every business bills differently. We work closely with each of these so the software fits the counter, not the other way around." />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {SOLUTION_META.map((s) => {
            const t = TINTS[s.tint]
            return (
              <li key={s.slug}>
                <Link to={s.path} className={cn('group flex h-full flex-col items-center rounded-[20px] border p-5 text-center transition hover:-translate-y-1 hover:shadow-lift', t.soft, t.border)}>
                  <span className={cn('grid size-12 place-items-center rounded-2xl', t.tile)}>
                    <Icon name={s.icon} size={24} />
                  </span>
                  <span className="mt-3 font-display text-[1.15rem] font-semibold text-ink">{s.navLabel}</span>
                  <span className="mt-1 text-[0.9rem] text-ink-2">{s.navBlurb}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section tone="paper" labelledBy="values-heading">
        <SectionHeading id="values-heading" eyebrow="Our values" eyebrowTone="violet" title="What we hold ourselves to" />
        <ul className="mx-auto mt-12 grid max-w-5xl gap-x-12 gap-y-8 md:grid-cols-2">
          {VALUES.map((v) => (
            <li key={v.title} className="border-t-2 border-dashed border-line-strong pt-5">
              <h3 className="font-display text-[1.2rem] font-semibold text-ink">{v.title}</h3>
              <p className="mt-1.5 text-ink-2">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection title="Come and see how simple it can be" text="Book a free demo, ask your questions and see LocalPOS handle the way you bill today." />
    </>
  )
}
