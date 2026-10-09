import { BenefitsSection } from '@/components/Benefits'
import { FeatureFrame, featureCrumbs } from '@/components/FeatureFrame'
import { FloatNote } from '@/components/FloatNote'
import { Icon, type IconName } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeature } from '@/data/features'
import { BarcodeScanPreview, LabelSheetPreview } from '@/mockups/BarcodePreview'

const feature = getFeature('barcode-billing-software')

const HARDWARE: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'scan', title: 'Barcode scanner', text: 'A USB or Bluetooth scanner that types like a keyboard. Plug it in and scan.' },
  { icon: 'tag', title: 'Label printer', text: 'Print price labels with a barcode for loose items and your own packs.' },
  { icon: 'printer', title: 'Receipt printer', text: 'Print the bill the moment payment is taken, if you want paper copies.' },
  { icon: 'monitor', title: 'Your computer or tablet', text: 'The same device you use for billing. No separate handheld needed.' },
]

const COUNT_STEPS = [
  { title: 'Pick a shelf or category', body: 'Start with one section so counts stay manageable.' },
  { title: 'Scan every item', body: 'Scan each pack on the shelf. Repeat scans add up the quantity.' },
  { title: 'Compare with the system', body: 'See what you counted next to what LocalPOS expects.' },
  { title: 'Adjust the differences', body: 'Accept the count and record a reason for each change.' },
]

export default function BarcodeBillingPage() {
  return (
    <FeatureFrame feature={feature}>
      <PageHero
        crumbs={featureCrumbs(feature)}
        eyebrow="Features · Barcode billing"
        title={feature.h1}
        intro={feature.intro}
        tint="violet"
        layout="split"
        points={['Scan to bill', 'Print your own labels', 'Stock updates itself']}
        visual={
          <div className="relative pb-6 lg:pr-4">
            <ProductScreenshot alt="Barcode billing software with scanner showing a product pack being scanned and added to the bill">
              <BarcodeScanPreview />
            </ProductScreenshot>
            <FloatNote icon="circle-check" tint="violet" title="Item added" text="Toor Dal 1 kg · ₹160" className="absolute -top-4 right-2 hidden [animation-delay:800ms] sm:flex" />
          </div>
        }
      />

      <BenefitsSection id="barcode-benefits" title={feature.h2Main} lead="Typing is where mistakes and queues come from. A scan takes it out of the picture." benefits={feature.benefits} tint="violet" variant="split" tone="soft" />

      <Section tone="white" labelledBy="barcode-labels-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <ProductScreenshot alt="Sheet of barcode price labels ready to print, each with item name, price and barcode">
              <LabelSheetPreview />
            </ProductScreenshot>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading id="barcode-labels-heading" eyebrow="Labels" eyebrowTone="violet" title="Print barcode labels for everything that does not come with one" align="left" lead="Packaged goods already carry a barcode, so keep it. For loose items, your own packs and repacked goods, print labels from LocalPOS." />
            <ul className="mt-6 space-y-3">
              {['Choose the items and how many labels you need', 'Include the item name, price and barcode', 'Print, stick and start scanning'].map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-violet-100 text-violet-700">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="barcode-steps-heading">
        <SectionHeading id="barcode-steps-heading" eyebrow="How it works" eyebrowTone="violet" title={feature.stepsHeading} />
        <StepList steps={feature.steps} variant="rail" tint="violet" className="mt-14" />
      </Section>

      <Section tone="soft" labelledBy="barcode-hardware-heading">
        <SectionHeading id="barcode-hardware-heading" eyebrow="What you need" eyebrowTone="violet" title="Simple hardware you can buy almost anywhere" lead="No special equipment. If your scanner can type into a text box, it can scan into a bill." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HARDWARE.map((h, i) => (
            <li key={h.title}>
              <Reveal delay={i * 70} className="h-full">
                <div className="h-full rounded-[22px] border border-violet-100 bg-white p-6 shadow-card">
                  <span className="grid size-12 place-items-center rounded-2xl bg-violet-100 text-violet-700">
                    <Icon name={h.icon} size={24} />
                  </span>
                  <h3 className="mt-4 font-display text-[1.15rem] font-semibold text-ink">{h.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-ink-2">{h.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="barcode-count-heading">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading id="barcode-count-heading" eyebrow="Stock counts" eyebrowTone="violet" title="Inventory management software with barcode reader support for quick stock counts" align="left" lead="Walk the shelves with your scanner instead of a notebook. Scan each item, compare with the system and fix any difference in a few taps." />
          <StepList steps={COUNT_STEPS} variant="stack" tint="violet" />
        </div>
      </Section>
    </FeatureFrame>
  )
}
