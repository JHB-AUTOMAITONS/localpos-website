import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'inverse'
type Size = 'md' | 'lg' | 'sm'

const BASE =
  'group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold leading-none transition duration-200 ease-out focus-visible:outline-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-60'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_10px_22px_-10px_rgb(10_127_95/0.75)] hover:bg-brand-700 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_14px_28px_-10px_rgb(10_127_95/0.8)]',
  secondary:
    'border border-line-strong bg-white text-ink shadow-[0_1px_2px_rgb(19_33_28/0.05)] hover:border-brand-300 hover:bg-brand-50',
  ghost: 'text-brand-700 hover:bg-brand-50',
  gold: 'bg-gold-400 text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_10px_22px_-10px_rgb(232_154_20/0.8)] hover:bg-gold-300',
  inverse: 'bg-white text-brand-800 hover:bg-brand-50 shadow-[0_10px_24px_-12px_rgb(0_0_0/0.5)]',
}

const SIZES: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.9375rem]',
  md: 'h-12 px-5 text-base',
  lg: 'h-14 px-7 text-[1.0625rem]',
}

interface CommonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Show the trailing arrow that nudges on hover. */
  arrow?: boolean
}

type ButtonProps = CommonProps & { to?: undefined; href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = CommonProps & { to: string; href?: undefined }
type AnchorProps = CommonProps & { href: string; to?: undefined; external?: boolean }

/**
 * Call-to-action button. Renders a router Link (`to`), a plain anchor (`href`)
 * or a <button>, with the same styling for each.
 */
export function CTAButton(props: ButtonProps | LinkProps | AnchorProps) {
  const { children, variant = 'primary', size = 'md', className, arrow } = props
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)
  const content = (
    <>
      {children}
      {arrow && (
        <Icon name="arrow-right" size={18} strokeWidth={2.4} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
      )}
    </>
  )

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    )
  }
  if ('href' in props && props.href) {
    const external = /^https?:\/\//.test(props.href)
    return (
      <a href={props.href} className={classes} {...(external ? { rel: 'noopener' } : {})}>
        {content}
      </a>
    )
  }
  const { children: _c, variant: _v, size: _s, className: _cn, arrow: _a, ...rest } = props as ButtonProps
  void _c, _v, _s, _cn, _a
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
