import { cn } from '@/lib/cn'

/** Perforated "tear here" divider with notches at both ends. Decorative. */
export function TearLine({ className, notch = 'bg-paper' }: { className?: string; notch?: string }) {
  return (
    <div aria-hidden="true" className={cn('relative my-0 h-0', className)}>
      <div className="perforation w-full" />
      <span className={cn('absolute -left-2 top-1/2 size-4 -translate-y-1/2 rounded-full', notch)} />
      <span className={cn('absolute -right-2 top-1/2 size-4 -translate-y-1/2 rounded-full', notch)} />
    </div>
  )
}
