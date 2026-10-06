import { BenefitsSection } from '@/components/Benefits'
import { FeatureFrame, featureCrumbs } from '@/components/FeatureFrame'
import { Icon, type IconName } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { GstDemo } from '@/components/demos/GstDemo'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeature } from '@/data/features'
import { cn } from '@/lib/cn'
import { InvoicePreview } from '@/mockups/InvoicePreview'

const feature = getFeature('gst-billing-software')

const ANNOTATIONS: Array<{ icon: IconName; text: string; pos: string; side: 'left' | 'right' }> = [
  { icon: 'badge-check', text: 'Your GSTIN prints on every invoice', pos: 'top-4', side: 'left' },
  { icon: 'tag', text: 'HSN code saved on each item', pos: 'top-[46%]', side: 'left' },
  { icon: 'pin', text: 'Place of supply decides the tax split', pos: 'top-16', side: 'right' },
  { icon: 'percent', text: 'CGST and SGST worked out for you', pos: 'bottom-14', side: 'right' },
]

const INVOICE_FIELDS = [
  'Your business name, address and GSTIN',
  'A unique invoice number and the date',
  'Customer name and GSTIN, for business sales',
  'Place of supply',
  'Item description and HSN code',
  'Quantity, unit and taxable value',
  'Tax rate and the CGST, SGST or IGST amount',
  'The invoice total',
]

const REPORTS = [
  { icon: 'percent' as IconName, title: 'Tax by rate', text: 'Tax collected at each rate for any date range.' },
  { icon: 'tag' as IconName, title: 'HSN summary', text: 'Sales grouped by HSN code with taxable value and tax.' },
  { icon: 'file' as IconName, title: 'Sales register', text: 'Every invoice, with customer GSTIN and tax split.' },
]

export default function GstBillingPage() {
  return (
    <FeatureFrame feature={feature}>
      <PageHero
        crumbs={featureCrumbs(feature)}
        eyebrow="Features · GST billing"
        title={feature.h1}
        intro={feature.intro}
        tint="gold"
        layout="center"
        points={['GSTIN and HSN on every bill', 'CGST, SGST and IGST', 'Made for Indian businesses']}
        visual={
          <div className="relative mx-auto max-w-[620px] lg:max-w-[600px]">
            <ProductScreenshot alt="GST billing software invoice with GSTIN, HSN codes, place of supply and the CGST and SGST split">
              <InvoicePreview />
            </ProductScreenshot>
            {ANNOTATIONS.map((a) => (
              <div
                key={a.text}
                aria-hidden="true"
                className={cn('absolute hidden w-[210px] items-center gap-2 lg:flex', a.pos, a.side === 'left' ? 'right-full mr-2 flex-row' : 'left-full ml-2 flex-row-reverse')}
              >
                <span className="flex w-[160px] shrink-0 items-start gap-2 rounded-xl border border-gold-200 bg-white px-3 py-2 text-left text-[0.8rem] font-medium leading-snug text-ink shadow-card">
                  <Icon name={a.icon} size={15} className="mt-0.5 shrink-0 text-gold-700" />
                  {a.text}
                </span>
                <span className="h-px flex-1 bg-gold-300" />
                <span className="size-2 rounded-full bg-gold-400 ring-4 ring-gold-100" />
              </div>
            ))}
            <ul className="mt-6 grid gap-2 text-left sm:grid-cols-2 lg:hidden">
              {ANNOTATIONS.map((a) => (
                <li key={a.text} className="flex items-start gap-2 text-[0.9rem] text-ink-2">
                  <Icon name={a.icon} size={16} className="mt-1 shrink-0 text-gold-700" />
                  {a.text}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <BenefitsSection
        id="gst-benefits"
        title={feature.h2Main}
        lead="Tax is where billing mistakes cost real money. LocalPOS keeps the rules in one place so every bill follows them."
        benefits={feature.benefits}
        tint="gold"
        variant="rows"
        tone="paper"
      />

      <Section tone="white" labelledBy="gst-demo-heading">
        <SectionHeading
          id="gst-demo-heading"
          eyebrow="See the split"
          eyebrowTone="gold"
          title="Watch tax split itself between CGST, SGST and IGST"
          lead="Change the price, the rate or the customer’s location and the invoice recalculates. This is the same maths LocalPOS does on every bill."
        />
        <Reveal className="mt-12">
          <GstDemo />
        </Reveal>
      </Section>

      <Section tone="soft" labelledBy="gst-fields-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="gst-fields-heading" eyebrow="On every invoice" eyebrowTone="gold" title="GST invoice software that prints everything a buyer expects to see" align="left" lead="LocalPOS prints the details a GST invoice normally carries, so you are not filling gaps by hand. Requirements can change, so confirm the latest rules with your accountant." />
            <ul className="mt-8 grid gap-3">
              {INVOICE_FIELDS.map((f) => (
                <li key={f} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold-400 text-ink">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="h3-lg">GST-ready records, not just invoices</h3>
            <p className="mt-2 text-ink-2">The same bills feed reports your accountant can use at month end.</p>
            <ul className="mt-6 space-y-3">
              {REPORTS.map((r, i) => (
                <li key={r.title}>
                  <Reveal delay={i * 80}>
                    <div className="flex gap-4 rounded-[20px] border border-line bg-white p-5 shadow-card">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
                        <Icon name={r.icon} size={22} />
                      </span>
                      <div>
                        <h4 className="font-display text-[1.1rem] font-semibold text-ink">{r.title}</h4>
                        <p className="mt-1 text-ink-2">{r.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="gst-steps-heading">
        <SectionHeading id="gst-steps-heading" eyebrow="Setup" eyebrowTone="gold" title={feature.stepsHeading} />
        <StepList steps={feature.steps} variant="rail" tint="gold" className="mt-14" />
      </Section>
    </FeatureFrame>
  )
}
