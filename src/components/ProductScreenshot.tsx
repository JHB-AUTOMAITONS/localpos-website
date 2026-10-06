import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ProductScreenshotProps {
  /** Describes the screen for assistive tech and search engines. Treated like an image's alt text. */
  alt: string
  children: ReactNode
  className?: string
}

/**
 * Wraps an HTML/CSS product mockup so it behaves like an image: exposed once as role="img"
 * with an accessible name, with its decorative sample text hidden from assistive tech.
 */
export function ProductScreenshot({ alt, children, className }: ProductScreenshotProps) {
  return (
    <figure role="img" aria-label={alt} className={cn('m-0', className)}>
      <div aria-hidden="true">{children}</div>
    </figure>
  )
}
