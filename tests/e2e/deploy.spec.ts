import { expect, test } from '@playwright/test'
import { collectIssues, open, REQUIRED_ROUTES } from './helpers'

/**
 * Guards against the Netlify 404 incident: a client-only `vite build` (no prerender step) was published, so only "/"
 * existed and every other URL returned Netlify's "Page not found". These checks run against the real build output
 * served like a static host: each route must be its own prerendered file, load by direct URL, survive a refresh,
 * and pull its assets from root-absolute paths so nested URLs do not break them.
 */
test.describe('deployment: direct URL, refresh and static output', () => {
  for (const route of REQUIRED_ROUTES) {
    test(`${route}`, async ({ page, request }) => {
      // 1. The raw HTML a crawler or a pasted link receives: prerendered, never the empty build template.
      const rawRes = await request.get(route)
      expect(rawRes.status(), 'HTTP status of the raw document').toBe(200)
      const html = await rawRes.text()
      expect(html, 'unreplaced prerender placeholder').not.toMatch(/<!--app-(html|head)-->/)
      expect(html, 'a host 404 page was served').not.toMatch(/Page not found|broken link or entered a URL/i)
      expect(html, 'prerendered content').toMatch(/<main[\s>]/)
      expect(html, 'canonical link').toMatch(/<link rel="canonical" href="https?:\/\/[^"]+"/)

      // 2. Every asset the document references is root-absolute and actually served (so nested routes load them).
      const refs = [
        ...[...html.matchAll(/<script[^>]+\ssrc="([^"]+)"/g)].map((m) => m[1]),
        ...[...html.matchAll(/<link[^>]+\shref="([^"]+)"[^>]*>/g)].filter((m) => /rel="(stylesheet|icon|apple-touch-icon|manifest|preload|modulepreload)"/.test(m[0])).map((m) => m[1]),
        ...[...html.matchAll(/<img[^>]+\ssrc="([^"]+)"/g)].map((m) => m[1]),
      ].filter((u) => !u.startsWith('data:'))
      expect(refs.length, 'expected scripts, styles and icons in the document').toBeGreaterThan(3)
      for (const ref of refs) {
        if (/^https?:\/\//.test(ref)) continue // external or absolute canonical-style URLs are not a nested-path risk
        expect(ref, 'asset path must start with /').toMatch(/^\//)
        const asset = await request.get(ref)
        expect(asset.status(), `asset ${ref}`).toBe(200)
        expect(asset.headers()['content-type'] ?? '', `asset ${ref} must not be an HTML fallback`).not.toContain('text/html')
      }

      // 3. Direct load in a browser: no redirect hop, hydrates, no console errors or failed requests.
      const issues = collectIssues(page)
      const res = await open(page, route)
      expect(res?.status(), 'HTTP status').toBe(200)
      expect(new URL(page.url()).pathname, 'URL after load (no redirect chain)').toBe(route)
      const h1 = page.locator('h1')
      await expect(h1, 'exactly one H1').toHaveCount(1)
      const heading = (await h1.innerText()).replace(/\s+/g, ' ').trim()
      expect(heading.length).toBeGreaterThan(8)

      // 4. Refresh on the same URL gives the same page.
      const again = await page.reload({ waitUntil: 'networkidle' })
      expect(again?.status(), 'HTTP status after refresh').toBe(200)
      expect(new URL(page.url()).pathname, 'URL after refresh').toBe(route)
      await expect(h1).toHaveCount(1)
      expect((await h1.innerText()).replace(/\s+/g, ' ').trim(), 'same page after refresh').toBe(heading)

      expect(issues, 'console errors / failed requests').toEqual([])
    })
  }

  test('an unknown URL gets a real 404 with the custom page, not the homepage', async ({ page, request }) => {
    const res = await page.goto('/this-page-does-not-exist/', { waitUntil: 'networkidle' })
    expect(res?.status(), 'unknown URL must be a true 404, not a soft 200').toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('could not be found')
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /noindex/)
    const home = await (await request.get('/')).text()
    const homeH1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(home)?.[1].replace(/<[^>]+>/g, '').trim()
    expect((await page.locator('h1').innerText()).replace(/\s+/g, ' ')).not.toContain(homeH1!.replace(/\s+/g, ' ').slice(0, 30))
  })
})
