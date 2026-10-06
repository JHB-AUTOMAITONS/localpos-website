// Static prerender: renders every route to HTML (with its own title, meta, canonical, Open Graph and JSON-LD),
// then writes sitemap.xml and robots.txt. Run after `vite build` and `vite build --ssr`.
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const ssrEntry = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const { render, SITE, SITE_ROUTES } = await import(ssrEntry)
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

// Preload the fonts every page paints with (body and display Latin subsets, plus the tiny rupee glyph files).
const assets = await fs.readdir(path.join(dist, 'assets'))
const preloads = ['figtree-latin', 'bricolage-grotesque-latin', 'figtree-rupee', 'bricolage-grotesque-rupee']
  .map((stem) => assets.find((f) => f.startsWith(`${stem}-`) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ')

function headHtml(head) {
  const tags = head.tags.map((t) => `<${t.tag} ${Object.entries(t.attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(' ')} data-seo>`)
  const ld = head.jsonLd.map((o) => `<script type="application/ld+json" data-seo>${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
  return [preloads, ...tags, ...ld].filter(Boolean).join('\n    ')
}

function page(html, head) {
  return template
    .replace(/<title>.*?<\/title>/, `<title>${escText(head.title)}</title>`)
    .replace('<!--app-head-->', headHtml(head))
    .replace('<!--app-html-->', html)
}

async function write(file, content) {
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, content, 'utf8')
}

const started = Date.now()
let count = 0
for (const route of SITE_ROUTES) {
  const { html, head } = await render(route.path)
  if (!head) throw new Error(`No <Seo> metadata was rendered for ${route.path}`)
  const out = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path, 'index.html')
  await write(out, page(html, head))
  count++
}

// 404 page (noindex is set by the page itself).
{
  const { html, head } = await render('/page-that-does-not-exist/')
  await write(path.join(dist, '404.html'), page(html, head))
}

const today = new Date().toISOString().slice(0, 10)
const urls = SITE_ROUTES.map(
  (r) =>
    `  <url>\n    <loc>${escText(SITE.url + r.path)}</loc>\n    <lastmod>${r.lastmod ?? today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`,
).join('\n')
await write(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await write(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`)

console.log(`Prerendered ${count} pages + 404.html, sitemap.xml and robots.txt in ${((Date.now() - started) / 1000).toFixed(1)}s`)
console.log(`Site URL: ${SITE.url}`)
