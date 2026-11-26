/**
 * LocalPOS pricing. One plan, billed monthly or yearly. Every figure shown on the pricing page
 * (savings, per-month equivalent, "months free") is derived from the two prices below, so changing
 * them here updates the page, the comparison table and the FAQ answers together.
 */
export const MONTHLY_PRICE = 999
export const YEARLY_PRICE = 9999

/** What twelve monthly payments add up to. */
export const YEARLY_AT_MONTHLY_RATE = MONTHLY_PRICE * 12
/** Rupees saved per year by choosing yearly billing. */
export const YEARLY_SAVINGS = YEARLY_AT_MONTHLY_RATE - YEARLY_PRICE
/** The yearly saving expressed in months of the monthly price (about 2). */
export const MONTHS_FREE = Math.round(YEARLY_SAVINGS / MONTHLY_PRICE)

export interface Plan {
  id: string
  name: string
  audience: string
  /** Rupees per period. */
  price: { monthly: number; yearly: number }
  features: string[]
}

export const PLAN: Plan = {
  id: 'localpos',
  name: 'LocalPOS',
  audience: 'The whole platform for your shop: billing, stock, customers, reports and every branch, working together.',
  price: { monthly: MONTHLY_PRICE, yearly: YEARLY_PRICE },
  features: [
    'POS billing with GST invoices',
    'Inventory with low-stock alerts',
    'Customer and payment records',
    'Barcode billing and label printing',
    'Purchase and supplier management',
    'Full sales reports and tax summaries',
    'Staff access control',
    'Multi-store management',
    'Stock transfers between stores',
    'Store-wise and combined reports',
    'Roles by store',
  ],
}

