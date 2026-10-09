// Runs Lighthouse (mobile + desktop) for representative pages and stores the JSON in test-results/lighthouse/.
// Needs Chrome or Edge installed. Lighthouse itself is fetched on demand by npx (not a project dependency).
//
//   node scripts/preview.mjs                      # in one terminal (or: PORT=4530 DIST_DIR=dist-next node scripts/preview.mjs)
//   BASE_URL=http://localhost:4173 node scripts/lighthouse-audit.mjs
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const base = (process.env.BASE_URL ?? 'http://localhost:4173').replace(/\/$/, '')
const out = path.join(process.cwd(), 'test-results', 'lighthouse')
fs.mkdirSync(out, { recursive: true })

const PAGES = [
  ['home', '/'],
  ['feature-pos', '/features/pos-billing-software/'],
  ['feature-gst', '/features/gst-billing-software/'],
  ['solution-restaurant', '/solutions/restaurant-billing-software/'],
  ['pricing', '/pricing/'],
  ['book-a-demo', '/book-a-demo/'],
  ['blog-post', '/blog/gst-invoice-format-in-india/'],
]

const candidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean)
const chrome = candidates.find((p) => fs.existsSync(p))
if (!chrome) throw new Error('No Chrome/Edge found. Set CHROME_PATH.')

for (const [name, url] of PAGES) {
  for (const form of ['mobile', 'desktop']) {
    const file = path.join(out, `${name}-${form}.json`)
    const args = ['--yes', 'lighthouse@12', `${base}${url}`, '--output=json', `--output-path=${file}`, '--chrome-flags=--headless=new --no-sandbox', '--quiet', '--only-categories=performance,accessibility,best-practices,seo']
    if (form === 'desktop') args.push('--preset=desktop')
    // On Windows the command runs through cmd.exe, which splits unquoted arguments at spaces (this project's path has one).
    const win = process.platform === 'win32'
    const cmdArgs = win ? args.map((a) => (/\s/.test(a) ? `\"${a}\"` : a)) : args
    process.stdout.write(`${name} (${form}) ... `)
    execFileSync(win ? 'npx.cmd' : 'npx', cmdArgs, { env: { ...process.env, CHROME_PATH: chrome }, stdio: ['ignore', 'ignore', 'inherit'], shell: process.platform === 'win32' })
    const j = JSON.parse(fs.readFileSync(file, 'utf8'))
    const s = (k) => Math.round(j.categories[k].score * 100)
    console.log(`perf ${s('performance')}  a11y ${s('accessibility')}  best-practices ${s('best-practices')}  seo ${s('seo')}  | LCP ${j.audits['largest-contentful-paint'].displayValue}  CLS ${j.audits['cumulative-layout-shift'].displayValue}  TBT ${j.audits['total-blocking-time'].displayValue}`)
  }
}
