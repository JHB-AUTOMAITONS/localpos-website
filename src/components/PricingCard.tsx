import { Icon } from '@/components/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import { MONTHS_FREE, MONTHLY_PRICE, YEARLY_AT_MONTHLY_RATE, YEARLY_SAVINGS, type Plan } from '@/data/pricing'
import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'

export type Period = 'monthly' | 'yearly'

/** The LocalPOS plan for the selected billing period. Yearly is styled as the better-value option. */
export function PricingCard({ plan, period }: { plan: Plan; period: Period }) {
  const yearly = period === 'yearly'
  const price = plan.price[period]
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        'relative flex h-full flex-col rounded-[26px] border bg-white p-7 sm:p-9',
        yearly ? 'border-brand-400 shadow-float ring-4 ring-brand-100' : 'border-line shadow-card',
      )}
    >
      {yearly && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-600 px-4 py-1 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white shadow-card">
          Best value
        </span>
      )}
      <h3 id={`plan-${plan.id}`} className="font-display text-[1.5rem] font-bold tracking-[-0.02em] text-ink">
        {plan.name} <span className="text-ink-3">· {yearly ? 'Yearly' : 'Monthly'}</span>
      </h3>
      <p className="mt-1.5 text-[0.97rem] text-ink-2">{plan.audience}</p>

      <div className="mt-5 border-y border-dashed border-line-strong py-5" aria-live="polite">
        <div className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="tnum font-display text-[2.8rem] font-bold leading-none text-ink">{rupees(price)}</span>
          <span className="text-[1rem] text-ink-3">/ {yearly ? 'year' : 'month'}</span>
        </div>
        {yearly ? (
          <>
            <p className="mt-2 text-[0.92rem] text-ink-3">
              Monthly billing would be <s>{rupees(YEARLY_AT_MONTHLY_RATE)}</s> a year ({rupees(MONTHLY_PRICE)} × 12).
            </p>
            <p className="mt-3 inline-flex items-start gap-2 rounded-xl bg-brand-50 px-3.5 py-2.5 text-[0.95rem] font-semibold text-brand-700">
              <Icon name="check" size={18} strokeWidth={3} className="mt-0.5 shrink-0" />
              <span>
                Save {rupees(YEARLY_SAVINGS)} annually — Get approximately {MONTHS_FREE} months free!
              </span>
            </p>
          </>
        ) : (
          <p className="mt-2 text-[0.92rem] text-ink-3">Billed monthly. Switch to yearly to save {rupees(YEARLY_SAVINGS)} a year.</p>
        )}
      </div>

      <ul className="mt-6 grid flex-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[0.97rem] text-ink">
            <span className={cn('mt-0.5 grid size-5 shrink-0 place-items-center rounded-full', yearly ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700')}>
              <Icon name="check" size={12} strokeWidth={3.2} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <CTAButton to="/book-a-demo/" size="lg" variant={yearly ? 'primary' : 'secondary'} arrow={yearly} className="mt-8 w-full">
        {yearly ? 'Book a Demo — Go Yearly' : 'Book a Demo'}
      </CTAButton>
    </article>
  )
}
