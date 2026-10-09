import { expect, test } from '@playwright/test'
import { collectIssues, expectNoOverflow, FORBIDDEN_ROUTES, open, REQUIRED_ROUTES, ROUTES, scrollThrough } from './helpers'

test.describe('route inventory (matches the approved SEO document)', () => {
  test('every required route is in the sitemap, and nothing forbidden is', () => {
    for (const r of REQUIRED_ROUTES) expect(ROUTES, `sitemap is missing ${r}`).toContain(r)
    for (const r of FORBIDDEN_ROUTES) expect(ROUTES, `${r} must not be indexed`).not.toContain(r)
    // Everything else in the sitemap must be a blog article.
    const extra = ROUTES.filter((r) => !REQUIRED_ROUTES.includes(r))
    for (const r of extra) expect(r, 'unexpected route').toMatch(/^\/blog\/[a-z0-9-]+\/$/)
  })

  for (const path of FORBIDDEN_ROUTES) {
    test(`${path} does not exist (real 404 page)`, async ({ page }) => {
      const res = await page.goto(path)
      expect(res?.status()).toBe(404)
      await expect(page.getByRole('heading', { level: 1 })).toContainText('could not be found')
      await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /noindex/)
    })
  }

  test('unknown nested path also returns the 404 page', async ({ page }) => {
    const res = await page.goto('/features/does-not-exist/')
    expect(res?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('sitemap.xml and robots.txt are served and valid', async ({ request }) => {
    const sm = await request.get('/sitemap.xml')
    expect(sm.status()).toBe(200)
    expect(sm.headers()['content-type']).toContain('xml')
    const xml = await sm.text()
    expect(xml).toContain('<urlset')
    expect((xml.match(/<loc>/g) ?? []).length).toBe(ROUTES.length)
    const rb = await request.get('/robots.txt')
    expect(rb.status()).toBe(200)
    const txt = await rb.text()
    expect(txt).toMatch(/User-agent: \*/)
    expect(txt).toMatch(/Sitemap: https?:\/\/\S+\/sitemap\.xml/)
    expect(txt).not.toMatch(/Disallow:\s*\/\s*$/m)
  })
})

test.describe('every page loads cleanly', () => {
  for (const route of ROUTES) {
    test(`${route}`, async ({ page }) => {
      const issues = collectIssues(page)
      const res = await open(page, route)
      expect(res?.status(), 'HTTP status').toBe(200)

      const h1 = page.locator('h1')
      await expect(h1, 'exactly one H1').toHaveCount(1)
      await expect(h1).toBeVisible()
      expect((await h1.innerText()).trim().length).toBeGreaterThan(8)

      await expect(page.locator('main#main')).toBeVisible()
      await expect(page.getByRole('banner')).toBeVisible() // the site header (articles have their own <header>, which is not a banner)
      await expect(page.getByRole('contentinfo')).toBeVisible() // the site footer
      expect((await page.title()).length).toBeGreaterThan(10)
      await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /.{60,}/)

      await scrollThrough(page)
      await expectNoOverflow(page)

      const brokenImages = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src))
      expect(brokenImages, 'broken images').toEqual([])
      const imagesWithoutAlt = await page.evaluate(() => [...document.images].filter((i) => !i.hasAttribute('alt')).map((i) => i.src))
      expect(imagesWithoutAlt, 'images without alt').toEqual([])

      expect(issues, 'console errors / failed requests').toEqual([])
    })
  }
})
