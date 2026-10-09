import { Reveal } from '@/components/ui/Reveal'

export interface Stat {
  value: string
  label: string
}

/** A row of plain facts about the product. Only use numbers that are literally true. */
export function StatsSection({ stats, title, id = 'stats-heading' }: { stats: Stat[]; title: string; id?: string }) {
  return (
    <section aria-labelledby={id} className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <h2 id={id} className="sr-only">
          {title}
        </h2>
        <Reveal>
          <dl className="grid divide-y divide-dashed divide-line-strong overflow-hidden rounded-[24px] border border-line bg-white shadow-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col px-6 py-8 text-center">
                <dt className="order-2 mt-2 text-[0.95rem] font-medium text-ink-2">{s.label}</dt>
                <dd className="tnum font-display text-[3rem] font-bold leading-none tracking-[-0.03em] text-brand-700">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
