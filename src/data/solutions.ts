import type { Solution, SolutionContent } from './types'
import { SOLUTION_META } from './solutionMeta'

/**
 * Industry pages: SEO fields and copy, keyed by slug. URLs and keywords follow the SEO mapping document exactly.
 * Navigation labels, icons and colours live in solutionMeta.ts.
 */
const CONTENT: Record<string, SolutionContent> = {
  'retail-billing-software': {
    primary: 'retail billing software',
    secondary: [
      'retail POS software',
      'POS software for retail',
      'best retail billing software',
      'free retail billing software'
    ],
    seoTitle: 'Retail Billing Software for Shops & Stores | LocalPOS',
    seoDescription: 'Fast checkout, barcode billing, stock control and customer records in one retail billing software. Built for shops that serve a queue every day.',
    h1: 'Retail billing software built for the rush at your counter',
    intro: 'LocalPOS is retail billing software for shops that serve a steady stream of customers. Scan or search items, bill in seconds, take cash, UPI or card, and keep stock and daily sales up to date without extra effort. It works as retail POS software for a single counter or a growing chain.',
    h2Main: 'Retail billing software for every part of your shop day',
    painPoints: [
      {
        title: 'Queues build up at the counter',
        body: 'Searching for prices and writing bills by hand slows every customer down.'
      },
      {
        title: 'Shelf and system never match',
        body: 'Stock registers are updated late, so you find out about an empty shelf from a customer.'
      },
      {
        title: 'Regulars are strangers',
        body: 'Without records you cannot see who your best customers are or who owes you money.'
      },
      {
        title: 'Daily totals take hours',
        body: 'Adding up bills, discounts and payment modes at closing time eats your evening.'
      }
    ],
    highlights: [
      {
        icon: 'scan',
        title: 'Fast checkout',
        body: 'Scan or search, add, pay and print. A bill takes a few taps.'
      },
      {
        icon: 'boxes',
        title: 'Stock that follows sales',
        body: 'Every bill reduces stock, and low-stock alerts tell you what to reorder.'
      },
      {
        icon: 'users',
        title: 'Customer records',
        body: 'See purchase history and pending dues whenever a customer walks in.'
      },
      {
        icon: 'chart',
        title: 'Daily sales in one view',
        body: 'Close the day with totals by payment mode already worked out.'
      }
    ],
    workflowHeading: 'A day at the shop, with LocalPOS',
    workflow: [
      { title: 'Open the counter', body: 'Start the day with your stock and prices already in place.' },
      {
        title: 'Bill customers',
        body: 'Scan items, apply a discount where you offer one, and take payment.'
      },
      { title: 'Watch stock', body: 'Low-stock alerts show what needs reordering before it sells out.' },
      { title: 'Close the day', body: 'Check sales by payment mode and match the cash drawer in minutes.' }
    ],
    faqs: [
      {
        q: 'What is retail billing software?',
        a: 'Retail billing software helps a shop create bills, take payments and keep stock and sales records in one place. It replaces handwritten bills and separate registers with a single system at the counter.'
      },
      {
        q: 'What makes the best retail billing software?',
        a: 'Look for fast billing, reliable stock tracking, clear reports and screens your team can learn in a day. LocalPOS focuses on those basics, and the demo lets you test them with your own products.'
      },
      {
        q: 'Is there free retail billing software?',
        a: 'Free tools are usually limited in invoices, users or features. You can book a free LocalPOS demo to see the full product, and check our pricing page for current plans.'
      },
      {
        q: 'Can LocalPOS work as retail POS software for more than one shop?',
        a: 'Yes. If you grow to several branches, you can manage them from one login with store-wise stock and reports.'
      },
      {
        q: 'Do I need barcode scanners for POS software for retail?',
        a: 'Not to start. You can search items by name. A scanner speeds things up when you sell many items a day, and LocalPOS supports common scanners.'
      }
    ],
    relatedFeatures: [
      'pos-billing-software',
      'barcode-billing-software',
      'inventory-management-software',
      'customer-management-software-for-small-business'
    ]
  },
  'restaurant-billing-software': {
    primary: 'restaurant billing software',
    secondary: [
      'restaurant POS software',
      'best restaurant billing software',
      'restaurant billing software free',
      'restaurant billing software in India'
    ],
    seoTitle: 'Restaurant Billing Software for India | LocalPOS',
    seoDescription: 'Take orders by table, send them to the kitchen and bill without delays. LocalPOS restaurant billing software handles dine-in, takeaway and GST invoices.',
    h1: 'Restaurant billing software that keeps tables, kitchen and bills in step',
    intro: 'LocalPOS is restaurant billing software for cafes, restaurants and food counters. Open a table, take the order, send it to the kitchen and print the bill when guests are ready, with GST included. Your team stays in step, and guests spend less time waiting for the bill.',
    h2Main: 'Restaurant billing software from the first order to the last bill',
    painPoints: [
      {
        title: 'Orders get lost between table and kitchen',
        body: 'Handwritten slips are misread, and dishes arrive late or wrong.'
      },
      {
        title: 'Bills are slow at peak hours',
        body: 'Guests wait to pay while staff add up items and tax by hand.'
      },
      {
        title: 'Table status is unclear',
        body: 'Nobody knows which tables are free, waiting or ready to pay.'
      },
      {
        title: 'Split bills cause arguments',
        body: 'Sharing a bill between guests means extra maths at the worst moment.'
      }
    ],
    highlights: [
      {
        icon: 'utensils',
        title: 'Table-wise orders',
        body: 'See every table at a glance, and add to an order at any time.'
      },
      {
        icon: 'printer',
        title: 'Kitchen order tickets',
        body: 'Send each order to the kitchen the moment it is taken.'
      },
      {
        icon: 'gst-receipt',
        title: 'GST on every bill',
        body: 'Bills show tax correctly for dine-in, takeaway and delivery.'
      },
      {
        icon: 'card',
        title: 'Split and merge bills',
        body: 'Split a table’s bill between guests, or merge two tables into one.'
      }
    ],
    workflowHeading: 'From seating to payment',
    workflow: [
      { title: 'Open the table', body: 'Pick a free table and start the order.' },
      {
        title: 'Take the order',
        body: 'Add dishes with notes like “less spicy” and send them to the kitchen.'
      },
      { title: 'Serve and add more', body: 'Guests order again? Add items to the same table.' },
      { title: 'Bill and settle', body: 'Print the bill, split it if needed and record how it was paid.' }
    ],
    faqs: [
      {
        q: 'What is restaurant billing software?',
        a: 'Restaurant billing software manages orders and bills for a food business: tables, items, kitchen tickets, tax and payments. It keeps service quick and your sales records accurate.'
      },
      {
        q: 'Is LocalPOS restaurant POS software?',
        a: 'Yes. It covers table orders, kitchen tickets, bill splitting and daily sales, so it works as restaurant POS software for cafes, restaurants and counters.'
      },
      {
        q: 'What makes the best restaurant billing software?',
        a: 'Speed at the table, clear order flow to the kitchen, correct GST and simple end-of-day reports. A short demo with your own menu is the best way to judge.'
      },
      {
        q: 'Is there restaurant billing software free to use?',
        a: 'Free tools tend to limit features or users. You can book a free LocalPOS demo and check our pricing page for current plans before deciding.'
      },
      {
        q: 'Does it work as restaurant billing software in India with GST?',
        a: 'Yes. Bills carry GST details and show tax correctly, and your sales and tax reports stay ready for your accountant.'
      }
    ],
    relatedFeatures: [
      'pos-billing-software',
      'gst-billing-software',
      'payment-management-software',
      'sales-reporting-software'
    ]
  },
  'jewellery-billing-software': {
    primary: 'jewellery billing software',
    secondary: [
      'best jewellery billing software',
      'jewellery billing software free',
      'jewellery billing software price',
      'gold jewellery billing software'
    ],
    seoTitle: 'Jewellery Billing Software for Jewellers | LocalPOS',
    seoDescription: 'Bill gold and silver jewellery with weight, purity, making charges and GST in one invoice. LocalPOS jewellery billing software keeps every piece on record.',
    h1: 'Jewellery billing software for pieces that need exact numbers',
    intro: 'LocalPOS is jewellery billing software for showrooms and jewellers who sell high-value pieces. Record each item with its weight, purity and making charges, bill with GST, and keep a clear record of every piece and every customer. Every figure on the invoice stays exact.',
    h2Main: 'Jewellery billing software that respects every gram',
    painPoints: [
      {
        title: 'One small mistake costs a lot',
        body: 'A wrong weight or rate on a high-value bill is expensive to fix later.'
      },
      {
        title: 'Pieces are hard to track',
        body: 'With hundreds of unique items, it is difficult to know what is in the showcase and what has sold.'
      },
      {
        title: 'Bills have many parts',
        body: 'Metal value, making charges, stones and tax all need to be shown clearly.'
      },
      {
        title: 'Customer history matters',
        body: 'Jewellery customers return for years and expect you to remember them.'
      }
    ],
    highlights: [
      {
        icon: 'gem',
        title: 'Item-level detail',
        body: 'Record weight, purity, stone details and a tag number for every piece.'
      },
      {
        icon: 'receipt',
        title: 'Itemised invoices',
        body: 'Show metal value, making charges and tax as separate lines.'
      },
      {
        icon: 'boxes',
        title: 'Piece-by-piece stock',
        body: 'Know exactly which pieces are in stock, sold or out for repair.'
      },
      {
        icon: 'users',
        title: 'Lifelong customer records',
        body: 'Keep every purchase and every conversation in one customer profile.'
      }
    ],
    workflowHeading: 'Billing a piece, step by step',
    workflow: [
      {
        title: 'Pick the piece',
        body: 'Search by tag number or scan it. Weight and purity are already on record.'
      },
      { title: 'Set the day’s rate', body: 'Update the metal rate and the metal value recalculates.' },
      {
        title: 'Add making charges',
        body: 'Charge by weight or as a fixed amount, with any discount you offer.'
      },
      {
        title: 'Bill with GST',
        body: 'Print an itemised invoice with tax and record how the customer pays.'
      }
    ],
    faqs: [
      {
        q: 'What is jewellery billing software?',
        a: 'Jewellery billing software is built for the way jewellers bill: by weight, purity and making charges, with every piece tracked individually and tax shown correctly.'
      },
      {
        q: 'What makes the best jewellery billing software?',
        a: 'Exact calculations, piece-level stock records, clear invoices and reliable customer history. Ask for a demo with your own items to see how it handles them.'
      },
      {
        q: 'Is there jewellery billing software free to use?',
        a: 'Free tools rarely cover weight, purity or making charges well. You can book a free LocalPOS demo to see these in action and check pricing separately.'
      },
      {
        q: 'What is the jewellery billing software price?',
        a: 'Plans depend on the number of stores and users. Our pricing page lists the current plans, and a demo can help you choose the right one.'
      },
      {
        q: 'Can it work as gold jewellery billing software?',
        a: 'Yes. You can record gold items by weight and purity, apply the day’s rate and add making charges, and show GST on the invoice.'
      }
    ],
    relatedFeatures: [
      'gst-billing-software',
      'inventory-management-software',
      'customer-management-software-for-small-business',
      'sales-reporting-software'
    ]
  },
  'supermarket-billing-software': {
    primary: 'supermarket billing software',
    secondary: [ 'supermarket POS software', 'POS software for supermarket' ],
    seoTitle: 'Supermarket Billing Software for Fast Checkout | LocalPOS',
    seoDescription: 'Run many counters, scan thousands of items and never run out of fast movers. LocalPOS supermarket billing software is built for busy checkout lanes.',
    h1: 'Supermarket billing software for busy counters and big inventories',
    intro: 'LocalPOS is supermarket billing software for stores with many products, many counters and a constant queue. Scan items at speed, run several billing counters at once, and get alerts before shelves empty. It works as supermarket POS software that stays quick even with a very large item list.',
    h2Main: 'Supermarket billing software that keeps every lane moving',
    painPoints: [
      {
        title: 'Queues at every counter',
        body: 'A slow checkout at peak hours sends customers to another store.'
      },
      {
        title: 'Thousands of items to manage',
        body: 'Prices, tax rates and stock for a huge range are hard to keep right by hand.'
      },
      {
        title: 'Fast movers run out',
        body: 'Staples sell in hours, and an empty shelf is a lost sale and a lost customer.'
      },
      {
        title: 'Counters work in isolation',
        body: 'It is hard to see which counters are busy or how each cashier is doing.'
      }
    ],
    highlights: [
      {
        icon: 'scan',
        title: 'Scan-first checkout',
        body: 'Barcode scanning keeps each lane moving, with quantity and weight handled quickly.'
      },
      {
        icon: 'monitor',
        title: 'Multiple counters',
        body: 'Bill from several counters at once, all feeding the same stock.'
      },
      {
        icon: 'bell',
        title: 'Stock alerts',
        body: 'See fast movers that are running low before the shelf is empty.'
      },
      {
        icon: 'chart',
        title: 'Counter-wise reports',
        body: 'Compare counters and cashiers, and close each one separately.'
      }
    ],
    workflowHeading: 'How a busy lane runs on LocalPOS',
    workflow: [
      { title: 'Scan', body: 'Each product is scanned and added to the bill with price and tax.' },
      { title: 'Total and pay', body: 'Take cash, UPI or card, or a combination.' },
      { title: 'Stock updates', body: 'Every counter reduces the same shared stock, in real time.' },
      {
        title: 'Close the counter',
        body: 'Each cashier closes with a summary that matches the cash drawer.'
      }
    ],
    faqs: [
      {
        q: 'What is supermarket billing software?',
        a: 'Supermarket billing software handles high-volume billing: fast barcode scanning, many counters, a large item list, stock tracking and daily reports, all in one system.'
      },
      {
        q: 'Is LocalPOS supermarket POS software?',
        a: 'Yes. It supports barcode checkout, several billing counters and stock that updates across all of them, which is what supermarket POS software needs to do.'
      },
      {
        q: 'Can I use POS software for supermarket with many counters?',
        a: 'Yes. Several counters can bill at the same time while sharing one stock, and you can review sales for each counter.'
      },
      {
        q: 'How does it handle a large item list?',
        a: 'Items are organised by category and found by name or barcode, and you can add items in bulk to move a large range into LocalPOS quickly.'
      }
    ],
    relatedFeatures: [
      'barcode-billing-software',
      'inventory-management-software',
      'pos-billing-software',
      'multi-store-management-software'
    ]
  },
  'medical-store-billing-software': {
    primary: 'medical store billing software',
    secondary: [
      'pharmacy billing software',
      'billing software for medical store',
      'pharmacy billing software free',
      'best pharmacy billing software'
    ],
    seoTitle: 'Medical Store Billing Software with Expiry | LocalPOS',
    seoDescription: 'Bill medicines, track batches and expiry dates, and keep stock in order. LocalPOS medical store billing software helps pharmacies avoid expired stock.',
    h1: 'Medical store billing software that watches batches and expiry for you',
    intro: 'LocalPOS is medical store billing software for pharmacies and chemists. Bill medicines with batch numbers and expiry dates, see which stock is about to expire, and keep every customer’s purchase record. It works as pharmacy billing software that keeps stock tidy and bills accurate.',
    h2Main: 'Medical store billing software built around batches and expiry',
    painPoints: [
      {
        title: 'Expired stock is a silent loss',
        body: 'Medicines that expire on the shelf are money you cannot get back.'
      },
      {
        title: 'Many batches of one medicine',
        body: 'The same product arrives in different batches with different expiry dates and prices.'
      },
      {
        title: 'Thousands of small items',
        body: 'Tablets, strips, syrups and devices need quick lookup and precise stock counts.'
      },
      {
        title: 'Regulars buy the same things',
        body: 'Chronic-care customers return monthly, and you want their history at hand.'
      }
    ],
    highlights: [
      {
        icon: 'pill',
        title: 'Batch and expiry on every bill',
        body: 'Record batch numbers and expiry dates, and bill from the right batch.'
      },
      {
        icon: 'bell',
        title: 'Expiry alerts',
        body: 'See what expires in the next 30, 60 or 90 days and act on it early.'
      },
      {
        icon: 'boxes',
        title: 'Strip and pack units',
        body: 'Sell by strip or by tablet and keep stock accurate in both.'
      },
      {
        icon: 'users',
        title: 'Customer records',
        body: 'Keep purchase history for regular customers and see pending balances.'
      }
    ],
    workflowHeading: 'How a prescription moves through LocalPOS',
    workflow: [
      { title: 'Search the medicine', body: 'Find it by name or scan the pack.' },
      { title: 'Pick the batch', body: 'Choose the batch to sell, with the soonest expiry first.' },
      {
        title: 'Bill the customer',
        body: 'Add quantity by strip or tablet, apply a discount and take payment.'
      },
      { title: 'Watch expiry', body: 'Review near-expiry stock each week and act before it expires.' }
    ],
    faqs: [
      {
        q: 'What is medical store billing software?',
        a: 'Medical store billing software is billing and stock software designed for pharmacies. It tracks batches and expiry dates, sells in strips or tablets, and keeps customer and tax records.'
      },
      {
        q: 'Is LocalPOS pharmacy billing software?',
        a: 'Yes. It supports batch numbers, expiry tracking, strip and pack units and fast billing, which are the core needs of pharmacy billing software.'
      },
      {
        q: 'What should billing software for medical store owners include?',
        a: 'Batch-wise stock, expiry alerts, quick search and accurate tax. Check that it fits your own workflow with a demo, and follow the rules that apply to your pharmacy.'
      },
      {
        q: 'Is there pharmacy billing software free?',
        a: 'Free tools often skip batch and expiry tracking. You can book a free LocalPOS demo to see these features, and check our pricing page for plans.'
      },
      {
        q: 'What is the best pharmacy billing software?',
        a: 'The best fit is the one that matches how you work: your batches, your suppliers and your team. A demo with your own medicines is the quickest way to tell.'
      }
    ],
    relatedFeatures: [
      'inventory-management-software',
      'gst-billing-software',
      'purchase-management-software',
      'customer-management-software-for-small-business'
    ]
  }
}

/** Full solution definitions: navigation metadata merged with page content. */
export const SOLUTIONS: Solution[] = SOLUTION_META.map((meta) => {
  const content = CONTENT[meta.slug]
  if (!content) throw new Error(`Missing page content for solution "${meta.slug}" in src/data/solutions.ts`)
  return { ...meta, ...content }
})

export const getSolution = (slug: string): Solution => {
  const s = SOLUTIONS.find((x) => x.slug === slug)
  if (!s) throw new Error(`Unknown solution: ${slug}`)
  return s
}
