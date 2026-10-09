import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Icon, type IconName } from '@/components/Icon'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Tint } from '@/data/types'
import { cn } from '@/lib/cn'
import { TINTS } from '@/lib/tint'
import { AnalyticsPreview } from '@/mockups/AnalyticsPreview'
import { CustomerPreview } from '@/mockups/CustomerPreview'
import { InventoryPreview } from '@/mockups/InventoryPreview'
import { InvoicePreview } from '@/mockups/InvoicePreview'
import { MultiStorePreview } from '@/mockups/MultiStorePreview'
import { PaymentsPreview } from '@/mockups/PaymentsPreview'
import { PosScreen } from '@/mockups/PosScreen'

interface Tab {
  key: string
  label: string
  short: string
  icon: IconName
  tint: Tint
  title: string
  text: string
  points: string[]
  href: string
  linkLabel: string
  alt: string
  visual: ReactNode
}

const TABS: Tab[] = [
  {
    key: 'billing',
    label: 'Billing',
    short: 'Bills in a few taps',
    icon: 'cart',
    tint: 'brand',
    title: 'Bill at the counter in a few taps',
    text: 'Search or scan an item, set the quantity, take payment and print. Stock updates with every bill, so the screen always matches the shelf.',
    points: ['Cash, UPI and card on one bill', 'Hold a bill and serve the next customer', 'Discounts with permission control'],
    href: '/features/pos-billing-software/',
    linkLabel: 'See POS billing software',
    alt: 'POS billing software screen with an item grid, a live bill and payment buttons',
    visual: <PosScreen />,
  },
  {
    key: 'gst',
    label: 'GST',
    short: 'Tax-ready invoices',
    icon: 'gst-receipt',
    tint: 'gold',
    title: 'GST invoices that are right the first time',
    text: 'Set the HSN code and tax rate once per item. Every invoice shows the taxable value and the right CGST and SGST, or IGST, without a calculator.',
    points: ['GSTIN, HSN and place of supply on every invoice', 'Tax inclusive or exclusive pricing', 'GST reports ready for your accountant'],
    href: '/features/gst-billing-software/',
    linkLabel: 'See GST billing software',
    alt: 'GST billing software invoice showing HSN codes and the CGST and SGST split',
    visual: <InvoicePreview />,
  },
  {
    key: 'inventory',
    label: 'Inventory',
    short: 'Stock you can trust',
    icon: 'boxes',
    tint: 'sky',
    title: 'Know what is in stock before a customer asks',
    text: 'Every sale takes stock out and every purchase puts it back. Low-stock flags tell you what to reorder while there is still time.',
    points: ['Live stock for every item', 'Variants and units like kg, litre and box', 'Reorder alerts you set yourself'],
    href: '/features/inventory-management-software/',
    linkLabel: 'See inventory management software',
    alt: 'Inventory management software stock list with low-stock flags',
    visual: <InventoryPreview />,
  },
  {
    key: 'payments',
    label: 'Payments',
    short: 'Who paid, who owes',
    icon: 'wallet',
    tint: 'gold',
    title: 'See who has paid and who still owes you',
    text: 'Record cash, UPI, card and part payments against each invoice. Dues are sorted by age, so you know exactly who to call today.',
    points: ['Part payments and advances', 'Dues sorted by age', 'Daily collection by payment mode'],
    href: '/features/payment-management-software/',
    linkLabel: 'See payment management software',
    alt: 'Payment management software showing money received, dues by age and follow-ups',
    visual: <PaymentsPreview />,
  },
  {
    key: 'customers',
    label: 'Customers',
    short: 'Every customer remembered',
    icon: 'users',
    tint: 'coral',
    title: 'Remember every customer without a notebook',
    text: 'A customer profile is created the first time you bill someone. Purchases, payments and pending balance are saved against it automatically.',
    points: ['Full purchase history', 'Pending dues at a glance', 'Tags for regular, wholesale and credit'],
    href: '/features/customer-management-software-for-small-business/',
    linkLabel: 'See customer management software',
    alt: 'Customer records with purchase history and pending dues',
    visual: <CustomerPreview />,
  },
  {
    key: 'reports',
    label: 'Reports',
    short: 'Numbers without spreadsheets',
    icon: 'chart',
    tint: 'violet',
    title: 'Understand your business without a spreadsheet',
    text: 'Daily sales, best sellers, profit and stock reports build themselves from your bills. Pick a date range and the answer is on screen.',
    points: ['Sales by day, week or month', 'Best and slowest sellers', 'Share or download any report'],
    href: '/features/sales-reporting-software/',
    linkLabel: 'See sales reporting software',
    alt: 'Sales reporting software dashboard with a sales trend and best sellers',
    visual: <AnalyticsPreview range="week" showRange={false} />,
  },
  {
    key: 'stores',
    label: 'Multi-store',
    short: 'Every branch, one login',
    icon: 'building',
    tint: 'sky',
    title: 'Run every branch from a single login',
    text: 'Compare stores side by side, see combined sales, and move stock from one branch to another without phone calls and paper slips.',
    points: ['Store-wise and combined reports', 'Stock transfers between stores', 'Staff access limited by store'],
    href: '/features/multi-store-management-software/',
    linkLabel: 'See multi store management software',
    alt: 'Multi store management software comparing sales and stock across four stores',
    visual: <MultiStorePreview />,
  },
]

/** Interactive tabs: one capability at a time, each with a real product screen. */
export function ProductOverview() {
  const [active, setActive] = useState(0)
  const [interacted, setInteracted] = useState(false)
  // Only the visible tab's product screen is rendered; others are added the first time they are opened.
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]))
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  const select = (i: number, focus = false) => {
    setActive(i)
    setInteracted(true)
    setSeen((s) => (s.has(i) ? s : new Set(s).add(i)))
    if (focus) refs.current[i]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = TABS.length - 1
    const map: Record<string, number> = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowDown: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      ArrowUp: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    }
    if (e.key in map) {
      e.preventDefault()
      select(map[e.key], true)
    }
  }

  return (
    <Section tone="white" id="explore" labelledBy="overview-heading" className="overflow-hidden">
      <SectionHeading
        id="overview-heading"
        eyebrow="The whole platform"
        title="One billing software for sales, stock, GST and payments"
        lead="Choose a part of your business to see how LocalPOS handles it. Every screen below uses sample data."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-12">
        <div
          role="tablist"
          aria-label="LocalPOS capabilities"
          className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
        >
          {TABS.map((tab, i) => {
            const t = TINTS[tab.tint]
            const on = i === active
            return (
              <button
                key={tab.key}
                ref={(el) => {
                  refs.current[i] = el
                }}
                role="tab"
                id={`tab-${tab.key}`}
                type="button"
                aria-selected={on}
                aria-controls={`panel-${tab.key}`}
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  'group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition duration-200 lg:px-4 lg:py-3.5',
                  on ? 'border-line bg-white shadow-lift' : 'border-transparent bg-paper-2 hover:bg-paper-3 lg:bg-transparent lg:hover:bg-paper-2',
                )}
              >
                <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl transition-colors', on ? t.tile : 'bg-white text-ink-3 ring-1 ring-line')}>
                  <Icon name={tab.icon} size={20} />
                </span>
                <span>
                  <span className={cn('block font-display text-[1.05rem] font-semibold leading-tight', on ? 'text-ink' : 'text-ink-2')}>{tab.label}</span>
                  <span className="hidden text-[0.875rem] leading-snug text-ink-3 lg:block">{tab.short}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="min-w-0">
          {TABS.map((tab, i) => {
            const t = TINTS[tab.tint]
            const on = i === active
            return (
              <div
                key={tab.key}
                role="tabpanel"
                id={`panel-${tab.key}`}
                aria-labelledby={`tab-${tab.key}`}
                hidden={!on}
                tabIndex={0}
                className={cn(interacted && on && 'motion-safe:animate-fade-up')}
              >
                <h3 className="h3-lg">{tab.title}</h3>
                <p className="mt-2 max-w-2xl text-ink-2">{tab.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tab.points.map((p) => (
                    <li key={p} className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.875rem] font-medium', t.soft, t.text)}>
                      <Icon name="check" size={14} strokeWidth={2.8} />
                      {p}
                    </li>
                  ))}
                </ul>

                {seen.has(i) && (
                  <Reveal className="relative mt-7">
                    <div aria-hidden="true" className={cn('absolute -inset-3 -z-0 rounded-[32px] bg-gradient-to-br sm:-inset-5', t.glow)} />
                    <div className="relative">
                      <ProductScreenshot alt={tab.alt}>{tab.visual}</ProductScreenshot>
                    </div>
                  </Reveal>
                )}

                <Link to={tab.href} className={cn('mt-5 inline-flex items-center gap-1.5 py-2 text-[1rem] font-semibold underline-offset-4 hover:underline', t.text)}>
                  {tab.linkLabel}
                  <Icon name="arrow-right" size={17} strokeWidth={2.4} />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
