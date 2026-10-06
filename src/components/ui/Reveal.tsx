import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

type RevealState = 'initial' | 'pending' | 'shown'

type Callback = () => void
let observer: IntersectionObserver | null = null
const callbacks = new WeakMap<Element, Callback>()

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            callbacks.get(entry.target)?.()
            observer?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
  }
  return observer
}

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger in milliseconds. */
  delay?: number
  as?: ElementType
}

/**
 * Fade-up on scroll. The server markup is fully visible (good for SEO and no-JS);
 * after hydration, elements that start below the fold are hidden and revealed
 * when scrolled into view. Elements already in view never animate, so there is no flash.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState<RevealState>('initial')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92) return // already visible: leave as is
    setState('pending')
    const obs = getObserver()
    callbacks.set(el, () => setState('shown'))
    obs.observe(el)
    return () => obs.unobserve(el)
  }, [])

  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined
  return (
    <Tag ref={ref} className={className} style={style} data-reveal={state === 'initial' ? undefined : state}>
      {children}
    </Tag>
  )
}
