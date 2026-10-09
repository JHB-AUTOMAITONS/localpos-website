import type { BlogContent, BlogPost } from './types'
import { BLOG_META } from './blogMeta'

/**
 * Article text (blocks and FAQs), keyed by slug. Inline `[text](/path/)` links and **bold** are supported.
 * Titles, SEO fields, dates and cards live in blogMeta.ts. Add a post by adding an entry in both files.
 */
const CONTENT: Record<string, BlogContent> = {
  'how-to-choose-a-billing-system-for-a-small-shop': {
    blocks: [
      {
        type: 'p',
        text: 'If you are working out how to choose a billing system for a small shop, the hard part is not finding options. There are plenty. The hard part is knowing what really matters on a busy Saturday evening with a queue at the counter. This checklist keeps it practical: what to test, what to ask, and what to ignore.'
      },
      { type: 'h2', text: 'Start with how your shop actually works' },
      {
        type: 'p',
        text: 'Before you look at any product, write down your own day. How many bills do you make on a normal day and on your busiest day? Do you sell loose items, packaged goods, or both? Do customers pay by cash, UPI, card or on credit? Do you give discounts? How many people bill at the same time? Five lines on paper will stop you buying something built for a different kind of shop.'
      },
      { type: 'h2', text: 'How to choose a billing system for a small shop: the checklist' },
      {
        type: 'ol',
        items: [
          '**Speed at the counter.** A bill should take a few taps. During any trial, bill ten of your real items with a clock running. If it feels slow with ten items, it will feel slower with a queue.',
          '**GST done correctly.** Check that it holds your GSTIN, HSN codes and tax rates, and splits CGST, SGST and IGST on its own. Ask your accountant to look at a sample invoice.',
          '**Stock that moves with each sale.** If you have to update stock separately, it will be wrong within a month. Billing and stock should change together.',
          '**Payments and credit.** It should record cash, UPI, card and part payments, and show who owes you money without a separate notebook.',
          '**Reports you will actually read.** Daily sales, best sellers and pending dues, without building spreadsheets.',
          '**Works with your hardware.** Check the printer, scanner and screen you already own or plan to buy.',
          '**Easy for your staff.** If your counter staff can bill after a short walkthrough, it is simple enough. If they need a week of training, it is not.',
          '**Your data stays yours.** Ask how you can export your items, customers and invoices if you ever leave.'
        ]
      },
      { type: 'h2', text: 'Questions to ask before you pay' },
      {
        type: 'ul',
        items: [
          'What happens if the internet goes down for an hour? Can I keep billing, and what syncs afterwards?',
          'Is there a limit on invoices, users, items or stores, and what does it cost to go past it?',
          'Who do I call when something breaks, in which language, and during which hours?',
          'How do I bring in my existing items and customers? Is there bulk entry or help with the move?',
          'What is included in the price: updates, support, extra users, extra stores, printing?'
        ]
      },
      { type: 'h2', text: 'Run a one-day test with real bills' },
      {
        type: 'p',
        text: 'A demo with sample data proves very little. Ask to try the system with your own items and your own prices, and bill for a day alongside your current method. Note three things: how long each bill takes, whether any bill needed a workaround, and whether closing the day was quicker than before. If you have a regular customer who buys on credit, run that case too. It is where weak systems tend to fall apart.'
      },
      { type: 'h2', text: 'Mistakes small shops make' },
      {
        type: 'ul',
        items: [
          'Choosing on price alone, then paying for it later in lost time at the counter.',
          'Paying for features you will never use, such as a restaurant module for a garment shop.',
          'Skipping the trial because the demo looked good.',
          'Leaving support questions until something goes wrong.',
          'Starting in the middle of festival season. Begin in a quieter week so staff can learn without pressure.'
        ]
      },
      { type: 'h3', text: 'A simple way to compare two options' },
      {
        type: 'p',
        text: 'Give each system a score from one to five on the eight checklist points, using what you saw in your own trial. Add up the scores, then look at the yearly cost. A slightly dearer system that saves fifteen minutes at closing every day is usually the cheaper one in practice.'
      },
      {
        type: 'callout',
        title: 'How LocalPOS fits this checklist',
        text: 'LocalPOS is built around these basics: [billing at the counter](/features/pos-billing-software/) in a few taps, [GST-ready invoices](/features/gst-billing-software/), and [stock that follows every sale](/features/inventory-management-software/). You can [book a demo](/book-a-demo/) and test it with your own items before you decide.'
      }
    ],
    faqs: [
      {
        q: 'How much should a small shop spend on a billing system?',
        a: 'There is no single right number. Compare the total yearly cost, including support, extra users and any hardware, against the time the system saves you at the counter and at closing. Be careful with anything that looks free until you hit a limit on invoices or users, and ask every vendor what is not included in the price.'
      },
      {
        q: 'Do I need a barcode scanner and a receipt printer?',
        a: 'Not to start. You can search items by name and share bills digitally. A scanner helps once you sell many packaged items a day, and a receipt printer helps when customers expect a paper bill. Choose a system that works with common hardware so you can add either one later.'
      },
      {
        q: 'How long does it take to switch from handwritten bills?',
        a: 'Most of the time goes into entering your items and prices, not into learning the screen. Use bulk entry for a long item list, run the new system next to your paper bills for a week, and stop the paper once the daily totals match.'
      }
    ]
  },
  'gst-invoice-format-in-india': {
    blocks: [
      {
        type: 'p',
        text: 'Every registered business that sells goods or services has to issue an invoice, and getting the GST invoice format in India right protects both you and your buyer. A wrong or incomplete invoice can hold up your customer’s input tax credit and leave you correcting records later. This guide covers the details a tax invoice commonly carries, how B2B and B2C invoices differ, and the mistakes shops make most often.'
      },
      {
        type: 'callout',
        title: 'Check against current rules',
        text: 'This is a general guide, not tax advice. Rules, thresholds and formats change, and some businesses, such as those under the composition scheme, follow different rules. Confirm the exact requirements for your business with your chartered accountant.'
      },
      { type: 'h2', text: 'The GST invoice format in India, field by field' },
      {
        type: 'p',
        text: 'The GST rules list the particulars of a tax invoice. In plain terms, a typical invoice carries these parts:'
      },
      {
        type: 'ul',
        items: [
          '**Supplier details:** your name, address and GSTIN, with the heading “Tax Invoice”.',
          '**Invoice number:** unique and in a running series, with no duplicates. The permitted length is limited, so check the current rule, and ask how to run separate series for separate branches.',
          '**Date of issue.**',
          '**Buyer details:** name, address and GSTIN if the buyer is registered. For an unregistered buyer, name, address and state are needed in some cases, depending on the invoice value.',
          '**Place of supply and state code,** which decide whether the tax is CGST and SGST, or IGST.',
          '**Description of goods or services,** with the HSN code for goods or the SAC for services.',
          '**Quantity, unit and rate** for each line.',
          '**Discount,** if any, and the **taxable value** after the discount.',
          '**Tax rate and tax amount,** shown separately as CGST, SGST or IGST, and cess where it applies.',
          '**Total invoice value,** in figures and usually in words as well.',
          '**Reverse charge note,** if the buyer pays the tax under reverse charge.',
          '**Signature** or digital signature of the supplier or an authorised person.'
        ]
      },
      { type: 'h2', text: 'Tax invoice or bill of supply?' },
      {
        type: 'p',
        text: 'Not every bill is a tax invoice. A business under the composition scheme, or one that sells only exempt goods, issues a bill of supply instead and does not charge GST on it. Using the wrong document is a common mistake, so confirm which one applies to you before you set up your invoice layout.'
      },
      { type: 'h2', text: 'B2B and B2C invoices: what changes' },
      { type: 'h3', text: 'Selling to a registered business' },
      {
        type: 'p',
        text: 'Put the buyer’s GSTIN on the invoice and check it twice. Your buyer claims input tax credit based on what you issue, so a wrong GSTIN or a wrong tax split creates a problem for them, and a phone call for you.'
      },
      { type: 'h3', text: 'Selling to walk-in customers' },
      {
        type: 'p',
        text: 'For customers without a GSTIN the invoice is simpler, but you still show your own details, the item descriptions and the tax. Many shops price at MRP with tax included. The invoice should still break the amount into taxable value and tax, so the numbers add up to what you report.'
      },
      { type: 'h2', text: 'How the CGST, SGST and IGST split works' },
      {
        type: 'p',
        text: 'If you and the buyer are in the same state, the tax is split equally into CGST and SGST. If the sale crosses a state border, the full tax shows as IGST. Place of supply drives this, so capture the buyer’s state properly on every B2B invoice.'
      },
      {
        type: 'p',
        text: 'For example, at an 18% rate (check the rate that applies to your item), a ₹1,000 sale carries ₹180 of tax. In the same state that shows as ₹90 CGST and ₹90 SGST. Across states it shows as ₹180 IGST. The invoice total is ₹1,180 either way.'
      },
      { type: 'h2', text: 'Mistakes that cause trouble later' },
      {
        type: 'ul',
        items: [
          'Skipping or reusing invoice numbers.',
          'A missing or wrong HSN code on an item.',
          'Choosing the wrong tax split for the place of supply.',
          'Editing or deleting an invoice after it has been issued, instead of raising a credit note.',
          'Typing the buyer’s GSTIN wrongly.',
          'Mixing up tax-inclusive and tax-exclusive prices, which changes the taxable value.'
        ]
      },
      { type: 'h2', text: 'Keeping invoices tidy day to day' },
      {
        type: 'p',
        text: 'Set up your business details, item HSN codes and tax rates once, so every invoice picks them up automatically instead of being typed again. That is how [GST invoicing in LocalPOS](/features/gst-billing-software/) works, and the [tax summaries in your reports](/features/sales-reporting-software/) give your accountant a clean starting point each month.'
      },
      {
        type: 'p',
        text: 'Larger businesses may also have to follow e-invoicing, and moving goods can need an e-way bill. Ask your chartered accountant whether either applies to you, and when.'
      }
    ],
    faqs: [
      {
        q: 'Do I have to issue a GST invoice for every sale?',
        a: 'Registered businesses generally issue a tax invoice for taxable sales. The rules include some relaxations for very small sales to unregistered customers, but the details and limits change, so ask your chartered accountant what applies to your shop before you rely on them.'
      },
      {
        q: 'Can I edit a GST invoice after I have issued it?',
        a: 'Once an invoice has been issued and shared, the usual practice is to leave it as it is and correct the mistake with a credit note or debit note, so your numbering and records stay clean. Ask your accountant how to handle a correction that falls in a different return period.'
      },
      {
        q: 'What is the difference between HSN and SAC?',
        a: 'HSN codes classify goods and SAC codes classify services. Both appear on the invoice beside the item description and help decide the tax rate and reporting. The number of digits you must show can depend on your turnover, so confirm it with your accountant.'
      }
    ]
  },
  'how-a-barcode-system-works-in-a-retail-shop': {
    blocks: [
      {
        type: 'p',
        text: 'Walk into any supermarket and you see how a barcode system works in a retail shop within seconds: the cashier scans, the item appears with its price, and the queue moves. The same idea works in a small store, and it does not need a big budget. This guide explains what is really happening when you scan, then walks you through setting up barcodes in your own shop.'
      },
      { type: 'h2', text: 'How a barcode system works in a retail shop, from scan to bill' },
      {
        type: 'p',
        text: 'A barcode does not contain the price or the product name. It is just a number, drawn as lines that a scanner can read quickly. When you scan it, the scanner types that number into your billing screen, exactly as if you had typed it on a keyboard. Your billing system then looks the number up in your item list and pulls in the name, price and tax rate saved against it. That is why your item list must be correct. The barcode is only the key; the item record holds the information.'
      },
      { type: 'h2', text: 'The kinds of barcodes you will meet' },
      {
        type: 'ul',
        items: [
          '**Manufacturer barcodes** are printed on packaged goods such as biscuits, soap and medicines. They follow a standard format, commonly 13 digits, and you can use them as they are.',
          '**Your own barcodes** are for loose or unpackaged items, such as garments, utensils or goods you repack. You choose the code and print a label.',
          '**Short internal codes** are quick numbers, like 1001, that staff can type if a label is damaged.'
        ]
      },
      { type: 'h2', text: 'What you need to set up' },
      {
        type: 'ul',
        items: [
          'A billing system that supports barcode scanning and lets you save a barcode against every item.',
          'A barcode scanner. A USB scanner plugs in and behaves like a keyboard. A Bluetooth scanner connects wirelessly and suits a bigger counter.',
          'A label printer and label rolls, if some of your items have no manufacturer barcode.',
          'A clean item list with correct names, prices and tax rates.'
        ]
      },
      { type: 'h2', text: 'Six steps to set up barcodes in your shop' },
      {
        type: 'ol',
        items: [
          '**Clean your item list.** Remove duplicates, fix names and confirm every price and tax rate. Barcodes on a messy list only produce wrong bills faster.',
          '**Separate packaged and loose items.** Packaged goods already carry a barcode. Scan it once and save it against the item.',
          '**Create codes for the rest.** Give each loose item its own code, and a separate code for each size or colour if price or stock differs. Never use one code for two different items.',
          '**Print and stick the labels.** Use clear, high-contrast labels on a flat spot, away from curves, seams and folds where a scanner struggles.',
          '**Test at the counter.** Scan every type of item, including the awkward ones. Fix anything that does not read before you rely on it in a rush.',
          '**Train the team.** Show staff how to scan, what to do when a code will not read (search by name), and how scanning the same item twice raises the quantity.'
        ]
      },
      { type: 'h2', text: 'Common problems and quick fixes' },
      {
        type: 'ul',
        items: [
          '**The code will not scan:** wipe the label, check for faded ink or a crease, try a slightly different angle, and reprint if it is damaged.',
          '**The wrong item appears:** the code is saved against the wrong item, or two items share one code. Correct the item record.',
          '**The label price differs from the screen:** the label is old. Reprint labels after a price change, or keep the price off your own labels and rely on the screen.',
          '**Same product, different batches or MRPs:** decide up front whether to track them as separate items, and keep that choice consistent.'
        ]
      },
      { type: 'h2', text: 'Use barcodes for stock counts too' },
      {
        type: 'p',
        text: 'Barcodes help beyond billing. Walk the shelves with a scanner, scan each item and compare the result with what your system says. Differences point to damage, theft or billing mistakes. Count a different section each week instead of closing the shop for a full stock-take.'
      },
      {
        type: 'callout',
        title: 'Where LocalPOS comes in',
        text: '[Barcode billing in LocalPOS](/features/barcode-billing-software/) works with common USB and Bluetooth scanners, lets you print your own labels and keeps the manufacturer’s barcodes on packaged goods. If you are still on paper, start with [moving from a stock register to software](/blog/moving-from-a-stock-register-to-software/).'
      }
    ]
  },
  'how-to-reduce-dead-stock-in-a-retail-shop': {
    blocks: [
      {
        type: 'p',
        text: 'Every shop has a corner of shelf nobody looks at: the colour that did not sell, the festival item that arrived late, the extra carton bought because the supplier offered a discount. If you want to know how to reduce dead stock in a retail shop, start by seeing that corner for what it is. It is cash you have already spent, sitting still and taking up space. This guide shows how to find it, clear it and stop it building up again.'
      },
      { type: 'h2', text: 'What counts as dead stock' },
      {
        type: 'p',
        text: 'Dead stock is any item that has stopped selling. There is no official cut-off, so set your own. A common approach is a window that suits your products, for example 90 days for everyday goods, longer for seasonal items and shorter for anything that spoils or goes out of fashion quickly. The exact number matters less than applying it every month without fail.'
      },
      { type: 'h2', text: 'How to reduce dead stock in a retail shop, step by step' },
      { type: 'h3', text: 'Step 1: Find it' },
      {
        type: 'p',
        text: 'You cannot clear what you cannot see. List every item that has stock on hand but no sales inside your window. Sort the list by money tied up, which is quantity multiplied by your purchase cost, so you start with the items that hurt most. If your stock and sales are in software, [item-wise sales and stock reports](/features/sales-reporting-software/) give you this list in minutes. On paper it means checking the register against your bills, which is why many shops never get round to it.'
      },
      { type: 'h3', text: 'Step 2: Work out why it stopped selling' },
      {
        type: 'ul',
        items: [
          '**Wrong price:** a nearby shop sells it cheaper, or your margin is too high.',
          '**Wrong product:** a size, colour or brand that customers do not want.',
          '**Wrong timing:** a seasonal item bought too late or in too large a quantity.',
          '**Out of sight:** it sits at the back, or is not set up properly on your billing list.',
          '**Over-buying:** you took a supplier’s bulk offer without checking how fast it would sell.'
        ]
      },
      {
        type: 'p',
        text: 'The reason decides the fix. A hidden item needs a better shelf. An unwanted item needs a lower price or a new home.'
      },
      { type: 'h3', text: 'Step 3: Clear it, from gentle to firm' },
      {
        type: 'ol',
        items: [
          '**Move it.** Put it at eye level or near the counter for two weeks.',
          '**Bundle it.** Pair a slow item with a fast seller at a combined price.',
          '**Discount in stages.** Start small and deepen the offer only if it still does not move. Staged discounts recover more than one deep cut, because some customers will pay more.',
          '**Return it.** Ask your supplier or distributor about returns, exchanges or credit against future purchases. Many accept unsold, undamaged goods, though terms vary.',
          '**Sell in bulk.** Offer the lot to a wholesaler or another shop at a lower rate.',
          '**Write it off.** If it is damaged or out of date, record it as a loss and clear the shelf. Holding it only hides the loss.'
        ]
      },
      {
        type: 'callout',
        title: 'Do not hide the loss',
        text: 'Record written-off stock as a stock adjustment with a reason, so your stock value stays honest. Ask your accountant how to treat it in your books.'
      },
      { type: 'h3', text: 'Step 4: Stop buying what does not move' },
      { type: 'p', text: 'Clearing old stock is only half the job. Prevention is cheaper.' },
      {
        type: 'ul',
        items: [
          'Set a **minimum and a maximum** quantity for each item, so you reorder to a level instead of by feel.',
          'Buy **smaller lots more often** from suppliers who deliver quickly, rather than one big order for a discount.',
          'Before accepting a bulk offer, work out how many days it will take to sell all of it, and whether the saving covers the cash you will lock up.',
          'Test a new product with a small quantity first.',
          'Review slow movers every month, not every year.'
        ]
      },
      { type: 'h2', text: 'A simple monthly routine' },
      {
        type: 'p',
        text: 'Pick one day each month. Print the slow-moving list, choose the three items with the most money tied up, act on each, and note what worked. After a few months the list gets shorter and your cash gets freer.'
      },
      {
        type: 'p',
        text: 'LocalPOS keeps [live stock](/features/inventory-management-software/) and [purchase prices](/features/purchase-management-software/) next to your sales, so the slow-moving list is a few taps away and you know your real cost before you decide on a discount.'
      }
    ]
  },
  'moving-from-a-stock-register-to-software': {
    blocks: [
      {
        type: 'p',
        text: 'The stock register has served your shop for years, so moving from a stock register to software can feel risky. What if the numbers are wrong? What if staff cannot manage? What if you lose a week? The good news is that the switch is a series of small, ordinary jobs, and you can run the register and the software side by side until you are comfortable. Here is a plan that works for a shop of almost any size.'
      },
      { type: 'h2', text: 'Why registers stop working as a shop grows' },
      {
        type: 'p',
        text: 'A register is good at one thing: recording. It is poor at answering questions. What is running low? What has not sold in three months? How much money is sitting in stock? Each question means flipping pages, adding by hand and hoping nobody missed an entry. A register also depends on one person’s handwriting and habits, and it tells you nothing while you are away from the shop.'
      },
      { type: 'h2', text: 'Before you start' },
      {
        type: 'ul',
        items: [
          'Pick a start date in a quiet week, not in the middle of a festival rush.',
          'Decide who owns the move. One person, with one backup.',
          'Gather your supplier bills, price lists and the latest register pages.',
          'Agree on a naming style for items, such as Brand, Product, Size, and stick to it.'
        ]
      },
      { type: 'h2', text: 'Moving from a stock register to software, step by step' },
      { type: 'h3', text: 'Step 1: Clean up your item list' },
      {
        type: 'p',
        text: 'Open the register and make one clear list of items. Merge duplicates, such as two spellings of the same product, and drop what you no longer sell. For each item note the name, unit (piece, kg, box), selling price, purchase price if you know it, GST rate and HSN code, and a minimum quantity at which you want to reorder. Messy names create messy software, so spend your time here.'
      },
      { type: 'h3', text: 'Step 2: Count what is actually on the shelf' },
      {
        type: 'p',
        text: 'Do not copy the closing balances from the register. Registers drift away from reality through breakage, theft, unrecorded returns and missed entries. Count the shelf section by section and use those counts as your opening stock. You will probably find differences. That is useful information, not a failure.'
      },
      {
        type: 'callout',
        title: 'Count in small sections',
        text: 'Count one shelf or one category at a time and enter it before moving on. Small sections keep mistakes easy to trace, and the shop can keep trading while you work.'
      },
      { type: 'h3', text: 'Step 3: Enter items in bulk' },
      {
        type: 'p',
        text: 'Typing hundreds of items one at a time is where many people give up. Prepare your clean list in a spreadsheet and use bulk entry where your software offers it, then spot-check a sample of items for price and tax. [Adding items in bulk](/features/inventory-management-software/) saves hours compared with entering each one by hand.'
      },
      { type: 'h3', text: 'Step 4: Run both side by side for a week or two' },
      {
        type: 'p',
        text: 'For the first week or two, keep writing in the register and bill in the software. At the end of each day compare a few fast-moving items. Where they differ, find out why. It is usually a missed entry, a wrong unit or a price saved incorrectly. This is the cheapest time to find mistakes.'
      },
      { type: 'h3', text: 'Step 5: Switch over and keep the register safe' },
      {
        type: 'p',
        text: 'When the numbers agree for several days in a row, stop writing in the register. Do not throw it away. Keep it for your records and for your accountant, for as long as your accountant advises.'
      },
      { type: 'h2', text: 'Habits that keep the numbers right' },
      {
        type: 'ul',
        items: [
          'Record every purchase on the day goods arrive, not at the end of the week.',
          'Record returns and damage with a reason, so differences can be explained later.',
          'Count one section of the shop each week.',
          'Use the low-stock list instead of walking the shelves to decide what to reorder.',
          'Make sure everyone who bills or receives goods follows the same steps.'
        ]
      },
      {
        type: 'p',
        text: 'If you want to see the software side before you commit, [book a demo](/book-a-demo/) and ask to try it with a sample of your own items. LocalPOS keeps [stock that updates with every sale and purchase](/features/inventory-management-software/), so the register has nothing left to do. Once your items are in, [barcode labels](/blog/how-a-barcode-system-works-in-a-retail-shop/) are a good next step.'
      }
    ]
  },
  'how-to-track-medicine-expiry-in-a-pharmacy': {
    blocks: [
      {
        type: 'p',
        text: 'An expired strip on the shelf is money you cannot recover, and an expired strip sold by mistake is a much bigger problem. If you are looking for how to track medicine expiry in a pharmacy, the answer is a mix of good records and a small, steady routine, not a heroic clean-up once a year. This guide covers the records to keep, how to sell older stock first, and a weekly check you can finish in under an hour.'
      },
      {
        type: 'callout',
        title: 'Follow the rules that apply to you',
        text: 'Storage, return, disposal and record-keeping rules for medicines depend on your licence and local regulations. Use this guide as practical help, and follow the requirements that apply to your pharmacy.'
      },
      { type: 'h2', text: 'Why expiry slips through' },
      {
        type: 'p',
        text: 'Most expiry losses are not caused by carelessness. They come from the way medicines arrive. The same product turns up in several batches, each with its own expiry date, and stock from different deliveries gets mixed on one shelf. When your records show only the product and a total quantity, nobody can tell that twelve strips from an old batch are hiding behind forty fresh ones.'
      },
      { type: 'h2', text: 'How to track medicine expiry in a pharmacy: record batches on arrival' },
      {
        type: 'p',
        text: 'The cheapest moment to capture expiry is when the goods arrive. For every item you receive, note:'
      },
      {
        type: 'ul',
        items: [
          'The batch number and the expiry month and year.',
          'The quantity, in strips or packs.',
          'The purchase rate and the MRP.',
          'The supplier and the bill number.'
        ]
      },
      {
        type: 'p',
        text: 'If you use software, enter these on the purchase entry so the batch is attached to the stock. If you use paper, a separate batch register works better than a single page per product.'
      },
      { type: 'h2', text: 'Sell the earliest expiry first' },
      {
        type: 'p',
        text: 'The rule is first expiry, first out. It is not the same as first in, first out, because a newer delivery can carry an earlier expiry date. On the shelf, put the shortest-dated packs in front. At billing, pick the batch that expires soonest. When your billing screen lists batches by expiry, staff follow the rule without having to remember it.'
      },
      { type: 'h2', text: 'Run a weekly near-expiry check' },
      {
        type: 'ol',
        items: [
          'Choose a fixed day and time, ideally a quiet one.',
          'List everything expiring in the next 90 days. Many pharmacies use 90, 60 and 30 days as three alert stages. Choose what fits how fast your stock sells.',
          'Move the 90-day items to the front and mark them with a coloured sticker.',
          'For items inside 60 days, decide what to do: sell first, return or exchange.',
          'For items inside 30 days, act. Ask the distributor about return or credit, and keep the rest ready for removal.',
          'Note what you did, so next week starts from facts.'
        ]
      },
      { type: 'h2', text: 'What to do with near-expiry stock' },
      {
        type: 'ul',
        items: [
          '**Ask your distributor** about return and exchange terms. Many accept short-dated goods within a stated window, but terms differ, so check before you buy.',
          '**Offer a sensible discount** where it is allowed, always at or below MRP.',
          '**Never sell expired medicine.** Remove anything past its date from the sales area at once.',
          '**Keep expired stock separate** in a labelled box, away from saleable stock, and dispose of it as the rules for your area require.'
        ]
      },
      { type: 'h2', text: 'Buy smaller quantities of slow movers' },
      {
        type: 'p',
        text: 'Slow-moving products cause most expiry loss. Check how many strips you sell in a month, and do not order more than a month or two of supply for a slow item unless the supplier’s scheme clearly beats the risk. Items with a short shelf life, such as some syrups and injectables, need extra care.'
      },
      {
        type: 'p',
        text: 'LocalPOS records [batch numbers and expiry dates on every bill](/solutions/medical-store-billing-software/) and shows what expires in the next 30, 60 or 90 days, so the weekly check starts with a ready list. Because [stock updates with every purchase and sale](/features/inventory-management-software/), that list stays current.'
      }
    ],
    faqs: [
      {
        q: 'How far ahead should I check for near-expiry medicines?',
        a: 'Many pharmacies review stock expiring within 90 days, then again at 60 and 30 days. The right window depends on how quickly an item sells and on your distributor’s return terms. Ask the distributor how long before expiry they accept returns, and set your first alert comfortably before that date.'
      },
      {
        q: 'Can I return near-expiry medicines to the distributor?',
        a: 'Often yes, but it depends on the distributor and the product. Some accept short-dated or expired goods for credit or exchange within a time window, and others do not. Ask before you order, and keep the purchase bill and batch details ready when you return goods.'
      },
      {
        q: 'Do I need software to track expiry?',
        a: 'No. A careful batch register and a weekly check can work for a small pharmacy. Software helps once you have hundreds of products and many batches, because it attaches the expiry to the stock, lists batches by earliest expiry at billing, and shows what is expiring soon without a manual shelf check.'
      }
    ]
  },
  'how-to-speed-up-table-service-in-a-restaurant': {
    blocks: [
      {
        type: 'p',
        text: 'A guest who waits twenty minutes to order and another ten to pay remembers the wait, not the food. If you are searching for how to speed up table service in a restaurant, the good news is that most delays come from a few predictable places, and each has a cheap fix. This guide follows a guest through the meal, from sitting down to settling the bill, and shows where time leaks out.'
      },
      { type: 'h2', text: 'How to speed up table service in a restaurant: find where the time goes' },
      {
        type: 'p',
        text: 'Before you change anything, watch two or three busy tables with a stopwatch, or ask your captain to note the times. Write down four moments: seated, order taken, food served, bill paid. You will usually find one stage that takes far longer than the rest. Fix that one first.'
      },
      { type: 'h2', text: 'Speed up order taking' },
      {
        type: 'ul',
        items: [
          '**Number your tables** clearly and keep a simple floor map, so any waiter can find one fast.',
          '**Keep the menu short and clear.** Long menus slow decisions. Mark bestsellers, and tell guests early about items that are finished.',
          '**Take the full order in one visit,** drinks and starters included, and add later rounds only when needed.',
          '**Enter or write the order at the table,** so nobody walks back to the counter to remember it.',
          '**Use fixed notes** such as “less spicy” or “no onion”, so the kitchen reads them the same way each time.'
        ]
      },
      { type: 'h2', text: 'Fix the hand-off to the kitchen' },
      {
        type: 'p',
        text: 'Lost or late orders usually happen between the table and the kitchen. A slip gets misplaced, a waiter forgets to hand it over, or a dish is made twice. Send each order to the kitchen the moment it is taken, as a kitchen order ticket (KOT), either on paper in duplicate or printed from your billing screen. Mark the table number clearly, and ask the kitchen to call out when each order is ready so the waiter does not hover at the pass.'
      },
      { type: 'h2', text: 'Make billing the fastest part of the meal' },
      {
        type: 'p',
        text: 'Billing delays frustrate guests most, because the meal is over and they just want to leave.'
      },
      {
        type: 'ul',
        items: [
          '**Start the bill early.** When the last dish is served, open the bill so that it only needs checking.',
          '**Offer the bill at the right time.** When guests finish their main course and slow down, bring it, instead of waiting for them to wave.',
          '**Be clear on tax and service charge.** The bill should show GST as it applies to your restaurant. Confirm the rate and the rules on service charge with your accountant.',
          '**Handle splits quickly.** Ask at the start whether a big group wants separate bills, so nobody is recalculating at the end.',
          '**Take payment where it is shortest.** A UPI QR code at the table or on the bill saves a trip to the counter.'
        ]
      },
      { type: 'h2', text: 'Keep tables moving at peak hours' },
      {
        type: 'ul',
        items: [
          'Clear and reset a table the moment guests leave. Give that job to one person.',
          'Keep table status (free, ordered, eating, bill requested) visible on one screen or chart.',
          'Assign roles as well as tables at the rush: one person for orders, one for serving, one for billing.',
          'Prepare popular items in advance wherever food safety allows.'
        ]
      },
      { type: 'h2', text: 'Review one number every week' },
      {
        type: 'p',
        text: 'Pick one measure, such as the time from seating to payment on your busiest night, and ask the team what slowed them down. Fix one thing a week. Small changes that people actually follow beat a big overhaul that nobody remembers.'
      },
      {
        type: 'p',
        text: 'LocalPOS shows every table’s status in one place, sends orders to the kitchen as tickets, and lets you split or merge bills. [Table-wise orders and kitchen tickets](/solutions/restaurant-billing-software/) take out the walk back and forth, and [GST is shown on every bill](/features/gst-billing-software/), so the last step of the meal does not turn into arithmetic at the counter.'
      }
    ]
  },
  'how-to-collect-pending-payments-from-customers': {
    blocks: [
      {
        type: 'p',
        text: 'Credit, or udhaar, is how many Indian shops keep loyal customers, and it is also how many shops end up with a notebook full of money they may never see. Learning how to collect pending payments from customers without souring the relationship is a skill worth building, because it directly decides how much cash you have this month. The approach below is polite and practical: clear rules, clear records, and regular, friendly follow-up.'
      },
      { type: 'h2', text: 'Set credit rules before you give credit' },
      { type: 'p', text: 'Most payment problems start with an unclear agreement. Decide in advance:' },
      {
        type: 'ul',
        items: [
          '**Who gets credit.** Regulars with a purchase history are a safer bet than first-time buyers.',
          '**How much.** Set a limit for each customer, based on what you can afford to wait for.',
          '**For how long.** “Pay by the 10th” is clearer than “pay when you can”.',
          '**What happens at the limit.** Say politely that new purchases need the old dues to be cleared or part-paid.'
        ]
      },
      {
        type: 'p',
        text: 'Tell the customer these terms at the start, in a friendly tone, and keep them the same for everyone.'
      },
      { type: 'h2', text: 'Record every rupee of credit on the bill' },
      {
        type: 'p',
        text: 'A pending amount that lives in memory or a loose notebook is easy to forget and easy to dispute. Make every credit sale a proper bill with the customer’s name and number, and record each part payment against it with the date and mode. When a customer says “I paid last week”, you can show the entry instead of arguing. Keeping [customer dues next to their bills](/features/customer-management-software-for-small-business/) means anyone on your team can answer without calling you.'
      },
      { type: 'h2', text: 'Know your dues by age' },
      {
        type: 'p',
        text: 'Not all dues are equal. A bill that is five days old needs a gentle nudge. A bill that is sixty days old needs a conversation. Sort your dues into groups, such as up to 7 days, 8 to 30 days, 31 to 60 days and over 60, and work on the oldest and largest first. Review the list every week. Dues that are checked weekly rarely turn into dues nobody can remember.'
      },
      { type: 'h2', text: 'How to collect pending payments from customers: remind early and kindly' },
      { type: 'h3', text: 'A simple reminder sequence' },
      {
        type: 'ol',
        items: [
          '**Before the due date:** a friendly heads-up. “Namaste, a small reminder that your bill of ₹2,400 is due on the 10th.”',
          '**On the due date:** a message with an easy way to pay, such as a UPI ID or QR code.',
          '**A few days later:** a phone call, not just a message. Keep it warm: “We noticed the bill is still open. Is everything alright?”',
          '**After a week or two:** a clear and kind conversation about a date for payment, or a part-payment plan.'
        ]
      },
      {
        type: 'p',
        text: 'Send messages during the day, not late at night. Include the bill number, the amount and the date, so the customer can act at once without searching.'
      },
      { type: 'h2', text: 'Make paying easy' },
      {
        type: 'ul',
        items: [
          'Share a UPI QR code or payment link, so the customer can pay in seconds.',
          'Accept part payments. Some money now is better than all of it never.',
          'Take an advance on large orders, so the credit risk is smaller.',
          'Consider a small early-payment discount if your margins allow it.'
        ]
      },
      { type: 'h2', text: 'When a customer still does not pay' },
      {
        type: 'p',
        text: 'Stay calm and keep it businesslike. Stop further credit until a plan is agreed, and put the agreed date and amount in writing, even if it is only a message. If a large amount stays unpaid for months, speak to a lawyer or your chartered accountant about notices and your options. Avoid public shaming or threats. They damage your name and can create legal trouble for you.'
      },
      { type: 'h2', text: 'Keep your good customers' },
      {
        type: 'p',
        text: 'Most customers who owe money are not trying to cheat you. They are waiting for their own salary or payment. Thank those who pay on time, and make asking feel normal rather than personal. A customer who is asked politely and early usually stays. A customer who is chased angrily usually goes.'
      },
      {
        type: 'p',
        text: '[Payment tracking in LocalPOS](/features/payment-management-software/) records part payments against each invoice, lists customers with pending dues grouped by age, and gives you a follow-up list to work through each day.'
      }
    ],
    faqs: [
      {
        q: 'Should I charge interest on pending payments?',
        a: 'You can, if you tell the customer before giving credit and they agree to it. Many small shops avoid interest with regular customers and prefer clear due dates, part payments and stopping new credit instead. If you do charge interest, state the rate on the bill and ask your accountant how to record it.'
      },
      {
        q: 'How long should I wait before following up on a due payment?',
        a: 'A friendly reminder just before or on the due date is normal. If you hear nothing within a few days, call. Waiting weeks in silence makes the conversation harder for both of you.'
      },
      {
        q: 'Is it fine to stop credit for a customer who owes me money?',
        a: 'Yes. It is reasonable to tell a customer that new credit needs the older dues to be cleared or part-paid. Say it kindly, in private, and offer a way forward such as a part payment, so the relationship stays intact.'
      }
    ]
  },
  'how-to-manage-stock-across-multiple-shop-branches': {
    blocks: [
      {
        type: 'p',
        text: 'The second shop is where stock problems multiply. One branch is overflowing with an item the other keeps running out of, nobody is sure which store holds the last piece, and transfers happen on phone calls and scraps of paper. If you want to know how to manage stock across multiple shop branches, the answer is not more phone calls. It is a few shared rules, one common item list and a clear way to move goods between stores.'
      },
      { type: 'h2', text: 'How to manage stock across multiple shop branches: start with one item list' },
      {
        type: 'p',
        text: 'Every branch should sell the same item under the same name, with the same code and the same unit. When one store writes “Basmati 5kg” and another writes “Basmati rice 5 kg bag”, you cannot compare them or transfer between them. Create one master list, owned by one person, and let branches use it instead of making their own. New items are added centrally. Branches ask for them; they do not improvise.'
      },
      { type: 'h2', text: 'Track stock separately for each branch' },
      {
        type: 'p',
        text: 'A single total for the whole business hides the problem. You need the quantity at each branch, side by side. Then you can see that Branch A has 40 and Branch B has 2, and move 15 across instead of ordering new stock. Count each branch separately and agree on the opening quantities before you start tracking.'
      },
      { type: 'h2', text: 'Move stock with a proper transfer record' },
      {
        type: 'ol',
        items: [
          '**Raise a transfer** at the sending branch: item, quantity, date, who is sending and who is receiving.',
          '**Dispatch it** with a copy of the transfer note in the box or with the driver.',
          '**Receive and confirm** at the other end. Count what arrived and note any difference immediately.',
          '**Close the loop.** The sender’s stock reduces on dispatch and the receiver’s increases on receipt. Anything in between is “in transit”, not lost.'
        ]
      },
      {
        type: 'callout',
        title: 'A note on GST',
        text: 'If your branches are registered under different GSTINs, for example in different states, stock moved between them is generally treated as a supply for GST and needs its own documents. Branches under one GSTIN are treated differently, and goods on the road may need an e-way bill. Ask your chartered accountant how this applies to you.'
      },
      { type: 'h2', text: 'Set reorder levels for each branch' },
      {
        type: 'p',
        text: 'A branch near a college sells different goods from one near a market. Set minimum quantities for each branch based on how fast things sell there, not a single number for all. When an item drops below its minimum, check first whether another branch has a surplus. A transfer is usually cheaper and quicker than a fresh purchase order.'
      },
      { type: 'h2', text: 'Decide who buys: central or local' },
      {
        type: 'ul',
        items: [
          '**Central buying** gives better prices and consistent quality, and suits fast-moving staples.',
          '**Local buying** suits fresh items, local tastes and quick top-ups.',
          'Many owners mix the two: central buying for the core range, and a small local budget for the rest.'
        ]
      },
      {
        type: 'p',
        text: 'Whichever you choose, record every purchase against the branch that received the goods, so costs and stock stay correct.'
      },
      { type: 'h2', text: 'Run a short branch review every week' },
      {
        type: 'ul',
        items: [
          'Top ten sellers: is any branch running low?',
          'Items with no sales for 60 days: should they move to a branch where they sell?',
          'Pending transfers: is anything still in transit?',
          'Differences found in this week’s stock count.'
        ]
      },
      {
        type: 'p',
        text: 'Rotate a small count through each branch every week, so mismatches are found while they are still small.'
      },
      { type: 'h2', text: 'Control who can do what' },
      {
        type: 'p',
        text: 'A manager should be able to bill, receive and count in their own branch, but not edit prices or add items for the whole business. Limiting access by branch protects your numbers and makes it clear whom to ask when something looks wrong.'
      },
      {
        type: 'p',
        text: 'With [multi-store management in LocalPOS](/features/multi-store-management-software/) you sign in once, switch between stores, keep one item list with stock tracked for each store, and send stock between branches until it arrives. For the basics of live stock at each branch, see [how stock updates with every sale](/features/inventory-management-software/).'
      }
    ]
  }
}

/** Full posts: index data merged with the article text. */
export const BLOG_POSTS: BlogPost[] = BLOG_META.map((meta) => {
  const content = CONTENT[meta.slug]
  if (!content) throw new Error(`Missing article text for "${meta.slug}" in src/data/blog.ts`)
  return { ...meta, ...content }
})

export const getPost = (slug: string): BlogPost | undefined => BLOG_POSTS.find((p) => p.slug === slug)
