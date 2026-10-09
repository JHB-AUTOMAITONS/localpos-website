import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Icon, type IconName } from '@/components/Icon'
import { Logo } from '@/components/Logo'
import { CTAButton } from '@/components/ui/CTAButton'
import { FEATURE_META } from '@/data/featureMeta'
import { SOLUTION_META } from '@/data/solutionMeta'
import { BLOG_META } from '@/data/blogMeta'
import { SITE } from '@/data/site'
import { TINTS } from '@/lib/tint'
import type { Tint } from '@/data/types'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { cn } from '@/lib/cn'

type MenuKey = 'features' | 'solutions' | 'resources'

interface MenuItem {
  label: string
  blurb: string
  href: string
  icon: IconName
  tint: Tint
}

const featureItems: MenuItem[] = FEATURE_META.map((f) => ({ label: f.navLabel, blurb: f.navBlurb, href: f.path, icon: f.icon, tint: f.tint }))
const solutionItems: MenuItem[] = SOLUTION_META.map((s) => ({ label: s.navLabel, blurb: s.navBlurb, href: s.path, icon: s.icon, tint: s.tint }))
const latestPosts = BLOG_META.slice(0, 3)

const linkBase =
  'inline-flex h-10 items-center gap-1 rounded-lg px-3 text-[0.9688rem] font-semibold text-ink-2 transition-colors hover:bg-brand-50 hover:text-brand-800'

function ItemTile({ item }: { item: MenuItem }) {
  const t = TINTS[item.tint]
  return (
    <Link
      to={item.href}
      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-paper-2 focus-visible:bg-paper-2"
    >
      <span className={cn('mt-0.5 grid size-9 shrink-0 place-items-center rounded-[10px] transition-transform group-hover:scale-105', t.tile)}>
        <Icon name={item.icon} size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.9688rem] font-semibold leading-snug text-ink">{item.label}</span>
        <span className="block text-[0.84rem] leading-snug text-ink-3">{item.blurb}</span>
      </span>
    </Link>
  )
}

function DropdownPanel({ id, open, className, children, label }: { id: string; open: boolean; className?: string; children: ReactNode; label: string }) {
  return (
    <div
      id={id}
      role="group"
      aria-label={label}
      className={cn(
        'absolute left-0 top-full z-50 pt-3 transition-[opacity,transform,visibility] duration-200 ease-out',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
        className,
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">{children}</div>
    </div>
  )
}

export function Navbar() {
  const [open, setOpen] = useState<MenuKey | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const closeTimer = useRef<number | undefined>(undefined)
  const navRef = useRef<HTMLElement>(null)
  // True while the open menu was opened by hovering (or by the hover a tap produces on touch screens) rather than by a click or key press.
  const openedByHover = useRef(false)

  useBodyScrollLock(mobileOpen)

  // Close menus on navigation.
  useEffect(() => {
    setOpen(null)
    setMobileOpen(false)
  }, [location.pathname])

  // Elevate the header after scrolling a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes; click outside closes desktop menus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setMobileOpen(false)
      }
    }
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [])

  const hoverOpen = useCallback((key: MenuKey) => {
    window.clearTimeout(closeTimer.current)
    setOpen((current) => {
      if (current !== key) openedByHover.current = true
      return key
    })
  }, [])
  const hoverClose = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(null), 140)
  }, [])

  const path = location.pathname
  const inFeatures = path.startsWith('/features/')
  const inSolutions = path.startsWith('/solutions/')
  const inResources = path.startsWith('/blog')

  const trigger = (key: MenuKey, label: string, active: boolean) => (
    <button
      type="button"
      className={cn(linkBase, active && 'text-brand-800', open === key && 'bg-brand-50 text-brand-800')}
      aria-expanded={open === key}
      aria-controls={`menu-${key}`}
      onClick={() => {
        // Hovering (or tapping) has already opened this menu. The click that follows must not toggle it shut again.
        if (open === key && openedByHover.current) {
          openedByHover.current = false
          return
        }
        openedByHover.current = false
        setOpen(open === key ? null : key)
      }}
    >
      {label}
      <Icon name="chevron-down" size={16} strokeWidth={2.4} className={cn('transition-transform duration-200', open === key && 'rotate-180')} />
    </button>
  )

  return (
    <>
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200',
        scrolled || mobileOpen ? 'border-line bg-paper/90 shadow-[0_8px_24px_-18px_rgb(19_33_28/0.35)] backdrop-blur-xl' : 'border-transparent bg-paper/70 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link to="/" aria-label="LocalPOS home" className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav ref={navRef} aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-0.5 pl-6">
            <li className="relative" onMouseEnter={() => hoverOpen('features')} onMouseLeave={hoverClose}>
              {trigger('features', 'Features', inFeatures)}
              <DropdownPanel id="menu-features" open={open === 'features'} label="Features" className="w-[min(680px,calc(100vw-2rem))]">
                <ul className="grid grid-cols-2 gap-x-1 gap-y-0.5 p-3">
                  {featureItems.map((item) => (
                    <li key={item.href}>
                      <ItemTile item={item} />
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-3 border-t border-line bg-paper-2 px-5 py-3 text-[0.9rem]">
                  <span className="text-ink-2">Not sure where to begin?</span>
                  <Link to="/book-a-demo/" className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-900">
                    Book a free demo <Icon name="arrow-right" size={16} strokeWidth={2.4} />
                  </Link>
                </div>
              </DropdownPanel>
            </li>

            <li className="relative" onMouseEnter={() => hoverOpen('solutions')} onMouseLeave={hoverClose}>
              {trigger('solutions', 'Solutions', inSolutions)}
              <DropdownPanel id="menu-solutions" open={open === 'solutions'} label="Solutions" className="w-[min(380px,calc(100vw-2rem))]">
                <ul className="p-3">
                  {solutionItems.map((item) => (
                    <li key={item.href}>
                      <ItemTile item={item} />
                    </li>
                  ))}
                </ul>
                <div className="border-t border-line bg-paper-2 px-5 py-3 text-[0.9rem] text-ink-2">Built around how each business bills.</div>
              </DropdownPanel>
            </li>

            <li>
              <NavLink to="/pricing/" className={({ isActive }) => cn(linkBase, isActive && 'text-brand-800')}>
                Pricing
              </NavLink>
            </li>

            <li className="relative" onMouseEnter={() => hoverOpen('resources')} onMouseLeave={hoverClose}>
              {trigger('resources', 'Resources', inResources)}
              <DropdownPanel id="menu-resources" open={open === 'resources'} label="Resources" className="w-[min(400px,calc(100vw-2rem))]">
                <div className="p-3">
                  <Link to="/blog/" className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-paper-2">
                    <span className="grid size-9 place-items-center rounded-[10px] bg-gold-100 text-gold-700">
                      <Icon name="file" size={18} />
                    </span>
                    <span>
                      <span className="block text-[0.9688rem] font-semibold text-ink">Blog</span>
                      <span className="block text-[0.84rem] text-ink-3">Practical guides for running a shop</span>
                    </span>
                  </Link>
                  <p className="px-2.5 pb-1 pt-3 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-ink-3">Latest articles</p>
                  <ul>
                    {latestPosts.map((p) => (
                      <li key={p.slug}>
                        <Link to={`/blog/${p.slug}/`} className="block rounded-xl px-2.5 py-2 text-[0.92rem] font-medium leading-snug text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </DropdownPanel>
            </li>

            <li>
              <NavLink to="/about-us/" className={({ isActive }) => cn(linkBase, isActive && 'text-brand-800')}>
                About Us
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={SITE.loginUrl} className={cn(linkBase, 'px-4')}>
            Login
          </a>
          <CTAButton to="/book-a-demo/" size="sm" arrow>
            Book a Demo
          </CTAButton>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <CTAButton to="/book-a-demo/" size="sm" className="hidden min-[375px]:inline-flex">
            Book a Demo
          </CTAButton>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-line-strong bg-white text-ink transition-colors hover:bg-paper-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

    </header>
    {/* Rendered outside the header: backdrop-filter would otherwise become the containing block of this fixed panel. */}
    {mobileOpen && <MobileMenu />}
    </>
  )
}

function MobileGroup({ title, items, defaultOpen }: { title: string; items: MenuItem[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  const id = `mobile-group-${title.toLowerCase()}`
  return (
    <div className="border-b border-line">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left font-display text-[1.25rem] font-semibold text-ink"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <Icon name="chevron-down" size={20} strokeWidth={2.4} className={cn('transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <ul id={id} hidden={!open} className="grid grid-cols-1 gap-0.5 pb-3 min-[480px]:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <ItemTile item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function MobileMenu() {
  const { pathname } = useLocation()
  return (
    <div
      id="mobile-menu"
      className="fixed inset-x-0 bottom-0 top-[4.25rem] z-30 overflow-y-auto overscroll-contain border-t border-line bg-paper lg:hidden motion-safe:animate-fade-up"
    >
      <nav aria-label="Mobile" className="mx-auto flex min-h-full max-w-[640px] flex-col px-4 pb-8 pt-2 sm:px-6">
        {/* Groups start closed so Pricing, Blog, About and the call to action are visible without scrolling; the group for the current section starts open. */}
        <MobileGroup title="Features" items={featureItems} defaultOpen={pathname.startsWith('/features/')} />
        <MobileGroup title="Solutions" items={solutionItems} defaultOpen={pathname.startsWith('/solutions/')} />
        <Link to="/pricing/" className="border-b border-line py-4 font-display text-[1.25rem] font-semibold text-ink">
          Pricing
        </Link>
        <Link to="/blog/" className="border-b border-line py-4 font-display text-[1.25rem] font-semibold text-ink">
          Blog
        </Link>
        <Link to="/about-us/" className="border-b border-line py-4 font-display text-[1.25rem] font-semibold text-ink">
          About Us
        </Link>
        <div className="mt-auto grid gap-3 pt-8">
          <CTAButton to="/book-a-demo/" size="lg" arrow className="w-full">
            Book a Free Demo
          </CTAButton>
          <CTAButton href={SITE.loginUrl} variant="secondary" size="lg" className="w-full">
            Login
          </CTAButton>
        </div>
      </nav>
    </div>
  )
}
