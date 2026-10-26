import type { ReactElement } from 'react'
import { useLocation } from 'react-router'
import { BenefitsSection } from '@/components/Benefits'
import { Icon } from '@/components/Icon'
import { Inline } from '@/components/Inline'
import { PageHero } from '@/components/PageHero'
import { PainPointsSection } from '@/components/PainPoints'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { CTAButton } from '@/components/ui/CTAButton'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { COUNTRY_CONTENT, getCountry } from '@/data/countries'
import { COUNTRY_META } from '@/data/countryMeta'
import { SITE } from '@/data/site'
import type { CountryContent, CountryVisual } from '@/data/types'
import { cn } from '@/lib/cn'
import { Seo } from '@/lib/head'
import { softwareSchema } from '@/lib/seo'
import { TINTS } from '@/lib/tint'
import { InventoryPreview } from '@/mockups/InventoryPreview'
import { DashboardPreview } from '@/mockups/DashboardPreview'
import { MultiStorePreview } from '@/mockups/MultiStorePreview'
import { PosScreen } from '@/mockups/PosScreen'
import { SalesRegisterPreview } from '@/mockups/SalesPreview'
import { CTASection } from '@/sections/CTASection'
import { FAQSection } from '@/sections/FAQSection'
import { RelatedFeatures } from '@/sections/RelatedFeatures'
import NotFoundPage from './NotFoundPage'

const VISUALS: Record<CountryVisual, () => ReactElement> = {
  pos: () => <PosScreen />,
  multistore: () => <MultiStorePreview />,
  sales: () => <SalesRegisterPreview />,
  inventory: () => <InventoryPreview />,
  dashboard: () => <DashboardPreview />,
}

/** One template for every country landing page. The copy, headings and section choices come from data/countries.ts, so each page is written separately. */
export default function CountryPage() {
  const { pathname } = useLocation()
  const meta = COUNTRY_META.find((c) => c.path === (pathname.endsWith('/') ? pathname : `${pathname}/`))
  const c = meta ? getCountry(meta.slug) : undefined
  if (!meta || !c) return <NotFoundPage />
  return <CountryBody c={c} path={meta.path} name={meta.name} />
}

function CountryBody({ c, path, name }: { c: CountryContent; path: string; name: string }) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: `POS system ${name}`, path },
  ]
  const Visual = VISUALS[c.visual]
  const t = TINTS[c.tint]
  const others = COUNTRY_CONTENT.filter((o) => o.slug !== c.slug)

  return (
    <>
      <Seo
        title={c.seoTitle}
        description={c.seoDescription}
        path={path}
        breadcrumbs={crumbs}
        faqs={c.faqs}
        jsonLd={[
          softwareSchema({
            name: `${SITE.name} POS software`,
            description: c.seoDescription,
            path,
            featureList: c.features.map((f) => f.title),
          }),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={`Countries · ${name}`}
        title={c.h1}
        intro={c.intro}
        tint={c.tint}
        layout="split"
        points={c.points}
        visual={
          <div className="relative pb-2 lg:pr-4">
            <ProductScreenshot alt={c.visualAlt}>
              <Visual />
            </ProductScreenshot>
            <p className="mt-3 text-[0.82rem] text-ink-3">Sample LocalPOS screen with demo data (Indian rupee and GST sample values).</p>
          </div>
        }
      />

      <PainPointsSection id="country-challenges" title={c.challengesTitle} lead={c.challengesLead} points={c.challenges} variant="notes" tone="soft" />

      <BenefitsSection id="country-features" title={c.featuresTitle} lead={c.featuresLead} benefits={c.features} tint={c.tint} variant={c.featuresVariant} tone="paper" eyebrow="What you get" />

      <Section tone="white" labelledBy="country-usecases">
        <SectionHeading id="country-usecases" eyebrow="Use cases" eyebrowTone={c.tint} title={c.useCasesTitle} lead={c.useCasesLead} />
        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
          {c.useCases.map((u, i) => (
            <li key={u.title}>
              <Reveal delay={(i % 2) * 80} className="h-full">
                <div className="h-full rounded-[20px] border border-line bg-white p-6 shadow-card">
                  <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{u.title}</h3>
                  <p className="mt-2 text-ink-2">
                    <Inline text={u.body} />
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft" labelledBy="country-spotlight">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading id="country-spotlight" eyebrow={c.spotlight.eyebrow} eyebrowTone={c.tint} title={c.spotlight.title} lead={c.spotlight.lead} align="left" />
          <ul className="divide-y divide-line rounded-[20px] border border-line bg-white shadow-card">
            {c.spotlight.items.map((it) => (
              <li key={it.title} className="flex gap-4 p-5 sm:p-6">
                <Icon name="circle-check" size={22} className={cn('mt-0.5 shrink-0', t.text)} />
                <div>
                  <h3 className="font-display text-[1.1rem] font-semibold leading-tight text-ink">{it.title}</h3>
                  <p className="mt-1 text-ink-2">{it.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-[0.95rem] text-ink-3">
          See the <Inline text="[LocalPOS pricing page](/pricing/)" /> for the plans on offer.
          {c.readNext && (
            <>
              {' '}
              {c.readNext.lead} <Inline text={`[${c.readNext.label}](${c.readNext.to})`} />.
            </>
          )}
        </p>
      </Section>

      <Section tone="paper" labelledBy="country-steps" compact>
        <SectionHeading id="country-steps" eyebrow="How it works" eyebrowTone={c.tint} title={c.stepsTitle} />
        <StepList steps={c.steps} variant="rail" tint={c.tint} className="mt-12" />
      </Section>

      <Section tone="white" labelledBy="country-local-fit" compact>
        <div className="mx-auto max-w-3xl rounded-[24px] border border-gold-200 bg-gold-50 p-6 sm:p-8">
          <h2 id="country-local-fit" className="h2-xl !text-[clamp(1.5rem,1.2rem+1.1vw,2rem)]">
            {c.localFit.title}
          </h2>
          <p className="mt-3 text-ink-2">{c.localFit.lead}</p>
          <ul className="mt-4 space-y-2 text-ink-2">
            {c.localFit.items.map((it) => (
              <li key={it} className="flex gap-3">
                <Icon name="circle-check" size={18} className="mt-1 shrink-0 text-gold-700" />
                {it}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <CTAButton to="/contact-us/" variant="secondary">
              Ask the team
            </CTAButton>
          </div>
        </div>
      </Section>

      <FAQSection faqs={c.faqs} title={c.faqTitle} tone="soft" />
      <RelatedFeatures slugs={c.relatedFeatures} title="LocalPOS features behind this page" />

      <Section tone="paper" labelledBy="country-other" compact>
        <h2 id="country-other" className="h2-xl !text-[clamp(1.4rem,1.1rem+1vw,1.9rem)]">
          LocalPOS in other countries
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((o) => {
            const m = COUNTRY_META.find((x) => x.slug === o.slug)
            if (!m) return null
            return (
              <li key={o.slug}>
                <CTAButton to={m.path} variant="secondary" size="sm">
                  {m.name}
                </CTAButton>
              </li>
            )
          })}
        </ul>
      </Section>

      <CTASection title={c.ctaTitle} text={c.ctaText} />
    </>
  )
}
