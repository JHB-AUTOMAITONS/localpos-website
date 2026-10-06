import { twMerge } from 'tailwind-merge'

/** Join class names, skipping falsy values, and let later Tailwind classes override earlier conflicting ones. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return twMerge(parts.filter(Boolean).join(' '))
}
