import type { Page } from '@playwright/test'

/** Ids from the supplied snippets, shared by analytics.spec.ts and analytics-live.spec.ts. */
export const GA_ID = 'G-G9MG10MD6W'
export const CLARITY_ID = 'yuextem7j4'

/** Runs before any page script: records every Content Security Policy violation the browser reports. */
export const watchCsp = (page: Page) =>
  page.addInitScript(() => {
    const w = window as unknown as { __csp: string[] }
    w.__csp = []
    document.addEventListener('securitypolicyviolation', (e) => w.__csp.push(`${e.violatedDirective}: blocked ${e.blockedURI}`))
  })

export const readState = (page: Page) =>
  page.evaluate(() => {
    const w = window as unknown as { dataLayer: unknown[][]; gtag?: unknown; clarity?: unknown; __csp: string[] }
    return {
      gtagLoaders: document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').length,
      clarityLoaders: document.querySelectorAll('script[src*="clarity.ms/tag"]').length,
      configCalls: w.dataLayer.filter((a) => a[0] === 'config').map((a) => a[1]),
      jsCalls: w.dataLayer.filter((a) => a[0] === 'js').length,
      gtagType: typeof w.gtag,
      clarityType: typeof w.clarity,
      csp: w.__csp,
    }
  })
