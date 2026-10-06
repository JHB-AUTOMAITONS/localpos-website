import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HeadProvider, type HeadCollector } from '@/lib/head'
import { AppRoutes } from '@/routes'
import { SITE } from '@/data/site'
import { KEYWORD_MAP, SITE_ROUTES } from '@/data/routes'
import type { HeadData } from '@/lib/seo'

export { SITE, SITE_ROUTES, KEYWORD_MAP }

export interface RenderResult {
  html: string
  head: HeadData | null
}

/** Render one URL to static HTML. Waits for every lazy page chunk so the output is complete. */
export function render(url: string): Promise<RenderResult> {
  const collector: HeadCollector = { data: null }
  return new Promise((resolve, reject) => {
    let failed = false
    const stream = renderToPipeableStream(
      <HeadProvider collector={collector}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HeadProvider>,
      {
        // Static output: never stream a boundary out of order. Everything is inlined where it belongs.
        progressiveChunkSize: Number.MAX_SAFE_INTEGER,
        onAllReady() {
          const chunks: Buffer[] = []
          const sink = new Writable({
            write(chunk, _enc, cb) {
              chunks.push(Buffer.from(chunk))
              cb()
            },
            final(cb) {
              if (!failed) resolve({ html: Buffer.concat(chunks).toString('utf8'), head: collector.data })
              cb()
            },
          })
          stream.pipe(sink)
        },
        onShellError(err) {
          failed = true
          reject(err)
        },
        onError(err) {
          failed = true
          reject(err)
        },
      },
    )
  })
}
