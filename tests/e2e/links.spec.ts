import { expect, test } from '@playwright/test'
import { collectIssues, isDesktopNav, open, ROUTES } from './helpers'

const KNOWN = new Set(ROUTES)

test.describe('links and buttons on every page', () => {
  for (const route of ROUTES) {
    test(`${route}`, async ({ page }) => {
      await open(page, route)
      const links = await page.evaluate(() =>
        [...document.querySelectorAll('a')].map((a) => ({
          href: a.getAttribute('href'),
          text: (a.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 50),
          label: a.getAttribute('aria-label'),
          target: a.getAttribute('target'),
          rel: a.getAttribute('rel'),
        })),
      )
      expect(links.length).toBeGreaterThan(10)

      const problems: string[] = []
      for (const l of links) {
        const h = l.href
        if (h === null || h === '' || h === '#' || /^javascript:/i.test(h) || /undefined|null/.test(h)) {
          problems.push(`bad href "${h}" (${l.text})`)
          continue
        }
        if (!l.text && !l.label) problems.push(`link with no accessible name: ${h}`)
        if (h.startsWith('mailto:') || h.startsWith('tel:')) continue
        if (/^https?:\/\//.test(h)) {
          if (!h.startsWith('https://')) problems.push(`insecure external link ${h}`)
          if (l.target === '_blank' && !/noopener/.test(l.rel ?? '')) problems.push(`target=_blank without rel=noopener: ${h}`)
          continue
        }
        if (h.startsWith('#')) {
          const id = decodeURIComponent(h.slice(1))
          if (!(await page.locator(`[id="${id}"]`).count())) problems.push(`in-page anchor target missing: ${h}`)
          continue
        }
        const url = new URL(h, 'http://x')
        if (!KNOWN.has(url.pathname) && url.pathname !== '/') problems.push(`internal link to unknown route: ${h} (${l.text})`)
        if (url.hash && url.pathname === route && !(await page.locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`).count())) problems.push(`hash target missing on this page: ${h}`)
      }
      expect(problems, 'link problems').toEqual([])

      const buttons = await page.evaluate(() =>
        [...document.querySelectorAll('button')].map((b) => ({
          name: (b.getAttribute('aria-label') || b.textContent || '').trim().replace(/\s+/g, ' '),
          type: b.getAttribute('type'),
          hidden: b.closest('[hidden]') !== null,
        })),
      )
      for (const b of buttons.filter((x) => !x.hidden)) {
        expect(b.name, 'button without accessible name').not.toBe('')
        expect(b.type, `button "${b.name}" must declare a type`).not.toBeNull()
      }
    })
  }
})

test.describe('important calls to action go where they say', () => {
  test('home: hero CTAs', async ({ page }) => {
    const issues = collectIssues(page)
    await open(page, '/')
    await page.getByRole('main').getByRole('link', { name: 'Explore Features' }).click()
    await expect(page).toHaveURL(/\/#explore$/)
    await expect(page.locator('#explore')).toBeInViewport({ ratio: 0.05 })
    await open(page, '/')
    await page.getByRole('main').getByRole('link', { name: /Book a Free Demo/ }).first().click()
    await expect(page).toHaveURL(/\/book-a-demo\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('free demo')
    expect(issues).toEqual([])
  })

  test('header: Login points at the configured app URL', async ({ page }) => {
    await open(page, '/')
    if (isDesktopNav(page)) {
      const login = page.getByRole('banner').getByRole('link', { name: 'Login' })
      await expect(login).toHaveAttribute('href', /^https:\/\//)
    } else {
      await page.getByRole('button', { name: 'Open menu' }).click()
      await expect(page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: 'Login' })).toHaveAttribute('href', /^https:\/\//)
    }
  })

  test('pricing: every plan button leads to Book a Demo', async ({ page }) => {
    await open(page, '/pricing/')
    const buttons = page.getByRole('main').getByRole('link', { name: 'Book a Demo' })
    expect(await buttons.count()).toBe(3)
    for (let i = 0; i < 3; i++) await expect(buttons.nth(i)).toHaveAttribute('href', '/book-a-demo/')
  })

  test('closing CTA on a feature page leads to Book a Demo and Contact', async ({ page }) => {
    await open(page, '/features/gst-billing-software/')
    const cta = page.locator('section[aria-labelledby="cta-heading"]')
    await cta.scrollIntoViewIfNeeded()
    await expect(cta.getByRole('link', { name: 'Book a Free Demo' })).toHaveAttribute('href', '/book-a-demo/')
    await expect(cta.getByRole('link', { name: 'Talk to us' })).toHaveAttribute('href', '/contact-us/')
  })

  test('footer links all resolve to real pages', async ({ page }) => {
    await open(page, '/')
    const hrefs = await page.locator('footer a[href]').evaluateAll((els) => els.map((e) => e.getAttribute('href')!))
    expect(hrefs.length).toBeGreaterThan(20)
    for (const h of new Set(hrefs)) {
      if (/^https?:|^mailto:|^tel:/.test(h)) continue
      expect(KNOWN.has(new URL(h, 'http://x').pathname), `footer link ${h}`).toBe(true)
    }
    for (const label of ['Privacy Policy', 'Terms & Conditions', 'Refund Policy', 'About Us', 'Contact Us', 'Blog', 'Pricing']) {
      await expect(page.locator('footer').getByRole('link', { name: label, exact: true })).toHaveCount(1)
    }
  })
})
