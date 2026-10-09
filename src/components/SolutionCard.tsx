import { Link } from 'react-router'
import { Icon } from '@/components/Icon'
import type { SolutionMeta } from '@/data/types'
import { cn } from '@/lib/cn'
import { TINTS } from '@/lib/tint'

/** A few UI-flavoured snippets that hint at each business type's day-to-day screens. */
const SNIPPETS: Record<string, string[]> = {
  'retail-billing-software': ['Scan', 'Bill', 'Stock −1'],
  'restaurant-billing-software': ['Table 4', 'KOT sent', 'Split bill'],
  'jewellery-billing-software': ['22K · 23.8 g', 'Making charge', 'Tag JW-0418'],
  'supermarket-billing-software': ['Counter 3', 'Bar-code', 'Low: Milk'],
  'medical-store-billing-software': ['Batch B2407A', 'Exp Nov 2026', 'Strip / tablet'],
}

export function SolutionCard({ solution, className }: { solution: SolutionMeta; className?: string }) {
  const t = TINTS[solution.tint]
  return (
    <Link
      to={solution.path}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[22px] border bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1',
        t.border,
        className,
      )}
    >
      <div aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-28 bg-gradient-to-b opacity-90', t.glow)} />
      <span className={cn('relative grid size-12 place-items-center rounded-2xl', t.tile)}>
        <Icon name={solution.icon} size={24} />
      </span>
      <h3 className="relative mt-5 font-display text-[1.3rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{solution.navLabel}</h3>
      <p className="relative mt-1 text-[0.95rem] leading-snug text-ink-2">{solution.navBlurb}</p>
      <ul aria-hidden="true" className="relative mt-4 flex flex-wrap gap-1.5">
        {(SNIPPETS[solution.slug] ?? []).map((s) => (
          <li key={s} className={cn('rounded-md px-2 py-1 font-mono text-[0.72rem] font-medium', t.soft, t.text)}>
            {s}
          </li>
        ))}
      </ul>
      <ul className="relative mt-4 space-y-1.5 text-[0.9rem] text-ink-2">
        {solution.cardPoints.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <Icon name="check" size={15} strokeWidth={2.6} className={cn('mt-[5px] shrink-0', t.text)} />
            {point}
          </li>
        ))}
      </ul>
      <span className={cn('relative mt-auto inline-flex items-center gap-1 pt-5 text-[0.9375rem] font-semibold', t.text)}>
        See how it works
        <Icon name="arrow-right" size={16} strokeWidth={2.4} className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
