import { cn } from '@/lib/cn'

/** The LocalPOS mark: a thermal receipt with a highlighted total line. */
export function LogoMark({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" fill="#0a7f5f" />
      <path
        d="M10 6.5h12A1.5 1.5 0 0 1 23.5 8v15.9l-2.5 1.6-2.5-1.6-2.5 1.6-2.5-1.6-2.5 1.6-2.5-1.6V8A1.5 1.5 0 0 1 10 6.5z"
        fill="#fff"
      />
      <rect x="11.5" y="10.2" width="9" height="1.8" rx=".9" fill="#0a7f5f" opacity=".28" />
      <rect x="11.5" y="13.6" width="6" height="1.8" rx=".9" fill="#0a7f5f" opacity=".28" />
      <rect x="11.5" y="17.4" width="9" height="2.6" rx="1.3" fill="#f6b232" />
    </svg>
  )
}

export function Logo({ className, markSize = 36 }: { className?: string; markSize?: number }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={markSize} />
      <span className="font-display text-[1.4rem] font-bold leading-none tracking-[-0.035em] text-ink">
        Local<span className="text-brand-600">POS</span>
      </span>
    </span>
  )
}
