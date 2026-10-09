import { Link } from 'react-router'
import { Icon } from '@/components/Icon'
import type { FeatureMeta } from '@/data/types'
import { cn } from '@/lib/cn'
import { TINTS } from '@/lib/tint'

/** Link card for a feature page, tinted with the feature's colour. */
export function FeatureCard({ feature, className, compact }: { feature: FeatureMeta; className?: string; compact?: boolean }) {
  const t = TINTS[feature.tint]
  return (
    <Link
      to={feature.path}
      className={cn(
        'group relative flex h-full flex-col rounded-[20px] border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1',
        t.soft,
        t.border,
        className,
      )}
    >
      <span className={cn('grid size-11 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3', t.tile)}>
        <Icon name={feature.icon} size={22} />
      </span>
      <h3 className="mt-4 font-display text-[1.2rem] font-semibold leading-tight tracking-[-0.015em] text-ink">{feature.navLabel}</h3>
      <p className="mt-1 text-[0.95rem] leading-snug text-ink-2">{feature.navBlurb}</p>
      {!compact && (
        <ul className="mt-4 hidden space-y-1.5 text-[0.875rem] text-ink-2 sm:block">
          {feature.cardPoints.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <Icon name="check" size={15} strokeWidth={2.6} className={cn('mt-1 shrink-0', t.text)} />
              {point}
            </li>
          ))}
        </ul>
      )}
      <span className={cn('mt-auto inline-flex items-center gap-1 pt-5 text-[0.9375rem] font-semibold', t.text)}>
        Explore
        <Icon name="arrow-right" size={16} strokeWidth={2.4} className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
