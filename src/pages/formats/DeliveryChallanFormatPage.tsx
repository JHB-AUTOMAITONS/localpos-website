import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { TemplateViewer } from '@/components/templates/TemplateViewer'
import type { TemplateDoc } from '@/components/templates/types'
import type { FaqItem } from '@/lib/seo'

const templates: TemplateDoc[] = [
  {
    id: 'gst',
    name: 'Challan with GSTIN and value',
    description: 'For a GST-registered business moving goods that are not being sold at that moment. This sample sends parts to a job worker.',
    fileName: 'delivery-challan-format',
    blocks: [
      { t: 'title', text: 'Delivery Challan', sub: 'Original for consignee' },
      { t: 'org', name: 'Shakti Engineering Works', lines: ['Plot 27, Aji Industrial Area, Rajkot, Gujarat 360003', 'GSTIN: 24ABCDE1234F1Z5 · Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          {
            heading: 'Consignee (goods sent to)',
            rows: [['Name', 'Patel Powder Coating'], ['Address', 'Shed 9, Metoda GIDC, Rajkot, Gujarat 360021'], ['GSTIN', '24PQRSX5678K1Z3'], ['State', 'Gujarat (24)']],
          },
          {
            heading: 'Challan details',
            rows: [['Challan no.', 'DC/26-27/0156'], ['Date', '17 Nov 2026'], ['Reason for transport', 'Job work (powder coating)'], ['Expected return', '27 Nov 2026']],
          },
          {
            heading: 'Transport',
            rows: [['Vehicle no.', 'GJ 03 AB 1234'], ['Transporter', 'Jay Ambe Transport'], ['LR no.', '4521'], ['E-way bill no.', '0000 0000 0000']],
          },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Description of goods', 'HSN', 'Qty', 'Unit', 'Rate', 'Value'],
        align: ['c', 'l', 'c', 'r', 'c', 'r', 'r'],
        rows: [
          ['1', 'MS mounting brackets, uncoated', '7326', '500', 'nos', '42.00', '21,000.00'],
          ['2', 'Steel hinges, uncoated', '8302', '300', 'nos', '35.00', '10,500.00'],
          ['3', 'Sheet metal covers, uncoated', '7326', '120', 'nos', '180.00', '21,600.00'],
        ],
        totals: [
          ['Total quantity', '920'],
          ['Total value of goods (₹)', '53,100.00'],
        ],
        blankRows: 8,
      },
      { t: 'text', label: 'Value in words', text: 'Rupees Fifty Three Thousand One Hundred Only' },
      { t: 'text', label: 'Declaration', text: 'The goods listed above are sent for job work and are not for sale. They remain the property of the consignor and are to be returned after processing. No tax is charged on this challan.', keep: true },
      { t: 'sign', labels: ['Received by (name, signature, date)', 'For Shakti Engineering Works (Authorised signatory)'] },
    ],
  },
  {
    id: 'simple',
    name: 'Simple delivery note',
    description: 'A short challan without values, for delivering goods that have already been billed. The receiver signs for the quantity.',
    fileName: 'simple-delivery-note',
    blocks: [
      { t: 'title', text: 'Delivery Challan' },
      { t: 'org', name: 'Annapurna Tiles & Sanitary', lines: ['88 Faizabad Road, Indira Nagar, Lucknow, Uttar Pradesh 226016', 'Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { heading: 'Deliver to', rows: [['Name', 'Mr. Alok Srivastava'], ['Site address', 'House 14, Sector C, Aliganj, Lucknow'], ['Phone', '91234 56780']] },
          { heading: 'Challan details', rows: [['Challan no.', '742'], ['Date', '20 Nov 2026'], ['Against invoice no.', 'ATS/1184 dated 19 Nov 2026'], ['Vehicle no.', 'UP 32 CD 5678']] },
        ],
      },
      {
        t: 'table',
        head: ['#', 'Description of goods', 'Qty', 'Unit', 'Remarks'],
        align: ['c', 'l', 'r', 'c', 'l'],
        rows: [
          ['1', 'Vitrified floor tiles, 600 × 600 mm', '45', 'box', 'Ivory, one batch'],
          ['2', 'Wall tiles, 300 × 450 mm', '30', 'box', ''],
          ['3', 'Tile adhesive, 20 kg', '12', 'bag', ''],
        ],
        totals: [['Total packages', '87']],
        blankRows: 8,
      },
      { t: 'text', label: 'Note', text: 'Please check the quantity and condition of the goods before signing. Breakage or shortage should be noted on this challan at the time of delivery.', keep: true },
      { t: 'sign', labels: ['Driver / delivered by', 'Received in good condition (name and signature)'] },
    ],
  },
]

const blocks: Block[] = [
  {
    kind: 'prose',
    title: 'What a delivery challan is',
    body: [
      'A delivery challan is the paper that travels with goods when they move from one place to another. It says what is in the vehicle, who sent it, who will receive it and why it is moving.',
      'It is not a bill. A tax invoice records a sale and charges tax. A challan records movement. Under GST, it is the document used when goods are transported in situations where a tax invoice is not issued at the time the goods leave.',
      'Many shops also use a challan as a plain delivery note alongside an invoice, so that the person receiving the goods can sign for the quantity. The second layout above is made for that.',
    ],
  },
  {
    kind: 'cards',
    title: 'When goods move on a challan and not a tax invoice',
    lead: 'These are the common situations. Each one has conditions, so treat the list as a guide and confirm your own case with a chartered accountant.',
    items: [
      { icon: 'refresh', title: 'Job work', body: 'Material sent to another unit for processing, such as coating, stitching or machining, and due to come back.' },
      { icon: 'handshake', title: 'Goods sent on approval', body: 'Stock sent for a customer to see and choose from. The invoice is raised for what the customer keeps.' },
      { icon: 'clock', title: 'Quantity not known at dispatch', body: 'The usual example is liquid gas, where the quantity supplied is measured only when it is unloaded.' },
      { icon: 'boxes', title: 'Transfer within the same GSTIN', body: 'Stock moved between your own shop and godown, or between branches that share one registration in a state.' },
      { icon: 'store', title: 'Exhibitions and fairs', body: 'Goods taken to a stall for display. What is sold there is invoiced, and the rest returns.' },
      { icon: 'truck', title: 'One order sent in several lots', body: 'When a consignment travels in parts, the invoice is raised first and the later lots carry a challan that refers to it.' },
    ],
  },
  {
    kind: 'defs',
    title: 'Fields in a delivery challan format',
    lead: 'The first layout above carries these fields. Drop the ones that do not apply to you, such as GSTIN for an unregistered business.',
    items: [
      { term: 'Challan number and date', desc: 'A serial number in one or more running series, unique for the financial year. Under the GST rules it should not be longer than 16 characters.' },
      { term: 'Consignor', desc: 'The sender: name, address and GSTIN, if registered. On the layouts here this is the business named at the top.' },
      { term: 'Consignee', desc: 'The receiver: name, address and GSTIN, if registered. For a transfer to your own godown, it is your own business at the other address.' },
      { term: 'Description and HSN', desc: 'What the goods are, with the HSN code of each item.' },
      { term: 'Quantity and unit', desc: 'How much is sent. Where the exact quantity is not known at dispatch, a provisional quantity is written.' },
      { term: 'Value', desc: 'The value of the goods. Where the movement is itself a supply to the consignee, the tax rate and tax amount are shown as well.' },
      { term: 'Reason for transport', desc: 'Job work, approval, stock transfer, exhibition or another reason, in a few clear words.' },
      { term: 'Vehicle, transporter and LR no.', desc: 'The vehicle number, the transport company and its lorry receipt number, which help trace the consignment.' },
      { term: 'Signatures', desc: 'The sender’s authorised signature, and the receiver’s name, signature and date when the goods arrive.' },
    ],
  },
  {
    kind: 'table',
    title: 'The three copies of a challan',
    lead: 'For goods, a challan is prepared in triplicate. Mark each copy at the top, as the sample does.',
    head: ['Copy', 'Marked as', 'Who keeps it'],
    rows: [
      ['Original', 'Original for consignee', 'The receiver of the goods'],
      ['Duplicate', 'Duplicate for transporter', 'The transporter, during the journey'],
      ['Triplicate', 'Triplicate for consignor', 'The sender, for the records'],
    ],
    note: 'To make the three copies from this page, change the line under the heading in the Word or Excel file and print each one, or print three and mark them by hand.',
  },
  {
    kind: 'prose',
    title: 'Challan, e-way bill and invoice',
    body: [
      'A challan does not replace an e-way bill. Depending on the value of the consignment and the distance it travels, an e-way bill may also be needed, and it is generated against the challan in place of an invoice. The limits and exemptions have changed over time and can differ by state, so check the current rule on the e-way bill portal or with your accountant.',
      'When goods sent on a challan are finally sold, for example when a customer keeps items sent on approval, a tax invoice is raised for that sale. You can download a layout from the [invoice formats](/invoice-formats/) page. If you are the buyer and want to put an order in writing before goods are sent to you, use the [purchase order generator](/purchase-order-generator/).',
      'Goods out on challan are still your stock, and they are easy to lose track of. A register of challans issued and goods returned is the minimum. [LocalPOS inventory management software](/features/inventory-management-software/) keeps stock counts current as you bill and purchase, which makes these checks quicker.',
    ],
  },
  {
    kind: 'note',
    title: 'Check the rule for your own case',
    body: 'This page explains the layout in general terms. Whether your movement of goods can go on a challan, what must be printed on it and whether an e-way bill is required depend on the GST rules in force and on your facts. Please confirm with a chartered accountant or GST practitioner before relying on it.',
  },
]

const faqs: FaqItem[] = [
  { q: 'Is a delivery challan the same as an invoice?', a: 'No. An invoice records a sale and shows the tax charged. A challan records the movement of goods and is used where no tax invoice is issued at the time of dispatch, or as a delivery note along with an invoice.' },
  { q: 'Is GST charged on a challan?', a: 'In the common cases, such as job work or a transfer within the same GSTIN, the movement is not a sale and no tax is charged on the challan. The value of the goods is still shown. Where the movement is a supply, the GST rules ask for the tax rate and amount as well. Confirm your case with your accountant.' },
  { q: 'Can I download the delivery challan template in Excel or Word?', a: 'Yes. Each layout downloads as an Excel workbook (.xlsx) and a Word document (.docx), filled with sample values or blank. For a PDF, print it and choose “Save as PDF”. It is free and nothing is uploaded.' },
  { q: 'How should challans be numbered?', a: 'Use a running series and do not skip or repeat numbers. A prefix for the series and the financial year, such as DC/26-27/0156, keeps challans apart from your invoice numbers.' },
  { q: 'Do I need an e-way bill when sending goods on a challan?', a: 'You may. The e-way bill requirement depends on the value of the consignment, the distance and the type of goods, not on whether the paper is an invoice or a challan. Check the current limits for your state.' },
  { q: 'Can an unregistered business use this challan format?', a: 'Yes. Leave out the GSTIN and HSN fields, or use the simple delivery note, which lists only the goods, quantities and the receiver’s signature.' },
]

export default function DeliveryChallanFormatPage() {
  return (
    <ResourcePage
      slug="delivery-challan-format"
      seoTitle="Delivery Challan Format in Excel and Word | LocalPOS"
      seoDescription="Free delivery challan format in Excel and Word, with GSTIN, HSN, quantity, value and transport details. Covers when a challan is used and the three copies."
      h1="Delivery challan format for goods sent without invoice"
      intro="This delivery challan format lists the consignor, consignee, goods, quantity, reason for transport and vehicle details on one page. View the filled sample, then download it or print a blank copy."
      points={['GSTIN and HSN fields', 'Excel, Word or print', 'Sample or blank']}
      toolTitle="Delivery challan templates"
      toolLead="Two layouts: one with GST details and values, one plain delivery note."
      blocks={blocks}
      faqs={faqs}
      faqTitle="Questions about challans"
      related={['invoice-formats', 'purchase-order-generator', 'work-order-format', 'debit-note-format']}
      relatedTitle="Related tools and formats"
      cta={{ title: 'Know where your stock is', text: 'LocalPOS updates stock on every sale and purchase, so what is on the shelf and what is in your records stay in step.' }}
    >
      <TemplateViewer templates={templates} />
    </ResourcePage>
  )
}
