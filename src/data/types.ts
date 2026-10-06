import type { IconName } from '@/components/Icon'
import type { FaqItem } from '@/lib/seo'

export type Tint = 'brand' | 'gold' | 'coral' | 'sky' | 'violet'

export interface Benefit {
  icon: IconName
  title: string
  body: string
}

export interface Step {
  title: string
  body: string
}

/**
 * SEO fields come straight from the "LocalPOS - Final SEO URL & Keyword Mapping" document.
 * `primary` must appear in the URL, title, description, H1, intro (first 100 words) and one H2.
 */
export interface SeoPage {
  slug: string
  /** Canonical path with trailing slash. */
  path: string
  primary: string
  secondary: string[]
  seoTitle: string
  seoDescription: string
  h1: string
  /** Opening paragraph; the primary keyword sits inside the first sentence. */
  intro: string
  /** H2 that carries the primary keyword. */
  h2Main: string
}

/** Content blocks for blog posts. Inline `[text](/path/)` links and `**bold**` are supported in text fields. */
export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; title: string; text: string }

export type BlogCategory = 'GST & Compliance' | 'Inventory' | 'Billing' | 'Retail Tips' | 'Industry Guides'

export interface BlogPost {
  slug: string
  /** The post's own target keyword (must not duplicate a page primary keyword). */
  keyword: string
  secondary: string[]
  /** H1 shown on the page. */
  title: string
  seoTitle: string
  seoDescription: string
  category: BlogCategory
  /** ISO date, YYYY-MM-DD */
  date: string
  readingMinutes: number
  excerpt: string
  tint: Tint
  blocks: ContentBlock[]
  faqs?: FaqItem[]
  /** Feature slugs to promote at the end of the post. */
  relatedFeatures: string[]
}

export interface LegalSection {
  heading: string
  paragraphs?: string[]
  items?: string[]
}

export interface LegalPage {
  slug: 'privacy-policy' | 'terms-and-conditions' | 'refund-policy'
  path: string
  title: string
  seoTitle: string
  seoDescription: string
  /** ISO date of the last update. */
  updated: string
  intro: string
  sections: LegalSection[]
}

export interface Feature extends SeoPage {
  navLabel: string
  navBlurb: string
  icon: IconName
  tint: Tint
  benefits: Benefit[]
  stepsHeading: string
  steps: Step[]
  outcomes: string[]
  faqs: FaqItem[]
  related: string[]
}

export interface Solution extends SeoPage {
  navLabel: string
  navBlurb: string
  icon: IconName
  tint: Tint
  /** The problems this business type runs into every day. */
  painPoints: Array<{ title: string; body: string }>
  /** What LocalPOS does about them, linked to feature pages. */
  highlights: Benefit[]
  workflowHeading: string
  workflow: Step[]
  faqs: FaqItem[]
  relatedFeatures: string[]
}
