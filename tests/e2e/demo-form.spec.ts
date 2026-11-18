import fs from 'node:fs'
import path from 'node:path'
import { expect, test, type Page } from '@playwright/test'
import { clickNavLink, collectIssues, DEMO_FORM_URL, DEMO_FRAME, expectNoOverflow, isTrackingUrl, open } from './helpers'

/**
 * The Book a Demo form is a GoHighLevel form in an iframe (src/components/forms/DemoFormEmbed.tsx), not a form of this site.
 * These tests check the page around it. They NEVER load, fill or submit the real form: in the test browser its host is blocked
 * (playwright.config.ts), and the test fails if that host ever answers, so a test run can never create a lead in the owner's account.
 * demo-form-live.spec.ts looks at the real form, read-only.
 */
const DIST = path.resolve(process.env.DIST_DIR ?? 'dist')
const ORIGIN = new URL(DEMO_FORM_URL).origin
const EMBED_SCRIPT = `${ORIGIN}/js/form_embed.js`

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}
const pages = () => walk(DIST)

test.describe('demo form: what is built', () => {
  test('only the Book a Demo page has a frame, and it points at exactly the supplied form', () => {
    const withFrames: string[] = []
    for (const file of pages()) {
      const html = fs.readFileSync(file, 'utf8')
      const frames = [...html.matchAll(/<iframe\b[^>]*>/g)].map((m) => m[0])
      if (frames.length) withFrames.push(`${path.relative(DIST, file)} (${frames.length})`)
      if (path.relative(DIST, file).replace(/\\/g, '/') === 'book-a-demo/index.html') {
        expect(frames, 'frames on /book-a-demo/').toHaveLength(1)
        expect(frames[0]).toContain(`src="${DEMO_FORM_URL}"`)
        expect(frames[0]).toMatch(/title="Book a free LocalPOS demo/)
        expect(frames[0]).toContain('loading="lazy"')
        expect(html, 'the old native form must be gone').not.toMatch(/Request my free demo|name="businessType"/)
      }
    }
    expect(withFrames).toEqual(['book-a-demo\\index.html (1)'].map((s) => s.replace(/\\/g, path.sep)))
  })

  test('Content Security Policy: the form origin is allowed to be framed and to serve its one script, and nothing else was loosened', () => {
    const problems: string[] = []
    for (const file of pages()) {
      const html = fs.readFileSync(file, 'utf8')
      const name = path.relative(DIST, file)
      const meta = /<meta http-equiv="Content-Security-Policy" content="([^"]*)"/.exec(html)?.[1]
      if (!meta) {
        problems.push(`${name}: no CSP meta tag`)
        continue
      }
      const policy = Object.fromEntries(meta.split(';').map((d) => d.trim().split(/\s+/)).map(([k, ...v]) => [k, v]))
      if (JSON.stringify(policy['frame-src']) !== JSON.stringify([ORIGIN])) problems.push(`${name}: frame-src is ${policy['frame-src']?.join(' ')}`)
      if (!policy['script-src']?.includes(ORIGIN)) problems.push(`${name}: script-src does not allow ${ORIGIN}`)
      // The form's origin must appear nowhere else: its own scripts, fonts and requests run inside the frame, under its own rules.
      for (const [k, v] of Object.entries(policy)) if (!['frame-src', 'script-src'].includes(k) && v.some((s) => s.includes('automationclub'))) problems.push(`${name}: ${k} mentions the form origin`)
      for (const [k, v] of Object.entries({ 'default-src': ["'self'"], 'style-src': ["'self'", "'unsafe-inline'"], 'font-src': ["'self'", 'data:'], 'object-src': ["'none'"], 'base-uri': ["'self'"], 'form-action': ["'self'"] })) {
        if (JSON.stringify(policy[k]) !== JSON.stringify(v)) problems.push(`${name}: ${k} changed to ${policy[k]?.join(' ')}`)
      }
      if (/script-src[^;]*'unsafe-inline'|'unsafe-eval'|(^|\s)\*(\s|$)/.test(meta)) problems.push(`${name}: policy was weakened`)
    }
    expect(problems).toEqual([])
  })
})

/** What the page tried to send to the blocked third-party hosts. They are blocked, so every attempt must fail and none may be answered. */
function watchThirdParty(page: Page) {
  const failed: string[] = []
  const answered: string[] = []
  page.on('requestfailed', (r) => isTrackingUrl(r.url()) && failed.push(new URL(r.url()).host))
  page.on('response', (r) => isTrackingUrl(r.url()) && answered.push(r.url()))
  return { failed, answered }
}

test.describe('demo form: the page', () => {
  test('one frame, exact address, labelled, with a plain-link fallback, and no sideways scroll', async ({ page }) => {
    const issues = collectIssues(page)
    const net = watchThirdParty(page)
    await open(page, '/book-a-demo/')
    const frame = page.locator(DEMO_FRAME)
    await expect(frame, 'form frames on the page').toHaveCount(1)
    await expect(frame).toBeVisible()
    await expect(frame).toHaveAttribute('src', DEMO_FORM_URL)
    await expect(page.locator('iframe'), 'any other frames at all').toHaveCount(1)
    const fallback = page.getByRole('link', { name: 'Open it in a new tab' })
    await expect(fallback).toHaveAttribute('href', DEMO_FORM_URL)
    await expect(fallback).toHaveAttribute('target', '_blank')
    expect(((await fallback.getAttribute('rel')) ?? '').split(/\s+/).sort()).toEqual(['noopener', 'noreferrer'])
    await expect(page.getByRole('button', { name: /Request my free demo/ }), 'the old native form').toHaveCount(0)
    const box = (await frame.boundingBox())!
    expect(box.width, 'frame is not wider than the viewport').toBeLessThanOrEqual(page.viewportSize()!.width)
    expect(box.height, 'frame has a usable height before it is resized').toBeGreaterThan(300)
    await expectNoOverflow(page)
    // The test browser cannot reach the form, so nothing can have been created in the owner's account.
    expect(net.answered, 'requests to the form host that got an answer').toEqual([])
    expect(net.failed.length, 'the frame did try to load, and was refused').toBeGreaterThan(0)
    expect(issues).toEqual([])
  })

  test('the provider embed script is added once, only on this page, and again (still once) when the page is revisited', async ({ page }) => {
    const scripts = () => page.locator('script[data-demo-form-embed]')
    await open(page, '/')
    await expect(scripts(), 'script on the home page').toHaveCount(0)
    await clickNavLink(page, 'Pricing')
    await expect(page).toHaveURL(/\/pricing\/$/)
    await expect(scripts()).toHaveCount(0)

    await open(page, '/book-a-demo/')
    await expect(scripts(), 'script on the demo page').toHaveCount(1)
    await expect(scripts()).toHaveAttribute('src', EMBED_SCRIPT)

    await clickNavLink(page, 'Pricing') // leave by client-side navigation
    await expect(page).toHaveURL(/\/pricing\/$/)
    await expect(scripts(), 'script removed when leaving').toHaveCount(0)
    await expect(page.locator('iframe')).toHaveCount(0)

    await page.goBack() // come back: still exactly one frame and one script
    await expect(page).toHaveURL(/\/book-a-demo\/$/)
    await expect(scripts(), 'script when returning').toHaveCount(1)
    await expect(page.locator(DEMO_FRAME)).toHaveCount(1)
  })

  test('the floating WhatsApp button does not sit on top of the frame at the bottom of the page', async ({ page }) => {
    await open(page, '/book-a-demo/')
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' as ScrollBehavior }))
    const wa = (await page.locator('a[aria-label="Contact LocalPOS on WhatsApp"]').boundingBox())!
    const fr = await page.locator(DEMO_FRAME).boundingBox()
    if (!fr || fr.y + fr.height < 0 || fr.y > page.viewportSize()!.height) return // frame is off screen at the bottom: nothing to cover
    const overlap = fr.x < wa.x + wa.width && fr.x + fr.width > wa.x && fr.y < wa.y + wa.height && fr.y + fr.height > wa.y
    expect(overlap, `frame ${JSON.stringify(fr)} vs WhatsApp button ${JSON.stringify(wa)}`).toBe(false)
  })
})
