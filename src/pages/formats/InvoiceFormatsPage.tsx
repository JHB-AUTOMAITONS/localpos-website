import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { TemplateViewer } from '@/components/templates/TemplateViewer'
import type { TemplateDoc } from '@/components/templates/types'
import type { FaqItem } from '@/lib/seo'

const templates: TemplateDoc[] = [
  {
    id: 'gst',
    name: 'GST tax invoice',
    description: 'For a GST-registered business selling goods to another business. Shows HSN codes, the taxable value and the tax on every line.',
    fileName: 'gst-invoice-format',
    blocks: [
      { t: 'title', text: 'Tax Invoice', sub: 'Original for recipient' },
      { t: 'org', name: 'Sri Lakshmi Traders', lines: ['14 Market Road, Chickpet, Bengaluru, Karnataka 560053', 'GSTIN: 29ABCDE1234F1Z5 · Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { heading: 'Bill to', rows: [['Name', 'Anand Stores'], ['Address', '7 Gandhi Bazaar, Mysuru, Karnataka 570001'], ['GSTIN', '29PQRSX5678K1Z2']] },
          { heading: 'Invoice details', rows: [['Invoice no.', 'SLT/26-27/0412'], ['Invoice date', '18 Nov 2026'], ['Place of supply', 'Karnataka (29)'], ['Payment due', '3 Dec 2026']] },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Description of goods', 'HSN', 'Qty', 'Rate', 'Taxable value', 'GST %', 'GST', 'Total'],
        align: ['c', 'l', 'c', 'r', 'r', 'r', 'r', 'r', 'r'],
        rows: [
          ['1', 'Basmati rice, 25 kg bag', '1006', '4', '1,900.00', '7,600.00', '5%', '380.00', '7,980.00'],
          ['2', 'Sunflower oil, 1 litre pouch', '1512', '24', '135.00', '3,240.00', '5%', '162.00', '3,402.00'],
          ['3', 'Mobile phone charger', '8504', '10', '220.00', '2,200.00', '18%', '396.00', '2,596.00'],
        ],
        totals: [
          ['Taxable value', '13,040.00'],
          ['CGST', '469.00'],
          ['SGST', '469.00'],
          ['Grand total (₹)', '13,978.00'],
        ],
        blankRows: 8,
      },
      { t: 'text', label: 'Amount in words', text: 'Rupees Thirteen Thousand Nine Hundred Seventy Eight Only' },
      { t: 'text', label: 'Terms', text: 'Goods once sold are taken back only as per our return policy. Payment is due within 15 days of the invoice date.', keep: true },
      { t: 'sign', labels: ['Receiver’s signature', 'For Sri Lakshmi Traders (Authorised signatory)'] },
    ],
  },
  {
    id: 'retail',
    name: 'Retail bill',
    description: 'A short counter bill for a walk-in customer. Prices include tax, so there is one amount per line and one total.',
    fileName: 'retail-invoice-format',
    blocks: [
      { t: 'title', text: 'Invoice' },
      { t: 'org', name: 'Bright Stationery Mart', lines: ['22 College Road, Nashik, Maharashtra 422005', 'Phone: 91234 56780'] },
      {
        t: 'pairs',
        cols: [
          { rows: [['Customer', 'Walk-in customer'], ['Phone', '']] },
          { rows: [['Bill no.', '2086'], ['Date', '18 Nov 2026'], ['Paid by', 'UPI']] },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Item', 'Qty', 'Rate', 'Amount'],
        align: ['c', 'l', 'r', 'r', 'r'],
        rows: [
          ['1', 'Notebook, 200 pages', '5', '60.00', '300.00'],
          ['2', 'Ball pen, pack of 10', '2', '50.00', '100.00'],
          ['3', 'School bag', '1', '850.00', '850.00'],
        ],
        totals: [
          ['Subtotal', '1,250.00'],
          ['Discount', '50.00'],
          ['Total (₹)', '1,200.00'],
        ],
        blankRows: 8,
      },
      { t: 'text', label: 'Note', text: 'Prices are inclusive of taxes. Thank you for shopping with us.', keep: true },
      { t: 'sign', labels: ['Customer', 'For Bright Stationery Mart'] },
    ],
  },
  {
    id: 'service',
    name: 'Service invoice',
    description: 'For consultants, agencies and repair or maintenance work. Uses SAC codes and, in this sample, IGST for a client in another state.',
    fileName: 'service-invoice-format',
    blocks: [
      { t: 'title', text: 'Tax Invoice' },
      { t: 'org', name: 'Mehta & Rao Accounting Services', lines: ['3rd Floor, Lake View Complex, Hyderabad, Telangana 500081', 'GSTIN: 36ABCDE1234F1Z8 · Email: accounts@example.com'] },
      {
        t: 'pairs',
        cols: [
          { heading: 'Billed to', rows: [['Client', 'Coastal Foods Pvt. Ltd.'], ['Address', '41 Harbour Road, Visakhapatnam, Andhra Pradesh 530001'], ['GSTIN', '37PQRSX5678K1Z6']] },
          { heading: 'Invoice details', rows: [['Invoice no.', 'MR/2026/118'], ['Invoice date', '30 Nov 2026'], ['Service period', '1 to 30 Nov 2026'], ['Place of supply', 'Andhra Pradesh (37)']] },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Description of service', 'SAC', 'Qty', 'Rate', 'Amount'],
        align: ['c', 'l', 'c', 'r', 'r', 'r'],
        rows: [
          ['1', 'Monthly accounting and bookkeeping', '9982', '1', '12,000.00', '12,000.00'],
          ['2', 'GST return preparation', '9982', '2', '1,500.00', '3,000.00'],
        ],
        totals: [
          ['Taxable value', '15,000.00'],
          ['IGST at 18%', '2,700.00'],
          ['Total (₹)', '17,700.00'],
        ],
        blankRows: 5,
      },
      { t: 'text', label: 'Amount in words', text: 'Rupees Seventeen Thousand Seven Hundred Only' },
      { t: 'text', label: 'Bank details', text: 'Account name: Mehta & Rao Accounting Services\nAccount no.: 0000 0000 0000 · IFSC: ABCD0000000' },
      { t: 'sign', labels: ['For Mehta & Rao Accounting Services (Authorised signatory)'] },
    ],
  },
]

const blocks: Block[] = [
  {
    kind: 'cards',
    title: 'Which invoice format fits your business?',
    lead: 'The three formats above cover most small businesses. Choose by who you sell to, not by how the page looks.',
    items: [
      { icon: 'gst-receipt', title: 'GST tax invoice', body: 'Use it when you are GST registered and the buyer may claim input tax credit: wholesalers, distributors, manufacturers and B2B traders.' },
      { icon: 'store', title: 'Retail bill', body: 'Use it at the counter for walk-in customers. It is quick to fill and easy for a customer to read.' },
      { icon: 'clipboard', title: 'Service invoice', body: 'Use it when you bill for work and not goods: consulting, repairs, design, coaching, rentals and annual maintenance.' },
    ],
  },
  {
    kind: 'defs',
    title: 'What each field in a GST invoice format means',
    lead: 'These are the fields on the GST tax invoice above. For the legal list and the rules behind it, read [GST invoice format in India](/blog/gst-invoice-format-in-india/).',
    items: [
      { term: 'Supplier details', desc: 'Your business name, address and GSTIN, exactly as on your registration certificate.' },
      { term: 'Invoice number', desc: 'A running number, unique within the financial year and no longer than 16 characters. Letters, digits, hyphens and slashes are allowed.' },
      { term: 'Invoice date', desc: 'The date the invoice is issued. Payment terms and due dates are counted from it.' },
      { term: 'Buyer details', desc: 'The customer’s name and address, and their GSTIN when they are registered.' },
      { term: 'Place of supply', desc: 'The state of the supply, with its code. It decides whether the invoice carries CGST and SGST, or IGST.' },
      { term: 'HSN or SAC', desc: 'The code for the goods (HSN) or service (SAC). The number of digits you must show depends on your turnover.' },
      { term: 'Taxable value', desc: 'Quantity multiplied by rate, less any discount. GST is charged on this figure.' },
      { term: 'Tax rate and amount', desc: 'The GST rate on each line and the tax in rupees, shown as CGST and SGST or as IGST. The [GST calculator](/gst-calculator/) checks a figure in seconds.' },
      { term: 'Signature', desc: 'The signature or digital signature of the supplier or an authorised person.' },
    ],
  },
  {
    kind: 'steps',
    title: 'How to use these invoice formats',
    steps: [
      { title: 'Pick a format', body: 'Choose the GST, retail or service layout, then switch to **Blank** if you want an empty copy.' },
      { title: 'Download or print', body: 'Take the Excel file to edit and total the figures, the Word file to change the wording, or print a stack of blank copies.' },
      { title: 'Add your details once', body: 'Put your business name, address and GSTIN in the file and save it as your own master copy.' },
      { title: 'Number every invoice', body: 'Give each invoice the next number in the series and keep a copy. Gaps and repeats cause trouble at return time.' },
    ],
  },
  {
    kind: 'split',
    title: 'Excel, Word or PDF: which file should you keep?',
    left: {
      title: 'What each file is good for',
      items: [
        '**Excel** stores amounts as numbers, so you can add formulas for totals and tax.',
        '**Word** is easiest when you mostly change text, such as terms and descriptions.',
        '**PDF** is best for sending. Print the filled invoice and choose “Save as PDF” so the customer cannot change it by accident.',
      ],
    },
    right: {
      title: 'Where a file-based format falls short',
      items: [
        'Invoice numbers are typed by hand, so a number can be skipped or used twice.',
        'Stock does not come down when you bill, and payments are not tracked.',
        'Monthly sales and tax totals have to be added up from separate files.',
      ],
    },
  },
  {
    kind: 'prose',
    title: 'From a blank format to a finished invoice',
    body: [
      'A format gives you the layout. If you would rather type the details and get a finished document, the free [invoice generator](/invoice-generator/) fills in the totals, the tax split and the amount in words for you.',
      'When you raise invoices every day, typing them one by one becomes the slow part of the job. [LocalPOS GST billing software](/features/gst-billing-software/) keeps your items, prices and customers, numbers every invoice in order and prepares the sales records for your returns.',
    ],
  },
]

const faqs: FaqItem[] = [
  { q: 'Is there one official invoice format under GST?', a: 'No. The GST rules list the details an invoice must carry, but they do not fix a layout. Any design is acceptable as long as the required fields are present.' },
  { q: 'Can I download the invoice format in Excel and Word?', a: 'Yes. Each format on this page downloads as an Excel workbook (.xlsx) and a Word document (.docx), either with the sample values or blank. For a PDF, print the format and choose “Save as PDF”.' },
  { q: 'How many copies of an invoice do I need?', a: 'For goods, the usual practice is three copies: the original for the recipient, a duplicate for the transporter and a triplicate for the supplier. For services, two copies are usual: one for the recipient and one for the supplier.' },
  { q: 'What should an unregistered business put on its invoice?', a: 'A business that is not registered under GST should not show a GSTIN or charge GST. A simple bill with its name, the bill number, date, items and total is enough. The retail bill above works well for this.' },
  { q: 'Can I add my logo to the format?', a: 'Yes. Open the Word or Excel file and insert your logo at the top. If you do not have one yet, the [logo maker](/logo-maker/) creates a simple text logo you can download.' },
]

export default function InvoiceFormatsPage() {
  return (
    <ResourcePage
      slug="invoice-formats"
      seoTitle="Invoice Format in Excel, Word and PDF | LocalPOS"
      seoDescription="Download a free invoice format in Excel, Word or PDF. Three ready layouts for India: GST tax invoice, retail bill and service invoice, with every field explained."
      h1="Invoice format for GST, retail and service bills"
      intro="Pick an invoice format, see it filled with sample values, and download it as an Excel or Word file or print it. Each layout is free to use and edit."
      points={['Excel, Word and print-ready', 'Sample or blank', 'Free to edit']}
      toolTitle="Invoice format templates"
      blocks={blocks}
      faqs={faqs}
      faqTitle="Invoice format questions"
      related={['invoice-generator', 'gst-calculator', 'bill-book-format', 'receipt-format']}
      relatedTitle="Related tools and formats"
      cta={{ title: 'Stop typing invoices by hand', text: 'LocalPOS creates a numbered GST invoice in seconds, prints or shares it, and updates your stock and sales records at the same time.' }}
    >
      <TemplateViewer templates={templates} />
    </ResourcePage>
  )
}
