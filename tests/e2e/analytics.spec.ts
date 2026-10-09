import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { expect, test, type Page } from '@playwright/test'
import { CLARITY_ID, GA_ID, readState, watchCsp } from './analytics-shared'
import { clickNavLink, collectIssues, isTrackingUrl, open } from './helpers'

/**
 * Google Analytics 4 and Microsoft Clarity.
 *   1. What is built into every page (exactly the supplied snippets, once, allowed by the Content Security Policy by hash).
 *   2. In the normal test browser, where the tracking hosts are blocked: each tool initialises once and never again while navigating.
 *   3. (analytics-live.spec.ts) With the REAL scripts downloaded: no CSP violations, one page_view per page, including client-side navigation.
 */
const DIST = path.resolve(process.env.DIST_DIR ?? 'dist')

// The snippets exactly as supplied. They are written out again here on purpose: this is what the built pages are compared against.
const GA_SNIPPET = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-G9MG10MD6W"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-G9MG10MD6W');
</script>`
const CLARITY_SNIPPET = `<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "yuextem7j4");
</script>`

const count = (haystack: string, needle: string) => haystack.split(needle).length - 1
const sha = (s: string) => `'sha256-${createHash('sha256').update(s, 'utf8').digest('base64')}'`
function walk(dir: string, keep: (f: string) => boolean, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'test-results'].includes(e.name) || e.name.startsWith('dist')) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, keep, out)
    else if (keep(p)) out.push(p)
  }
  return out
}
const htmlPages = () => walk(DIST, (f) => f.endsWith('.html'))

test.describe('analytics: what is built into every page', () => {
  test('every prerendered page and 404.html carries each supplied snippet exactly once, unmodified', () => {
    const pages = htmlPages()
    expect(pages.length, 'pages found in the build').toBeGreaterThanOrEqual(34)
    const problems: string[] = []
    for (const file of pages) {
      const html = fs.readFileSync(file, 'utf8')
      const name = path.relative(DIST, file)
      if (count(html, GA_SNIPPET) !== 1) problems.push(`${name}: Google Analytics snippet found ${count(html, GA_SNIPPET)} times`)
      if (count(html, CLARITY_SNIPPET) !== 1) problems.push(`${name}: Clarity snippet found ${count(html, CLARITY_SNIPPET)} times`)
      if (count(html, GA_ID) !== 2) problems.push(`${name}: measurement ID appears ${count(html, GA_ID)} times (expected 2: the loader URL and the config call)`)
      if (count(html, CLARITY_ID) !== 1) problems.push(`${name}: Clarity project ID appears ${count(html, CLARITY_ID)} times (expected 1)`)
      if (html.includes('<!--app-analytics-->')) problems.push(`${name}: the analytics placeholder was not replaced`)
      const inline = [...html.matchAll(/<script(?![^>]*\ssrc=)(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g)].length
      if (inline !== 2) problems.push(`${name}: ${inline} inline scripts besides JSON-LD (expected exactly the 2 analytics snippets)`)
    }
    expect(problems).toEqual([])
  })

  test('there is no second implementation: the IDs are not in the app bundle or in the source, only in the build script', () => {
    const bundle = walk(path.join(DIST, 'assets'), (f) => /\.(js|css)$/.test(f))
    const hits = bundle.filter((f) => /G-G9MG10MD6W|yuextem7j4|googletagmanager|clarity\.ms|gtag\(/.test(fs.readFileSync(f, 'utf8')))
    expect(hits.map((f) => path.relative(DIST, f)), 'built JS/CSS mentioning analytics').toEqual([])

    const source = walk(path.resolve('src'), (f) => /\.(tsx?|css|html)$/.test(f))
    source.push(path.resolve('index.html'))
    const inSource = source.filter((f) => /G-G9MG10MD6W|yuextem7j4|googletagmanager|clarity\.ms|gtag\(/.test(fs.readFileSync(f, 'utf8')))
    expect(inSource.map((f) => path.relative(process.cwd(), f)), 'source files mentioning analytics').toEqual([])
  })

  test('Content Security Policy: the two scripts are allowed by hash, not by unsafe-inline, and nothing else was loosened', () => {
    // The hash of an inline script is the hash of the exact text between its tags; computed here from the golden copies above.
    const wantedHashes = [GA_SNIPPET, CLARITY_SNIPPET].flatMap((snippet) => [...snippet.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => sha(m[1])))
    expect(wantedHashes, 'one hash per inline script').toHaveLength(2)
    const leadOrigin = process.env.VITE_LEAD_ENDPOINT ? [new URL(process.env.VITE_LEAD_ENDPOINT).origin] : []
    const problems: string[] = []
    for (const file of htmlPages()) {
      const html = fs.readFileSync(file, 'utf8')
      const name = path.relative(DIST, file)
      const meta = /<meta http-equiv="Content-Security-Policy" content="([^"]*)"/.exec(html)?.[1]
      if (!meta) {
        problems.push(`${name}: no CSP meta tag`)
        continue
      }
      const policy = Object.fromEntries(meta.split(';').map((d) => d.trim().split(/\s+/)).map(([k, ...v]) => [k, v]))
      const eq = (a: string[] | undefined, b: string[]) => JSON.stringify([...(a ?? [])].sort()) === JSON.stringify([...b].sort())
      if (!eq(policy['script-src'], ["'self'", ...wantedHashes, 'https://www.googletagmanager.com', 'https://www.clarity.ms', 'https://scripts.clarity.ms'])) problems.push(`${name}: script-src is ${policy['script-src']?.join(' ')}`)
      if (!eq(policy['connect-src'], ["'self'", ...leadOrigin, 'https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://*.clarity.ms'])) problems.push(`${name}: connect-src is ${policy['connect-src']?.join(' ')}`)
      if (!eq(policy['img-src'], ["'self'", 'data:', 'https://*.google-analytics.com', 'https://*.clarity.ms'])) problems.push(`${name}: img-src is ${policy['img-src']?.join(' ')}`)
      // Everything that existed before analytics must be exactly as it was.
      for (const [k, v] of Object.entries({ 'default-src': ["'self'"], 'style-src': ["'self'", "'unsafe-inline'"], 'font-src': ["'self'", 'data:'], 'manifest-src': ["'self'"], 'object-src': ["'none'"], 'base-uri': ["'self'"], 'form-action': ["'self'"] })) {
        if (!eq(policy[k], v)) problems.push(`${name}: ${k} changed to ${policy[k]?.join(' ')}`)
      }
      if (/'unsafe-eval'|(^|\s)\*(\s|$)/.test(meta) || /script-src[^;]*'unsafe-inline'/.test(meta)) problems.push(`${name}: policy was weakened`)
    }
    expect(problems).toEqual([])
  })
})

/**
 * Records what the page tried to send to the tracking hosts. In the normal test browser they are blocked, so every attempt must FAIL to resolve and
 * none may be answered; this is what guarantees that tests never send data to the real Google Analytics and Clarity accounts.
 */
function watchTracking(page: Page) {
  const failed: string[] = []
  const answered: string[] = []
  page.on('requestfailed', (r) => isTrackingUrl(r.url()) && failed.push(`${new URL(r.url()).host}: ${r.failure()?.errorText}`))
  page.on('response', (r) => isTrackingUrl(r.url()) && answered.push(r.url()))
  return { failed, answered }
}

test.describe('analytics: initialises once per page load (tracking hosts blocked in the test browser)', () => {
  for (const route of ['/', '/features/pos-billing-software/', '/blog/gst-invoice-format-in-india/', '/this-page-does-not-exist/']) {
    test(`${route}`, async ({ page }) => {
      const issues = collectIssues(page)
      const tracking = watchTracking(page)
      await watchCsp(page)
      await open(page, route)
      const s = await readState(page)
      expect(s.gtagLoaders, 'gtag.js script tags').toBe(1)
      expect(s.clarityLoaders, 'Clarity script tags').toBe(1)
      expect(s.configCalls, 'gtag config calls').toEqual([GA_ID])
      expect(s.jsCalls, 'gtag js calls').toBe(1)
      expect([s.gtagType, s.clarityType]).toEqual(['function', 'function'])
      expect(s.csp, 'CSP violations').toEqual([])
      expect(issues.filter((i) => !/404/.test(i)), 'console errors and failed requests').toEqual([])
      // The two scripts were really requested, and the test browser refused to resolve them: nothing can have reached the real accounts.
      expect(tracking.answered, 'tracking requests that got an answer').toEqual([])
      expect(tracking.failed.length, 'tracking requests attempted').toBeGreaterThanOrEqual(2)
      expect(tracking.failed.every((f) => f.includes('ERR_NAME_NOT_RESOLVED')), tracking.failed.join(' | ')).toBe(true)
    })
  }

  test('client-side navigation never initialises either tool again', async ({ page }) => {
    const issues = collectIssues(page)
    await watchCsp(page)
    await open(page, '/')
    const before = await readState(page)
    for (const [link, url] of [['Pricing', /\/pricing\/$/], ['About Us', /\/about-us\/$/]] as const) {
      await clickNavLink(page, link)
      await expect(page).toHaveURL(url)
    }
    await page.goBack()
    await page.goForward()
    await page.getByRole('link', { name: 'LocalPOS home' }).first().click()
    await expect(page).toHaveURL(/localhost:\d+\/$/)
    const after = await readState(page)
    expect(after).toEqual(before)
    expect(after.gtagLoaders + after.clarityLoaders, 'tracking script tags after 5 navigations').toBe(2)
    expect(after.csp).toEqual([])
    expect(issues).toEqual([])
  })
})
