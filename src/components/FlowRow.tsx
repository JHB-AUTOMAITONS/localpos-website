import { Icon, type IconName } from '@/components/Icon'
import { Reveal } from '@/components/ui/Reveal'
import type { Tint } from '@/data/types'
import { cn } from '@/lib/cn'
import { TINTS } from '@/lib/tint'

export interface FlowNode {
  icon: IconName
  title: string
  text: string
}

/** An icon-led process diagram: horizontal on wide screens, a vertical track on narrow ones. */
export function FlowRow({ nodes, tint = 'brand', className }: { nodes: FlowNode[]; tint?: Tint; className?: string }) {
  const t = TINTS[tint]
  return (
    <ol className={cn('relative grid gap-8 sm:grid-cols-2 lg:gap-6', nodes.length === 5 ? 'lg:grid-cols-5' : nodes.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4', className)}>
      <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-8 hidden border-t-2 border-dashed border-line-strong lg:block" />
      {nodes.map((n, i) => (
        <li key={n.title} className="relative text-left lg:text-center">
          <Reveal delay={i * 80} className="flex items-start gap-4 lg:flex-col lg:items-center lg:gap-0">
            <span className={cn('relative grid size-16 shrink-0 place-items-center rounded-2xl border-4 border-paper shadow-card', t.tile)}>
              <Icon name={n.icon} size={26} />
              <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-ink text-[0.72rem] font-bold text-paper">{i + 1}</span>
            </span>
            <div className="lg:mt-4">
              <h3 className="font-display text-[1.15rem] font-semibold leading-tight text-ink">{n.title}</h3>
              <p className="mt-1.5 text-[0.95rem] text-ink-2 lg:mx-auto lg:max-w-[16rem]">{n.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
