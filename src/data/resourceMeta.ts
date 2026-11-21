import type { IconName } from '@/components/Icon'

/**
 * The free tools and business-format pages. This small module is loaded on every page (footer, related links, sitemap),
 * so it holds only what those need. Page copy, the tool itself and the templates live in pages/tools and pages/formats.
 */
export interface ResourceMeta {
  slug: string
  path: string
  kind: 'tool' | 'format'
  /** Name used in the footer, breadcrumbs and related-link cards. */
  label: string
  icon: IconName
  /** One line for related-link cards. */
  blurb: string
  /** Keyword mapping checked by scripts/verify-seo.mjs. */
  primary: string
  secondary: string[]
}

const tool = (slug: string, label: string, icon: IconName, blurb: string, primary: string, secondary: string[]): ResourceMeta => ({ slug, path: `/${slug}/`, kind: 'tool', label, icon, blurb, primary, secondary })
const format = (slug: string, label: string, icon: IconName, blurb: string, primary: string, secondary: string[]): ResourceMeta => ({ slug, path: `/${slug}/`, kind: 'format', label, icon, blurb, primary, secondary })

export const TOOL_META: ResourceMeta[] = [
  tool('gst-calculator', 'GST Calculator', 'calculator', 'Add or remove GST and see the CGST, SGST and IGST split', 'GST calculator', ['GST inclusive calculator', 'GST exclusive calculator', 'calculate GST']),
  tool('invoice-generator', 'Invoice Generator', 'gst-receipt', 'Fill in a GST invoice and print it or save it as a PDF', 'invoice generator', ['invoice maker', 'create invoice online', 'free invoice generator']),
  tool('quotation-maker', 'Quotation Maker', 'file', 'Prepare a priced quotation with validity and terms', 'quotation maker', ['quotation generator', 'business quotation']),
  tool('proforma-invoice-generator', 'Proforma Invoice Generator', 'file-check', 'Send an advance bill of sale before the final invoice', 'proforma invoice generator', ['proforma invoice maker', 'proforma invoice format']),
  tool('purchase-order-generator', 'Purchase Order Generator', 'cart', 'Raise a clear purchase order for a supplier', 'purchase order generator', ['purchase order maker', 'PO generator']),
  tool('receipt-maker', 'Receipt Maker', 'receipt', 'Make a payment receipt with the amount in words', 'receipt maker', ['payment receipt generator', 'receipt generator']),
  tool('qr-code-generator', 'QR Code Generator', 'qr', 'Create a QR code for a link, text, Wi-Fi, contact or UPI ID', 'QR code generator', ['QR code maker', 'create QR code']),
  tool('barcode-generator', 'Online Barcode Generator', 'barcode', 'Make Code 128, EAN, UPC, Code 39 and ITF-14 barcodes', 'barcode generator', ['online barcode generator', 'barcode maker']),
  tool('qr-code-scanner', 'QR Code Scanner from Image', 'scan-qr', 'Read a QR code from a photo or screenshot', 'QR code scanner', ['scan QR from image', 'QR code scanner from image']),
  tool('barcode-scanner', 'Online Barcode Scanner', 'scan', 'Read the number in a barcode from an image', 'barcode scanner', ['online barcode scanner', 'barcode reader']),
  tool('logo-maker', 'Logo Maker', 'palette', 'Design a simple text logo and download it as a PNG', 'logo maker', ['free logo maker', 'text logo']),
]

export const FORMAT_META: ResourceMeta[] = [
  format('invoice-formats', 'Invoice Formats', 'file', 'GST, retail and service invoice layouts to download', 'invoice format', ['GST invoice format', 'invoice format in Excel', 'invoice format in Word']),
  format('quotation-format', 'Quotation Format', 'file-search', 'Quotation layouts for goods and for services', 'quotation format', ['quotation format in Excel', 'quotation format in Word']),
  format('balance-sheet-format', 'Balance Sheet Formats', 'scale', 'Assets, liabilities and equity laid out for a small business', 'balance sheet format', ['balance sheet format in Excel', 'balance sheet format for small business']),
  format('bill-book-format', 'BillBook Formats', 'book', 'The classic bill book page, ready to print', 'bill book format', ['bill book template', 'cash memo']),
  format('receipt-format', 'Receipt Formats', 'receipt', 'Payment, rent and advance receipt layouts', 'receipt format', ['payment receipt format', 'money receipt format']),
  format('credit-note-format', 'Credit Note Formats', 'file-plus', 'Credit note layout for returns and price reductions', 'credit note format', ['credit note template', 'GST credit note']),
  format('debit-note-format', 'Debit Note Formats', 'file-minus', 'Debit note layout for extra charges and purchase returns', 'debit note format', ['debit note template', 'GST debit note']),
  format('sales-report-format', 'Sales Report Format', 'chart', 'Daily and monthly sales report sheets', 'sales report format', ['daily sales report format', 'monthly sales report format']),
  format('estimate-format', 'Estimate Format', 'file-sheet', 'Cost estimate layout with items, quantities and terms', 'estimate format', ['cost estimate format', 'estimate template']),
  format('delivery-challan-format', 'Delivery Challan Format', 'truck', 'Challan layout for goods sent without an invoice', 'delivery challan format', ['delivery challan template', 'challan format']),
  format('work-order-format', 'Work Order Format', 'clipboard-check', 'Work order layout with scope, price and timeline', 'work order format', ['work order template', 'job order format']),
  format('income-statement-format', 'Income Statement', 'trend', 'Profit and loss statement layout with a worked example', 'income statement format', ['profit and loss statement format', 'P&L format']),
]

export const RESOURCE_META: ResourceMeta[] = [...TOOL_META, ...FORMAT_META]

export function getResourceMeta(slug: string): ResourceMeta {
  const meta = RESOURCE_META.find((r) => r.slug === slug)
  if (!meta) throw new Error(`Unknown tool or format page "${slug}"`)
  return meta
}
