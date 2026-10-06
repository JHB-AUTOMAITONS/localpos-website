import { Icon } from '@/components/Icon'
import { ProductScreenshot } from '@/components/ProductScreenshot'
import { CTAButton } from '@/components/ui/CTAButton'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { DashboardPreview } from '@/mockups/DashboardPreview'
import { HeroReceipt } from '@/mockups/InvoicePreview'
import { FloatCard } from '@/mockups/parts'

/** Home hero: positioning on the left, an original billing dashboard with a self-printing receipt on the right. */
export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pb-10 pt-8 sm:pt-12 lg:pb-16 lg:pt-16">
      {/* Atmosphere: soft glows and a faint graph-paper texture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="drift absolute -right-24 -top-32 size-[560px] rounded-full bg-brand-200/55 blur-3xl animate-drift" />
        <div className="drift absolute -bottom-40 -left-32 size-[460px] rounded-full bg-gold-200/50 blur-3xl animate-drift [animation-delay:-6s]" />
        <div className="bg-grid absolute inset-0 opacity-70" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            {/* The headline and intro are the largest text on screen, so they paint immediately (no fade-in) to keep LCP fast. */}
            <div>
              <Eyebrow>Billing software for Indian businesses</Eyebrow>
            </div>
            <h1 id="hero-heading" className="display-1 mt-5">
              Billing software that bills fast and keeps your shop in order
            </h1>
            <p className="lead mt-6 max-w-xl">
              LocalPOS is billing software for shops, restaurants, jewellers, supermarkets and medical stores. Make GST invoices in seconds, take payments, track stock and see your day’s sales from one simple platform your whole team can pick up quickly.
            </p>
            <div className="mt-8 flex flex-col gap-3 animate-fade-up [animation-delay:240ms] sm:flex-row">
              <CTAButton to="/book-a-demo/" size="lg" arrow>
                Book a Free Demo
              </CTAButton>
              <CTAButton to="/#explore" variant="secondary" size="lg">
                Explore Features
              </CTAButton>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-ink-2 animate-fade-up [animation-delay:320ms]">
              {['Free demo', 'GST-ready invoices', 'Made for Indian businesses'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="circle-check" size={18} className="text-brand-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="relative pb-24 lg:col-span-6 lg:pb-10 lg:pl-8">
            <div className="relative animate-fade-up [animation-delay:200ms] lg:-mr-10 xl:-mr-16">
              <ProductScreenshot alt="LocalPOS billing software dashboard showing today’s sales, invoices, GST collected, payment modes and low-stock items">
                <DashboardPreview />
              </ProductScreenshot>

              {/* Self-printing receipt */}
              <div aria-hidden="true" className="absolute -bottom-28 left-2 z-10 w-[180px] -rotate-[3deg] sm:-bottom-20 sm:-left-6 sm:w-[240px] lg:-bottom-16 lg:-left-16">
                <HeroReceipt />
              </div>

              {/* Payment toast */}
              <FloatCard className="motion-safe-only absolute -top-5 right-1 z-10 hidden w-[232px] animate-fade-up [animation-delay:2.9s] sm:block lg:-right-3">
                <div className="flex items-center gap-2.5">
                  <span className="pulse-ring grid size-9 shrink-0 place-items-center rounded-full bg-brand-600 text-white animate-pulse-ring">
                    <Icon name="check" size={18} strokeWidth={3} />
                  </span>
                  <div className="min-w-0 text-[11.5px] leading-tight">
                    <div className="font-bold text-ink">Payment received</div>
                    <div className="tnum mt-0.5 text-ink-3">₹1,468 · UPI · INV-2041</div>
                  </div>
                </div>
              </FloatCard>

              {/* Stock alert */}
              <FloatCard className="motion-safe-only absolute -bottom-6 right-2 z-10 hidden w-[218px] animate-fade-up [animation-delay:3.2s] sm:block lg:-bottom-8 lg:right-6">
                <div className="flex items-center gap-2.5">
                  <span className="float-y grid size-9 shrink-0 place-items-center rounded-full bg-gold-100 text-gold-700 animate-float-y">
                    <Icon name="bell" size={17} />
                  </span>
                  <div className="min-w-0 text-[11.5px] leading-tight">
                    <div className="font-bold text-ink">Sugar 1 kg is running low</div>
                    <div className="tnum mt-0.5 text-ink-3">4 left · reorder at 20</div>
                  </div>
                </div>
              </FloatCard>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
