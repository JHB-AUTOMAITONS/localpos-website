import { useState } from 'react'
import { BenefitsSection } from '@/components/Benefits'
import { FeatureFrame, featureCrumbs } from '@/components/FeatureFrame'
import { Icon, type IconName } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeature } from '@/data/features'
import { cn } from '@/lib/cn'
import { AnalyticsPreview, RANGE_LABEL, type ReportRange } from '@/mockups/AnalyticsPreview'

const feature = getFeature('sales-reporting-software')

type Group = 'Sales' | 'Stock' | 'Payments' | 'Tax'
const GROUPS: Array<'All' | Group> = ['All', 'Sales', 'Stock', 'Payments', 'Tax']

const REPORTS: Array<{ group: Group; icon: IconName; title: string; text: string }> = [
  { group: 'Sales', icon: 'chart', title: 'Daily sales summary', text: 'Bills, sales and collections for any day.' },
  { group: 'Sales', icon: 'tag', title: 'Item-wise sales', text: 'What sold, how many and for how much.' },
  { group: 'Sales', icon: 'layers', title: 'Category-wise sales', text: 'Compare groups of products side by side.' },
  { group: 'Sales', icon: 'users', title: 'Customer-wise sales', text: 'Your best customers, ranked.' },
  { group: 'Sales', icon: 'user', title: 'Staff-wise sales', text: 'Bills and sales by team member.' },
  { group: 'Sales', icon: 'trend', title: 'Profit by item', text: 'Selling price against cost for each item.' },
  { group: 'Stock', icon: 'boxes', title: 'Stock summary', text: 'Quantity and value of everything on hand.' },
  { group: 'Stock', icon: 'bell', title: 'Low-stock list', text: 'Items at or below their reorder level.' },
  { group: 'Stock', icon: 'clipboard', title: 'Item ledger', text: 'Every movement for one item, in order.' },
  { group: 'Payments', icon: 'wallet', title: 'Payments received', text: 'Collections by day and by payment mode.' },
  { group: 'Payments', icon: 'clock', title: 'Dues by age', text: 'Who owes you, and for how long.' },
  { group: 'Payments', icon: 'truck', title: 'Supplier dues', text: 'What you owe each supplier and when.' },
  { group: 'Tax', icon: 'percent', title: 'GST summary by rate', text: 'Tax collected at each rate.' },
  { group: 'Tax', icon: 'gst-receipt', title: 'HSN-wise summary', text: 'Sales grouped by HSN code.' },
  { group: 'Tax', icon: 'file', title: 'Sales and purchase registers', text: 'Invoice-level records for your accountant.' },
]

const SHARE: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'download', title: 'Download', text: 'Save any report as a file you can keep or open in a spreadsheet.' },
  { icon: 'printer', title: 'Print', text: 'Print a clean copy for a review meeting or your records.' },
  { icon: 'mail', title: 'Share', text: 'Send a report to a partner or your accountant.' },
]

export default function SalesReportingPage() {
  const [range, setRange] = useState<ReportRange>('week')
  const [group, setGroup] = useState<'All' | Group>('All')
  const visible = REPORTS.filter((r) => group === 'All' || r.group === group)

  return (
    <FeatureFrame feature={feature}>
      <PageHero
        crumbs={featureCrumbs(feature)}
        eyebrow="Features · Reports & analytics"
        title={feature.h1}
        intro={feature.intro}
        tint="violet"
        layout="center"
        points={['Daily sales at a glance', 'Best and slowest sellers', 'Share or download']}
        visual={
          <div>
            <div role="radiogroup" aria-label="Report date range" className="mx-auto mb-5 flex w-fit rounded-xl bg-white p-1 shadow-card ring-1 ring-line">
              {(Object.keys(RANGE_LABEL) as ReportRange[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  role="radio"
                  aria-checked={range === r}
                  onClick={() => setRange(r)}
                  className={cn('rounded-lg px-4 py-2 text-[0.95rem] font-semibold transition', range === r ? 'bg-violet-700 text-white' : 'text-ink-2 hover:text-ink')}
                >
                  {RANGE_LABEL[r]}
                </button>
              ))}
            </div>
            <ProductScreenshot alt="Sales reporting software dashboard with the sales trend, key numbers, best sellers and category split">
              <AnalyticsPreview range={range} />
            </ProductScreenshot>
            <p className="mt-4 text-center text-[0.85rem] text-ink-3">Switch the date range above. Sample data.</p>
          </div>
        }
      />

      <BenefitsSection id="reports-benefits" title={feature.h2Main} lead="Reports build from your bills as you work. There is nothing extra to enter." benefits={feature.benefits} tint="violet" variant="cards" tone="soft" />

      <Section tone="white" labelledBy="reports-library-heading">
        <SectionHeading id="reports-library-heading" eyebrow="Report library" eyebrowTone="violet" title="Business reporting software with the reports shops actually ask for" lead="Pick a group to see what is included. Each report can be filtered by date, item, customer, staff or store." />
        <div role="group" aria-label="Report groups" className="mt-10 flex flex-wrap justify-center gap-2">
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
              className={cn('rounded-full border px-4 py-2 text-[0.95rem] font-semibold transition', group === g ? 'border-violet-700 bg-violet-700 text-white' : 'border-line-strong bg-white text-ink-2 hover:bg-paper')}
            >
              {g}
            </button>
          ))}
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {visible.map((r) => (
            <li key={r.title} className="flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-card">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700">
                <Icon name={r.icon} size={20} />
              </span>
              <div>
                <h3 className="font-display text-[1.05rem] font-semibold leading-tight text-ink">{r.title}</h3>
                <p className="mt-1 text-[0.92rem] text-ink-2">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" labelledBy="reports-share-heading">
        <SectionHeading id="reports-share-heading" eyebrow="Take it with you" eyebrowTone="violet" title="Hand any report to the people who need it" lead="A report is only useful when the right person sees it. Download, print or share it in a click." />
        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {SHARE.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="h-full rounded-[22px] border border-violet-100 bg-violet-50 p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-white text-violet-700 shadow-card">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <h3 className="mt-4 font-display text-[1.15rem] font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-ink-2">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="reports-steps-heading">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="reports-steps-heading" eyebrow="How it works" eyebrowTone="violet" title={feature.stepsHeading} align="left" />
          </div>
          <StepList steps={feature.steps} variant="stack" tint="violet" />
        </div>
      </Section>
    </FeatureFrame>
  )
}
