import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from '@playwright/test'
import { clickNavLink, collectIssues, isDesktopNav, open, ROUTES } from './helpers'

/**
 * The floating WhatsApp button (+91 70900 06577). Runs at 390, 768 and 1440 px.
 * It is mounted once in SiteLayout, so it must be on every public page exactly once, fixed in the corner, above content and below the menus.
 */
const WHATSAPP_URL = 'https://wa.me/917090006577?text=Hello%20LocalPOS%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20billing%20software.'
const BUTTON = 'a[aria-label="Contact LocalPOS on WhatsApp"]'

/** Desktop (>= 1024 px): 64 px, 28 px from the right and bottom. Smaller screens: 56 px, 18 px. */
const expected = (page: import('@playwright/test').Page) => (isDesktopNav(page) ? { size: 64, gap: 28 } : { size: 56, gap: 18 })

test.describe('WhatsApp button is on every public page, exactly once, with the right link', () => {
  for (const route of [...ROUTES, '/this-page-does-not-exist/']) {
    test(`${route}`, async ({ page }) => {
      const issues = collectIssues(page)
      await open(page, route)
      const button = page.locator(BUTTON)
      await expect(button, 'WhatsApp buttons on the page').toHaveCount(1)
      await expect(button).toBeVisible()
      await expect(button).toHaveAttribute('href', WHATSAPP_URL)
      await expect(button).toHaveAttribute('target', '_blank')
      expect(((await button.getAttribute('rel')) ?? '').split(/\s+/).sort()).toEqual(['noopener', 'noreferrer'])
      await expect(page.locator('a[href*="wa.me"]'), 'any WhatsApp links at all').toHaveCount(1)
      expect(issues.filter((i) => !/404/.test(i))).toEqual([])
    })
  }
})

test.describe('WhatsApp button behaviour', () => {
  test('number and pre-filled message are exactly the ones supplied', async ({ page }) => {
    await open(page, '/')
    const url = new URL((await page.locator(BUTTON).getAttribute('href'))!)
    expect(url.origin + url.pathname).toBe('https://wa.me/917090006577') // +91 70900 06577, digits only
    expect(url.searchParams.get('text')).toBe('Hello LocalPOS Team, I would like to know more about your billing software.')
    expect([...url.searchParams.keys()]).toEqual(['text']) // nothing else, in particular nothing that would send it automatically
  })

  test('stays fixed in the corner while scrolling, at the specified size and offsets', async ({ page }) => {
    await open(page, '/')
    const { size, gap } = expected(page)
    const vp = page.viewportSize()!
    const rect = async () => (await page.locator(BUTTON).boundingBox())!
    const check = async (label: string) => {
      const b = await rect()
      expect(Math.round(b.width), `${label}: width`).toBe(size)
      expect(Math.round(b.height), `${label}: height`).toBe(size)
      expect(Math.round(vp.width - (b.x + b.width)), `${label}: distance from the right edge`).toBe(gap)
      expect(Math.round(vp.height - (b.y + b.height)), `${label}: distance from the bottom edge`).toBe(gap)
    }
    await check('at the top')
    await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'instant' as ScrollBehavior }))
    await check('after scrolling down')
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' as ScrollBehavior }))
    await check('at the bottom of the page')
    const style = await page.locator(BUTTON).evaluate((el) => {
      const s = getComputedStyle(el)
      return { position: s.position, radius: s.borderRadius, bg: s.backgroundColor, z: s.zIndex, cursor: s.cursor }
    })
    expect(style).toMatchObject({ position: 'fixed', bg: 'rgb(37, 211, 102)', z: '20', cursor: 'pointer' })
    expect(parseFloat(style.radius), 'a perfect circle').toBeGreaterThanOrEqual(size / 2)
  })

  test('is above page content and not covered by anything', async ({ page }) => {
    await open(page, '/')
    const top = await page.locator(BUTTON).evaluate((el) => {
      const r = el.getBoundingClientRect()
      const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)
      return !!hit && (hit === el || el.contains(hit))
    })
    expect(top, 'the button is the top element at its own centre').toBe(true)
  })

  test('the footer text can scroll clear of the button at the end of every page size', async ({ page }) => {
    await open(page, '/')
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' as ScrollBehavior }))
    const b = (await page.locator(BUTTON).boundingBox())!
    const lastLine = (await page.locator('footer p').last().boundingBox())!
    const overlap = lastLine.x < b.x + b.width && lastLine.x + lastLine.width > b.x && lastLine.y < b.y + b.height && lastLine.y + lastLine.height > b.y
    expect(overlap, `footer's last line ${JSON.stringify(lastLine)} vs button ${JSON.stringify(b)}`).toBe(false)
  })

  test('never covers the mobile menu or the desktop dropdowns', async ({ page }) => {
    await open(page, '/')
    if (isDesktopNav(page)) {
      // The header and its dropdown panels (z-40 / z-50) must sit above the button.
      await page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Features', exact: true }).click()
      const stack = await page.evaluate(() => {
        const z = (sel: string) => Number(getComputedStyle(document.querySelector(sel)!).zIndex)
        return { button: z('a[aria-label="Contact LocalPOS on WhatsApp"]'), header: z('header') }
      })
      expect(stack.button).toBeLessThan(stack.header)
    } else {
      await page.getByRole('button', { name: 'Open menu' }).click()
      const nav = page.getByRole('navigation', { name: 'Mobile' })
      await expect(nav).toBeVisible()
      const covered = await page.locator(BUTTON).evaluate((el) => {
        const r = el.getBoundingClientRect()
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)
        return !!hit && !el.contains(hit) // something else (the open menu) is on top
      })
      expect(covered, 'the open mobile menu is above the button').toBe(true)
      await page.getByRole('button', { name: 'Close menu' }).click()
    }
  })

  test('tooltip "Chat with LocalPOS": shown on desktop hover and keyboard focus, never on phones and tablets', async ({ page }) => {
    await open(page, '/')
    const tip = page.getByText('Chat with LocalPOS', { exact: true })
    if (isDesktopNav(page)) {
      await expect(tip).toHaveCSS('opacity', '0') // hidden until hovered
      await page.locator(BUTTON).hover()
      await expect(tip).toHaveCSS('opacity', '1')
      await page.mouse.move(5, 5)
      await expect(tip).toHaveCSS('opacity', '0')
      await page.locator(BUTTON).focus()
      await page.keyboard.press('Shift+Tab') // moves focus away and back is covered below; here we only need focus-visible via keyboard
      await page.keyboard.press('Tab')
      await expect(tip).toHaveCSS('opacity', '1')
    } else {
      await expect(tip, 'tooltip is not displayed below 1024 px').toBeHidden()
    }
  })

  test('keyboard: reachable with Tab, has a visible focus ring, label names it', async ({ page }) => {
    await open(page, '/')
    await expect(page.getByRole('link', { name: 'Contact LocalPOS on WhatsApp' })).toHaveCount(1)
    const focused = page.locator(BUTTON)
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press('Tab')
      if (await focused.evaluate((el) => el === document.activeElement)) break
    }
    await expect(focused).toBeFocused()
    const ring = await focused.evaluate((el) => {
      const s = getComputedStyle(el)
      return { style: s.outlineStyle, width: parseFloat(s.outlineWidth) }
    })
    expect(ring.style).not.toBe('none')
    expect(ring.width).toBeGreaterThanOrEqual(2)
  })

  test('reduced motion: no hover scaling or transition', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await open(page, '/')
    if (isDesktopNav(page)) await page.locator(BUTTON).hover()
    const { transform, transition } = await page.locator(BUTTON).evaluate((el) => ({ transform: getComputedStyle(el).transform, transition: getComputedStyle(el).transitionProperty }))
    expect(transform).toBe('none')
    expect(transition).toBe('none')
  })

  test('no looping animation (an endless animation keeps the browser busy)', async ({ page }) => {
    await open(page, '/')
    const running = await page.locator(BUTTON).evaluate((el) => [el, ...el.querySelectorAll('*')].flatMap((e) => e.getAnimations()).filter((a) => a.effect?.getComputedTiming().iterations === Infinity).length)
    expect(running).toBe(0)
  })

  test('no duplicate button after client-side navigation, and it is still the only one', async ({ page }) => {
    await open(page, '/')
    for (const [link, url] of [['Pricing', /\/pricing\/$/], ['About Us', /\/about-us\/$/]] as const) {
      await clickNavLink(page, link)
      await expect(page).toHaveURL(url)
      await expect(page.locator(BUTTON)).toHaveCount(1)
    }
    await page.goBack()
    await page.goForward()
    await expect(page.locator(BUTTON)).toHaveCount(1)
    await expect(page.locator('a[href*="wa.me"]')).toHaveCount(1)
  })

  test('clicking opens WhatsApp in a NEW tab with the message pre-filled, and leaves this page where it is', async ({ page, context }) => {
    // The request is answered here, so nothing is sent to WhatsApp and no message can be sent.
    await context.route('https://wa.me/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>wa.me stub</title>' }))
    await open(page, '/')
    const before = page.url()
    const [popup] = await Promise.all([context.waitForEvent('page'), page.locator(BUTTON).click()])
    await popup.waitForLoadState('domcontentloaded')
    expect(popup.url()).toBe(WHATSAPP_URL)
    expect(page.url(), 'this tab did not navigate').toBe(before)
    expect(await popup.evaluate(() => window.opener), 'noopener: the new tab has no handle on this one').toBeNull()
  })

  test('safe-area insets are in the stylesheet (so the button clears the home indicator on notched phones)', () => {
    const dist = path.resolve(process.env.DIST_DIR ?? 'dist', 'assets')
    const css = fs.readdirSync(dist).filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(path.join(dist, f), 'utf8')).join('\n')
    expect(css).toContain('env(safe-area-inset-bottom)')
    expect(css).toContain('env(safe-area-inset-right)')
  })
})
