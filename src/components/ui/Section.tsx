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
      // content-visibility lets the browser skip layout and paint for sections far below the fold until they are near the viewport.
      className={cn('relative [contain-intrinsic-size:auto_700px] [content-visibility:auto]', compact ? 'py-12 sm:py-14' : 'py-14 sm:py-[4.5rem] lg:py-24', TONES[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
