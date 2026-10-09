import type { Feature, FeatureContent } from './types'
import { FEATURE_META } from './featureMeta'

/**
 * Feature pages: SEO fields and copy, keyed by slug. URLs, primary and secondary keywords follow the SEO mapping
 * document exactly. The primary keyword appears naturally in: URL, title, description, H1, first paragraph, one H2.
 * Navigation labels, icons and colours live in featureMeta.ts.
 */
const CONTENT: Record<string, FeatureContent> = {
  'pos-billing-software': {
    primary: 'POS billing software',
    secondary: [ 'POS software', 'billing software', 'POS software for retail', 'shop billing software' ],
    seoTitle: 'POS Billing Software for Shops & Retail | LocalPOS',
    seoDescription: 'LocalPOS is POS billing software that lets you bill in seconds, accept cash, UPI and card payments, and update stock automatically with every sale.',
    h1: 'POS billing software that keeps your counter moving',
    intro: 'LocalPOS is POS billing software built for busy shop counters. Search or scan an item, add it to the bill, take payment and print or share the invoice, all from one screen. Stock and sales update on their own, so closing the day never means sorting through paper bills.',
    h2Main: 'Everything good POS billing software should do at the counter',
    benefits: [
      {
        icon: 'zap',
        title: 'Bill in seconds',
        body: 'Search by name, scan a barcode or tap a favourite item. A bill takes a few taps, not a few minutes.'
      },
      {
        icon: 'wallet',
        title: 'Every way to pay',
        body: 'Take cash, UPI, cards or a mix on one bill. Each payment is recorded against the invoice.'
      },
      {
        icon: 'clock',
        title: 'Hold and resume bills',
        body: 'Park a bill while a customer fetches one more item, serve the next person and come back without losing a line.'
      },
      {
        icon: 'percent',
        title: 'Discounts under control',
        body: 'Apply item or bill discounts, and decide which team members are allowed to give them.'
      },
      {
        icon: 'boxes',
        title: 'Stock updates itself',
        body: 'Every sale reduces stock straight away, so the screen always matches the shelf.'
      },
      {
        icon: 'printer',
        title: 'Print or share the bill',
        body: 'Print on a receipt printer, or share the invoice digitally with the customer.'
      }
    ],
    stepsHeading: 'Four taps from item to receipt',
    steps: [
      { title: 'Search or scan', body: 'Find the item by name or code, or scan its barcode.' },
      {
        title: 'Set quantity and discount',
        body: 'Change the quantity, add a discount or note, and keep going.'
      },
      {
        title: 'Take payment',
        body: 'Choose cash, UPI, card or split the amount across more than one mode.'
      },
      {
        title: 'Print or share',
        body: 'Hand over a printed bill or send the invoice. Stock and sales are already updated.'
      }
    ],
    outcomes: [
      'Shorter queues at the counter',
      'Fewer mistakes on bills',
      'A cash tally that closes the same evening',
      'Stock figures you can trust'
    ],
    faqs: [
      {
        q: 'What is POS billing software?',
        a: 'POS billing software is the system you use at the point of sale to create bills, take payments and update stock in one step. It replaces handwritten bills and separate registers with a single screen at your counter.'
      },
      {
        q: 'Can I use LocalPOS as POS software for retail shops?',
        a: 'Yes. LocalPOS is designed around the way retail counters work: fast item search, barcode scanning, quick discounts, split payments and automatic stock updates. It also suits restaurants, jewellers, supermarkets and medical stores.'
      },
      {
        q: 'Do I need special hardware for shop billing software?',
        a: 'No special hardware is needed to begin. A computer or tablet is enough. A barcode scanner and a receipt printer help if you bill many items a day, and you can add them whenever you are ready.'
      },
      {
        q: 'Does stock update after every bill?',
        a: 'Yes. Each sale reduces the stock of the items on the bill straight away, and a return puts them back, so your stock figures stay current through the day.'
      },
      {
        q: 'Can customers pay with UPI or cards?',
        a: 'You can record cash, UPI and card payments against each bill, including a split across more than one mode, so your daily collection report shows exactly how money came in.'
      }
    ],
    related: [
      'barcode-billing-software',
      'inventory-management-software',
      'gst-billing-software',
      'payment-management-software'
    ]
  },
  'gst-billing-software': {
    primary: 'GST billing software',
    secondary: [
      'GST invoice software',
      'GST billing software free',
      'GST billing software online',
      'Indian GST billing software'
    ],
    seoTitle: 'GST Billing Software for Indian Businesses | LocalPOS',
    seoDescription: 'Create GST invoices with GSTIN, HSN codes and CGST, SGST or IGST worked out for you. LocalPOS is GST billing software made for Indian businesses.',
    h1: 'GST billing software that gets every invoice right',
    intro: 'LocalPOS is GST billing software made for Indian businesses. Add your GSTIN once, pick an item, and the invoice shows the right HSN code and splits the tax into CGST and SGST, or IGST, on its own. You spend less time on tax maths and more time with customers.',
    h2Main: 'How our GST billing software works out the tax',
    benefits: [
      {
        icon: 'percent',
        title: 'Correct tax on every line',
        body: 'Set the GST rate and HSN code once on each item. LocalPOS applies them on every bill.'
      },
      {
        icon: 'refresh',
        title: 'CGST, SGST and IGST sorted',
        body: 'The tax split follows the place of supply: same-state sales show CGST and SGST, other-state sales show IGST.'
      },
      {
        icon: 'tag',
        title: 'Tax inclusive or exclusive',
        body: 'Sell at MRP with tax included, or add tax on top. The invoice shows the taxable value either way.'
      },
      {
        icon: 'file',
        title: 'Clean invoice numbering',
        body: 'Invoices follow a running series, with room for a separate series per store or document type.'
      },
      {
        icon: 'chart',
        title: 'GST-ready reports',
        body: 'See tax collected by rate, HSN-wise sales and tax summaries that your accountant can work from.'
      },
      {
        icon: 'users',
        title: 'B2B and B2C together',
        body: 'Add the customer’s GSTIN for business sales, and skip it for walk-in customers.'
      }
    ],
    stepsHeading: 'From first setup to a tax-ready invoice',
    steps: [
      {
        title: 'Add your business details',
        body: 'Enter your name, address and GSTIN once. They print on every invoice.'
      },
      {
        title: 'Set GST on your items',
        body: 'Give each item its HSN code and GST rate, in bulk or one at a time.'
      },
      {
        title: 'Create the invoice',
        body: 'Pick the customer and items. Tax is worked out line by line and split correctly.'
      },
      {
        title: 'Share reports',
        body: 'Open the tax reports, or share them with your accountant at month end.'
      }
    ],
    outcomes: [
      'Invoices that show every detail a buyer needs',
      'No manual tax calculations',
      'Tax figures that match your sales',
      'Month-end records ready for your accountant'
    ],
    faqs: [
      {
        q: 'What is GST billing software?',
        a: 'GST billing software creates invoices with the details GST requires, such as GSTIN, HSN codes, tax rates and the CGST, SGST or IGST split, and keeps records you can use for returns.'
      },
      {
        q: 'Is there GST billing software free to use?',
        a: 'Some tools offer free plans with limits on invoices or features. With LocalPOS you can book a free demo to see how GST invoicing works with your own items and decide from there. Plan details are on our pricing page.'
      },
      {
        q: 'Can I use GST billing software online?',
        a: 'Yes. LocalPOS keeps your invoices online, so you can create bills and check your GST reports from any device with an internet connection.'
      },
      {
        q: 'Does LocalPOS handle CGST, SGST and IGST?',
        a: 'Yes. The tax split follows the place of supply on the invoice. Sales within your state show CGST and SGST; sales to another state show IGST.'
      },
      {
        q: 'Is this Indian GST billing software or a generic tool?',
        a: 'LocalPOS is built for Indian businesses first: GSTIN fields, HSN codes, rupee formatting and the tax splits Indian invoices use are part of the product, not an add-on.'
      },
      {
        q: 'Will it replace my accountant?',
        a: 'No. It keeps your invoices and tax figures organised so your accountant has clean records to work from. Always confirm rates and filing rules with your chartered accountant.'
      }
    ],
    related: [
      'pos-billing-software',
      'sales-reporting-software',
      'payment-management-software',
      'inventory-management-software'
    ]
  },
  'inventory-management-software': {
    primary: 'inventory management software',
    secondary: [
      'stock inventory management software',
      'retail inventory management software',
      'inventory management software for retailers',
      'POS inventory management software'
    ],
    seoTitle: 'Inventory Management Software for Retail | LocalPOS',
    seoDescription: 'Track stock with inventory management software that updates on every sale and purchase, flags low stock and keeps your shelf and records matching.',
    h1: 'Inventory management software that shows what’s in stock, always',
    intro: 'LocalPOS is inventory management software that keeps your stock count honest. Every sale takes stock out, every purchase puts it back in, and you get a warning before a fast-moving item runs out. Whether you stock fifty items or fifty thousand, you always know what is on the shelf and what to reorder.',
    h2Main: 'Inventory management software for retailers who count every item',
    benefits: [
      {
        icon: 'boxes',
        title: 'Live stock levels',
        body: 'Quantities change the moment you bill or receive goods, so you never guess what is left.'
      },
      {
        icon: 'bell',
        title: 'Low-stock alerts',
        body: 'Set a minimum for each item and see a clear list of what needs reordering before it runs out.'
      },
      {
        icon: 'layers',
        title: 'Variants and units',
        body: 'Handle sizes, colours and units like kg, litres or boxes without creating duplicate items.'
      },
      {
        icon: 'refresh',
        title: 'Stock adjustments with reasons',
        body: 'Record damage, loss or a recount with a reason, so every change is explained.'
      },
      {
        icon: 'tag',
        title: 'Categories and bulk entry',
        body: 'Organise items into categories and add many items at once instead of one by one.'
      },
      {
        icon: 'rupee',
        title: 'Stock value',
        body: 'See what your stock is worth at cost and at selling price, item by item or in total.'
      }
    ],
    stepsHeading: 'How stock moves through LocalPOS',
    steps: [
      {
        title: 'Add your items',
        body: 'Create items one by one or in bulk, with prices, units and opening stock.'
      },
      { title: 'Receive stock', body: 'Record purchases when goods arrive and stock goes up automatically.' },
      { title: 'Sell', body: 'Each bill takes stock out, so the count follows your sales.' },
      { title: 'Reorder in time', body: 'Low-stock alerts tell you what to buy before a shelf goes empty.' }
    ],
    outcomes: [
      'Fewer sales lost to empty shelves',
      'Less money tied up in dead stock',
      'Quick, simple stock checks',
      'One honest number for every item'
    ],
    faqs: [
      {
        q: 'What is inventory management software?',
        a: 'Inventory management software tracks the items you hold, how many you have and how they move in and out. It replaces stock registers and spreadsheets with live counts that update as you buy and sell.'
      },
      {
        q: 'Is LocalPOS suitable as retail inventory management software?',
        a: 'Yes. Retail shops need quick item lookup, variants, units, low-stock alerts and stock that follows every bill. LocalPOS provides all of these in the same system you use to bill.'
      },
      {
        q: 'Does this work as POS inventory management software?',
        a: 'It does. Because billing and stock live together, a sale at the counter reduces stock immediately. There is no separate register to update.'
      },
      {
        q: 'How do low-stock alerts work?',
        a: 'You set a minimum quantity for an item. When stock falls to that level, the item shows up in your low-stock list so you can reorder before it runs out.'
      },
      {
        q: 'Can I add many items at once?',
        a: 'Yes. You can add items in bulk instead of typing each one separately, which saves hours when you first move your stock into LocalPOS.'
      }
    ],
    related: [
      'barcode-billing-software',
      'purchase-management-software',
      'pos-billing-software',
      'multi-store-management-software'
    ]
  },
  'barcode-billing-software': {
    primary: 'barcode billing software',
    secondary: [ 'barcode billing software with scanner', 'inventory management software with barcode reader' ],
    seoTitle: 'Barcode Billing Software for Faster Checkout | LocalPOS',
    seoDescription: 'Scan a barcode and the item lands on the bill. LocalPOS is barcode billing software with scanner support, label printing and automatic stock updates.',
    h1: 'Barcode billing software that bills as fast as you can scan',
    intro: 'LocalPOS is barcode billing software for shops that sell many items quickly. Scan a product and its name, price and tax appear on the bill at once. Print your own barcode labels, scan them at the counter, and stock updates itself with every sale.',
    h2Main: 'Barcode billing software with scanner support for faster checkout',
    benefits: [
      {
        icon: 'scan',
        title: 'Scan to bill',
        body: 'Each scan adds the item to the bill with the right price and tax. No typing, no searching.'
      },
      {
        icon: 'monitor',
        title: 'Works with common scanners',
        body: 'Use the USB or Bluetooth barcode scanners you can find in any market. If it can scan into a text box, it can scan into a bill.'
      },
      {
        icon: 'printer',
        title: 'Print your own labels',
        body: 'Create barcode labels with item name and price for products that do not come with one.'
      },
      {
        icon: 'tag',
        title: 'Use existing barcodes',
        body: 'Keep the manufacturer’s barcodes on packaged goods and only label what is missing.'
      },
      {
        icon: 'badge-check',
        title: 'Fewer wrong items',
        body: 'A scanned code picks exactly the right item, so similar-looking products do not get mixed up.'
      },
      {
        icon: 'boxes',
        title: 'Count stock by scanning',
        body: 'Walk the shelves with a scanner to check quantities, and fix differences with a stock adjustment.'
      }
    ],
    stepsHeading: 'From shelf label to a finished bill',
    steps: [
      {
        title: 'Give every item a barcode',
        body: 'Keep the barcode on the pack, or print a label from LocalPOS.'
      },
      {
        title: 'Scan at the counter',
        body: 'Each scan adds the item. Scan the same item again to raise the quantity.'
      },
      { title: 'Take payment', body: 'Choose how the customer pays and print or share the bill.' },
      { title: 'Stock updates', body: 'The items on the bill leave stock right away.' }
    ],
    outcomes: [
      'Faster checkout at peak hours',
      'Almost no wrong-item mistakes',
      'Quicker stock counts',
      'Shelves labelled and ready in less time'
    ],
    faqs: [
      {
        q: 'What do I need to start with barcode billing?',
        a: 'You need LocalPOS on a computer or tablet and a barcode scanner. If your products already carry barcodes, you can start scanning straight away. For loose items, print labels from LocalPOS.'
      },
      {
        q: 'Does LocalPOS work as barcode billing software with scanner support?',
        a: 'Yes. LocalPOS works with the common USB and Bluetooth barcode scanners that act like a keyboard, so there is no special driver to hunt for.'
      },
      {
        q: 'Can I print my own barcode labels?',
        a: 'Yes. You can create labels with the item name, price and barcode, and print them on a label printer to stick on products.'
      },
      {
        q: 'Can I count stock with a barcode reader?',
        a: 'Yes. Inventory management software with a barcode reader makes counts quick: scan each item on the shelf, compare the result with the system and adjust any difference.'
      },
      {
        q: 'What if an item has no barcode?',
        a: 'You can still add it to a bill by searching its name, or give it a barcode by printing a label.'
      }
    ],
    related: [
      'pos-billing-software',
      'inventory-management-software',
      'sales-management-software',
      'purchase-management-software'
    ]
  },
  'purchase-management-software': {
    primary: 'purchase management software',
    secondary: [],
    seoTitle: 'Purchase Management Software for Shops | LocalPOS',
    seoDescription: 'Record purchase orders, supplier bills and returns in one place. LocalPOS purchase management software updates stock and tracks what you owe each supplier.',
    h1: 'Purchase management software that ties buying to stock and payments',
    intro: 'LocalPOS is purchase management software for shops that buy from many suppliers. Create a purchase order, record the supplier’s bill when the goods arrive, and your stock goes up automatically. You also see what you owe each supplier and when it is due, so nothing slips.',
    h2Main: 'Purchase management software from first order to final payment',
    benefits: [
      {
        icon: 'clipboard',
        title: 'Purchase orders',
        body: 'Raise an order for a supplier, share it, and check it off when the goods arrive.'
      },
      {
        icon: 'package',
        title: 'Receive goods, update stock',
        body: 'Record what actually arrived. Stock and cost prices update from the same entry.'
      },
      {
        icon: 'gst-receipt',
        title: 'Supplier bills with GST',
        body: 'Enter the supplier’s invoice with its tax details, so your purchase records stay complete.'
      },
      {
        icon: 'wallet',
        title: 'What you owe, per supplier',
        body: 'See the balance for each supplier and the bills still waiting for payment.'
      },
      {
        icon: 'refresh',
        title: 'Purchase returns',
        body: 'Send damaged or wrong goods back and keep stock and supplier balances right.'
      },
      {
        icon: 'trend',
        title: 'Price history',
        body: 'Compare what you paid for an item over time to spot a supplier whose prices are creeping up.'
      }
    ],
    stepsHeading: 'The buying flow, in four steps',
    steps: [
      { title: 'Create a purchase order', body: 'Pick the supplier and the items and quantities you need.' },
      { title: 'Receive the goods', body: 'Match what arrived to the order and note any shortfall.' },
      {
        title: 'Record the supplier bill',
        body: 'Enter the bill. Stock goes up and the supplier balance is updated.'
      },
      {
        title: 'Pay and track dues',
        body: 'Record payments as you make them and see what is still pending.'
      }
    ],
    outcomes: [
      'No more lost supplier bills',
      'Stock that matches what actually arrived',
      'Supplier payments made on time',
      'Better prices from better records'
    ],
    faqs: [
      {
        q: 'What is purchase management software?',
        a: 'Purchase management software handles everything on the buying side: orders to suppliers, goods received, supplier bills, returns and payments. It connects them to your stock so records stay consistent.'
      },
      {
        q: 'Does stock update when I record a purchase?',
        a: 'Yes. When you record received goods or a supplier bill, the quantities go into stock and the purchase price is saved against the item.'
      },
      {
        q: 'Can I see how much I owe each supplier?',
        a: 'Yes. Every supplier has a running balance that shows pending bills and payments made, so you always know what is due.'
      },
      {
        q: 'Can I record purchase returns?',
        a: 'Yes. Record the goods you send back and LocalPOS reduces stock and adjusts the supplier balance for you.'
      }
    ],
    related: [
      'inventory-management-software',
      'payment-management-software',
      'sales-management-software',
      'multi-store-management-software'
    ]
  },
  'sales-management-software': {
    primary: 'sales management software',
    secondary: [
      'sales management software free',
      'sales management software for small business',
      'retail sales management software'
    ],
    seoTitle: 'Sales Management Software for Small Business | LocalPOS',
    seoDescription: 'See every sale, quote and return in one place. LocalPOS is sales management software for small business with fast invoices, discounts and clear sales records.',
    h1: 'Sales management software for small business owners',
    intro: 'LocalPOS is sales management software that keeps every sale, quotation and return in one place. Create an invoice in seconds, turn a quotation into a bill with a single click, and see who bought what and when. Small teams get the clarity of a large company without the paperwork.',
    h2Main: 'Sales management software that follows each sale from quote to payment',
    benefits: [
      {
        icon: 'file',
        title: 'Quotations that become invoices',
        body: 'Send a quote, and when the customer agrees, turn it into an invoice without typing it again.'
      },
      {
        icon: 'refresh',
        title: 'Returns and credit notes',
        body: 'Record a return against the original bill. Stock and the customer’s balance adjust together.'
      },
      {
        icon: 'percent',
        title: 'Pricing and discount control',
        body: 'Keep price lists for retail and wholesale customers, and limit who can change a price.'
      },
      {
        icon: 'clipboard',
        title: 'A daily sales register',
        body: 'Every bill of the day in one list, with totals by payment mode.'
      },
      {
        icon: 'chart',
        title: 'Sales by item, customer and staff',
        body: 'Find out what sells, who buys and which team member is closing the most sales.'
      },
      {
        icon: 'store',
        title: 'Retail and wholesale',
        body: 'Bill a single walk-in customer or a large order from a trade buyer, using the same screen.'
      }
    ],
    stepsHeading: 'Every sale, from first quote to final payment',
    steps: [
      {
        title: 'Quote or sell',
        body: 'Start with a quotation, or go straight to an invoice at the counter.'
      },
      { title: 'Invoice', body: 'Convert the quote to an invoice. Items, prices and tax carry over.' },
      { title: 'Collect payment', body: 'Record what the customer pays now and what remains due.' },
      { title: 'Review your sales', body: 'See daily totals and what drives them.' }
    ],
    outcomes: [
      'A complete record of every sale',
      'Less retyping between quote and invoice',
      'Clear view of best-selling items',
      'Fewer disputes over what was agreed'
    ],
    faqs: [
      {
        q: 'What is sales management software?',
        a: 'Sales management software records and organises your sales: quotations, orders, invoices, returns and payments. It shows what you sold, to whom and for how much, so you can run the business on facts.'
      },
      {
        q: 'Is there sales management software free to use?',
        a: 'Free tools usually limit invoices, users or features. You can book a free LocalPOS demo to see the full flow with your own products before you choose a plan. Plan details are on our pricing page.'
      },
      {
        q: 'Is LocalPOS suitable sales management software for small business?',
        a: 'Yes. It is built for owners and small teams, with simple screens, quick invoicing and clear reports, and no training manual needed to get started.'
      },
      {
        q: 'Is it retail sales management software?',
        a: 'It works for retail counters and for wholesale or trade sales. You can bill walk-in customers quickly and manage larger orders with quotations and price lists.'
      },
      {
        q: 'Can I turn a quotation into an invoice?',
        a: 'Yes. Items, prices and tax carry over to the invoice, so you do not enter anything twice.'
      }
    ],
    related: [
      'customer-management-software-for-small-business',
      'sales-reporting-software',
      'pos-billing-software',
      'payment-management-software'
    ]
  },
  'customer-management-software-for-small-business': {
    primary: 'customer management software for small business',
    secondary: [
      'sales customer management software',
      'best customer management software for small business',
      'cloud customer management software'
    ],
    seoTitle: 'Customer Management Software for Small Business | LocalPOS',
    seoDescription: 'Keep every customer’s details, purchases and dues in one place. LocalPOS is customer management software for small business, simple enough for the whole team.',
    h1: 'Customer management software for small business, built into every bill',
    intro: 'LocalPOS is customer management software for small business, built right into your billing. Each time you bill someone, their details, purchase history and pending balance are saved. The next time they walk in, you already know what they bought, what they owe and what they usually ask for.',
    h2Main: 'Customer management software for small business that stays simple',
    benefits: [
      {
        icon: 'user',
        title: 'A profile for every customer',
        body: 'Name, phone, address, GSTIN and notes, saved the first time you bill them.'
      },
      {
        icon: 'clipboard',
        title: 'Full purchase history',
        body: 'Open any customer and see every bill, return and payment in order.'
      },
      {
        icon: 'wallet',
        title: 'Dues at a glance',
        body: 'See who owes you money and how long it has been pending.'
      },
      {
        icon: 'users',
        title: 'Groups and tags',
        body: 'Mark regulars, wholesale buyers or credit customers and find them in one tap.'
      },
      {
        icon: 'phone',
        title: 'Know who to follow up with',
        body: 'Get a ready list of customers with pending dues or who have not bought in a while.'
      },
      {
        icon: 'handshake',
        title: 'Sales and customers together',
        body: 'Because customers live inside billing, there is no second system to update.'
      }
    ],
    stepsHeading: 'How customer records build themselves',
    steps: [
      {
        title: 'Add the customer while billing',
        body: 'Type a name or phone number on the bill. The profile is created for you.'
      },
      {
        title: 'Purchases and payments are saved',
        body: 'Every bill and payment links to the customer automatically.'
      },
      {
        title: 'Group your customers',
        body: 'Use tags such as regular, wholesale or credit to find people quickly.'
      },
      { title: 'Follow up', body: 'Contact customers with pending dues, or those who have gone quiet.' }
    ],
    outcomes: [
      'Dues collected sooner',
      'Regulars recognised and served faster',
      'No customer details kept in notebooks',
      'A clear picture of your best customers'
    ],
    faqs: [
      {
        q: 'What is customer management software for small business?',
        a: 'It is a system that keeps customer details, purchases, payments and pending balances in one place. For a small business it replaces notebooks, phone contacts and memory with a record every team member can use.'
      },
      {
        q: 'What makes the best customer management software for small business?',
        a: 'The best one is the one your team will actually use. It should be quick to add a customer, show history and dues in one screen, and need no separate data entry. That is why LocalPOS builds customer records into billing.'
      },
      {
        q: 'Is LocalPOS cloud customer management software?',
        a: 'Yes. Your customer records are stored online, so you and your team can open them from any device with an internet connection.'
      },
      {
        q: 'Does this work as sales customer management software?',
        a: 'Yes. Every sale is linked to a customer, so you can see each person’s purchases, returns, payments and balance without switching between tools.'
      },
      {
        q: 'Do I need to enter every customer by hand?',
        a: 'No. A customer is created when you bill them for the first time. You can add details like address or GSTIN later.'
      }
    ],
    related: [
      'sales-management-software',
      'payment-management-software',
      'sales-reporting-software',
      'pos-billing-software'
    ]
  },
  'payment-management-software': {
    primary: 'payment management software',
    secondary: [],
    seoTitle: 'Payment Management Software for Shops | LocalPOS',
    seoDescription: 'Track every payment you receive and make. LocalPOS payment management software records cash, UPI and card payments and shows pending dues clearly.',
    h1: 'Payment management software that shows who has paid and who hasn’t',
    intro: 'LocalPOS is payment management software that tells you, at a glance, who has paid and who still owes you. Record cash, UPI, card or part payments against each invoice, keep track of what you owe suppliers, and stop chasing dues from memory.',
    h2Main: 'Payment management software for money in and money out',
    benefits: [
      {
        icon: 'card',
        title: 'Every payment mode',
        body: 'Record cash, UPI, cards and bank transfers, on one bill or across several.'
      },
      {
        icon: 'plus',
        title: 'Part payments and advances',
        body: 'Take an advance, accept part payment and leave the balance due, all against the same invoice.'
      },
      {
        icon: 'clock',
        title: 'Dues sorted by age',
        body: 'See what is overdue by 7, 30 or 60 days so you know where to start.'
      },
      {
        icon: 'truck',
        title: 'Supplier payments',
        body: 'Record what you pay your suppliers and see what is still pending with each of them.'
      },
      {
        icon: 'banknote',
        title: 'Daily collection summary',
        body: 'At closing, see how much came in by cash, UPI and card, ready to match against your drawer and bank.'
      },
      {
        icon: 'bell',
        title: 'A follow-up list',
        body: 'Know which customers to call today, with the amount and the oldest bill in front of you.'
      }
    ],
    stepsHeading: 'Tracking money in four steps',
    steps: [
      {
        title: 'Record the payment',
        body: 'Choose the mode and amount when you bill, or add a payment later.'
      },
      {
        title: 'It matches the invoice',
        body: 'The payment is linked to the bill and the customer’s balance updates.'
      },
      { title: 'Watch your dues', body: 'See pending amounts by customer, supplier and age.' },
      { title: 'Follow up', body: 'Work through the list of overdue accounts without hunting for details.' }
    ],
    outcomes: [
      'Dues collected faster',
      'A daily cash tally that closes cleanly',
      'No more notebook of udhaar',
      'Clear view of money in and out'
    ],
    faqs: [
      {
        q: 'What is payment management software?',
        a: 'Payment management software records the money your business receives and pays: customer payments, part payments, advances and supplier payments. It shows which invoices are paid and which are still due.'
      },
      {
        q: 'Can I record part payments?',
        a: 'Yes. Accept any amount against an invoice and the rest stays as a balance due. You can add further payments later until it is cleared.'
      },
      {
        q: 'Can I see which customers have pending payments?',
        a: 'Yes. You get a list of customers with dues, grouped by how long they have been pending, so you can prioritise follow-ups.'
      },
      {
        q: 'Does LocalPOS process payments for me?',
        a: 'LocalPOS records payments against your bills. You keep receiving money the way you do today, by cash, UPI or card, and LocalPOS keeps the books straight.'
      }
    ],
    related: [
      'customer-management-software-for-small-business',
      'sales-management-software',
      'purchase-management-software',
      'sales-reporting-software'
    ]
  },
  'sales-reporting-software': {
    primary: 'sales reporting software',
    secondary: [ 'business reporting software' ],
    seoTitle: 'Sales Reporting Software with Live Reports | LocalPOS',
    seoDescription: 'Know how your business is doing without spreadsheets. LocalPOS sales reporting software shows daily sales, best sellers, profit and stock reports.',
    h1: 'Sales reporting software that shows how your business is really doing',
    intro: 'LocalPOS is sales reporting software that turns your daily bills into clear reports. See today’s sales, your best-selling items, your top customers and where stock is piling up, without building a single spreadsheet. Good business reporting software should answer questions, not create homework.',
    h2Main: 'Sales reporting software for decisions you can make today',
    benefits: [
      {
        icon: 'chart',
        title: 'Today’s sales at a glance',
        body: 'Open the app and see sales, invoices and collections for the day before you finish your tea.'
      },
      {
        icon: 'tag',
        title: 'Item and category reports',
        body: 'Find your best sellers and slow movers, so you can buy more of one and less of the other.'
      },
      {
        icon: 'users',
        title: 'Customer and staff reports',
        body: 'See who buys the most and which team member is billing the most.'
      },
      {
        icon: 'trend',
        title: 'A simple profit view',
        body: 'Compare selling price with cost to see which items actually earn money.'
      },
      {
        icon: 'gst-receipt',
        title: 'Tax summaries',
        body: 'Get tax collected by rate and HSN, ready to share with your accountant.'
      },
      {
        icon: 'download',
        title: 'Download and share',
        body: 'Export a report as a file to print, email or hand over at review time.'
      }
    ],
    stepsHeading: 'From daily bills to a report in minutes',
    steps: [
      {
        title: 'Bill as usual',
        body: 'You do not need to do anything extra. Reports build from your bills.'
      },
      { title: 'Choose a report', body: 'Pick sales, stock, customers, payments or tax.' },
      { title: 'Filter what you need', body: 'Narrow by date, item, customer, staff or store.' },
      { title: 'Share it', body: 'Download or share the report with your team or accountant.' }
    ],
    outcomes: [
      'Spot best sellers and slow stock early',
      'Know your daily numbers without waiting for the month end',
      'Hand your accountant clean records',
      'Decide with facts, not feelings'
    ],
    faqs: [
      {
        q: 'What is sales reporting software?',
        a: 'Sales reporting software collects your sales data and turns it into reports: daily totals, best-selling items, customer and staff performance, profit and tax summaries. You see what is working without building spreadsheets by hand.'
      },
      {
        q: 'How is business reporting software different from billing reports?',
        a: 'Business reporting software looks across sales, stock, payments and customers, not just single invoices. LocalPOS reports draw from all of them because everything lives in one system.'
      },
      {
        q: 'Can I see reports for a single day, week or month?',
        a: 'Yes. Pick any date range and the report updates, so you can compare today with yesterday or this month with last month.'
      },
      {
        q: 'Can I export reports?',
        a: 'Yes. You can download a report to print, share or keep for your records.'
      }
    ],
    related: [
      'sales-management-software',
      'inventory-management-software',
      'gst-billing-software',
      'multi-store-management-software'
    ]
  },
  'multi-store-management-software': {
    primary: 'multi store management software',
    secondary: [],
    seoTitle: 'Multi Store Management Software for Retail | LocalPOS',
    seoDescription: 'Run every branch from one login. LocalPOS multi store management software shows sales and stock across all your stores and lets you transfer stock between them.',
    h1: 'Multi store management software to run every branch from one place',
    intro: 'LocalPOS is multi store management software for owners with more than one shop. See sales, stock and payments for every branch from a single login, compare stores side by side, and move stock from one location to another without phone calls and handwritten slips.',
    h2Main: 'Multi store management software with a clear view of every branch',
    benefits: [
      {
        icon: 'building',
        title: 'One login, every store',
        body: 'Switch between branches in a tap, or look at all of them together.'
      },
      {
        icon: 'chart',
        title: 'Store-wise and combined reports',
        body: 'Compare branches side by side, or add them up for the full picture.'
      },
      {
        icon: 'truck',
        title: 'Stock transfers',
        body: 'Send stock from one store to another and track it until it arrives.'
      },
      {
        icon: 'lock',
        title: 'Access by store',
        body: 'Let a store manager see their own branch, while you see them all.'
      },
      {
        icon: 'layers',
        title: 'One item list',
        body: 'Keep one master list of items, with stock tracked separately for each store.'
      },
      {
        icon: 'file',
        title: 'Separate invoice series',
        body: 'Give each branch its own invoice numbering so records stay tidy.'
      }
    ],
    stepsHeading: 'Growing from one shop to many',
    steps: [
      { title: 'Add your stores', body: 'Create each branch with its own name, address and details.' },
      { title: 'Give your team access', body: 'Decide who can see and do what in each store.' },
      {
        title: 'Bill and track stock per store',
        body: 'Each branch bills on its own and keeps its own stock.'
      },
      { title: 'Review everything together', body: 'Compare stores and move stock to where it sells.' }
    ],
    outcomes: [
      'One view of the whole business',
      'Stock moved to where it sells best',
      'Staff limited to the right branch',
      'No end-of-month hunt for each store’s numbers'
    ],
    faqs: [
      {
        q: 'What is multi store management software?',
        a: 'Multi store management software lets a business with several shops manage billing, stock, payments and reports for all of them from one system, while keeping each store’s records separate.'
      },
      {
        q: 'Can each store keep its own stock?',
        a: 'Yes. Every store tracks its own stock, while all stores share one master item list, so naming and pricing stay consistent.'
      },
      {
        q: 'Can I see all my stores together?',
        a: 'Yes. You can view reports for a single store or combine them, and compare stores side by side.'
      },
      {
        q: 'Can a store manager only see their own store?',
        a: 'Yes. You can give each team member access to specific stores, so managers see their own branch while you see the whole business.'
      }
    ],
    related: [
      'inventory-management-software',
      'sales-reporting-software',
      'sales-management-software',
      'purchase-management-software'
    ]
  }
}

/** Full feature definitions: navigation metadata merged with page content. */
export const FEATURES: Feature[] = FEATURE_META.map((meta) => {
  const content = CONTENT[meta.slug]
  if (!content) throw new Error(`Missing page content for feature "${meta.slug}" in src/data/features.ts`)
  return { ...meta, ...content }
})

export const getFeature = (slug: string): Feature => {
  const f = FEATURES.find((x) => x.slug === slug)
  if (!f) throw new Error(`Unknown feature: ${slug}`)
  return f
}
