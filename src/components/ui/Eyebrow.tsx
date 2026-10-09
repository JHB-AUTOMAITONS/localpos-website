import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'gold' | 'brand' | 'coral' | 'sky' | 'violet' | 'ink'

const TONES: Record<Tone, string> = {
  gold: 'bg-gold-100 text-gold-800',
  brand: 'bg-brand-100 text-brand-800',
  coral: 'bg-coral-100 text-coral-700',
  sky: 'bg-sky-100 text-sky-700',
  violet: 'bg-violet-100 text-violet-700',
  ink: 'bg-ink text-paper',
}

/** Section label shaped like a price tag, with a punched hole. */
export function Eyebrow({ children, tone = 'gold', className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center rounded-l-[5px] rounded-r-[1.25rem] py-1 pl-6 pr-3.5 text-[0.75rem] font-bold uppercase leading-5 tracking-[0.08em]',
        TONES[tone],
        className,
      )}
    >
      <span aria-hidden="true" className="absolute left-2 top-1/2 size-2 -translate-y-1/2 rounded-full bg-paper ring-1 ring-black/10" />
      {children}
    </span>
  )
}
