import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { GstCalculator } from '@/components/tools/GstCalculator'
import type { FaqItem } from '@/lib/seo'

const blocks: Block[] = [
  {
    kind: 'steps',
    title: 'How to use the GST calculator',
    steps: [
      { title: 'Choose add or remove', body: 'Pick **Add GST** when your price is before tax. Pick **Remove GST** when you have a final price, such as an MRP, and want to know the tax inside it.' },
      { title: 'Enter the amount', body: 'Type the amount in rupees. Decimals are fine, for example 1499.50.' },
      { title: 'Select the rate', body: 'Tap a common rate or type any other rate. The rate depends on the HSN or SAC code of what you sell.' },
      { title: 'Pick the buyer’s location', body: 'Same state shows CGST and SGST. Another state shows IGST. The total tax is the same either way.' },
    ],
  },
  {
    kind: 'table',
    title: 'GST calculation examples',
    lead: 'Five worked examples, each checked against the formulas below. Amounts are in rupees.',
    head: ['Example', 'Amount entered', 'Before GST', 'GST', 'Including GST'],
    rows: [
      ['Add 5% to a wholesale price', '2,000.00', '2,000.00', '100.00', '2,100.00'],
      ['Add 18% to a service fee', '1,000.00', '1,000.00', '180.00', '1,180.00'],
      ['Remove 18% from a bill total', '1,180.00', '1,000.00', '180.00', '1,180.00'],
      ['Remove 5% from an MRP', '500.00', '476.19', '23.81', '500.00'],
      ['Remove 3% from a jewellery bill', '61,800.00', '60,000.00', '1,800.00', '61,800.00'],
    ],
    note: 'In the fourth example the tax splits into CGST 11.91 and SGST 11.90 for a sale within one state. The two halves always add up to the total GST.',
  },
  {
    kind: 'prose',
    title: 'GST exclusive and GST inclusive: the two formulas',
    body: [
      'A **GST exclusive** price does not contain tax yet. To add it, multiply the price by the rate and divide by 100. At 18%, a price of ₹1,000 carries ₹180 of GST and the customer pays ₹1,180.',
      'A **GST inclusive** price already contains the tax. To find the price before tax, multiply the inclusive amount by 100 and divide by 100 plus the rate. For ₹1,180 at 18% that is 1,180 × 100 ÷ 118 = ₹1,000, so the tax inside the price is ₹180.',
      'The common mistake is to take 18% of the inclusive price. 18% of ₹1,180 is ₹212.40, which is too much, because the 18% was charged on ₹1,000 and not on ₹1,180.',
    ],
    aside: {
      title: 'Selling at MRP?',
      body: 'An MRP printed on a pack is inclusive of all taxes. Use **Remove GST** to find the taxable value you should show on the invoice.',
    },
  },
  {
    kind: 'defs',
    title: 'CGST, SGST and IGST in plain words',
    lead: 'GST is one tax, but the invoice shows it under different heads depending on where the buyer is.',
    items: [
      { term: 'CGST', desc: 'Central GST. Half of the tax on a sale within one state, paid to the central government.' },
      { term: 'SGST', desc: 'State GST. The other half on a sale within one state, paid to that state. In a union territory without a legislature this half is called UTGST.' },
      { term: 'IGST', desc: 'Integrated GST. The whole tax on a sale from one state to another, and on imports. The rate equals CGST plus SGST.' },
      { term: 'Taxable value', desc: 'The price after discount and before GST. Tax is always worked out on this figure.' },
      { term: 'Place of supply', desc: 'The state where the supply is treated as made. It decides whether you charge CGST and SGST, or IGST.' },
    ],
  },
  {
    kind: 'prose',
    title: 'Which GST rate should you use?',
    body: [
      'The rate is set for each product and service by its HSN or SAC code, not by the type of shop. After the GST Council’s changes that took effect on 22 September 2025, most goods and services are taxed at 5% or 18%, with 40% on a short list of luxury and sin goods.',
      'The calculator still offers 12% and 28% because you may need them for older invoices, credit notes and returns raised under the earlier slabs. Any other rate can be typed in.',
    ],
    bullets: [
      '**0.25% and 3%** apply to specific items such as rough diamonds (0.25%) and gold, silver and jewellery (3%).',
      '**Exempt and nil-rated items** carry no GST. Enter 0 as the rate, or simply leave the tax out.',
      '**Composition dealers** do not charge GST on their bills, so they have no tax to add for the customer.',
      'Rates are revised from time to time. Confirm the rate for your item on the official GST portal or with your accountant.',
    ],
  },
  {
    kind: 'cards',
    title: 'When a quick GST calculation helps',
    items: [
      { icon: 'tag', title: 'Setting a selling price', body: 'Work back from the MRP you want to the taxable value and your margin.' },
      { icon: 'file', title: 'Preparing a quotation', body: 'Show the customer the price before tax, the GST and the final amount. The [quotation maker](/quotation-maker/) lays it out for you.' },
      { icon: 'search', title: 'Checking a supplier bill', body: 'Confirm that the tax charged matches the taxable value and the rate on the bill.' },
      { icon: 'truck', title: 'Selling to another state', body: 'See the IGST amount before you raise the invoice for an out-of-state buyer.' },
    ],
  },
  {
    kind: 'note',
    title: 'A calculator, not tax advice',
    body: 'This tool does the arithmetic for a rate you choose. It does not decide which rate, exemption or scheme applies to your business, and it does not account for cess. For filing and compliance questions, speak to a chartered accountant or GST practitioner.',
  },
]

const faqs: FaqItem[] = [
  { q: 'How do I calculate GST on an amount?', a: 'Multiply the amount before tax by the GST rate and divide by 100. For ₹2,500 at 5%, GST is 2,500 × 5 ÷ 100 = ₹125, and the total is ₹2,625.' },
  { q: 'How do I remove GST from an MRP or a total?', a: 'Multiply the inclusive amount by 100 and divide by 100 plus the rate. For ₹590 at 18%, the amount before GST is 590 × 100 ÷ 118 = ₹500 and the GST is ₹90.' },
  { q: 'Is the tax different for CGST plus SGST and for IGST?', a: 'No. The total is the same. Within one state it is shown as two equal halves, CGST and SGST. For a sale to another state the full amount is shown as IGST.' },
  { q: 'Can I use a rate that is not on the buttons?', a: 'Yes. Type any rate from 0 to 100 in the rate box, including decimals such as 0.1 or 1.5.' },
  { q: 'Does the calculator round the figures?', a: 'Each figure is rounded to the nearest paisa. When the tax is an odd number of paise, CGST takes the extra paisa so that the two halves still add up to the total GST.' },
  { q: 'Can I put these figures on an invoice?', a: 'Yes, as long as the rate is right for your item. To prepare the whole document, use the free [invoice generator](/invoice-generator/). For billing every day, [LocalPOS GST billing software](/features/gst-billing-software/) works out the tax on every line automatically.' },
]

export default function GstCalculatorPage() {
  return (
    <ResourcePage
      slug="gst-calculator"
      seoTitle="GST Calculator: Add or Remove GST Online | LocalPOS"
      seoDescription="Free GST calculator for India. Add GST to a price or remove it from an MRP at any rate, and see the CGST, SGST and IGST split with the working shown."
      h1="GST Calculator: add or remove GST from any amount"
      intro="Use this free GST calculator to add tax to a price or to find the tax inside an inclusive amount. It shows the CGST, SGST or IGST split and the working behind every figure."
      points={['Inclusive and exclusive', 'Any rate, including decimals', 'No sign-up']}
      toolTitle="Calculate GST"
      toolLead="Results update as you type."
      featureList={['Add GST to a tax-exclusive amount', 'Remove GST from a tax-inclusive amount', 'CGST, SGST and IGST breakdown', 'Custom GST rates']}
      blocks={blocks}
      faqs={faqs}
      faqTitle="GST calculation questions"
      related={['invoice-generator', 'invoice-formats', 'quotation-maker', 'proforma-invoice-generator']}
      cta={{ title: 'Let your billing software calculate GST for you', text: 'LocalPOS applies the right rate to every item, splits CGST, SGST and IGST by the customer’s state, and keeps the records ready for your returns.' }}
    >
      <GstCalculator />
    </ResourcePage>
  )
}
