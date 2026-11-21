import { useEffect, useRef, useState, type DragEvent } from 'react'
import { Icon } from '@/components/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import { cn } from '@/lib/cn'
import { MAX_FILE_BYTES, parseQrText, scanImage, type ScanMode, type ScanResult } from '@/lib/scan'

type Status = { state: 'idle' } | { state: 'working' } | { state: 'error'; message: string } | { state: 'done'; result: ScanResult }

const COPY: Record<ScanMode, { noun: string; prompt: string; none: string }> = {
  qr: {
    noun: 'QR code',
    prompt: 'Choose an image that contains a QR code',
    none: 'No QR code was found in this image. Crop the picture so the code fills most of it, make sure it is sharp, and try again.',
  },
  barcode: {
    noun: 'barcode',
    prompt: 'Choose an image that contains a barcode',
    none: 'No barcode was found in this image. Use a sharp, straight picture with all the bars visible and no glare, and try again.',
  },
}

const TITLES = { link: 'Link', wifi: 'Wi-Fi network', upi: 'UPI payment', contact: 'Contact card', text: 'Text' } as const

/** Reads a QR code or barcode from an image the visitor chooses, drops or pastes. The image never leaves the browser (lib/scan.ts). */
export function ImageScanner({ mode }: { mode: ScanMode }) {
  const copy = COPY[mode]
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const [preview, setPreview] = useState('')
  const [over, setOver] = useState(false)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const run = useRef(0)

  async function handle(file: File | undefined | null) {
    if (!file) return
    const id = ++run.current
    setCopied(false)
    setPreview('')
    if (!file.type.startsWith('image/')) return setStatus({ state: 'error', message: 'That file is not an image. Choose a JPG, PNG or WebP picture.' })
    if (file.size > MAX_FILE_BYTES) return setStatus({ state: 'error', message: 'That image is larger than 15 MB. Crop or resize it and try again.' })
    setStatus({ state: 'working' })
    let bitmap: ImageBitmap
    try {
      bitmap = await createImageBitmap(file)
    } catch {
      if (id === run.current) setStatus({ state: 'error', message: 'This image could not be opened. It may be damaged or in a format your browser does not support.' })
      return
    }
    try {
      // A small copy for the on-screen preview, as a data: address (the site's content policy does not allow blob: images).
      const thumb = document.createElement('canvas')
      const s = Math.min(1, 480 / Math.max(bitmap.width, bitmap.height))
      thumb.width = Math.max(1, Math.round(bitmap.width * s))
      thumb.height = Math.max(1, Math.round(bitmap.height * s))
      thumb.getContext('2d')?.drawImage(bitmap, 0, 0, thumb.width, thumb.height)
      if (id === run.current) setPreview(thumb.toDataURL('image/jpeg', 0.8))
      const result = await scanImage(bitmap, bitmap.width, bitmap.height, mode)
      if (id !== run.current) return
      setStatus(result ? { state: 'done', result } : { state: 'error', message: copy.none })
    } catch {
      if (id === run.current) setStatus({ state: 'error', message: 'Something went wrong while reading the image. Please try again.' })
    } finally {
      bitmap.close()
    }
  }

  // Paste an image from the clipboard (for example a screenshot) anywhere on the page.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const file = [...(e.clipboardData?.files ?? [])].find((f) => f.type.startsWith('image/'))
      if (file) {
        e.preventDefault()
        void handle(file)
      }
    }
    document.addEventListener('paste', onPaste)
    return () => document.removeEventListener('paste', onPaste)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setOver(false)
    void handle(e.dataTransfer.files[0])
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Older browsers and non-secure pages: fall back to a hidden text box.
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
  }

  const result = status.state === 'done' ? status.result : null
  const parsed = result && mode === 'qr' ? parseQrText(result.text) : null

  return (
    <div className="grid gap-7 lg:grid-cols-2">
      <div>
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setOver(true)
          }}
          onDragLeave={() => setOver(false)}
          onDrop={onDrop}
          className={cn('rounded-2xl border-2 border-dashed p-6 text-center transition-colors', over ? 'border-brand-500 bg-brand-50' : 'border-line-strong bg-paper')}
        >
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-brand-100 text-brand-700">
            <Icon name={mode === 'qr' ? 'scan-qr' : 'scan'} size={24} />
          </span>
          <p className="mt-3 font-semibold text-ink">{copy.prompt}</p>
          <p className="mt-1 text-[0.9rem] text-ink-3">Drag a picture here, paste a screenshot with Ctrl+V, or choose a file. JPG, PNG or WebP, up to 15 MB.</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label={copy.prompt}
            tabIndex={-1}
            onChange={(e) => {
              void handle(e.target.files?.[0])
              e.target.value = '' // so the same file can be chosen again
            }}
          />
          <CTAButton className="mt-4" onClick={() => inputRef.current?.click()}>
            Choose image
          </CTAButton>
        </div>
        <p className="mt-3 flex items-start gap-2 text-[0.9rem] text-ink-2">
          <Icon name="lock" size={17} className="mt-0.5 shrink-0 text-brand-700" />
          Your image is read on this device, in your browser. It is not uploaded or stored.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-paper p-5" aria-live="polite">
        <h3 className="font-display text-[1.15rem] font-semibold text-ink">Result</h3>
        {status.state === 'idle' && <p className="mt-2 text-ink-2">The content of the {copy.noun} will appear here.</p>}
        {status.state === 'working' && <p className="mt-2 text-ink-2">Reading the image…</p>}
        {status.state === 'error' && (
          <p className="mt-2 flex items-start gap-2 font-medium text-coral-700">
            <Icon name="alert" size={18} className="mt-1 shrink-0" />
            {status.message}
          </p>
        )}
        {result && (
          <div className="mt-2">
            <p className="text-[0.9rem] font-semibold text-brand-700">
              {mode === 'qr' ? `QR code found: ${TITLES[parsed?.kind ?? 'text']}` : `${result.format} barcode found`}
            </p>
            {parsed && 'rows' in parsed && parsed.rows.length > 0 && (
              <dl className="mt-3 divide-y divide-line rounded-xl border border-line bg-white text-[0.95rem]">
                {parsed.rows.map(([label, value]) => (
                  <div key={label} className="flex gap-3 px-3.5 py-2">
                    <dt className="w-28 shrink-0 font-semibold text-ink-2">{label}</dt>
                    <dd className="min-w-0 break-words text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-3 text-[0.86rem] font-semibold text-ink">{parsed && parsed.kind !== 'text' && parsed.kind !== 'link' ? 'Full content' : 'Content'}</p>
            <pre data-testid="scan-output" className="mt-1 max-h-56 overflow-auto whitespace-pre-wrap break-all rounded-xl border border-line bg-white p-3.5 font-mono text-[0.92rem] text-ink" tabIndex={0}>
              {result.text}
            </pre>
            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <CTAButton size="sm" onClick={() => copyText(result.text)}>
                <Icon name={copied ? 'check' : 'clipboard'} size={17} />
                {copied ? 'Copied' : 'Copy'}
              </CTAButton>
              {parsed?.kind === 'link' && (
                <a href={parsed.url} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex h-10 items-center gap-2 rounded-xl border border-line-strong bg-white px-4 text-[0.9375rem] font-semibold text-ink hover:border-brand-300 hover:bg-brand-50">
                  Open link
                  <Icon name="arrow-up-right" size={16} />
                </a>
              )}
            </div>
            {parsed?.kind === 'link' && <p className="mt-2 text-[0.86rem] text-ink-3">Check the address before you open a link from a code you do not know.</p>}
          </div>
        )}
        {preview && <img src={preview} alt="The image you chose" className="mt-4 max-h-48 rounded-lg border border-line" />}
      </div>
    </div>
  )
}
