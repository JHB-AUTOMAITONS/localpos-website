import { Link } from 'react-router'
import { Logo } from '@/components/Logo'
import { CTAButton } from '@/components/ui/CTAButton'
import { Container } from '@/components/ui/Container'
import { TearLine } from '@/components/ui/TearLine'
import { FEATURE_META } from '@/data/featureMeta'
import { SOLUTION_META } from '@/data/solutionMeta'
import { BLOG_META } from '@/data/blogMeta'
import { SITE } from '@/data/site'

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.1em] text-ink">{title}</h2>
      <ul className="mt-3 space-y-0.5">{children}</ul>
    </div>
  )
}

const linkClass = 'inline-flex min-h-8 items-center rounded text-[0.95rem] leading-snug text-ink-2 transition-colors hover:text-brand-700'

function FooterLink({ to, children, external }: { to: string; children: React.ReactNode; external?: boolean }) {
  return (
    <li>
      {external ? (
        <a href={to} className={linkClass} rel="noopener">
          {children}
        </a>
      ) : (
        <Link to={to} className={linkClass}>
          {children}
        </Link>
      )}
    </li>
  )
}

export function Footer() {
  return (
    <footer className="relative mt-0 bg-paper-2 pb-10 pt-14 sm:pt-16" aria-label="Site footer">
      <Container>
        <div className="flex flex-col gap-8 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Link to="/" aria-label="LocalPOS home" className="inline-block rounded-lg">
              <Logo />
            </Link>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
              Create bills in seconds. Track stock, payments and sales from one simple platform, built for Indian businesses.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CTAButton to="/book-a-demo/" arrow>
              Book a Free Demo
            </CTAButton>
            <CTAButton to="/contact-us/" variant="secondary">
              Talk to us
            </CTAButton>
          </div>
        </div>

        <TearLine notch="bg-paper-2" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pt-12 md:grid-cols-3 lg:grid-cols-6">
          <FooterColumn title="Product">
            <FooterLink to="/pricing/">Pricing</FooterLink>
            <FooterLink to="/book-a-demo/">Book a Demo</FooterLink>
            <FooterLink to={SITE.loginUrl} external>
              Login
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Features">
            {FEATURE_META.map((f) => (
              <FooterLink key={f.slug} to={f.path}>
                {f.navLabel}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Solutions">
            {SOLUTION_META.map((s) => (
              <FooterLink key={s.slug} to={s.path}>
                {s.navLabel}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Resources">
            <FooterLink to="/blog/">Blog</FooterLink>
            {BLOG_META.slice(0, 3).map((p) => (
              <FooterLink key={p.slug} to={`/blog/${p.slug}/`}>
                <span className="line-clamp-2">{p.title}</span>
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink to="/about-us/">About Us</FooterLink>
            <FooterLink to="/contact-us/">Contact Us</FooterLink>
            {SITE.social.map((s) => (
              <FooterLink key={s.href} to={s.href} external>
                {s.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink to="/privacy-policy/">Privacy Policy</FooterLink>
            <FooterLink to="/terms-and-conditions/">Terms &amp; Conditions</FooterLink>
            <FooterLink to="/refund-policy/">Refund Policy</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line-strong pt-6 text-[0.9rem] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.name}. All rights reserved.
          </p>
          <p>Made for shops, restaurants, jewellers, supermarkets and medical stores across India.</p>
        </div>
      </Container>
    </footer>
  )
}
