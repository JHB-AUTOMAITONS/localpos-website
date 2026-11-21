import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@/components/Icon'
import { DocActions } from '@/components/templates/DocActions'
import { DocSheet } from '@/components/templates/DocSheet'
import { CTAButton } from '@/components/ui/CTAButton'
import { money } from '@/lib/money'
import { Choice, FieldGroup, ToolInput, ToolSelect, ToolTextArea } from './controls'
import { DOC_CONFIGS, MAX_ITEMS, blankState, buildDocument, computeTotals, sampleState, type DocKind, type DocState, type Item, type TaxMode } from './docBuilder'

export type { DocKind }

const GST_RATES = ['0', '0.25', '3', '5', '12', '18', '28', '40']
const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/**
 * One form for invoices, quotations, proforma invoices and purchase orders, with a live preview beside it.
 * Everything stays in this component's state: nothing is stored or sent anywhere. The calculation is in docBuilder.ts.
 */
export function DocumentBuilder({ kind }: { kind: DocKind }) {
  const c = DOC_CONFIGS[kind]
  const [state, setState] = useState<DocState>(() => sampleState(kind))
  const doc = useMemo(() => buildDocument(kind, state), [kind, state])
  const totals = useMemo(() => computeTotals(state), [state])

  // The date is filled in after the page loads, so the prerendered HTML does not carry the build date.
  useEffect(() => {
    setState((s) => (s.f.date ? s : { ...s, f: { ...s.f, date: today() } }))
  }, [])

  const set = (key: string, value: string) => setState((s) => ({ ...s, f: { ...s.f, [key]: value } }))
  const field = (key: string) => ({ value: state.f[key] ?? '', onChange: (e: { target: { value: string } }) => set(key, e.target.value) })
  const setItem = (id: number, patch: Partial<Item>) => setState((s) => ({ ...s, items: s.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) }))
  const addItem = () => setState((s) => (s.items.length >= MAX_ITEMS ? s : { ...s, items: [...s.items, { id: Math.max(0, ...s.items.map((i) => i.id)) + 1, desc: '', hsn: '', qty: '1', rate: '', disc: '0', gst: s.items.at(-1)?.gst ?? '18' }] }))
  const removeItem = (id: number) => setState((s) => (s.items.length <= 1 ? s : { ...s, items: s.items.filter((it) => it.id !== id) }))

  return (
    <div className="grid gap-7 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3">
          <p className="text-[0.92rem] text-ink-2">The form starts with sample details so you can see the result.</p>
          <CTAButton size="sm" variant="secondary" onClick={() => setState({ ...blankState(kind), f: { ...blankState(kind).f, date: today() } })}>
            Clear the form
          </CTAButton>
        </div>

        <FieldGroup title={c.usTitle}>
          <div className="grid gap-3 sm:grid-cols-2">
            <ToolInput label="Business name" autoComplete="organization" {...field('us.name')} />
            <ToolInput label="GSTIN" hint="Leave empty if you are not registered." {...field('us.gstin')} />
            <ToolInput label="Address" wrapperClassName="sm:col-span-2" {...field('us.address')} />
            <ToolInput label="Phone" inputMode="tel" {...field('us.phone')} />
            <ToolInput label="Email" inputMode="email" {...field('us.email')} />
          </div>
        </FieldGroup>

        <FieldGroup title={c.themTitle}>
          <div className="grid gap-3 sm:grid-cols-2">
            <ToolInput label="Name" {...field('them.name')} />
            <ToolInput label="GSTIN" {...field('them.gstin')} />
            <ToolInput label="Address" wrapperClassName="sm:col-span-2" {...field('them.address')} />
            <ToolInput label="Phone" inputMode="tel" {...field('them.phone')} />
          </div>
        </FieldGroup>

        <FieldGroup title={c.detailsHeading}>
          <div className="grid gap-3 sm:grid-cols-2">
            <ToolInput label={c.numberLabel} {...field('number')} />
            <ToolInput label={c.dateLabel} type="date" {...field('date')} />
            {c.extras.map((e) =>
              e.type === 'textarea' ? (
                <ToolTextArea key={e.key} label={e.label} wrapperClassName="sm:col-span-2" {...field(e.key)} />
              ) : (
                <ToolInput key={e.key} label={e.label} type={e.type} placeholder={e.placeholder} wrapperClassName={e.group === 'text' || e.key === 'shipTo' || e.key === 'deliverTo' ? 'sm:col-span-2' : undefined} {...field(e.key)} />
              ),
            )}
          </div>
        </FieldGroup>

        <FieldGroup title="Items">
          <Choice<TaxMode>
            label="GST on this document"
            value={state.tax}
            onChange={(tax) => setState((s) => ({ ...s, tax }))}
            options={[
              { value: 'intra', label: 'CGST + SGST' },
              { value: 'inter', label: 'IGST' },
              { value: 'none', label: 'No GST' },
            ]}
          />
          <p className="mt-1.5 text-[0.82rem] text-ink-3">CGST + SGST for a party in your state, IGST for another state, No GST if you are not registered or are under the composition scheme.</p>

          <ol className="mt-4 space-y-3">
            {state.items.map((it, i) => (
              <li key={it.id} className="rounded-xl border border-line bg-white p-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-[0.86rem] font-bold text-ink-2">Item {i + 1}</span>
                  <span className="tnum text-[0.9rem] font-semibold text-ink">₹{money(totals.lines[i].total)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-6">
                  <ToolInput label="Description" wrapperClassName="col-span-2 sm:col-span-4" value={it.desc} onChange={(e) => setItem(it.id, { desc: e.target.value })} />
                  <ToolInput label="HSN/SAC" wrapperClassName="col-span-2" value={it.hsn} onChange={(e) => setItem(it.id, { hsn: e.target.value })} />
                  <ToolInput label="Quantity" inputMode="decimal" wrapperClassName="sm:col-span-1" value={it.qty} onChange={(e) => setItem(it.id, { qty: e.target.value })} />
                  <ToolInput label="Rate (₹)" inputMode="decimal" wrapperClassName="sm:col-span-2" value={it.rate} onChange={(e) => setItem(it.id, { rate: e.target.value })} />
                  <ToolInput label="Disc %" inputMode="decimal" wrapperClassName="sm:col-span-1" value={it.disc} onChange={(e) => setItem(it.id, { disc: e.target.value })} />
                  {state.tax !== 'none' && (
                    <ToolSelect label="GST %" wrapperClassName="sm:col-span-2" value={it.gst} onChange={(e) => setItem(it.id, { gst: e.target.value })}>
                      {GST_RATES.map((r) => (
                        <option key={r} value={r}>
                          {r}%
                        </option>
                      ))}
                    </ToolSelect>
                  )}
                </div>
                {state.items.length > 1 && (
                  <button type="button" onClick={() => removeItem(it.id)} className="mt-2.5 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-[0.88rem] font-semibold text-coral-700 hover:bg-coral-50">
                    <Icon name="minus" size={15} />
                    Remove item {i + 1}
                  </button>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <CTAButton size="sm" variant="secondary" onClick={addItem} disabled={state.items.length >= MAX_ITEMS}>
              <Icon name="plus" size={16} />
              Add item
            </CTAButton>
            <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 text-[0.92rem] text-ink-2">
              <input type="checkbox" className="size-5 accent-brand-600" checked={state.roundOff} onChange={(e) => setState((s) => ({ ...s, roundOff: e.target.checked }))} />
              Round the total to the nearest rupee
            </label>
          </div>
        </FieldGroup>

        <FieldGroup title="Terms and notes">
          <div className="grid gap-3">
            <ToolTextArea label="Terms and conditions" rows={3} {...field('terms')} />
            <ToolTextArea label="Notes" rows={2} placeholder="Anything else the reader should know" {...field('notes')} />
          </div>
        </FieldGroup>
      </form>

      <div className="xl:sticky xl:top-24 xl:self-start">
        <h3 className="font-display text-[1.15rem] font-semibold text-ink">Preview</h3>
        <DocActions doc={doc} className="mt-2" />
        <DocSheet doc={doc} />
        <p className="mt-3 text-[0.86rem] text-ink-3">Nothing you type is saved or sent anywhere. Download or print the document before you close this page.</p>
      </div>
    </div>
  )
}
