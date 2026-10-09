import { cn } from '@/lib/cn'
import type { Step, Tint } from '@/data/types'
import { TINTS } from '@/lib/tint'
import { Reveal } from '@/components/ui/Reveal'

interface StepListProps {
  steps: Step[]
  variant?: 'rail' | 'receipt' | 'cards' | 'stack'
  tint?: Tint
  className?: string
}

/**
 * A real sequence, shown four ways so different pages can tell the story differently:
 * rail (connected dots), receipt (printed slip), cards (big numerals) and stack (vertical timeline).
 */
export function StepList({ steps, variant = 'rail', tint = 'brand', className }: StepListProps) {
  const t = TINTS[tint]

  if (variant === 'receipt') {
    return (
      <div className={cn('mx-auto w-full max-w-xl', className)}>
        <div className="receipt rounded-t-2xl px-6 pb-8 pt-7 font-mono sm:px-9">
          <div className="text-center text-[0.72rem] font-bold uppercase tracking-[0.25em] text-ink-3">— Steps —</div>
          <ol className="mt-5">
            {steps.map((s, i) => (
              <li key={s.title} className={cn('py-4', i > 0 && 'perforation')}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[0.95rem] font-bold text-ink">{s.title}</span>
                  <span className="text-[0.8rem] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-1 font-sans text-[0.95rem] leading-relaxed text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

  if (variant === 'cards') {
    return (
      <ol className={cn('grid gap-4 sm:grid-cols-2', className)}>
        {steps.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={i * 70} className="relative h-full overflow-hidden rounded-[20px] border border-line bg-white p-6 shadow-card">
              <span aria-hidden="true" className={cn('absolute -right-2 -top-6 font-display text-[7rem] font-extrabold leading-none opacity-[0.12]', t.text)}>
                {i + 1}
              </span>
              <h3 className="relative pr-12 font-display text-[1.2rem] font-semibold text-ink">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="relative mt-2 text-ink-2">{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    )
  }

  if (variant === 'stack') {
    return (
      <ol className={cn('relative space-y-8 border-l-2 border-dashed border-line-strong pl-8', className)}>
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span className={cn('absolute -left-[3.05rem] top-0 grid size-9 place-items-center rounded-full border-4 border-paper font-display text-[0.95rem] font-bold', t.tile)}>
              {i + 1}
            </span>
            <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{s.title}</h3>
            <p className="mt-1.5 text-ink-2">{s.body}</p>
          </li>
        ))}
      </ol>
    )
  }

  // rail
  return (
    <ol className={cn('relative grid gap-8 sm:grid-cols-2 lg:gap-6', steps.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4', className)}>
      <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden border-t-2 border-dashed border-line-strong lg:block" />
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <span className={cn('relative grid size-10 place-items-center rounded-full border-4 border-paper font-display text-[1rem] font-bold shadow-card', t.tile)}>{i + 1}</span>
          <h3 className="mt-4 font-display text-[1.2rem] font-semibold leading-tight text-ink">{s.title}</h3>
          <p className="mt-1.5 text-ink-2">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}
