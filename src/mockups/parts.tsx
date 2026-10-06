import type { HTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from '@/components/Icon'
import { LogoMark } from '@/components/Logo'
import { cn } from '@/lib/cn'

/**
 * Building blocks for the product mockups. Every mockup is a CSS container (`@container`)
 * so it adapts to the width of the space it sits in rather than to the viewport.
 */

type NavKey = 'dashboard' | 'billing' | 'items' | 'parties' | 'reports' | 'stores'

const NAV: Array<{ key: NavKey; icon: IconName; label: string }> = [
  { key: 'dashboard', icon: 'monitor', label: 'Dashboard' },
  { key: 'billing', icon: 'receipt', label: 'Billing' },
  { key: 'items', icon: 'boxes', label: 'Items' },
  { key: 'parties', icon: 'users', label: 'Parties' },
  { key: 'reports', icon: 'chart', label: 'Reports' },
  { key: 'stores', icon: 'building', label: 'Stores' },
]

interface AppFrameProps {
  children: ReactNode
  active?: NavKey
  /** Text in the faux address bar. */
  title?: string
  sidebar?: boolean
  className?: string
  bodyClassName?: string
}

/** A browser-style app window with an optional icon sidebar. */
export function AppFrame({ children, active = 'dashboard', title = 'LocalPOS', sidebar = true, className, bodyClassName }: AppFrameProps) {
  return (
    <div className={cn('@container overflow-hidden rounded-[18px] border border-line bg-white text-left text-[12px] leading-snug text-ink-2 shadow-app', className)}>
      <div className="flex items-center gap-2 border-b border-line bg-paper px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2 rounded-full bg-[#e6e3d8]" />
          <i className="size-2 rounded-full bg-[#e6e3d8]" />
          <i className="size-2 rounded-full bg-[#e6e3d8]" />
        </span>
        <span className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-full bg-white px-3 py-0.5 text-[10.5px] text-ink-3 ring-1 ring-line">
          <Icon name="lock" size={10} />
          {title}
        </span>
        <span className="w-9" />
      </div>
      <div className="flex min-h-0">
        {sidebar && (
          <div className="hidden w-[52px] shrink-0 flex-col items-center gap-1 border-r border-line bg-paper py-3 @[520px]:flex">
            <LogoMark size={26} className="mb-2" />
            {NAV.map((n) => (
              <span
                key={n.key}
                className={cn('grid size-8 place-items-center rounded-lg', n.key === active ? 'bg-brand-100 text-brand-700' : 'text-ink-3')}
              >
                <Icon name={n.icon} size={16} />
              </span>
            ))}
          </div>
        )}
        <div className={cn('min-w-0 flex-1 bg-paper/60 p-3 @[520px]:p-4', bodyClassName)}>{children}</div>
      </div>
    </div>
  )
}

type ChipTone = 'brand' | 'gold' | 'coral' | 'sky' | 'violet' | 'neutral'
const CHIP: Record<ChipTone, string> = {
  brand: 'bg-brand-100 text-brand-800',
  gold: 'bg-gold-100 text-gold-800',
  coral: 'bg-coral-100 text-coral-700',
  sky: 'bg-sky-100 text-sky-700',
  violet: 'bg-violet-100 text-violet-700',
  neutral: 'bg-paper-3 text-ink-2',
}

export function Chip({ children, tone = 'neutral', className }: { children: ReactNode; tone?: ChipTone; className?: string }) {
  return <span className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold leading-4', CHIP[tone], className)}>{children}</span>
}

const AVATAR_TONES = ['bg-brand-100 text-brand-800', 'bg-gold-100 text-gold-800', 'bg-coral-100 text-coral-700', 'bg-sky-100 text-sky-700', 'bg-violet-100 text-violet-700']

export function Avatar({ name, index = 0, size = 28 }: { name: string; index?: number; size?: number }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <span
      className={cn('grid shrink-0 place-items-center rounded-full text-[10.5px] font-bold', AVATAR_TONES[index % AVATAR_TONES.length])}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  )
}

/** White card used for panels inside a mockup. */
export function Panel({ title, action, children, className }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl border border-line bg-white p-3', className)}>
      {(title || action) && (
        <div className="mb-2.5 flex items-center justify-between gap-2">
          {title && <div className="text-[11.5px] font-bold text-ink">{title}</div>}
          {action && <div className="text-[10.5px] font-semibold text-brand-700">{action}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export function Kpi({ label, value, delta, tone = 'brand', children }: { label: string; value: string; delta?: string; tone?: 'brand' | 'coral' | 'gold' | 'sky'; children?: ReactNode }) {
  const up = !delta?.startsWith('-')
  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <div className="text-[10.5px] font-medium text-ink-3">{label}</div>
      <div className="mt-1 flex items-end justify-between gap-2">
        <div className="tnum text-[17px] font-bold leading-none text-ink">{value}</div>
        {children}
      </div>
      {delta && (
        <div className={cn('mt-1.5 text-[10.5px] font-semibold', tone === 'coral' ? 'text-coral-700' : up ? 'text-brand-700' : 'text-coral-700')}>
          {up ? '▲' : '▼'} {delta.replace('-', '')}
        </div>
      )}
    </div>
  )
}

/** Deterministic barcode drawn as SVG. */
export function Barcode({ code = '8901234567890', className, height = 34 }: { code?: string; className?: string; height?: number }) {
  const widths: number[] = []
  for (let i = 0; i < code.length * 3; i++) {
    const c = code.charCodeAt(i % code.length) + i * 7
    widths.push(1 + (c % 3))
  }
  let x = 0
  const bars: ReactNode[] = []
  widths.forEach((w, i) => {
    if (i % 2 === 0) bars.push(<rect key={i} x={x} y={0} width={w} height={height} fill="#13211c" />)
    x += w + (i % 3 === 0 ? 1 : 1.2)
  })
  return (
    <svg viewBox={`0 0 ${Math.ceil(x)} ${height}`} preserveAspectRatio="none" className={cn('w-full', className)} style={{ height }} aria-hidden="true">
      {bars}
    </svg>
  )
}

/** A thermal-receipt sheet with a torn bottom edge. */
export function Receipt({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('receipt font-mono text-[11px] leading-[1.45] text-ink', className)}>{children}</div>
}

/** Small white card for the floating elements around a hero visual. */
export function FloatCard({ children, className, ...rest }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-2xl border border-line bg-white p-3 shadow-float', className)} {...rest}>
      {children}
    </div>
  )
}

/** Search field look-alike. */
export function FakeSearch({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11px] text-ink-3', className)}>
      <Icon name="search" size={13} />
      {placeholder}
    </div>
  )
}

/** Table header cell row helper. */
export function THead({ cols, className }: { cols: string[]; className?: string }) {
  return (
    <div className={cn('grid px-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-wide text-ink-3', className)}>
      {cols.map((c) => (
        <span key={c}>{c}</span>
      ))}
    </div>
  )
}
