import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Narrow reading width for prose pages. */
  narrow?: boolean
}

export function Container({ children, className, as: Tag = 'div', narrow }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', narrow ? 'max-w-[820px]' : 'max-w-[1240px]', className)}>
      {children}
    </Tag>
  )
}
