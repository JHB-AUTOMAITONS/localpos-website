import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { TemplateViewer } from '@/components/templates/TemplateViewer'
import type { TemplateDoc } from '@/components/templates/types'
import type { FaqItem } from '@/lib/seo'

const templates: TemplateDoc[] = [
  {
    id: 'goods',
    name: 'Goods quotation',
    description: 'For a trader or dealer quoting prices for products. Shows HSN codes, quantity, unit rate and GST. The 18% rate in the sample is for illustration.',
    fileName: 'goods-quotation-format',
    blocks: [
      { t: 'title', text: 'Quotation' },
      { t: 'org', name: 'Shree Ganesh Electricals', lines: ['Shop 6, Laxmi Road, Sadashiv Peth, Pune, Maharashtra 411030', 'GSTIN: 27ABCDE1234F1Z5 · Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { heading: 'Quotation for', rows: [['Name', 'Sunrise Residency Co-operative Housing Society'], ['Address', 'Baner Road, Pune, Maharashtra 411045'], ['Contact person', 'Mr. Deshmukh, Secretary']] },
          { heading: 'Quotation details', rows: [['Quotation no.', 'QTN/26-27/0142'], ['Date', '16 Nov 2026'], ['Valid until', '30 Nov 2026'], ['Your enquiry', 'Email dated 14 Nov 2026']] },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Description of goods', 'HSN', 'Qty', 'Unit', 'Rate', 'Amount'],
        align: ['c', 'l', 'c', 'r', 'c', 'r', 'r'],
        rows: [
          ['1', 'LED tube light, 20 W, with fitting', '9405', '40', 'Nos', '240.00', '9,600.00'],
          ['2', 'Ceiling fan, 1200 mm, white', '8414', '12', 'Nos', '1,650.00', '19,800.00'],
          ['3', 'Copper wire, 1.5 sq mm, 90 m coil', '8544', '10', 'Coil', '1,480.00', '14,800.00'],
        ],
        totals: [
          ['Subtotal', '44,200.00'],
          ['CGST at 9%', '3,978.00'],
          ['SGST at 9%', '3,978.00'],
          ['Total (₹)', '52,156.00'],
        ],
        blankRows: 8,
      },
      { t: 'text', label: 'Amount in words', text: 'Rupees Fifty Two Thousand One Hundred Fifty Six Only' },
      {
        t: 'text',
        label: 'Terms and conditions',
        text: '1. Prices are valid until the date shown above.\n2. Delivery within 7 days of a confirmed order.\n3. Payment: 50% with the order, balance on delivery.\n4. Warranty as given by the manufacturer.',
        keep: true,
      },
      { t: 'sign', labels: ['Accepted by (customer)', 'For Shree Ganesh Electricals'] },
    ],
  },
  {
    id: 'services',
    name: 'Services quotation',
    description: 'For work priced by area, by job or by visit, such as interiors, repairs or an annual maintenance contract. Includes scope, timeline and stage payments. The tax rate shown is for illustration.',
    fileName: 'services-quotation-format',
    blocks: [
      { t: 'title', text: 'Quotation', sub: 'Interior work' },
      { t: 'org', name: 'Nirmaan Interiors', lines: ['18 Second Cross, Indiranagar, Bengaluru, Karnataka 560038', 'GSTIN: 29ABCDE1234F1Z5 · Email: hello@example.com'] },
      {
        t: 'pairs',
        cols: [
          { heading: 'Prepared for', rows: [['Client', 'Mr. Rohan Kulkarni'], ['Site', 'Flat 402, Lakeside Apartments, Whitefield, Bengaluru'], ['Phone', '98765 43210']] },
          { heading: 'Quotation details', rows: [['Quotation no.', 'NI/Q/2026/057'], ['Date', '19 Nov 2026'], ['Valid until', '19 Dec 2026'], ['Completion', '45 days from the advance']] },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Scope of work', 'SAC', 'Qty', 'Unit', 'Rate', 'Amount'],
        align: ['c', 'l', 'c', 'r', 'c', 'r', 'r'],
        rows: [
          ['1', 'Modular kitchen, laminate finish', '9954', '85', 'Sq ft', '1,450.00', '1,23,250.00'],
          ['2', 'Wardrobe with sliding shutters', '9954', '60', 'Sq ft', '1,300.00', '78,000.00'],
          ['3', 'Gypsum false ceiling', '9954', '320', 'Sq ft', '95.00', '30,400.00'],
          ['4', 'Interior painting, two coats', '9954', '1,400', 'Sq ft', '22.00', '30,800.00'],
        ],
        totals: [
          ['Subtotal', '2,62,450.00'],
          ['CGST at 9%', '23,620.50'],
          ['SGST at 9%', '23,620.50'],
          ['Total (₹)', '3,09,691.00'],
        ],
        blankRows: 8,
      },
      { t: 'text', label: 'Amount in words', text: 'Rupees Three Lakh Nine Thousand Six Hundred Ninety One Only' },
      { t: 'text', label: 'Not included', text: 'Electrical rewiring, plumbing changes, loose furniture and appliances. Any extra work will be quoted separately before it starts.', keep: true },
      { t: 'text', label: 'Payment schedule', text: '40% advance to start the work, 40% when the carpentry is installed, 20% on handover.', keep: true },
      { t: 'sign', labels: ['Client’s acceptance and date', 'For Nirmaan Interiors'] },
    ],
  },
]

const blocks: Block[] = [
  {
    kind: 'defs',
    title: 'Fields every quotation format should have',
    lead: 'A quotation is an offer. The customer should be able to accept it without calling you to ask what something means.',
    items: [
      { term: 'Quotation number', desc: 'Your own running number. It lets both sides refer to the same offer when a revised price is sent later.' },
      { term: 'Date and valid until', desc: 'The day the offer is made and the last day you will hold the price. Seven, fifteen or thirty days are common.' },
      { term: 'Customer details', desc: 'The name and address of the person or business you are quoting to, and the site address when work is done elsewhere.' },
      { term: 'Description', desc: 'Brand, model, size, grade or scope of work. A vague line such as “kitchen work” is where most disputes start.' },
      { term: 'Quantity, unit and rate', desc: 'How much, in which unit (numbers, kg, sq ft, visits) and the price for one unit before tax.' },
      { term: 'GST', desc: 'A registered business shows the tax separately so the customer sees the final amount. Check a figure with the [GST calculator](/gst-calculator/).' },
      { term: 'Terms', desc: 'Delivery time, payment stages, warranty and what is not included in the price.' },
      { term: 'Acceptance', desc: 'A line for the customer to sign and date. A signed copy is your confirmation to start.' },
    ],
  },
  {
    kind: 'table',
    title: 'Quotation, estimate and proforma invoice: the difference',
    lead: 'The three documents look alike and are often mixed up. None of them is a tax invoice, and none records a sale.',
    head: ['Point', 'Quotation', 'Estimate', 'Proforma invoice'],
    rows: [
      ['What it says', 'A fixed price offer', 'An approximate cost', 'The bill the buyer will get'],
      ['Can the price change?', 'Not within the validity', 'Yes, with the actual work', 'Normally not'],
      ['When it is sent', 'After an enquiry', 'Before the scope is final', 'After the order is agreed'],
      ['Typical use', 'Goods and defined jobs', 'Repairs and site work', 'Advance payment, bank or import papers'],
    ],
    note: 'If your price depends on measurements still to be taken, an [estimate format](/estimate-format/) is the more honest document. Once the customer agrees, the [proforma invoice generator](/proforma-invoice-generator/) prepares the advance bill.',
  },
  {
    kind: 'cards',
    title: 'Where businesses use a quotation',
    items: [
      { icon: 'store', title: 'Bulk orders at a shop', body: 'A school, office or housing society asks for prices on a list of items before it places one large order.' },
      { icon: 'clipboard', title: 'Contract and site work', body: 'Interior, electrical, fabrication and civil jobs, where the scope and the stage payments need to be on paper.' },
      { icon: 'refresh', title: 'Annual maintenance', body: 'AMC offers for air conditioners, lifts, computers or water purifiers, with the number of visits and what is covered.' },
      { icon: 'building', title: 'Tenders and comparisons', body: 'Buyers often collect three offers and compare them line by line, so a clear layout works in your favour.' },
    ],
  },
  {
    kind: 'split',
    title: 'Writing terms that prevent arguments later',
    left: {
      title: 'Worth stating clearly',
      items: [
        'The date until which the price holds.',
        'Whether the rates include GST, transport, loading and installation.',
        'The advance needed to confirm the order and when the balance is due.',
        'Delivery or completion time, counted from the order or from the advance.',
        'Exclusions, so extra work is not assumed to be free.',
      ],
    },
    right: {
      title: 'Common slips',
      items: [
        'No validity date, so a customer returns months later expecting the old price.',
        'A total with no line-wise break-up, which makes negotiation harder.',
        'Brand or model left out, then disputed at delivery.',
        'Revised offers sent under the same number as the first one.',
      ],
    },
  },
  {
    kind: 'prose',
    title: 'Download the file, or let a tool fill it in',
    body: [
      'Each layout above opens with sample values or blank. Download it as an Excel workbook or a Word document, or print it and choose “Save as PDF”. Everything is free, needs no sign-up and runs in your browser.',
      'If you would rather type the items and have the totals worked out, the free [quotation maker](/quotation-maker/) adds up the lines, applies GST and writes the amount in words.',
      'Shops that quote every week usually keep their items and prices in one place. With [LocalPOS billing software](/features/pos-billing-software/) the same item list is used for quotations and invoices, so prices are not typed again.',
    ],
  },
]

const faqs: FaqItem[] = [
  { q: 'Can I get the quotation format in Excel?', a: 'Yes. Choose the goods or services layout, pick sample or blank, and press the Excel button to download an .xlsx file. Amounts are stored as numbers, so you can add your own formulas.' },
  { q: 'Is there a quotation format in Word as well?', a: 'Yes. The Word button downloads a .docx file of the same layout. It suits quotations where you mostly edit text, such as the scope of work and the terms.' },
  { q: 'Is a quotation legally binding?', a: 'A quotation is an offer. It generally becomes an agreement when the customer accepts it within the validity period, for example by signing it or sending a purchase order. For large contracts, take legal advice on the wording.' },
  { q: 'Should GST be shown on a quotation?', a: 'A GST-registered business normally shows the tax separately, or states clearly that prices are exclusive of GST. A business that is not registered should not show GST at all.' },
  { q: 'How long should a quotation stay valid?', a: 'It is your decision. Use a short validity, such as 7 to 15 days, when your purchase prices move often, and a longer one for services where your costs are stable.' },
  { q: 'Does a quotation need a serial number like an invoice?', a: 'No rule fixes a numbering system for quotations. A running number is still useful, because the customer’s order can then quote it and you can trace a revised offer.' },
]

export default function QuotationFormatPage() {
  return (
    <ResourcePage
      slug="quotation-format"
      seoTitle="Quotation Format in Excel, Word and PDF | LocalPOS"
      seoDescription="Free quotation format for goods and for services, filled with sample values. Download in Excel or Word, or print to PDF. Fields, terms and uses explained."
      h1="Quotation format for goods and services"
      intro="Download a free quotation format with the number, date, validity, items, GST and terms already laid out. Two versions are ready: one for goods and one for services."
      points={['Goods and services layouts', 'Excel, Word and print', 'Sample or blank']}
      toolTitle="Quotation format templates"
      toolLead="Switch between the two layouts, then choose the sample or the blank copy."
      blocks={blocks}
      faqs={faqs}
      faqTitle="Questions about quotations"
      related={['quotation-maker', 'estimate-format', 'proforma-invoice-generator', 'invoice-formats']}
      relatedTitle="Related tools and formats"
      cta={{ title: 'Turn an accepted quotation into a bill quickly', text: 'LocalPOS keeps your items, prices and customers together, so the invoice after an accepted offer takes a few taps and carries the right GST.' }}
    >
      <TemplateViewer templates={templates} />
    </ResourcePage>
  )
}
