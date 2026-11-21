import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import { cn } from '@/lib/cn'
import { downloadBlob } from '@/lib/download'
import { LOGO_FONTS, LOGO_PALETTES, drawLogo, initialsOf, loadLogoFonts, type LogoLayout, type LogoOptions, type LogoShape } from '@/lib/logo'
import { Choice, ToolInput, ToolSelect } from './controls'

const START: LogoOptions = { name: 'Sri Lakshmi Traders', tagline: 'Quality you can trust', initials: 'SL', shape: 'rounded', layout: 'left', font: 'display', bold: true, uppercase: false, spacing: 0, text: LOGO_PALETTES[0].text, badge: LOGO_PALETTES[0].badge, badgeText: LOGO_PALETTES[0].badgeText, background: LOGO_PALETTES[0].background, transparent: false }

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border border-line-strong bg-white px-2.5 text-[0.9rem] font-semibold text-ink">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="size-7 cursor-pointer rounded border-0 bg-transparent p-0" />
      {label}
    </label>
  )
}

/** A text logo maker: name, tagline and an initials badge, drawn on a canvas (lib/logo.ts) and saved as a PNG. No AI, no uploads. */
export function LogoMaker() {
  const [o, setO] = useState<LogoOptions>(START)
  const [autoInitials, setAutoInitials] = useState(true)
  const [size, setSize] = useState('1200')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const set = <K extends keyof LogoOptions>(key: K, value: LogoOptions[K]) => setO((s) => ({ ...s, [key]: value }))

  useEffect(() => {
    let cancelled = false
    const paint = () => !cancelled && canvasRef.current && drawLogo(canvasRef.current, o, 1200)
    paint() // straight away with whatever fonts are ready, then again once the chosen font has loaded
    void loadLogoFonts(o).then(paint)
    return () => {
      cancelled = true
    }
  }, [o])

  async function save() {
    await loadLogoFonts(o)
    const canvas = document.createElement('canvas')
    drawLogo(canvas, o, Number(size))
    const slug = o.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'logo'
    canvas.toBlob((blob) => blob && downloadBlob(blob, `${slug}-logo.png`, 'image/png'), 'image/png')
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <ToolInput
            label="Business name"
            maxLength={40}
            value={o.name}
            wrapperClassName="sm:col-span-2"
            onChange={(e) => setO((s) => ({ ...s, name: e.target.value, initials: autoInitials ? initialsOf(e.target.value) : s.initials }))}
          />
          <ToolInput label="Tagline" hint="Optional." maxLength={50} value={o.tagline} onChange={(e) => set('tagline', e.target.value)} />
          <ToolInput
            label="Badge letters"
            hint="Up to 3 characters."
            maxLength={3}
            value={o.initials}
            onChange={(e) => {
              setAutoInitials(false)
              set('initials', e.target.value)
            }}
          />
        </div>
        <Choice<LogoLayout>
          label="Layout"
          value={o.layout}
          onChange={(v) => set('layout', v)}
          options={[
            { value: 'left', label: 'Badge left' },
            { value: 'top', label: 'Badge on top' },
            { value: 'text', label: 'Text only' },
          ]}
        />
        {o.layout !== 'text' && (
          <Choice<LogoShape>
            label="Badge shape"
            value={o.shape}
            onChange={(v) => set('shape', v)}
            options={[
              { value: 'circle', label: 'Circle' },
              { value: 'rounded', label: 'Rounded' },
              { value: 'square', label: 'Square' },
              { value: 'none', label: 'None' },
            ]}
          />
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <ToolSelect label="Typeface" value={o.font} onChange={(e) => set('font', e.target.value)}>
            {LOGO_FONTS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </ToolSelect>
          <ToolSelect label="Letter spacing" value={String(o.spacing)} onChange={(e) => set('spacing', Number(e.target.value))}>
            <option value="0">Normal</option>
            <option value="0.05">Wide</option>
            <option value="0.12">Extra wide</option>
          </ToolSelect>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 text-[0.92rem] text-ink-2">
            <input type="checkbox" className="size-6 accent-brand-600" checked={o.bold} onChange={(e) => set('bold', e.target.checked)} />
            Bold
          </label>
          <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 text-[0.92rem] text-ink-2">
            <input type="checkbox" className="size-6 accent-brand-600" checked={o.uppercase} onChange={(e) => set('uppercase', e.target.checked)} />
            UPPERCASE
          </label>
          <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 text-[0.92rem] text-ink-2">
            <input type="checkbox" className="size-6 accent-brand-600" checked={o.transparent} onChange={(e) => set('transparent', e.target.checked)} />
            Transparent background
          </label>
        </div>

        <div>
          <span className="block text-[0.86rem] font-semibold text-ink">Colour sets</span>
          <div role="group" aria-label="Colour sets" className="mt-1 flex flex-wrap gap-2">
            {LOGO_PALETTES.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setO((s) => ({ ...s, text: p.text, badge: p.badge, badgeText: p.badgeText, background: p.background }))}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-line-strong bg-white px-3 text-[0.9rem] font-semibold text-ink hover:border-brand-300"
              >
                <span aria-hidden="true" className="flex overflow-hidden rounded border border-line">
                  <span className="size-4" style={{ background: p.badge }} />
                  <span className="size-4" style={{ background: p.text }} />
                  <span className="size-4" style={{ background: p.background }} />
                </span>
                {p.name}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <ColorField label="Text" value={o.text} onChange={(v) => set('text', v)} />
            <ColorField label="Badge" value={o.badge} onChange={(v) => set('badge', v)} />
            <ColorField label="Letters" value={o.badgeText} onChange={(v) => set('badgeText', v)} />
            <ColorField label="Back" value={o.background} onChange={(v) => set('background', v)} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper p-5">
        <h3 className="font-display text-[1.15rem] font-semibold text-ink">Preview</h3>
        {/* The chequered backing shows through when the background is transparent. */}
        <div className={cn('mt-3 grid min-h-[12rem] place-items-center rounded-xl border border-line p-3', o.transparent ? 'bg-[repeating-conic-gradient(#e6e3d8_0%_25%,#fff_0%_50%)] bg-[length:20px_20px]' : 'bg-white')}>
          <canvas ref={canvasRef} role="img" aria-label={`Logo preview for ${o.name || 'your business'}`} className="h-auto max-w-full rounded" />
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <ToolSelect label="PNG size" value={size} onChange={(e) => setSize(e.target.value)} wrapperClassName="w-40">
            <option value="1200">1200 px wide</option>
            <option value="2400">2400 px wide</option>
          </ToolSelect>
          <CTAButton onClick={save} className="h-11">
            <Icon name="download" size={17} />
            Download PNG
          </CTAButton>
        </div>
        <p className="mt-3 text-[0.86rem] text-ink-3">The logo is drawn in your browser. Nothing is uploaded.</p>
      </div>
    </div>
  )
}
