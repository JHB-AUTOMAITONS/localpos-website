import type { IconName } from '@/components/Icon'

export interface FooterDirectoryItem {
  label: string
  icon: IconName
  /**
   * Path of the page for this tool or format. Leave it out until the page exists in src/routes.tsx and data/routes.ts:
   * the footer shows the item as plain text rather than linking to a URL that would 404.
   */
  to?: string
}

export interface FooterDirectorySection {
  id: string
  title: string
  items: FooterDirectoryItem[]
}

export const FOOTER_DIRECTORY: FooterDirectorySection[] = [
  {
    id: 'footer-tools',
    title: 'LocalPOS Tools',
    items: [
      { label: 'GST Calculator', icon: 'calculator' },
      { label: 'Invoice Generator', icon: 'gst-receipt' },
      { label: 'Quotation Maker', icon: 'file' },
      { label: 'Proforma Invoice Generator', icon: 'file-check' },
      { label: 'Purchase Order Generator', icon: 'cart' },
      { label: 'Receipt Maker', icon: 'receipt' },
      { label: 'QR Code Generator', icon: 'qr' },
      { label: 'Online Barcode Generator', icon: 'barcode' },
      { label: 'QR Code Scanner from Image', icon: 'scan-qr' },
      { label: 'Online Barcode Scanner', icon: 'scan' },
      { label: 'Logo Maker', icon: 'palette' },
    ],
  },
  {
    id: 'footer-formats',
    title: 'LocalPOS Business Formats',
    items: [
      { label: 'Invoice Formats', icon: 'file' },
      { label: 'Quotation Format', icon: 'file-search' },
      { label: 'Balance Sheet Formats', icon: 'scale' },
      { label: 'BillBook Formats', icon: 'book' },
      { label: 'Receipt Formats', icon: 'receipt' },
      { label: 'Credit Note Formats', icon: 'file-plus' },
      { label: 'Debit Note Formats', icon: 'file-minus' },
      { label: 'Sales Report Format', icon: 'chart' },
      { label: 'Estimate Format', icon: 'file-sheet' },
      { label: 'Delivery Challan Format', icon: 'truck' },
      { label: 'Work Order Format', icon: 'clipboard-check' },
      { label: 'Income Statement', icon: 'trend' },
    ],
  },
]

export const FOOTER_TRUST: Array<{ icon: IconName; title: string; note?: string; tone: string }> = [
  { icon: 'award', title: 'Made in India', tone: 'text-gold-700' },
  { icon: 'shield', title: 'Secure', note: 'SSL Encryption', tone: 'text-brand-600' },
  { icon: 'badge-check', title: 'Trusted by MSMEs', tone: 'text-sky-700' },
]
