import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import { BARCODE_FORMATS, checkBarcode, type BarcodeFormat } from '@/lib/barcode'
import { downloadBlob } from '@/lib/download'
import { ToolInput, ToolSelect } from './controls'

type JsBarcodeFn = (element: Element, value: string, options: Record<string, unknown>) => void
let lib: Promise<JsBarcodeFn> | null = null
/** The barcode library is fetched in the browser the first time it is needed, so it is not part of the page's first load. */
const loadJsBarcode = () => (lib ??= import('jsbarcode').then((m) => (m.default ?? m) as unknown as JsBarcodeFn))

const WIDTHS = [
  { value: '2', label: 'Narrow' },
  { value: '3', label: 'Medium' },
  { value: '4', label: 'Wide' },
]

/** Makes one barcode image in the browser. Validation rules are in lib/barcode.ts. */
export function BarcodeGenerator() {
  const [format, setFormat] = useState<BarcodeFormat>('CODE128')
  const [value, setValue] = useState('SKU-10245')
  const [showText, setShowText] = useState(true)
  const [width, setWidth] = useState('3')
  const [height, setHeight] = useState('90')
  const [drawn, setDrawn] = useState(false)
  const [failed, setFailed] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const meta = BARCODE_FORMATS.find((f) => f.value === format)!
  const check = checkBarcode(format, value)
  const options = (scale: number) => ({ format, width: Number(width) * scale, height: Number(height) * scale, displayValue: showText, fontSize: 18 * scale, margin: 14 * scale, textMargin: 4 * scale, background: '#ffffff', lineColor: '#000000' })
  const encoded = check.ok ? check.value : ''

  useEffect(() => {
    let cancelled = false
    setDrawn(false)
    setFailed(false)
    if (!encoded) return
    loadJsBarcode()
      .then((JsBarcode) => {
        if (cancelled || !svgRef.current) return
        let valid = true
        JsBarcode(svgRef.current, encoded, { ...options(1), valid: (ok: boolean) => (valid = ok) })
        setDrawn(valid)
        setFailed(!valid)
      })
      .catch(() => !cancelled && setFailed(true))
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encoded, format, showText, width, height])

  const fileName = `barcode-${format.toLowerCase()}-${encoded.replace(/[^A-Za-z0-9]+/g, '-').slice(0, 30)}`
  function saveSvg() {
    if (!svgRef.current) return
    downloadBlob(new XMLSerializer().serializeToString(svgRef.current), `${fileName}.svg`, 'image/svg+xml')
  }
  async function savePng() {
    const JsBarcode = await loadJsBarcode()
    const canvas = document.createElement('canvas')
    JsBarcode(canvas, encoded, options(3))
    canvas.toBlob((blob) => blob && downloadBlob(blob, `${fileName}.png`, 'image/png'), 'image/png')
  }

  const error = !check.ok ? check.error : failed ? 'This value cannot be drawn in the chosen format.' : ''

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="space-y-4">
        <ToolSelect
          label="Barcode type"
          hint={meta.hint}
          value={format}
          onChange={(e) => {
            const next = e.target.value as BarcodeFormat
            setFormat(next)
            // Keep what was typed if it suits the new type; otherwise show an example for that type.
            if (!checkBarcode(next, value).ok) setValue(BARCODE_FORMATS.find((f) => f.value === next)!.sample)
          }}
        >
          {BARCODE_FORMATS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </ToolSelect>
        <ToolInput label="Barcode value" value={value} onChange={(e) => setValue(e.target.value)} error={error || undefined} autoCapitalize="characters" spellCheck={false} />
        <div className="grid gap-3 sm:grid-cols-2">
          <ToolSelect label="Bar width" value={width} onChange={(e) => setWidth(e.target.value)}>
            {WIDTHS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </ToolSelect>
          <ToolSelect label="Bar height" value={height} onChange={(e) => setHeight(e.target.value)}>
            <option value="60">Short</option>
            <option value="90">Medium</option>
            <option value="130">Tall</option>
          </ToolSelect>
        </div>
        <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 text-[0.92rem] text-ink-2">
          <input type="checkbox" className="size-6 accent-brand-600" checked={showText} onChange={(e) => setShowText(e.target.checked)} />
          Print the value under the bars
        </label>
      </div>

      <div className="rounded-2xl border border-line bg-paper p-5 text-center">
        <h3 className="font-display text-[1.15rem] font-semibold text-ink">Your barcode</h3>
        <div className="mt-3 grid min-h-[11rem] place-items-center overflow-x-auto rounded-xl border border-line bg-white p-3" role="region" aria-label="Barcode preview" tabIndex={0}>
          <div data-print-area={drawn ? '' : undefined} className={drawn ? undefined : 'hidden'}>
            <svg ref={svgRef} role="img" aria-label={`${meta.label} barcode for ${encoded}`} className="mx-auto h-auto max-w-none" />
          </div>
          {!drawn && <Icon name="barcode" size={56} className="text-line-strong" />}
        </div>
        <p role="status" className="mx-auto mt-3 min-h-6 max-w-[24rem] text-[0.9rem] text-ink-2">
          {drawn ? `${meta.label}: ${encoded}` : error ? '' : 'Drawing…'}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2.5">
          <CTAButton size="sm" onClick={savePng} disabled={!drawn}>
            <Icon name="download" size={17} />
            Download PNG
          </CTAButton>
          <CTAButton size="sm" variant="secondary" onClick={saveSvg} disabled={!drawn}>
            <Icon name="download" size={17} />
            Download SVG
          </CTAButton>
          <CTAButton size="sm" variant="secondary" onClick={() => window.print()} disabled={!drawn}>
            <Icon name="printer" size={17} />
            Print
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
