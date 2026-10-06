import { lazy, type ComponentType } from 'react'
import { matchRoutes, useRoutes, type RouteObject } from 'react-router'
import { SiteLayout } from '@/components/layout/SiteLayout'

type PageModule = { default: ComponentType }
type Loader = () => Promise<PageModule>

interface PageDef {
  /** React Router path without leading/trailing slash ('' for home). */
  path: string
  load: Loader
}

/**
 * URL structure from the approved SEO document. Every page is code-split, so a visitor only
 * downloads the mockups and demos for the page they open.
 */
const pages: PageDef[] = [
  { path: '', load: () => import('@/pages/HomePage') },

  // Features
  { path: 'features/pos-billing-software', load: () => import('@/pages/features/PosBillingPage') },
  { path: 'features/gst-billing-software', load: () => import('@/pages/features/GstBillingPage') },
  { path: 'features/inventory-management-software', load: () => import('@/pages/features/InventoryPage') },
  { path: 'features/barcode-billing-software', load: () => import('@/pages/features/BarcodeBillingPage') },
  { path: 'features/purchase-management-software', load: () => import('@/pages/features/PurchaseManagementPage') },
  { path: 'features/sales-management-software', load: () => import('@/pages/features/SalesManagementPage') },
  { path: 'features/customer-management-software-for-small-business', load: () => import('@/pages/features/CustomerManagementPage') },
  { path: 'features/payment-management-software', load: () => import('@/pages/features/PaymentManagementPage') },
  { path: 'features/sales-reporting-software', load: () => import('@/pages/features/SalesReportingPage') },
  { path: 'features/multi-store-management-software', load: () => import('@/pages/features/MultiStorePage') },

  // Solutions
  { path: 'solutions/retail-billing-software', load: () => import('@/pages/solutions/RetailPage') },
  { path: 'solutions/restaurant-billing-software', load: () => import('@/pages/solutions/RestaurantPage') },
  { path: 'solutions/jewellery-billing-software', load: () => import('@/pages/solutions/JewelleryPage') },
  { path: 'solutions/supermarket-billing-software', load: () => import('@/pages/solutions/SupermarketPage') },
  { path: 'solutions/medical-store-billing-software', load: () => import('@/pages/solutions/MedicalStorePage') },

  // Other pages
  { path: 'pricing', load: () => import('@/pages/PricingPage') },
  { path: 'book-a-demo', load: () => import('@/pages/BookDemoPage') },
  { path: 'blog', load: () => import('@/pages/BlogPage') },
  { path: 'blog/:slug', load: () => import('@/pages/BlogPostPage') },
  { path: 'about-us', load: () => import('@/pages/AboutPage') },
  { path: 'contact-us', load: () => import('@/pages/ContactPage') },
  { path: 'privacy-policy', load: () => import('@/pages/LegalPage') },
  { path: 'terms-and-conditions', load: () => import('@/pages/LegalPage') },
  { path: 'refund-policy', load: () => import('@/pages/LegalPage') },

  { path: '*', load: () => import('@/pages/NotFoundPage') },
]

function toRoute(def: PageDef): RouteObject {
  const Page = lazy(def.load)
  const element = <Page />
  const handle = { load: def.load }
  if (def.path === '') return { index: true, element, handle }
  return { path: def.path, element, handle }
}

export const routeObjects: RouteObject[] = [{ element: <SiteLayout />, children: pages.map(toRoute) }]

/** Resolve a URL's page chunk ahead of hydration so the first client render matches the server HTML. */
export async function preloadRoute(pathname: string): Promise<void> {
  const matches = matchRoutes(routeObjects, pathname)
  const load = matches?.at(-1)?.route.handle?.load as Loader | undefined
  if (load) await load()
}

export function AppRoutes() {
  return useRoutes(routeObjects)
}

/**
 * Warm the next page's code as soon as someone hovers, focuses or touches an internal link,
 * so the click usually lands on an already-loaded chunk. Returns a cleanup function.
 */
export function enableLinkPrefetch(): () => void {
  const seen = new Set<string>()
  const warm = (e: Event) => {
    const link = (e.target as Element | null)?.closest?.('a[href^="/"]') as HTMLAnchorElement | null
    if (!link || link.target === '_blank') return
    const { pathname } = new URL(link.href, window.location.href)
    if (seen.has(pathname)) return
    seen.add(pathname)
    void preloadRoute(pathname)
  }
  const events = ['pointerover', 'focusin', 'touchstart'] as const
  events.forEach((ev) => document.addEventListener(ev, warm, { passive: true }))
  return () => events.forEach((ev) => document.removeEventListener(ev, warm))
}
