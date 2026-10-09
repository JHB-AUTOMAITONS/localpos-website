import { useId, useState } from 'react'
import { BenefitsSection } from '@/components/Benefits'
import { FloatNote } from '@/components/FloatNote'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { PainPointsSection } from '@/components/PainPoints'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { SolutionFrame, solutionCrumbs } from '@/components/SolutionFrame'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getSolution } from '@/data/solutions'
import { rupees } from '@/lib/format'
import { JewelleryBillPreview, JewelleryTagPreview } from '@/mockups/JewelleryPreview'

const solution = getSolution('jewellery-billing-software')

const PIECE_FIELDS = ['Tag number and description', 'Gross, stone and net weight', 'Purity, such as 22K or 18K', 'Making charge, by weight or fixed', 'Stone details and charges', 'Status: in showcase, sold or with the karigar']

function NumberField({ label, hint, value, onChange }: { label: string; hint?: string; value: string; onChange: (v: string) => void }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="text-[0.85rem] font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ''))}
        className="tnum mt-2 h-12 w-full rounded-xl border border-line-strong bg-white px-4 text-[1.05rem] font-semibold text-ink focus:border-gold-400 focus:outline-none focus:ring-4 focus:ring-gold-100"
      />
      {hint && <p className="mt-1.5 text-[0.8rem] text-ink-3">{hint}</p>}
    </div>
  )
}

/** Shows how a jewellery invoice adds up. Every input is typed by the visitor, so no rate is claimed. */
function InvoiceBuilder() {
  const [weight, setWeight] = useState('23.8')
  const [rate, setRate] = useState('9850')
  const [making, setMaking] = useState('650')
  const [stone, setStone] = useState('3200')
  const [gst, setGst] = useState('3')
  const n = (s: string) => parseFloat(s) || 0
  const metal = n(weight) * n(rate)
  const makingTotal = n(weight) * n(making)
  const taxable = metal + makingTotal + n(stone)
  const tax = (taxable * n(gst)) / 100
  const rows: Array<[string, number]> = [
    ['Metal value', metal],
    ['Making charges', makingTotal],
    ['Stone charges', n(stone)],
  ]
  return (
    <div className="grid overflow-hidden rounded-[24px] border border-line bg-white shadow-card lg:grid-cols-[1fr_1fr]">
      <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
        <NumberField label="Net weight (g)" value={weight} onChange={setWeight} />
        <NumberField label="Rate per gram (₹)" hint="Enter the day’s rate. The default is a sample." value={rate} onChange={setRate} />
        <NumberField label="Making charge per gram (₹)" value={making} onChange={setMaking} />
        <NumberField label="Stone charges (₹)" value={stone} onChange={setStone} />
        <NumberField label="GST (%)" hint="Confirm the right rate with your accountant." value={gst} onChange={setGst} />
      </div>
      <div className="border-t border-line bg-gold-50 p-6 sm:p-8 lg:border-l lg:border-t-0">
        <div className="receipt mx-auto max-w-sm rounded-t-xl p-5 font-mono sm:p-6" aria-live="polite">
          <div className="text-center text-[0.7rem] font-bold uppercase tracking-[0.25em] text-ink-3">Gold necklace · sample</div>
          <div className="perforation my-3" aria-hidden="true" />
          <dl className="space-y-2 text-[0.9rem]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <dt className="text-ink-2">{k}</dt>
                <dd className="tnum font-semibold text-ink">{rupees(v)}</dd>
              </div>
            ))}
            <div className="flex justify-between border-t border-dashed border-line-strong pt-2">
              <dt className="text-ink-2">Taxable value</dt>
              <dd className="tnum font-semibold text-ink">{rupees(taxable)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-2">GST @ {n(gst)}%</dt>
              <dd className="tnum text-ink">{rupees(tax)}</dd>
            </div>
          </dl>
          <div className="perforation my-3" aria-hidden="true" />
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-ink">Invoice total</span>
            <span className="tnum text-[1.35rem] font-bold text-ink">{rupees(taxable + tax)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JewelleryPage() {
  return (
    <SolutionFrame solution={solution}>
      <PageHero
        crumbs={solutionCrumbs(solution)}
        eyebrow="Solutions · Jewellery"
        title={solution.h1}
        intro={solution.intro}
        tint="gold"
        layout="center"
        points={['Weight, purity and making charges', 'Piece-by-piece stock', 'GST on every invoice']}
        visual={
          <div className="relative mx-auto max-w-[760px] pb-4">
            <ProductScreenshot alt="Gold jewellery billing software invoice with gross, stone and net weight, purity, making charges and GST">
              <JewelleryBillPreview />
            </ProductScreenshot>
            <div className="absolute -right-4 -top-10 hidden w-[170px] rotate-[4deg] lg:block xl:-right-24">
              <ProductScreenshot alt="Jewellery item tag with tag number, net weight, purity and barcode">
                <JewelleryTagPreview />
              </ProductScreenshot>
            </div>
            <FloatNote icon="gem" tint="gold" title="Piece JW-0418" text="Net 23.800 g · 22K" className="absolute -bottom-3 left-2 hidden [animation-delay:800ms] sm:flex lg:-left-8" />
          </div>
        }
      />

      <PainPointsSection id="jewellery-pain" title="Why jewellery billing is different from every other shop" points={solution.painPoints} variant="notes" tone="soft" />

      <BenefitsSection id="jewellery-highlights" title={solution.h2Main} lead="Built around how jewellers actually price a piece, not forced into a grocery bill." benefits={solution.highlights} tint="gold" variant="split" tone="paper" eyebrow="Built for jewellers" />

      <Section tone="white" labelledBy="jewellery-piece-heading">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="order-2 mx-auto w-full max-w-[300px] rounded-[28px] bg-gradient-to-br from-gold-100 via-gold-50 to-transparent p-8 lg:order-1">
            <ProductScreenshot alt="Item tag for a gold necklace showing tag number, net weight, purity and barcode">
              <JewelleryTagPreview />
            </ProductScreenshot>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading id="jewellery-piece-heading" eyebrow="Every piece on record" eyebrowTone="gold" title="Best jewellery billing software starts with knowing every piece" align="left" lead="Give each piece a tag and keep its full story in one place. Scan the tag at the counter and every detail flows onto the bill." />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {PIECE_FIELDS.map((f) => (
                <li key={f} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold-400 text-ink">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="soft" labelledBy="jewellery-calc-heading">
        <SectionHeading id="jewellery-calc-heading" eyebrow="See it add up" eyebrowTone="gold" title="Gold jewellery billing software that shows its working" lead="Change the weight, rate or making charge and the invoice updates. Every figure is typed in by you, and the defaults are samples only." />
        <Reveal className="mt-12">
          <InvoiceBuilder />
        </Reveal>
      </Section>

      <Section tone="paper" labelledBy="jewellery-steps-heading">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="jewellery-steps-heading" eyebrow="At the counter" eyebrowTone="gold" title={solution.workflowHeading} align="left" lead="Four steps, and the customer leaves with an invoice that shows every part of the price." />
          </div>
          <Reveal>
            <StepList steps={solution.workflow} variant="receipt" />
          </Reveal>
        </div>
      </Section>
    </SolutionFrame>
  )
}
