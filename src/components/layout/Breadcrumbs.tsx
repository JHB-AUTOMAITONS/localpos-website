import { Link } from 'react-router'
import { Icon } from '@/components/Icon'
import type { Crumb } from '@/lib/seo'
import { cn } from '@/lib/cn'

/** Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted by <Seo />. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.9rem] text-ink-3">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="line-clamp-1 max-w-[14rem] font-semibold text-ink-2 sm:max-w-none sm:line-clamp-none">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className={cn('inline-flex min-h-8 items-center rounded underline-offset-4 hover:text-brand-700 hover:underline')}>
                  {item.name}
                </Link>
              )}
              {!last && <Icon name="chevron-right" size={14} className="text-ink-3/70" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
