import type { BlogCategory, BlogPostMeta } from './types'

/**
 * Blog index data: everything needed for lists, cards, menus and SEO, newest first. The article text itself is in
 * blog.ts and only loads on article pages. Each post's own keyword must not duplicate a page's primary keyword.
 */
export const BLOG_META: BlogPostMeta[] = [
  {
    slug: 'how-to-choose-a-billing-system-for-a-small-shop',
    keyword: 'how to choose a billing system for a small shop',
    secondary: [
      'billing system for small shop',
      'shop billing checklist',
      'questions to ask before buying a billing system'
    ],
    title: 'How to Choose a Billing System for a Small Shop: A Practical Checklist',
    seoTitle: 'How to Choose a Billing System for a Small Shop | LocalPOS',
    seoDescription: 'Learn how to choose a billing system for a small shop with a plain checklist covering speed, GST, stock, support and cost, plus questions to ask first.',
    category: 'Billing',
    date: '2026-10-02',
    readingMinutes: 4,
    excerpt: 'A plain-English checklist for shop owners comparing billing systems: what to test at the counter, what to ask about GST and stock, and what to watch for in the price.',
    tint: 'brand',
    relatedFeatures: [ 'pos-billing-software', 'gst-billing-software', 'inventory-management-software' ]
  },
  {
    slug: 'gst-invoice-format-in-india',
    keyword: 'GST invoice format in India',
    secondary: [
      'tax invoice requirements',
      'what to include in a GST invoice',
      'GST invoice fields',
      'bill of supply'
    ],
    title: 'GST Invoice Format in India: What a Tax Invoice Must Include',
    seoTitle: 'GST Invoice Format in India: What to Include | LocalPOS',
    seoDescription: 'A plain guide to the GST invoice format in India: the details a tax invoice usually needs, how B2B and B2C invoices differ, and common mistakes to avoid.',
    category: 'GST & Compliance',
    date: '2026-09-24',
    readingMinutes: 4,
    excerpt: 'The details a GST tax invoice usually carries, how B2B and B2C invoices differ, how the CGST, SGST and IGST split works, and the mistakes that cause trouble later.',
    tint: 'gold',
    relatedFeatures: [ 'gst-billing-software', 'pos-billing-software', 'sales-reporting-software' ]
  },
  {
    slug: 'how-a-barcode-system-works-in-a-retail-shop',
    keyword: 'how a barcode system works in a retail shop',
    secondary: [ 'barcode labels for retail', 'barcode scanner setup', 'barcodes for loose items', 'EAN-13 barcode' ],
    title: 'How a Barcode System Works in a Retail Shop (and How to Set One Up)',
    seoTitle: 'How a Barcode System Works in a Retail Shop | LocalPOS',
    seoDescription: 'See how a barcode system works in a retail shop, from scanner to bill to stock count, and follow a simple six-step plan to set one up in your own store.',
    category: 'Retail Tips',
    date: '2026-09-16',
    readingMinutes: 3,
    excerpt: 'What really happens when you scan an item, which kinds of barcodes a shop uses, and a six-step plan for labelling your items and getting a scanner working at the counter.',
    tint: 'violet',
    relatedFeatures: [ 'barcode-billing-software', 'pos-billing-software', 'inventory-management-software' ]
  },
  {
    slug: 'how-to-reduce-dead-stock-in-a-retail-shop',
    keyword: 'how to reduce dead stock in a retail shop',
    secondary: [ 'dead stock', 'slow moving stock', 'clear old stock', 'overstocking' ],
    title: 'How to Reduce Dead Stock in a Retail Shop and Free Up Your Cash',
    seoTitle: 'How to Reduce Dead Stock in a Retail Shop | LocalPOS',
    seoDescription: 'Learn how to reduce dead stock in a retail shop: find items that stopped selling, clear them with sensible offers, and stop buying more of what does not move.',
    category: 'Inventory',
    date: '2026-09-08',
    readingMinutes: 3,
    excerpt: 'Dead stock is cash you have already spent, sitting on a shelf. Find it, work out why it stopped selling, clear it in stages, and set simple rules so it does not build up again.',
    tint: 'sky',
    relatedFeatures: [ 'inventory-management-software', 'sales-reporting-software', 'purchase-management-software' ]
  },
  {
    slug: 'moving-from-a-stock-register-to-software',
    keyword: 'moving from a stock register to software',
    secondary: [ 'stock register to computer', 'digitise shop stock', 'bulk item entry', 'opening stock count' ],
    title: 'Moving from a Stock Register to Software: A Step-by-Step Plan',
    seoTitle: 'Moving from a Stock Register to Software | LocalPOS',
    seoDescription: 'A step-by-step plan for moving from a stock register to software: clean your item list, count the shelf, run both systems side by side, then switch.',
    category: 'Retail Tips',
    date: '2026-08-31',
    readingMinutes: 3,
    excerpt: 'The stock register has served you well, but it cannot answer questions. Here is a five-step plan for counting your stock, loading your items and switching over without a messy week.',
    tint: 'coral',
    relatedFeatures: [ 'inventory-management-software', 'barcode-billing-software', 'purchase-management-software' ]
  },
  {
    slug: 'how-to-track-medicine-expiry-in-a-pharmacy',
    keyword: 'how to track medicine expiry in a pharmacy',
    secondary: [
      'medicine expiry tracking',
      'near expiry stock',
      'first expiry first out',
      'batch wise stock for pharmacy'
    ],
    title: 'How to Track Medicine Expiry in a Pharmacy: A Practical Weekly Routine',
    seoTitle: 'How to Track Medicine Expiry in a Pharmacy | LocalPOS',
    seoDescription: 'Learn how to track medicine expiry in a pharmacy with batch records, first-expiry-first-out selling and a weekly check, so fewer strips expire on your shelf.',
    category: 'Industry Guides',
    date: '2026-08-24',
    readingMinutes: 4,
    excerpt: 'Expiry losses build up quietly when batches get mixed on the shelf. Keep batch records from day one, sell the earliest expiry first and run a short weekly check.',
    tint: 'violet',
    relatedFeatures: [
      'inventory-management-software',
      'purchase-management-software',
      'customer-management-software-for-small-business'
    ]
  },
  {
    slug: 'how-to-speed-up-table-service-in-a-restaurant',
    keyword: 'how to speed up table service in a restaurant',
    secondary: [
      'restaurant table turnaround',
      'faster restaurant billing',
      'kitchen order ticket',
      'split bills in a restaurant'
    ],
    title: 'How to Speed Up Table Service in a Restaurant, from Order to Bill',
    seoTitle: 'How to Speed Up Table Service in a Restaurant | LocalPOS',
    seoDescription: 'See how to speed up table service in a restaurant: fix slow order taking, kitchen hand-offs and billing delays with simple habits that hold up in a busy rush.',
    category: 'Industry Guides',
    date: '2026-08-18',
    readingMinutes: 3,
    excerpt: 'Most restaurant delays come from a few predictable places. Follow a guest from seating to payment and fix order taking, kitchen hand-offs and billing one at a time.',
    tint: 'coral',
    relatedFeatures: [ 'pos-billing-software', 'gst-billing-software', 'payment-management-software' ]
  },
  {
    slug: 'how-to-collect-pending-payments-from-customers',
    keyword: 'how to collect pending payments from customers',
    secondary: [ 'udhaar management', 'customer credit in a shop', 'payment reminder message', 'outstanding dues' ],
    title: 'How to Collect Pending Payments from Customers Without Losing Them',
    seoTitle: 'How to Collect Pending Payments from Customers | LocalPOS',
    seoDescription: 'Learn how to collect pending payments from customers politely: set credit rules, track dues by age, send friendly reminders and keep your regular customers.',
    category: 'Billing',
    date: '2026-08-11',
    readingMinutes: 4,
    excerpt: 'Credit keeps loyal customers coming back, but unpaid dues pile up fast. Set clear rules, record every rupee on a bill, and follow up early and kindly.',
    tint: 'gold',
    relatedFeatures: [
      'payment-management-software',
      'customer-management-software-for-small-business',
      'sales-management-software'
    ]
  },
  {
    slug: 'how-to-manage-stock-across-multiple-shop-branches',
    keyword: 'how to manage stock across multiple shop branches',
    secondary: [ 'stock transfer between branches', 'branch wise stock', 'multi branch inventory', 'master item list' ],
    title: 'How to Manage Stock Across Multiple Shop Branches Without Confusion',
    seoTitle: 'How to Manage Stock Across Multiple Shop Branches | LocalPOS',
    seoDescription: 'See how to manage stock across multiple shop branches: one master item list, branch-wise counts, tracked transfers and simple reorder rules.',
    category: 'Inventory',
    date: '2026-08-04',
    readingMinutes: 3,
    excerpt: 'The second shop is where stock problems multiply. Use one master item list, count each branch separately, move goods with a proper transfer record and set reorder levels branch by branch.',
    tint: 'sky',
    relatedFeatures: [ 'multi-store-management-software', 'inventory-management-software', 'purchase-management-software' ]
  }
]

export const BLOG_CATEGORIES: BlogCategory[] = [ 'Billing', 'GST & Compliance', 'Inventory', 'Retail Tips', 'Industry Guides' ]
