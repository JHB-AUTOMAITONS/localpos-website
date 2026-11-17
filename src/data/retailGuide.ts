/** Long-form copy for the retail billing page (/solutions/retail-billing-software/). Inline markup: [text](/path/) and **bold**. */

export interface RetailFeature {
  title: string
  what: string
  how: string
  use: string
  problem: string
  benefit: string
}

export const RETAIL_FEATURES: RetailFeature[] = [
  {
    title: 'Fast POS billing and quick checkout',
    what: 'Builds a bill on one screen.',
    how: 'Search an item by name or code, or scan it, then set the quantity, add a discount if you offer one, take payment and print or share the bill. A bill in progress can be held and resumed.',
    use: 'At a busy counter, hold one bill while the customer fetches another item, serve the next person, then come back without losing a line.',
    problem: 'Queues and typing errors.',
    benefit: 'A bill takes a few taps and the screen matches the shelf. See [POS billing software](/features/pos-billing-software/).'
  },
  {
    title: 'GST billing and invoice management',
    what: 'Produces GST invoices with your GSTIN, each item’s HSN code and the right tax split.',
    how: 'Set the GST rate and HSN once per item. Same-state sales show CGST and SGST; other-state sales show IGST. Prices can be tax-inclusive (MRP) or tax-exclusive, and invoices follow a running number series.',
    use: 'Walk-in customers and business customers with a GSTIN are billed in the same system.',
    problem: 'Manual tax maths and mixed-up invoice numbers.',
    benefit: 'Tax by rate, an HSN summary and a sales register your accountant can work from. Confirm rates and filing with your chartered accountant. See [GST billing software](/features/gst-billing-software/).'
  },
  {
    title: 'Barcode scanning and product management',
    what: 'Adds items to a bill by scan, and prints labels for items without a barcode.',
    how: 'Common USB and Bluetooth scanners that type like a keyboard work without special drivers. A quick test: if your scanner can type a code into a text box, it can scan an item onto a bill. You can also count shelf stock by scanning and adjust the difference.',
    use: 'Scan packaged goods as they are and print labels only for loose or unbranded items.',
    problem: 'Slow searching and wrong item picks.',
    benefit: 'Faster, more accurate billing. Part of the Business plan. See [barcode billing software](/features/barcode-billing-software/).'
  },
  {
    title: 'Real-time inventory management',
    what: 'Keeps a live count for every item.',
    how: 'Each sale reduces stock; purchases and returns add it back. Set a reorder level per item and a low-stock list shows what is running short. Items can have variants (size, colour) and units (kg, litre, box), and stock adjustments are recorded with a reason.',
    use: 'A weekly look at the low-stock list drives reordering; bulk entry gets you started quickly.',
    problem: 'Stockouts, overstock and unexplained gaps.',
    benefit: 'Stock figures you can trust, with stock value at cost and selling price. See [retail inventory management software](/features/inventory-management-software/).'
  },
  {
    title: 'Customer and credit management',
    what: 'Keeps a record for every customer.',
    how: 'A customer is created the first time you bill them; add an address or GSTIN later. Open a customer to see bills, returns, payments and balance, and see who has dues grouped by age.',
    use: 'Regulars who buy on account (udhaar) are billed normally and the balance stays on their record.',
    problem: 'Forgotten or disputed credit.',
    benefit: 'You know who owes what and who your best customers are. See [customer management software](/features/customer-management-software-for-small-business/).'
  },
  {
    title: 'Multiple payment management',
    what: 'Records how each bill was paid.',
    how: 'Choose cash, UPI or card, or split one bill across modes. A part payment leaves the rest as a balance due, and advances can be recorded.',
    use: 'A customer pays part by UPI and the rest in cash on one bill.',
    problem: 'Collections that do not tally at day end.',
    benefit: 'A daily total by payment mode. LocalPOS records payments; you collect money the way you do today. See [payment management software](/features/payment-management-software/).'
  },
  {
    title: 'Purchase and supplier management',
    what: 'Records the buying side of the shop.',
    how: 'Create purchase orders, record goods received and supplier bills, and note purchase returns. Stock rises when goods are received and each supplier has a running balance.',
    use: 'Check what you owe a distributor before paying.',
    problem: 'Stock entered late and unclear supplier dues.',
    benefit: 'Buying and selling records agree. Part of the Business plan. See [purchase management software](/features/purchase-management-software/).'
  },
  {
    title: 'Sales reports and business analytics',
    what: 'Turns bills into reports.',
    how: 'Pick any date range for sales, best-selling items, customer and staff performance, profit and tax summaries, and download a report to print or share.',
    use: 'Compare this month with last, or spot slow movers before you reorder.',
    problem: 'Decisions made from memory.',
    benefit: 'You see what is working. Starter has core reports; Business and Multi-store have full reports. See [sales reporting software](/features/sales-reporting-software/).'
  },
  {
    title: 'Multi-store and branch management',
    what: 'Runs several shops from one login.',
    how: 'Each store tracks its own stock under one master item list. Move stock between stores and view reports for one store or all combined.',
    use: 'An owner with two branches checks both from one screen.',
    problem: 'Branch stock and sales kept in separate books.',
    benefit: 'Growth without starting again. Available on the Multi-store plan. See [multi-store management software](/features/multi-store-management-software/).'
  },
  {
    title: 'Staff and user management',
    what: 'Gives each team member the access they need.',
    how: 'Assign staff access, decide who may give discounts or change prices and, on Multi-store, limit a manager to their own branch.',
    use: 'A cashier bills; only the owner edits prices.',
    problem: 'Unchecked discounts and price changes.',
    benefit: 'Control without watching every bill. Staff access control is part of the Business plan.'
  },
  {
    title: 'Product returns and refund management',
    what: 'Records a return against the original bill.',
    how: 'Stock and the customer’s balance adjust together, with a credit note.',
    use: 'A customer returns a shirt; it goes back into stock and the customer’s record is updated.',
    problem: 'Returns noted on paper and never reflected in stock.',
    benefit: 'Stock and sales stay accurate.'
  },
  {
    title: 'Retail pricing and discount management',
    what: 'Controls the price on the bill.',
    how: 'Apply item or bill discounts, keep price lists for retail and wholesale customers, and limit who can change a price.',
    use: 'A trade customer is billed from a wholesale list and a walk-in at MRP.',
    problem: 'Inconsistent prices and unauthorised discounts.',
    benefit: 'The same item is billed the same way every time.'
  }
]

export const BILL_STEPS = [
  { title: 'Product selection', body: 'The customer brings items to the counter.' },
  { title: 'Scan or search', body: 'Scan the barcode, or type part of the name.' },
  { title: 'Price and tax', body: 'Price, quantity and GST appear on the bill automatically.' },
  { title: 'Discount', body: 'Apply a discount where you offer one, within the limits set for that user.' },
  { title: 'Payment', body: 'Cash, UPI, card or a mix.' },
  { title: 'Invoice', body: 'Print on a receipt printer or share the invoice digitally.' },
  { title: 'Inventory update', body: 'Each item on the bill leaves stock straight away.' },
  { title: 'Sales record', body: 'The sale joins the day’s totals, the customer’s record and your reports.' }
]

export const WORKED_BILL: Array<[string, string, boolean?]> = [
  ['USB cable', '₹300.00'],
  ['Earphones', '₹700.00'],
  ['Subtotal', '₹1,000.00'],
  ['Bill discount', '−₹50.00'],
  ['Taxable value', '₹950.00', true],
  ['CGST 9%', '₹85.50'],
  ['SGST 9%', '₹85.50'],
  ['Bill total', '₹1,121.00', true]
]

export const BENEFITS: Array<[string, string]> = [
  ['Faster checkout', 'Scan or search, pay, print. Hold a bill instead of making a customer wait.'],
  ['Fewer manual billing errors', 'Tax, discount and total are calculated, not typed.'],
  ['Better stock visibility', 'The screen shows what is on the shelf, item by item.'],
  ['Improved inventory control', 'Reorder levels, adjustments with reasons and item history reduce guesswork.'],
  ['Easier sales tracking', 'Sales by day, item, customer and payment mode, without a spreadsheet.'],
  ['Better customer management', 'Purchase history and dues are visible when the customer arrives.'],
  ['Better business decisions', 'Know best-sellers, slow movers and tax collected before you reorder.'],
  ['Less manual work', 'One entry at the counter updates billing, stock, GST and reports.']
]

export const SHOP_TYPES: Array<{ name: string; headache: string; help: string }> = [
  { name: 'Grocery stores', headache: 'Many small items and loose goods on one bill.', help: 'Scan packaged goods as they are, print labels only for loose items, and bill by kg where needed. Regulars buying on account keep a running balance.' },
  { name: 'Supermarkets', headache: 'Queues across several counters and thousands of items.', help: 'Fast scanning, bulk item entry and per-item reorder levels keep counters moving and shelves full. See [supermarket billing software](/solutions/supermarket-billing-software/).' },
  { name: 'General stores', headache: 'A wide, mixed range from soap to school bags.', help: 'Search by name finds items without barcodes, and categories keep a wide range tidy.' },
  { name: 'Clothing and textile shops', headache: 'The same style in many sizes and colours.', help: 'One shirt with sizes and colours is one item with variants, and stock shows which size is left.' },
  { name: 'Electronics shops', headache: 'Higher-value bills where tax and discounts matter.', help: 'Item-wise GST, controlled discounts and a clear invoice protect both sides.' },
  { name: 'Hardware shops', headache: 'Items sold by piece, kilo, metre or box.', help: 'Units on each item keep stock and billing in the right measure.' },
  { name: 'Stationery stores', headache: 'Hundreds of low-price items and a seasonal rush.', help: 'Scanning keeps the queue short, and low-stock alerts help you reorder before school season.' },
  { name: 'Footwear shops', headache: 'Whether you can serve the customer depends on the size in stock.', help: 'Size variants show what is left in each size.' },
  { name: 'Cosmetics stores', headache: 'Many products that look alike.', help: 'Barcode scanning cuts wrong-item mistakes at the counter.' }
]

export const BUYING_GUIDE: Array<[string, string, string]> = [
  ['Billing speed', 'Few steps per bill; hold and resume.', 'Can I bill 10 items in under a minute?'],
  ['GST requirements', 'GSTIN, HSN, CGST/SGST/IGST, inclusive and exclusive pricing.', 'Does the invoice carry everything my buyer needs?'],
  ['Inventory management', 'Stock changes on every bill; low-stock list; variants and units.', 'Does a sale reduce stock immediately?'],
  ['Barcode compatibility', 'Works with common scanners; label printing.', 'Does my existing scanner work?'],
  ['Payment options', 'Cash, UPI, card, split and part payments.', 'Can one bill use two modes?'],
  ['Sales reports', 'Daily, item, customer and tax reports.', 'Can I close the day without a calculator?'],
  ['Ease of use', 'Staff learn it in a day.', 'Can my cashier try it during the demo?'],
  ['Hardware compatibility', 'Runs on devices you already own.', 'Which printer and scanner models work?'],
  ['Multi-store needs', 'Store-wise stock, shared item list, transfers.', 'Can I add a branch later without starting again?'],
  ['Pricing and support', 'Clear plans and a person to ask.', 'What does each plan include, and how do I reach support?']
]

export const WHY_LOCALPOS: Array<[string, string]> = [
  ['Built around the counter', 'Search or scan, hold a bill, split a payment, print or share. Checkout is the centre of the product, not an add-on.'],
  ['Billing and stock in one system', 'There is no separate register to update. A bill reduces stock and updates the customer and the day’s totals.'],
  ['Made for Indian shops', 'Rupee formatting, GSTIN, HSN and the CGST, SGST and IGST split are part of the product.'],
  ['Business visibility', 'Day-close totals by payment mode, customer dues and date-range reports show how the shop is doing.'],
  ['Starts small, grows with you', 'A computer or tablet is enough to begin. Add a scanner and printer when volume rises, and a Multi-store plan when you open a second branch.'],
  ['Plain about limits', 'LocalPOS records payments; it does not process them. It keeps records organised for your accountant; it does not replace one.']
]

export const PLAN_TABLE: Array<[string, string, string, string]> = [
  ['POS billing with GST invoices', 'Yes', 'Yes', 'Yes'],
  ['Inventory with low-stock alerts', 'Yes', 'Yes', 'Yes'],
  ['Customer and payment records', 'Yes', 'Yes', 'Yes'],
  ['Barcode billing and label printing', 'No', 'Yes', 'Yes'],
  ['Purchase and supplier management', 'No', 'Yes', 'Yes'],
  ['Reports', 'Core', 'Full', 'Full'],
  ['Staff access control', 'No', 'Yes', 'Yes'],
  ['Multi-store and stock transfers', 'No', 'No', 'Yes']
]
