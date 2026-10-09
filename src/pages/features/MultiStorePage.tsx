import { BenefitsSection } from '@/components/Benefits'
import { FeatureFrame, featureCrumbs } from '@/components/FeatureFrame'
import { FloatNote } from '@/components/FloatNote'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { StepList } from '@/components/StepList'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeature } from '@/data/features'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { MultiStorePreview } from '@/mockups/MultiStorePreview'
import { STORES } from '@/mockups/sample'

const feature = getFeature('multi-store-management-software')

const NODE_POS = ['left-[3%] top-[6%]', 'right-[3%] top-[6%]', 'left-[3%] bottom-[6%]', 'right-[3%] bottom-[6%]']

const ACCESS = [
  { what: 'See every store together', owner: true, manager: false, cashier: false },
  { what: 'See reports for their own store', owner: true, manager: true, cashier: false },
  { what: 'Change item prices', owner: true, manager: true, cashier: false },
  { what: 'Approve stock transfers', owner: true, manager: true, cashier: false },
  { what: 'Create bills at the counter', owner: true, manager: true, cashier: true },
]

const ROLES = [
  { key: 'owner', label: 'Owner' },
  { key: 'manager', label: 'Manager' },
  { key: 'cashier', label: 'Cashier' },
] as const

function Mark({ yes }: { yes: boolean }) {
  return yes ? (
    <>
      <Icon name="check" size={18} strokeWidth={3} className="mx-auto mt-1 text-brand-600" />
      <span className="sr-only">Yes</span>
    </>
  ) : (
    <>
      <span aria-hidden="true" className="mx-auto mb-[7px] mt-[13px] block h-0.5 w-3 rounded bg-line-strong" />
      <span className="sr-only">No</span>
    </>
  )
}

export default function MultiStorePage() {
  return (
    <FeatureFrame feature={feature}>
      <PageHero
        crumbs={featureCrumbs(feature)}
        eyebrow="Features · Multi-store management"
        title={feature.h1}
        intro={feature.intro}
        tint="sky"
        layout="split-reverse"
        points={['One login, every store', 'Stock transfers', 'Access by store']}
        visual={
          <div className="relative pb-6 lg:pl-4">
            <ProductScreenshot alt="Multi store management software comparing sales, stock and a stock transfer across four stores">
              <MultiStorePreview />
            </ProductScreenshot>
            <FloatNote icon="truck" tint="sky" title="Transfer in transit" text="Main Road → Market Street" className="absolute -bottom-3 right-3 hidden [animation-delay:800ms] sm:flex lg:-right-4" />
          </div>
        }
      />

      <BenefitsSection id="multistore-benefits" title={feature.h2Main} lead="Each branch keeps its own counter and stock. You get the view from above." benefits={feature.benefits} tint="sky" variant="rows" tone="paper" />

      <Section tone="soft" labelledBy="multistore-network-heading">
        <SectionHeading id="multistore-network-heading" eyebrow="One system" eyebrowTone="sky" title="Every branch connected, every number in one place" lead="Stores bill on their own. Sales, stock and payments flow into a single view, and stock can move between branches. Sample data." />
        <Reveal className="mt-12">
          <div role="img" aria-label="Diagram: four stores, Main Road, Market Street, Station Branch and Mall Counter, connected to one central view" className="relative mx-auto h-[530px] max-w-3xl min-[400px]:h-[470px] sm:h-[380px]">
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
              {[
                [18, 20],
                [82, 20],
                [18, 80],
                [82, 80],
              ].map(([x, y]) => (
                <line key={`${x}-${y}`} x1="50" y1="50" x2={x} y2={y} stroke="#a7dfc7" strokeWidth="2" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 z-10 grid w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl border border-brand-200 bg-white p-4 text-center shadow-float">
              <span className="grid size-11 place-items-center rounded-2xl bg-brand-600 text-white">
                <Icon name="building" size={22} />
              </span>
              <span className="mt-2 font-display text-[1rem] font-semibold leading-tight text-ink">All stores view</span>
              <span className="tnum text-[0.78rem] text-ink-3">{rupees(STORES.reduce((s, x) => s + x.sales, 0))} today</span>
            </div>
            {STORES.map((s, i) => (
              <div key={s.name} aria-hidden="true" className={`absolute ${NODE_POS[i]} w-[42%] max-w-[210px] rounded-2xl border border-line bg-white p-3.5 shadow-card sm:w-[34%]`}>
                <div className="flex items-center gap-2">
                  <span className="hidden size-8 shrink-0 place-items-center rounded-lg bg-sky-100 text-sky-700 min-[400px]:grid">
                    <Icon name="store" size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[0.92rem] font-semibold leading-tight text-ink sm:truncate">{s.name}</div>
                    <div className="text-[0.75rem] text-ink-3">{s.city}</div>
                  </div>
                </div>
                <div className="tnum mt-2 font-display text-[1.1rem] font-bold text-ink">{rupees(s.sales)}</div>
                <div className={s.stock === 'Healthy' ? 'text-[0.75rem] font-semibold text-brand-700' : 'text-[0.75rem] font-semibold text-gold-800'}>{s.stock === 'Healthy' ? 'Stock healthy' : s.stock}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="white" labelledBy="multistore-access-heading">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading id="multistore-access-heading" eyebrow="Roles" eyebrowTone="sky" title="Let each person see what they need, and nothing more" align="left" lead="Give store managers their own branch and cashiers just the counter, while you keep the full picture. Roles shown here are examples." />
          <Reveal className="min-w-0">
            {/* Phones: one card per capability, with all three roles visible without side-scrolling. */}
            <ul className="space-y-3 sm:hidden">
              {ACCESS.map((a) => (
                <li key={a.what} className="rounded-2xl border border-line bg-white p-4 shadow-card">
                  <p className="font-medium text-ink">{a.what}</p>
                  <ul className="mt-3 grid grid-cols-3 gap-2">
                    {ROLES.map((r) => (
                      <li key={r.key} className={cn('rounded-xl px-2 py-2 text-center text-[0.8rem] font-semibold', a[r.key] ? 'bg-brand-50 text-brand-800' : 'bg-paper-2 text-ink-3')}>
                        <span className="block leading-tight">{r.label}</span>
                        <Mark yes={a[r.key]} />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div role="region" aria-label="Role access table, scrollable" tabIndex={0} className="relative hidden overflow-x-auto rounded-[22px] border border-line bg-white shadow-card sm:block">
              <table className="w-full min-w-[480px] text-left text-[0.95rem]">
                <caption className="sr-only">Example access by role</caption>
                <thead>
                  <tr className="border-b border-line bg-paper-2 text-[0.78rem] uppercase tracking-wide text-ink-3">
                    <th scope="col" className="px-5 py-3 font-bold">What they can do</th>
                    <th scope="col" className="px-3 py-3 text-center font-bold">Owner</th>
                    <th scope="col" className="px-3 py-3 text-center font-bold">Store manager</th>
                    <th scope="col" className="px-3 py-3 text-center font-bold">Cashier</th>
                  </tr>
                </thead>
                <tbody>
                  {ACCESS.map((a) => (
                    <tr key={a.what} className="border-b border-line last:border-b-0">
                      <th scope="row" className="px-5 py-3.5 font-medium text-ink">{a.what}</th>
                      <td className="px-3 py-3.5 text-center"><Mark yes={a.owner} /></td>
                      <td className="px-3 py-3.5 text-center"><Mark yes={a.manager} /></td>
                      <td className="px-3 py-3.5 text-center"><Mark yes={a.cashier} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" labelledBy="multistore-steps-heading">
        <SectionHeading id="multistore-steps-heading" eyebrow="How it works" eyebrowTone="sky" title={feature.stepsHeading} />
        <StepList steps={feature.steps} variant="cards" tint="sky" className="mx-auto mt-12 max-w-4xl" />
      </Section>
    </FeatureFrame>
  )
}
