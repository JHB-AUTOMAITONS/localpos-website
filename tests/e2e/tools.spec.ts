import { expect, test, type Page } from '@playwright/test'
import fs from 'node:fs'
import { open } from './helpers'

/**
 * The free tools and the business-format templates: the arithmetic is right, the documents are produced, and the
 * generators and scanners agree with each other (a code made by one is read back by the other).
 */
const tool = (page: Page) => page.locator('#tool')

async function download(page: Page, action: () => Promise<unknown>): Promise<{ name: string; path: string; bytes: Buffer }> {
  const [d] = await Promise.all([page.waitForEvent('download'), action()])
  // Keep our own copy: the browser's temporary file does not outlive the page that made it.
  const path = test.info().outputPath(`${Date.now()}-${d.suggestedFilename()}`)
  await d.saveAs(path)
  return { name: d.suggestedFilename(), path, bytes: fs.readFileSync(path) }
}
const isZip = (b: Buffer) => b.subarray(0, 4).toString('latin1') === 'PK\u0003\u0004'
const isPng = (b: Buffer) => b.subarray(1, 4).toString('latin1') === 'PNG'

test.describe('GST calculator', () => {
  test('adds and removes GST, and splits it correctly', async ({ page }) => {
    await open(page, '/gst-calculator/')
    const t = tool(page)
    const row = (label: string) => t.locator('dl > div', { hasText: label }).locator('dd')
    // Default: add 18% to 1,000 within one state.
    await expect(row('Total GST')).toHaveText('₹180.00')
    await expect(row('CGST at 9%')).toHaveText('₹90.00')
    await expect(row('SGST at 9%')).toHaveText('₹90.00')
    await expect(row('Amount including GST')).toHaveText('₹1,180.00')

    // Remove 5% from 500: 500 x 100 / 105 = 476.19, tax 23.81, halves 11.91 + 11.90.
    await t.getByRole('button', { name: 'Remove GST' }).click()
    await t.getByLabel('Amount including GST (₹)').fill('500')
    await t.getByRole('button', { name: '5%', exact: true }).click()
    await expect(row('Amount before GST')).toHaveText('₹476.19')
    await expect(row('Total GST')).toHaveText('₹23.81')
    await expect(row('CGST at 2.5%')).toHaveText('₹11.91')
    await expect(row('SGST at 2.5%')).toHaveText('₹11.90')

    await t.getByRole('button', { name: /IGST/ }).click()
    await expect(row('IGST at 5%')).toHaveText('₹23.81')

    // A custom rate, a large amount (Indian digit grouping) and junk input.
    await t.getByRole('button', { name: 'Add GST' }).click()
    await t.getByLabel('Amount before GST (₹)').fill('125000')
    await t.getByLabel('Or type another rate (%)').fill('1.5')
    await expect(row('Total GST')).toHaveText('₹1,875.00')
    await expect(row('Amount including GST')).toHaveText('₹1,26,875.00')
    await t.getByLabel('Amount before GST (₹)').fill('abc')
    await expect(row('Amount including GST')).toHaveText('₹0.00')
  })
})

test.describe('document tools', () => {
  test('invoice generator: totals, tax split, round-off, amount in words, and Excel / Word files', async ({ page }) => {
    await open(page, '/invoice-generator/')
    const t = tool(page)
    const sheet = t.locator('[data-print-area]')
    const total = (label: string) => sheet.locator('tfoot tr', { hasText: label }).locator('td')
    // Sample: 4 x 1,900 at 5%, and 10 x 220 less 5% at 18%.
    await expect(total('Subtotal')).toHaveText('9,800.00')
    await expect(total('Discount')).toHaveText('110.00')
    await expect(total('Taxable value')).toHaveText('9,690.00')
    await expect(total('CGST')).toHaveText('378.10')
    await expect(total('SGST')).toHaveText('378.10')
    await expect(total('Round off')).toHaveText('-0.20')
    await expect(total('Grand total')).toHaveText('10,446.00')
    await expect(sheet).toContainText('Rupees Ten Thousand Four Hundred Forty Six Only')
    await expect(sheet).toContainText('Tax Invoice')

    // IGST shows one tax line; No GST drops the tax and the "Tax" from the title.
    await t.getByRole('button', { name: 'IGST', exact: true }).click()
    await expect(total('IGST')).toHaveText('756.20')
    await t.getByRole('button', { name: 'No GST' }).click()
    await expect(sheet.locator('tfoot')).not.toContainText('GST')
    await expect(total('Total (₹)')).toHaveText('9,690.00')
    await expect(sheet).not.toContainText('Tax Invoice')

    // Edit a line, add one, remove one.
    await t.getByRole('button', { name: 'CGST + SGST' }).click()
    await t.getByRole('button', { name: 'Add item' }).click()
    const third = t.locator('ol > li').nth(2)
    await third.getByLabel('Description').fill('Delivery charge')
    await third.getByLabel('Rate (₹)').fill('100')
    await expect(sheet.locator('tbody tr')).toHaveCount(3)
    await expect(total('Taxable value')).toHaveText('9,790.00')
    await t.getByRole('button', { name: 'Remove item 3' }).click()
    await expect(sheet.locator('tbody tr')).toHaveCount(2)

    const xlsx = await download(page, () => t.getByRole('button', { name: 'Excel (.xlsx)' }).click())
    expect(xlsx.name).toBe('invoice-INV-26-27-001.xlsx')
    expect(isZip(xlsx.bytes)).toBe(true)
    expect(xlsx.bytes.toString('latin1')).toContain('xl/worksheets/sheet1.xml')
    const docx = await download(page, () => t.getByRole('button', { name: 'Word (.docx)' }).click())
    expect(docx.name).toBe('invoice-INV-26-27-001.docx')
    expect(isZip(docx.bytes)).toBe(true)
    expect(docx.bytes.toString('utf8')).toContain('Sri Lakshmi Traders')
    if (process.env.KEEP_DOWNLOADS) {
      fs.copyFileSync(xlsx.path, `${process.env.KEEP_DOWNLOADS}/invoice.xlsx`)
      fs.copyFileSync(docx.path, `${process.env.KEEP_DOWNLOADS}/invoice.docx`)
    }

    // Clearing the form empties the document and puts today's date in.
    await t.getByRole('button', { name: 'Clear the form' }).click()
    await expect(sheet).not.toContainText('Sri Lakshmi Traders')
    await expect(t.getByLabel('Invoice date')).not.toHaveValue('')
  })

  for (const [route, title, extra] of [
    ['/quotation-maker/', 'Quotation', 'Valid until'],
    ['/proforma-invoice-generator/', 'Proforma Invoice', 'This is a proforma invoice and not a tax invoice.'],
    ['/purchase-order-generator/', 'Purchase Order', 'Supplier’s acceptance'],
  ] as const) {
    test(`${route} builds a ${title}`, async ({ page }) => {
      await open(page, route)
      const t = tool(page)
      const sheet = t.locator('[data-print-area]')
      await expect(sheet.locator('p').first()).toHaveText(title)
      if (extra === 'Valid until') {
        await t.getByLabel('Valid until').fill('2026-12-31')
        await expect(sheet).toContainText('31 Dec 2026')
      } else await expect(sheet).toContainText(extra)
      await expect(sheet.locator('tfoot tr', { hasText: 'Grand total' }).locator('td')).toHaveText('10,446.00')
    })
  }

  test('receipt maker: amount in words follows the amount, optional lines appear only when filled', async ({ page }) => {
    await open(page, '/receipt-maker/')
    const t = tool(page)
    const sheet = t.locator('[data-print-area]')
    await expect(sheet).toContainText('Rupees Five Thousand Only')
    await t.getByLabel('Amount (₹)').fill('125750.50')
    await expect(sheet).toContainText('1,25,750.50')
    await expect(sheet).toContainText('Rupees One Lakh Twenty Five Thousand Seven Hundred Fifty and Fifty Paise Only')
    await t.getByLabel('Payment method').selectOption('Cheque')
    await t.getByLabel('Cheque no. and bank').fill('004512, State Bank')
    await expect(sheet).toContainText('004512, State Bank')
    await t.getByLabel('Balance due (₹)').fill('')
    await expect(sheet).not.toContainText('Balance due')
    await t.getByLabel('Amount (₹)').fill('0')
    await expect(t.getByText('Enter an amount greater than zero')).toBeVisible()
  })

  test('printing a document page prints the document alone', async ({ page }) => {
    await open(page, '/invoice-generator/')
    await page.emulateMedia({ media: 'print' })
    await expect(page.locator('[data-print-area]')).toBeVisible()
    await expect(page.getByRole('banner')).toBeHidden()
    await expect(page.getByRole('contentinfo')).toBeHidden()
    await expect(page.locator('h1')).toBeHidden()
    await expect(page.locator('#tool form')).toBeHidden()
    const box = (await page.locator('[data-print-area]').boundingBox())!
    expect(box.y, 'the sheet starts at the top of the paper').toBeLessThan(40)
  })
})

test.describe('format templates', () => {
  test('invoice formats: tabs, blank version, downloads and print', async ({ page }) => {
    await open(page, '/invoice-formats/')
    const t = tool(page)
    const sheet = t.locator('[data-print-area]')
    await expect(sheet).toHaveCount(1)
    await expect(sheet).toContainText('13,978.00')
    // Every template is in the HTML, only one is shown.
    await expect(t.getByText('Bright Stationery Mart').first()).toBeHidden()
    await t.getByRole('button', { name: 'Retail bill' }).click()
    await expect(sheet).toContainText('Bright Stationery Mart')
    await expect(sheet).not.toContainText('13,978.00')

    await t.getByRole('button', { name: 'Blank', exact: true }).click()
    await expect(sheet).not.toContainText('Bright Stationery Mart')
    await expect(sheet).toContainText('Your business name')
    await expect(sheet.locator('tbody tr')).toHaveCount(8)
    const blank = await download(page, () => t.getByRole('button', { name: 'Excel (.xlsx)' }).click())
    expect(blank.name).toBe('retail-invoice-format-blank.xlsx')

    await t.getByRole('button', { name: 'With sample' }).click()
    const docx = await download(page, () => t.getByRole('button', { name: 'Word (.docx)' }).click())
    expect(docx.name).toBe('retail-invoice-format.docx')
    expect(isZip(docx.bytes)).toBe(true)
    if (process.env.KEEP_DOWNLOADS) {
      fs.copyFileSync(blank.path, `${process.env.KEEP_DOWNLOADS}/blank.xlsx`)
      fs.copyFileSync(docx.path, `${process.env.KEEP_DOWNLOADS}/retail.docx`)
    }

    await page.emulateMedia({ media: 'print' })
    await expect(sheet).toBeVisible()
    await expect(page.getByRole('banner')).toBeHidden()
    await expect(t.getByRole('button', { name: 'Word (.docx)' })).toBeHidden()
  })
})

test.describe('QR codes and barcodes: what the generators make, the scanners read', () => {
  test('QR code generator makes a code for each content type; the scanner reads it back from the image', async ({ page }, info) => {
    await open(page, '/qr-code-generator/')
    const t = tool(page)
    await t.getByLabel('Link (URL)').fill('example.com/menu?table=4')
    const link = await download(page, () => t.getByRole('button', { name: 'Download PNG' }).click())
    expect(isPng(link.bytes)).toBe(true)
    const svg = await download(page, () => t.getByRole('button', { name: 'Download SVG' }).click())
    expect(svg.bytes.toString('utf8')).toMatch(/^<svg xmlns/)

    await t.getByRole('button', { name: 'UPI' }).click()
    await expect(t.getByRole('button', { name: 'Download PNG' })).toBeDisabled()
    await t.getByLabel('UPI ID').fill('not a upi id')
    await expect(t.getByText('does not look like a UPI ID')).toBeVisible()
    await t.getByLabel('UPI ID').fill('lakshmitraders@okbank')
    await t.getByLabel('Payee name').fill('Sri Lakshmi Traders')
    await t.getByLabel('Amount (₹)').fill('250')
    const upi = await download(page, () => t.getByRole('button', { name: 'Download PNG' }).click())

    await t.getByRole('button', { name: 'Wi-Fi' }).click()
    await t.getByLabel('Network name (SSID)').fill('Shop Guest; 5G')
    await t.getByLabel('Password').fill('p@ss:word')
    const wifi = await download(page, () => t.getByRole('button', { name: 'Download PNG' }).click())

    await t.getByRole('button', { name: 'Text' }).click()
    await t.getByLabel('Text').fill('नमस्ते ₹500 only')
    const text = await download(page, () => t.getByRole('button', { name: 'Download PNG' }).click())
    // Far more than a QR code can hold: a clear message, no download.
    await t.getByLabel('Text').fill('x'.repeat(4000))
    await expect(t.getByText('too much content for one QR code')).toBeVisible()
    await expect(t.getByRole('button', { name: 'Download PNG' })).toBeDisabled()

    await open(page, '/qr-code-scanner/')
    const s = tool(page)
    const out = s.getByTestId('scan-output')
    const choose = async (file: string) => s.locator('input[type=file]').setInputFiles(file)
    await choose(link.path)
    await expect(out).toHaveText('https://example.com/menu?table=4')
    await expect(s.getByText('QR code found: Link')).toBeVisible()
    await expect(s.getByRole('link', { name: 'Open link' })).toHaveAttribute('href', 'https://example.com/menu?table=4')
    await choose(upi.path)
    await expect(out).toHaveText('upi://pay?pa=lakshmitraders%40okbank&pn=Sri%20Lakshmi%20Traders&am=250.00&cu=INR')
    await expect(s.locator('dl')).toContainText('lakshmitraders@okbank')
    await expect(s.locator('dl')).toContainText('₹250.00')
    await choose(wifi.path)
    await expect(s.locator('dl')).toContainText('Shop Guest; 5G')
    await expect(s.locator('dl')).toContainText('p@ss:word')
    await choose(text.path)
    await expect(out).toHaveText('नमस्ते ₹500 only')

    // Copy puts the content on the clipboard.
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
    await s.getByRole('button', { name: 'Copy' }).click()
    await expect(s.getByRole('button', { name: 'Copied' })).toBeVisible()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('नमस्ते ₹500 only')

    // A file that is not an image, and an image with no code in it.
    const notImage = info.outputPath('notes.txt')
    fs.writeFileSync(notImage, 'hello')
    await choose(notImage)
    await expect(s.getByText('That file is not an image')).toBeVisible()
    await choose('public/logo-512.png')
    await expect(s.getByText('No QR code was found in this image')).toBeVisible()
    const broken = info.outputPath('broken.png')
    fs.writeFileSync(broken, 'not really a png')
    await choose(broken)
    await expect(s.getByText('This image could not be opened')).toBeVisible()
  })

  test('barcode generator validates each format; the scanner reads every one of them back', async ({ page }) => {
    await open(page, '/barcode-generator/')
    const t = tool(page)
    const value = t.getByLabel('Barcode value')
    const type = t.getByLabel('Barcode type')
    const made: Array<{ path: string; expected: string; format: string }> = []
    for (const [format, input, expected, name] of [
      ['CODE128', 'SKU-10245/a', 'SKU-10245/a', 'Code 128'],
      ['EAN13', '890123456789', '8901234567890', 'EAN-13'],
      ['EAN8', '8901234', '89012345', 'EAN-8'],
      ['UPC', '03600029145', '036000291452', 'UPC-A'],
      ['CODE39', 'localpos 39', 'LOCALPOS 39', 'Code 39'],
      ['ITF14', '1890123456789', '18901234567897', 'ITF'],
    ] as const) {
      await type.selectOption(format)
      await value.fill(input)
      await expect(t.getByRole('status')).toContainText(expected)
      const png = await download(page, () => t.getByRole('button', { name: 'Download PNG' }).click())
      expect(isPng(png.bytes)).toBe(true)
      made.push({ path: png.path, expected, format: name })
    }
    const svg = await download(page, () => t.getByRole('button', { name: 'Download SVG' }).click())
    expect(svg.bytes.toString('utf8')).toContain('<svg')

    // Validation: wrong check digit, letters in a numeric format, wrong length, characters Code 39 cannot hold.
    await type.selectOption('EAN13')
    await value.fill('8901234567895')
    await expect(t.getByText('The last digit should be 0')).toBeVisible()
    await expect(t.getByRole('button', { name: 'Download PNG' })).toBeDisabled()
    await value.fill('89012AB')
    await expect(t.getByText('EAN-13 holds digits only.')).toBeVisible()
    await value.fill('12345')
    await expect(t.getByText('EAN-13 needs 12 or 13 digits. You entered 5.')).toBeVisible()
    await type.selectOption('CODE39')
    await value.fill('abc#1')
    await expect(t.getByText('Code 39 holds capital letters')).toBeVisible()

    await open(page, '/barcode-scanner/')
    const s = tool(page)
    for (const m of made) {
      await s.locator('input[type=file]').setInputFiles(m.path)
      await expect(s.getByTestId('scan-output'), m.format).toHaveText(m.expected)
      await expect(s.getByText(`${m.format} barcode found`)).toBeVisible()
    }
    await s.locator('input[type=file]').setInputFiles('public/logo-512.png')
    await expect(s.getByText('No barcode was found in this image')).toBeVisible()
  })
})

test.describe('logo maker', () => {
  test('draws the logo and downloads a PNG at the chosen width', async ({ page }) => {
    await open(page, '/logo-maker/')
    const t = tool(page)
    await t.getByLabel('Business name').fill('Anand Stores')
    await expect(t.getByLabel('Badge letters')).toHaveValue('AS')
    const painted = () => t.locator('canvas').evaluate((c: HTMLCanvasElement) => new Set(c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data.filter((_, i) => i % 4 === 0)).size)
    expect(await painted(), 'the canvas has more than a flat background').toBeGreaterThan(3)
    await t.getByRole('button', { name: 'Badge on top' }).click()
    await t.getByRole('button', { name: 'Circle' }).click()
    await t.getByRole('button', { name: 'Navy' }).click()
    await t.getByLabel('Typeface').selectOption('serif')
    await t.getByLabel('Transparent background').check()
    await t.getByLabel('PNG size').selectOption('2400')
    const png = await download(page, () => t.getByRole('button', { name: 'Download PNG' }).click())
    expect(png.name).toBe('anand-stores-logo.png')
    expect(isPng(png.bytes)).toBe(true)
    expect(png.bytes.readUInt32BE(16), 'PNG width').toBe(2400)
    if (process.env.KEEP_DOWNLOADS) fs.copyFileSync(png.path, `${process.env.KEEP_DOWNLOADS}/logo.png`)
  })
})
