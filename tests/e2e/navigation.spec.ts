import { expect, test } from '@playwright/test'
import { clickBookDemo, clickNavLink, collectIssues, expectNoOverflow, FEATURE_NAV, isDesktopNav, open, openNavGroup, SOLUTION_NAV } from './helpers'

test.describe('header navigation (desktop dropdowns / mobile drawer)', () => {
  for (const [label, path] of FEATURE_NAV) {
    test(`Features → ${label} → ${path}`, async ({ page }) => {
      const issues = collectIssues(page)
      await open(page, '/')
      const nav = await openNavGroup(page, 'Features')
      await nav.getByRole('link', { name: label }).first().click()
      await expect(page).toHaveURL(new RegExp(`${path.replace(/\//g, '\\/')}$`))
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expectNoOverflow(page)
      expect(issues).toEqual([])
    })
  }

  for (const [label, path] of SOLUTION_NAV) {
    test(`Solutions → ${label} → ${path}`, async ({ page }) => {
      const issues = collectIssues(page)
      await open(page, '/')
      const nav = await openNavGroup(page, 'Solutions')
      await nav.getByRole('link', { name: label }).first().click()
      await expect(page).toHaveURL(new RegExp(`${path.replace(/\//g, '\\/')}$`))
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(issues).toEqual([])
    })
  }

  for (const [name, path] of [
    ['Pricing', '/pricing/'],
    ['About Us', '/about-us/'],
  ] as const) {
    test(`${name} link`, async ({ page }) => {
      await open(page, '/')
      await clickNavLink(page, name)
      await expect(page).toHaveURL(new RegExp(`${path.replace(/\//g, '\\/')}$`))
    })
  }

  test('Resources → Blog and a latest article', async ({ page }) => {
    await open(page, '/')
    const nav = await openNavGroup(page, 'Resources').catch(() => null)
    if (nav) {
      await nav.getByRole('link', { name: /^Blog/ }).first().click()
    } else {
      await clickNavLink(page, 'Blog')
    }
    await expect(page).toHaveURL(/\/blog\/$/)
    if (isDesktopNav(page)) {
      await page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Resources', exact: true }).click()
      const first = page.locator('#menu-resources').getByRole('link').nth(1)
      await first.click()
      await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+\/$/)
    }
  })

  test('Book a Demo (header call to action)', async ({ page }) => {
    await open(page, '/pricing/')
    await clickBookDemo(page)
    await expect(page).toHaveURL(/\/book-a-demo\/$/)
    await expect(page.getByRole('button', { name: /Request my free demo/ })).toBeVisible()
  })

  test('logo returns home from any page', async ({ page }) => {
    await open(page, '/features/gst-billing-software/')
    await page.getByRole('banner').getByRole('link', { name: /LocalPOS home/ }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Billing software')
  })

  test('active page is marked with aria-current', async ({ page }) => {
    await open(page, '/pricing/')
    if (isDesktopNav(page)) {
      await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Pricing' })).toHaveAttribute('aria-current', 'page')
      await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About Us' })).not.toHaveAttribute('aria-current', 'page')
    }
  })
})

test.describe('desktop dropdown behaviour', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, 'desktop navigation only')

  test('opens on click, closes with Escape and on outside click, one at a time', async ({ page }) => {
    await open(page, '/')
    const nav = page.getByRole('navigation', { name: 'Main' })
    const features = nav.getByRole('button', { name: 'Features', exact: true })
    const solutions = nav.getByRole('button', { name: 'Solutions', exact: true })
    await features.click()
    await expect(features).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#menu-features')).toBeVisible()
    await solutions.click()
    await expect(features).toHaveAttribute('aria-expanded', 'false')
    await expect(solutions).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(solutions).toHaveAttribute('aria-expanded', 'false')
    await features.click()
    await page.mouse.click(700, 600)
    await expect(features).toHaveAttribute('aria-expanded', 'false')
  })

  test('opens on hover and the panel stays inside the viewport', async ({ page }) => {
    await open(page, '/')
    const nav = page.getByRole('navigation', { name: 'Main' })
    for (const name of ['Features', 'Solutions', 'Resources'] as const) {
      await nav.getByRole('button', { name, exact: true }).hover()
      const panel = page.locator(`#menu-${name.toLowerCase()}`)
      await expect(panel).toBeVisible()
      const box = await panel.boundingBox()
      const vw = page.viewportSize()!.width
      expect(box!.x, `${name} panel left edge`).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width, `${name} panel right edge`).toBeLessThanOrEqual(vw)
    }
  })

  test('mouse: hovering a menu opens it and clicking its button keeps it open (no toggle-shut)', async ({ page }) => {
    await open(page, '/')
    const nav = page.getByRole('navigation', { name: 'Main' })
    for (const group of ['Features', 'Solutions', 'Resources'] as const) {
      const button = nav.getByRole('button', { name: group, exact: true })
      await button.hover()
      await expect(button, group + ' opens on hover').toHaveAttribute('aria-expanded', 'true')
      await button.click()
      await expect(button, group + ' stays open after the click that follows the hover').toHaveAttribute('aria-expanded', 'true')
      await button.click()
      await expect(button, group + ' closes on a second click').toHaveAttribute('aria-expanded', 'false')
      await page.mouse.move(700, 600)
    }
  })

  test('keyboard: Tab reaches the skip link first, then the menu buttons; Enter opens a menu', async ({ page }) => {
    await open(page, '/')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#main$/)
    await open(page, '/')
    const features = page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Features', exact: true })
    await features.focus()
    await page.keyboard.press('Enter')
    await expect(features).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Tab')
    await expect(page.locator('#menu-features a').first()).toBeFocused()
  })
})

test.describe('mobile drawer behaviour', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, 'mobile / tablet drawer only')

  test('opens, locks page scroll, closes with the button and with Escape', async ({ page }) => {
    await open(page, '/')
    const button = page.getByRole('button', { name: /menu/i })
    await button.click()
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
    await page.getByRole('button', { name: 'Close menu' }).click()
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toHaveCount(0)
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
    await button.click()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toHaveCount(0)
  })

  test('drawer fits the screen and every link is a comfortable tap target', async ({ page }) => {
    await open(page, '/')
    await page.getByRole('button', { name: 'Open menu' }).click()
    const nav = page.getByRole('navigation', { name: 'Mobile' })
    const box = await nav.boundingBox()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width)
    const sizes = await nav.locator('a, button').evaluateAll((els) => els.filter((e) => (e as HTMLElement).offsetParent !== null).map((e) => ({ t: (e.textContent ?? '').trim().slice(0, 30), h: e.getBoundingClientRect().height })))
    for (const s of sizes) expect(s.h, `"${s.t}" is ${Math.round(s.h)}px tall`).toBeGreaterThanOrEqual(40)
  })

  test('menu closes after navigating and the new page is shown', async ({ page }) => {
    await open(page, '/')
    await clickNavLink(page, 'Pricing')
    await expect(page).toHaveURL(/\/pricing\/$/)
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toHaveCount(0)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('plans')
  })
})
