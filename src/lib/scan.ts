/**
 * Reads a QR code or a barcode from a picture, entirely in the browser. The decoding library (ZXing) is large, so it is fetched
 * only when someone actually chooses an image.
 */
export type ScanMode = 'qr' | 'barcode'

export interface ScanResult {
  text: string
  /** Human-readable name of the code type, e.g. "EAN-13". */
  format: string
}

const FORMAT_NAMES: Record<string, string> = { QR_CODE: 'QR code', EAN_13: 'EAN-13', EAN_8: 'EAN-8', UPC_A: 'UPC-A', CODE_128: 'Code 128', CODE_39: 'Code 39', ITF: 'ITF' }

export const MAX_FILE_BYTES = 15 * 1024 * 1024

function grey(data: Uint8ClampedArray, invert: boolean): Uint8ClampedArray {
  const out = new Uint8ClampedArray(data.length / 4)
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    // Transparent pixels count as white, so a code on a transparent PNG still reads.
    const a = data[i + 3] / 255
    const l = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) * a + 255 * (1 - a)
    out[j] = invert ? 255 - l : l
  }
  return out
}

/** Draw the picture at a given longest side, optionally turned by a quarter turn (for barcodes photographed sideways). */
function render(source: CanvasImageSource, sw: number, sh: number, longest: number, quarterTurn: boolean): ImageData | null {
  const scale = Math.min(1, longest / Math.max(sw, sh))
  const w = Math.max(1, Math.round(sw * scale))
  const h = Math.max(1, Math.round(sh * scale))
  const canvas = document.createElement('canvas')
  canvas.width = quarterTurn ? h : w
  canvas.height = quarterTurn ? w : h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  if (quarterTurn) {
    ctx.translate(h, 0)
    ctx.rotate(Math.PI / 2)
  }
  ctx.drawImage(source, 0, 0, w, h)
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

export async function scanImage(source: CanvasImageSource, width: number, height: number, mode: ScanMode): Promise<ScanResult | null> {
  const z = await import('@zxing/library')
  const formats = mode === 'qr' ? [z.BarcodeFormat.QR_CODE] : [z.BarcodeFormat.EAN_13, z.BarcodeFormat.EAN_8, z.BarcodeFormat.UPC_A, z.BarcodeFormat.CODE_128, z.BarcodeFormat.CODE_39, z.BarcodeFormat.ITF]
  const hints = new Map<unknown, unknown>([
    [z.DecodeHintType.POSSIBLE_FORMATS, formats],
    [z.DecodeHintType.TRY_HARDER, true],
  ])
  const reader = new z.MultiFormatReader()

  const attempt = (image: ImageData, invert: boolean): ScanResult | null => {
    const lum = grey(image.data, invert)
    for (const Binarizer of [z.HybridBinarizer, z.GlobalHistogramBinarizer]) {
      try {
        const bitmap = new z.BinaryBitmap(new Binarizer(new z.RGBLuminanceSource(lum, image.width, image.height)))
        const r = reader.decode(bitmap, hints as Map<never, never>)
        const key = z.BarcodeFormat[r.getBarcodeFormat()]
        return { text: r.getText(), format: FORMAT_NAMES[key] ?? key }
      } catch {
        // Not found with this setting; try the next one.
      }
    }
    return null
  }

  // Large first (small codes in a big photo), then smaller (blur and noise average out). Barcodes are also tried sideways.
  for (const longest of [1600, 1000, 600]) {
    if (longest !== 1600 && Math.max(width, height) <= longest) continue
    for (const turn of mode === 'barcode' ? [false, true] : [false]) {
      const image = render(source, width, height, longest, turn)
      if (!image) continue
      const found = attempt(image, false) ?? attempt(image, true)
      if (found) return found
    }
  }
  return null
}

export type Parsed =
  | { kind: 'link'; url: string }
  | { kind: 'wifi'; rows: Array<[string, string]> }
  | { kind: 'upi'; rows: Array<[string, string]> }
  | { kind: 'contact'; rows: Array<[string, string]> }
  | { kind: 'text' }

/** Recognise the common kinds of QR content so they can be shown as labelled details. */
export function parseQrText(text: string): Parsed {
  const t = text.trim()
  if (/^https?:\/\/\S+$/i.test(t)) return { kind: 'link', url: t }
  if (/^WIFI:/i.test(t)) {
    const get = (k: string) => (new RegExp(`(?:^WIFI:|;)${k}:((?:\\\\.|[^;\\\\])*)`, 'i').exec(t)?.[1] ?? '').replace(/\\(.)/g, '$1')
    const security = get('T')
    return { kind: 'wifi', rows: [['Network name', get('S')], ['Password', get('P')], ['Security', !security || /nopass/i.test(security) ? 'None' : security]].filter(([, v]) => v) as Array<[string, string]> }
  }
  if (/^upi:\/\/pay\?/i.test(t)) {
    const q = new URLSearchParams(t.slice(t.indexOf('?') + 1))
    return { kind: 'upi', rows: [['UPI ID', q.get('pa') ?? ''], ['Payee name', q.get('pn') ?? ''], ['Amount', q.get('am') ? `₹${q.get('am')}` : ''], ['Note', q.get('tn') ?? '']].filter(([, v]) => v) as Array<[string, string]> }
  }
  if (/^BEGIN:VCARD/i.test(t)) {
    const line = (k: string) => (new RegExp(`^${k}[^:\\n]*:(.*)$`, 'im').exec(t)?.[1] ?? '').replace(/\\([;,])/g, '$1').trim()
    return { kind: 'contact', rows: [['Name', line('FN')], ['Organisation', line('ORG')], ['Phone', line('TEL')], ['Email', line('EMAIL')], ['Website', line('URL')]].filter(([, v]) => v) as Array<[string, string]> }
  }
  return { kind: 'text' }
}
