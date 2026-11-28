import horizontalLogo from '@/assets/brand/logo-horizontal.webp'
import logoMark from '@/assets/brand/logo-mark.webp'
import { cn } from '@/lib/cn'

/**
 * The LocalPOS logo. Both images are generated from brand/localpos-logo.png by scripts/make-brand-assets.mjs
 * (run it again after replacing that file). width/height give the browser the shape up front, so nothing shifts while they load.
 */

/** The symbol alone, `size` pixels wide. Decorative: used inside the product mock-ups. */
export function LogoMark({ className, size = 36 }: { className?: string; size?: number }) {
  return <img src={logoMark} alt="" width={size} height={Math.round((size * 96) / 105)} className={cn('block', className)} />
}

/** Symbol and wordmark side by side, for the header and footer. */
export function Logo({ className }: { className?: string }) {
  return <img src={horizontalLogo} alt="LocalPOS" width={533} height={120} className={cn('block h-[34px] w-auto max-w-none lg:h-10', className)} />
}
