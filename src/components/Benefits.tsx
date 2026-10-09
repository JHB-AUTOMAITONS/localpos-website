import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Benefit, Tint } from '@/data/types'
import { cn } from '@/lib/cn'
import { TINTS } from '@/lib/tint'

export type BenefitsVariant = 'cards' | 'bento' | 'rows' | 'split'

interface BenefitsSectionProps {
  /** H2. The page's primary keyword belongs here. */
  title: string
  lead?: string
  eyebrow?: string
  benefits: Benefit[]
  tint?: Tint
  variant?: BenefitsVariant
  tone?: 'paper' | 'soft' | 'white'
  id: string
}

/** Benefits shown four ways so feature pages do not all read as the same grid of cards. */
/**
 * Column span (in a 6-column grid) for item `i` of `n` in the bento layout, so every row is full.
 * The first two items are wide. The rest fill rows of three (span 2) or two (span 3), whichever divides evenly.
 */
function bentoSpan(i: number, n: number): string {
  if (i < 2) return 'md:col-span-3'
  const rest = n - 2
  const r = rest % 3
  if (r === 0) return 'md:col-span-2'
  const k = i - 2
  if (r === 2) return k < rest - 2 ? 'md:col-span-2' : 'md:col-span-3'
  // r === 1
  if (rest === 1) return 'md:col-span-6'
  return k < rest - 4 ? 'md:col-span-2' : 'md:col-span-3'
}

export function BenefitsSection({ title, lead, eyebrow = 'What you get', benefits, tint = 'brand', variant = 'cards', tone = 'paper', id }: BenefitsSectionProps) {
  const t = TINTS[tint]

  if (variant === 'split') {
    return (
      <Section tone={tone} labelledBy={id}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading id={id} eyebrow={eyebrow} eyebrowTone={tint} title={title} lead={lead} align="left" />
          </div>
          <ul className="divide-y divide-line">
            {benefits.map((b, i) => (
              <li key={b.title} className="py-6 first:pt-0">
                <Reveal delay={i * 50} className="flex gap-4 sm:gap-5">
                  <span className={cn('grid size-11 shrink-0 place-items-center rounded-xl', t.tile)}>
                    <Icon name={b.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{b.title}</h3>
                    <p className="mt-1.5 text-ink-2">{b.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    )
  }

  return (
    <Section tone={tone} labelledBy={id}>
      <SectionHeading id={id} eyebrow={eyebrow} eyebrowTone={tint} title={title} lead={lead} />

      {variant === 'rows' && (
        <ul className="mx-auto mt-12 grid max-w-5xl gap-x-12 gap-y-9 md:grid-cols-2">
          {benefits.map((b, i) => (
            <li key={b.title}>
              <Reveal delay={(i % 2) * 70} className="flex gap-4">
                <span className={cn('grid size-11 shrink-0 place-items-center rounded-full', t.tile)}>
                  <Icon name={b.icon} size={21} />
                </span>
                <div className="border-b border-line pb-8">
                  <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{b.title}</h3>
                  <p className="mt-1.5 text-ink-2">{b.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      )}

      {variant === 'bento' && (
        <ul className="mt-12 grid gap-4 md:grid-cols-6">
          {benefits.map((b, i) => {
            const big = i < 2
            return (
              <li key={b.title} className={bentoSpan(i, benefits.length)}>
                <Reveal delay={i * 60} className="h-full">
                  <div className={cn('relative h-full overflow-hidden rounded-[22px] border p-6 sm:p-7', big ? `${t.soft} ${t.border}` : 'border-line bg-white shadow-card')}>
                    {big && <div aria-hidden="true" className={cn('absolute -right-10 -top-10 size-44 rounded-full bg-gradient-to-br opacity-80 blur-2xl', t.glow)} />}
                    <span className={cn('relative grid place-items-center rounded-xl', big ? 'size-12' : 'size-10', t.tile)}>
                      <Icon name={b.icon} size={big ? 24 : 20} />
                    </span>
                    <h3 className={cn('relative mt-4 font-display font-semibold leading-tight text-ink', big ? 'text-[1.45rem]' : 'text-[1.15rem]')}>{b.title}</h3>
                    <p className={cn('relative mt-2 text-ink-2', big && 'max-w-md text-[1.0625rem]')}>{b.body}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      )}

      {variant === 'cards' && (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <li key={b.title}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <div className="h-full rounded-[22px] border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                  <span className={cn('grid size-11 place-items-center rounded-xl', t.tile)}>
                    <Icon name={b.icon} size={22} />
                  </span>
                  <h3 className="mt-4 font-display text-[1.2rem] font-semibold leading-tight text-ink">{b.title}</h3>
                  <p className="mt-2 text-ink-2">{b.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
