/** Draws a simple text logo on a canvas. The same function paints the on-page preview and the downloaded PNG. */
export type LogoShape = 'circle' | 'rounded' | 'square' | 'none'
export type LogoLayout = 'left' | 'top' | 'text'

export interface LogoOptions {
  name: string
  tagline: string
  initials: string
  shape: LogoShape
  layout: LogoLayout
  font: string
  bold: boolean
  uppercase: boolean
  /** Extra space between letters of the name, as a fraction of the font size. */
  spacing: number
  text: string
  badge: string
  badgeText: string
  background: string
  transparent: boolean
}

export const LOGO_FONTS: Array<{ value: string; label: string; family: string; regular: number }> = [
  { value: 'display', label: 'Display', family: '"Bricolage Grotesque Variable", system-ui, sans-serif', regular: 500 },
  { value: 'sans', label: 'Sans-serif', family: '"Figtree Variable", system-ui, sans-serif', regular: 400 },
  { value: 'mono', label: 'Monospace', family: '"JetBrains Mono Variable", ui-monospace, monospace', regular: 400 },
  { value: 'serif', label: 'Serif', family: 'Georgia, "Times New Roman", serif', regular: 400 },
]

export const LOGO_PALETTES: Array<{ name: string; text: string; badge: string; badgeText: string; background: string }> = [
  { name: 'Emerald', text: '#13211c', badge: '#0a7f5f', badgeText: '#ffffff', background: '#ffffff' },
  { name: 'Marigold', text: '#3b2a05', badge: '#f6b232', badgeText: '#13211c', background: '#fffaf0' },
  { name: 'Navy', text: '#14213d', badge: '#1f5fb0', badgeText: '#ffffff', background: '#ffffff' },
  { name: 'Maroon', text: '#4a1420', badge: '#8c1c2f', badgeText: '#ffe9c7', background: '#fff8f3' },
  { name: 'Charcoal', text: '#111111', badge: '#111111', badgeText: '#ffffff', background: '#ffffff' },
  { name: 'Night', text: '#ffffff', badge: '#f6b232', badgeText: '#13211c', background: '#10261f' },
]

/** First letters of the first two words: "Sri Lakshmi Traders" -> "SL". */
export const initialsOf = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => [...w][0].toUpperCase())
    .join('')

function textWidth(ctx: CanvasRenderingContext2D, text: string, spacing: number): number {
  if (!spacing) return ctx.measureText(text).width
  const chars = [...text]
  return chars.reduce((w, ch) => w + ctx.measureText(ch).width, 0) + spacing * Math.max(0, chars.length - 1)
}

function fillText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: number) {
  if (!spacing) return ctx.fillText(text, x, y)
  let at = x
  for (const ch of [...text]) {
    ctx.fillText(ch, at, y)
    at += ctx.measureText(ch).width + spacing
  }
}

/** The fonts a logo needs must be loaded before the canvas can draw with them. */
export async function loadLogoFonts(o: LogoOptions): Promise<void> {
  const f = LOGO_FONTS.find((x) => x.value === o.font) ?? LOGO_FONTS[0]
  if (!document.fonts?.load) return
  await Promise.all([document.fonts.load(`${o.bold ? 700 : f.regular} 40px ${f.family}`), document.fonts.load(`700 40px ${f.family}`), document.fonts.load(`500 40px ${f.family}`)]).catch(() => undefined)
}

/** Paint the logo onto the canvas at the given pixel width. The height follows from the content. */
export function drawLogo(canvas: HTMLCanvasElement, o: LogoOptions, width: number): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const f = LOGO_FONTS.find((x) => x.value === o.font) ?? LOGO_FONTS[0]
  const name = (o.uppercase ? o.name.toUpperCase() : o.name).trim() || 'Your Business'
  const tagline = o.tagline.trim()
  const initials = [...o.initials.trim()].slice(0, 3).join('')
  const hasBadge = o.layout !== 'text' && o.shape !== 'none' && initials !== ''

  // Lay everything out at a reference size, then scale to fit the requested width.
  const NAME = 100
  const TAG = 40
  const BADGE = o.layout === 'top' ? 190 : tagline ? 170 : 140
  const GAP = o.layout === 'top' ? 34 : 40
  const nameFont = `${o.bold ? 700 : f.regular} ${NAME}px ${f.family}`
  const tagFont = `${f.regular === 400 ? 400 : 500} ${TAG}px ${f.family}`
  const spacing = o.spacing * NAME
  ctx.font = nameFont
  const nameW = textWidth(ctx, name, spacing)
  ctx.font = tagFont
  const tagSpacing = TAG * 0.08
  const tagW = tagline ? textWidth(ctx, tagline, tagSpacing) : 0
  const textW = Math.max(nameW, tagW)
  const textH = NAME + (tagline ? TAG * 1.45 : 0)
  const contentW = hasBadge && o.layout === 'left' ? BADGE + GAP + textW : Math.max(hasBadge ? BADGE : 0, textW)
  const contentH = hasBadge && o.layout === 'top' ? BADGE + GAP + textH : Math.max(hasBadge ? BADGE : 0, textH)

  const pad = 0.08 * width
  const scale = Math.min((width - pad * 2) / contentW, 2.2 * (width / 1200))
  const height = Math.round(contentH * scale + pad * 2)
  canvas.width = width
  canvas.height = height
  ctx.clearRect(0, 0, width, height)
  if (!o.transparent) {
    ctx.fillStyle = o.background
    ctx.fillRect(0, 0, width, height)
  }
  ctx.translate((width - contentW * scale) / 2, pad)
  ctx.scale(scale, scale)
  ctx.textBaseline = 'alphabetic'

  let textX = 0
  let textY = (contentH - textH) / 2
  if (hasBadge) {
    const bx = o.layout === 'top' ? (contentW - BADGE) / 2 : 0
    const by = o.layout === 'top' ? 0 : (contentH - BADGE) / 2
    ctx.fillStyle = o.badge
    ctx.beginPath()
    if (o.shape === 'circle') ctx.arc(bx + BADGE / 2, by + BADGE / 2, BADGE / 2, 0, Math.PI * 2)
    else if (o.shape === 'rounded' && ctx.roundRect) ctx.roundRect(bx, by, BADGE, BADGE, BADGE * 0.22)
    else ctx.rect(bx, by, BADGE, BADGE)
    ctx.fill()
    const size = BADGE * (initials.length >= 3 ? 0.36 : initials.length === 2 ? 0.44 : 0.56)
    ctx.font = `700 ${size}px ${f.family}`
    ctx.fillStyle = o.badgeText
    ctx.textAlign = 'center'
    const m = ctx.measureText(initials)
    // Centre on the letters' own height so capitals sit in the middle of the badge.
    ctx.fillText(initials, bx + BADGE / 2, by + BADGE / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2)
    ctx.textAlign = 'left'
    if (o.layout === 'left') textX = BADGE + GAP
    else textY = BADGE + GAP
  }

  const centred = o.layout !== 'left' || !hasBadge
  const areaW = centred ? contentW : textW
  ctx.fillStyle = o.text
  ctx.font = nameFont
  fillText(ctx, name, textX + (centred ? (areaW - nameW) / 2 : 0), textY + NAME * 0.8, spacing)
  if (tagline) {
    ctx.font = tagFont
    ctx.globalAlpha = 0.78
    fillText(ctx, tagline, textX + (centred ? (areaW - tagW) / 2 : 0), textY + NAME + TAG * 1.05, tagSpacing)
    ctx.globalAlpha = 1
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
