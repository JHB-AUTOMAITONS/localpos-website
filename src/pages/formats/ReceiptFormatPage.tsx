import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { TemplateViewer } from '@/components/templates/TemplateViewer'
import type { TemplateDoc } from '@/components/templates/types'
import type { FaqItem } from '@/lib/seo'

const templates: TemplateDoc[] = [
  {
    id: 'payment',
    name: 'Payment receipt',
    description: 'A money receipt for payment received against an invoice. Shows what was billed, what has been paid so far and the balance still due.',
    fileName: 'payment-receipt-format',
    blocks: [
      { t: 'title', text: 'Payment Receipt' },
      { t: 'org', name: 'Sai Krupa Furniture Works', lines: ['Plot 9, Gokul Road, Hubballi, Karnataka 580030', 'GSTIN: 29ABCDE1234F1Z5 · Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { rows: [['Receipt no.', 'RCT/26-27/0193'], ['Date', '20 Nov 2026']] },
          { rows: [['Payment mode', 'NEFT'], ['Reference', 'UTR 000000000000']] },
        ],
      },
      {
        t: 'pairs',
        cols: [
          {
            rows: [
              ['Received from', 'Hotel Green Park, Station Road, Hubballi'],
              ['Amount (₹)', '35,000.00'],
              ['Amount in words', 'Rupees Thirty Five Thousand Only'],
              ['Towards', 'Part payment of invoice SKF/26-27/0318 dated 5 Nov 2026'],
            ],
          },
        ],
      },
      {
        t: 'table',
        head: ['Account summary', 'Amount (₹)'],
        align: ['l', 'r'],
        keep: [0],
        rows: [
          ['Invoice amount', '82,600.00'],
          ['Less: received earlier', '20,000.00'],
          ['Less: received now', '35,000.00'],
          { total: ['Balance due', '27,600.00'] },
        ],
      },
      { t: 'text', label: 'Note', text: 'Payments by cheque are subject to realisation.', keep: true },
      { t: 'sign', labels: ['Received by (name and signature)'] },
    ],
  },
  {
    id: 'rent',
    name: 'Rent receipt',
    description: 'Given by a landlord to a tenant for each month’s rent, for a house, shop or office. Tenants often need one receipt per month for their records.',
    fileName: 'rent-receipt-format',
    blocks: [
      { t: 'title', text: 'Rent Receipt' },
      { t: 'org', name: 'Mrs. Sunita Deshpande', lines: ['Landlord · 27 Prabhat Road, Pune, Maharashtra 411004', 'PAN: ABCDE1234F · Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { rows: [['Receipt no.', '08'], ['Date', '5 Nov 2026']] },
          { rows: [['Rent for', 'November 2026'], ['Payment mode', 'UPI'], ['Reference', 'UPI ref. 000000000000']] },
        ],
      },
      {
        t: 'pairs',
        cols: [
          {
            rows: [
              ['Received from', 'Mr. Arjun Nair (tenant)'],
              ['Amount (₹)', '18,000.00'],
              ['Amount in words', 'Rupees Eighteen Thousand Only'],
              ['Towards', 'Rent of Flat 3B, Shanti Kunj, Kothrud, Pune 411038'],
              ['Balance', 'Nil'],
            ],
          },
        ],
      },
      { t: 'text', label: 'Note', text: 'Maintenance and electricity charges are not included in the above amount.', keep: true },
      { t: 'sign', labels: ['Landlord’s signature'] },
    ],
  },
  {
    id: 'advance',
    name: 'Advance receipt',
    description: 'For a booking amount, deposit or advance taken before the goods are delivered or the work is done. States the order value and what remains to be paid.',
    fileName: 'advance-receipt-format',
    blocks: [
      { t: 'title', text: 'Advance Receipt' },
      { t: 'org', name: 'Royal Caterers and Events', lines: ['Hazratganj, Lucknow, Uttar Pradesh 226001', 'Phone: 98765 43210 · Email: bookings@example.com'] },
      {
        t: 'pairs',
        cols: [
          { rows: [['Receipt no.', 'ADV/2026/064'], ['Date', '21 Nov 2026']] },
          { rows: [['Payment mode', 'Cheque'], ['Reference', 'Cheque no. 000123 dated 21 Nov 2026']] },
        ],
      },
      {
        t: 'pairs',
        cols: [
          {
            rows: [
              ['Received from', 'Mr. Imran Qureshi, Gomti Nagar, Lucknow'],
              ['Amount (₹)', '60,000.00'],
              ['Amount in words', 'Rupees Sixty Thousand Only'],
              ['Towards', 'Advance for wedding catering for 400 guests on 12 Dec 2026'],
            ],
          },
        ],
      },
      {
        t: 'table',
        head: ['Order summary', 'Amount (₹)'],
        align: ['l', 'r'],
        keep: [0],
        rows: [
          ['Agreed order value', '2,40,000.00'],
          ['Less: advance received', '60,000.00'],
          { total: ['Balance payable', '1,80,000.00'] },
        ],
      },
      { t: 'text', label: 'Terms', text: 'The advance will be adjusted in the final bill. Cancellation and refund are as per the booking terms agreed with the customer.', keep: true },
      { t: 'sign', labels: ['Customer’s signature', 'Received by'] },
    ],
  },
]

const blocks: Block[] = [
  {
    kind: 'cards',
    title: 'Three receipts, three situations',
    items: [
      { icon: 'banknote', title: 'Payment receipt', body: 'A customer pays an invoice in full or in part. The receipt names the invoice and shows the balance, so both ledgers agree.' },
      { icon: 'building', title: 'Rent receipt', body: 'A tenant pays the month’s rent. The landlord signs a receipt naming the property and the month covered.' },
      { icon: 'wallet', title: 'Advance or deposit', body: 'Money is taken before delivery: a booking amount, a tailoring or furniture order, an event, a security deposit.' },
    ],
  },
  {
    kind: 'defs',
    title: 'What each field in the receipt format records',
    lead: 'A receipt answers five questions: who paid, how much, when, how and for what.',
    items: [
      { term: 'Receipt no.', desc: 'A running number from your receipt book or file. Keep it separate from your invoice series.' },
      { term: 'Date', desc: 'The day the money reached you. For a cheque, this is the day you were handed the cheque, with a note that it is subject to realisation.' },
      { term: 'Received from', desc: 'The payer’s name. If someone pays on behalf of a customer, write both names.' },
      { term: 'Amount and amount in words', desc: 'The figure and the same amount written out. The words make the figure much harder to alter afterwards.' },
      { term: 'Payment mode', desc: 'Cash, UPI, card, cheque, NEFT, RTGS or IMPS.' },
      { term: 'Reference', desc: 'The UPI reference, UTR number or cheque number and bank. It lets either side find the entry in a bank statement.' },
      { term: 'Towards', desc: 'What the payment is for: an invoice number, a month’s rent, an advance for a named order.' },
      { term: 'Balance', desc: 'What remains due after this payment. Write “Nil” when the account is settled.' },
      { term: 'Received by', desc: 'The name and signature of the person who took the money, with the shop stamp if you use one.' },
    ],
  },
  {
    kind: 'table',
    title: 'Receipt and invoice: how they differ',
    head: ['Point', 'Invoice', 'Receipt'],
    rows: [
      ['What it proves', 'Goods or services were sold and an amount is due', 'Money was received'],
      ['When it is issued', 'At the time of sale or supply', 'When payment arrives'],
      ['Main contents', 'Items, rates, tax and total', 'Payer, amount, mode and purpose'],
      ['Who needs it', 'The buyer, to know what to pay', 'The payer, as proof of payment'],
      ['One sale can have', 'One invoice', 'Several receipts, one per instalment'],
    ],
    note: 'A counter bill marked “Paid” does both jobs for a cash sale. A separate receipt matters when payment comes later or in parts. For the bill itself, see the [invoice formats](/invoice-formats/).',
  },
  {
    kind: 'prose',
    title: 'Points to settle before you sign',
    body: [
      '**Revenue stamp.** A one-rupee revenue stamp is commonly affixed and signed across on receipts for cash above ₹5,000. Practice and stamp rules differ between states and by mode of payment, so confirm what applies locally.',
      '**Advances under GST.** A GST-registered business that takes an advance is expected to issue a receipt voucher with details set out in the GST rules, and the tax treatment of advances is not the same for goods and for services. Ask your chartered accountant how it applies to you.',
      '**Part payments.** Give a new receipt for every instalment and carry the balance forward on each one. If dues are piling up, read [how to collect pending payments from customers](/blog/how-to-collect-pending-payments-from-customers/).',
    ],
    bullets: [
      'Never issue a receipt before the money is in hand or in the bank.',
      'Keep a copy of every receipt, in a duplicate book or as a saved file.',
      'Do not overwrite an amount. Cancel the receipt and write a new one.',
    ],
  },
  {
    kind: 'steps',
    title: 'From blank page to signed receipt',
    steps: [
      { title: 'Choose the layout', body: 'Pick the payment, rent or advance version above and switch to **Blank**.' },
      { title: 'Download or print', body: 'Take the Word or Excel file and add your name and address once, or print blank copies to fill by hand. For a PDF, print and choose “Save as PDF”.' },
      { title: 'Fill, sign and hand over', body: 'Enter the payer, amount, mode and purpose. Sign it, give the original to the payer and keep your copy.' },
    ],
  },
  {
    kind: 'prose',
    title: 'Faster ways to issue receipts',
    body: [
      'To type the details and get a finished receipt with the amount in words written for you, use the free [receipt maker](/receipt-maker/). It runs in your browser, needs no sign-up and uploads nothing.',
      'A shop that sells on credit needs more than single receipts: it needs to know who still owes what. [LocalPOS payment management](/features/payment-management-software/) records each payment against the customer’s bill and keeps the outstanding balance current.',
    ],
  },
]

const faqs: FaqItem[] = [
  { q: 'Is a payment receipt format different from a money receipt format?', a: 'No. Both names are used for the same document: a signed acknowledgement that a stated amount was received. “Money receipt” is the older term and is still widely used.' },
  { q: 'Is a revenue stamp needed on a receipt?', a: 'A revenue stamp is commonly affixed on cash receipts above ₹5,000. The requirement can differ by state and by how the payment was made, so confirm locally or with your accountant.' },
  { q: 'Can I give a receipt for a UPI or bank transfer?', a: 'Yes. Write the mode and the transaction reference on the receipt. Check that the money shows in your account before you sign.' },
  { q: 'Does a rent receipt need the landlord’s PAN?', a: 'The receipt itself has no fixed legal layout. Employers often ask salaried tenants for the landlord’s PAN when the rent is above a limit set by the income tax rules, so many landlords print it. The tenant should check the current limit with their employer or tax adviser.' },
  { q: 'Can I download these receipts in Word and Excel?', a: 'Yes. Each of the three layouts downloads as a Word document (.docx) and an Excel workbook (.xlsx), with sample values or blank.' },
  { q: 'What if I make a mistake on a receipt I have already given?', a: 'Take back the original if you can, mark both copies “Cancelled” and issue a fresh receipt with a new number. Keep the cancelled copies in your file.' },
]

export default function ReceiptFormatPage() {
  return (
    <ResourcePage
      slug="receipt-format"
      seoTitle="Receipt Format: Payment, Rent and Advance | LocalPOS"
      seoDescription="Free receipt format for payments, rent and advances, with amount in words, payment mode and balance. Download in Word or Excel, or print a blank copy."
      h1="Receipt format for payment, rent and advance"
      intro="Choose a receipt format for the money you have received: a payment against an invoice, a month’s rent or an advance. Each one is shown filled in and is free to download or print."
      points={['Payment, rent and advance', 'Word, Excel and print', 'Sample or blank']}
      toolTitle="Receipt templates"
      toolLead="Pick the kind of receipt on the tabs."
      blocks={blocks}
      faqs={faqs}
      faqTitle="Receipt questions"
      related={['receipt-maker', 'invoice-formats', 'bill-book-format', 'credit-note-format']}
      relatedTitle="Related tools and formats"
      cta={{ title: 'Know who has paid and who has not', text: 'LocalPOS records cash, UPI and card payments against each bill and shows every customer’s pending balance in one place.' }}
    >
      <TemplateViewer templates={templates} />
    </ResourcePage>
  )
}
