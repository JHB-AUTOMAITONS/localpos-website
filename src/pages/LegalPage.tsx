import { useLocation } from 'react-router'
import { MobileToc } from '@/components/MobileToc'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { LEGAL_PAGES } from '@/data/legal'
import { longDate } from '@/lib/format'
import { Seo } from '@/lib/head'
import NotFoundPage from './NotFoundPage'

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** Shared layout for Privacy Policy, Terms & Conditions and Refund Policy. Content lives in data/legal.ts. */
export default function LegalPage() {
  const { pathname } = useLocation()
  const page = LEGAL_PAGES.find((p) => p.path === (pathname.endsWith('/') ? pathname : `${pathname}/`))
  if (!page) return <NotFoundPage />

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: page.title, path: page.path },
  ]

  return (
    <>
      <Seo title={page.seoTitle} description={page.seoDescription} path={page.path} breadcrumbs={crumbs} />
      <article className="pb-20 pt-6 sm:pb-28">
        <Container>
          <Breadcrumbs items={crumbs} className="mb-8 sm:mb-10" />
          <div className="mx-auto grid max-w-[1000px] gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            <aside className="hidden lg:block">
              <nav aria-label="On this page" className="sticky top-28">
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.1em] text-ink-3">On this page</p>
                <ol className="mt-3 space-y-0.5 border-l-2 border-line pl-4 text-[0.9rem] leading-snug">
                  {page.sections.map((s) => (
                    <li key={s.heading}>
                      <a href={`#${slugify(s.heading)}`} className="block py-1.5 text-ink-2 hover:text-brand-700">
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <header>
                <h1 id="page-heading" className="display-2 !text-[clamp(2rem,1.4rem+2.2vw,3rem)]">
                  {page.title}
                </h1>
                <p className="mt-3 text-[0.95rem] text-ink-3">
                  Last updated <time dateTime={page.updated}>{longDate(page.updated)}</time>
                </p>
                <p className="lead mt-5">{page.intro}</p>
              </header>
              <div className="mt-6">
                <MobileToc title="On this page" items={page.sections.map((s) => ({ id: slugify(s.heading), label: s.heading }))} />
              </div>
              <div className="prose-lp mt-4">
                {page.sections.map((s) => (
                  <section key={s.heading} aria-labelledby={slugify(s.heading)}>
                    <h2 id={slugify(s.heading)}>{s.heading}</h2>
                    {s.paragraphs?.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {s.items && (
                      <ul>
                        {s.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  )
}
