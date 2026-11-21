import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'

/** Compact form controls for the tools. (components/forms/Field.tsx is for the lead forms: taller, with required/optional markers.) */
const control = 'block w-full rounded-lg border border-line-strong bg-white px-3 text-[0.9688rem] text-ink placeholder:text-ink-3 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100'
const labelClass = 'block text-[0.86rem] font-semibold text-ink'

interface Common {
  label: string
  hint?: string
  error?: string
  wrapperClassName?: string
}

function Shell({ label, hint, error, wrapperClassName, children }: Common & { children: (p: { id: string; describedBy?: string }) => ReactNode }) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errId = error ? `${id}-err` : undefined
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="mt-1">{children({ id, describedBy: [hintId, errId].filter(Boolean).join(' ') || undefined })}</div>
      {hint && !error && (
        <p id={hintId} className="mt-1 text-[0.8rem] leading-snug text-ink-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} className="mt-1 text-[0.82rem] font-medium leading-snug text-coral-700">
          {error}
        </p>
      )}
    </div>
  )
}

export function ToolInput({ label, hint, error, wrapperClassName, className, ...rest }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Shell label={label} hint={hint} error={error} wrapperClassName={wrapperClassName}>
      {({ id, describedBy }) => <input id={id} aria-describedby={describedBy} aria-invalid={error ? true : undefined} className={cn(control, 'h-11', error && 'border-coral-500', className)} {...rest} />}
    </Shell>
  )
}

export function ToolSelect({ label, hint, error, wrapperClassName, className, children, ...rest }: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Shell label={label} hint={hint} error={error} wrapperClassName={wrapperClassName}>
      {({ id, describedBy }) => (
        <div className="relative">
          <select id={id} aria-describedby={describedBy} className={cn(control, 'h-11 appearance-none pr-9', className)} {...rest}>
            {children}
          </select>
          <Icon name="chevron-down" size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-3" />
        </div>
      )}
    </Shell>
  )
}

export function ToolTextArea({ label, hint, error, wrapperClassName, className, ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Shell label={label} hint={hint} error={error} wrapperClassName={wrapperClassName}>
      {({ id, describedBy }) => <textarea id={id} aria-describedby={describedBy} className={cn(control, 'min-h-[4.75rem] py-2', className)} {...rest} />}
    </Shell>
  )
}

/** A row of mutually exclusive choices, as pressed/unpressed buttons. */
export function Choice<T extends string>({ label, value, options, onChange, className }: { label: string; value: T; options: Array<{ value: T; label: string }>; onChange: (v: T) => void; className?: string }) {
  return (
    <div className={className}>
      <span className={labelClass}>{label}</span>
      <div role="group" aria-label={label} className="mt-1 flex flex-wrap gap-1 rounded-xl border border-line bg-paper p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={o.value === value}
            onClick={() => onChange(o.value)}
            className={cn('min-h-10 flex-1 whitespace-nowrap rounded-lg px-3 text-[0.9375rem] font-semibold transition-colors', o.value === value ? 'bg-brand-700 text-white' : 'text-ink-2 hover:bg-brand-50')}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/** A titled group of fields inside a tool. Uses a fieldset so the group name is announced with its fields. */
export function FieldGroup({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <fieldset className={cn('min-w-0 rounded-2xl border border-line bg-paper p-4 sm:p-5', className)}>
      <legend className="float-left mb-3 w-full font-display text-[1.05rem] font-semibold text-ink">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  )
}
