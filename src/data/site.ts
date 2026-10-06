/**
 * Central site configuration. Anything marked PLACEHOLDER should be replaced
 * with real company information before launch.
 */
const env = import.meta.env

export const SITE = {
  name: 'LocalPOS',
  legalName: 'LocalPOS', // PLACEHOLDER: replace with the registered company name
  tagline: 'Billing, stock and GST in one simple platform',
  description:
    'LocalPOS is billing software for Indian shops, restaurants, jewellers, supermarkets and medical stores. Bill faster, track stock and keep GST records in order.',
  /** Production origin, no trailing slash. Set VITE_SITE_URL at build time. */
  url: ((env.VITE_SITE_URL as string | undefined) ?? 'https://www.localpos.in').replace(/\/$/, ''),
  /** Where the Login button goes (the web app). Set VITE_LOGIN_URL at build time. */
  loginUrl: (env.VITE_LOGIN_URL as string | undefined) ?? 'https://app.localpos.in/',
  /** Optional lead endpoint. Empty means the forms run in preview mode. */
  leadEndpoint: (env.VITE_LEAD_ENDPOINT as string | undefined) ?? '',
  locale: 'en_IN',
  ogImage: '/og-default.png',
  logo: '/logo-512.png',
  /** PLACEHOLDER contact details: shown as "to be added" until real values are set. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },
  /** Only add real profile links here; icons are rendered only for entries that exist. */
  social: [] as Array<{ label: string; href: string }>,
} as const

export const absoluteUrl = (path: string): string => `${SITE.url}${path === '/' ? '/' : path}`
