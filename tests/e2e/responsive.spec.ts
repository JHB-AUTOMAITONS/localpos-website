import { expect, test } from '@playwright/test'
import { overflowReport, ROUTES, WIDTHS } from './helpers'

/**
 * The full viewport matrix from the audit brief: every route at every width must lay out without horizontal overflow,
 * and the main heading must be visible and within the viewport.
 */
for (const width of WIDTHS) {
  test(`${width}px: no horizontal overflow on any of the ${ROUTES.length} routes`, async ({ page }) => {
    test.setTimeout(300_000)
    await page.setViewportSize({ width, height: width < 700 ? 800 : 900 })
    const problems: string[] = []
    for (const route of ROUTES) {
      await page.goto(route, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      const r = await overflowReport(page)
      if (r.scrollWidth > r.clientWidth) problems.push(`${route}: document ${r.scrollWidth}px > viewport ${r.clientWidth}px`)
      if (r.offenders.length) problems.push(`${route}: ${r.offenders.join(' ; ')}`)
      const h1 = await page.locator('h1').first().boundingBox()
      if (!h1 || h1.x < -1 || h1.x + h1.width > width + 1) problems.push(`${route}: H1 outside the viewport`)
    }
    expect(problems).toEqual([])
  })
}
