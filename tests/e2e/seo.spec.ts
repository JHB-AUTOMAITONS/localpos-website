import { expect, test } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { open, ROUTES } from './helpers'

/** Origin the build was made for (VITE_SITE_URL). Netlify builds with https://localpos.in; local builds default to www. */
const ORIGIN = process.env.E2E_SITE_ORIGIN ?? 'https://www.localpos.in'

test('SEO verification script (keyword placement, titles, descriptions, canonicals, schema, links) reports 0 errors', () => {
  let out = ''
  try {
    out = execFileSync('node', ['scripts/verify-seo.mjs'], { encoding: 'utf8' })
  } catch (e) {
    out = (e as { stdout?: string }).stdout ?? String(e)
    throw new Error(`verify-seo failed:\n${out.split('\n').filter((l) => /ERROR|error\(s\)/.test(l)).join('\n')}`)
  }
  expect(out).toMatch(/0 error\(s\)/)
})

test.describe('static HTML and hydrated page agree (what crawlers see is what users see)', () => {
  for (const route of ROUTES) {
    test(`${route}`, async ({ page, request }) => {
      const raw = await (await request.get(route)).text()
      const staticTitle = /<title>([\s\S]*?)<\/title>/.exec(raw)?.[1].replace(/&amp;/g, '&')
      const staticDesc = /<meta name="description" content="([^"]*)"/.exec(raw)?.[1].replace(/&amp;/g, '&')
      const staticH1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(raw)?.[1].replace(/<[^>]+>/g, '').trim()
      expect(staticTitle, 'static <title>').toBeTruthy()

      await open(page, route)
      await expect(page).toHaveTitle(staticTitle!)
      await expect(page.locator('meta[name=description]')).toHaveAttribute('content', staticDesc!)
      expect((await page.locator('h1').innerText()).replace(/\s+/g, ' ')).toBe(staticH1!.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' '))
      await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `${ORIGIN}${route}`)
      // Metadata is not duplicated by the client-side head manager.
      expect(await page.locator('meta[name=description]').count()).toBe(1)
      expect(await page.locator('link[rel=canonical]').count()).toBe(1)
      expect(await page.locator('meta[property="og:title"]').count()).toBe(1)

      // Heading hierarchy in the hydrated DOM.
      const levels = await page.evaluate(() => [...document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')].map((h) => Number(h.tagName[1])))
      expect(levels[0]).toBe(1)
      for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `heading jump H${levels[i - 1]} → H${levels[i]}`).toBeLessThanOrEqual(1)
      expect(levels.filter((l) => l === 1)).toHaveLength(1)
      expect(levels.filter((l) => l === 2).length, 'at least one H2').toBeGreaterThan(0)
    })
  }
})

test.describe('structured data', () => {
  for (const route of ROUTES) {
    test(`${route}`, async ({ page }) => {
      await open(page, route)
      const nodes = await page.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent ?? 'null')))
      expect(nodes.length).toBeGreaterThan(0)
      const types = nodes.map((n) => n['@type'])
      for (const n of nodes) {
        expect(n['@context']).toBe('https://schema.org')
        expect(JSON.stringify(n), 'no invented ratings/offers/reviews').not.toMatch(/aggregateRating|"offers"|"review"|ratingValue/)
      }
      const hasFaqOnPage = (await page.locator('main details:not([data-toc])').count()) > 0 // table-of-contents panels are not FAQs
      expect(types.includes('FAQPage'), 'FAQPage schema only when an FAQ is visible').toBe(hasFaqOnPage)
      if (route === '/') expect(types).toEqual(expect.arrayContaining(['Organization', 'WebSite', 'FAQPage', 'SoftwareApplication']))
      else expect(types, 'breadcrumbs on inner pages').toContain('BreadcrumbList')
      if (route.startsWith('/features/') || route.startsWith('/solutions/')) expect(types).toContain('SoftwareApplication')
      if (/^\/blog\/.+\/$/.test(route)) expect(types).toContain('Article')
      if (route !== '/') {
        const bc = nodes.find((n) => n['@type'] === 'BreadcrumbList')
        expect(bc.itemListElement[0].item).toBe(`${ORIGIN}/`)
        expect(bc.itemListElement.at(-1).item).toBe(`${ORIGIN}${route}`)
      }
    })
  }
})

test('Open Graph image and favicon assets exist', async ({ request }) => {
  for (const asset of ['/favicon.svg', '/apple-touch-icon.png', '/logo-512.png', '/site.webmanifest']) {
    const r = await request.get(asset)
    expect(r.status(), asset).toBe(200)
  }
  const og = await request.get('/og-default.jpg')
  expect(og.status(), 'og image').toBe(200)
  expect(og.headers()['content-type']).toContain('image/')
  expect((await og.body()).length, 'OG image should stay under 200 KB').toBeLessThan(200_000)
})
