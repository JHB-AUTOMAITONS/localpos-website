// Builds AUDIT_REPORT.md from MEASURED data, so the tables cannot drift from what was actually tested:
//   - test-results/results*.json     Playwright results (npm run test:e2e writes results-main.json and results-perf.json)
//   - test-results/seo.json          node scripts/verify-seo.mjs --json=test-results/seo.json
//   - test-results/lighthouse/*.json node scripts/lighthouse-audit.mjs   (optional)
//   - dist/                          for bundle sizes (DIST_DIR overrides)
// The hand-written narrative (findings and fixes) lives in scripts/audit-report.template.md; {{PLACEHOLDERS}} are replaced.
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const root = process.cwd()
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'))
const exists = (f) => fs.existsSync(path.join(root, f))
const dist = path.join(root, process.env.DIST_DIR ?? 'dist')

/* ---------- flatten Playwright results ---------- */
// run-e2e.mjs writes one JSON file per pass (main and performance); a plain `playwright test` writes results.json. Merge whatever is there.
const resultFiles = fs.readdirSync(path.join(root, 'test-results')).filter((f) => /^results(-.*)?\.json$/.test(f))
if (!resultFiles.length) throw new Error('No test-results/results*.json found: run the tests first (npm run test:e2e)')
const results = { suites: resultFiles.flatMap((f) => read('test-results/' + f).suites) }
const rows = []
function walk(suite, trail) {
  const here = suite.title && !/\.spec\.ts$/.test(suite.title) ? [...trail, suite.title] : trail
  for (const spec of suite.specs ?? []) {
    for (const t of spec.tests ?? []) {
      const last = t.results?.at(-1)
      rows.push({
        file: (spec.file ?? suite.file ?? '').replace(/^.*[\\/]/, ''),
        project: t.projectName,
        title: [...here, spec.title].join(' › '),
        short: spec.title,
        status: t.status === 'expected' ? 'passed' : t.status === 'skipped' ? 'skipped' : t.status === 'flaky' ? 'flaky' : 'failed',
        ms: last?.duration ?? 0,
        error: (last?.error?.message ?? '').replace(/\u001b\[[0-9;]*m/g, '').split('\n').slice(0, 6).join(' | ').slice(0, 400),
      })
    }
  }
  for (const s of suite.suites ?? []) walk(s, here)
}
for (const s of results.suites) walk(s, [])

const count = (list, st) => list.filter((r) => r.status === st).length
const totals = { total: rows.length, passed: count(rows, 'passed'), failed: count(rows, 'failed'), skipped: count(rows, 'skipped'), flaky: count(rows, 'flaky') }
const icon = (s) => ({ passed: 'PASS', failed: 'FAIL', skipped: 'skipped', flaky: 'FLAKY' })[s]
const esc = (s) => String(s).replace(/\|/g, '\\|')
const table = (head, body) => `| ${head.join(' | ')} |\n| ${head.map(() => '---').join(' | ')} |\n${body.map((r) => `| ${r.map(esc).join(' | ')} |`).join('\n')}`

/* ---------- tables ---------- */
const files = [...new Set(rows.map((r) => r.file))].sort()
const projects = [...new Set(rows.map((r) => r.project))]
const suiteSummary = table(
  ['Spec file', ...projects.map((p) => `${p} (pass/fail/skip)`)],
  files.map((f) => [f, ...projects.map((p) => {
    const l = rows.filter((r) => r.file === f && r.project === p)
    return l.length ? `${count(l, 'passed')} / ${count(l, 'failed')} / ${count(l, 'skipped')}` : '-'
  })]),
)

const responsiveRows = rows.filter((r) => r.file === 'responsive.spec.ts')
const responsiveTable = table(
  ['Viewport width', 'Result', 'Detail'],
  responsiveRows
    .map((r) => [Number(/^(\d+)px/.exec(r.short)?.[1] ?? 0), r])
    .sort((a, b) => a[0] - b[0])
    .map(([w, r]) => [`${w}px`, icon(r.status), r.status === 'passed' ? 'All routes: no horizontal overflow, H1 inside viewport' : r.error]),
)

const perRoute = (file) => rows.filter((r) => r.file === file && r.project)
const routeSpecs = ['routes.spec.ts', 'links.spec.ts', 'a11y.spec.ts', 'layout-quality.spec.ts']
const routeMatrix = (() => {
  const routePaths = [...new Set(rows.filter((r) => r.file === 'routes.spec.ts' && r.short.startsWith('/')).map((r) => r.short))]
  return table(
    ['Route', 'Loads, 1 H1, no console errors, no overflow', 'Links and buttons', 'axe accessibility', 'Layout quality'],
    routePaths.map((p) => {
      const cell = (file) => {
        const l = rows.filter((r) => r.file === file && r.short === p)
        if (!l.length) return '-'
        return l.every((r) => r.status === 'passed') ? `PASS (${l.length}/${l.length} viewports)` : `FAIL (${count(l, 'passed')}/${l.length} viewports)`
      }
      return [p, cell('routes.spec.ts'), cell('links.spec.ts'), cell('a11y.spec.ts'), cell('layout-quality.spec.ts')]
    }),
  )
})()

const named = rows.filter((r) => ['navigation.spec.ts', 'journeys.spec.ts', 'forms.spec.ts', 'perf.spec.ts', 'seo.spec.ts'].includes(r.file) || (r.file === 'links.spec.ts' && !r.short.startsWith('/')) || (r.file === 'routes.spec.ts' && !r.short.startsWith('/')) || (r.file === 'a11y.spec.ts' && !r.short.startsWith('/')))
const grouped = new Map()
for (const r of named) {
  const key = `${r.file}::${r.title}`
  const g = grouped.get(key) ?? { file: r.file, title: r.title, by: [] }
  g.by.push(r)
  grouped.set(key, g)
}
const e2eNamed = table(
  ['Spec', 'Test', 'Result by project'],
  [...grouped.values()]
    .filter((g) => !(g.file === 'seo.spec.ts' && /structured data|static HTML and hydrated/.test(g.title) && g.title.split(' › ').at(-1)?.startsWith('/')))
    // Per-route rows are summarised elsewhere, except the per-page performance checks, which have no other table.
    .filter((g) => g.file === 'perf.spec.ts' || !g.title.split(' › ').at(-1)?.startsWith('/'))
    // The performance describe names ("mobile 390", "desktop 1440") are the only thing telling two otherwise identical rows apart.
    .map((g) => [g.file.replace('.spec.ts', ''), g.file === 'perf.spec.ts' ? g.title.replace('Core Web Vitals proxies, ', '') : g.title.replace(/^[^›]*› /, ''), g.by.map((r) => `${r.project ?? ''}: ${icon(r.status)}`).join(', ')]),
)

const routeLevel = (file, label) => {
  const l = rows.filter((r) => r.file === file && r.short.startsWith('/'))
  return `${label}: ${count(l, 'passed')} of ${l.length} route checks passed`
}

/* ---------- Netlify deployment (measured from netlify.toml, dist/ and deploy.spec.ts) ---------- */
const toml = exists('netlify.toml') ? fs.readFileSync(path.join(root, 'netlify.toml'), 'utf8') : ''
const tomlValue = (key) => new RegExp(`^\\s*${key}\\s*=\\s*"([^"]*)"`, 'm').exec(toml)?.[1] ?? '(not set)'
const distHtml = (p) => path.join(dist, p === '/' ? '' : p, 'index.html')
const allHtml = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? allHtml(path.join(dir, e.name)) : e.name.endsWith('.html') ? [path.join(dir, e.name)] : []))
const distPages = fs.existsSync(dist) ? allHtml(dist) : []
const unreplaced = distPages.filter((f) => /<!--app-(html|head)-->/.test(fs.readFileSync(f, 'utf8'))).length
const sitemapUrls = fs.existsSync(path.join(dist, 'sitemap.xml')) ?(fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8').match(/<loc>/g) ?? []).length : 0
const rewriteRules = /^\s*\[\[redirects\]\]/m.test(toml) || exists('public/_redirects') || fs.existsSync(path.join(dist, '_redirects'))
const netlifyConfig = table(
  ['Setting or output', 'Value (read from the repository and dist/ when this report was generated)'],
  [
    ['netlify.toml present', toml ? 'yes' : 'NO'],
    ['Build command', tomlValue('command')],
    ['Publish directory', tomlValue('publish')],
    ['NODE_VERSION', tomlValue('NODE_VERSION')],
    ['VITE_SITE_URL (canonical origin)', tomlValue('VITE_SITE_URL')],
    ['Catch-all rewrite or _redirects file', rewriteRules ? 'present' : 'none (intentional: unknown URLs get dist/404.html with a real 404)'],
    ['dist/404.html', fs.existsSync(path.join(dist, '404.html')) ? 'present' : 'MISSING'],
    ['dist/sitemap.xml', `${sitemapUrls} URLs`],
    ['dist/robots.txt', fs.existsSync(path.join(dist, 'robots.txt')) ? 'present' : 'MISSING'],
    ['HTML files in dist/ still containing an unreplaced prerender placeholder', `${unreplaced} of ${distPages.length}`],
  ],
)
const deployRows = rows.filter((r) => r.file === 'deploy.spec.ts' && r.short.startsWith('/'))
const deployRoutes = table(
  ['Route', 'Prerendered file in dist/', 'Canonical link', 'Direct URL, refresh, raw HTML and assets (deploy.spec)'],
  deployRows.map((r) => {
    const f = distHtml(r.short)
    const ok = fs.existsSync(f)
    return [r.short, ok ? `yes (${(fs.statSync(f).size / 1024).toFixed(0)} KB)` : 'MISSING', ok ? (/<link rel="canonical" href="([^"]*)"/.exec(fs.readFileSync(f, 'utf8'))?.[1] ?? 'missing') : '-', icon(r.status)]
  }),
)
const unknownRow = rows.find((r) => r.file === 'deploy.spec.ts' && r.short.startsWith('an unknown URL'))

/* ---------- SEO ---------- */
let seoTable = '_seo.json not found: run `node scripts/verify-seo.mjs --json=test-results/seo.json`_'
let seoErrors = 0
let seoWarnings = 0
if (exists('test-results/seo.json')) {
  const seo = read('test-results/seo.json')
  seoErrors = seo.errors
  seoWarnings = seo.warnings
  const yes = (v) => (v ? 'yes' : 'NO')
  seoTable = table(
    ['Route', 'H1', 'Title (chars)', 'Meta description (chars)', 'Primary keyword', 'URL / title / desc / H1 / first 100 words / H2', 'Canonical', 'Structured data'],
    seo.pages.map((p) => [
      p.path,
      p.h1,
      `${p.title} (${p.title.length})`,
      `${p.description.length}`,
      p.primary ?? 'n/a (no keyword mapped)',
      p.checks ? [p.checks.url, p.checks.title, p.checks.description, p.checks.h1, p.checks.first100, p.checks.h2].map(yes).join(' / ') : 'n/a',
      p.canonical.replace(/^https?:\/\/[^/]+/, '') || '/',
      p.schema.join(', '),
    ]),
  )
}

/* ---------- Lighthouse ---------- */
let lighthouse = '_Lighthouse was not run for this report._'
let lowestPerf = 100
let lowestOther = 100
const lhDir = path.join(root, 'test-results', 'lighthouse')
if (fs.existsSync(lhDir)) {
  const files = fs.readdirSync(lhDir).filter((f) => f.endsWith('.json')).sort()
  const body = files.map((f) => {
    const j = JSON.parse(fs.readFileSync(path.join(lhDir, f), 'utf8'))
    const s = (k) => Math.round(j.categories[k].score * 100)
    lowestPerf = Math.min(lowestPerf, s('performance'))
    lowestOther = Math.min(lowestOther, s('accessibility'), s('best-practices'), s('seo'))
    const [name, form] = f.replace('.json', '').split(/-(mobile|desktop)$/).filter(Boolean)
    const a = (id) => j.audits[id].displayValue?.replace(/ /g, ' ') ?? '-'
    return [new URL(j.finalDisplayedUrl).pathname, form, s('performance'), s('accessibility'), s('best-practices'), s('seo'), a('first-contentful-paint'), a('largest-contentful-paint'), a('total-blocking-time'), a('cumulative-layout-shift')]
  })
  if (body.length) lighthouse = table(['Page', 'Profile', 'Performance', 'Accessibility', 'Best practices', 'SEO', 'FCP', 'LCP', 'TBT', 'CLS'], body)
}

/* ---------- bundle ---------- */
let bundle = '_dist/ not found_'
if (fs.existsSync(path.join(dist, 'assets'))) {
  const assets = fs.readdirSync(path.join(dist, 'assets'))
  const size = (f) => {
    const b = fs.readFileSync(path.join(dist, 'assets', f))
    return [b.length, zlib.brotliCompressSync(b).length]
  }
  const kb = (n) => (n / 1024).toFixed(1)
  const main = assets.filter((f) => /^index-.*\.js$/.test(f))
  const css = assets.filter((f) => f.endsWith('.css'))
  const fonts = assets.filter((f) => f.endsWith('.woff2'))
  const chunks = assets.filter((f) => f.endsWith('.js') && !/^index-/.test(f))
  const sum = (list) => list.reduce((a, f) => a + size(f)[1], 0)
  bundle = table(
    ['Asset', 'Raw (KB)', 'Brotli (KB)'],
    [
      ...main.map((f) => ['Main script: ' + f, kb(size(f)[0]), kb(size(f)[1])]),
      ...css.map((f) => ['Stylesheet: ' + f, kb(size(f)[0]), kb(size(f)[1])]),
      ...fonts.map((f) => ['Font: ' + f, kb(size(f)[0]), kb(size(f)[1])]),
      ['Page chunks (' + chunks.length + ' files, loaded one page at a time)', kb(chunks.reduce((a, f) => a + size(f)[0], 0)), kb(sum(chunks))],
    ],
  )
}

/* ---------- failures + status ---------- */
const failures = rows.filter((r) => r.status === 'failed')
const failureTable = failures.length ? table(['Spec', 'Project', 'Test', 'Error'], failures.map((r) => [r.file, r.project ?? '', r.title, r.error])) : '_No failing tests in the final run._'
let status = 'PASS'
if (totals.failed > 0 || seoErrors > 0) status = 'FAIL'
else if (seoWarnings > 0 || lowestPerf < 90 || lowestOther < 100 || totals.skipped > 0) status = 'PASS WITH WARNINGS'

const data = {
  DATE: new Date(process.env.AUDIT_DATE ?? Date.now()).toISOString().slice(0, 10),
  STATUS: status,
  TOTALS: `${totals.passed} passed, ${totals.failed} failed, ${totals.skipped} skipped, ${totals.flaky} flaky, ${totals.total} total`,
  SUITE_SUMMARY: suiteSummary,
  ROUTE_MATRIX: routeMatrix,
  RESPONSIVE_TABLE: responsiveTable,
  E2E_NAMED: e2eNamed,
  SEO_TABLE: seoTable,
  SEO_COUNTS: `${seoErrors} error${seoErrors === 1 ? '' : 's'}, ${seoWarnings} warning${seoWarnings === 1 ? '' : 's'}`,
  LIGHTHOUSE: lighthouse,
  BUNDLE: bundle,
  FAILURES: failureTable,
  NETLIFY_CONFIG: netlifyConfig,
  DEPLOY_ROUTES: deployRoutes,
  DEPLOY_COUNTS: `${count(deployRows, 'passed')} of ${deployRows.length} required routes passed`,
  DEPLOY_UNKNOWN: unknownRow ? icon(unknownRow.status) : 'not run',
  CONSOLE: routeLevel('routes.spec.ts', 'Console errors, failed requests, broken images, hydration errors (asserted empty on every route and viewport)'),
  LINKS: routeLevel('links.spec.ts', 'Links and buttons'),
  AXE: routeLevel('a11y.spec.ts', 'axe-core (WCAG 2.0/2.1 A + AA + best practice)'),
  LAYOUT: routeLevel('layout-quality.spec.ts', 'Layout quality (text size, tap targets, heading wrap, line length)'),
}

const templatePath = path.join(root, 'scripts', 'audit-report.template.md')
if (fs.existsSync(templatePath)) {
  let md = fs.readFileSync(templatePath, 'utf8')
  md = md.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in data ? data[k] : m))
  fs.writeFileSync(path.join(root, 'AUDIT_REPORT.md'), md)
  console.log(`AUDIT_REPORT.md written (${status}; ${data.TOTALS})`)
} else {
  fs.writeFileSync(path.join(root, 'test-results', 'report-data.json'), JSON.stringify(data, null, 1))
  console.log('template missing; wrote test-results/report-data.json')
}
