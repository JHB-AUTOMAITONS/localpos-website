import { Link, useParams } from 'react-router'
import { BlogCard, BlogCover } from '@/components/BlogCard'
import { Inline } from '@/components/Inline'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { BLOG_POSTS, getPost } from '@/data/blog'
import { SITE, absoluteUrl } from '@/data/site'
import type { BlogPost, ContentBlock } from '@/data/types'
import { cn } from '@/lib/cn'
import { longDate } from '@/lib/format'
import { Seo } from '@/lib/head'
import { TINTS } from '@/lib/tint'
import { CTASection } from '@/sections/CTASection'
import { FAQSection } from '@/sections/FAQSection'
import { RelatedFeatures } from '@/sections/RelatedFeatures'
import NotFoundPage from './NotFoundPage'

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p>
          <Inline text={block.text} />
        </p>
      )
    case 'h2':
      return <h2 id={slugify(block.text)}>{block.text}</h2>
    case 'h3':
      return <h3>{block.text}</h3>
    case 'ul':
      return (
        <ul>
          {block.items.map((it) => (
            <li key={it}>
              <Inline text={it} />
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol>
          {block.items.map((it) => (
            <li key={it}>
              <Inline text={it} />
            </li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <aside className="my-8 rounded-2xl border border-gold-200 bg-gold-50 p-5 sm:p-6">
          <p className="!mb-1.5 font-display text-[1.1rem] font-semibold text-ink">{block.title}</p>
          <p className="!mb-0 text-ink-2">
            <Inline text={block.text} />
          </p>
        </aside>
      )
  }
}

function articleSchema(post: BlogPost): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en-IN',
    keywords: [post.keyword, ...post.secondary].join(', '),
    image: [absoluteUrl(SITE.ogImage)],
    author: { '@type': 'Organization', name: SITE.name, url: `${SITE.url}/` },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`),
  }
}

export default function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFoundPage />

  const path = `/blog/${post.slug}/`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog/' },
    { name: post.title, path },
  ]
  const toc = post.blocks.filter((b): b is Extract<ContentBlock, { type: 'h2' }> => b.type === 'h2')
  const t = TINTS[post.tint]
  const more = [...BLOG_POSTS.filter((p) => p.slug !== post.slug)]
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3)

  return (
    <>
      <Seo
        title={post.seoTitle}
        description={post.seoDescription}
        path={path}
        type="article"
        publishedTime={post.date}
        modifiedTime={post.date}
        breadcrumbs={crumbs}
        faqs={post.faqs}
        jsonLd={[articleSchema(post)]}
      />

      <article>
        <header className="relative overflow-hidden pb-10 pt-6 sm:pb-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className={cn('absolute -right-24 -top-40 size-[480px] rounded-full bg-gradient-to-br blur-3xl', t.glow)} />
            <div className="bg-grid absolute inset-0 opacity-50" />
          </div>
          <Container className="relative">
            <Breadcrumbs items={crumbs} className="mb-8 sm:mb-10" />
            <div className="mx-auto max-w-[820px]">
              <div className="flex flex-wrap items-center gap-2 text-[0.88rem] text-ink-3">
                <span className={cn('rounded-full px-3 py-1 font-semibold', t.mid, t.text)}>{post.category}</span>
                <time dateTime={post.date}>{longDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h1 id="page-heading" className="display-2 mt-4 !text-[clamp(2rem,1.4rem+2.2vw,3.1rem)]">
                {post.title}
              </h1>
              <p className="lead mt-5">{post.excerpt}</p>
            </div>
          </Container>
        </header>

        <Container>
          <BlogCover post={post} large className="mx-auto mb-12 aspect-[21/9] max-w-[1000px] rounded-[28px] border border-line" />
          <div className="mx-auto grid max-w-[1000px] gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            <aside className="hidden lg:block">
              {toc.length > 1 && (
                <nav aria-label="In this article" className="sticky top-28">
                  <p className="text-[0.78rem] font-bold uppercase tracking-[0.1em] text-ink-3">In this article</p>
                  <ol className="mt-3 space-y-2.5 border-l-2 border-line pl-4 text-[0.92rem] leading-snug">
                    {toc.map((h) => (
                      <li key={h.text}>
                        <a href={`#${slugify(h.text)}`} className="text-ink-2 hover:text-brand-700">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </aside>
            <div className="prose-lp min-w-0">
              {post.blocks.map((b, i) => (
                <Block key={i} block={b} />
              ))}
              <p className="!mt-10 border-t border-line pt-6 text-[0.95rem] text-ink-3">
                Written by the {SITE.name} team. Tax, legal and compliance points are general guidance. Please confirm them with a qualified professional for your own business.
              </p>
            </div>
          </div>
        </Container>
      </article>

      {post.faqs && post.faqs.length > 0 && <FAQSection faqs={post.faqs} title="Quick answers" id="post-faq" tone="soft" />}
      <RelatedFeatures slugs={post.relatedFeatures} title="LocalPOS features related to this article" />

      <Section tone="paper" labelledBy="more-heading">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="more-heading" className="h2-xl !text-[clamp(1.6rem,1.2rem+1.3vw,2.25rem)]">
            Keep reading
          </h2>
          <Link to="/blog/" className="text-[0.95rem] font-semibold text-brand-700 hover:underline">
            All articles
          </Link>
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {more.map((p) => (
            <li key={p.slug}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      </Section>

      <CTASection />
    </>
  )
}
