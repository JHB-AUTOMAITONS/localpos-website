import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/** Reset scroll on navigation (or jump to a #hash), then move focus to <main> for keyboard and screen-reader users. */
function RouteEffects() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)
  const [announcement, setAnnouncement] = useState('')

  useLayoutEffect(() => {
    if (first.current) return
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
    setAnnouncement(`Navigated to ${document.title}`)
  }, [pathname])

  return (
    <div aria-live="polite" role="status" className="sr-only">
      {announcement}
    </div>
  )
}

export function SiteLayout() {
  const { pathname } = useLocation()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand-700 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* Suspense lives inside the layout so the header and footer never disappear while a page chunk loads. */}
        {/* Keyed by path: moving to another page clears any error from the previous one. */}
        <ErrorBoundary key={pathname} scope="page">
          <Suspense fallback={<div aria-hidden="true" className="min-h-[70vh]" />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <RouteEffects />
    </>
  )
}
