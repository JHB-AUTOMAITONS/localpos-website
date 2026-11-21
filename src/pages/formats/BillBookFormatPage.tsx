import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { TemplateViewer } from '@/components/templates/TemplateViewer'
import type { TemplateDoc } from '@/components/templates/types'
import type { FaqItem } from '@/lib/seo'

const templates: TemplateDoc[] = [
  {
    id: 'cash-memo',
    name: 'Cash memo page',
    description: 'The traditional bill book page for a shop that is not registered under GST, or that sells at prices inclusive of tax. One amount per line and one total.',
    fileName: 'bill-book-cash-memo',
    blocks: [
      { t: 'title', text: 'Cash Memo' },
      { t: 'org', name: 'New Bharat General Stores', lines: ['45 Johari Bazaar, Jaipur, Rajasthan 302003', 'Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { rows: [['Customer name', 'Smt. Kavita Sharma'], ['Address', 'Malviya Nagar, Jaipur']] },
          { rows: [['Bill no.', '0457'], ['Date', '14 Nov 2026']] },
        ],
      },
      {
        t: 'table',
        head: ['S.No', 'Particulars', 'Qty', 'Rate', 'Amount'],
        align: ['c', 'l', 'r', 'r', 'r'],
        rows: [
          ['1', 'Pressure cooker, 5 litre', '1', '1,850.00', '1,850.00'],
          ['2', 'Steel dinner plate', '6', '140.00', '840.00'],
          ['3', 'Glass tumbler, set of 6', '2', '320.00', '640.00'],
          ['4', 'Plastic bucket, 20 litre', '1', '210.00', '210.00'],
        ],
        totals: [['Total (₹)', '3,540.00']],
        blankRows: 10,
      },
      { t: 'text', label: 'Amount in words', text: 'Rupees Three Thousand Five Hundred Forty Only' },
      { t: 'text', label: 'Note', text: 'Goods once sold will not be taken back. E. & O.E.', keep: true },
      { t: 'sign', labels: ['Customer’s signature', 'For New Bharat General Stores'] },
    ],
  },
  {
    id: 'gst',
    name: 'GST bill book page',
    description: 'For a GST-registered shop that writes tax invoices by hand. Adds the buyer’s GSTIN, HSN codes and the tax on each line. The 18% rate is for illustration.',
    fileName: 'gst-bill-book-page',
    blocks: [
      { t: 'title', text: 'Tax Invoice', sub: 'Original for recipient' },
      { t: 'org', name: 'Balaji Hardware and Paints', lines: ['210 Oppanakara Street, Coimbatore, Tamil Nadu 641001', 'GSTIN: 33ABCDE1234F1Z7 · Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { heading: 'Buyer', rows: [['Name', 'Sri Murugan Constructions'], ['Address', 'Avinashi Road, Coimbatore, Tamil Nadu 641018'], ['GSTIN', '33PQRSX5678K1Z3']] },
          { heading: 'Bill details', rows: [['Invoice no.', 'B/26-27/1284'], ['Date', '17 Nov 2026'], ['Place of supply', 'Tamil Nadu (33)']] },
        ],
      },
      {
        t: 'table',
        head: ['S.No', 'Particulars', 'HSN', 'Qty', 'Rate', 'Taxable value', 'GST %', 'GST', 'Amount'],
        align: ['c', 'l', 'c', 'r', 'r', 'r', 'r', 'r', 'r'],
        rows: [
          ['1', 'Wall putty, 20 kg bag', '3214', '10', '780.00', '7,800.00', '18%', '1,404.00', '9,204.00'],
          ['2', 'PVC pipe, 1 inch, 3 m length', '3917', '25', '260.00', '6,500.00', '18%', '1,170.00', '7,670.00'],
          ['3', 'Paint brush, 4 inch', '9603', '10', '100.00', '1,000.00', '18%', '180.00', '1,180.00'],
        ],
        totals: [
          ['Taxable value', '15,300.00'],
          ['CGST', '1,377.00'],
          ['SGST', '1,377.00'],
          ['Grand total (₹)', '18,054.00'],
        ],
        blankRows: 8,
      },
      { t: 'text', label: 'Amount in words', text: 'Rupees Eighteen Thousand Fifty Four Only' },
      { t: 'text', label: 'Declaration', text: 'Certified that the particulars given above are true and correct.', keep: true },
      { t: 'sign', labels: ['Receiver’s signature', 'For Balaji Hardware and Paints (Authorised signatory)'] },
    ],
  },
]

const blocks: Block[] = [
  {
    kind: 'prose',
    title: 'What a bill book is',
    body: [
      'A bill book is a bound pad of numbered bill pages. The shopkeeper writes each sale on the next page, tears out the top copy for the customer and keeps the copy underneath. Kirana shops, hardware stores, cloth merchants, tailors and repair shops across India have billed this way for decades.',
      'A page for a simple cash sale is usually headed **cash memo**. A GST-registered shop uses pages headed Tax Invoice, with space for HSN codes and tax. Both layouts are given above, and the wider range of layouts is on the [invoice formats](/invoice-formats/) page.',
    ],
    aside: {
      title: 'Original and duplicate',
      body: 'Most books have two leaves per bill number. The white original goes to the customer. The coloured duplicate, written through carbon paper or on carbonless paper, stays in the book as the shop’s record. Books for goods sold under GST often have a third leaf for the transporter.',
    },
  },
  {
    kind: 'defs',
    title: 'Fields on a bill book format',
    lead: 'The printed page does half the work. These are the parts you fill in by hand.',
    items: [
      { term: 'Shop header', desc: 'Name, address and phone number, printed once on every page. A registered shop adds its GSTIN here.' },
      { term: 'Bill number', desc: 'Pre-printed or stamped with a numbering machine, so no number can be skipped quietly.' },
      { term: 'Date', desc: 'The date of the sale. Write it in full, including the year.' },
      { term: 'Customer name', desc: 'Optional for a small cash sale. Needed for credit sales, warranty claims and any bill to a GST-registered buyer.' },
      { term: 'Particulars', desc: 'What was sold, clear enough to identify it later: brand, size or model.' },
      { term: 'Qty, rate and amount', desc: 'Quantity multiplied by the rate gives the amount for the line.' },
      { term: 'Total and amount in words', desc: 'The sum of all lines, then the same figure in words so it cannot be altered easily.' },
      { term: 'Signature', desc: 'Signed for the shop. On a credit sale, ask the customer to sign the duplicate as well.' },
    ],
  },
  {
    kind: 'steps',
    title: 'How to number and write bills',
    steps: [
      { title: 'Start a series', body: 'Begin at 1, or use a prefix for the book or the year, such as B/26-27/0001. Under GST an invoice number can have up to 16 characters and must be unique within the financial year.' },
      { title: 'Use every page in order', body: 'Write bills in sequence and on the date of sale. Finish one book before opening the next.' },
      { title: 'Cancel, do not tear', body: 'If you spoil a page, write “Cancelled” across both copies and leave them in the book. A missing number is harder to explain than a cancelled one.' },
      { title: 'Total the day', body: 'At closing time, add up the duplicates and match the figure with the cash, UPI and card collections for the day.' },
    ],
  },
  {
    kind: 'cards',
    title: 'Printing tips for your own bill book',
    lead: 'The files on this page are single pages. Take the Word or Excel file to a local printer, or print copies yourself.',
    items: [
      { icon: 'printer', title: 'Pick the page size', body: 'A5 is the usual size for a counter bill book. The paper size is chosen in your print settings. If they offer two pages per sheet, two A5 bills fit on one A4.' },
      { icon: 'layers', title: 'Plan the copies', body: 'Ask the printer for carbonless paper in two colours, or print two sheets per bill and mark them Original and Duplicate.' },
      { icon: 'tag', title: 'Number before binding', body: 'Have the pages numbered by machine and bound in books of 50 or 100 bills. Note the first and last number on the cover.' },
      { icon: 'palette', title: 'Add your identity', body: 'Put a logo next to the shop name. The [logo maker](/logo-maker/) creates a simple text logo if you do not have one.' },
    ],
  },
  {
    kind: 'split',
    title: 'Paper bill book or billing software?',
    lead: 'A bill book costs little and needs no power. It starts to hold a shop back as the number of bills grows.',
    left: {
      title: 'Paper still works when',
      items: [
        'You write a small number of bills in a day.',
        'You sell a handful of items and remember the prices.',
        'You are not registered under GST and file no monthly returns.',
      ],
    },
    right: {
      title: 'Time to move when',
      items: [
        'Customers wait at the counter while bills are written and totalled.',
        'Totalling errors and unreadable carbon copies keep turning up.',
        'Month-end GST figures take hours to add up from the duplicates.',
        'You cannot tell what is in stock without checking the shelves.',
        'Credit customers and pending payments are tracked from memory.',
      ],
    },
  },
  {
    kind: 'prose',
    title: 'Moving on from handwritten bills',
    body: [
      'You do not have to change everything at once. Many shops keep a bill book as a backup for power cuts and bill daily sales on a computer or phone.',
      '[LocalPOS billing software](/features/pos-billing-software/) numbers each bill by itself, prints or shares it, and totals the day without anyone adding up duplicates. For money received against an old bill, use a [receipt format](/receipt-format/) and not a fresh bill.',
    ],
  },
]

const faqs: FaqItem[] = [
  { q: 'What size is a standard bill book?', a: 'There is no fixed standard. A5 (half of A4) is the most common size for shop bill books, and smaller pads are used for quick cash memos. Choose a size that fits your longest usual bill.' },
  { q: 'Can I print this bill book template myself?', a: 'Yes. Print the blank version as many times as you need, or download the Word or Excel file, add your shop details and give it to a printing press for numbering and binding. Everything here is free, needs no sign-up and runs in your browser.' },
  { q: 'What is the difference between a cash memo and a tax invoice?', a: 'A cash memo is a simple bill for a sale paid on the spot, with items and a total. A tax invoice is issued by a GST-registered seller and carries the GSTIN, HSN codes and the tax charged. A registered shop should use the tax invoice page.' },
  { q: 'How long should I keep used bill books?', a: 'Keep them for as long as the tax laws that apply to you require. GST law, for example, asks registered persons to keep records for several years after the annual return is filed. Confirm the exact period with your chartered accountant before discarding old books.' },
  { q: 'Can a shop registered under the composition scheme use the GST page?', a: 'A composition dealer does not charge GST on bills and issues a bill of supply, not a tax invoice. The cash memo layout is closer to what is needed, with the heading changed and the wording required for composition dealers added. Ask your accountant for the exact text.' },
  { q: 'What does E. & O.E. on a bill mean?', a: 'It stands for “errors and omissions excepted”. Shops print it to say that a clerical mistake on the bill may be corrected later.' },
]

export default function BillBookFormatPage() {
  return (
    <ResourcePage
      slug="bill-book-format"
      seoTitle="Bill Book Format: Cash Memo and GST Bill | LocalPOS"
      seoDescription="Free bill book format to print: a classic cash memo page and a GST bill page. Download in Word or Excel, with numbering, carbon copy and printing tips."
      h1="Bill book format for shops, ready to print"
      intro="Here is a bill book format you can print or hand to a printing press: shop header, bill number, date, customer, particulars, total, amount in words and signature. A GST version is included."
      points={['Cash memo and GST pages', 'Word, Excel and print', 'Blank copy included']}
      toolTitle="Bill book pages to download"
      toolLead="Choose a page, then switch to Blank for an empty copy to fill by hand."
      blocks={blocks}
      faqs={faqs}
      faqTitle="Bill book questions"
      related={['invoice-formats', 'receipt-format', 'invoice-generator', 'logo-maker']}
      relatedTitle="Related formats and tools"
      cta={{ title: 'Bill faster than you can write', text: 'LocalPOS adds items by name or barcode, numbers the bill, works out the total and tax, and keeps a copy without carbon paper.' }}
    >
      <TemplateViewer templates={templates} />
    </ResourcePage>
  )
}
