import { FEATURES } from './features'
import { SOLUTIONS } from './solutions'
import { BLOG_META } from './blogMeta'
import { LEGAL_PAGES } from './legal'

export interface SiteRoute {
  path: string
  priority: number
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  /** ISO date; falls back to the build date in the sitemap. */
  lastmod?: string
}

export interface KeywordEntry {
  path: string
  primary: string
  secondary: string[]
}

/**
 * Primary and secondary keywords per page, from "LocalPOS - Final SEO URL & Keyword Mapping".
 * scripts/verify-seo.mjs checks every page against this list. Pricing, Book a Demo, Blog, About, Contact
 * and the legal pages intentionally have no keyword mapping.
 */
export const KEYWORD_MAP: KeywordEntry[] = [
  {
    path: '/',
    primary: 'billing software',
    secondary: ['GST billing software', 'POS software', 'retail billing software', 'POS billing software'],
  },
  ...FEATURES.map((f): KeywordEntry => ({ path: f.path, primary: f.primary, secondary: f.secondary })),
  ...SOLUTIONS.map((s): KeywordEntry => ({ path: s.path, primary: s.primary, secondary: s.secondary })),
  ...BLOG_META.map((p): KeywordEntry => ({ path: `/blog/${p.slug}/`, primary: p.keyword, secondary: p.secondary })),
]

/**
 * The complete list of indexable pages, matching the approved URL structure.
 * Used for prerendering and for sitemap.xml. There is intentionally no /billing-software/,
 * /faq/ or /sitemap/ page.
 */
export const SITE_ROUTES: SiteRoute[] = [
  { path: '/', priority: 1, changefreq: 'weekly' },
  ...FEATURES.map((f): SiteRoute => ({ path: f.path, priority: 0.9, changefreq: 'monthly' })),
  ...SOLUTIONS.map((s): SiteRoute => ({ path: s.path, priority: 0.9, changefreq: 'monthly' })),
  { path: '/pricing/', priority: 0.8, changefreq: 'monthly' },
  { path: '/book-a-demo/', priority: 0.8, changefreq: 'yearly' },
  { path: '/blog/', priority: 0.7, changefreq: 'weekly', lastmod: BLOG_META[0]?.date },
  ...BLOG_META.map((p): SiteRoute => ({ path: `/blog/${p.slug}/`, priority: 0.6, changefreq: 'monthly', lastmod: p.date })),
  { path: '/about-us/', priority: 0.5, changefreq: 'yearly' },
  { path: '/contact-us/', priority: 0.5, changefreq: 'yearly' },
  ...LEGAL_PAGES.map((l): SiteRoute => ({ path: l.path, priority: 0.2, changefreq: 'yearly', lastmod: l.updated })),
]
