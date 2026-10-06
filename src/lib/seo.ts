import { SITE, absoluteUrl } from '@/data/site'

export interface Crumb {
  name: string
  path: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface SeoInput {
  /** Final <title>, written in full (include the brand). */
  title: string
  description: string
  /** Canonical path with leading and trailing slash, e.g. /features/gst-billing-software/ */
  path: string
  type?: 'website' | 'article'
  noindex?: boolean
  image?: string
  /** Extra JSON-LD nodes to add to the page. */
  jsonLd?: Array<Record<string, unknown>>
  breadcrumbs?: Crumb[]
  faqs?: FaqItem[]
  publishedTime?: string
  modifiedTime?: string
}

export interface HeadTag {
  tag: 'meta' | 'link'
  attrs: Record<string, string>
}

export interface HeadData {
  title: string
  tags: HeadTag[]
  jsonLd: Array<Record<string, unknown>>
}

const meta = (attrs: Record<string, string>): HeadTag => ({ tag: 'meta', attrs })

export function breadcrumbSchema(crumbs: Crumb[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

export function faqSchema(faqs: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: `${SITE.url}/`,
    logo: `${SITE.url}${SITE.logo}`,
    description: SITE.description,
    ...(SITE.social.length ? { sameAs: SITE.social.map((s) => s.href) } : {}),
  }
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: `${SITE.url}/`,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE.url}/#organization` },
  }
}

export function softwareSchema(opts: {
  name?: string
  description: string
  path: string
  featureList?: string[]
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name ?? SITE.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    ...(opts.featureList ? { featureList: opts.featureList } : {}),
    publisher: { '@id': `${SITE.url}/#organization` },
  }
}

/** Turn page SEO input into the full set of head tags. Pure, so it runs on server and client. */
export function buildHead(input: SeoInput): HeadData {
  const url = absoluteUrl(input.path)
  const image = absoluteUrl(input.image ?? SITE.ogImage)
  const robots = input.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1'

  const tags: HeadTag[] = [
    meta({ name: 'description', content: input.description }),
    meta({ name: 'robots', content: robots }),
    { tag: 'link', attrs: { rel: 'canonical', href: url } },
    meta({ property: 'og:site_name', content: SITE.name }),
    meta({ property: 'og:locale', content: SITE.locale }),
    meta({ property: 'og:type', content: input.type ?? 'website' }),
    meta({ property: 'og:title', content: input.title }),
    meta({ property: 'og:description', content: input.description }),
    meta({ property: 'og:url', content: url }),
    meta({ property: 'og:image', content: image }),
    meta({ property: 'og:image:width', content: '1200' }),
    meta({ property: 'og:image:height', content: '630' }),
    meta({ property: 'og:image:alt', content: `${SITE.name}: ${SITE.tagline}` }),
    meta({ name: 'twitter:card', content: 'summary_large_image' }),
    meta({ name: 'twitter:title', content: input.title }),
    meta({ name: 'twitter:description', content: input.description }),
    meta({ name: 'twitter:image', content: image }),
  ]

  if (input.type === 'article') {
    if (input.publishedTime) tags.push(meta({ property: 'article:published_time', content: input.publishedTime }))
    if (input.modifiedTime) tags.push(meta({ property: 'article:modified_time', content: input.modifiedTime }))
  }

  const jsonLd: Array<Record<string, unknown>> = []
  if (input.path === '/') jsonLd.push(organizationSchema(), websiteSchema())
  if (input.breadcrumbs && input.breadcrumbs.length > 1) jsonLd.push(breadcrumbSchema(input.breadcrumbs))
  if (input.faqs && input.faqs.length > 0) jsonLd.push(faqSchema(input.faqs))
  if (input.jsonLd) jsonLd.push(...input.jsonLd)

  return { title: input.title, tags, jsonLd }
}
