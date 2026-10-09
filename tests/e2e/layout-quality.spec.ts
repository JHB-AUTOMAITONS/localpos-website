import { expect, test } from '@playwright/test'
import { open, ROUTES, scrollThrough } from './helpers'

/**
 * Heuristic layout-quality checks, run at the project's viewport (390 / 768 / 1440):
 * readable text size, tap-target size, heading wrapping and content width.
 * Decorative product mockups (role="img" / aria-hidden) are excluded: they are pictures of a UI, not UI.
 */
test.describe('layout quality', () => {
  for (const route of ROUTES) {
    test(`${route}`, async ({ page }) => {
      await open(page, route)
      await scrollThrough(page)
      await page.waitForTimeout(500)

      const result = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth
        const skip = (el: Element) => !!el.closest('[role="img"], [aria-hidden="true"], .sr-only, [hidden], svg, script, style')
        const visible = (el: Element) => {
          const r = el.getBoundingClientRect()
          const cs = getComputedStyle(el)
          return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0
        }

        // 1. text that is too small to read
        const small: string[] = []
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const text = (n.textContent ?? '').trim()
          const el = n.parentElement
          if (!text || !el || skip(el) || !visible(el)) continue
          const size = parseFloat(getComputedStyle(el).fontSize)
          if (size < 11) small.push(`${size.toFixed(1)}px "${text.slice(0, 40)}"`)
        }

        // 2. tap targets
        const tooSmall: string[] = []
        const buttonLike: string[] = []
        const targets = document.querySelectorAll('a[href], button, summary, input:not([type=hidden]), select, textarea, [role=tab], [role=radio]')
        for (const el of targets) {
          if (skip(el) || !visible(el)) continue
          const r = el.getBoundingClientRect()
          if (r.bottom < 0) continue
          const parent = el.parentElement
          const inline = el.tagName === 'A' && parent && /^(P|LI|DD|TD|SPAN|SMALL|H[1-6])$/.test(parent.tagName) && (parent.textContent ?? '').trim().length > (el.textContent ?? '').trim().length + 6
          const cs = getComputedStyle(el)
          const label = `${el.tagName.toLowerCase()} "${(el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`
          if (!inline && (r.height < 24 || r.width < 24)) tooSmall.push(label)
          const filled = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent'
          const bordered = parseFloat(cs.borderTopWidth) > 0
          if ((el.tagName === 'BUTTON' || el.tagName === 'A') && (filled || bordered) && parseFloat(cs.paddingLeft) >= 12 && r.width > 60 && r.height < 40 && !el.closest('[role=tablist]') && !el.closest('details')) buttonLike.push(label)
        }

        // 3. heading wrapping
        const h1 = document.querySelector('h1')!
        const h1cs = getComputedStyle(h1)
        const h1lines = Math.round(h1.getBoundingClientRect().height / parseFloat(h1cs.lineHeight))
        const h1size = parseFloat(h1cs.fontSize)

        // 4. line length of long-form text
        const longLines: string[] = []
        for (const p of document.querySelectorAll('main p')) {
          if (skip(p) || !visible(p)) continue
          const w = p.getBoundingClientRect().width
          const size = parseFloat(getComputedStyle(p).fontSize)
          if (w / size > 62 && (p.textContent ?? '').length > 200) longLines.push(`${Math.round(w / size)}ch "${(p.textContent ?? '').slice(0, 30)}"`)
        }
        return { vw, small: [...new Set(small)].slice(0, 8), tooSmall: tooSmall.slice(0, 8), buttonLike: buttonLike.slice(0, 8), h1lines, h1size, longLines: longLines.slice(0, 4) }
      })

      expect(result.small, 'text under 11px').toEqual([])
      expect(result.tooSmall, 'interactive targets smaller than 24x24 (WCAG 2.5.8)').toEqual([])
      expect(result.buttonLike, 'button-style controls shorter than 40px').toEqual([])
      expect(result.h1lines, `H1 wraps to ${result.h1lines} lines`).toBeLessThanOrEqual(result.vw < 500 ? 6 : 5)
      expect(result.h1size, 'H1 font size').toBeGreaterThanOrEqual(28)
      expect(result.h1size, 'H1 font size').toBeLessThanOrEqual(72)
      expect(result.longLines, 'paragraphs wider than ~62 characters').toEqual([])
    })
  }
})
