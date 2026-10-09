import { expect, test as base } from '@playwright/test'
import { isTrackingUrl } from './helpers'

/**
 * Used only by analytics.spec.ts.
 *
 * Every test browser has Google Analytics and Microsoft Clarity blocked by a DNS rule (see BLOCK_TRACKING in playwright.config.ts), so
 * measurement data can never reach the real accounts. That blocking is the default, 'blocked' mode: it intercepts nothing, so Chrome's
 * HTTP cache keeps working. (Playwright's request interception disables that cache, which is why it is not used for the other tests.)
 *
 * 'live' mode is for the one test that must run the REAL scripts. It needs a browser without the DNS rule (the spec also sets
 * `launchOptions: { args: [] }`) and answers the traffic itself:
 *   - scripts are downloaded for real, so tests can prove they run under the site's Content Security Policy;
 *   - every other request, which is where measurement data would go, is answered locally and recorded in `analyticsHits`.
 */
export type AnalyticsMode = 'blocked' | 'live'

export interface AnalyticsHit {
  at: number
  method: string
  type: string
  host: string
  path: string
  query: Record<string, string>
  body: string | null
}

export const test = base.extend<{ analyticsMode: AnalyticsMode; analyticsHits: AnalyticsHit[] }>({
  analyticsMode: ['blocked', { option: true }],
  analyticsHits: [
    async ({ context, analyticsMode }, use) => {
      const hits: AnalyticsHit[] = []
      if (analyticsMode === 'live') {
        await context.route(
          (url) => isTrackingUrl(url.href),
          async (route) => {
            const request = route.request()
            const url = new URL(request.url())
            hits.push({ at: Date.now(), method: request.method(), type: request.resourceType(), host: url.host, path: url.pathname, query: Object.fromEntries(url.searchParams), body: request.postData() })
            if (request.resourceType() === 'script') return route.continue()
            // Clarity sends credentialed requests, which browsers only accept if the origin is echoed back (a wildcard is rejected).
            const headers = { 'access-control-allow-origin': request.headers()['origin'] ?? '*', 'access-control-allow-credentials': 'true' }
            // Pixels get a real 1x1 GIF. Everything else gets a small non-empty reply: Chrome reports a spurious net::ERR_ABORTED for a
            // fetch answered with an EMPTY body (even a 204), which would make every `requestfailed` check lie.
            if (request.resourceType() === 'image') return route.fulfill({ status: 200, contentType: 'image/gif', headers, body: Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64') })
            return route.fulfill({ status: 200, contentType: 'text/plain', headers, body: 'ok' })
          },
        )
      }
      await use(hits)
    },
    { auto: true },
  ],
})

export { expect }
