import { Icon, type IconName } from '@/components/Icon'
import type { Tint } from '@/data/types'
import { cn } from '@/lib/cn'
import { TINTS } from '@/lib/tint'
import { FloatCard } from '@/mockups/parts'

/** Small floating card used to annotate a hero visual. Decorative: hidden from assistive tech. */
export function FloatNote({ icon, title, text, tint = 'brand', className }: { icon: IconName; title: string; text?: string; tint?: Tint; className?: string }) {
  const t = TINTS[tint]
  return (
    <FloatCard aria-hidden className={cn('motion-safe:animate-fade-up flex items-center gap-2.5', className)}>
      <span className={cn('grid size-9 shrink-0 place-items-center rounded-full', t.tile)}>
        <Icon name={icon} size={17} />
      </span>
      <div className="min-w-0 text-[11.5px] leading-tight">
        <div className="font-bold text-ink">{title}</div>
        {text && <div className="tnum mt-0.5 text-ink-3">{text}</div>}
      </div>
    </FloatCard>
  )
}
