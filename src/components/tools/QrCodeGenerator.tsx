import { useMemo, useState } from 'react'
import { Icon } from '@/components/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import { SITE } from '@/data/site'
import { downloadBlob } from '@/lib/download'
import { QR_MARGIN, isUpiId, normaliseUrl, qrMatrix, qrPath, qrSvg, upiPayload, vcardPayload, wifiPayload, type QrLevel } from '@/lib/qr'
import { Choice, ToolInput, ToolSelect, ToolTextArea } from './controls'

type Kind = 'url' | 'text' | 'wifi' | 'contact' | 'upi'
const KINDS: Array<{ value: Kind; label: string }> = [
  { value: 'url', label: 'Link' },
  { value: 'text', label: 'Text' },
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'contact', label: 'Contact' },
  { value: 'upi', label: 'UPI' },
]

/** Makes a static QR code in the browser. The pattern is computed locally (lib/qr.ts); nothing is sent to a server. */
export function QrCodeGenerator() {
  const [kind, setKind] = useState<Kind>('url')
  const [level, setLevel] = useState<QrLevel>('M')
  const [size, setSize] = useState('1024')
  const [v, setV] = useState({ url: `${SITE.url}/`, text: '', ssid: '', password: '', security: 'WPA', hidden: false, name: '', org: '', phone: '', email: '', website: '', upi: '', payee: '', amount: '', note: '' })
  const field = (key: keyof typeof v) => ({ value: String(v[key]), onChange: (e: { target: { value: string } }) => setV((s) => ({ ...s, [key]: e.target.value })) })

  const { payload, problem } = useMemo((): { payload: string; problem: string } => {
    switch (kind) {
      case 'url':
        return v.url.trim() ? { payload: normaliseUrl(v.url), problem: '' } : { payload: '', problem: 'Type or paste a link to make its QR code.' }
      case 'text':
        return v.text ? { payload: v.text, problem: '' } : { payload: '', problem: 'Type some text to make its QR code.' }
      case 'wifi':
        if (!v.ssid.trim()) return { payload: '', problem: 'Enter the Wi-Fi network name.' }
        if (v.security !== 'nopass' && !v.password) return { payload: '', problem: 'Enter the Wi-Fi password, or choose “No password”.' }
        return { payload: wifiPayload({ ssid: v.ssid, password: v.password, security: v.security as 'WPA' | 'WEP' | 'nopass', hidden: v.hidden }), problem: '' }
      case 'contact':
        return v.name.trim() ? { payload: vcardPayload(v), problem: '' } : { payload: '', problem: 'Enter a name for the contact.' }
      case 'upi':
        if (!v.upi.trim()) return { payload: '', problem: 'Enter the UPI ID that should receive the payment.' }
        if (!isUpiId(v.upi)) return { payload: '', problem: 'That does not look like a UPI ID. It should look like name@bank.' }
        if (!v.payee.trim()) return { payload: '', problem: 'Enter the payee name shown to the person paying.' }
        return { payload: upiPayload({ id: v.upi, name: v.payee, amount: v.amount, note: v.note }), problem: '' }
    }
  }, [kind, v])

  const matrix = useMemo(() => (payload ? qrMatrix(payload, level) : null), [payload, level])
  const tooLong = payload !== '' && !matrix
  const message = tooLong ? 'This is too much content for one QR code. Shorten it, or choose a lower error-correction level.' : problem
  const n = matrix ? matrix.length + QR_MARGIN * 2 : 0

  function savePng() {
    if (!matrix) return
    const px = Number(size)
    const scale = Math.max(1, Math.floor(px / n))
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = scale * n
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#000'
    matrix.forEach((row, y) => row.forEach((dark, x) => dark && ctx.fillRect((x + QR_MARGIN) * scale, (y + QR_MARGIN) * scale, scale, scale)))
    canvas.toBlob((blob) => blob && downloadBlob(blob, `qr-code-${kind}.png`, 'image/png'), 'image/png')
  }
  const saveSvg = () => matrix && downloadBlob(qrSvg(matrix, Number(size)), `qr-code-${kind}.svg`, 'image/svg+xml')

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <Choice label="What should the QR code contain?" value={kind} onChange={setKind} options={KINDS} />

        {kind === 'url' && <ToolInput label="Link (URL)" inputMode="url" placeholder="https://example.com/menu" hint="A link typed without https:// gets it added." {...field('url')} />}
        {kind === 'text' && <ToolTextArea label="Text" rows={4} placeholder="Any text: an address, a message, a coupon code" {...field('text')} />}
        {kind === 'wifi' && (
          <div className="grid gap-3 sm:grid-cols-2">
            <ToolInput label="Network name (SSID)" {...field('ssid')} />
            <ToolSelect label="Security" {...field('security')}>
              <option value="WPA">WPA / WPA2 / WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No password</option>
            </ToolSelect>
            {v.security !== 'nopass' && <ToolInput label="Password" autoComplete="off" wrapperClassName="sm:col-span-2" {...field('password')} />}
            <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 text-[0.92rem] text-ink-2 sm:col-span-2">
              <input type="checkbox" className="size-6 accent-brand-600" checked={v.hidden} onChange={(e) => setV((s) => ({ ...s, hidden: e.target.checked }))} />
              This is a hidden network
            </label>
          </div>
        )}
        {kind === 'contact' && (
          <div className="grid gap-3 sm:grid-cols-2">
            <ToolInput label="Name" autoComplete="name" {...field('name')} />
            <ToolInput label="Organisation" {...field('org')} />
            <ToolInput label="Phone" inputMode="tel" {...field('phone')} />
            <ToolInput label="Email" inputMode="email" {...field('email')} />
            <ToolInput label="Website" inputMode="url" wrapperClassName="sm:col-span-2" {...field('website')} />
          </div>
        )}
        {kind === 'upi' && (
          <div className="grid gap-3 sm:grid-cols-2">
            <ToolInput label="UPI ID" placeholder="yourname@bank" autoCapitalize="none" {...field('upi')} />
            <ToolInput label="Payee name" placeholder="Name on the bank account" {...field('payee')} />
            <ToolInput label="Amount (₹)" inputMode="decimal" hint="Optional. Leave empty to let the payer type it." {...field('amount')} />
            <ToolInput label="Note" hint="Optional, for example a bill number." {...field('note')} />
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <ToolSelect label="Error correction" hint="Higher levels survive more damage but make a denser code." value={level} onChange={(e) => setLevel(e.target.value as QrLevel)}>
            <option value="L">Low (about 7%)</option>
            <option value="M">Medium (about 15%)</option>
            <option value="Q">Quartile (about 25%)</option>
            <option value="H">High (about 30%)</option>
          </ToolSelect>
          <ToolSelect label="Download size" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="512">512 px</option>
            <option value="1024">1024 px</option>
            <option value="2048">2048 px</option>
          </ToolSelect>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper p-5 text-center">
        <h3 className="font-display text-[1.15rem] font-semibold text-ink">Your QR code</h3>
        <div className="mx-auto mt-3 grid aspect-square w-full max-w-[18rem] place-items-center rounded-xl border border-line bg-white p-2">
          {matrix ? (
            <svg viewBox={`0 0 ${n} ${n}`} role="img" aria-label="Generated QR code" shapeRendering="crispEdges" className="size-full">
              <rect width={n} height={n} fill="#fff" />
              <path d={qrPath(matrix)} fill="#000" />
            </svg>
          ) : (
            <Icon name="qr" size={56} className="text-line-strong" />
          )}
        </div>
        <p role="status" className="mx-auto mt-3 min-h-10 max-w-[22rem] text-[0.9rem] text-ink-2">
          {message || 'Scan it with your phone to check it before you print.'}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2.5">
          <CTAButton size="sm" onClick={savePng} disabled={!matrix}>
            <Icon name="download" size={17} />
            Download PNG
          </CTAButton>
          <CTAButton size="sm" variant="secondary" onClick={saveSvg} disabled={!matrix}>
            <Icon name="download" size={17} />
            Download SVG
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
