import { expect, test } from '@playwright/test'
import { createRequire } from 'node:module'
import { open, ROUTES, scrollThrough } from './helpers'

const axePath = createRequire(import.meta.url).resolve('axe-core/axe.min.js')

// The site ships a strict CSP (script-src 'self'), which correctly blocks Playwright's inline injection of
// axe-core. Bypass it for this spec only; every other spec runs under the real CSP and would report violations.
test.use({ bypassCSP: true })

test.describe('automated accessibility (axe-core, WCAG 2.0/2.1 A + AA + best practice)', () => {
  for (const route of ROUTES) {
    test(`${route}`, async ({ page }) => {
      await open(page, route)
      await scrollThrough(page)
      await page.waitForTimeout(1200) // let entrance animations finish so contrast is measured on final colours
      await page.addScriptTag({ path: axePath })
      const violations = await page.evaluate(async () => {
        // @ts-expect-error axe is injected at runtime
        const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } })
        return r.violations.map((v: { id: string; impact: string; help: string; nodes: Array<{ target: string[] }> }) => `${v.id} (${v.impact}): ${v.help} → ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)
      })
      expect(violations).toEqual([])
    })
  }
})

test.describe('keyboard and focus', () => {
  test('home: the first tab stops are the skip link and the header, each with a visible focus indicator', async ({ page }) => {
    await open(page, '/')
    const stops: string[] = []
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab')
      // The page uses smooth scrolling, so the browser's scroll-into-view for the new focus target is animated:
      // give it up to 2s to bring the element on screen before judging.
      const read = () =>
        page.evaluate(() => {
          const el = document.activeElement as HTMLElement
          const cs = getComputedStyle(el)
          const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2
          const ring = cs.boxShadow !== 'none'
          const r = el.getBoundingClientRect()
          return { name: (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 30), visibleFocus: outline || ring, onScreen: r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight }
        })
      await expect.poll(async () => (await read()).onScreen, { timeout: 2000 }).toBe(true).catch(() => undefined)
      const info = await read()
      if (!info.visibleFocus) stops.push(`no visible focus on "${info.name}"`)
      if (!info.onScreen) stops.push(`focus moved off-screen to "${info.name}"`)
    }
    expect(stops).toEqual([])
  })

  test('every form control has an accessible name and errors are announced', async ({ page }) => {
    for (const route of ['/book-a-demo/', '/contact-us/']) {
      await open(page, route)
      const unnamed = await page.evaluate(() =>
        [...document.querySelectorAll('input:not([tabindex="-1"]), select, textarea')].filter((el) => {
          const e = el as HTMLInputElement
          const labelled = e.labels && e.labels.length > 0
          return !labelled && !e.getAttribute('aria-label') && !e.getAttribute('aria-labelledby')
        }).map((e) => e.getAttribute('name')),
      )
      expect(unnamed, `${route}: unlabeled controls`).toEqual([])
      await page.getByRole('main').getByRole('button', { name: /Request|Send/ }).click()
      const invalid = await page.locator('[aria-invalid="true"]').count()
      expect(invalid, `${route}: invalid fields flagged with aria-invalid`).toBeGreaterThan(0)
      const withoutDescription = await page.locator('[aria-invalid="true"]:not([aria-describedby])').count()
      expect(withoutDescription, `${route}: invalid fields linked to their message`).toBe(0)
    }
  })

  test('reduced motion: entrance animations are disabled', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await open(page, '/')
    const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-reveal="pending"]')].length)
    expect(hidden, 'reveal elements stuck hidden').toBe(0)
    const animated = await page.evaluate(() => [...document.querySelectorAll('.print-item, .stamp-in')].filter((e) => getComputedStyle(e).animationName !== 'none').length)
    expect(animated).toBe(0)
    await ctx.close()
  })
})
