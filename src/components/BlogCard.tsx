import { Link } from 'react-router'
import { Icon, type IconName } from '@/components/Icon'
import type { BlogCategory, BlogPost } from '@/data/types'
import { cn } from '@/lib/cn'
import { longDate } from '@/lib/format'
import { TINTS } from '@/lib/tint'

const CATEGORY_ICON: Record<BlogCategory, IconName> = {
  'GST & Compliance': 'gst-receipt',
  Inventory: 'boxes',
  Billing: 'receipt',
  'Retail Tips': 'store',
  'Industry Guides': 'layers',
}

/** Generated cover art: a tinted panel with the category icon and a receipt-edge, so posts need no stock photos. */
export function BlogCover({ post, large, className }: { post: BlogPost; large?: boolean; className?: string }) {
  const t = TINTS[post.tint]
  return (
    <div aria-hidden="true" className={cn('relative overflow-hidden', t.soft, className)}>
      <div className={cn('absolute -right-10 -top-10 size-56 rounded-full bg-gradient-to-br blur-2xl', t.glow)} />
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-0 grid place-items-center">
        <span className={cn('grid place-items-center rounded-[28px] bg-white shadow-lift', large ? 'size-28' : 'size-20', t.text)}>
          <Icon name={CATEGORY_ICON[post.category]} size={large ? 52 : 38} strokeWidth={1.6} />
        </span>
      </div>
    </div>
  )
}

export function BlogCard({ post }: { post: BlogPost }) {
  const t = TINTS[post.tint]
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <BlogCover post={post} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[0.8rem] text-ink-3">
          <span className={cn('rounded-full px-2.5 py-0.5 font-semibold', t.mid, t.text)}>{post.category}</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h3 className="mt-3 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.015em] text-ink">
          <Link to={`/blog/${post.slug}/`} className="after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-[22px] hover:text-brand-800">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.97rem] text-ink-2">{post.excerpt}</p>
        <time dateTime={post.date} className="mt-auto pt-4 text-[0.85rem] text-ink-3">
          {longDate(post.date)}
        </time>
      </div>
    </article>
  )
}
