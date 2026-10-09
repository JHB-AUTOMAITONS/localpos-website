import { Icon, type IconName } from '@/components/Icon'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { LeadForm, type FieldDef } from '@/components/forms/LeadForm'
import { CTAButton } from '@/components/ui/CTAButton'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SITE } from '@/data/site'
import { Seo } from '@/lib/head'
import { validators } from '@/lib/forms'
import { CTASection } from '@/sections/CTASection'

const FIELDS: FieldDef[] = [
  { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name', maxLength: 120, requiredMessage: 'Enter your name.' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', placeholder: 'you@yourbusiness.com', validate: validators.email, maxLength: 254, requiredMessage: 'Enter your email address.' },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', placeholder: '98765 43210', validate: validators.phone, maxLength: 20 },
  { name: 'topic', label: 'What is this about?', type: 'select', required: true, options: ['A question about LocalPOS', 'Support for my account', 'Pricing', 'Partnership', 'Something else'], requiredMessage: 'Choose what your message is about.' },
  { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'How can we help?', maxLength: 2000, requiredMessage: 'Enter your message.' },
]

const DETAILS: Array<{ key: keyof typeof SITE.contact; icon: IconName; label: string; placeholder: string; href?: (v: string) => string }> = [
  { key: 'email', icon: 'mail', label: 'Email', placeholder: 'Support email to be added', href: (v) => `mailto:${v}` },
  { key: 'phone', icon: 'phone', label: 'Phone', placeholder: 'Phone number to be added', href: (v) => `tel:${v.replace(/\s/g, '')}` },
  { key: 'address', icon: 'pin', label: 'Address', placeholder: 'Business address to be added' },
  { key: 'hours', icon: 'clock', label: 'Support hours', placeholder: 'Support hours to be added' },
]

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact Us', path: '/contact-us/' },
]

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Us | LocalPOS"
        description="Questions about LocalPOS, support or pricing? Send us a message and the team will get back to you."
        path="/contact-us/"
        breadcrumbs={crumbs}
      />
      <section aria-labelledby="page-heading" className="relative overflow-hidden pb-16 pt-6 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-40 size-[520px] rounded-full bg-gradient-to-br from-sky-100/90 via-brand-100/40 to-transparent blur-3xl" />
          <div className="bg-grid absolute inset-0 opacity-60" />
        </div>
        <Container className="relative">
          <Breadcrumbs items={crumbs} className="mb-8 sm:mb-10" />
          <div className="max-w-2xl">
            <Eyebrow tone="sky">Contact</Eyebrow>
            <h1 id="page-heading" className="display-2 mt-5">
              We are happy to help
            </h1>
            <p className="lead mt-5">Ask a question, tell us what you are looking for, or get help with your account. A real person will read your message.</p>
          </div>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
            <div className="order-2 space-y-6 lg:order-1">
              <div className="rounded-[24px] border border-line bg-white p-6 shadow-card sm:p-7">
                <h2 className="font-display text-[1.25rem] font-semibold text-ink">Contact details</h2>
                <ul className="mt-5 space-y-5">
                  {DETAILS.map((d) => {
                    const value = SITE.contact[d.key]
                    return (
                      <li key={d.key} className="flex items-start gap-4">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-700">
                          <Icon name={d.icon} size={19} />
                        </span>
                        <div>
                          <div className="text-[0.8rem] font-bold uppercase tracking-wide text-ink-3">{d.label}</div>
                          {value ? (
                            d.href ? (
                              <a href={d.href(value)} className="font-semibold text-brand-700 underline-offset-2 hover:underline">
                                {value}
                              </a>
                            ) : (
                              <div className="font-semibold text-ink">{value}</div>
                            )
                          ) : (
                            <div className="flex flex-wrap items-center gap-2 text-ink-3">
                              <span>{d.placeholder}</span>
                              <span className="rounded-full border border-dashed border-gold-300 bg-gold-50 px-2 py-0.5 text-[0.72rem] font-bold uppercase tracking-wide text-gold-800">Placeholder</span>
                            </div>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="rounded-[24px] border border-brand-200 bg-brand-50 p-6 sm:p-7">
                <h2 className="font-display text-[1.25rem] font-semibold text-ink">Want to see it first?</h2>
                <p className="mt-2 text-ink-2">Book a free demo and we will show you LocalPOS working with your kind of business.</p>
                <CTAButton to="/book-a-demo/" arrow className="mt-5">
                  Book a Demo
                </CTAButton>
              </div>
            </div>

            <div className="order-1 rounded-[28px] border border-line bg-white p-6 shadow-lift sm:p-9 lg:order-2">
              <h2 className="h3-lg">Send us a message</h2>
              <p className="mb-6 mt-1.5 text-ink-2">We will reply using the email address you provide.</p>
              <LeadForm
                kind="contact-us"
                fields={FIELDS}
                submitLabel="Send message"
                successTitle="Thank you. Your message is on its way."
                successText="We will reply to the email address you gave us as soon as we can."
              />
            </div>
          </div>
        </Container>
      </section>
      <CTASection
        title="Prefer to talk it through on a demo?"
        text="A short demo is often the quickest way to get your questions answered."
        secondary={{ label: 'See pricing', to: '/pricing/' }}
        points={['Free demo', 'Tailored to your business', 'Questions welcome']}
      />
    </>
  )
}
