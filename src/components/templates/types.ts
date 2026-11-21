/**
 * A business document described as data. The same description is shown on the page (DocSheet), printed, and written out as a real
 * Excel workbook (lib/office/xlsx.ts) and Word document (lib/office/docx.ts). The format pages write these by hand with sample values;
 * the document tools (invoice generator, receipt maker and so on) build one from what the visitor types.
 */
export type Align = 'l' | 'c' | 'r'

/** A table row: plain cells, a section heading that spans the table, or a bold total row. */
export type TRow = string[] | { section: string } | { total: string[] }

export type TBlock =
  /** The document's name, centred at the top, e.g. "Tax Invoice". */
  | { t: 'title'; text: string; sub?: string }
  /** The business the document comes from: name, then address and registration lines. */
  | { t: 'org'; name: string; lines: string[] }
  /** One to three columns of "label: value" rows, e.g. "Bill to" next to the invoice number and date. */
  | { t: 'pairs'; cols: Array<{ heading?: string; rows: Array<[label: string, value: string]> }> }
  | {
      t: 'table'
      head: string[]
      /** Alignment per column. Defaults to left; use 'r' for money and quantities. */
      align?: Align[]
      rows: TRow[]
      /** Label and value lines under the table, right-aligned (subtotal, tax, grand total). */
      totals?: Array<[label: string, value: string]>
      /**
       * Columns (0-based) whose text is part of the format itself, such as the line names of a balance sheet. In the blank version those
       * columns keep their text and the rest are emptied. Without it, the blank version has empty rows.
       */
      keep?: number[]
      /** Number of empty rows in the blank version when `keep` is not set. Defaults to the number of sample rows. */
      blankRows?: number
    }
  /** A labelled paragraph: terms, notes, a declaration. Set `keep` when the wording should stay in the blank version. */
  | { t: 'text'; label: string; text: string; keep?: boolean }
  /** Signature lines at the foot of the document. */
  | { t: 'sign'; labels: string[] }

export interface TemplateDoc {
  /** Unique within its page. */
  id: string
  /** Short name, shown on the tab when a page offers more than one template. */
  name: string
  /** One sentence on when to use this template. */
  description: string
  /** Download file name without an extension, e.g. "gst-invoice-format". */
  fileName: string
  blocks: TBlock[]
}

/** The same document with the sample values removed, ready to be filled in by hand. */
export function blankDoc(doc: TemplateDoc): TemplateDoc {
  return {
    ...doc,
    fileName: `${doc.fileName}-blank`,
    blocks: doc.blocks.map((b): TBlock => {
      switch (b.t) {
        case 'org':
          return { ...b, name: 'Your business name', lines: ['Address, phone and email', 'GSTIN (if registered)'] }
        case 'pairs':
          return { ...b, cols: b.cols.map((c) => ({ ...c, rows: c.rows.map(([label]): [string, string] => [label, '']) })) }
        case 'table': {
          const keep = b.keep
          const totals = b.totals?.map(([label]): [string, string] => [label, ''])
          if (!keep) return { ...b, totals, rows: Array.from({ length: b.blankRows ?? b.rows.filter(Array.isArray).length }, () => b.head.map(() => '')) }
          const strip = (cells: string[]) => cells.map((c, i) => (keep.includes(i) ? c : ''))
          return { ...b, totals, rows: b.rows.map((r): TRow => (Array.isArray(r) ? strip(r) : 'total' in r ? { total: strip(r.total) } : r)) }
        }
        case 'text':
          return b.keep ? b : { ...b, text: '' }
        case 'sign':
          // "For Sri Lakshmi Traders (Authorised signatory)" names the sample business.
          return { ...b, labels: b.labels.map((l) => (/^For /.test(l) ? 'Authorised signatory' : l)) }
        default:
          return b
      }
    }),
  }
}
