import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { TemplateViewer } from '@/components/templates/TemplateViewer'
import type { TemplateDoc } from '@/components/templates/types'
import type { FaqItem } from '@/lib/seo'

const templates: TemplateDoc[] = [
  {
    id: 'job',
    name: 'Job cost estimate',
    description: 'For work priced from materials and labour, such as painting, electrical, plumbing or interior jobs. This sample is for repainting a flat.',
    fileName: 'job-cost-estimate',
    blocks: [
      { t: 'title', text: 'Estimate', sub: 'Interior repainting of a 2 BHK flat' },
      { t: 'org', name: 'Rangoli Painting Works', lines: ['56 Sapna Sangeeta Road, Indore, Madhya Pradesh 452001', 'GSTIN: 23ABCDE1234F1Z5 · Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { heading: 'Prepared for', rows: [['Customer', 'Mr. Vivek Sharma'], ['Site', 'Flat 302, Shanti Residency, Vijay Nagar, Indore'], ['Phone', '91234 56780']] },
          { heading: 'Estimate details', rows: [['Estimate no.', 'EST/26-27/087'], ['Date', '12 Nov 2026'], ['Valid until', '27 Nov 2026'], ['Site visit on', '10 Nov 2026']] },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Description', 'Unit', 'Qty', 'Rate', 'Amount'],
        align: ['c', 'l', 'c', 'r', 'r', 'r'],
        rows: [
          { section: 'A. Materials' },
          ['1', 'Wall putty, 20 kg bag', 'bag', '6', '850.00', '5,100.00'],
          ['2', 'Wall primer, 20 litre bucket', 'bucket', '2', '2,400.00', '4,800.00'],
          ['3', 'Interior emulsion paint, 20 litre bucket', 'bucket', '3', '4,200.00', '12,600.00'],
          ['4', 'Enamel paint for doors and grills, 4 litre tin', 'tin', '2', '1,250.00', '2,500.00'],
          ['5', 'Sandpaper, rollers, brushes and masking tape', 'lot', '1', '1,500.00', '1,500.00'],
          { total: ['', 'Materials subtotal', '', '', '', '26,500.00'] },
          { section: 'B. Labour' },
          ['6', 'Surface preparation and two coats of putty', 'sq ft', '2,400', '6.00', '14,400.00'],
          ['7', 'One coat of primer and two coats of paint', 'sq ft', '2,400', '8.00', '19,200.00'],
          ['8', 'Enamel painting of doors and grills', 'nos', '8', '450.00', '3,600.00'],
          { total: ['', 'Labour subtotal', '', '', '', '37,200.00'] },
        ],
        totals: [
          ['Estimated cost before tax', '63,700.00'],
          ['GST at 18% (for illustration)', '11,466.00'],
          ['Estimated total (₹)', '75,166.00'],
        ],
        blankRows: 10,
      },
      { t: 'text', label: 'Estimated total in words', text: 'Rupees Seventy Five Thousand One Hundred Sixty Six Only' },
      {
        t: 'text',
        label: 'Terms',
        text: '1. This is an estimate and not a fixed price. The final bill will be based on the actual area measured and the materials used.\n2. Work not listed above, such as repair of damp patches or cracks found after scraping, will be charged extra after informing the customer.\n3. An advance of 40% is payable before work starts. The balance is payable on completion.\n4. Work is expected to take 8 working days from the start date.\n5. This estimate is valid until the date shown above.',
        keep: true,
      },
      { t: 'sign', labels: ['Customer’s acceptance', 'For Rangoli Painting Works'] },
    ],
  },
  {
    id: 'product',
    name: 'Product estimate',
    description: 'A short estimate for goods with a small installation charge. Use it when a customer asks what a set of items is likely to cost.',
    fileName: 'product-estimate',
    blocks: [
      { t: 'title', text: 'Estimate' },
      { t: 'org', name: 'Nila Computers', lines: ['9 Town Hall Road, Madurai, Tamil Nadu 625001', 'GSTIN: 33ABCDE1234F1Z5 · Email: sales@example.com'] },
      {
        t: 'pairs',
        cols: [
          { heading: 'Prepared for', rows: [['Customer', 'Vaigai Tuition Centre'], ['Address', '27 K K Nagar, Madurai, Tamil Nadu 625020']] },
          { heading: 'Estimate details', rows: [['Estimate no.', 'E-0214'], ['Date', '16 Nov 2026'], ['Valid until', '23 Nov 2026']] },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Item', 'Qty', 'Rate', 'Amount'],
        align: ['c', 'l', 'r', 'r', 'r'],
        rows: [
          ['1', 'Desktop computer, 8 GB RAM, 512 GB SSD', '5', '38,000.00', '1,90,000.00'],
          ['2', 'Monitor, 19.5 inch', '5', '6,500.00', '32,500.00'],
          ['3', 'UPS, 600 VA', '5', '2,800.00', '14,000.00'],
          ['4', 'Installation and network cabling', '1', '3,500.00', '3,500.00'],
        ],
        totals: [
          ['Subtotal', '2,40,000.00'],
          ['GST at 18% (for illustration)', '43,200.00'],
          ['Estimated total (₹)', '2,83,200.00'],
        ],
        blankRows: 8,
      },
      { t: 'text', label: 'Estimated total in words', text: 'Rupees Two Lakh Eighty Three Thousand Two Hundred Only' },
      { t: 'text', label: 'Terms', text: 'Prices are approximate and depend on stock and supplier prices on the date of order. A firm quotation will be given on request. Delivery within 5 working days of a confirmed order.', keep: true },
      { t: 'sign', labels: ['For Nila Computers'] },
    ],
  },
]

const blocks: Block[] = [
  {
    kind: 'prose',
    title: 'What an estimate is',
    body: [
      'An estimate is your considered guess of what a job or an order will cost, written down before the work begins. It tells the customer roughly how much to keep aside and shows how you arrived at the figure.',
      'The word that matters is “approximate”. A painter cannot know the exact wall area until it is measured, and an electrician cannot see the wiring inside a wall. The estimate gives a careful figure with those unknowns stated, and the final bill follows the actual work.',
      'Because it is not a tax document, it has no fixed legal layout. A clear estimate format simply needs to show who it is for, what is included, how each amount was worked out and how long the figure holds.',
    ],
    aside: {
      title: 'Free to download',
      body: 'Both layouts on this page download as Excel and Word files, with sample values or blank. Nothing is uploaded and there is no sign-up.',
    },
  },
  {
    kind: 'table',
    title: 'Estimate and quotation: the difference',
    lead: 'The two words are often used for the same paper, but they do not promise the same thing.',
    head: ['Point', 'Estimate', 'Quotation'],
    rows: [
      ['Price', 'Approximate, may go up or down', 'Fixed offer for the stated scope'],
      ['When it is used', 'Scope or quantity is not fully known', 'Scope and quantity are clear'],
      ['Can the final bill differ?', 'Yes, based on actual work', 'Normally no, unless the scope changes'],
      ['Typical wording', '“Estimated cost”, “approximately”', '“Our offer”, “price valid for 15 days”'],
      ['Usual next step', 'A firm quotation or a work order', 'A purchase order or an advance'],
    ],
    note: 'If you are ready to commit to a price, send a quotation and not an estimate. The [quotation maker](/quotation-maker/) prepares one for you, and the [quotation format](/quotation-format/) page has layouts to download.',
  },
  {
    kind: 'defs',
    title: 'Fields in the estimate format',
    items: [
      { term: 'Your business details', desc: 'Name, address, phone and, if you are registered, your GSTIN.' },
      { term: 'Customer and site', desc: 'Who asked for the estimate and where the work will be done. For a job, the site address matters more than the billing address.' },
      { term: 'Estimate number and date', desc: 'A running number makes it easy to refer to the paper later, especially when you revise it.' },
      { term: 'Valid until', desc: 'The date up to which the figures hold. Material prices move, so do not leave this open.' },
      { term: 'Materials', desc: 'Each material with its unit, quantity and rate. Listing them shows the customer where the money goes.' },
      { term: 'Labour', desc: 'Work charged by area, by piece, by day or as a lump sum, kept apart from materials.' },
      { term: 'Tax and estimated total', desc: 'GST, where you charge it, shown on its own line and then the total. You can check the tax with the [GST calculator](/gst-calculator/).' },
      { term: 'Acceptance', desc: 'A line for the customer’s signature and date, so both sides know the estimate was seen and agreed as a basis.' },
    ],
  },
  {
    kind: 'prose',
    title: 'Terms to include in an estimate',
    body: [
      'The terms are what separate a useful estimate from a number on a slip of paper. They say what could change the figure and what happens when it does.',
      'Keep them short and specific to the job. Five or six plain lines are enough for most small jobs.',
    ],
    bullets: [
      '**Basis of the figure:** state that the amount is an estimate and that billing will follow actual measurement or actual quantity.',
      '**Exclusions:** list what is not covered, such as civil repairs, scaffolding, transport or electricity at the site.',
      '**Extra work:** say that work outside the listed scope will be charged separately, after telling the customer.',
      '**Validity:** give a date. Seven to thirty days is common, depending on how fast your input prices change.',
      '**Advance and payment:** the advance needed to start and when the balance falls due.',
      '**Time:** the expected duration and anything it depends on, such as site access or weather.',
    ],
  },
  {
    kind: 'steps',
    title: 'From estimate to final bill',
    lead: 'An estimate is the first paper in a short chain. Each later document should refer back to it.',
    steps: [
      { title: 'Measure and estimate', body: 'Visit the site or study the requirement, then fill in materials, labour and terms. Give the customer a signed copy.' },
      { title: 'Revise if needed', body: 'If the customer changes the scope, issue a revised estimate with a new number or a revision mark, and not a corrected old one.' },
      { title: 'Confirm the job', body: 'Once the scope is settled, fix the price in a quotation or record the job in a [work order](/work-order-format/) and collect the advance.' },
      { title: 'Bill the actual work', body: 'After the work, raise the invoice for what was really done. The free [invoice generator](/invoice-generator/) totals it and writes the amount in words.' },
    ],
  },
  {
    kind: 'cards',
    title: 'Who gives estimates',
    items: [
      { icon: 'palette', title: 'Painters and interior firms', body: 'Area-based jobs where the true quantity is known only after measurement and surface preparation.' },
      { icon: 'zap', title: 'Electricians and plumbers', body: 'Rewiring, fittings and repair work where hidden faults may add to the cost.' },
      { icon: 'building', title: 'Civil and fabrication contractors', body: 'Jobs priced from steel, cement, sheet and labour, where material rates change week to week.' },
      { icon: 'monitor', title: 'Shops selling to offices', body: 'Computers, furniture or appliances for a school or office that wants a budget figure first. Shops that raise many such papers can keep quotations and bills together in [LocalPOS billing software](/features/gst-billing-software/).' },
    ],
  },
]

const faqs: FaqItem[] = [
  { q: 'Is an estimate legally binding?', a: 'An estimate is generally understood as an approximate figure and not a fixed price, and the terms printed on it decide how far it can change. If you want certainty on either side, put the agreed price in a quotation or a work order. For a dispute over a large job, take legal advice.' },
  { q: 'Can I charge more than the estimate?', a: 'The final bill can differ when the actual quantity or scope differs, which is why the terms should say so. It is good practice to tell the customer before you cross the estimated figure, and to get their consent for extra work in writing or by message.' },
  { q: 'Should GST be shown on an estimate?', a: 'If you are GST registered and will charge GST on the final invoice, show it as a separate line so the customer sees the full likely cost. The rate depends on what you supply. Confirm the rate for your goods or service with your accountant.' },
  { q: 'Is there a cost estimate format in Excel on this page?', a: 'Yes. Both layouts download as an Excel workbook (.xlsx) and as a Word document (.docx). You can also print them, or choose “Save as PDF” in the print window.' },
  { q: 'How long should an estimate stay valid?', a: 'Long enough for the customer to decide, short enough that your costs do not move. Many small businesses use 7 to 30 days and write the last date on the paper.' },
  { q: 'Can I use the estimate template for services with no materials?', a: 'Yes. Delete the materials section and list the tasks with hours, days or a lump sum. The product layout also works if you rename the “Item” column to “Service”.' },
]

export default function EstimateFormatPage() {
  return (
    <ResourcePage
      slug="estimate-format"
      seoTitle="Estimate Format in Excel and Word for Jobs | LocalPOS"
      seoDescription="Download a free estimate format in Excel or Word. A job cost estimate with materials and labour, and a product estimate, with fields and terms explained."
      h1="Estimate format for jobs, services and products"
      intro="Use this estimate format to give a customer a clear, approximate cost before work starts. See it filled with a sample painting job, then download it or print a blank copy."
      points={['Materials and labour split', 'Excel, Word or print', 'Terms included']}
      toolTitle="Estimate templates"
      blocks={blocks}
      faqs={faqs}
      faqTitle="Questions about estimates"
      related={['quotation-format', 'quotation-maker', 'work-order-format', 'invoice-generator']}
      relatedTitle="Related tools and formats"
      cta={{ title: 'Turn agreed work into a bill in seconds', text: 'LocalPOS keeps your items, rates and customers, so the invoice for a finished job is ready without retyping the estimate.' }}
    >
      <TemplateViewer templates={templates} />
    </ResourcePage>
  )
}
