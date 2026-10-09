// Minimal static server for the built site. Mirrors typical static hosting:
// /some/path/ -> dist/some/path/index.html, unknown URLs -> 404.html with a 404 status.
import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import zlib from 'node:zlib'

const compressible = new Set(['.html', '.js', '.css', '.svg', '.xml', '.txt', '.json', '.webmanifest'])
const cache = new Map()

const dist = path.join(process.cwd(), process.env.DIST_DIR ?? 'dist')
const port = Number(process.env.PORT) || 4173
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
}

const mtimes = new Map()

async function tryFile(file) {
  try {
    const stat = await fs.stat(file)
    if (!stat.isFile()) return null
    mtimes.set(file, stat.mtimeMs)
    return await fs.readFile(file)
  } catch {
    return null
  }
}

const server = http
  .createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    const clean = decodeURIComponent(url.pathname)
    if (clean.includes('..')) return res.writeHead(400).end()

    // Redirect /features/x to /features/x/ like most hosts.
    const hasExt = path.extname(clean) !== ''
    if (!hasExt && !clean.endsWith('/')) {
      res.writeHead(301, { Location: `${clean}/${url.search}` })
      return res.end()
    }

    const file = hasExt ? path.join(dist, clean) : path.join(dist, clean, 'index.html')
    const body = await tryFile(file)
    if (body) {
      const ext = path.extname(file)
      const headers = {
        'Content-Type': types[ext] ?? 'application/octet-stream',
        'Cache-Control': clean.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
        Vary: 'Accept-Encoding',
      }
      // Compress text like a real host does (brotli preferred, then gzip). Fonts and images are already compressed.
      if (compressible.has(ext)) {
        const accept = String(req.headers['accept-encoding'] ?? '')
        const enc = accept.includes('br') ? 'br' : accept.includes('gzip') ? 'gzip' : null
        if (enc) {
          const key = `${enc}:${file}:${mtimes.get(file)}` // a rebuilt file gets a new key, so stale output is never served
          if (!cache.has(key)) cache.set(key, enc === 'br' ? zlib.brotliCompressSync(body) : zlib.gzipSync(body))
          res.writeHead(200, { ...headers, 'Content-Encoding': enc })
          return res.end(cache.get(key))
        }
      }
      res.writeHead(200, headers)
      return res.end(body)
    }
    const notFound = await tryFile(path.join(dist, '404.html'))
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(notFound ?? 'Not found')
  })

// If the port is busy (another project's server, for example), try the next ones instead of crashing.
let attempt = port
server.on('error', (err) => {
  // STRICT_PORT=1 (used by the test runner) means "this exact port or fail".
  if (err.code === 'EADDRINUSE' && !process.env.STRICT_PORT && attempt < port + 20) {
    attempt += 1
    server.listen(attempt)
  } else {
    throw err
  }
})
server.on('listening', () => console.log(`Serving dist/ at http://localhost:${server.address().port}/`))
server.listen(attempt)
