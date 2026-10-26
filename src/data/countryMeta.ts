import type { CountryMeta } from './types'

/**
 * Navigation and sitemap data for the five country landing pages (Countries menu, footer, sitemap).
 * Page copy and SEO text live in countries.ts and only load with the page that needs them.
 */
export const COUNTRY_META: CountryMeta[] = [
  { slug: 'pos-system-sri-lanka', path: '/pos-system-sri-lanka/', name: 'Sri Lanka', navBlurb: 'Shops, supermarkets and restaurants' },
  { slug: 'pos-system-singapore', path: '/pos-system-singapore/', name: 'Singapore', navBlurb: 'Retail, cafés and multiple outlets' },
  { slug: 'pos-system-south-africa', path: '/pos-system-south-africa/', name: 'South Africa', navBlurb: 'Retail, grocery and restaurants' },
  { slug: 'pos-system-malaysia', path: '/pos-system-malaysia/', name: 'Malaysia', navBlurb: 'Retail, grocery, cafés and stock' },
  { slug: 'pos-system-nigeria', path: '/pos-system-nigeria/', name: 'Nigeria', navBlurb: 'Retail shops, supermarkets, restaurants' },
]

export const getCountryMeta = (slug: string): CountryMeta | undefined => COUNTRY_META.find((c) => c.slug === slug)
