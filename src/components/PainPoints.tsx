import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Tint } from '@/data/types'
import { cn } from '@/lib/cn'

interface PainPointsProps {
  id: string
  title: string
  lead?: string
  points: Array<{ title: string; body: string }>
  tint?: Tint
  /** notes: tilted paper notes. grid: plain cards with a cross icon. */
  variant?: 'notes' | 'grid'
  tone?: 'paper' | 'soft' | 'white'
}

const NOTE_COLOURS = ['bg-gold-100 border-gold-200', 'bg-coral-50 border-coral-100', 'bg-sky-50 border-sky-100', 'bg-violet-50 border-violet-100']
const TILTS = ['-rotate-[1.2deg]', 'rotate-[1deg]', 'rotate-[0.8deg]', '-rotate-[0.9deg]']

/** The day-to-day problems of one business type, before LocalPOS. */
export function PainPointsSection({ id, title, lead, points, variant = 'grid', tone = 'paper' }: PainPointsProps) {
  return (
    <Section tone={tone} labelledBy={id}>
      <SectionHeading id={id} eyebrow="Sound familiar?" eyebrowTone="coral" title={title} lead={lead} />
      <ul className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
        {points.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 2) * 80} className="h-full">
              {variant === 'notes' ? (
                <div className={cn('relative h-full rounded-md border p-6 shadow-card transition duration-300 hover:rotate-0', NOTE_COLOURS[i % NOTE_COLOURS.length], TILTS[i % TILTS.length])}>
                  <span aria-hidden="true" className="absolute left-1/2 top-[-9px] h-4 w-14 -translate-x-1/2 rotate-[-2deg] rounded-sm bg-white/70 shadow-sm ring-1 ring-black/5" />
                  <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{p.title}</h3>
                  <p className="mt-2 text-ink-2">{p.body}</p>
                </div>
              ) : (
                <div className="flex h-full gap-4 rounded-[20px] border border-line bg-white p-6 shadow-card">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-coral-100 text-coral-700">
                    <Icon name="close" size={16} strokeWidth={2.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-ink-2">{p.body}</p>
                  </div>
                </div>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
