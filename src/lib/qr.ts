import qrcode from 'qrcode-generator'

export type QrLevel = 'L' | 'M' | 'Q' | 'H'

// Encode text as UTF-8 so Indian-language text, the rupee sign and emoji survive (the library's default is Latin-1 only).
qrcode.stringToBytes = (s: string) => [...new TextEncoder().encode(s)]

/** The QR pattern as rows of dark (true) and light (false) modules, or null when the content is too long to fit in a QR code. */
export function qrMatrix(text: string, level: QrLevel): boolean[][] | null {
  try {
    const qr = qrcode(0, level)
    qr.addData(text, 'Byte')
    qr.make()
    const n = qr.getModuleCount()
    return Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => qr.isDark(r, c)))
  } catch {
    return null
  }
}

/** Quiet zone around the code, in modules. Scanners need at least 4. */
export const QR_MARGIN = 4

/** One SVG path that draws every dark module, merging runs along each row. */
export function qrPath(matrix: boolean[][]): string {
  let d = ''
  matrix.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      if (!row[x]) {
        x++
        continue
      }
      let run = 1
      while (x + run < row.length && row[x + run]) run++
      d += `M${x + QR_MARGIN} ${y + QR_MARGIN}h${run}v1h-${run}z`
      x += run
    }
  })
  return d
}

export function qrSvg(matrix: boolean[][], size: number): string {
  const n = matrix.length + QR_MARGIN * 2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><rect width="${n}" height="${n}" fill="#fff"/><path d="${qrPath(matrix)}" fill="#000"/></svg>`
}

/** Escape the characters that have a meaning inside a Wi-Fi QR code. */
const wifiEscape = (s: string) => s.replace(/([\;,:"])/g, '\\$1')

export function wifiPayload(o: { ssid: string; password: string; security: 'WPA' | 'WEP' | 'nopass'; hidden: boolean }): string {
  return `WIFI:T:${o.security};S:${wifiEscape(o.ssid)};${o.security === 'nopass' ? '' : `P:${wifiEscape(o.password)};`}${o.hidden ? 'H:true;' : ''};`
}

const vcardEscape = (s: string) => s.replace(/\\/g, '\\\\').replace(/([;,])/g, '\\$1').replace(/\r?\n/g, '\\n')

export function vcardPayload(o: { name: string; org: string; phone: string; email: string; website: string }): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${vcardEscape(o.name)}`,
    `N:${vcardEscape(o.name)};;;;`,
    o.org && `ORG:${vcardEscape(o.org)}`,
    o.phone && `TEL;TYPE=CELL:${o.phone.replace(/[^\d+]/g, '')}`,
    o.email && `EMAIL:${o.email.trim()}`,
    o.website && `URL:${o.website.trim()}`,
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\n')
}

/** A UPI ID looks like name@bank. */
export const isUpiId = (s: string): boolean => /^[A-Za-z0-9.\-_]{2,256}@[A-Za-z]{2,64}$/.test(s.trim())

/** The standard UPI deep link that payment apps read from a QR code. */
export function upiPayload(o: { id: string; name: string; amount: string; note: string }): string {
  const params = [`pa=${encodeURIComponent(o.id.trim())}`, `pn=${encodeURIComponent(o.name.trim())}`]
  const amount = Number(o.amount)
  if (o.amount.trim() && Number.isFinite(amount) && amount > 0) params.push(`am=${amount.toFixed(2)}`)
  params.push('cu=INR')
  if (o.note.trim()) params.push(`tn=${encodeURIComponent(o.note.trim())}`)
  return `upi://pay?${params.join('&')}`
}

/** Add https:// to a link typed without a scheme. */
export const normaliseUrl = (s: string): string => {
  const t = s.trim()
  return t === '' || /^[a-z][a-z0-9+.-]*:/i.test(t) ? t : `https://${t}`
}
