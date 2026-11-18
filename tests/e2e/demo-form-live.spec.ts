import { expect, test } from '@playwright/test'
import { collectIssues, DEMO_FORM_URL, DEMO_FRAME, expectNoOverflow } from './helpers'
import { watchCsp } from './analytics-shared'

/**
 * Looks at the REAL Book a Demo form (a GoHighLevel form) inside the page, READ ONLY.
 *
 * This test never clicks, types into or submits the form, so it cannot create a lead. It only checks that the form appears, that the
 * provider's script resizes the frame to fit, and that the site's Content Security Policy lets all of it happen. As a safety net it also fails
 * if the page or the frame sends any POST other than the form's own on-load calls (page-view counters, session attribution, bot check). It needs the internet and is skipped without it.
 *
 * It is a separate file because it needs a browser WITHOUT the DNS block on the form's host (launch options cannot be set inside a describe).
 * Google Analytics and Clarity stay blocked.
 */
test.use({
  launchOptions: { args: ['--host-resolver-rules=MAP *.googletagmanager.com ~NOTFOUND, MAP *.google-analytics.com ~NOTFOUND, MAP *.analytics.google.com ~NOTFOUND, MAP *.clarity.ms ~NOTFOUND'] },
})

for (const [label, viewport] of [
  ['desktop 1440', { width: 1440, height: 900 }],
  ['phone 390', { width: 390, height: 844 }],
] as const) {
  test.describe(`real demo form, ${label}`, () => {
    test.use({ viewport })

    test('appears, is resized to fit, fits the screen, and breaks no Content Security Policy rule', async ({ page }) => {
      test.setTimeout(120_000)
      const reachable = await fetch(DEMO_FORM_URL, { signal: AbortSignal.timeout(10_000) }).then((r) => r.ok, () => false)
      test.skip(!reachable, 'the form host cannot be reached from this machine (no internet), so the real form cannot be looked at')

      const posts: string[] = []
      page.on('request', (r) => r.method() === 'POST' && posts.push(`${r.method()} ${r.url()}`))
      const issues = collectIssues(page, { allowTracking: true })
      await watchCsp(page)
      // 'load', not 'networkidle': the form keeps a bot-check running, so the network never goes quiet.
      await page.goto('/book-a-demo/', { waitUntil: 'load' })
      await page.waitForSelector('html[data-app-ready]', { state: 'attached' })

      const frame = page.locator(DEMO_FRAME)
      await expect(frame).toBeVisible()
      const form = page.frameLocator(DEMO_FRAME)
      await expect(form.getByText('Full Name'), 'form label').toBeVisible({ timeout: 30_000 })
      await expect(form.getByText('Phone', { exact: false }).first()).toBeVisible()
      await expect(form.getByText('Email', { exact: false }).first()).toBeVisible()
      await expect(form.getByRole('button').first(), 'the form has a submit button').toBeVisible()

      // The provider's script resized the frame to the form (it starts at 560 px; the form is shorter), and the frame fits the screen.
      await expect(frame).toHaveAttribute('data-iframe-resizer-initialized', 'true', { timeout: 30_000 })
      await expect.poll(async () => Math.round((await frame.boundingBox())!.height), { timeout: 15_000, message: 'frame height after resizing' }).not.toBe(560)
      const box = (await frame.boundingBox())!
      expect(box.height, 'frame height').toBeGreaterThan(250)
      expect(box.height, 'frame height').toBeLessThan(900)
      expect(box.width, 'frame width').toBeLessThanOrEqual(viewport.width)
      await expectNoOverflow(page)

      // The page's own policy: no violation for the frame or for the provider's script.
      const csp = await page.evaluate(() => (window as unknown as { __csp: string[] }).__csp)
      expect(csp, 'Content Security Policy violations in the page').toEqual([])
      expect(await page.locator('script[data-demo-form-embed]').count()).toBe(1)

      // Read-only guarantee. On load the form sends only these POSTs: 'form-view' and 'form-load-time' counters, a session-attribution call, and
      // Cloudflare's bot check. Anything else (in particular a submission) fails the test.
      const expectedOnLoad = (p: string) => /\/forms\/form-survey-event/.test(p) || /user_session_v3\/create_session/.test(p) || /challenges\.cloudflare\.com|\/cdn-cgi\//.test(p)
      expect(posts.filter((p) => !expectedOnLoad(p)), `unexpected POST requests (a submission?): ${posts.join(' | ')}`).toEqual([])
      // Console noise from inside the form's own frame, from the blocked analytics hosts and from headless Chrome is not this page's.
      const theirs = /automationclub|leadconnector|cloudflare|filesafe|googleapis|gstatic|googletagmanager|clarity\.ms|ERR_NAME_NOT_RESOLVED|font-size:0|Deprecated API|OTS parsing|adapter|powerPreference|Turnstile|data:,/i
      expect(issues.filter((i) => !theirs.test(i)), 'errors from this page itself').toEqual([])
    })
  })
}
