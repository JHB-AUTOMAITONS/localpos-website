import { Seo } from '@/lib/head'
import { softwareSchema } from '@/lib/seo'
import type { FaqItem } from '@/lib/seo'
import { SITE } from '@/data/site'
import { FEATURE_META } from '@/data/featureMeta'
import { HeroSection } from '@/sections/HeroSection'
import { TrustStrip } from '@/sections/TrustStrip'
import { ComparisonSection, type ComparisonRow } from '@/sections/ComparisonSection'
import { ProductOverview } from '@/sections/ProductOverview'
import { FeatureGrid } from '@/sections/FeatureGrid'
import { SolutionsSection } from '@/sections/SolutionsSection'
import { HowItWorks } from '@/sections/HowItWorks'
import { TestimonialSection } from '@/sections/TestimonialSection'
import { FAQSection } from '@/sections/FAQSection'
import { CTASection } from '@/sections/CTASection'
import { CTAButton } from '@/components/ui/CTAButton'
import { Inline } from '@/components/Inline'
import { Reveal } from '@/components/ui/Reveal'

const TITLE = 'Billing Software with GST, POS & Stock Control | LocalPOS'
const DESCRIPTION =
  'LocalPOS is POS billing software for Indian shops. Create GST bills in seconds, scan barcodes, track stock and payments, and see daily sales. Book a free demo.'

const ROWS: ComparisonRow[] = [
  { topic: 'Bills', before: 'Handwritten bills, with tax worked out on a calculator.', after: 'GST invoices in seconds, with tax worked out for you.' },
  { topic: 'Stock', before: 'A register updated at the end of the day, if at all.', after: 'Stock that changes with every sale and purchase.' },
  { topic: 'Customers', before: 'Dues kept in a notebook and remembered from memory.', after: 'Every customer’s history and balance one tap away.' },
  { topic: 'Payments', before: 'Cash and UPI counted separately at night.', after: 'Daily collection by payment mode, ready at closing.' },
  { topic: 'Reports', before: 'A month-end spreadsheet that takes a weekend.', after: 'Sales and stock reports, live, whenever you ask.' },
]

const FAQS: FaqItem[] = [
  {
    q: 'What is POS billing software?',
    a: 'POS billing software is what you use at the counter to make a bill, take payment and record the sale. LocalPOS also updates stock, customer balances and GST records as you bill, so you do not need separate registers and spreadsheets.',
  },
  {
    q: 'What is billing software?',
    a: 'Billing software creates invoices, records payments and keeps a history of what you sold. Modern billing software like LocalPOS also tracks stock, customers and GST, so you do not need separate registers and spreadsheets.',
  },
  {
    q: 'Is LocalPOS GST billing software?',
    a: 'Yes. It creates GST invoices with your GSTIN, HSN codes and the correct CGST, SGST or IGST split, and keeps tax reports ready for your accountant.',
  },
  {
    q: 'Can POS software manage inventory?',
    a: 'Yes. In LocalPOS, stock goes down with every sale and up with every purchase, low-stock items are flagged, and you can see current stock levels at any time. Read more about [inventory management](/features/inventory-management-software/).',
  },
  {
    q: 'What is the difference between POS software and billing software?',
    a: 'POS software is what you use at the counter to sell and take payment. Billing software focuses on invoices and records. LocalPOS combines both: it works as POS billing software at the counter and as a full back office for stock, payments and reports.',
  },
  {
    q: 'Can I use it as retail billing software for my shop?',
    a: 'Yes. LocalPOS is built around retail counters, with fast item search, barcode scanning, discounts and automatic stock updates. It also has versions of the workflow for restaurants, jewellers, supermarkets and medical stores.',
  },
  {
    q: 'How does POS software help retail businesses?',
    a: 'At a retail counter, LocalPOS speeds up checkout with fast item search, barcode scanning and discounts, and updates stock after every sale. Customer records and daily sales reports sit in the same system. See how LocalPOS works for [retail shops](/solutions/retail-billing-software/).',
  },
  {
    q: 'Do I need special hardware?',
    a: 'No. A computer or tablet is enough to start. If you bill many items a day, a barcode scanner and a receipt printer make checkout faster, and you can add them whenever you like.',
  },
  {
    q: 'Can I manage more than one shop?',
    a: 'Yes. You can run several stores from one login, see each store’s sales and stock, compare them side by side and transfer stock between them.',
  },
  {
    q: 'How can I get a demo of LocalPOS?',
    a: '[Book a free demo](/book-a-demo/). Tell us what you sell and how you bill today, and we will show you LocalPOS with your kind of products, answer your questions and help you decide whether it fits your business.',
  },
]

export default function HomePage() {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/"
        faqs={FAQS}
        jsonLd={[
          softwareSchema({
            name: SITE.name,
            description: DESCRIPTION,
            path: '/',
            featureList: FEATURE_META.map((f) => f.navLabel),
          }),
        ]}
      />
      <HeroSection />
      <TrustStrip />
      <ComparisonSection
        title="From notebooks and guesswork to one clear screen"
        lead="Most small businesses run on a mix of paper bills, phone notes and memory. LocalPOS puts all of it in one place."
        rows={ROWS}
      />
      <ProductOverview />
      <FeatureGrid />
      <SolutionsSection
        lead="Retail counters, supermarket queues, restaurant tables, jewellery pieces and medicine batches all bill differently. Choose your business to see how LocalPOS handles it."
        footer={
          <Reveal>
            <div className="mt-10 flex flex-col items-start gap-5 rounded-[20px] border border-dashed border-line-strong bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <p className="max-w-2xl text-ink-2 [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-900">
                Selling to trade customers as well? <Inline text="LocalPOS keeps [price lists and quotations](/features/sales-management-software/) alongside everyday retail billing." />
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <CTAButton to="/book-a-demo/" arrow>
                  Request a Demo
                </CTAButton>
                <CTAButton to="/features/pos-billing-software/" variant="secondary">
                  Explore POS Features
                </CTAButton>
              </div>
            </div>
          </Reveal>
        }
      />
      <HowItWorks />
      <TestimonialSection />
      <FAQSection faqs={FAQS} title="Questions shop owners ask about billing software" lead="Short, plain answers. If yours is not here, we are happy to help." />
      <CTASection secondary={{ label: 'Contact Our Team', to: '/contact-us/' }} />
    </>
  )
}
