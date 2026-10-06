import { Icon, type IconName } from '@/components/Icon'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { LeadForm, type FieldDef } from '@/components/forms/LeadForm'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Seo } from '@/lib/head'
import { validators } from '@/lib/forms'

const FIELDS: FieldDef[] = [
  {
    name: 'businessType',
    label: 'Business type',
    type: 'select',
    required: true,
    options: ['Retail shop', 'Restaurant or café', 'Jewellery', 'Supermarket', 'Medical store or pharmacy', 'Other'],
    wide: true,
  },
  { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'phone', label: 'Phone number', type: 'tel', required: true, autoComplete: 'tel', placeholder: '98765 43210', validate: validators.phone },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', placeholder: 'you@yourbusiness.com', validate: validators.email },
  { name: 'company', label: 'Business name', type: 'text', required: true, autoComplete: 'organization' },
  {
    name: 'size',
    label: 'Number of stores',
    type: 'select',
    required: true,
    options: ['1 store', '2 to 5 stores', '6 to 20 stores', 'More than 20 stores'],
    wide: true,
  },
  { name: 'message', label: 'Anything we should know?', type: 'textarea', placeholder: 'What you sell, how you bill today, or what you would like to see in the demo.' },
]

const EXPECT: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'phone', title: 'We get in touch', text: 'We contact you to find a time that suits you.' },
  { icon: 'monitor', title: 'You see LocalPOS in action', text: 'A walk-through of billing, stock, GST and reports, using your kind of business.' },
  { icon: 'handshake', title: 'You ask anything', text: 'Bring your questions about setup, switching over and pricing.' },
]

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Book a Demo', path: '/book-a-demo/' },
]

export default function BookDemoPage() {
  return (
    <>
      <Seo
        title="Book a Free Demo | LocalPOS"
        description="See LocalPOS working for your kind of business. Tell us about your shop and we will get in touch to arrange a free demo."
        path="/book-a-demo/"
        breadcrumbs={crumbs}
      />
      <section aria-labelledby="page-heading" className="relative overflow-hidden pb-16 pt-6 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-40 size-[560px] rounded-full bg-gradient-to-br from-brand-200/70 via-brand-100/40 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -left-32 size-[460px] rounded-full bg-gold-200/50 blur-3xl" />
          <div className="bg-grid absolute inset-0 opacity-60" />
        </div>
        <Container className="relative">
          <Breadcrumbs items={crumbs} className="mb-8 sm:mb-10" />
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Free demo</Eyebrow>
              <h1 id="page-heading" className="display-2 mt-5">
                Book a free demo and see LocalPOS work for your shop
              </h1>
              <p className="lead mt-5 max-w-xl">Tell us a little about your business. We will get in touch to arrange a demo that shows billing, stock, GST and reports for the way you actually work.</p>

              <h2 className="mt-10 font-display text-[1.25rem] font-semibold text-ink">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {EXPECT.map((e, i) => (
                  <li key={e.title} className="flex gap-4">
                    <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                      <Icon name={e.icon} size={21} />
                      <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-ink text-[0.68rem] font-bold text-paper">{i + 1}</span>
                    </span>
                    <div>
                      <h3 className="font-display text-[1.1rem] font-semibold leading-tight text-ink">{e.title}</h3>
                      <p className="mt-1 text-ink-2">{e.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-ink-2">
                {['Free demo', 'Tailored to your business type', 'Questions welcome'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Icon name="circle-check" size={18} className="text-brand-600" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-line bg-white p-6 shadow-lift sm:p-9">
              <h2 className="h3-lg">Tell us about your business</h2>
              <p className="mb-6 mt-1.5 text-ink-2">It takes about a minute.</p>
              <LeadForm
                kind="book-a-demo"
                fields={FIELDS}
                submitLabel="Request my free demo"
                successTitle="Thank you. Your demo request is in."
                successText="We will get in touch using the phone number or email you gave us to arrange a time."
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
