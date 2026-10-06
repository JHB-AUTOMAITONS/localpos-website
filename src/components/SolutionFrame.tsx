import type { ReactNode } from 'react'
import { FAQSection } from '@/sections/FAQSection'
import { CTASection } from '@/sections/CTASection'
import { RelatedFeatures } from '@/sections/RelatedFeatures'
import { Seo } from '@/lib/head'
import { softwareSchema } from '@/lib/seo'
import { SITE } from '@/data/site'
import type { Solution } from '@/data/types'

export const solutionCrumbs = (s: Solution) => [
  { name: 'Home', path: '/' },
  { name: s.navLabel, path: s.path },
]

/** Metadata, structured data, FAQ, related features and closing CTA shared by every industry page. */
export function SolutionFrame({ solution, children, ctaTitle }: { solution: Solution; children: ReactNode; ctaTitle?: string }) {
  return (
    <>
      <Seo
        title={solution.seoTitle}
        description={solution.seoDescription}
        path={solution.path}
        breadcrumbs={solutionCrumbs(solution)}
        faqs={solution.faqs}
        jsonLd={[
          softwareSchema({
            name: `${SITE.name} for ${solution.navLabel}`,
            description: solution.seoDescription,
            path: solution.path,
            featureList: solution.highlights.map((h) => h.title),
          }),
        ]}
      />
      {children}
      <FAQSection faqs={solution.faqs} title={`Questions about ${solution.primary}`} />
      <RelatedFeatures slugs={solution.relatedFeatures} title={`Features that power ${solution.navLabel.toLowerCase()} billing`} />
      <CTASection title={ctaTitle ?? `See LocalPOS set up for your ${solution.navLabel.toLowerCase()} business`} />
    </>
  )
}
