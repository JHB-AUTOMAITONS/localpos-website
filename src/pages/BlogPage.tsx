import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { BlogCard, BlogCover } from '@/components/BlogCard'
import { Icon } from '@/components/Icon'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CTAButton } from '@/components/ui/CTAButton'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { BLOG_CATEGORIES, BLOG_META } from '@/data/blogMeta'
import type { BlogCategory } from '@/data/types'
import { cn } from '@/lib/cn'
import { longDate } from '@/lib/format'
import { Seo } from '@/lib/head'
import { TINTS } from '@/lib/tint'
import { CTASection } from '@/sections/CTASection'

const PAGE_SIZE = 6
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog/' },
]

export default function BlogPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'All' | BlogCategory>('All')
  const [shown, setShown] = useState(PAGE_SIZE)

  const filtering = query.trim() !== '' || category !== 'All'
  const featured = BLOG_META[0]
  const q = query.trim().toLowerCase()

  const matches = useMemo(
    () =>
      BLOG_META.filter((p) => {
        if (category !== 'All' && p.category !== category) return false
        if (!q) return true
        return [p.title, p.excerpt, p.category, p.keyword].some((s) => s.toLowerCase().includes(q))
      }),
    [category, q],
  )

  // The featured card shows only when nothing is filtered; the grid then lists the rest.
  const list = filtering ? matches : BLOG_META.filter((p) => p.slug !== featured.slug)
  const t = TINTS[featured.tint]

  return (
    <>
      <Seo
        title="Blog: Guides for Running a Better Shop | LocalPOS"
        description="Practical guides for shop owners on GST invoices, stock, barcodes, pending payments and running a smoother counter, from the LocalPOS team."
        path="/blog/"
        breadcrumbs={crumbs}
      />

      <section aria-labelledby="page-heading" className="relative overflow-hidden pb-10 pt-6 sm:pb-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-40 size-[520px] rounded-full bg-gradient-to-br from-gold-200/70 via-gold-100/40 to-transparent blur-3xl" />
          <div className="bg-grid absolute inset-0 opacity-60" />
        </div>
        <Container className="relative">
          <Breadcrumbs items={crumbs} className="mb-8 sm:mb-10" />
          <div className="max-w-3xl">
            <Eyebrow>The LocalPOS blog</Eyebrow>
            <h1 id="page-heading" className="display-2 mt-5">
              Practical guides for running a better shop
            </h1>
            <p className="lead mt-5 max-w-2xl">Plain-language advice on invoices, stock, payments and daily counter work, written for the people who run the shop.</p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div role="search">
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <div className="relative max-w-xl">
                <Icon name="search" size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setShown(PAGE_SIZE)
                  }}
                  placeholder="Search articles"
                  className="h-12 w-full rounded-xl border border-line-strong bg-white pl-11 pr-4 text-[1rem] text-ink placeholder:text-ink-3 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
                />
              </div>
            </div>
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {(['All', ...BLOG_CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => {
                    setCategory(c)
                    setShown(PAGE_SIZE)
                  }}
                  className={cn('rounded-full border px-4 py-2 text-[0.92rem] font-semibold transition', category === c ? 'border-ink bg-ink text-paper' : 'border-line-strong bg-white text-ink-2 hover:bg-paper-2')}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Articles" className="pb-16 sm:pb-24">
        <Container>
          {!filtering && (
            <article className="group relative mb-8 grid overflow-hidden rounded-[28px] border border-line bg-white shadow-card transition duration-300 hover:shadow-lift lg:grid-cols-[1.1fr_1fr]">
              <BlogCover post={featured} large className="min-h-[220px] lg:min-h-[340px]" />
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <div className="flex items-center gap-2 text-[0.82rem] text-ink-3">
                  <span className="rounded-full bg-gold-400 px-2.5 py-0.5 font-bold uppercase tracking-wide text-ink">Featured</span>
                  <span className={cn('rounded-full px-2.5 py-0.5 font-semibold', t.mid, t.text)}>{featured.category}</span>
                </div>
                <h2 className="mt-4 font-display text-[1.7rem] font-bold leading-tight tracking-[-0.025em] text-ink sm:text-[2rem]">
                  <Link to={`/blog/${featured.slug}/`} className="after:absolute after:inset-0 after:content-[''] hover:text-brand-800">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 text-ink-2">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-3 text-[0.88rem] text-ink-3">
                  <time dateTime={featured.date}>{longDate(featured.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{featured.readingMinutes} min read</span>
                </div>
              </div>
            </article>
          )}

          <div className="flex items-baseline justify-between gap-4 pb-5">
            <h2 className="font-display text-[1.5rem] font-semibold text-ink">{filtering ? 'Search results' : 'Latest articles'}</h2>
            <p className="text-[0.92rem] text-ink-3" aria-live="polite">
              {list.length} {list.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {list.length === 0 ? (
            <div className="rounded-[22px] border border-dashed border-line-strong bg-white p-10 text-center">
              <p className="font-display text-[1.25rem] font-semibold text-ink">No articles match your search</p>
              <p className="mt-2 text-ink-2">Try a different word, or clear the filters to see everything.</p>
              <CTAButton
                variant="secondary"
                className="mt-5"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
              >
                Clear filters
              </CTAButton>
            </div>
          ) : (
            <>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p, i) => (
                  // Every card stays in the HTML so crawlers can follow the links; "Load more" just reveals them.
                  <li key={p.slug} hidden={i >= shown}>
                    <BlogCard post={p} />
                  </li>
                ))}
              </ul>
              {list.length > shown && (
                <div className="mt-10 text-center">
                  <CTAButton variant="secondary" size="lg" onClick={() => setShown((n) => n + PAGE_SIZE)}>
                    Load more articles
                  </CTAButton>
                  <p className="mt-3 text-[0.88rem] text-ink-3">
                    Showing {Math.min(shown, list.length)} of {list.length}
                  </p>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      <CTASection title="Ready to see it in action?" text="Reading is a good start. A short demo shows you how LocalPOS handles these jobs with your own products." />
    </>
  )
}
