import { Inline } from '@/components/Inline'
import { CTAButton } from '@/components/ui/CTAButton'
import type { ReactNode } from 'react'
import { BENEFITS, BILL_STEPS, BUYING_GUIDE, PLAN_TABLE, RETAIL_FEATURES, SHOP_TYPES, WHY_LOCALPOS, WORKED_BILL } from '@/data/retailGuide'
import { FloatNote } from '@/components/FloatNote'
import { PageHero } from '@/components/PageHero'
import { PainPointsSection } from '@/components/PainPoints'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { SolutionFrame, solutionCrumbs } from '@/components/SolutionFrame'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getSolution } from '@/data/solutions'
import { DayCloseSummaryPreview } from '@/mockups/RetailDayPreview'
import { PosScreen } from '@/mockups/PosScreen'

const solution = getSolution('retail-billing-software')

const DAY = [
  { time: '9:00 am', title: 'Open the counter', body: 'Your items, prices and stock are already in place. Log in and start billing.' },
  { time: '12:30 pm', title: 'Handle the lunch rush', body: 'Scan or search, take payment and move on. Hold a bill when a customer goes back for one more item.' },
  { time: '4:00 pm', title: 'Check what is running low', body: 'The low-stock list shows what to reorder before it sells out.' },
  { time: '9:00 pm', title: 'Close the day', body: 'Sales by payment mode are already worked out. Match the cash drawer and you are done.' },
]

function DataTable({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div role="region" aria-label={`${caption}, scrollable`} tabIndex={0} className="mt-6 overflow-x-auto rounded-[18px] border border-line bg-white">
      <table className="w-full min-w-[480px] text-left text-[0.97rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-paper-2">
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 text-[0.8rem] font-bold uppercase tracking-wide text-ink-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line last:border-b-0">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 text-ink-2">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function RetailPage() {
  return (
    <SolutionFrame
      solution={solution}
      afterFaq={
        <Section tone="white" labelledBy="retail-conclusion-heading" compact>
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="retail-conclusion-heading" className="h2-xl">Start Billing Faster with LocalPOS</h2>
            <p className="lead mt-4">The right billing software for retail shop owners makes the counter faster, keeps GST invoices correct, and keeps stock and customer dues true without extra work. LocalPOS brings billing, barcode scanning, inventory, customer records and reports into one system built for Indian shops. See it on your own items, check each step against the buying guide above, and decide with facts.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <CTAButton to="/book-a-demo/">Book a free demo</CTAButton>
              <CTAButton to="/pricing/" variant="secondary">See plans</CTAButton>
            </div>
          </div>
        </Section>
      }
    >
      <PageHero
        crumbs={solutionCrumbs(solution)}
        eyebrow="Solutions · Retail"
        title={solution.h1}
        intro={solution.intro}
        tint="brand"
        layout="split"
        points={['Fast checkout', 'Stock follows sales', 'Daily sales in one view']}
        visual={
          <div className="relative pb-6 lg:pr-4">
            <ProductScreenshot alt="LocalPOS billing software for retail shop counter screen with an item grid, the live bill and payment buttons">
              <PosScreen />
            </ProductScreenshot>
            <FloatNote icon="boxes" tint="gold" title="Stock updated" text="Toor Dal 1 kg · 38 → 36" className="absolute -bottom-3 left-2 hidden [animation-delay:700ms] sm:flex lg:-left-5" />
          </div>
        }
      />

      <PainPointsSection id="retail-pain" title="Simplify Daily Retail Shop Operations with LocalPOS" lead="Most retail problems are small and repeat many times a day. Here is what changes with retail billing software." points={solution.painPoints} variant="notes" tone="soft" />

      <Section tone="paper" labelledBy="retail-what-heading">
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="retail-what-heading" title="What Is Billing Software for a Retail Shop?" align="left" />
          <div className="mt-6 space-y-4 text-[1.05rem] text-ink-2">
            <p><strong>Billing software for retail shop businesses is a program that creates bills at the counter, records how the customer paid, and keeps stock, customer and sales records up to date from the same bill.</strong> It replaces handwritten bills, a separate stock register and a credit notebook with one system.</p>
            <p>Retail billing software is often called POS (point of sale) software. The billing part produces the invoice and the POS part is the counter screen where you do it. LocalPOS does both, and adds inventory, customer records, GST and reports around the bill.</p>
            <p><strong>Who needs it:</strong> any shop that sells many items to many customers each day, such as a grocery, general store, clothing shop, electronics shop, hardware shop, stationery store, footwear shop or cosmetics store. It matters most when you have a queue, a GST registration, a long item list or more than one person billing.</p>
            <p><strong>What it connects:</strong> billing (the sale), GST (the tax on the sale), inventory (the stock the sale uses), customers (who bought and who owes) and reports (what it all adds up to). In LocalPOS these are one system, so a single bill updates all five.</p>
          </div>
        </div>
      </Section>

      <Section tone="soft" labelledBy="retail-features-heading">
        <SectionHeading id="retail-features-heading" eyebrow="Built for retail" eyebrowTone="brand" title="Essential Features of Billing Software for Retail Shop" lead="The twelve capabilities a retail counter uses most, and what each one does for the shop." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {RETAIL_FEATURES.map((f, i) => (
            <Reveal key={f.title}>
              <article className="h-full rounded-[22px] border border-line bg-white p-6 shadow-card">
                <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">
                  <span className="mr-2 font-mono text-[0.85rem] text-brand-700">{String(i + 1).padStart(2, '0')}</span>
                  {f.title}
                </h3>
                <dl className="mt-4 space-y-2 text-[0.97rem] text-ink-2">
                  {([['What it does', f.what], ['How it works', f.how], ['How shops use it', f.use], ['Problem solved', f.problem], ['Benefit', f.benefit]] as const).map(([k, v]) => (
                    <div key={k}>
                      <dt className="inline font-semibold text-ink">{k}: </dt>
                      <dd className="inline"><Inline text={v} /></dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white" labelledBy="retail-day-heading">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading id="retail-day-heading" eyebrow={solution.workflowHeading} eyebrowTone="brand" title="Closing the day: retail POS software that does the adding up" align="left" lead="From the first customer to the last, LocalPOS keeps the numbers so you do not have to." />
            <ol className="mt-10 space-y-6 border-l-2 border-dashed border-line-strong pl-8">
              {DAY.map((d) => (
                <li key={d.time} className="relative">
                  <span className="absolute -left-[2.55rem] top-1 size-4 rounded-full border-4 border-white bg-brand-500 ring-1 ring-brand-200" />
                  <div className="font-mono text-[0.8rem] font-bold uppercase tracking-wider text-brand-700">{d.time}</div>
                  <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{d.title}</h3>
                  <p className="mt-1 text-ink-2">{d.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <Reveal className="lg:sticky lg:top-28">
            <ProductScreenshot alt="Retail POS software day-close summary showing sales by payment mode and a cash drawer that matches">
              <DayCloseSummaryPreview />
            </ProductScreenshot>
          </Reveal>
        </div>
      </Section>

      <Section tone="soft" labelledBy="retail-flow-heading">
        <SectionHeading id="retail-flow-heading" eyebrow="Every sale" eyebrowTone="brand" title="How Retail Billing Software Works in a Retail Shop" lead="A retail bill moves through eight steps. In LocalPOS the first seven happen on the counter screen and the eighth happens on its own." />
        <StepList steps={BILL_STEPS} variant="rail" tint="brand" className="mt-12" />
        <div className="mx-auto mt-14 max-w-3xl">
          <h3 className="font-display text-[1.3rem] font-semibold text-ink">A worked example from an electronics counter</h3>
          <p className="mt-2 text-ink-2">Illustrative figures. A customer buys a USB cable and earphones, both set at 18% GST in the item list. Tax rates depend on the item, so check yours with your CA.</p>
          <DataTable caption="Worked bill example" head={['Line', 'Amount']} rows={WORKED_BILL.map(([a, b, bold]) => [bold ? <strong key={a}>{a}</strong> : a, bold ? <strong key={b}>{b}</strong> : b])} />
          <p className="mt-4 text-ink-2">The customer pays ₹600 by UPI and ₹521 in cash, and LocalPOS records both against the bill. The cable’s stock goes from 24 to 23, the earphones’ stock falls by one, the sale joins the day’s UPI and cash totals, and the bill is linked to the customer. If the buyer were in another state with a GSTIN, the same bill would show IGST 18% (₹171.00) instead of CGST and SGST.</p>
        </div>
      </Section>

      <Section tone="white" labelledBy="retail-benefits-heading">
        <SectionHeading id="retail-benefits-heading" title="Benefits of Using Retail Billing Software" lead="What changes at the counter once billing, stock and sales records live in one place." />
        <div className="mx-auto mt-10 max-w-4xl">
          <DataTable caption="Benefits of retail billing software" head={['Benefit', 'What changes at the shop']} rows={BENEFITS.map(([a, b]) => [<strong key={a}>{a}</strong>, b])} />
        </div>
      </Section>

      <Section tone="paper" labelledBy="retail-types-heading">
        <SectionHeading id="retail-types-heading" title="Billing Software for Different Types of Retail Shops" lead="Every retail shop bills, but what makes billing hard differs by trade." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SHOP_TYPES.map((t) => (
            <Reveal key={t.name}>
              <article className="h-full rounded-[22px] border border-line bg-white p-6">
                <h3 className="font-display text-[1.15rem] font-semibold text-ink">{t.name}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-3"><strong className="text-ink-2">The usual headache:</strong> {t.headache}</p>
                <p className="mt-2 text-[0.97rem] text-ink-2"><Inline text={t.help} /></p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft" labelledBy="retail-choose-heading">
        <SectionHeading id="retail-choose-heading" title="How to Choose the Right Billing Software for Your Retail Shop" lead="Start with one question: what slows my counter down or costs me money today? Then check each option against the points below." />
        <div className="mx-auto mt-10 max-w-5xl">
          <DataTable caption="Buying checklist for retail billing software" head={['Check', 'What to look for', 'Question to ask']} rows={BUYING_GUIDE.map(([a, b, c]) => [<strong key={a}>{a}</strong>, b, c])} />
          <h3 className="mt-12 font-display text-[1.3rem] font-semibold text-ink">What to test in a demo</h3>
          <p className="mt-2 text-ink-2">Bring 20 of your real items. Bill a mixed payment. Return one item and check the stock afterwards. Close the day. If those five take longer than you expected, look elsewhere.</p>
        </div>
      </Section>

      <Section tone="white" labelledBy="retail-why-heading">
        <SectionHeading id="retail-why-heading" title="Why Choose LocalPOS for Retail Billing?" lead="What LocalPOS does well, and where it is plain about its limits." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY_LOCALPOS.map(([t, b]) => (
            <article key={t} className="rounded-[22px] border border-line bg-paper p-6">
              <h3 className="font-display text-[1.15rem] font-semibold text-ink">{t}</h3>
              <p className="mt-2 text-[0.97rem] text-ink-2">{b}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <h3 className="font-display text-[1.3rem] font-semibold text-ink">Plans at a glance</h3>
          <DataTable caption="Features included in each LocalPOS plan" head={['Feature', 'Starter', 'Business', 'Multi-store']} rows={PLAN_TABLE} />
          <p className="mt-4 text-[0.95rem] text-ink-3">Pricing is being finalised. See the <Inline text="[pricing page](/pricing/)" /> for current plan details.</p>
        </div>
      </Section>
    </SolutionFrame>
  )
}
