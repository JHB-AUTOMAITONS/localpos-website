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
import { rupees } from '@/lib/format'
import { CustomerPreview } from '@/mockups/CustomerPreview'
import { Avatar, Chip } from '@/mockups/parts'

const feature = getFeature('customer-management-software-for-small-business')

const SEGMENTS = [
  { label: 'Regulars', count: 128, text: 'Bought in the last 30 days', tone: 'brand' as const },
  { label: 'Wholesale', count: 14, text: 'Trade and bulk buyers', tone: 'violet' as const },
  { label: 'Credit', count: 22, text: 'Buy now, pay later', tone: 'gold' as const },
  { label: 'Quiet lately', count: 31, text: 'Not seen in 60 days', tone: 'coral' as const },
]

const DUES = [
  { name: 'Meena Traders', amount: 12450, text: 'Oldest bill 18 days ago' },
  { name: 'Ravi Kumar', amount: 2190, text: 'Oldest bill 6 days ago' },
]
const QUIET = [
  { name: 'Priya Nair', text: 'Last bought 74 days ago · usually ₹845' },
  { name: 'Imran Khan', text: 'Last bought 63 days ago · usually ₹1,320' },
]

const DEVICES: Array<{ icon: IconName; label: string }> = [
  { icon: 'monitor', label: 'Counter computer' },
  { icon: 'phone2', label: 'Your phone' },
  { icon: 'users', label: 'Your team' },
]

export default function CustomerManagementPage() {
  return (
    <FeatureFrame feature={feature}>
      <PageHero
        crumbs={featureCrumbs(feature)}
        eyebrow="Features · Customer management"
        title={feature.h1}
        intro={feature.intro}
        tint="coral"
        layout="split-reverse"
        points={['A profile for every customer', 'Dues at a glance', 'Full purchase history']}
        visual={
          <div className="relative pb-6 lg:pl-4">
            <ProductScreenshot alt="Customer management software for small business showing a customer list and a profile with purchase history and pending dues">
              <CustomerPreview />
            </ProductScreenshot>
            <FloatNote icon="wallet" tint="gold" title="Meena Traders owes ₹12,450" text="Oldest bill 18 days ago" className="absolute -top-4 left-2 hidden [animation-delay:800ms] sm:flex lg:-left-6" />
          </div>
        }
      />

      <BenefitsSection id="customer-benefits" title={feature.h2Main} lead="A good customer record is one you never have to type. In LocalPOS, billing builds it for you." benefits={feature.benefits} tint="coral" variant="split" tone="soft" />

      <Section tone="white" labelledBy="customer-segments-heading">
        <SectionHeading id="customer-segments-heading" eyebrow="Groups" eyebrowTone="coral" title="Sort customers into groups you can act on" lead="Tag customers as they come, and see how many people sit in each group. Sample numbers shown." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((s, i) => (
            <li key={s.label}>
              <Reveal delay={i * 70} className="h-full">
                <div className="h-full rounded-[22px] border border-line bg-white p-6 shadow-card">
                  <Chip tone={s.tone}>{s.label}</Chip>
                  <div className="tnum mt-4 font-display text-[2.6rem] font-bold leading-none text-ink">{s.count}</div>
                  <p className="mt-2 text-[0.95rem] text-ink-2">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" labelledBy="customer-steps-heading">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="customer-steps-heading" eyebrow="How it works" eyebrowTone="coral" title={feature.stepsHeading} align="left" lead="You never have to stop billing to fill in a form. Details are saved as a side effect of selling." />
          </div>
          <StepList steps={feature.steps} variant="stack" tint="coral" />
        </div>
      </Section>

      <Section tone="soft" labelledBy="customer-followup-heading">
        <SectionHeading id="customer-followup-heading" eyebrow="Follow up" eyebrowTone="coral" title="A ready list of who to call today" lead="Customers with pending dues and regulars who have gone quiet are one tap away. Sample data." />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[22px] border border-line bg-white p-5 shadow-card sm:p-6">
              <h3 className="flex items-center gap-2 font-display text-[1.15rem] font-semibold text-ink">
                <Icon name="wallet" size={20} className="text-gold-700" /> Pending dues
              </h3>
              <ul className="mt-4 divide-y divide-line">
                {DUES.map((d, i) => (
                  <li key={d.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <Avatar name={d.name} index={i + 1} size={38} />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-ink">{d.name}</div>
                      <div className="text-[0.85rem] text-ink-3">{d.text}</div>
                    </div>
                    <div className="tnum font-bold text-ink">{rupees(d.amount)}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-[22px] border border-line bg-white p-5 shadow-card sm:p-6">
              <h3 className="flex items-center gap-2 font-display text-[1.15rem] font-semibold text-ink">
                <Icon name="clock" size={20} className="text-coral-700" /> Quiet for a while
              </h3>
              <ul className="mt-4 divide-y divide-line">
                {QUIET.map((q, i) => (
                  <li key={q.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <Avatar name={q.name} index={i + 2} size={38} />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-ink">{q.name}</div>
                      <div className="text-[0.85rem] text-ink-3">{q.text}</div>
                    </div>
                    <Chip tone="coral">Follow up</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="white" labelledBy="customer-cloud-heading" compact>
        <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-[28px] border border-coral-100 bg-coral-50 p-7 sm:p-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 id="customer-cloud-heading" className="h3-lg">
              Cloud customer management software that goes where you go
            </h2>
            <p className="mt-3 text-ink-2">Customer records are stored online. Open them at the counter, from your phone or from home, and your whole team sees the same up-to-date picture.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {DEVICES.map((d) => (
              <li key={d.label} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 font-semibold text-ink shadow-card">
                <span className="grid size-9 place-items-center rounded-lg bg-coral-100 text-coral-700">
                  <Icon name={d.icon} size={18} />
                </span>
                {d.label}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </FeatureFrame>
  )
}
