import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Icon } from '@/components/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import { cn } from '@/lib/cn'
import { submitLead, type LeadValues } from '@/lib/forms'
import { SelectField, TextAreaField, TextField } from './Field'

export interface FieldDef {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  required?: boolean
  hint?: string
  placeholder?: string
  autoComplete?: string
  options?: string[]
  /** Return an error message, or '' when the value is fine. */
  validate?: (value: string) => string
  /** Span both columns on wide forms. */
  wide?: boolean
  /** Hard limit on what can be typed (and therefore sent). */
  maxLength?: number
  /** Message shown when a required field is left empty. */
  requiredMessage?: string
}

interface LeadFormProps {
  kind: 'book-a-demo' | 'contact-us'
  fields: FieldDef[]
  submitLabel: string
  successTitle: string
  successText: string
  className?: string
}

/** Accessible lead form: inline validation, focus on the first error, and a clear success or failure state. */
export function LeadForm({ kind, fields, submitLabel, successTitle, successText, className }: LeadFormProps) {
  const [values, setValues] = useState<LeadValues>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')
  const [preview, setPreview] = useState(false)
  const [failure, setFailure] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  // A synchronous guard: state updates are asynchronous, so a fast double click or double Enter could otherwise slip through.
  const inFlight = useRef(false)

  // Move focus to the confirmation when the form is replaced by it, so keyboard and screen-reader users are not left on nothing.
  useEffect(() => {
    if (status === 'done') successRef.current?.focus()
  }, [status])

  const check = (f: FieldDef, v: string) =>
    f.required && !v.trim() ? (f.requiredMessage ?? (f.type === 'select' ? 'Choose an option.' : 'Fill in this field.')) : v.trim() && f.validate ? f.validate(v) : ''

  const set = (name: string, v: string) => setValues((s) => ({ ...s, [name]: v }))
  const blur = (f: FieldDef) => setErrors((e) => ({ ...e, [f.name]: check(f, values[f.name] ?? '') }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (inFlight.current) return
    const next: Record<string, string> = {}
    for (const f of fields) next[f.name] = check(f, values[f.name] ?? '')
    setErrors(next)
    const firstBad = fields.find((f) => next[f.name])
    if (firstBad) {
      ;(formRef.current?.elements.namedItem(firstBad.name) as HTMLElement | null)?.focus()
      return
    }
    // Honeypot: real people never see or fill this field.
    if ((formRef.current?.elements.namedItem('website') as HTMLInputElement | null)?.value) {
      setStatus('done')
      return
    }
    inFlight.current = true
    setStatus('sending')
    try {
      const result = await submitLead(kind, values)
      if (result.ok) {
        setPreview(result.preview)
        setStatus('done')
      } else {
        setFailure(result.error)
        setStatus('failed')
        inFlight.current = false // allow a retry
      }
    } catch {
      setFailure('Something went wrong while sending. Please try again.')
      setStatus('failed')
      inFlight.current = false
    }
  }

  if (status === 'done') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className={cn('rounded-[24px] border border-brand-200 bg-brand-50 p-8 text-center outline-none sm:p-10', className)}>
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-600 text-white">
          <Icon name="check" size={28} strokeWidth={3} />
        </span>
        <h3 className="h3-lg mt-5">{successTitle}</h3>
        <p className="mx-auto mt-2 max-w-md text-ink-2">{successText}</p>
        {preview && (
          <p className="mx-auto mt-5 max-w-md rounded-xl border border-dashed border-gold-300 bg-gold-50 px-4 py-3 text-left text-[0.88rem] text-gold-800">
            Preview mode: no form endpoint is configured on this site yet, so nothing was sent. Set VITE_LEAD_ENDPOINT to receive submissions.
          </p>
        )}
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <CTAButton to="/" variant="secondary">
            Back to home
          </CTAButton>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={cn('@container', className)} aria-describedby={status === 'failed' ? 'form-failure' : undefined}>
      <div className="grid gap-x-5 gap-y-5 @md:grid-cols-2">
        {fields.map((f) => {
          const common = {
            name: f.name,
            label: f.label,
            required: f.required,
            hint: f.hint,
            error: errors[f.name],
            wrapperClassName: f.wide || f.type === 'textarea' ? '@md:col-span-2' : undefined,
            value: values[f.name] ?? '',
            onBlur: () => blur(f),
          }
          if (f.type === 'select') {
            return (
              <SelectField key={f.name} {...common} autoComplete={f.autoComplete} onChange={(e) => set(f.name, e.target.value)}>
                <option value="">Select…</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </SelectField>
            )
          }
          if (f.type === 'textarea') {
            return <TextAreaField key={f.name} {...common} placeholder={f.placeholder} maxLength={f.maxLength} onChange={(e) => set(f.name, e.target.value)} />
          }
          return (
            <TextField
              key={f.name}
              {...common}
              type={f.type}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
              maxLength={f.maxLength}
              inputMode={f.type === 'tel' ? 'tel' : undefined}
              onChange={(e) => set(f.name, e.target.value)}
            />
          )
        })}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'failed' && (
        <p id="form-failure" role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-coral-100 bg-coral-50 px-4 py-3 text-[0.92rem] font-medium text-coral-700">
          <Icon name="alert" size={18} className="mt-0.5 shrink-0" />
          {failure}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 @lg:flex-row @lg:items-center">
        {/* Keep focus where it is on press. Otherwise the field being left re-validates on blur, its error line disappears, the
            button moves up between mouse-down and mouse-up, and the click lands on the card behind it (the first click is lost). */}
        <CTAButton type="submit" size="lg" arrow disabled={status === 'sending'} className="w-full @lg:w-auto" onMouseDown={(e) => e.preventDefault()}>
          {status === 'sending' ? 'Sending…' : submitLabel}
        </CTAButton>
        <p className="text-[0.85rem] text-ink-3">
          We use your details only to reply to this request. Read our{' '}
          <Link to="/privacy-policy/" className="font-medium text-brand-700 underline underline-offset-2">
            privacy policy
          </Link>
          . Fields marked * are required.
        </p>
      </div>
    </form>
  )
}
