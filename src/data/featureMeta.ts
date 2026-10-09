import type { FeatureMeta } from './types'

/**
 * Navigation and card metadata for the ten feature pages. This small module is loaded on every page (header menu,
 * footer, cards), so keep it light: page copy and SEO text live in features.ts and only load with the page that needs it.
 * The order here is the order of the menus and the feature grid.
 */
export const FEATURE_META: FeatureMeta[] = [
  {
    slug: 'pos-billing-software',
    path: '/features/pos-billing-software/',
    navLabel: 'POS Billing',
    navBlurb: 'Bill in seconds at the counter',
    icon: 'cart',
    tint: 'brand',
    cardPoints: [ 'Bill in seconds', 'Every way to pay' ]
  },
  {
    slug: 'gst-billing-software',
    path: '/features/gst-billing-software/',
    navLabel: 'GST Billing',
    navBlurb: 'Tax-ready invoices every time',
    icon: 'gst-receipt',
    tint: 'gold',
    cardPoints: [ 'Correct tax on every line', 'CGST, SGST and IGST sorted' ]
  },
  {
    slug: 'inventory-management-software',
    path: '/features/inventory-management-software/',
    navLabel: 'Inventory Management',
    navBlurb: 'Know what is in stock, always',
    icon: 'boxes',
    tint: 'sky',
    cardPoints: [ 'Live stock levels', 'Low-stock alerts' ]
  },
  {
    slug: 'barcode-billing-software',
    path: '/features/barcode-billing-software/',
    navLabel: 'Barcode Billing',
    navBlurb: 'Scan an item, get a bill line',
    icon: 'scan',
    tint: 'violet',
    cardPoints: [ 'Scan to bill', 'Works with common scanners' ]
  },
  {
    slug: 'purchase-management-software',
    path: '/features/purchase-management-software/',
    navLabel: 'Purchase Management',
    navBlurb: 'Orders, supplier bills and returns',
    icon: 'truck',
    tint: 'coral',
    cardPoints: [ 'Purchase orders', 'Receive goods, update stock' ]
  },
  {
    slug: 'sales-management-software',
    path: '/features/sales-management-software/',
    navLabel: 'Sales Management',
    navBlurb: 'Quotes, invoices and returns',
    icon: 'trend',
    tint: 'brand',
    cardPoints: [ 'Quotations that become invoices', 'Returns and credit notes' ]
  },
  {
    slug: 'customer-management-software-for-small-business',
    path: '/features/customer-management-software-for-small-business/',
    navLabel: 'Customer Management',
    navBlurb: 'Know every customer and what they owe',
    icon: 'users',
    tint: 'coral',
    cardPoints: [ 'A profile for every customer', 'Full purchase history' ]
  },
  {
    slug: 'payment-management-software',
    path: '/features/payment-management-software/',
    navLabel: 'Payment Management',
    navBlurb: 'Who paid, who owes, what is due',
    icon: 'wallet',
    tint: 'gold',
    cardPoints: [ 'Every payment mode', 'Part payments and advances' ]
  },
  {
    slug: 'sales-reporting-software',
    path: '/features/sales-reporting-software/',
    navLabel: 'Reports & Analytics',
    navBlurb: 'Clear reports without spreadsheets',
    icon: 'chart',
    tint: 'violet',
    cardPoints: [ 'Today’s sales at a glance', 'Item and category reports' ]
  },
  {
    slug: 'multi-store-management-software',
    path: '/features/multi-store-management-software/',
    navLabel: 'Multi-Store Management',
    navBlurb: 'Every branch from one login',
    icon: 'building',
    tint: 'sky',
    cardPoints: [ 'One login, every store', 'Store-wise and combined reports' ]
  }
]

export const getFeatureMeta = (slug: string): FeatureMeta => {
  const f = FEATURE_META.find((x) => x.slug === slug)
  if (!f) throw new Error(`Unknown feature: ${slug}`)
  return f
}
