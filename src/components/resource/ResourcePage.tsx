import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Icon } from '@/components/Icon'
import { Inline } from '@/components/Inline'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { getResourceMeta } from '@/data/resourceMeta'
import { cn } from '@/lib/cn'
import { Seo } from '@/lib/head'
import { softwareSchema, webPageSchema, type FaqItem } from '@/lib/seo'
import { CTASection } from '@/sections/CTASection'
import { FAQSection } from '@/sections/FAQSection'
import type { Block } from './blocks'

export interface ResourcePageProps {
  /** Slug from data/resourceMeta.ts. */
  slug: string
  seoTitle: string
  seoDescription: string
  h1: string
  intro: string
  /** Two to four short facts shown under the introduction. */
  points?: string[]
  /** Heading (H2) above the tool or template. */
  toolTitle: string
  toolLead?: string
  /** The tool or template itself. */
  children: ReactNode
  blocks: Block[]
  faqs: FaqItem[]
  faqTitle?: string
  /** Slugs of related tool and format pages, most relevant first. */
  related: string[]
  relatedTitle?: string
  /** What the tool does, for the SoftwareApplication schema (tool pages only). */
  featureList?: string[]
  cta?: { title: string; text: string }
}

const link = '[&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-900'
const h2 = 'h2-xl !text-[clamp(1.6rem,1.25rem+1.3vw,2.3rem)]'

function BlockHeading({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className={h2}>
        {title}
      </h2>
      {lead && (
        <p className={cn('mt-3 text-ink-2', link)}>
          <Inline text={lead} />
        </p>
      )}
    </div>
  )
}

function CheckList({ items, icon = 'circle-check', tone = 'text-brand-600' }: { items: string[]; icon?: 'circle-check' | 'minus'; tone?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <Icon name={icon} size={18} className={cn('mt-[5px] shrink-0', tone)} />
          <span>
            <Inline text={it} />
          </span>
        </li>
      ))}
    </ul>
  )
}

function BlockBody({ block, id }: { block: Block; id: string }) {
  switch (block.kind) {
    case 'prose':
      return (
        <div className={cn('grid gap-8', block.aside && 'lg:grid-cols-[1.6fr_1fr] lg:gap-12')}>
          <div className={cn('max-w-3xl', link)}>
            <h2 id={id} className={h2}>
              {block.title}
            </h2>
            <div className="mt-4 space-y-4">
              {block.body.map((p) => (
                <p key={p}>
                  <Inline text={p} />
                </p>
              ))}
            </div>
            {block.bullets && (
              <div className="mt-5">
                <CheckList items={block.bullets} />
              </div>
            )}
          </div>
          {block.aside && (
            <aside className={cn('self-start rounded-[20px] border border-gold-200 bg-gold-50 p-6', link)}>
              <h3 className="font-display text-[1.15rem] font-semibold leading-tight text-ink">{block.aside.title}</h3>
              <p className="mt-2 text-[0.98rem]">
                <Inline text={block.aside.body} />
              </p>
            </aside>
          )}
        </div>
      )
    case 'steps':
      return (
        <>
          <BlockHeading id={id} title={block.title} lead={block.lead} />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {block.steps.map((s, i) => (
              <li key={s.title} className="rounded-[20px] border border-line bg-white p-5 shadow-card">
                <span className="font-mono text-[0.85rem] font-bold text-brand-700">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-1.5 font-display text-[1.1rem] font-semibold leading-tight text-ink">{s.title}</h3>
                <p className={cn('mt-2 text-[0.98rem]', link)}>
                  <Inline text={s.body} />
                </p>
              </li>
            ))}
          </ol>
        </>
      )
    case 'defs':
      return (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <BlockHeading id={id} title={block.title} lead={block.lead} />
          <dl className="divide-y divide-line rounded-[20px] border border-line bg-white shadow-card">
            {block.items.map((it) => (
              <div key={it.term} className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-5 sm:px-6">
                <dt className="font-semibold text-ink">{it.term}</dt>
                <dd className={cn('text-[0.98rem]', link)}>
                  <Inline text={it.desc} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )
    case 'cards':
      return (
        <>
          <BlockHeading id={id} title={block.title} lead={block.lead} />
          <ul className={cn('mt-8 grid gap-4 sm:grid-cols-2', block.items.length % 3 === 0 ? 'lg:grid-cols-3' : block.items.length > 2 && 'lg:grid-cols-4')}>
            {block.items.map((it) => (
              <li key={it.title} className="rounded-[20px] border border-line bg-white p-5 shadow-card">
                {it.icon && (
                  <span className="mb-3 grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon name={it.icon} size={20} />
                  </span>
                )}
                <h3 className="font-display text-[1.1rem] font-semibold leading-tight text-ink">{it.title}</h3>
                <p className={cn('mt-2 text-[0.98rem]', link)}>
                  <Inline text={it.body} />
                </p>
              </li>
            ))}
          </ul>
        </>
      )
    case 'table':
      return (
        <>
          <BlockHeading id={id} title={block.title} lead={block.lead} />
          {/* tabIndex: a table wider than a phone screen scrolls sideways, and a scrollable region must be reachable by keyboard. */}
          <div className="mt-6 overflow-x-auto rounded-[20px] border border-line bg-white shadow-card" role="region" aria-label={`${block.title}: table`} tabIndex={0}>
            <table className="w-full min-w-[32rem] border-collapse text-left text-[0.98rem]">
              <thead>
                <tr className="bg-paper-2 text-ink">
                  {block.head.map((h, i) =>
                    h ? (
                      <th key={i} scope="col" className="px-4 py-3 font-semibold sm:px-5">
                        {h}
                      </th>
                    ) : (
                      <td key={i} />
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join('|')} className="border-t border-line">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-4 py-3 font-semibold text-ink sm:px-5">
                          <Inline text={cell} />
                        </th>
                      ) : (
                        <td key={i} className={cn('tnum px-4 py-3 sm:px-5', link)}>
                          <Inline text={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && (
            <p className={cn('mt-4 max-w-3xl text-[0.95rem] text-ink-3', link)}>
              <Inline text={block.note} />
            </p>
          )}
        </>
      )
    case 'split':
      return (
        <>
          <BlockHeading id={id} title={block.title} lead={block.lead} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className={cn('rounded-[20px] border border-brand-200 bg-brand-50 p-6', link)}>
              <h3 className="mb-4 font-display text-[1.15rem] font-semibold leading-tight text-ink">{block.left.title}</h3>
              <CheckList items={block.left.items} tone="text-brand-700" />
            </div>
            <div className={cn('rounded-[20px] border border-line bg-white p-6', link)}>
              <h3 className="mb-4 font-display text-[1.15rem] font-semibold leading-tight text-ink">{block.right.title}</h3>
              <CheckList items={block.right.items} icon="minus" tone="text-ink-3" />
            </div>
          </div>
        </>
      )
    case 'note':
      return (
        <div className={cn('mx-auto max-w-3xl rounded-[20px] border border-gold-200 bg-gold-50 p-6 sm:p-8', link)}>
          <h2 id={id} className="font-display text-[1.35rem] font-semibold leading-tight text-ink">
            {block.title}
          </h2>
          <p className="mt-3">
            <Inline text={block.body} />
          </p>
        </div>
      )
  }
}

const TONES = ['paper', 'white', 'soft'] as const

/** Shared scaffold for the free tool and business-format pages: compact hero, the tool itself straight after, then the page's own content. */
export function ResourcePage(p: ResourcePageProps) {
  const meta = getResourceMeta(p.slug)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: meta.label, path: meta.path },
  ]
  const related = p.related.map(getResourceMeta)
  const page = webPageSchema({ name: p.h1, description: p.seoDescription, path: meta.path })
  const jsonLd = meta.kind === 'tool' ? [page, softwareSchema({ name: `LocalPOS ${meta.label}`, description: p.seoDescription, path: meta.path, featureList: p.featureList, category: 'UtilitiesApplication' })] : [page]

  return (
    <>
      <Seo title={p.seoTitle} description={p.seoDescription} path={meta.path} breadcrumbs={crumbs} faqs={p.faqs} jsonLd={jsonLd} />

      <section aria-labelledby="page-heading" className="relative overflow-hidden pb-8 pt-6 sm:pb-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 size-[560px] rounded-full bg-gradient-to-br from-brand-200/70 via-brand-100/40 to-transparent blur-3xl" />
          <div className="bg-grid absolute inset-0 opacity-60" />
        </div>
        <Container className="relative">
          <Breadcrumbs items={crumbs} className="mb-7 sm:mb-8" />
          <div className="max-w-3xl">
            <Eyebrow tone={meta.kind === 'tool' ? 'brand' : 'gold'}>{meta.kind === 'tool' ? 'Free tool' : 'Business format'}</Eyebrow>
            <h1 id="page-heading" className="display-2 mt-4 !text-[clamp(1.85rem,1.3rem+2.2vw,3rem)]">
              {p.h1}
            </h1>
            <p className={cn('lead mt-4', link)}>
              <Inline text={p.intro} />
            </p>
            {p.points && (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-ink-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2">
                    <Icon name="circle-check" size={18} className="mt-[3px] shrink-0 text-brand-600" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>

      <section id="tool" aria-labelledby="tool-heading" className="relative pb-14 sm:pb-20">
        <Container>
          <div className="rounded-[24px] border border-line bg-white p-4 shadow-lift sm:p-7 lg:p-9">
            <div className="max-w-3xl">
              <h2 id="tool-heading" className={h2}>
                {p.toolTitle}
              </h2>
              {p.toolLead && (
                <p className={cn('mt-2 text-ink-2', link)}>
                  <Inline text={p.toolLead} />
                </p>
              )}
            </div>
            <div className="mt-6">{p.children}</div>
          </div>
        </Container>
      </section>

      {p.blocks.map((block, i) => {
        const id = `block-${i + 1}`
        return (
          <Section key={id} tone={TONES[i % TONES.length]} labelledBy={id} compact>
            <BlockBody block={block} id={id} />
          </Section>
        )
      })}

      <FAQSection faqs={p.faqs} title={p.faqTitle} tone={TONES[p.blocks.length % TONES.length]} />

      <Section tone="soft" labelledBy="related-resources" compact>
        <h2 id="related-resources" className={h2}>
          {p.relatedTitle ?? 'Related tools and formats'}
        </h2>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <li key={r.slug}>
              <Link to={r.path} className="group flex h-full items-start gap-3.5 rounded-[20px] border border-line bg-white p-5 shadow-card transition-colors hover:border-brand-300">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name={r.icon} size={20} />
                </span>
                <span>
                  <span className="block font-display text-[1.05rem] font-semibold leading-tight text-ink group-hover:text-brand-800">{r.label}</span>
                  <span className="mt-1 block text-[0.92rem] leading-snug text-ink-3">{r.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection
        title={p.cta?.title ?? 'Do this automatically on every bill with LocalPOS'}
        text={p.cta?.text ?? 'LocalPOS is billing software for Indian shops and small businesses. It creates GST invoices, tracks stock and payments, and keeps your records in one place.'}
      />
    </>
  )
}
