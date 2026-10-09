import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge, with one correction: by default a font-size class (even an arbitrary one like text-[1.45rem])
 * removes an earlier leading-* class, because in some Tailwind versions text-xl also sets the line height.
 * Our arbitrary sizes carry no line height, so that behaviour silently loosened every heading written as
 * `leading-tight ... text-[1.2rem]`. Keep both classes.
 */
const twMerge = extendTailwindMerge({
  override: {
    conflictingClassGroups: {
      'font-size': [],
    },
  },
})

/** Join class names, skipping falsy values, and let later Tailwind classes override earlier conflicting ones. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return twMerge(parts.filter(Boolean).join(' '))
}
