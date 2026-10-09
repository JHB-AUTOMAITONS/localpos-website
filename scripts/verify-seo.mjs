// Audits every prerendered page against the "Final SEO URL & Keyword Mapping" rules.
// Run after `npm run build`:  npm run verify
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, process.env.DIST_DIR ?? 'dist')
const { SITE, SITE_ROUTES, KEYWORD_MAP } = await import(pathToFileURL(path.join(root, process.env.SSR_DIR ?? 'dist-ssr', 'entry-server.js')).href)

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ')
const strip = (html) =>
  decode(
    html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim()
const norm = (s) =>
  decode(s)
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9']+/g, ' ')
    .trim()
const has = (text, kw) => ` ${norm(text)} `.includes(` ${norm(kw)} `)
const count = (text, kw) => (` ${norm(text)} `.match(new RegExp(` ${norm(kw).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} `, 'g')) ?? []).length
const slugify = (s) => norm(s).replace(/'/g, '').replace(/\s+/g, '-')
const attr = (html, re) => decode(html.match(re)?.[1] ?? '')

const paths = new Set(SITE_ROUTES.map((r) => r.path))
const keywordFor = new Map(KEYWORD_MAP.map((k) => [k.path, k]))

let errors = 0
let warnings = 0
const rows = []
const titles = new Map()
const descriptions = new Map()
const broken = []

for (const route of SITE_ROUTES) {
  const file = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path, 'index.html')
  const html = await fs.readFile(file, 'utf8')
  const issues = []
  const err = (m) => (issues.push(`ERROR  ${m}`), errors++)
  const warn = (m) => (issues.push(`warn   ${m}`), warnings++)

  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '')
  const description = attr(html, /<meta name="description" content="([^"]*)"/)
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/)
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? ''
  const mainText = strip(main)
  const first100 = mainText.split(' ').slice(0, 100).join(' ')

  const h1s = [...main.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]))
  const h2s = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1]))
  const levels = [...main.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))

  // Basics every page needs
  if (!title) err('missing <title>')
  if (title.length > 62) warn(`title is ${title.length} characters (aim for 60 or fewer)`)
  if (!description) err('missing meta description')
  else if (description.length > 165) warn(`meta description is ${description.length} characters`)
  else if (description.length < 70) warn(`meta description is short (${description.length})`)
  if (canonical !== `${SITE.url}${route.path}`) err(`canonical is "${canonical}", expected "${SITE.url}${route.path}"`)
  if (h1s.length !== 1) err(`expected exactly one H1, found ${h1s.length}`)
  if (levels[0] !== 1) err('first heading in <main> is not an H1')
  for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) err(`heading level jumps from H${levels[i - 1]} to H${levels[i]}`)
  if (!/<html lang="en-IN"/.test(html)) err('missing <html lang="en-IN">')
  if (!/<meta name="viewport"/.test(html)) err('missing viewport meta')
  for (const p of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type']) if (!html.includes(`property="${p}"`)) err(`missing ${p}`)
  for (const n of ['twitter:card', 'twitter:title', 'twitter:description']) if (!html.includes(`name="${n}"`)) err(`missing ${n}`)
  if (/<img(?![^>]*\balt=)[^>]*>/.test(html)) err('<img> without alt text')

  // The page content must be in the static HTML itself, not streamed in later by a script.
  if (/id="B:\d+"|\$RC\(|id="S:\d+"/.test(html)) err('content is streamed out of order (hidden segment); static HTML is incomplete')
  if (mainText.split(' ').length < 120) err(`main content is only ${mainText.split(' ').length} words in the static HTML`)

  // Duplicates
  if (titles.has(title)) err(`duplicate title with ${titles.get(title)}`)
  titles.set(title, route.path)
  if (descriptions.has(description)) err(`duplicate meta description with ${descriptions.get(description)}`)
  descriptions.set(description, route.path)

  // Structured data
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => {
    try {
      return JSON.parse(m[1])
    } catch {
      err('invalid JSON-LD')
      return {}
    }
  })
  const types = ld.map((o) => o['@type'])
  if (route.path !== '/' && !types.includes('BreadcrumbList')) err('missing BreadcrumbList schema')
  if (route.path === '/' && !types.includes('Organization')) err('home is missing Organization schema')
  const faq = ld.find((o) => o['@type'] === 'FAQPage')
  if (faq) {
    for (const q of faq.mainEntity) if (!mainText.includes(q.name.slice(0, 40))) err(`FAQ schema question not visible on page: "${q.name}"`)
  } else if (/<details(?![^>]*data-toc)/.test(main)) warn('page shows an FAQ but has no FAQPage schema')

  // Keyword placement (only for pages that have a keyword mapping)
  const kw = keywordFor.get(route.path)
  let status = 'n/a'
  const keywordDetail = { primary: null, checks: null, occurrences: 0, imageLabels: 0, secondaryUsed: 0, secondaryTotal: 0 }
  if (kw) {
    const p = kw.primary
    const checks = {
      url: route.path === '/' || route.path.includes(slugify(p)),
      title: has(title, p),
      description: has(description, p),
      h1: h1s.some((h) => has(h, p)),
      first100: has(first100, p),
      h2: h2s.some((h) => has(h, p)),
    }
    for (const [k, ok] of Object.entries(checks)) if (!ok) err(`primary keyword "${p}" missing from ${k}`)
    const n = count(mainText, p)
    if (n > 12) warn(`"${p}" appears ${n} times in the main content (check for stuffing)`)
    const alts = [...main.matchAll(/aria-label="([^"]*)"/g)].map((m) => decode(m[1])).filter((a) => has(a, p))
    status = `${Object.values(checks).every(Boolean) ? 'ok' : 'FAIL'} (${n}×, ${alts.length} alt)`
    // Secondary keywords: used naturally somewhere on the page (informational only)
    const used = kw.secondary.filter((s) => has(mainText, s)).length
    if (kw.secondary.length) status += ` sec ${used}/${kw.secondary.length}`
    Object.assign(keywordDetail, { primary: p, checks, occurrences: n, imageLabels: alts.length, secondaryUsed: used, secondaryTotal: kw.secondary.length })
  }

  // Internal links
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = decode(m[1])
    if (!href.startsWith('/') || href.startsWith('//')) continue
    const p = href.split('#')[0].split('?')[0]
    if (p === '' || path.extname(p)) continue
    if (!paths.has(p)) broken.push(`${route.path} -> ${href}`)
  }

  rows.push({
    path: route.path,
    title: title.length,
    desc: description.length,
    h1: h1s[0] ?? '',
    status,
    issues,
    detail: { title, description, canonical, h1: h1s[0] ?? '', h2Count: h2s.length, schema: types, ...keywordDetail },
  })
}

// Structural rules from the document
for (const banned of ['/billing-software/', '/faq/', '/sitemap/']) {
  if (paths.has(banned)) {
    console.log(`ERROR  ${banned} must not exist`)
    errors++
  }
}
for (const required of ['sitemap.xml', 'robots.txt', '404.html']) {
  try {
    await fs.access(path.join(dist, required))
  } catch {
    console.log(`ERROR  dist/${required} was not generated`)
    errors++
  }
}
if (broken.length) {
  errors += broken.length
  console.log('\nBroken internal links:')
  for (const b of [...new Set(broken)]) console.log(`  ${b}`)
}

console.log('\nPAGE'.padEnd(62) + 'TITLE  DESC  KEYWORD CHECK')
for (const r of rows) {
  console.log(`${r.path.padEnd(61)}${String(r.title).padStart(5)} ${String(r.desc).padStart(5)}  ${r.status}`)
  for (const i of r.issues) console.log(`    ${i}`)
}
console.log(`\n${rows.length} pages checked. ${errors} error(s), ${warnings} warning(s).`)
// Machine-readable results for the audit report:  node scripts/verify-seo.mjs --json=test-results/seo.json
const jsonArg = process.argv.find((a) => a.startsWith('--json='))
if (jsonArg) {
  const file = jsonArg.slice('--json='.length)
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify({ errors, warnings, pages: rows.map((r) => ({ path: r.path, issues: r.issues, ...r.detail })) }, null, 1))
}
process.exit(errors ? 1 : 0)
