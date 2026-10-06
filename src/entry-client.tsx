import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ErrorBoundary, reloadOnceForChunkError } from '@/components/ErrorBoundary'
import { HeadProvider } from '@/lib/head'
import { AppRoutes, enableLinkPrefetch, preloadRoute } from '@/routes'
import '@/styles/index.css'

const container = document.getElementById('root')!

const app = (
  <ErrorBoundary scope="app">
    <HeadProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HeadProvider>
  </ErrorBoundary>
)

// If a page's JavaScript cannot be fetched (for example after a new deploy), reload once to get the fresh files.
window.addEventListener('vite:preloadError', (event) => {
  if (reloadOnceForChunkError('Failed to fetch dynamically imported module')) event.preventDefault()
})

async function start() {
  try {
    // Production pages are prerendered: load the page chunk first, then hydrate the existing HTML.
    if (container.childElementCount > 0) {
      await preloadRoute(window.location.pathname)
      hydrateRoot(container, app)
    } else {
      createRoot(container).render(app)
    }
  } catch (error) {
    console.error('[LocalPOS] Could not start the app.', error)
    reloadOnceForChunkError(String((error as Error)?.message ?? error))
    // The prerendered HTML (if any) stays on screen. In development, render so the error overlay can explain it.
    if (container.childElementCount === 0) createRoot(container).render(app)
  }
  enableLinkPrefetch()
}

void start()
