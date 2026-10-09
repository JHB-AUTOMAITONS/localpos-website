import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

type Tone = 'paper' | 'soft' | 'white' | 'brand' | 'ink'

const TONES: Record<Tone, string> = {
  paper: 'bg-paper',
  soft: 'bg-paper-2',
  white: 'bg-white',
  brand: 'bg-brand-950 text-brand-50',
  ink: 'bg-ink text-paper',
}

interface SectionProps {
  children: ReactNode
  tone?: Tone
  className?: string
  containerClassName?: string
  /** id of the heading that names this region (for landmark navigation). */
  labelledBy?: string
  id?: string
  /** Tighter vertical padding. */
  compact?: boolean
}

export function Section({ children, tone = 'paper', className, containerClassName, labelledBy, id, compact }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      // Deliberately NOT `content-visibility: auto`: its placeholder height is only an estimate, so a section's real height appears while
      // you scroll to it, and in-page links ("Explore Features") and keyboard focus land hundreds of pixels short of their target.
      className={cn('relative', compact ? 'py-12 sm:py-14' : 'py-14 sm:py-[4.5rem] lg:py-24', TONES[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
