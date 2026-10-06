import { Seo } from '@/lib/head'
import { softwareSchema } from '@/lib/seo'
import type { FaqItem } from '@/lib/seo'
import { SITE } from '@/data/site'
import { FEATURES } from '@/data/features'
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

const TITLE = 'Billing Software with GST, POS & Stock Control | LocalPOS'
const DESCRIPTION =
  'LocalPOS is billing software for Indian shops. Create GST bills in seconds, track stock and payments, and see daily sales on one simple POS platform.'

const ROWS: ComparisonRow[] = [
  { topic: 'Bills', before: 'Handwritten bills, with tax worked out on a calculator.', after: 'GST invoices in seconds, with tax worked out for you.' },
  { topic: 'Stock', before: 'A register updated at the end of the day, if at all.', after: 'Stock that changes with every sale and purchase.' },
  { topic: 'Customers', before: 'Dues kept in a notebook and remembered from memory.', after: 'Every customer’s history and balance one tap away.' },
  { topic: 'Payments', before: 'Cash and UPI counted separately at night.', after: 'Daily collection by payment mode, ready at closing.' },
  { topic: 'Reports', before: 'A month-end spreadsheet that takes a weekend.', after: 'Sales and stock reports, live, whenever you ask.' },
]

const FAQS: FaqItem[] = [
  {
    q: 'What is billing software?',
    a: 'Billing software creates invoices, records payments and keeps a history of what you sold. Modern billing software like LocalPOS also tracks stock, customers and GST, so you do not need separate registers and spreadsheets.',
  },
  {
    q: 'Is LocalPOS GST billing software?',
    a: 'Yes. It creates GST invoices with your GSTIN, HSN codes and the correct CGST, SGST or IGST split, and keeps tax reports ready for your accountant.',
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
    q: 'Do I need special hardware?',
    a: 'No. A computer or tablet is enough to start. If you bill many items a day, a barcode scanner and a receipt printer make checkout faster, and you can add them whenever you like.',
  },
  {
    q: 'Can I manage more than one shop?',
    a: 'Yes. You can run several stores from one login, see each store’s sales and stock, compare them side by side and transfer stock between them.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free demo. We will show you LocalPOS with your kind of products, answer your questions and help you decide whether it fits your business.',
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
            featureList: FEATURES.map((f) => f.navLabel),
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
      <SolutionsSection />
      <HowItWorks />
      <TestimonialSection />
      <FAQSection faqs={FAQS} title="Questions shop owners ask about billing software" lead="Short, plain answers. If yours is not here, we are happy to help." />
      <CTASection />
    </>
  )
}
