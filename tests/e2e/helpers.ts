import { expect, type Page } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const dist = path.join(process.cwd(), process.env.DIST_DIR ?? 'dist')

/** Every indexable route, read from the built sitemap.xml. */
export const ROUTES: string[] = [...fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1])

/** The URL structure from the approved SEO document, written out independently of the code. */
export const FEATURE_ROUTES = [
  '/features/pos-billing-software/',
  '/features/gst-billing-software/',
  '/features/inventory-management-software/',
  '/features/barcode-billing-software/',
  '/features/purchase-management-software/',
  '/features/sales-management-software/',
  '/features/customer-management-software-for-small-business/',
  '/features/payment-management-software/',
  '/features/sales-reporting-software/',
  '/features/multi-store-management-software/',
]
export const SOLUTION_ROUTES = [
  '/solutions/retail-billing-software/',
  '/solutions/restaurant-billing-software/',
  '/solutions/jewellery-billing-software/',
  '/solutions/supermarket-billing-software/',
  '/solutions/medical-store-billing-software/',
]
export const OTHER_ROUTES = ['/pricing/', '/book-a-demo/', '/blog/', '/about-us/', '/contact-us/', '/privacy-policy/', '/terms-and-conditions/', '/refund-policy/']
export const REQUIRED_ROUTES = ['/', ...FEATURE_ROUTES, ...SOLUTION_ROUTES, ...OTHER_ROUTES]
export const FORBIDDEN_ROUTES = ['/billing-software/', '/faq/', '/sitemap/']

/** Navigation labels (as shown in the header) per feature / solution path. */
export const FEATURE_NAV: Array<[label: RegExp, path: string]> = [
  [/^POS Billing/, FEATURE_ROUTES[0]],
  [/^GST Billing/, FEATURE_ROUTES[1]],
  [/^Inventory Management/, FEATURE_ROUTES[2]],
  [/^Barcode Billing/, FEATURE_ROUTES[3]],
  [/^Purchase Management/, FEATURE_ROUTES[4]],
  [/^Sales Management/, FEATURE_ROUTES[5]],
  [/^Customer Management/, FEATURE_ROUTES[6]],
  [/^Payment Management/, FEATURE_ROUTES[7]],
  [/^Reports & Analytics/, FEATURE_ROUTES[8]],
  [/^Multi-Store Management/, FEATURE_ROUTES[9]],
]
export const SOLUTION_NAV: Array<[label: RegExp, path: string]> = [
  [/^Retail/, SOLUTION_ROUTES[0]],
  [/^Restaurant/, SOLUTION_ROUTES[1]],
  [/^Jewellery/, SOLUTION_ROUTES[2]],
  [/^Supermarket/, SOLUTION_ROUTES[3]],
  [/^Medical Store/, SOLUTION_ROUTES[4]],
]

/** The full width matrix from the audit brief. */
export const WIDTHS = [320, 360, 375, 390, 414, 430, 768, 820, 834, 1024, 1280, 1366, 1440, 1536, 1920]

/** Google Analytics and Microsoft Clarity hosts. playwright.config.ts blocks them in the browser, so they can never answer a test. */
export const isTrackingUrl = (url: string) => {
  try {
    return /(^|\.)(googletagmanager\.com|google-analytics\.com|analytics\.google\.com|clarity\.ms)$/.test(new URL(url).hostname)
  } catch {
    return false
  }
}

/**
 * Collect console errors/warnings, uncaught exceptions, failed requests and HTTP errors for a page.
 *
 * Tracking hosts are blocked in the test browser, so their requests fail by design and are not reported. The reverse is: if a tracking host
 * ever ANSWERS, the block has stopped working and the test would be sending data to the real accounts, so that is reported as an issue.
 * (llowTracking is for the one spec that deliberately runs the real scripts with all data requests intercepted locally.)
 */
export function collectIssues(page: Page, { allowTracking = false }: { allowTracking?: boolean } = {}): string[] {
  const issues: string[] = []
  page.on('console', (m) => {
    if (!allowTracking && isTrackingUrl(m.location().url)) return
    if (m.type() === 'error' || m.type() === 'warning') issues.push(`console.${m.type()}: ${m.text().slice(0, 240)}`)
  })
  page.on('pageerror', (e) => issues.push(`pageerror: ${e.message.slice(0, 240)}`))
  page.on('requestfailed', (r) => {
    if (!allowTracking && isTrackingUrl(r.url())) return
    issues.push(`requestfailed: ${r.url()} (${r.failure()?.errorText})`)
  })
  page.on('response', (r) => {
    if (isTrackingUrl(r.url())) {
      if (!allowTracking) issues.push(`TRACKING HOST ANSWERED (the test block is not working, real analytics traffic is possible): ${r.url().slice(0, 100)}`)
      return
    }
    if (r.status() >= 400) issues.push(`http ${r.status()}: ${r.url()}`)
  })
  return issues
}

/** Load a page and wait until the network is idle, the app has hydrated and fonts are ready. */
export async function open(page: Page, url: string) {
  const res = await page.goto(url, { waitUntil: 'networkidle' })
  // The page is prerendered, so it looks ready before React has attached its handlers. Clicking in that gap is lost.
  await page.waitForSelector('html[data-app-ready]', { state: 'attached' })
  await page.evaluate(() => document.fonts.ready)
  return res
}

/** Scroll the whole page so scroll-reveal content is shown, then return to the top. */
export async function scrollThrough(page: Page, step = 500) {
  await page.evaluate(
    async (s) => {
      const h = () => document.documentElement.scrollHeight
      for (let y = 0; y < h(); y += s) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 40))
      }
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 200))
    },
    step,
  )
}

export interface OverflowReport {
  scrollWidth: number
  clientWidth: number
  offenders: string[]
}

/**
 * Horizontal overflow check. Reports the document width, and the exact elements that stick out of the viewport
 * unless they sit inside an intentional scroll/clip container (overflow-x auto/scroll/hidden/clip).
 */
export async function overflowReport(page: Page): Promise<OverflowReport> {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const offenders: string[] = []
    for (const el of document.body.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.right > vw + 1 || r.left < -1) {
        let a = el.parentElement
        let clipped = false
        while (a && a !== document.body) {
          if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(a).overflowX)) {
            clipped = true
            break
          }
          a = a.parentElement
        }
        const cs = getComputedStyle(el)
        if (!clipped && cs.position !== 'fixed') offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 70)} right=${Math.round(r.right)} vw=${vw}`)
      }
    }
    return { scrollWidth: document.documentElement.scrollWidth, clientWidth: vw, offenders: offenders.slice(0, 6) }
  })
}

export async function expectNoOverflow(page: Page) {
  const r = await overflowReport(page)
  expect(r.scrollWidth, `document is ${r.scrollWidth}px wide in a ${r.clientWidth}px viewport`).toBeLessThanOrEqual(r.clientWidth)
  expect(r.offenders, 'elements extending past the viewport').toEqual([])
}

/** True when the header shows the desktop navigation (the mobile drawer is used below 1024px). */
export const isDesktopNav = (page: Page) => (page.viewportSize()?.width ?? 0) >= 1024

/**
 * Open the mobile drawer and return it. Always clicks the real "Open menu" button instead of guessing from the DOM: after a
 * navigation the previous drawer is still in the document for a moment until the app closes it, and Playwright waits for the
 * button to say "Open menu" again. (Checking whether the drawer exists first made the helper skip the click and then lose the drawer.)
 */
async function openMobileDrawer(page: Page) {
  await page.getByRole('button', { name: 'Open menu' }).click()
  return page.getByRole('navigation', { name: 'Mobile' })
}
/** Open a header menu group (Features, Solutions, Resources) in either layout. Returns the navigation landmark. */
export async function openNavGroup(page: Page, group: 'Features' | 'Solutions' | 'Resources') {
  if (isDesktopNav(page)) {
    const nav = page.getByRole('navigation', { name: 'Main' })
    await nav.getByRole('button', { name: group, exact: true }).click()
    return nav
  }
  const nav = await openMobileDrawer(page)
  const toggle = nav.getByRole('button', { name: group, exact: true })
  if ((await toggle.count()) && (await toggle.getAttribute('aria-expanded')) !== 'true') await toggle.click()
  return nav
}

/** Click a top-level header link (Pricing, About Us, ...) in either layout. */
export async function clickNavLink(page: Page, name: string | RegExp) {
  if (isDesktopNav(page)) {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name }).first().click()
  } else {
    const nav = await openMobileDrawer(page)
    await nav.getByRole('link', { name }).first().click()
  }
}

/** Click the header "Book a Demo" call to action in either layout. */
export async function clickBookDemo(page: Page) {
  if (isDesktopNav(page)) {
    await page.getByRole('banner').getByRole('link', { name: /Book a Demo/ }).first().click()
  } else {
    const nav = await openMobileDrawer(page)
    await nav.getByRole('link', { name: /Book a Free Demo/ }).click()
  }
}

export const slugPath = (p: string) => new URL(p, 'http://x').pathname
