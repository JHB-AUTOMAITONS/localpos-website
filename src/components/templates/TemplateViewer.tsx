import { useState } from 'react'
import { cn } from '@/lib/cn'
import { DocActions } from './DocActions'
import { DocSheet } from './DocSheet'
import { blankDoc, type TemplateDoc } from './types'

const toggle = 'min-h-10 rounded-lg px-3.5 text-[0.9375rem] font-semibold transition-colors'
const on = 'bg-brand-700 text-white'
const off = 'text-ink-2 hover:bg-brand-50'

/**
 * Shows one or more ready-made document templates with sample values, and lets the visitor print them or download them
 * as Excel and Word files, filled with the sample or blank. Every template is in the page HTML; only the chosen one is shown.
 */
export function TemplateViewer({ templates }: { templates: TemplateDoc[] }) {
  const [active, setActive] = useState(templates[0].id)
  const [blank, setBlank] = useState(false)
  const current = templates.find((t) => t.id === active) ?? templates[0]
  const shown = blank ? blankDoc(current) : current

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {templates.length > 1 && (
          <div role="group" aria-label="Choose a template" className="flex flex-wrap gap-1 rounded-xl border border-line bg-paper p-1">
            {templates.map((t) => (
              <button key={t.id} type="button" aria-pressed={t.id === current.id} onClick={() => setActive(t.id)} className={cn(toggle, t.id === current.id ? on : off)}>
                {t.name}
              </button>
            ))}
          </div>
        )}
        <div role="group" aria-label="Sample values or blank" className="flex gap-1 rounded-xl border border-line bg-paper p-1">
          <button type="button" aria-pressed={!blank} onClick={() => setBlank(false)} className={cn(toggle, !blank ? on : off)}>
            With sample
          </button>
          <button type="button" aria-pressed={blank} onClick={() => setBlank(true)} className={cn(toggle, blank ? on : off)}>
            Blank
          </button>
        </div>
      </div>

      {templates.map((t) => {
        const isCurrent = t.id === current.id
        return (
          <div key={t.id} hidden={!isCurrent} className="mt-5">
            <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{t.name}</h3>
            <p className="mt-1 max-w-3xl text-[0.98rem] text-ink-2">{t.description}</p>
            {isCurrent && <DocActions doc={shown} className="mt-4" />}
            {/* Every template is in the HTML so it can be read without choosing its tab; only the chosen sheet is the print area. */}
            <DocSheet doc={isCurrent ? shown : t} printArea={isCurrent} className="mx-auto mt-2 max-w-[52rem]" />
          </div>
        )
      })}
      <p className="mt-4 max-w-3xl text-[0.9rem] text-ink-3">
        The names, numbers and amounts shown are sample values. The Excel and Word files are created in your browser, so nothing is uploaded. To get a PDF, choose
        Print and pick &ldquo;Save as PDF&rdquo; as the printer.
      </p>
    </div>
  )
}
