import type { ReactNode } from 'react'
import { FAQSection } from '@/sections/FAQSection'
import { CTASection } from '@/sections/CTASection'
import { RelatedFeatures } from '@/sections/RelatedFeatures'
import { Seo } from '@/lib/head'
import { softwareSchema } from '@/lib/seo'
import { SITE } from '@/data/site'
import type { Feature } from '@/data/types'

/** Everything a feature page shares: metadata, structured data, FAQ, related links and the closing CTA. */
export function FeatureFrame({ feature, children, ctaTitle }: { feature: Feature; children: ReactNode; ctaTitle?: string }) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: feature.navLabel, path: feature.path },
  ]
  return (
    <>
      <Seo
        title={feature.seoTitle}
        description={feature.seoDescription}
        path={feature.path}
        breadcrumbs={crumbs}
        faqs={feature.faqs}
        jsonLd={[
          softwareSchema({
            name: `${SITE.name} ${feature.navLabel}`,
            description: feature.seoDescription,
            path: feature.path,
            featureList: feature.benefits.map((b) => b.title),
          }),
        ]}
      />
      {children}
      <FAQSection faqs={feature.faqs} title={`Questions about ${feature.primary}`} tone="paper" />
      <RelatedFeatures slugs={feature.related} />
      <CTASection title={ctaTitle} />
    </>
  )
}

export const featureCrumbs = (feature: Feature) => [
  { name: 'Home', path: '/' },
  { name: feature.navLabel, path: feature.path },
]
