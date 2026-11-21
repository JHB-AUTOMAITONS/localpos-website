import { cn } from '@/lib/cn'
import type { Align, TemplateDoc } from './types'

const ALIGN: Record<Align, string> = { l: 'text-left', c: 'text-center', r: 'text-right' }

/**
 * A document drawn as a sheet of paper. The element carries data-print-area, so printing the page (or "Save as PDF") prints the sheet alone.
 * Text stays at 12px or larger: this is a real, readable document, not a decorative mockup.
 */
export function DocSheet({ doc, className, printArea = true }: { doc: TemplateDoc; className?: string; printArea?: boolean }) {
  return (
    <div data-print-area={printArea ? '' : undefined} className={cn('doc-sheet rounded-lg border border-line-strong bg-white p-4 text-[0.8125rem] leading-snug text-ink shadow-card sm:p-7', className)}>
      {doc.blocks.map((b, i) => {
        switch (b.t) {
          case 'title':
            return (
              <div key={i} className="mb-4 text-center">
                <p className="font-display text-[1.15rem] font-bold uppercase tracking-[0.12em] text-ink">{b.text}</p>
                {b.sub && <p className="mt-0.5 text-[0.75rem] text-ink-3">{b.sub}</p>}
              </div>
            )
          case 'org':
            return (
              <div key={i} className="mb-4 border-b border-line pb-3">
                <p className="font-display text-[1.05rem] font-bold text-ink">{b.name || ' '}</p>
                {b.lines.map((line, j) => (
                  <p key={j} className="whitespace-pre-line text-ink-2">
                    {line}
                  </p>
                ))}
              </div>
            )
          case 'pairs':
            return (
              <div key={i} className={cn('mb-4 grid gap-x-6 gap-y-3', b.cols.length === 2 && 'sm:grid-cols-2', b.cols.length >= 3 && 'sm:grid-cols-3')}>
                {b.cols.map((c, j) => (
                  <div key={j}>
                    {c.heading && <p className="mb-1 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-brand-700">{c.heading}</p>}
                    <dl className="space-y-0.5">
                      {c.rows.map(([label, value], k) => (
                        <div key={k} className="flex gap-1.5">
                          <dt className="shrink-0 font-semibold text-ink-2">{label}:</dt>
                          <dd className="min-w-0 whitespace-pre-line break-words text-ink">{value || <span className="inline-block w-24 border-b border-dotted border-ink-3 align-baseline">&nbsp;</span>}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            )
          case 'table': {
            const n = b.head.length
            const align = (c: number) => ALIGN[b.align?.[c] ?? 'l']
            return (
              // tabIndex: a wide table scrolls sideways on a phone, and a scrollable region must be reachable by keyboard.
              <div key={i} className="doc-scroll mb-4 overflow-x-auto" role="region" aria-label={`${doc.name}: table ${i + 1}`} tabIndex={0}>
                <table className={cn('w-full border-collapse', n > 4 ? 'min-w-[31rem]' : n > 2 && 'min-w-[24rem]')}>
                  <thead>
                    <tr>
                      {b.head.map((h, c) => (
                        <th key={c} scope="col" className={cn('border border-line-strong bg-brand-50 px-1.5 py-1.5 font-semibold text-ink', align(c))}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => {
                      if (!Array.isArray(r) && 'section' in r)
                        return (
                          <tr key={j}>
                            <th scope="colgroup" colSpan={n} className="border border-line-strong bg-paper px-1.5 py-1.5 text-left font-bold text-ink">
                              {r.section}
                            </th>
                          </tr>
                        )
                      const bold = !Array.isArray(r)
                      const cells = Array.isArray(r) ? r : r.total
                      return (
                        <tr key={j}>
                          {b.head.map((_, c) => (
                            <td key={c} className={cn('tnum h-7 border border-line-strong px-1.5 py-1.5 align-top', align(c), bold && 'font-bold')}>
                              {cells[c] ?? ''}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                  {b.totals && b.totals.length > 0 && (
                    <tfoot>
                      {b.totals.map(([label, value], j) => (
                        <tr key={j}>
                          <th scope="row" colSpan={n - 1} className="border border-line-strong px-1.5 py-1.5 text-right font-semibold text-ink">
                            {label}
                          </th>
                          <td className={cn('tnum border border-line-strong px-1.5 py-1.5 text-right font-semibold', j === b.totals!.length - 1 && 'bg-brand-50')}>{value}</td>
                        </tr>
                      ))}
                    </tfoot>
                  )}
                </table>
              </div>
            )
          }
          case 'text':
            return (
              <div key={i} className="mb-4">
                <p className="font-semibold text-ink">{b.label}</p>
                {b.text ? <p className="mt-0.5 whitespace-pre-line text-ink-2">{b.text}</p> : <div className="mt-1 h-12 rounded border border-dotted border-ink-3" />}
              </div>
            )
          case 'sign':
            return (
              <div key={i} className="mt-10 flex flex-wrap justify-between gap-x-8 gap-y-8">
                {b.labels.map((label) => (
                  <p key={label} className="min-w-[9rem] border-t border-ink-3 pt-1.5 text-center text-ink-2">
                    {label}
                  </p>
                ))}
              </div>
            )
        }
      })}
    </div>
  )
}
