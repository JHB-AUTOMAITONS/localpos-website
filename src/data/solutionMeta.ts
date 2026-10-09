import type { SolutionMeta } from './types'

/**
 * Navigation and card metadata for the five industry pages. Loaded on every page (menus, footer, cards), so keep it light.
 * Page copy and SEO text live in solutions.ts.
 */
export const SOLUTION_META: SolutionMeta[] = [
  {
    slug: 'retail-billing-software',
    path: '/solutions/retail-billing-software/',
    navLabel: 'Retail',
    navBlurb: 'Shops, boutiques and general stores',
    icon: 'store',
    tint: 'brand',
    cardPoints: [ 'Fast checkout', 'Stock that follows sales', 'Customer records' ]
  },
  {
    slug: 'restaurant-billing-software',
    path: '/solutions/restaurant-billing-software/',
    navLabel: 'Restaurant',
    navBlurb: 'Tables, orders and kitchen',
    icon: 'utensils',
    tint: 'coral',
    cardPoints: [ 'Table-wise orders', 'Kitchen order tickets', 'GST on every bill' ]
  },
  {
    slug: 'jewellery-billing-software',
    path: '/solutions/jewellery-billing-software/',
    navLabel: 'Jewellery',
    navBlurb: 'Weight, purity and making charges',
    icon: 'gem',
    tint: 'gold',
    cardPoints: [ 'Item-level detail', 'Itemised invoices', 'Piece-by-piece stock' ]
  },
  {
    slug: 'supermarket-billing-software',
    path: '/solutions/supermarket-billing-software/',
    navLabel: 'Supermarket',
    navBlurb: 'Many counters, thousands of items',
    icon: 'basket',
    tint: 'sky',
    cardPoints: [ 'Scan-first checkout', 'Multiple counters', 'Stock alerts' ]
  },
  {
    slug: 'medical-store-billing-software',
    path: '/solutions/medical-store-billing-software/',
    navLabel: 'Medical Store',
    navBlurb: 'Batches, expiry and fast billing',
    icon: 'pill',
    tint: 'violet',
    cardPoints: [ 'Batch and expiry on every bill', 'Expiry alerts', 'Strip and pack units' ]
  }
]
