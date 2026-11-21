import type { Align, TemplateDoc } from '@/components/templates/types'
import { xmlEscape, zip } from './zip'

/** Writes a TemplateDoc as a Word document (.docx): A4, editable text and real tables. Opens in Word, Google Docs, LibreOffice and Pages. */

const PAGE_WIDTH = 10466 // A4 width (11906) less 720 twip margins on each side

interface RunOpts {
  bold?: boolean
  size?: number // half-points
  color?: string
}

const run = (text: string, o: RunOpts = {}): string => {
  const props = `<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>${o.bold ? '<w:b/>' : ''}${o.color ? `<w:color w:val="${o.color}"/>` : ''}<w:sz w:val="${o.size ?? 20}"/><w:szCs w:val="${o.size ?? 20}"/></w:rPr>`
  // A line break inside a paragraph becomes <w:br/>.
  return text
    .split('\n')
    .map((line, i) => `<w:r>${props}${i > 0 ? '<w:br/>' : ''}<w:t xml:space="preserve">${xmlEscape(line)}</w:t></w:r>`)
    .join('')
}

const JC: Record<Align, string> = { l: 'left', c: 'center', r: 'right' }

const para = (runs: string, o: { align?: Align; after?: number; before?: number } = {}): string =>
  `<w:p><w:pPr><w:spacing w:before="${o.before ?? 0}" w:after="${o.after ?? 60}"/><w:jc w:val="${JC[o.align ?? 'l']}"/></w:pPr>${runs}</w:p>`

const BORDER = (v: string) => `<w:top w:val="${v}" w:sz="4" w:space="0" w:color="9AA39F"/><w:left w:val="${v}" w:sz="4" w:space="0" w:color="9AA39F"/><w:bottom w:val="${v}" w:sz="4" w:space="0" w:color="9AA39F"/><w:right w:val="${v}" w:sz="4" w:space="0" w:color="9AA39F"/>`

function cell(content: string, width: number, o: { span?: number; shade?: boolean; border?: boolean } = {}): string {
  return (
    `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/>${o.span && o.span > 1 ? `<w:gridSpan w:val="${o.span}"/>` : ''}` +
    `<w:tcBorders>${BORDER(o.border === false ? 'nil' : 'single')}</w:tcBorders>${o.shade ? '<w:shd w:val="clear" w:color="auto" w:fill="E7EFEA"/>' : ''}` +
    `<w:tcMar><w:top w:w="50" w:type="dxa"/><w:left w:w="90" w:type="dxa"/><w:bottom w:w="50" w:type="dxa"/><w:right w:w="90" w:type="dxa"/></w:tcMar></w:tcPr>${content}</w:tc>`
  )
}

function table(widths: number[], rows: string[]): string {
  return (
    `<w:tbl><w:tblPr><w:tblW w:w="${widths.reduce((a, b) => a + b, 0)}" w:type="dxa"/><w:tblLayout w:type="fixed"/></w:tblPr>` +
    `<w:tblGrid>${widths.map((w) => `<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>${rows.map((r) => `<w:tr>${r}</w:tr>`).join('')}</w:tbl>`
  )
}

/** Share the page width between columns by how much text each holds, within sensible limits. */
function columnWidths(head: string[], rows: string[][]): number[] {
  const weight = head.map((h, i) => Math.min(34, Math.max(5, h.length, ...rows.map((r) => (r[i] ?? '').length))))
  const total = weight.reduce((a, b) => a + b, 0)
  const widths = weight.map((w) => Math.floor((w / total) * PAGE_WIDTH))
  widths[widths.length - 1] += PAGE_WIDTH - widths.reduce((a, b) => a + b, 0)
  return widths
}

export function buildDocx(doc: TemplateDoc): Uint8Array {
  const body: string[] = []
  const spacer = () => body.push(para('', { after: 80 }))

  for (const b of doc.blocks) {
    switch (b.t) {
      case 'title':
        body.push(para(run(b.text.toUpperCase(), { bold: true, size: 32 }), { align: 'c', after: b.sub ? 20 : 160 }))
        if (b.sub) body.push(para(run(b.sub, { color: '5A6660' }), { align: 'c', after: 160 }))
        break
      case 'org':
        body.push(para(run(b.name, { bold: true, size: 26 }), { after: 20 }))
        for (const line of b.lines) body.push(para(run(line), { after: 0 }))
        spacer()
        break
      case 'pairs': {
        const k = b.cols.length
        const w = Math.floor(PAGE_WIDTH / k)
        const cells = b.cols.map((c) => {
          const content = [
            ...(c.heading ? [para(run(c.heading, { bold: true, color: '086A50' }), { after: 40 })] : []),
            ...c.rows.map(([label, value]) => para(run(`${label}: `, { bold: true }) + run(value), { after: 20 })),
          ]
          return cell(content.join('') || para(''), w, { border: false })
        })
        body.push(table(new Array<number>(k).fill(w), [cells.join('')]))
        spacer()
        break
      }
      case 'table': {
        const n = b.head.length
        const plain = b.rows.map((r) => (Array.isArray(r) ? r : 'total' in r ? r.total : []))
        const widths = columnWidths(b.head, plain)
        const align = (i: number): Align => b.align?.[i] ?? 'l'
        const rows = [b.head.map((h, i) => cell(para(run(h, { bold: true }), { align: 'c', after: 0 }), widths[i], { shade: true })).join('')]
        for (const r of b.rows) {
          if (!Array.isArray(r) && 'section' in r) {
            rows.push(cell(para(run(r.section, { bold: true }), { after: 0 }), PAGE_WIDTH, { span: n }))
            continue
          }
          const bold = !Array.isArray(r)
          const cells = Array.isArray(r) ? r : r.total
          rows.push(b.head.map((_, i) => cell(para(run(cells[i] ?? '', { bold }), { align: align(i), after: 0 }), widths[i])).join(''))
        }
        for (const [label, value] of b.totals ?? []) {
          const last = widths[n - 1]
          rows.push(cell(para(run(label, { bold: true }), { align: 'r', after: 0 }), PAGE_WIDTH - last, { span: n - 1 }) + cell(para(run(value, { bold: true }), { align: 'r', after: 0 }), last))
        }
        body.push(table(widths, rows))
        spacer()
        break
      }
      case 'text':
        body.push(para(run(b.label, { bold: true }), { after: 30 }))
        body.push(para(run(b.text || ' '), { after: b.text ? 120 : 480 }))
        break
      case 'sign': {
        const k = b.labels.length
        const w = Math.floor(PAGE_WIDTH / k)
        const cells = b.labels.map((label, i) => cell(para(run(label), { align: k > 1 && i === k - 1 ? 'r' : i === 0 ? 'l' : 'c', before: 720, after: 0 }), w, { border: false }))
        body.push(table(new Array<number>(k).fill(w), [cells.join('')]))
        break
      }
    }
  }
  // Word requires a paragraph after a table at the end of the body.
  body.push(para('', { after: 0 }))

  const document =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body.join('')}` +
    `<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="360" w:footer="360" w:gutter="0"/></w:sectPr></w:body></w:document>`

  return zip([
    {
      name: '[Content_Types].xml',
      content:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
    },
    {
      name: '_rels/.rels',
      content:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
    },
    { name: 'word/document.xml', content: document },
  ])
}
