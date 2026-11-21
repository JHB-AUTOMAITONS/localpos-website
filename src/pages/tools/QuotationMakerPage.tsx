import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { DocumentBuilder } from '@/components/tools/DocumentBuilder'
import type { FaqItem } from '@/lib/seo'

const blocks: Block[] = [
  {
    kind: 'cards',
    title: 'What makes a quotation clear',
    lead: 'A customer should be able to say yes without phoning you to ask what is included.',
    items: [
      { icon: 'clipboard', title: 'Scope', body: 'Name each item or job in words the customer used. “Supply and fitting of 10 office chairs” is better than “furniture”.' },
      { icon: 'calendar', title: 'Validity', body: 'Fill in the **Valid until** date. Prices of materials move, and an open-ended offer can be accepted months later.' },
      { icon: 'percent', title: 'Taxes', body: 'Show GST as its own line so nobody argues later about whether the price included it.' },
      { icon: 'truck', title: 'Delivery', body: 'Say when and where you will deliver, and whether freight, unloading and installation are inside the price.' },
      { icon: 'wallet', title: 'Payment terms', body: 'State the advance, the balance and when each is due, and how you accept payment.' },
      { icon: 'alert', title: 'Exclusions', body: 'List what is not covered, such as civil work, wiring or site permissions. This prevents most disputes.' },
    ],
  },
  {
    kind: 'table',
    title: 'A worked example of the totals',
    lead: 'A furniture dealer quotes a customer in the same state. The 18% rate is for illustration only. Amounts are in rupees.',
    head: ['Line', 'Qty × rate', 'Discount', 'Taxable value', 'GST 18%'],
    rows: [
      ['Office chair', '10 × 4,500.00', '10% = 4,500.00', '40,500.00', '7,290.00'],
      ['Assembly charge', '1 × 2,000.00', 'None', '2,000.00', '360.00'],
      ['Totals', '47,000.00', '4,500.00', '42,500.00', '7,650.00'],
    ],
    note: 'The tax shows as CGST 3,825.00 and SGST 3,825.00. The grand total is 50,150.00, written in words as fifty thousand one hundred and fifty rupees. For a single figure, the [GST calculator](/gst-calculator/) is quicker.',
  },
  {
    kind: 'prose',
    title: 'Sample terms and conditions you can adapt',
    body: [
      'The terms box is where a quotation earns its keep. Write terms that match how you actually work, and keep each one to a single sentence. The lines below are starting points, not legal drafting.',
      'If a job is large or unusual, ask a lawyer or your accountant to read the terms before you send them.',
    ],
    bullets: [
      '**Validity:** “Prices are valid until the date shown above. After that date, please ask for a fresh quotation.”',
      '**Taxes:** “GST is charged extra at the rate applicable on the date of invoice.”',
      '**Payment:** “50% advance with the order, balance before dispatch.”',
      '**Delivery:** “Delivery within 10 working days of receiving the advance, subject to stock.”',
      '**Changes:** “Any work outside the items listed will be quoted separately.”',
    ],
  },
  {
    kind: 'steps',
    title: 'From blank form to sent quotation',
    steps: [
      { title: 'Fill in the parties and dates', body: 'Enter your business details and the customer’s. Add a quotation number, the date and the valid-until date. The document is titled “Quotation”.' },
      { title: 'Price the lines', body: 'Add a row for each item with its HSN or SAC code, quantity, unit rate, discount % and GST %. Pick CGST + SGST, IGST or No GST. You can add up to 50 rows.' },
      { title: 'Write terms, then send', body: 'Add your terms and any notes, check the live preview, and use Print / Save as PDF. You can also download an Excel or Word file to edit further.' },
    ],
  },
  {
    kind: 'prose',
    title: 'After the customer accepts',
    body: [
      'Ask for the acceptance in writing: a signed copy, an email or a purchase order that quotes your number. That message is your proof of the agreed price.',
      'If you need an advance before starting, send a proforma with the same lines from the [proforma invoice generator](/proforma-invoice-generator/). When you deliver the goods or finish the service, raise the tax invoice with the [invoice generator](/invoice-generator/).',
      'This page does not carry details across to those tools, so keep the Excel or Word file and copy the lines from it.',
    ],
    aside: {
      title: 'Prefer a ready layout?',
      body: 'Download a [quotation format](/quotation-format/) to edit yourself. For work where the final cost may change, an [estimate format](/estimate-format/) is the better fit.',
    },
  },
  {
    kind: 'split',
    title: 'What the quotation maker does and does not do',
    left: {
      title: 'It does',
      items: [
        'Work out subtotal, discount, taxable value, GST and grand total',
        'Round the total to the nearest rupee if you switch that on',
        'Write the amount in words using lakh and crore',
        'Give you a printable page, an .xlsx file and a .docx file',
      ],
    },
    right: {
      title: 'It does not',
      items: [
        'Keep your quotation after the tab is closed or reloaded',
        'Take a logo. Place one in the downloaded Word or Excel file',
        'Quote in dollars or any currency except rupees',
        'Number your quotations for you or track which ones were accepted',
      ],
    },
  },
]

const faqs: FaqItem[] = [
  { q: 'Does the quotation maker cost anything?', a: 'No. It is free and needs no account. It runs in your browser and your details are not uploaded anywhere.' },
  { q: 'Should a quotation show GST?', a: 'If you are registered, it is good practice to show the taxable value and GST separately so the customer sees the full amount payable. If you are unregistered or under the composition scheme, choose **No GST** and quote a single price.' },
  { q: 'What is the difference between a quotation and an estimate?', a: 'A quotation is a fixed price offer for a defined scope, open until its validity date. An estimate is an approximate cost that may change once the work is measured or under way. Say clearly on the document which one you are giving.' },
  { q: 'How long should a business quotation stay valid?', a: 'There is no fixed rule. Many traders use 7 to 30 days, and less where material prices change quickly. Choose a period you can honour and enter it as the valid-until date.' },
  { q: 'Is a quotation a legal document?', a: 'On its own it is an offer. Once the customer accepts it in writing it can form part of your agreement, which is why the terms should be accurate. For high-value work, take legal advice on the wording.' },
  { q: 'Can I reuse the same items for the next customer?', a: 'Not on this page, because nothing is stored. Keep the Excel file as your master copy. If you quote and bill often, [LocalPOS](/features/sales-management-software/) keeps your items, prices and customers saved so you do not type them again.' },
]

export default function QuotationMakerPage() {
  return (
    <ResourcePage
      slug="quotation-maker"
      seoTitle="Quotation Maker: Free Online Quote with GST | LocalPOS"
      seoDescription="Free quotation maker for Indian businesses. Add items, discount, GST, validity and terms, then print, save as PDF or download the quote in Excel or Word."
      h1="Quotation Maker with GST, validity and terms"
      intro="Use this free quotation maker to price a job or an order, set how long the offer stays open and add your terms. It works as a quotation generator in your browser, with the document ready to print or download."
      points={['Valid-until date', 'Terms and conditions', 'No sign-up']}
      toolTitle="Prepare your quotation"
      toolLead="Type on the left and watch the page build on the right."
      featureList={['Quotation with number, date and validity', 'Line items with discount and GST', 'Terms and conditions and notes', 'Automatic totals and amount in words', 'Print, PDF, Excel and Word output']}
      blocks={blocks}
      faqs={faqs}
      faqTitle="Quotation questions"
      related={['quotation-format', 'estimate-format', 'proforma-invoice-generator', 'invoice-generator']}
      cta={{ title: 'Quote from saved items and prices', text: 'With LocalPOS your products, rates and customers are already in the system, so pricing an order takes a few taps.' }}
    >
      <DocumentBuilder kind="quotation" />
    </ResourcePage>
  )
}
