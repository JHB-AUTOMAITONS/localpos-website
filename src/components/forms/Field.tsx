import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'

interface FieldShellProps {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode
  className?: string
}

/** Label, hint and error message wired to a control with the right ARIA attributes. */
function FieldShell({ label, required, hint, error, children, className }: FieldShellProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errId = error ? `${id}-err` : undefined
  const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.9rem] font-semibold text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-coral-700" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-[0.8rem] font-normal text-ink-3">(optional)</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="mt-0.5 text-[0.82rem] text-ink-3">
          {hint}
        </p>
      )}
      <div className="mt-1.5">{children({ id, describedBy, invalid: !!error })}</div>
      {error && (
        <p id={errId} className="mt-1.5 flex items-start gap-1.5 text-[0.86rem] font-medium text-coral-700">
          <Icon name="alert" size={15} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

const control =
  'block w-full rounded-xl border bg-white px-4 text-[1rem] text-ink placeholder:text-ink-3 transition focus:outline-none focus:ring-4 disabled:opacity-60'
const ok = 'border-line-strong focus:border-brand-500 focus:ring-brand-100'
const bad = 'border-coral-500 focus:border-coral-500 focus:ring-coral-100'

type Common = { label: string; required?: boolean; hint?: string; error?: string; wrapperClassName?: string }

export function TextField({ label, required, hint, error, wrapperClassName, className, ...rest }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell label={label} required={required} hint={hint} error={error} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <input id={id} aria-describedby={describedBy} aria-invalid={invalid || undefined} aria-required={required || undefined} className={cn(control, 'h-12', invalid ? bad : ok, className)} {...rest} />
      )}
    </FieldShell>
  )
}

export function SelectField({ label, required, hint, error, wrapperClassName, className, children, ...rest }: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell label={label} required={required} hint={hint} error={error} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <select id={id} aria-describedby={describedBy} aria-invalid={invalid || undefined} aria-required={required || undefined} className={cn(control, 'h-12 appearance-none pr-11', invalid ? bad : ok, className)} {...rest}>
            {children}
          </select>
          <Icon name="chevron-down" size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-3" />
        </div>
      )}
    </FieldShell>
  )
}

export function TextAreaField({ label, required, hint, error, wrapperClassName, className, ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell label={label} required={required} hint={hint} error={error} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <textarea id={id} aria-describedby={describedBy} aria-invalid={invalid || undefined} aria-required={required || undefined} className={cn(control, 'min-h-[7.5rem] py-3', invalid ? bad : ok, className)} {...rest} />
      )}
    </FieldShell>
  )
}
