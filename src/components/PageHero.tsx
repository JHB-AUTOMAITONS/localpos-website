import type { ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CTAButton } from '@/components/ui/CTAButton'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { Tint } from '@/data/types'
import type { Crumb } from '@/lib/seo'
import { cn } from '@/lib/cn'
import { TINTS } from '@/lib/tint'

export type HeroLayout = 'split' | 'split-reverse' | 'center'

interface PageHeroProps {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  intro: string
  tint?: Tint
  layout?: HeroLayout
  points?: string[]
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
  /** The product visual. Wrap mockups in <ProductScreenshot> before passing them in. */
  visual?: ReactNode
  /** Extra decoration anchored to the visual (floating cards, etc.) */
  className?: string
}

/** Shared hero scaffold. Pages choose a layout and supply their own visual, so the heroes differ while the system stays the same. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  tint = 'brand',
  layout = 'split',
  points,
  primary = { label: 'Book a Free Demo', to: '/book-a-demo/' },
  secondary = { label: 'See pricing', to: '/pricing/' },
  visual,
  className,
}: PageHeroProps) {
  const t = TINTS[tint]
  const centered = layout === 'center'

  const copy = (
    <div className={cn(centered && 'mx-auto max-w-3xl text-center')}>
      <Eyebrow tone={tint === 'gold' ? 'gold' : tint}>{eyebrow}</Eyebrow>
      <h1 id="page-heading" className={cn('display-2 mt-5', !centered && '!text-[clamp(2.1rem,1.4rem+2.1vw,3.2rem)]')}>
        {title}
      </h1>
      <p className={cn('lead mt-5 max-w-xl', centered && 'mx-auto')}>{intro}</p>
      <div className={cn('mt-8 flex flex-col gap-3 sm:flex-row', centered && 'justify-center')}>
        <CTAButton to={primary.to} size="lg" arrow>
          {primary.label}
        </CTAButton>
        <CTAButton to={secondary.to} variant="secondary" size="lg">
          {secondary.label}
        </CTAButton>
      </div>
      {points && (
        <ul className={cn('mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-ink-2', centered && 'justify-center')}>
          {points.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <Icon name="circle-check" size={18} className={t.text} />
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <section aria-labelledby="page-heading" className={cn('relative overflow-hidden pb-14 pt-6 sm:pb-20 lg:pb-24', className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className={cn('absolute -top-40 size-[620px] rounded-full bg-gradient-to-br blur-3xl', t.glow, centered ? 'left-1/2 -translate-x-1/2' : layout === 'split' ? '-right-40' : '-left-40')} />
        <div className="bg-grid absolute inset-0 opacity-60" />
      </div>
      <Container className="relative">
        <Breadcrumbs items={crumbs} className="mb-8 sm:mb-10" />
        {centered ? (
          <>
            {copy}
            {visual && <div className="relative mx-auto mt-12 max-w-5xl sm:mt-16">{visual}</div>}
          </>
        ) : (
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            <div className={cn(layout === 'split-reverse' && 'lg:order-2')}>{copy}</div>
            {visual && <div className={cn('relative min-w-0', layout === 'split-reverse' && 'lg:order-1')}>{visual}</div>}
          </div>
        )}
      </Container>
    </section>
  )
}
