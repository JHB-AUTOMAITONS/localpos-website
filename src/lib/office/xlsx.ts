import type { TemplateDoc } from '@/components/templates/types'
import { xmlEscape, zip } from './zip'

/**
 * Writes a TemplateDoc as a one-sheet Excel workbook (.xlsx). Amounts are stored as numbers so they can be summed and edited;
 * everything else is text. Opens in Excel, Google Sheets, LibreOffice and Numbers.
 */

// Cell styles, by index into cellXfs in styles.xml below.
const S = { text: 0, bold: 1, title: 2, sub: 3, head: 4, cell: 5, num: 6, cellBold: 7, numBold: 8, int: 9, intBold: 10, right: 11, rightBold: 12, wrap: 13, center: 14 } as const
type Style = (typeof S)[keyof typeof S]

interface Cell {
  v: string
  s: Style
  /** Number of columns this cell spans. */
  span?: number
}

const colName = (i: number): string => {
  let n = i + 1
  let out = ''
  while (n > 0) {
    out = String.fromCharCode(65 + ((n - 1) % 26)) + out
    n = Math.floor((n - 1) / 26)
  }
  return out
}

/** "1,18,000.00" -> 118000. Codes with leading zeros (HSN 0401), long numbers (phone, GSTIN) and anything with letters stay as text. */
function asNumber(v: string): { n: number; decimals: boolean } | null {
  const t = v.trim().replace(/^₹\s?/, '')
  if (!/^-?(\d{1,3}(,\d{2,3})*|\d+)(\.\d+)?$/.test(t)) return null
  const plain = t.replace(/,/g, '')
  const digits = plain.replace(/^-/, '').split('.')[0]
  if (digits.length > 11 || (digits.length > 1 && digits.startsWith('0'))) return null
  return { n: Number(plain), decimals: plain.includes('.') }
}

export function buildXlsx(doc: TemplateDoc): Uint8Array {
  const cols = Math.max(4, ...doc.blocks.map((b) => (b.t === 'table' ? b.head.length : 0)))
  const rows: Array<{ cells: Array<Cell | null>; height?: number }> = []
  const widths = new Array<number>(cols).fill(10)
  const full = (v: string, s: Style, height?: number) => rows.push({ cells: [{ v, s, span: cols }], height })
  const gap = () => rows.push({ cells: [] })

  for (const b of doc.blocks) {
    switch (b.t) {
      case 'title':
        full(b.text.toUpperCase(), S.title, 24)
        if (b.sub) full(b.sub, S.sub)
        gap()
        break
      case 'org':
        full(b.name, S.bold)
        for (const line of b.lines) full(line, S.text)
        gap()
        break
      case 'pairs': {
        const k = b.cols.length
        const base = Math.floor(cols / k)
        const starts = b.cols.map((_, i) => i * base)
        const spans = b.cols.map((_, i) => (i === k - 1 ? cols - starts[i] : base))
        if (b.cols.some((c) => c.heading)) {
          const cells = new Array<Cell | null>(cols).fill(null)
          b.cols.forEach((c, i) => (cells[starts[i]] = { v: c.heading ?? '', s: S.bold, span: spans[i] }))
          rows.push({ cells })
        }
        const depth = Math.max(...b.cols.map((c) => c.rows.length))
        for (let r = 0; r < depth; r++) {
          const cells = new Array<Cell | null>(cols).fill(null)
          b.cols.forEach((c, i) => {
            const pair = c.rows[r]
            if (!pair) return
            if (spans[i] === 1) cells[starts[i]] = { v: pair[1] ? `${pair[0]}: ${pair[1]}` : `${pair[0]}:`, s: S.text }
            else {
              cells[starts[i]] = { v: `${pair[0]}:`, s: S.text }
              cells[starts[i] + 1] = { v: pair[1], s: S.text, span: spans[i] - 1 }
              widths[starts[i]] = Math.max(widths[starts[i]], pair[0].length + 3)
            }
          })
          rows.push({ cells })
        }
        gap()
        break
      }
      case 'table': {
        const n = b.head.length
        const align = (i: number) => b.align?.[i] ?? 'l'
        const dataCell = (v: string, i: number, bold: boolean): Cell => {
          const num = asNumber(v)
          if (num && align(i) === 'r') return { v, s: num.decimals ? (bold ? S.numBold : S.num) : bold ? S.intBold : S.int }
          return { v, s: align(i) === 'c' ? S.center : bold ? S.cellBold : S.cell }
        }
        rows.push({ cells: b.head.map((h): Cell => ({ v: h, s: S.head })) })
        b.head.forEach((h, i) => (widths[i] = Math.max(widths[i], h.length + 2)))
        for (const r of b.rows) {
          if (!Array.isArray(r) && 'section' in r) {
            rows.push({ cells: [{ v: r.section, s: S.cellBold, span: n }] })
            continue
          }
          const cells = Array.isArray(r) ? r : r.total
          const bold = !Array.isArray(r)
          rows.push({ cells: b.head.map((_, i) => dataCell(cells[i] ?? '', i, bold)) })
          cells.forEach((c, i) => i < n && (widths[i] = Math.max(widths[i], Math.min(c.length + 2, 46))))
        }
        for (const [label, value] of b.totals ?? []) {
          const num = asNumber(value)
          const cells = new Array<Cell | null>(cols).fill(null)
          cells[0] = { v: label, s: S.rightBold, span: n - 1 }
          cells[n - 1] = { v: value, s: num ? (num.decimals ? S.numBold : S.intBold) : S.cellBold }
          widths[n - 1] = Math.max(widths[n - 1], value.length + 4)
          rows.push({ cells })
        }
        gap()
        break
      }
      case 'text': {
        full(b.label, S.bold)
        const lines = Math.max(2, b.text.split('\n').reduce((s, l) => s + Math.ceil(Math.max(1, l.length) / 95), 0))
        full(b.text, S.wrap, lines * 15)
        gap()
        break
      }
      case 'sign': {
        gap()
        gap()
        const k = b.labels.length
        const base = Math.floor(cols / k)
        const cells = new Array<Cell | null>(cols).fill(null)
        b.labels.forEach((label, i) => (cells[i * base] = { v: label, s: i === k - 1 && k > 1 ? S.right : S.text, span: i === k - 1 ? cols - i * base : base }))
        rows.push({ cells })
        break
      }
    }
  }

  const merges: string[] = []
  const sheetRows = rows
    .map((row, r) => {
      const cells = row.cells
        .map((cell, c) => {
          if (!cell) return ''
          const ref = `${colName(c)}${r + 1}`
          if (cell.span && cell.span > 1) merges.push(`${ref}:${colName(c + cell.span - 1)}${r + 1}`)
          const numeric = cell.s === S.num || cell.s === S.numBold || cell.s === S.int || cell.s === S.intBold ? asNumber(cell.v) : null
          if (numeric) return `<c r="${ref}" s="${cell.s}"><v>${numeric.n}</v></c>`
          if (cell.v === '') return `<c r="${ref}" s="${cell.s}"/>`
          return `<c r="${ref}" s="${cell.s}" t="inlineStr"><is><t xml:space="preserve">${xmlEscape(cell.v)}</t></is></c>`
        })
        .join('')
      return `<row r="${r + 1}"${row.height ? ` ht="${row.height}" customHeight="1"` : ''}>${cells}</row>`
    })
    .join('')

  const sheet =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<sheetViews><sheetView workbookViewId="0" showGridLines="0"/></sheetViews>` +
    `<cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${Math.min(w, 46)}" customWidth="1"/>`).join('')}</cols>` +
    `<sheetData>${sheetRows}</sheetData>` +
    (merges.length ? `<mergeCells count="${merges.length}">${merges.map((m) => `<mergeCell ref="${m}"/>`).join('')}</mergeCells>` : '') +
    `<pageMargins left="0.5" right="0.5" top="0.6" bottom="0.6" header="0.3" footer="0.3"/><pageSetup paperSize="9" orientation="portrait" fitToHeight="0"/></worksheet>`

  const border = '<border><left style="thin"><color rgb="FF9AA39F"/></left><right style="thin"><color rgb="FF9AA39F"/></right><top style="thin"><color rgb="FF9AA39F"/></top><bottom style="thin"><color rgb="FF9AA39F"/></bottom><diagonal/></border>'
  const xf = (font: number, fill: number, bord: number, numFmt: number, align: string) =>
    `<xf numFmtId="${numFmt}" fontId="${font}" fillId="${fill}" borderId="${bord}" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyNumberFormat="1" applyAlignment="1">${align}</xf>`
  const al = (h: string, wrap = false) => `<alignment horizontal="${h}" vertical="${wrap ? 'top' : 'center'}"${wrap ? ' wrapText="1"' : ''}/>`
  const styles =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0.00"/></numFmts>` +
    `<fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="16"/><name val="Calibri"/></font></fonts>` +
    `<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFE7EFEA"/><bgColor indexed="64"/></patternFill></fill></fills>` +
    `<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border>${border}</borders>` +
    `<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>` +
    `<cellXfs count="15">` +
    xf(0, 0, 0, 0, al('left')) + // text
    xf(1, 0, 0, 0, al('left')) + // bold
    xf(2, 0, 0, 0, al('center')) + // title
    xf(0, 0, 0, 0, al('center')) + // sub
    xf(1, 2, 1, 0, al('center', true)) + // head
    xf(0, 0, 1, 0, al('left', true)) + // cell
    xf(0, 0, 1, 164, al('right')) + // num
    xf(1, 0, 1, 0, al('left', true)) + // cellBold
    xf(1, 0, 1, 164, al('right')) + // numBold
    xf(0, 0, 1, 0, al('right')) + // int
    xf(1, 0, 1, 0, al('right')) + // intBold
    xf(0, 0, 0, 0, al('right')) + // right
    xf(1, 0, 1, 0, al('right')) + // rightBold
    xf(0, 0, 0, 0, al('left', true)) + // wrap
    xf(0, 0, 1, 0, al('center')) + // center
    `</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`

  const sheetName = xmlEscape(doc.name.replace(/[\\/?*[\]:]/g, ' ').slice(0, 31) || 'Sheet1')
  return zip([
    {
      name: '[Content_Types].xml',
      content:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>',
    },
    {
      name: '_rels/.rels',
      content:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
    },
    {
      name: 'xl/workbook.xml',
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${sheetName}" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    },
    {
      name: 'xl/_rels/workbook.xml.rels',
      content:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
    },
    { name: 'xl/styles.xml', content: styles },
    { name: 'xl/worksheets/sheet1.xml', content: sheet },
  ])
}
