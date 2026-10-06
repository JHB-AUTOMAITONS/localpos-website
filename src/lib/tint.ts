import type { Tint } from '@/data/types'

/** Static class names per tint (Tailwind needs full class names at build time). */
export interface TintClasses {
  /** Soft card background */
  soft: string
  /** Slightly stronger soft background */
  mid: string
  /** Icon tile: background + glyph colour */
  tile: string
  /** Readable text colour on white / soft backgrounds */
  text: string
  /** Hairline border colour */
  border: string
  /** Solid dot / bar colour */
  solid: string
  /** Solid colour as hex for SVG charts */
  hex: string
  /** Gradient glow used behind visuals */
  glow: string
}

export const TINTS: Record<Tint, TintClasses> = {
  brand: {
    soft: 'bg-brand-50',
    mid: 'bg-brand-100',
    tile: 'bg-brand-100 text-brand-700',
    text: 'text-brand-700',
    border: 'border-brand-200',
    solid: 'bg-brand-500',
    hex: '#13966f',
    glow: 'from-brand-200/70 via-brand-100/40 to-transparent',
  },
  gold: {
    soft: 'bg-gold-50',
    mid: 'bg-gold-100',
    tile: 'bg-gold-100 text-gold-700',
    text: 'text-gold-700',
    border: 'border-gold-200',
    solid: 'bg-gold-400',
    hex: '#f6b232',
    glow: 'from-gold-200/80 via-gold-100/40 to-transparent',
  },
  coral: {
    soft: 'bg-coral-50',
    mid: 'bg-coral-100',
    tile: 'bg-coral-100 text-coral-700',
    text: 'text-coral-700',
    border: 'border-coral-100',
    solid: 'bg-coral-500',
    hex: '#ee6a4f',
    glow: 'from-coral-100/90 via-coral-50/50 to-transparent',
  },
  sky: {
    soft: 'bg-sky-50',
    mid: 'bg-sky-100',
    tile: 'bg-sky-100 text-sky-700',
    text: 'text-sky-700',
    border: 'border-sky-100',
    solid: 'bg-sky-500',
    hex: '#3b8def',
    glow: 'from-sky-100/90 via-sky-50/50 to-transparent',
  },
  violet: {
    soft: 'bg-violet-50',
    mid: 'bg-violet-100',
    tile: 'bg-violet-100 text-violet-700',
    text: 'text-violet-700',
    border: 'border-violet-100',
    solid: 'bg-violet-500',
    hex: '#7c63f0',
    glow: 'from-violet-100/90 via-violet-50/50 to-transparent',
  },
}
