/**
 * PLACEHOLDER PRICING.
 * No real prices or plan contents have been provided yet, so every price is `null` and the page shows
 * "Price to be announced". When final pricing is ready, fill in `price` (in rupees) and the billing toggle,
 * price display and "per month / per year" labels switch on automatically. Edit plan features and the
 * comparison table to match the final packaging.
 */
export interface Plan {
  id: string
  name: string
  audience: string
  /** Rupees per period, or null while pricing is undecided. */
  price: { monthly: number | null; yearly: number | null }
  recommended?: boolean
  features: string[]
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    audience: 'For a single counter getting started with proper billing.',
    price: { monthly: null, yearly: null },
    features: ['POS billing with GST invoices', 'Inventory with low-stock alerts', 'Customer and payment records', 'Core sales reports'],
  },
  {
    id: 'business',
    name: 'Business',
    audience: 'For growing shops that want the whole platform working together.',
    price: { monthly: null, yearly: null },
    recommended: true,
    features: ['Everything in Starter', 'Barcode billing and label printing', 'Purchase and supplier management', 'Full reports and tax summaries', 'Staff access control'],
  },
  {
    id: 'multi-store',
    name: 'Multi-store',
    audience: 'For owners running several branches from one login.',
    price: { monthly: null, yearly: null },
    features: ['Everything in Business', 'Multi-store management', 'Stock transfers between stores', 'Store-wise and combined reports', 'Roles by store'],
  },
]

export type Cell = boolean | string

export interface ComparisonRow {
  feature: string
  /** One value per plan, in the same order as PLANS. */
  values: [Cell, Cell, Cell]
}

export const COMPARISON: ComparisonRow[] = [
  { feature: 'POS billing', values: [true, true, true] },
  { feature: 'GST invoices', values: [true, true, true] },
  { feature: 'Inventory management', values: [true, true, true] },
  { feature: 'Customer and payment records', values: [true, true, true] },
  { feature: 'Barcode billing', values: [false, true, true] },
  { feature: 'Purchase management', values: [false, true, true] },
  { feature: 'Sales reports', values: ['Core', 'Full', 'Full'] },
  { feature: 'Staff access control', values: [false, true, true] },
  { feature: 'Multi-store management', values: [false, false, true] },
  { feature: 'Stock transfers', values: [false, false, true] },
]
