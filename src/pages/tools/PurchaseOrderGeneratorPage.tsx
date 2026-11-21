import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { DocumentBuilder } from '@/components/tools/DocumentBuilder'
import type { FaqItem } from '@/lib/seo'

const blocks: Block[] = [
  {
    kind: 'prose',
    title: 'What a purchase order does',
    body: [
      'A purchase order, or PO, is the buyer’s written instruction to a supplier. It records three things: what was ordered, at what price, and by when it should arrive.',
      'Many small shops order by phone or WhatsApp, and that works until a carton turns up short or the bill shows a higher rate than the one agreed. A PO gives both sides one page to point to. When the supplier’s invoice arrives, you compare it with the order line by line.',
      'Unlike a sales bill, a PO is not a tax document. The supplier’s tax invoice is what supports your input tax credit, so the PO does not replace it.',
    ],
  },
  {
    kind: 'steps',
    title: 'From purchase order to payment',
    lead: 'The usual sequence in a trading or retail business.',
    steps: [
      { title: 'You issue the PO', body: 'Send the order to the supplier and ask them to confirm it. Keep a copy with its PO number.' },
      { title: 'The supplier dispatches', body: 'Goods arrive with the supplier’s invoice, and sometimes with a [delivery challan](/delivery-challan-format/) when the invoice follows later. Both should quote your PO number.' },
      { title: 'You receive and check', body: 'Count the goods against the PO and inspect the quality. Note shortages, damage and wrong items on the supplier’s copy before signing.' },
      { title: 'You pay', body: 'Pay as per the agreed terms once order, goods and invoice match. For rejected or short goods, a [debit note](/debit-note-format/) records the amount you are deducting.' },
    ],
  },
  {
    kind: 'defs',
    title: 'Fields in the purchase order generator',
    lead: 'On this form “your business” is the buyer, and the other party is the supplier.',
    items: [
      { term: 'Buyer details', desc: 'Your business name, address, GSTIN, phone and email. The supplier needs your GSTIN to bill you correctly.' },
      { term: 'Supplier details', desc: 'The supplier’s name, address, GSTIN and phone.' },
      { term: 'PO number and order date', desc: 'Your reference for the order. Use a simple series such as PO/26-27/041 and track it yourself, because the tool does not continue the series.' },
      { term: 'Expected delivery date', desc: 'The date by which you need the goods at your premises.' },
      { term: 'Deliver-to address', desc: 'The shop, godown or site where the goods should be unloaded, if it is not your main address.' },
      { term: 'Item rows', desc: 'Description, HSN or SAC code, quantity, unit rate, discount % and GST % for each line, up to 50 lines.' },
      { term: 'GST type', desc: 'CGST + SGST when the supplier is in your state, IGST when they are in another state, or No GST when the supplier is unregistered or under composition.' },
      { term: 'Payment terms', desc: 'How and when you will pay, for example “30 days from receipt of goods”.' },
    ],
  },
  {
    kind: 'table',
    title: 'Terms worth writing on a PO',
    lead: 'Type these in the terms and conditions box. Adjust the wording to what you have agreed with the supplier.',
    head: ['Term', 'What to settle', 'Sample wording'],
    rows: [
      ['Delivery', 'Date, place and who pays freight', 'Deliver to our godown by the date above. Freight to be paid by supplier.'],
      ['Quality', 'Brand, grade, batch or expiry', 'Goods must match the approved sample and have at least 9 months of shelf life.'],
      ['Rejection', 'What happens to defective goods', 'Damaged or incorrect goods will be returned at the supplier’s cost within 7 days.'],
      ['Payment', 'Credit period and mode', 'Payment by bank transfer within 30 days of receiving goods and a correct tax invoice.'],
      ['Price', 'Whether the rate is fixed', 'Rates are firm for this order. No increase will be accepted without a revised PO.'],
    ],
  },
  {
    kind: 'cards',
    title: 'Where a written order earns its place',
    items: [
      { icon: 'boxes', title: 'Stocking up for a season', body: 'A garment shop in Surat ordering festival stock from four suppliers can see every commitment and its delivery date.' },
      { icon: 'scale', title: 'Settling a rate dispute', body: 'When the bill shows ₹52 a piece and you agreed ₹48, the PO settles it without a long call.' },
      { icon: 'users', title: 'When staff place orders', body: 'The owner approves one page, and the person at the receiving counter knows what should arrive.' },
    ],
  },
  {
    kind: 'split',
    title: 'What you can expect from this free tool',
    left: {
      title: 'What it handles',
      items: [
        'A preview of the order that refreshes with every keystroke',
        'Line totals, discount, taxable value, tax and grand total',
        'Optional rounding to the nearest rupee, and the amount in words',
        'Output through Print / Save as PDF, an Excel sheet or a Word document',
      ],
    },
    right: {
      title: 'What it cannot do',
      items: [
        'Store the order. Closing or reloading the page clears the form',
        'Add your logo. Do that in the downloaded Word or Excel file',
        'Work in a currency other than rupees',
        'Track which orders were received, or update your stock',
      ],
    },
  },
]

const faqs: FaqItem[] = [
  { q: 'Is the purchase order generator free?', a: 'Yes. There is no charge and no sign-up. It runs in your browser and the details you type are not uploaded.' },
  { q: 'Is a purchase order legally binding?', a: 'A PO is an offer to buy. Once the supplier accepts it, by confirming or by supplying against it, it generally works as an agreement on the terms written in it. For large orders, have the terms reviewed by a lawyer.' },
  { q: 'Do I need to show GST on a PO?', a: 'It is not a tax document, but showing the expected GST helps you see the full cost and helps the supplier bill you under the right tax head. The tax that counts is the one on the supplier’s invoice.' },
  { q: 'What is the difference between a PO and a work order?', a: 'A purchase order is usually for goods at a quantity and rate. A work order instructs someone to carry out a job, such as fabrication, repair or installation, and describes the work and timeline. See the [work order format](/work-order-format/) for that.' },
  { q: 'Can I change a PO after sending it?', a: 'Yes, if the supplier agrees. Issue a revised order with the same PO number and a revision mark such as “Rev 1”, and ask the supplier to confirm it, so that only one version is in force.' },
  { q: 'How do I keep track of many open orders?', a: 'This PO generator makes one document at a time and remembers none of them. When you have several suppliers and regular orders, [purchase management in LocalPOS](/features/purchase-management-software/) records purchases against suppliers and adds the received stock to inventory.' },
]

export default function PurchaseOrderGeneratorPage() {
  return (
    <ResourcePage
      slug="purchase-order-generator"
      seoTitle="Purchase Order Generator: Free PO Maker Online | LocalPOS"
      seoDescription="Free purchase order generator for Indian businesses. List items, rates, GST, delivery date and payment terms, then print, save as PDF or get Excel or Word."
      h1="Purchase Order Generator for supplier orders"
      intro="Use this free purchase order generator to put a supplier order in writing: items, quantities, agreed rates, GST, the delivery date and your payment terms. Print the PO, save it as a PDF, or download it in Excel or Word."
      points={['Delivery date and address', 'GST and totals worked out', 'PDF, Excel and Word']}
      toolTitle="Write your PO"
      toolLead="Your business is the buyer. The supplier is the other party."
      featureList={['Purchase order with PO number and dates', 'Deliver-to address and payment terms', 'Line items with HSN/SAC, discount and GST', 'Automatic totals and amount in words', 'Print, PDF, Excel and Word output']}
      blocks={blocks}
      faqs={faqs}
      faqTitle="Purchase order questions"
      related={['delivery-challan-format', 'debit-note-format', 'work-order-format', 'invoice-generator']}
      cta={{ title: 'Keep purchases and stock in step', text: 'LocalPOS records what you buy from each supplier and updates your stock, so you know what has arrived and what is still due.' }}
    >
      <DocumentBuilder kind="purchase-order" />
    </ResourcePage>
  )
}
