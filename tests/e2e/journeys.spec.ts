import { expect, test, type Page } from '@playwright/test'
import { clickBookDemo, clickNavLink, collectIssues, expectNoOverflow, FEATURE_NAV, open, openNavGroup, scrollThrough, SOLUTION_NAV } from './helpers'

const logo = (page: Page) => page.getByRole('banner').getByRole('link', { name: /LocalPOS home/ })

test.describe('user journeys (run at 390 mobile, 768 tablet and 1440 desktop)', () => {
  test('TEST 1 homepage: scroll, Features, back, Solutions, back, Pricing, Book a Demo', async ({ page }) => {
    const issues = collectIssues(page)
    await open(page, '/')
    await scrollThrough(page)
    await expectNoOverflow(page)

    const features = await openNavGroup(page, 'Features')
    await features.getByRole('link', { name: FEATURE_NAV[0][0] }).first().click()
    await expect(page).toHaveURL(/\/features\/pos-billing-software\/$/)
    await logo(page).click()
    await expect(page).toHaveURL(/\/$/)

    const solutions = await openNavGroup(page, 'Solutions')
    await solutions.getByRole('link', { name: SOLUTION_NAV[0][0] }).first().click()
    await expect(page).toHaveURL(/\/solutions\/retail-billing-software\/$/)
    await logo(page).click()

    await clickNavLink(page, 'Pricing')
    await expect(page).toHaveURL(/\/pricing\/$/)
    await clickBookDemo(page)
    await expect(page).toHaveURL(/\/book-a-demo\/$/)
    await expect(page.getByRole('button', { name: /Request my free demo/ })).toBeVisible()
    expect(issues).toEqual([])
  })

  test('TEST 2 feature: Home → Features → POS Billing → scroll → related feature → CTA → Book Demo', async ({ page }) => {
    const issues = collectIssues(page)
    await open(page, '/')
    const nav = await openNavGroup(page, 'Features')
    await nav.getByRole('link', { name: FEATURE_NAV[0][0] }).first().click()
    await expect(page).toHaveURL(/pos-billing-software\/$/)
    await scrollThrough(page)
    await expectNoOverflow(page)

    const related = page.locator('section[aria-labelledby="related-heading"]').getByRole('link').first()
    await related.scrollIntoViewIfNeeded()
    const target = await related.getAttribute('href')
    await related.click()
    await expect(page).toHaveURL(new RegExp(`${target!.replace(/\//g, '\\/')}$`))
    expect(target).toMatch(/^\/features\//)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    const cta = page.locator('section[aria-labelledby="cta-heading"]')
    await cta.scrollIntoViewIfNeeded()
    await cta.getByRole('link', { name: 'Book a Free Demo' }).click()
    await expect(page).toHaveURL(/\/book-a-demo\/$/)
    expect(issues).toEqual([])
  })

  for (const [label, path] of SOLUTION_NAV) {
    test(`TEST 3 solution: Home → Solutions → ${label} → related features → Book Demo`, async ({ page }) => {
      const issues = collectIssues(page)
      await open(page, '/')
      const nav = await openNavGroup(page, 'Solutions')
      await nav.getByRole('link', { name: label }).first().click()
      await expect(page).toHaveURL(new RegExp(`${path.replace(/\//g, '\\/')}$`))
      await scrollThrough(page)
      await expectNoOverflow(page)

      const related = page.locator('section[aria-labelledby="related-heading"]').getByRole('link').first()
      await related.scrollIntoViewIfNeeded()
      await related.click()
      await expect(page).toHaveURL(/\/features\/[a-z-]+\/$/)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

      await page.goBack()
      await expect(page).toHaveURL(new RegExp(`${path.replace(/\//g, '\\/')}$`))
      const cta = page.locator('section[aria-labelledby="cta-heading"]')
      await cta.scrollIntoViewIfNeeded()
      await cta.getByRole('link', { name: 'Book a Free Demo' }).click()
      await expect(page).toHaveURL(/\/book-a-demo\/$/)
      expect(issues).toEqual([])
    })
  }

  test('TEST 4/5/6 viewport tour: hero, product tabs, feature grid, solutions, FAQ, footer on the home page', async ({ page }) => {
    const issues = collectIssues(page)
    await open(page, '/')
    await expect(page.getByRole('heading', { level: 1 })).toBeInViewport()
    await expect(page.getByRole('main').getByRole('link', { name: /Book a Free Demo/ }).first()).toBeInViewport()

    // Product overview tabs: every tab shows its own panel and screen.
    await page.locator('#explore').scrollIntoViewIfNeeded()
    const tabs = page.getByRole('tab')
    expect(await tabs.count()).toBe(7)
    for (let i = 0; i < 7; i++) {
      await tabs.nth(i).click()
      await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true')
      const panel = page.locator(`[role=tabpanel]:not([hidden])`)
      await expect(panel).toHaveCount(1)
      await expect(panel.getByRole('img').first()).toBeVisible()
      await expectNoOverflow(page)
    }

    // Feature grid and solution cards link to real pages.
    const featureLinks = page.locator('section[aria-labelledby="feature-grid-heading"] a[href^="/features/"]')
    expect(await featureLinks.count()).toBe(10)
    const solutionLinks = page.locator('section[aria-labelledby="solutions-heading"] a[href^="/solutions/"]')
    expect(await solutionLinks.count()).toBe(5)

    // FAQ opens and closes.
    const faq = page.locator('#faq details').first()
    await faq.scrollIntoViewIfNeeded()
    await faq.locator('summary').click()
    await expect(faq).toHaveAttribute('open', '')
    await faq.locator('summary').click()
    await expect(faq).not.toHaveAttribute('open', '')

    // Footer links work from the bottom of the page.
    await page.locator('footer').scrollIntoViewIfNeeded()
    await page.locator('footer').getByRole('link', { name: 'Privacy Policy' }).click()
    await expect(page).toHaveURL(/\/privacy-policy\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy Policy')
    expect(issues).toEqual([])
  })

  test('browser Back/Forward keep working across client-side navigation', async ({ page }) => {
    await open(page, '/')
    await clickNavLink(page, 'Pricing')
    await expect(page).toHaveURL(/pricing/)
    await clickNavLink(page, 'About Us')
    await expect(page).toHaveURL(/about-us/)
    await page.goBack()
    await expect(page).toHaveURL(/pricing/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('plans')
    await page.goForward()
    await expect(page).toHaveURL(/about-us/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('notebook')
    await expect(page).toHaveTitle(/About Us/)
  })
})
