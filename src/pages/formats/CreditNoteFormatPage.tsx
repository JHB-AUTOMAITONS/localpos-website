import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { TemplateViewer } from '@/components/templates/TemplateViewer'
import type { TemplateDoc } from '@/components/templates/types'
import type { FaqItem } from '@/lib/seo'

const templates: TemplateDoc[] = [
  {
    id: 'gst',
    name: 'GST credit note',
    description: 'Issued by a GST-registered supplier against an earlier tax invoice. The sample covers a sales return and a rate overcharged on the same invoice. The 5% rate is for illustration.',
    fileName: 'gst-credit-note-format',
    blocks: [
      { t: 'title', text: 'Credit Note' },
      { t: 'org', name: 'Venkateshwara Textiles', lines: ['118 Ring Road, Surat, Gujarat 395002', 'GSTIN: 24ABCDE1234F1Z6 · Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { heading: 'Issued to', rows: [['Name', 'Meera Fashion House'], ['Address', '32 Relief Road, Ahmedabad, Gujarat 380001'], ['GSTIN', '24PQRSX5678K1Z4']] },
          { heading: 'Credit note details', rows: [['Credit note no.', 'CN/26-27/0021'], ['Date', '24 Nov 2026'], ['Original invoice no.', 'VT/26-27/0876'], ['Original invoice date', '10 Nov 2026'], ['Place of supply', 'Gujarat (24)']] },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Description', 'HSN', 'Qty', 'Rate', 'Taxable value', 'GST %', 'GST', 'Total'],
        align: ['c', 'l', 'c', 'r', 'r', 'r', 'r', 'r', 'r'],
        rows: [
          ['1', 'Cotton saree, returned (weaving defect)', '5208', '6', '950.00', '5,700.00', '5%', '285.00', '5,985.00'],
          ['2', 'Dress material, rate reduced by 40.00 per piece', '5208', '50', '40.00', '2,000.00', '5%', '100.00', '2,100.00'],
        ],
        totals: [
          ['Taxable value', '7,700.00'],
          ['CGST', '192.50'],
          ['SGST', '192.50'],
          ['Total credit (₹)', '8,085.00'],
        ],
        blankRows: 6,
      },
      { t: 'text', label: 'Amount in words', text: 'Rupees Eight Thousand Eighty Five Only' },
      { t: 'text', label: 'Reason', text: 'Six sarees returned by the buyer on 22 Nov 2026 with a weaving defect. Dress material was billed at 420.00 per piece against the agreed rate of 380.00.' },
      { t: 'text', label: 'Note', text: 'Your account has been credited with the above amount.', keep: true },
      { t: 'sign', labels: ['For Venkateshwara Textiles (Authorised signatory)'] },
    ],
  },
  {
    id: 'simple',
    name: 'Simple credit note',
    description: 'For a shop that is not registered under GST, or for store credit given to a retail customer who returns goods. No tax columns.',
    fileName: 'simple-credit-note',
    blocks: [
      { t: 'title', text: 'Credit Note' },
      { t: 'org', name: 'Little Steps Footwear', lines: ['MG Road, Ernakulam, Kochi, Kerala 682016', 'Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { rows: [['Customer', 'Ms. Anjali Menon'], ['Phone', '98765 43210']] },
          { rows: [['Credit note no.', 'CN-118'], ['Date', '19 Nov 2026'], ['Original bill no.', '3172'], ['Original bill date', '16 Nov 2026']] },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Item returned', 'Qty', 'Rate', 'Amount'],
        align: ['c', 'l', 'r', 'r', 'r'],
        rows: [
          ['1', 'Ladies sandal, size 6 (size exchange not available)', '1', '1,299.00', '1,299.00'],
          ['2', 'School shoes, size 3 (sole defect)', '1', '899.00', '899.00'],
        ],
        totals: [['Total credit (₹)', '2,198.00']],
        blankRows: 5,
      },
      { t: 'text', label: 'Amount in words', text: 'Rupees Two Thousand One Hundred Ninety Eight Only' },
      { t: 'text', label: 'Terms', text: 'This credit can be used against any purchase at our shop within 90 days of the date above. It cannot be exchanged for cash.', keep: true },
      { t: 'sign', labels: ['Customer’s signature', 'For Little Steps Footwear'] },
    ],
  },
]

const blocks: Block[] = [
  {
    kind: 'prose',
    title: 'What a credit note does',
    body: [
      'An invoice, once issued, should not be rubbed out or rewritten. When the amount on it turns out to be too high, the seller issues a credit note. It tells the buyer: “you owe us this much less than the invoice said”.',
      'The note always points back to the original invoice by number and date. Together the two documents show the correct value of the sale. If the buyer has already paid, the credit is either refunded or set off against the next bill.',
      'The opposite case, where the invoice was too low, is handled with a debit note. The [debit note format](/debit-note-format/) page covers that document.',
    ],
  },
  {
    kind: 'cards',
    title: 'When a supplier issues one',
    items: [
      { icon: 'refresh', title: 'Sales return', body: 'The buyer sends back all or part of the goods: wrong item, wrong size, damaged in transit or simply unsold stock taken back by agreement.' },
      { icon: 'tag', title: 'Price reduced after the sale', body: 'A discount, rate difference or scheme is agreed after the invoice was raised.' },
      { icon: 'calculator', title: 'Invoice overcharged', body: 'A higher rate, a wrong quantity or a higher tax rate was billed by mistake.' },
      { icon: 'alert', title: 'Deficient goods or services', body: 'The goods are below the agreed quality, or the service was not fully delivered, and the buyer accepts a reduction in price.' },
    ],
  },
  {
    kind: 'defs',
    title: 'Fields in the GST credit note format',
    lead: 'The GST rules list the particulars a credit note must carry. They do not fix a layout, so any design with these details will do.',
    items: [
      { term: 'Supplier details', desc: 'Name, address and GSTIN of the business issuing the note.' },
      { term: 'Nature of the document', desc: 'The words “Credit Note” shown clearly at the top.' },
      { term: 'Serial number', desc: 'A consecutive number, unique for the financial year and no longer than 16 characters. Use a series of its own, apart from your invoices.' },
      { term: 'Date of issue', desc: 'The date the note is made out, which is on or after the invoice date.' },
      { term: 'Recipient details', desc: 'Name and address of the buyer, and their GSTIN if registered.' },
      { term: 'Original invoice', desc: 'Number and date of the tax invoice being corrected. One note may refer to more than one invoice.' },
      { term: 'Value and tax credited', desc: 'The taxable value being reduced, the rate of tax and the tax amount credited to the recipient.' },
      { term: 'Signature', desc: 'Signature or digital signature of the supplier or an authorised person.' },
    ],
  },
  {
    kind: 'prose',
    title: 'The effect on the buyer’s account',
    body: [
      'Take the sample above. Meera Fashion House was invoiced by Venkateshwara Textiles on 10 November. The note for ₹8,085.00 reduces what it owes on that invoice by the same amount. In the supplier’s books the customer’s balance comes down. In the buyer’s books the amount payable to the supplier comes down.',
      'Tax moves with the value. The supplier’s taxable sales fall by ₹7,700.00 and the tax by ₹385.00. A registered buyer who had claimed input tax credit on the original invoice generally has to reduce that credit by the tax shown on the note.',
      'A reason is not on the legal list of fields, but it is worth writing. Six months later, “rate difference as agreed on phone” explains an entry that a bare figure does not.',
    ],
    aside: {
      title: 'Financial and GST credit notes',
      body: 'Some suppliers give a discount after the sale through a note without GST, often called a financial or commercial credit note. Whether that route is open depends on the facts and the terms of the sale, so decide it with your accountant.',
    },
  },
  {
    kind: 'table',
    title: 'Credit note and debit note compared',
    head: ['Point', 'Credit note', 'Debit note'],
    rows: [
      ['Effect on invoice value', 'Reduces it', 'Increases it'],
      ['Typical trigger', 'Return, discount, overbilling', 'Underbilling, extra charges'],
      ['Buyer’s payable', 'Goes down', 'Goes up'],
      ['Supplier’s tax liability', 'Goes down', 'Goes up'],
      ['Issued under GST by', 'The supplier', 'The supplier'],
    ],
    note: 'In trade, a buyer returning goods often raises a debit note on the supplier. That is a commercial request. Under GST it is the supplier’s credit note that adjusts the tax.',
  },
  {
    kind: 'note',
    title: 'Time limits and returns',
    body: 'A GST-registered supplier reports credit notes in the GST returns, and the law sets a time limit after the end of the financial year for adjusting tax through them. The conditions have been amended more than once. This page explains the document and is not tax advice, so check the current position with a chartered accountant or GST practitioner before you issue a note for an old invoice.',
  },
  {
    kind: 'prose',
    title: 'Using these files',
    body: [
      'Both layouts download as Word and Excel files, with the sample values or blank, and can be printed or saved as a PDF from the print window. They are free, need no sign-up and nothing you open here is uploaded.',
      'Check the tax on a return with the [GST calculator](/gst-calculator/), and keep the corrected sale next to the original in your [invoice formats](/invoice-formats/) file. If returns are frequent, finding the original bill is half the job. [LocalPOS GST billing software](/features/gst-billing-software/) keeps every numbered invoice with its customer, items and tax, so the details you need for the note are a search away.',
    ],
  },
]

const faqs: FaqItem[] = [
  { q: 'Who issues a credit note, the buyer or the seller?', a: 'The seller. Under GST only the supplier of the goods or services can issue a credit note against a tax invoice. A buyer may send a debit note or a letter asking for one.' },
  { q: 'Can one credit note cover several invoices?', a: 'Yes. The GST rules allow a single note to refer to one or more tax invoices. List each invoice number and date so the buyer can match them.' },
  { q: 'Is this credit note template available in Excel and Word?', a: 'Yes. Use the Excel button for an .xlsx workbook or the Word button for a .docx document. Both are available with the sample values or blank.' },
  { q: 'Should I cancel the invoice or issue a credit note?', a: 'If the invoice has already gone to the buyer or into your returns, the usual route is a credit note, which leaves a clear trail. Practice on cancelling a fresh invoice varies, and e-invoices have their own rules, so ask your accountant.' },
  { q: 'Does a credit note mean a cash refund?', a: 'Not necessarily. It records that the buyer is owed a credit. The two sides then decide whether it is refunded, adjusted against unpaid invoices or used on a future purchase.' },
  { q: 'Can an unregistered shop give a credit note?', a: 'Yes. Any business can give a customer a note for returned goods. Use the simple layout without tax columns and state how long the credit stays valid.' },
]

export default function CreditNoteFormatPage() {
  return (
    <ResourcePage
      slug="credit-note-format"
      seoTitle="Credit Note Format in Excel and Word for GST | LocalPOS"
      seoDescription="Free credit note format for sales returns and price reductions, with and without GST. Download in Excel or Word and see every required field explained."
      h1="Credit note format for returns and price cuts"
      intro="Use this credit note format when an invoice needs to be reduced after it was issued, for a sales return, a discount or an overcharge. A GST layout and a simple layout are shown with sample values."
      points={['GST and simple layouts', 'Excel, Word and print', 'Sample or blank']}
      toolTitle="Credit note templates"
      blocks={blocks}
      faqs={faqs}
      faqTitle="Credit note questions"
      related={['debit-note-format', 'invoice-formats', 'gst-calculator', 'receipt-format']}
      relatedTitle="Related formats and tools"
      cta={{ title: 'Find the original invoice in seconds', text: 'LocalPOS stores every bill with its number, customer, items and GST, so a return or a rate correction starts from the right figures.' }}
    >
      <TemplateViewer templates={templates} />
    </ResourcePage>
  )
}
