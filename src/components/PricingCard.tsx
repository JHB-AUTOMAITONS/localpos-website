import { Icon } from '@/components/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import type { Plan } from '@/data/pricing'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'

export type Period = 'monthly' | 'yearly'

/** One plan. Shows a clearly marked placeholder until a real price exists in data/pricing.ts. */
export function PricingCard({ plan, period }: { plan: Plan; period: Period }) {
  const price = plan.price[period]
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        'relative flex h-full flex-col rounded-[26px] border bg-white p-7 sm:p-8',
        plan.recommended ? 'border-brand-400 shadow-float ring-4 ring-brand-100 lg:-my-3 lg:py-10' : 'border-line shadow-card',
      )}
    >
      {plan.recommended && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-600 px-4 py-1 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white shadow-card">
          Recommended
        </span>
      )}
      <h3 id={`plan-${plan.id}`} className="font-display text-[1.5rem] font-bold tracking-[-0.02em] text-ink">
        {plan.name}
      </h3>
      <p className="mt-1.5 text-[0.97rem] text-ink-2 lg:min-h-[3.2rem]">{plan.audience}</p>

      <div className="mt-5 border-y border-dashed border-line-strong py-5">
        {price === null ? (
          <>
            <div className="font-display text-[1.7rem] font-bold leading-tight text-ink">Price to be announced</div>
            <span className="mt-2 inline-block rounded-full border border-dashed border-gold-300 bg-gold-50 px-3 py-0.5 text-[0.75rem] font-bold uppercase tracking-wide text-gold-800">Placeholder</span>
          </>
        ) : (
          <div className="flex items-baseline gap-1.5">
            <span className="tnum font-display text-[2.6rem] font-bold leading-none text-ink">{rupees(price)}</span>
            <span className="text-[0.95rem] text-ink-3">/ {period === 'monthly' ? 'month' : 'year'}</span>
          </div>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[0.97rem] text-ink">
            <span className={cn('mt-0.5 grid size-5 shrink-0 place-items-center rounded-full', plan.recommended ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700')}>
              <Icon name="check" size={12} strokeWidth={3.2} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <CTAButton to="/book-a-demo/" size="lg" variant={plan.recommended ? 'primary' : 'secondary'} arrow={plan.recommended} className="mt-8 w-full">
        Book a Demo
      </CTAButton>
    </article>
  )
}
