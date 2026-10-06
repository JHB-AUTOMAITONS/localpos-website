import { BenefitsSection } from '@/components/Benefits'
import { FeatureFrame, featureCrumbs } from '@/components/FeatureFrame'
import { FlowRow } from '@/components/FlowRow'
import { FloatNote } from '@/components/FloatNote'
import { PageHero } from '@/components/PageHero'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeature } from '@/data/features'
import { cn } from '@/lib/cn'
import { InventoryPreview } from '@/mockups/InventoryPreview'
import { Chip } from '@/mockups/parts'

const feature = getFeature('inventory-management-software')

const LEDGER = [
  { date: '01 Oct', event: 'Opening stock', change: null, balance: 90 },
  { date: '02 Oct', event: 'Sales · 31 bills', change: -31, balance: 59 },
  { date: '03 Oct', event: 'Sales · 27 bills', change: -27, balance: 32 },
  { date: '04 Oct', event: 'Damaged pack (adjustment)', change: -2, balance: 30 },
  { date: '05 Oct', event: 'Sales · 19 bills', change: -19, balance: 11 },
  { date: '06 Oct', event: 'Sales · 7 bills', change: -7, balance: 4 },
]

const SIZES = ['S', 'M', 'L', 'XL']
const COLOURS = [
  { name: 'Navy', stock: [6, 14, 9, 3] },
  { name: 'White', stock: [11, 8, 0, 5] },
  { name: 'Olive', stock: [2, 7, 12, 1] },
]

export default function InventoryPage() {
  return (
    <FeatureFrame feature={feature}>
      <PageHero
        crumbs={featureCrumbs(feature)}
        eyebrow="Features · Inventory"
        title={feature.h1}
        intro={feature.intro}
        tint="sky"
        layout="split-reverse"
        points={['Live stock levels', 'Low-stock alerts', 'Variants and units']}
        visual={
          <div className="relative pb-6 lg:pl-4">
            <ProductScreenshot alt="Inventory management software stock list showing live quantities, reorder levels and low-stock flags">
              <InventoryPreview />
            </ProductScreenshot>
            <FloatNote icon="bell" tint="coral" title="Reorder Sugar 1 kg" text="4 left · reorder at 20" className="absolute -bottom-3 right-3 hidden [animation-delay:700ms] sm:flex lg:-right-4" />
          </div>
        }
      />

      <BenefitsSection
        id="inventory-benefits"
        title={feature.h2Main}
        lead="Whether you sell by the piece, the kilo or the box, LocalPOS keeps the count right."
        benefits={feature.benefits}
        tint="sky"
        variant="cards"
        tone="soft"
      />

      <Section tone="white" labelledBy="inventory-flow-heading">
        <SectionHeading id="inventory-flow-heading" eyebrow="The stock cycle" eyebrowTone="sky" title="POS inventory management software that follows every bill" lead="Stock is never typed in twice. It moves because your buying and selling moves." />
        <FlowRow
          className="mt-14"
          tint="sky"
          nodes={[
            { icon: 'package', title: feature.steps[0].title, text: feature.steps[0].body },
            { icon: 'truck', title: feature.steps[1].title, text: feature.steps[1].body },
            { icon: 'cart', title: feature.steps[2].title, text: feature.steps[2].body },
            { icon: 'bell', title: feature.steps[3].title, text: feature.steps[3].body },
          ]}
        />
      </Section>

      <Section tone="paper" labelledBy="inventory-ledger-heading">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading id="inventory-ledger-heading" eyebrow="Every change explained" eyebrowTone="sky" title="Stock inventory management software with a history for every item" align="left" lead="Open any item and see exactly how its count changed: what sold, what arrived and what was adjusted, with the date beside each line." />
            <p className="mt-5 text-ink-2">When a number looks wrong, you do not have to guess. The ledger shows the story behind it.</p>
          </div>

          <Reveal>
            <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-card">
              <div className="flex items-center justify-between border-b border-line bg-paper-2 px-5 py-3">
                <div>
                  <div className="text-[0.75rem] font-bold uppercase tracking-wide text-ink-3">Item ledger · sample data</div>
                  <div className="font-display text-[1.1rem] font-semibold text-ink">Sugar 1 kg</div>
                </div>
                <Chip tone="coral">Reorder now</Chip>
              </div>
              <table className="w-full text-left text-[0.92rem]">
                <caption className="sr-only">Stock movement for Sugar 1 kg from 1 to 6 October</caption>
                <thead>
                  <tr className="text-[0.75rem] uppercase tracking-wide text-ink-3">
                    <th scope="col" className="px-5 py-2.5 font-bold">Date</th>
                    <th scope="col" className="px-2 py-2.5 font-bold">Event</th>
                    <th scope="col" className="px-2 py-2.5 text-right font-bold">Change</th>
                    <th scope="col" className="px-5 py-2.5 text-right font-bold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {LEDGER.map((row, i) => {
                    const last = i === LEDGER.length - 1
                    return (
                      <tr key={row.date} className={cn('border-t border-line', last && 'bg-coral-50')}>
                        <td className="tnum whitespace-nowrap px-5 py-3 text-ink-3">{row.date}</td>
                        <td className="px-2 py-3 font-medium text-ink">{row.event}</td>
                        <td className={cn('tnum px-2 py-3 text-right font-semibold', row.change && row.change < 0 ? 'text-coral-700' : 'text-ink-3')}>{row.change ?? '—'}</td>
                        <td className={cn('tnum px-5 py-3 text-right font-bold', last ? 'text-coral-700' : 'text-ink')}>{row.balance}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="border-t border-line bg-coral-50 px-5 py-3 text-[0.88rem] font-medium text-coral-700">Below the reorder level of 20. It now shows in your low-stock list.</div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="soft" labelledBy="inventory-variants-heading">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="rounded-[22px] border border-line bg-white p-5 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[0.75rem] font-bold uppercase tracking-wide text-ink-3">One item, many variants · sample data</div>
                  <div className="font-display text-[1.15rem] font-semibold text-ink">Cotton shirt</div>
                </div>
                <Chip tone="sky">1 box = 12 pcs</Chip>
              </div>
              <div role="region" aria-label="Stock by colour and size, scrollable" tabIndex={0} className="relative mt-4 overflow-x-auto">
                <table className="w-full min-w-[320px] text-center text-[0.92rem]">
                  <caption className="sr-only">Stock by colour and size for the cotton shirt</caption>
                  <thead>
                    <tr className="text-[0.75rem] uppercase tracking-wide text-ink-3">
                      <th scope="col" className="py-2 text-left font-bold">Colour</th>
                      {SIZES.map((s) => (
                        <th key={s} scope="col" className="py-2 font-bold">{s}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COLOURS.map((c) => (
                      <tr key={c.name} className="border-t border-line">
                        <th scope="row" className="py-2.5 text-left font-semibold text-ink">{c.name}</th>
                        {c.stock.map((n, i) => (
                          <td key={i} className="p-1">
                            <span className={cn('tnum inline-block min-w-10 rounded-lg px-2 py-1.5 font-semibold', n === 0 ? 'bg-coral-100 text-coral-700' : n < 4 ? 'bg-gold-100 text-gold-800' : 'bg-sky-50 text-sky-700')}>{n}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading id="inventory-variants-heading" eyebrow="Variants and units" eyebrowTone="sky" title="Retail inventory management software that understands sizes, colours and boxes" align="left" lead="Create the item once and add its variants. Sell by the piece, buy by the box, and LocalPOS keeps both counts in step." />
            <ul className="mt-6 space-y-2.5 text-ink-2">
              <li>See at a glance which size or colour has run out.</li>
              <li>Set a different reorder level for each variant.</li>
              <li>Switch units, such as kg and grams or boxes and pieces, without recounting.</li>
            </ul>
          </div>
        </div>
      </Section>
    </FeatureFrame>
  )
}
