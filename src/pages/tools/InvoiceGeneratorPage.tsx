import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { DocumentBuilder } from '@/components/tools/DocumentBuilder'
import type { FaqItem } from '@/lib/seo'

const blocks: Block[] = [
  {
    kind: 'steps',
    title: 'How to fill in the invoice generator',
    lead: 'The form is on the left and the finished page is on the right. On a phone the preview sits below the form.',
    steps: [
      { title: 'Enter both parties', body: 'Type your business name, address, GSTIN, phone and email. Then add the customer’s name, address, phone and, for a registered buyer, their GSTIN.' },
      { title: 'Set the invoice details', body: 'Give the bill a number, an invoice date and a due date, and name the place of supply. Choose **CGST + SGST**, **IGST** or **No GST** to match the sale.' },
      { title: 'Add the items', body: 'Each row takes a description, HSN or SAC code, quantity, unit rate, discount % and GST %. Add or remove rows as you go, up to 50 on one bill.' },
      { title: 'Check and download', body: 'Read the totals and the amount in words in the preview. Then choose Print / Save as PDF, or download the bill as an Excel or Word file.' },
    ],
  },
  {
    kind: 'defs',
    title: 'The fields that people ask about',
    items: [
      { term: 'Invoice number', desc: 'Your own serial number for the bill. Under GST rules it should be consecutive, unique within the financial year and no longer than 16 characters. The tool does not remember the last number, so keep your own list.' },
      { term: 'Place of supply', desc: 'The state where the supply is treated as made, usually the buyer’s state for goods delivered to them. If it is your own state, pick CGST + SGST. If it is another state, pick IGST.' },
      { term: 'HSN / SAC code', desc: 'HSN codes classify goods and SAC codes classify services. How many digits you must print depends on your turnover.' },
      { term: 'Discount %', desc: 'Taken off the line before tax. GST is then worked out on the reduced figure, which is the taxable value.' },
      { term: 'Due date', desc: 'The last day you expect payment. For a sale paid on the spot, use the invoice date.' },
      { term: 'Round-off', desc: 'Optional. It moves the grand total to the nearest rupee and shows the paise adjusted, for example 1,180.40 becomes 1,180.00 with a round-off line of -0.40.' },
    ],
  },
  {
    kind: 'prose',
    title: 'What a GST tax invoice has to show',
    body: [
      'A registered business issues a tax invoice for a taxable sale, and the rules list the particulars it must carry: details of the supplier and the buyer, a serial number and date, a description with HSN or SAC code, the taxable value, and the rate and amount of tax under each head. Our guide to the [GST invoice format in India](/blog/gst-invoice-format-in-india/) goes through the full list.',
      'The form here has a field for each of those common particulars, but it cannot know your situation. A composition dealer or a seller of exempt goods normally issues a bill of supply and not a tax invoice, and some businesses need extra declarations. Confirm the wording for your case with a chartered accountant.',
    ],
    aside: {
      title: 'Not sure of the tax on a line?',
      body: 'Work out one figure first with the [GST calculator](/gst-calculator/), then enter the rate here.',
    },
  },
  {
    kind: 'cards',
    title: 'Who this tool suits',
    lead: 'It is made for people who bill now and then, not for a busy counter.',
    items: [
      { icon: 'user', title: 'Freelancers and consultants', body: 'A designer in Pune or a tutor in Kochi who sends three or four bills a month and wants them to look proper.' },
      { icon: 'store', title: 'New businesses', body: 'A shop or workshop that has just received its GSTIN and needs to raise its first bills this week.' },
      { icon: 'clock', title: 'Occasional billing', body: 'A trader who mostly sells for cash but sometimes needs a typed bill for a company customer.' },
    ],
  },
  {
    kind: 'table',
    title: 'Generator, ready format or billing software',
    lead: 'Three ways to produce the same document. Pick by how often you bill.',
    head: ['', 'This tool', 'Ready format', 'Billing software'],
    rows: [
      ['How it works', 'Type in the browser, totals are automatic', 'Download a file and edit it in Excel or Word', 'Pick saved items and customers'],
      ['Suits', 'A few bills a month', 'Your own layout, or filling by hand', 'Bills every day'],
      ['Remembers past bills', 'No', 'Only the files you save', 'Yes'],
      ['Stock and payments', 'Not tracked', 'Not tracked', 'Tracked with each bill'],
    ],
    note: 'Ready layouts for goods, services and bills of supply are on the [invoice formats](/invoice-formats/) page.',
  },
  {
    kind: 'split',
    title: 'What you get, and what is left out',
    left: {
      title: 'Included',
      items: [
        'A live preview that changes as you type',
        'Subtotal, discount, taxable value, CGST and SGST or IGST, and the grand total',
        'The amount in words in Indian numbering, with lakh and crore',
        'Space for terms and conditions and for notes',
        'Print / Save as PDF through your browser, plus Excel (.xlsx) and Word (.docx) files',
      ],
    },
    right: {
      title: 'Not included',
      items: [
        'Saving. If you reload or close the page, what you typed is gone',
        'Logo upload. Add your logo in the Word or Excel file',
        'GST e-invoicing. No IRN or signed QR code is generated',
        'A running number series, payment records or stock',
        'Currencies other than the rupee',
      ],
    },
  },
]

const faqs: FaqItem[] = [
  { q: 'Is this invoice generator free to use?', a: 'Yes. It is free, it runs in your browser, there is no sign-up and nothing you type is uploaded.' },
  { q: 'Can I make a bill without a GSTIN?', a: 'Yes. Leave the GSTIN boxes empty and choose **No GST**. The bill then shows no tax lines. An unregistered business should not collect GST from customers.' },
  { q: 'How do I save the bill as a PDF?', a: 'Press Print / Save as PDF. In the print dialog that opens, choose “Save as PDF” as the printer or destination. Keep a copy, because the page itself stores nothing.' },
  { q: 'Is a bill made here valid as an e-invoice?', a: 'No. E-invoicing applies to businesses above a notified turnover limit and needs an IRN and a signed QR code from the government’s invoice portal. This tool produces an ordinary invoice only.' },
  { q: 'Can I charge different GST rates on one bill?', a: 'Yes. The GST % is set on each row, so one bill can carry items at different rates. The totals add up the tax across all rows.' },
  { q: 'When should I move to billing software?', a: 'When retyping becomes the slow part: the same customers and items every day, a number series to keep in order, payments to follow up and stock to reduce. [LocalPOS GST billing software](/features/gst-billing-software/) keeps those saved and connected to each bill.' },
]

export default function InvoiceGeneratorPage() {
  return (
    <ResourcePage
      slug="invoice-generator"
      seoTitle="Free Invoice Generator: Make a GST Bill Online | LocalPOS"
      seoDescription="Free invoice generator for Indian businesses. Fill in items, GST and totals, see a live preview, then print, save as PDF or download in Excel or Word."
      h1="Invoice Generator for GST and non-GST bills"
      intro="This free invoice generator turns your business details, items and tax into a finished bill while you type. Print it, save it as a PDF, or download it as an Excel or Word file."
      points={['CGST, SGST or IGST', 'Amount in words', 'PDF, Excel and Word']}
      toolTitle="Create your invoice"
      toolLead="Fill in the form. The preview updates as you type."
      featureList={['GST invoice with CGST and SGST or IGST', 'Line items with HSN/SAC, discount and GST rate', 'Automatic totals and amount in words', 'Print or save as PDF', 'Excel and Word downloads']}
      blocks={blocks}
      faqs={faqs}
      faqTitle="Questions about making an invoice online"
      related={['invoice-formats', 'gst-calculator', 'receipt-maker', 'quotation-maker']}
      cta={{ title: 'Billing every day? Stop retyping', text: 'LocalPOS saves your items, customers and tax rates, numbers each bill in order and keeps every invoice on record.' }}
    >
      <DocumentBuilder kind="invoice" />
    </ResourcePage>
  )
}
