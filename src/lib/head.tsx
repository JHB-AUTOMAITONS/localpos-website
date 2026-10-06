import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { buildHead, type HeadData, type SeoInput } from '@/lib/seo'

/**
 * Minimal head manager.
 * - On the server (prerender) the provider collects the page's head data so the
 *   build script can write it into the static HTML.
 * - In the browser the <Seo /> component keeps document.title and the tags
 *   marked data-seo in sync when the route changes.
 */
export interface HeadCollector {
  data: HeadData | null
}

const HeadContext = createContext<HeadCollector | null>(null)

export function HeadProvider({ collector, children }: { collector?: HeadCollector; children: ReactNode }) {
  return <HeadContext.Provider value={collector ?? null}>{children}</HeadContext.Provider>
}

function applyToDocument(head: HeadData) {
  document.title = head.title
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
  for (const t of head.tags) {
    const el = document.createElement(t.tag)
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v)
    el.setAttribute('data-seo', '')
    document.head.appendChild(el)
  }
  for (const node of head.jsonLd) {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-seo', '')
    el.textContent = JSON.stringify(node)
    document.head.appendChild(el)
  }
}

/** Declare the SEO metadata for the current page. Renders nothing. */
export function Seo(props: SeoInput) {
  const collector = useContext(HeadContext)
  const head = buildHead(props)

  if (collector) collector.data = head // server render

  const serialized = JSON.stringify(head)
  useEffect(() => {
    applyToDocument(head)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized])

  return null
}
