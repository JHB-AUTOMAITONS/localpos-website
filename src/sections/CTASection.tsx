import { Icon } from '@/components/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

interface CTASectionProps {
  title?: string
  text?: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
  /** Small reassurance lines shown under the buttons. */
  points?: string[]
  className?: string
}

/** Closing call to action, shaped like a receipt stub: main panel, perforated edge, tear-off button stub. */
export function CTASection({
  title = 'See LocalPOS working on your own products',
  text = 'Book a free demo and we will walk you through billing, stock and GST using your kind of business. Bring your questions.',
  primary = { label: 'Book a Free Demo', to: '/book-a-demo/' },
  secondary = { label: 'Talk to us', to: '/contact-us/' },
  points = ['Free demo', 'See it with your own items', 'No tech skills needed'],
  className,
}: CTASectionProps) {
  return (
    <section aria-labelledby="cta-heading" className={className ?? 'py-16 sm:py-20 lg:py-24'}>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-brand-700 bg-[radial-gradient(900px_420px_at_85%_-10%,rgb(52_171_133/0.55),transparent),radial-gradient(600px_380px_at_0%_110%,rgb(246_178_50/0.22),transparent)] text-white shadow-float">
            <div className="grid lg:grid-cols-[1.5fr_1fr]">
              <div className="p-7 sm:p-10 lg:p-14">
                <h2 id="cta-heading" className="h2-xl max-w-xl text-white">
                  {title}
                </h2>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-brand-50/90">{text}</p>
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-brand-50">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <Icon name="circle-check" size={18} className="text-gold-300" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tear-off stub */}
              <div className="relative flex flex-col justify-center gap-3 border-t-2 border-dashed border-white/35 p-7 sm:p-10 lg:border-l-2 lg:border-t-0 lg:p-12">
                <span aria-hidden="true" className="absolute -left-3 top-[-14px] size-6 rounded-full bg-paper lg:-left-3 lg:-top-3" />
                <span aria-hidden="true" className="absolute -right-3 top-[-14px] size-6 rounded-full bg-paper lg:-bottom-3 lg:-top-auto lg:left-[-14px] lg:right-auto" />
                <CTAButton to={primary.to} variant="gold" size="lg" arrow className="w-full">
                  {primary.label}
                </CTAButton>
                <CTAButton to={secondary.to} variant="inverse" size="lg" className="w-full">
                  {secondary.label}
                </CTAButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
