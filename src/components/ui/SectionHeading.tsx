import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'

interface SectionHeadingProps {
  eyebrow?: string
  eyebrowTone?: Parameters<typeof Eyebrow>[0]['tone']
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  id?: string
  className?: string
  /** Heading level to render. Pages already own the H1, so sections default to h2. */
  as?: 'h2' | 'h3'
}

export function SectionHeading({ eyebrow, eyebrowTone, title, lead, align = 'center', id, className, as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <Tag id={id} className={cn('h2-xl', eyebrow && 'mt-4')}>
        {title}
      </Tag>
      {lead && <p className={cn('lead mt-4', align === 'center' && 'mx-auto max-w-2xl')}>{lead}</p>}
    </div>
  )
}
