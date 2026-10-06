import { Component, type ErrorInfo, type ReactNode } from 'react'

const CHUNK_ERROR = /dynamically imported module|importing a module script failed|loading chunk|loading css chunk/i
const RELOAD_FLAG = 'lp-chunk-reload'

/** Reload once if a page's code could not be fetched (a new deploy, a restarted dev server, a flaky connection). */
export function reloadOnceForChunkError(message: string): boolean {
  if (!CHUNK_ERROR.test(message)) return false
  try {
    if (sessionStorage.getItem(RELOAD_FLAG)) return false
    sessionStorage.setItem(RELOAD_FLAG, String(Date.now()))
  } catch {
    // Storage can be blocked; fall through and just reload once.
  }
  window.location.reload()
  return true
}

interface Props {
  children: ReactNode
  /** "page" keeps the header and footer on screen; "app" is the last line of defence. */
  scope?: 'page' | 'app'
}

/**
 * Catches render errors so the site never turns into a blank screen.
 * It shows a short message with a way out instead.
 */
export class ErrorBoundary extends Component<Props, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[LocalPOS] Something failed while rendering this page.', error, info.componentStack)
    reloadOnceForChunkError(String(error?.message ?? error))
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div role="alert" className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="font-mono text-[0.85rem] font-bold uppercase tracking-[0.25em] text-ink-3">Something went wrong</p>
        <h1 className="display-2 mt-4">This page could not be shown</h1>
        <p className="lead mt-4">It is probably a temporary problem. Reloading usually fixes it, or you can head back to the home page.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => window.location.reload()} className="h-12 rounded-xl bg-brand-600 px-6 font-semibold text-white hover:bg-brand-700">
            Reload this page
          </button>
          <a href="/" className="inline-flex h-12 items-center justify-center rounded-xl border border-line-strong bg-white px-6 font-semibold text-ink hover:bg-brand-50">
            Go to the home page
          </a>
        </div>
      </div>
    )
  }
}
