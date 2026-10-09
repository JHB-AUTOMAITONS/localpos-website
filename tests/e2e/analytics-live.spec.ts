import { expect, test, type AnalyticsHit } from './fixtures'
import { CLARITY_ID, GA_ID, readState, watchCsp } from './analytics-shared'
import { clickNavLink, collectIssues, open } from './helpers'

/**
 * The REAL Google Analytics and Microsoft Clarity scripts, run under the site's real Content Security Policy.
 *
 * This file is separate because it needs a browser WITHOUT the DNS block that every other test uses (Playwright only allows changing the
 * browser launch options at the top level of a file). The scripts are downloaded for real, but the fixture answers every request that would
 * carry measurement data itself, so nothing is recorded in the real accounts. Skipped automatically when the internet is not reachable.
 */
test.use({ analyticsMode: 'live', launchOptions: { args: [] } })

type GaEvent = Record<string, string>
function gaEvents(hits: AnalyticsHit[]): GaEvent[] {
  return hits
    .filter((h) => h.host.endsWith('google-analytics.com') && h.path === '/g/collect')
    .flatMap((h) => {
      const lines = (h.body ?? '').split('\n').filter(Boolean)
      return lines.length ? lines.map((l) => ({ ...h.query, ...Object.fromEntries(new URLSearchParams(l)) })) : [h.query]
    })
}
const pageViews = (hits: AnalyticsHit[]) => gaEvents(hits).filter((e) => e.en === 'page_view')

test.describe('analytics: the real scripts under the real Content Security Policy', () => {
  test('Google Analytics sends one page_view per page, including client-side navigation; Clarity loads; no CSP violations', async ({ page, analyticsHits }) => {
    test.setTimeout(150_000)
    const reachable = await fetch(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, { signal: AbortSignal.timeout(10_000) }).then((r) => r.ok, () => false)
    test.skip(!reachable, 'the Google script cannot be downloaded from this machine (no internet), so the real scripts cannot be tested')

    const issues = collectIssues(page, { allowTracking: true })
    await watchCsp(page)
    // Google delays the page_view for a client-side navigation by several seconds, so wait for it rather than for a fixed time.
    const waitForPageView = async (pathname: string) => {
      await expect
        .poll(() => pageViews(analyticsHits).filter((e) => new URL(e.dl).pathname === pathname).length, { timeout: 25_000, message: `page_view for ${pathname}` })
        .toBeGreaterThan(0)
      await page.waitForTimeout(3000) // long enough for a duplicate to show up
      return pageViews(analyticsHits).filter((e) => new URL(e.dl).pathname === pathname)
    }

    await open(page, '/')
    const first = await waitForPageView('/')
    expect(first, 'page_view events for the first page load').toHaveLength(1)
    expect(first[0].dt).toBe(await page.title())

    await clickNavLink(page, 'Pricing')
    await expect(page).toHaveURL(/\/pricing\/$/)
    const pricing = await waitForPageView('/pricing/')
    expect(pricing, 'page_view events for the client-side navigation to Pricing').toHaveLength(1)
    expect(pricing[0].dt, 'the page_view carries the NEW page title').toBe('Pricing | LocalPOS')

    await clickNavLink(page, 'About Us')
    await expect(page).toHaveURL(/\/about-us\/$/)
    const about = await waitForPageView('/about-us/')
    expect(about, 'page_view events for the client-side navigation to About Us').toHaveLength(1)
    expect(about[0].dt).toBe('About Us | LocalPOS')

    expect(pageViews(analyticsHits), 'all page_view events in the session (home, pricing, about)').toHaveLength(3)
    expect(new Set(gaEvents(analyticsHits).map((e) => e.tid)), 'measurement IDs used').toEqual(new Set([GA_ID]))

    // Checked first, so that a blocked script is reported as a CSP violation naming the blocked address, not as a missing request.
    const s = await readState(page)
    expect(s.csp, 'CSP violations with the real scripts running').toEqual([])
    expect(s).toMatchObject({ gtagLoaders: 1, clarityLoaders: 1, configCalls: [GA_ID], gtagType: 'function', clarityType: 'function' })

    // Microsoft Clarity: the real loader and its main script were fetched from the hosts the policy allows.
    const clarityScripts = analyticsHits.filter((h) => h.type === 'script' && h.host.endsWith('clarity.ms')).map((h) => `${h.host}${h.path}`)
    expect(clarityScripts).toContain(`www.clarity.ms/tag/${CLARITY_ID}`)
    expect(clarityScripts.some((s) => s.startsWith('scripts.clarity.ms/'))).toBe(true)
    expect(issues, 'console errors and failed requests').toEqual([])
  })
})
