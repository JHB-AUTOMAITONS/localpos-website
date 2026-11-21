import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { ReceiptMaker } from '@/components/tools/ReceiptMaker'
import type { FaqItem } from '@/lib/seo'

const blocks: Block[] = [
  {
    kind: 'table',
    title: 'Receipt and invoice: the difference',
    lead: 'An invoice asks for payment. A receipt confirms that payment was made.',
    head: ['', 'Invoice', 'Receipt'],
    rows: [
      ['Says', 'You owe this amount', 'This amount has been received'],
      ['Issued', 'When goods or services are supplied', 'When money changes hands'],
      ['Lists', 'Items, rates and tax', 'Amount, date, method and purpose'],
      ['Matters to the payer because', 'It shows what was bought and the tax charged', 'It proves the payment'],
    ],
    note: 'Need the bill itself? Make it with the [invoice generator](/invoice-generator/), then issue a receipt each time the customer pays against it.',
  },
  {
    kind: 'cards',
    title: 'When to give a receipt',
    items: [
      { icon: 'banknote', title: 'Advance', body: 'A customer pays a booking amount before the order is ready. The receipt records it until the final bill is made.' },
      { icon: 'percent', title: 'Part payment', body: 'An invoice is paid in instalments. Each receipt shows what came in and the balance still due.' },
      { icon: 'building', title: 'Rent', body: 'A landlord acknowledges the month’s rent, with the period and the property written in the “towards” line.' },
      { icon: 'book', title: 'Fees', body: 'Coaching classes, clinics and consultants acknowledge fees paid for a term, a visit or a session.' },
      { icon: 'handshake', title: 'Contributions', body: 'A society, association or committee acknowledges a contribution or subscription from a member.' },
      { icon: 'check', title: 'Final settlement', body: 'The last payment on an account, with the balance due shown as nil.' },
    ],
  },
  {
    kind: 'defs',
    title: 'What to write for each payment method',
    lead: 'Pick the method from the list, then use the payment reference box so the entry can be traced later.',
    items: [
      { term: 'Cash', desc: 'No reference is needed. Make sure the “received by” name is filled in, since the receipt is the only record the payer has.' },
      { term: 'UPI', desc: 'Enter the UPI reference or transaction number shown in the payment app.' },
      { term: 'Card', desc: 'Write the approval code or the slip number from the card machine. Do not write the full card number.' },
      { term: 'Bank transfer', desc: 'Enter the UTR or reference number of the NEFT, RTGS or IMPS transfer.' },
      { term: 'Cheque', desc: 'Write the cheque number, bank and cheque date. You may add “subject to realisation” in the description, as the money arrives only when the cheque clears.' },
      { term: 'Other', desc: 'For a demand draft, wallet or adjustment, describe the mode and its number in the reference box.' },
    ],
  },
  {
    kind: 'steps',
    title: 'How the receipt maker works',
    lead: 'There are no item rows here. A receipt is about one payment.',
    steps: [
      { title: 'Enter who received and who paid', body: 'Fill in your business name, address and phone. GSTIN is optional. Then type the payer’s name under “received from”, with their address or phone if you want it shown.' },
      { title: 'Record the payment', body: 'Add the receipt number, payment date and amount. The amount in words is written for you. Choose the payment method and enter its reference.' },
      { title: 'Say what it was for', body: 'Use the “towards” line, for example “against invoice no. 118” or “advance for sofa order”. Add the balance due if any, and the name of the person who received the money.' },
      { title: 'Print or download', body: 'Use Print / Save as PDF from the browser, or download the receipt as an Excel or Word file.' },
    ],
  },
  {
    kind: 'prose',
    title: 'Part payments and the balance due',
    body: [
      'Suppose Meera Furnishings has billed a customer ₹38,500 and the customer pays ₹15,000 by UPI. The receipt shows ₹15,000 received, “towards: part payment against invoice no. 118”, and a balance due of ₹23,500.',
      'The balance is a figure you type. The tool does not look up the invoice or subtract earlier payments, so work it out from your own records before filling it in.',
      'Showing the balance on every receipt is a polite reminder in itself. For customers who still delay, see our guide on [how to collect pending payments](/blog/how-to-collect-pending-payments-from-customers/).',
    ],
    aside: {
      title: 'Amounts in words',
      body: 'Words follow Indian numbering. ₹1,25,000 is written as one lakh twenty-five thousand, not one hundred and twenty-five thousand.',
    },
  },
  {
    kind: 'note',
    title: 'Know the limits before you rely on it',
    body: 'This page is free, needs no sign-up and uploads nothing. It also saves nothing: reload or close it and the receipt is gone, so download a copy each time. It works in rupees only, has no logo upload (add one in the Word or Excel file), and does not continue your receipt numbers or keep a record of who has paid. A receipt made here is a simple acknowledgement of money received. Whether a payment qualifies for any tax benefit depends on the law and on the documents it requires, so check with a chartered accountant.',
  },
]

const faqs: FaqItem[] = [
  { q: 'Is a receipt the same as a bill?', a: 'No. A bill or invoice states what the customer has to pay. A receipt is given after payment and confirms the amount, the date and the method. Many shops give both for one sale.' },
  { q: 'Do I need a GSTIN to issue a receipt?', a: 'No. The GSTIN box is optional. An unregistered business, a landlord or an individual can leave it empty.' },
  { q: 'Can I use this as a rent receipt?', a: 'You can record rent received with it: put the tenant under “received from” and write the month and the property in the “towards” line. Whether it meets an employer’s or the tax department’s requirements for a claim is a separate question to confirm with an accountant.' },
  { q: 'Should a cash receipt carry a revenue stamp?', a: 'Stamp law has traditionally asked for a one rupee revenue stamp on receipts above ₹5,000, and many businesses still affix one on cash receipts. Practice and state rules vary, so confirm what applies to you. If needed, stick the stamp on the printed copy and sign across it.' },
  { q: 'Is a receipt without a signature acceptable?', a: 'A signature or stamp of the person who took the money makes a receipt far more convincing. The tool prints the “received by” name. Sign the printout, or add a signature image in the Word file.' },
  { q: 'Is there a ready receipt layout I can download instead?', a: 'Yes. The [receipt format](/receipt-format/) page has samples to edit in Excel or Word. And if you take payments all day, [LocalPOS](/features/payment-management-software/) records each payment against the customer’s bill, so balances stay current without manual sums.' },
]

export default function ReceiptMakerPage() {
  return (
    <ResourcePage
      slug="receipt-maker"
      seoTitle="Receipt Maker: Free Payment Receipt Online | LocalPOS"
      seoDescription="Free receipt maker for India. Enter the payer, amount, payment method and reference, get the amount in words, then print, save as PDF or use Excel or Word."
      h1="Receipt Maker for cash, UPI and cheque payments"
      intro="This free receipt maker creates a payment receipt with the payer’s name, the amount in figures and words, the payment method and what the money was for. Print it or download it in a minute."
      points={['Amount in words', 'Cash, UPI, card, cheque', 'Balance due optional']}
      toolTitle="Make a payment receipt"
      toolLead="Fill in the payment details and check the preview."
      featureList={['Payment receipt with receipt number and date', 'Amount in words in Indian numbering', 'Payment method and reference', 'Optional balance due', 'Print, PDF, Excel and Word output']}
      blocks={blocks}
      faqs={faqs}
      faqTitle="Receipt questions"
      related={['receipt-format', 'invoice-generator', 'bill-book-format', 'credit-note-format']}
      cta={{ title: 'Know who has paid and who has not', text: 'LocalPOS records every payment against the customer’s bill and shows the balance outstanding at any time.' }}
    >
      <ReceiptMaker />
    </ResourcePage>
  )
}
