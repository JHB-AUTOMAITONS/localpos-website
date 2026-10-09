import { Link } from 'react-router'
import { CTAButton } from '@/components/ui/CTAButton'
import { Container } from '@/components/ui/Container'
import { Seo } from '@/lib/head'
import { FEATURE_META } from '@/data/featureMeta'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found | LocalPOS" description="The page you were looking for could not be found." path="/404/" noindex />
      <section className="py-24 sm:py-32">
        <Container narrow className="text-center">
          <p className="font-mono text-[0.85rem] font-bold uppercase tracking-[0.25em] text-ink-3">Error 404</p>
          <h1 className="display-2 mt-4">This bill could not be found</h1>
          <p className="lead mx-auto mt-5 max-w-xl">The page you opened may have moved or never existed. Head back home, or jump straight to one of the most visited pages.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton to="/" arrow>
              Back to home
            </CTAButton>
            <CTAButton to="/book-a-demo/" variant="secondary">
              Book a Demo
            </CTAButton>
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-2">
            {FEATURE_META.slice(0, 5).map((f) => (
              <li key={f.slug}>
                <Link to={f.path} className="inline-block rounded-full border border-line bg-white px-4 py-2 text-[0.95rem] font-medium text-ink-2 hover:border-brand-300 hover:text-brand-800">
                  {f.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
