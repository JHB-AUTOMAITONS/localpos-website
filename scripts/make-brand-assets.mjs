// Builds every logo and icon file from one source image: brand/localpos-logo.png (2400x2400, transparent background,
// symbol on top and the "LOCAL POS" wordmark below). Run `node scripts/make-brand-assets.mjs` after replacing that file.
// It uses the Chrome already installed for the tests to do the drawing; nothing is downloaded.
//
// Writes:
//   src/assets/brand/logo-horizontal.webp   symbol + wordmark side by side (header and footer)
//   src/assets/brand/logo-mark.webp         symbol only (the app mock-ups)
//   public/favicon.ico (16/32/48), public/icon-192.png, public/icon-512.png, public/apple-touch-icon.png
//   public/logo-512.png                     full stacked logo on white (search engines: Organization logo)
//   public/og-default.jpg                   the existing social-share picture with the new logo in its top-left corner
import { chromium } from '@playwright/test'
import fs from 'node:fs'

const source = fs.readFileSync('brand/localpos-logo.png').toString('base64')
const og = fs.readFileSync('public/og-default.jpg').toString('base64')
const channel = process.env.PW_CHANNEL === '' ? undefined : (process.env.PW_CHANNEL ?? 'chrome')
const browser = await chromium.launch({ channel, headless: true })
const page = await browser.newPage()

const out = await page.evaluate(
  async ({ source, og }) => {
    const load = async (src) => {
      const img = new Image()
      img.src = src
      await img.decode()
      return img
    }
    const canvas = (w, h) => {
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const x = c.getContext('2d', { willReadFrequently: true })
      x.imageSmoothingEnabled = true
      x.imageSmoothingQuality = 'high'
      return [c, x]
    }
    const logo = await load('data:image/png;base64,' + source)
    const W = logo.naturalWidth
    const H = logo.naturalHeight
    const [, sx] = canvas(W, H)
    sx.drawImage(logo, 0, 0)
    const data = sx.getImageData(0, 0, W, H).data
    const visible = (i, j) => data[(j * W + i) * 4 + 3] > 24

    // The artwork is two horizontal bands separated by empty rows: the symbol, then the wordmark.
    const bands = []
    let start = -1
    for (let j = 0; j <= H; j++) {
      let any = false
      if (j < H) for (let i = 0; i < W; i++) if (visible(i, j)) { any = true; break }
      if (any && start < 0) start = j
      if (!any && start >= 0) {
        if (j - start > 20) bands.push([start, j])
        start = -1
      }
    }
    if (bands.length !== 2) throw new Error('Expected a symbol and a wordmark (2 bands of artwork), found ' + bands.length)
    const box = ([y0, y1]) => {
      let x0 = W
      let x1 = 0
      for (let j = y0; j < y1; j++) for (let i = 0; i < W; i++) if (visible(i, j)) { if (i < x0) x0 = i; if (i > x1) x1 = i }
      return { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 }
    }
    const mark = box(bands[0])
    const word = box(bands[1])
    const full = { x: Math.min(mark.x, word.x), y: mark.y, w: Math.max(mark.x + mark.w, word.x + word.w) - Math.min(mark.x, word.x), h: word.y + word.h - mark.y }

    /** Draw part of the source into a box, keeping proportions (halving in steps so small sizes stay crisp). */
    const draw = (ctx, part, dx, dy, dw, dh) => {
      let [c, x] = canvas(part.w, part.h)
      x.drawImage(logo, part.x, part.y, part.w, part.h, 0, 0, part.w, part.h)
      while (c.width > dw * 2) {
        const [n, nx] = canvas(Math.ceil(c.width / 2), Math.ceil(c.height / 2))
        nx.drawImage(c, 0, 0, n.width, n.height)
        c = n
        x = nx
      }
      ctx.drawImage(c, dx, dy, dw, dh)
    }

    // Header / footer logo: 3x of a 40 px tall header logo.
    const M = 120
    const markW = Math.round((M * mark.w) / mark.h)
    const gap = Math.round(M * 0.2)
    const wordH = Math.round(M * 0.43)
    const wordW = Math.round((wordH * word.w) / word.h)
    const [hc, hx] = canvas(markW + gap + wordW, M)
    draw(hx, mark, 0, 0, markW, M)
    draw(hx, word, markW + gap, Math.round((M - wordH) / 2), wordW, wordH)

    const [mc, mx] = canvas(Math.round((96 * mark.w) / mark.h), 96)
    draw(mx, mark, 0, 0, mc.width, mc.height)

    /** The symbol centred on a white square (rounded corners optional), so the navy "L" stays visible on dark tabs and home screens. */
    const icon = (size, pad, radius) => {
      const [c, x] = canvas(size, size)
      x.fillStyle = '#ffffff'
      x.beginPath()
      x.roundRect(0, 0, size, size, radius * size)
      x.fill()
      const room = size * (1 - 2 * pad)
      const scale = Math.min(room / mark.w, room / mark.h)
      const w = mark.w * scale
      const h = mark.h * scale
      draw(x, mark, (size - w) / 2, (size - h) / 2, w, h)
      return c.toDataURL('image/png')
    }

    const [lc, lx] = canvas(512, 512)
    lx.fillStyle = '#ffffff'
    lx.fillRect(0, 0, 512, 512)
    const s = Math.min(440 / full.w, 440 / full.h)
    draw(lx, full, (512 - full.w * s) / 2, (512 - full.h * s) / 2, full.w * s, full.h * s)

    // Social-share picture: put the new logo on a white card that fully covers the previous logo in the top-left corner.
    const ogImg = await load('data:image/jpeg;base64,' + og)
    const [oc, ox] = canvas(ogImg.naturalWidth, ogImg.naturalHeight)
    ox.drawImage(ogImg, 0, 0)
    ox.save()
    ox.shadowColor = 'rgba(19,33,28,0.14)'
    ox.shadowBlur = 24
    ox.shadowOffsetY = 8
    ox.fillStyle = '#ffffff'
    ox.beginPath()
    ox.roundRect(56, 42, 312, 92, 20)
    ox.fill()
    ox.restore()
    const th = 60
    const tw = (th * hc.width) / hc.height
    ox.drawImage(hc, 56 + (312 - tw) / 2, 42 + (92 - th) / 2, tw, th)

    return {
      sizes: { horizontal: [hc.width, hc.height], mark: [mc.width, mc.height] },
      files: {
        'src/assets/brand/logo-horizontal.webp': hc.toDataURL('image/webp', 0.92),
        'src/assets/brand/logo-mark.webp': mc.toDataURL('image/webp', 0.92),
        'public/icon-192.png': icon(192, 0.1, 0.18),
        'public/icon-512.png': icon(512, 0.1, 0.18),
        'public/apple-touch-icon.png': icon(180, 0.12, 0), // iOS rounds the corners itself and needs an opaque square
        'public/logo-512.png': lc.toDataURL('image/png'),
        'public/og-default.jpg': oc.toDataURL('image/jpeg', 0.88),
      },
      ico: [icon(16, 0.02, 0.18), icon(32, 0.05, 0.18), icon(48, 0.06, 0.18)],
    }
  },
  { source, og },
)
await browser.close()

const bytes = (dataUrl) => Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64')
fs.mkdirSync('src/assets/brand', { recursive: true })
for (const [file, url] of Object.entries(out.files)) fs.writeFileSync(file, bytes(url))

// favicon.ico: a small header and directory followed by the PNG images (supported by every current browser).
const images = out.ico.map(bytes)
const header = Buffer.alloc(6 + images.length * 16)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(images.length, 4)
let offset = header.length
images.forEach((img, i) => {
  const at = 6 + i * 16
  const size = [16, 32, 48][i]
  header.writeUInt8(size, at)
  header.writeUInt8(size, at + 1)
  header.writeUInt16LE(1, at + 4)
  header.writeUInt16LE(32, at + 6)
  header.writeUInt32LE(img.length, at + 8)
  header.writeUInt32LE(offset, at + 12)
  offset += img.length
})
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, ...images]))

console.log('sizes', JSON.stringify(out.sizes))
for (const f of [...Object.keys(out.files), 'public/favicon.ico']) console.log(String(fs.statSync(f).size).padStart(7), f)
