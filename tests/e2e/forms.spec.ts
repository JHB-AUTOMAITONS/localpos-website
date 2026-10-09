import { expect, test, type Page } from '@playwright/test'
import { collectIssues, open } from './helpers'

/**
 * Form tests run against the Vite dev server started with VITE_LEAD_ENDPOINT=https://leads.test/submit.
 * That endpoint is intercepted in the browser, so no real network or backend is involved.
 */
const DEV = `http://localhost:${process.env.E2E_DEV_PORT ?? 4521}`
const PROD = `http://localhost:${process.env.E2E_PORT ?? 4520}`
test.use({ baseURL: DEV })

type Reply = { status?: number; delay?: number; abort?: boolean }
async function mockLeads(page: Page, reply: (n: number) => Reply = () => ({ status: 200 })) {
  const posts: Array<Record<string, string>> = []
  await page.route('https://leads.test/**', async (route) => {
    const req = route.request()
    const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'POST, OPTIONS' }
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors })
    posts.push(JSON.parse(req.postData() ?? '{}'))
    const r = reply(posts.length)
    if (r.delay) await new Promise((res) => setTimeout(res, r.delay))
    if (r.abort) return route.abort('failed')
    return route.fulfill({ status: r.status ?? 200, headers: { ...cors, 'content-type': 'application/json' }, body: '{}' })
  })
  return posts
}

const demoSubmit = (page: Page) => page.getByRole('button', { name: /Request my free demo|Sending/ })
async function fillDemo(page: Page, o: Partial<Record<string, string>> = {}) {
  const v = { businessType: 'Retail shop', name: 'Anita Sharma', phone: '98765 43210', email: 'anita@example.com', company: 'Sunrise Stores', size: '1 store', message: 'Please show barcode billing.', ...o }
  await page.getByLabel('Business type').selectOption(v.businessType)
  await page.getByLabel('Your name').fill(v.name)
  await page.getByLabel('Phone number').fill(v.phone)
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill(v.email)
  await page.getByLabel('Business name').fill(v.company)
  await page.getByLabel('Number of stores').selectOption(v.size)
  await page.getByLabel(/Anything we should know/).fill(v.message)
}

test.describe('Book a Demo form', () => {
  test('valid submission sends the right JSON and shows the success state', async ({ page }) => {
    const issues = collectIssues(page)
    const posts = await mockLeads(page)
    await open(page, '/book-a-demo/')
    await fillDemo(page)
    await demoSubmit(page).click()
    await expect(page.getByText('Your demo request is in')).toBeVisible()
    expect(posts).toHaveLength(1)
    expect(posts[0]).toMatchObject({ form: 'book-a-demo', businessType: 'Retail shop', name: 'Anita Sharma', phone: '98765 43210', email: 'anita@example.com', company: 'Sunrise Stores', size: '1 store', message: 'Please show barcode billing.' })
    await expect(page.getByText(/Preview mode/)).toHaveCount(0) // a real endpoint is configured here
    expect(issues.filter((i) => !i.includes('leads.test'))).toEqual([])
  })

  test('empty submit shows an error for every required field, focuses the first, and sends nothing', async ({ page }) => {
    const posts = await mockLeads(page)
    await open(page, '/book-a-demo/')
    await demoSubmit(page).click()
    for (const msg of ['Choose your business type.', 'Enter your name.', 'Enter your phone number.', 'Enter your email address.', 'Enter your business name.', 'Choose the number of stores.']) {
      await expect(page.getByText(msg)).toBeVisible()
    }
    await expect(page.getByLabel('Business type')).toBeFocused()
    expect(posts).toHaveLength(0)
  })

  for (const email of ['abc', 'a@b', 'a@b.c', 'a b@c.com', '@example.com']) {
    test(`invalid email "${email}" is rejected`, async ({ page }) => {
      const posts = await mockLeads(page)
      await open(page, '/book-a-demo/')
      await fillDemo(page, { email })
      await demoSubmit(page).click()
      await expect(page.getByText(/Enter a valid email address/)).toBeVisible()
      expect(posts).toHaveLength(0)
    })
  }

  for (const [phone, ok] of [
    ['12345', false],
    ['5123456789', false],
    ['98765 4321', false],
    ['abcdefghij', false],
    ['9876543210', true],
    ['98765 43210', true],
    ['98765-43210', true],
    ['+91 98765 43210', true],
    ['919876543210', true],
  ] as const) {
    test(`phone "${phone}" is ${ok ? 'accepted' : 'rejected'}`, async ({ page }) => {
      const posts = await mockLeads(page)
      await open(page, '/book-a-demo/')
      await fillDemo(page, { phone })
      await demoSubmit(page).click()
      if (ok) {
        await expect(page.getByText('Your demo request is in')).toBeVisible()
        expect(posts).toHaveLength(1)
      } else {
        await expect(page.getByText('Enter a 10-digit mobile number.')).toBeVisible()
        expect(posts).toHaveLength(0)
      }
    })
  }

  test('an error clears as soon as the field is corrected', async ({ page }) => {
    await open(page, '/book-a-demo/')
    const email = page.getByRole('textbox', { name: 'Email', exact: true })
    await email.fill('nope')
    await email.blur()
    await expect(page.getByText(/Enter a valid email address/)).toBeVisible()
    await email.fill('ok@example.com')
    await email.blur()
    await expect(page.getByText(/Enter a valid email address/)).toHaveCount(0)
  })

  test('very long input is limited by the fields, not sent as a giant payload', async ({ page }) => {
    const posts = await mockLeads(page)
    await open(page, '/book-a-demo/')
    await fillDemo(page, { name: 'N'.repeat(600), company: 'C'.repeat(600), message: 'M'.repeat(20000) })
    await demoSubmit(page).click()
    await expect(page.getByText('Your demo request is in')).toBeVisible()
    expect(posts[0].name.length).toBeLessThanOrEqual(120)
    expect(posts[0].company.length).toBeLessThanOrEqual(160)
    expect(posts[0].message.length).toBeLessThanOrEqual(2000)
  })

  test('special characters and markup are sent as plain text and never executed', async ({ page }) => {
    const issues = collectIssues(page)
    const posts = await mockLeads(page)
    const nasty = `<script>window.__xss=1</script> "quotes" & 'apostrophes' ₹ 🙂 நன்றி`
    await open(page, '/book-a-demo/')
    await fillDemo(page, { name: `O'Brien <b>& Sons</b>`, message: nasty })
    await demoSubmit(page).click()
    await expect(page.getByText('Your demo request is in')).toBeVisible()
    expect(posts[0].message).toBe(nasty)
    expect(posts[0].name).toBe(`O'Brien <b>& Sons</b>`)
    expect(await page.evaluate(() => (window as unknown as { __xss?: number }).__xss)).toBeUndefined()
    expect(issues.filter((i) => !i.includes('leads.test'))).toEqual([])
  })

  test('shows a loading state and disables the button while sending', async ({ page }) => {
    await mockLeads(page, () => ({ status: 200, delay: 900 }))
    await open(page, '/book-a-demo/')
    await fillDemo(page)
    await demoSubmit(page).click()
    const btn = page.getByRole('button', { name: /Sending/ })
    await expect(btn).toBeVisible()
    await expect(btn).toBeDisabled()
    await expect(page.getByText('Your demo request is in')).toBeVisible()
  })

  test('double submission is prevented (double-click and double Enter send one request)', async ({ page }) => {
    const posts = await mockLeads(page, () => ({ status: 200, delay: 800 }))
    await open(page, '/book-a-demo/')
    await fillDemo(page)
    await demoSubmit(page).dblclick()
    await page.waitForTimeout(100)
    await page.getByLabel('Your name').press('Enter').catch(() => undefined) // field may already be gone after success; that is fine
    await expect(page.getByText('Your demo request is in')).toBeVisible()
    expect(posts).toHaveLength(1)

    const posts2 = await mockLeads(page, () => ({ status: 200, delay: 800 }))
    await open(page, '/book-a-demo/')
    await fillDemo(page)
    await page.getByLabel('Your name').press('Enter')
    await page.getByLabel('Your name').press('Enter').catch(() => undefined)
    await expect(page.getByText('Your demo request is in')).toBeVisible()
    expect(posts2).toHaveLength(1)
  })

  test('server error shows a failure message, keeps what was typed, and a retry succeeds', async ({ page }) => {
    const posts = await mockLeads(page, (n) => ({ status: n === 1 ? 500 : 200 }))
    await open(page, '/book-a-demo/')
    await fillDemo(page)
    await demoSubmit(page).click()
    await expect(page.getByRole('alert')).toContainText('could not send your request')
    await expect(page.getByLabel('Your name')).toHaveValue('Anita Sharma')
    await expect(demoSubmit(page)).toBeEnabled()
    await demoSubmit(page).click()
    await expect(page.getByText('Your demo request is in')).toBeVisible()
    expect(posts).toHaveLength(2)
  })

  test('network failure shows the same failure message', async ({ page }) => {
    await mockLeads(page, () => ({ abort: true }))
    await open(page, '/book-a-demo/')
    await fillDemo(page)
    await demoSubmit(page).click()
    await expect(page.getByRole('alert')).toContainText('could not send your request')
  })

  test('honeypot: a bot that fills the hidden field gets a fake success and nothing is sent', async ({ page }) => {
    const posts = await mockLeads(page)
    await open(page, '/book-a-demo/')
    await fillDemo(page)
    await page.locator('input[name=website]').evaluate((el: HTMLInputElement) => {
      el.value = 'http://spam.example'
    })
    await demoSubmit(page).click()
    await expect(page.getByText('Your demo request is in')).toBeVisible()
    expect(posts).toHaveLength(0)
  })

  test('the hidden honeypot field is unreachable by keyboard and screen readers', async ({ page }) => {
    await open(page, '/book-a-demo/')
    const hp = page.locator('input[name=website]')
    await expect(hp).toHaveAttribute('tabindex', '-1')
    expect(await hp.evaluate((el) => !!el.closest('[aria-hidden="true"]'))).toBe(true)
  })
})

test.describe('Contact form', () => {
  test('valid submission (phone optional)', async ({ page }) => {
    const posts = await mockLeads(page)
    await open(page, '/contact-us/')
    await page.getByLabel('Your name').fill('Ravi Kumar')
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill('ravi@example.com')
    await page.getByLabel('What is this about?').selectOption('Pricing')
    await page.getByLabel('Message').fill('What does the multi-store plan include?')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(page.getByText('Your message is on its way')).toBeVisible()
    expect(posts[0]).toMatchObject({ form: 'contact-us', name: 'Ravi Kumar', email: 'ravi@example.com', topic: 'Pricing' })
  })

  test('validation: required fields, optional phone checked only when filled', async ({ page }) => {
    const posts = await mockLeads(page)
    await open(page, '/contact-us/')
    await page.getByRole('button', { name: 'Send message' }).click()
    for (const msg of ['Enter your name.', 'Enter your email address.', 'Choose what your message is about.', 'Enter your message.']) await expect(page.getByText(msg)).toBeVisible()
    await page.getByLabel('Your name').fill('Ravi')
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill('ravi@example.com')
    await page.getByLabel('What is this about?').selectOption('Pricing')
    await page.getByLabel('Message').fill('Hello')
    await page.getByLabel('Phone number').fill('123')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(page.getByText('Enter a 10-digit mobile number.')).toBeVisible()
    expect(posts).toHaveLength(0)
    await page.getByLabel('Phone number').fill('')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(page.getByText('Your message is on its way')).toBeVisible()
  })

  test('failure state and long message limit', async ({ page }) => {
    const posts = await mockLeads(page, (n) => ({ status: n === 1 ? 503 : 200 }))
    await open(page, '/contact-us/')
    await page.getByLabel('Your name').fill('Ravi')
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill('ravi@example.com')
    await page.getByLabel('What is this about?').selectOption('Something else')
    await page.getByLabel('Message').fill('x'.repeat(50000))
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(page.getByRole('alert')).toContainText('could not send')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(page.getByText('Your message is on its way')).toBeVisible()
    expect(posts[1].message.length).toBeLessThanOrEqual(2000)
  })
})

test.describe('without a lead endpoint (the production build as shipped)', () => {
  test('runs in clearly labelled preview mode and sends nothing anywhere', async ({ page }) => {
    const sent: string[] = []
    page.on('request', (r) => {
      if (r.method() === 'POST') sent.push(r.url())
    })
    await open(page, `${PROD}/book-a-demo/`)
    await fillDemo(page)
    await demoSubmit(page).click()
    await expect(page.getByText('Your demo request is in')).toBeVisible()
    await expect(page.getByText(/Preview mode: no form endpoint is configured/)).toBeVisible()
    expect(sent).toEqual([])
  })
})
