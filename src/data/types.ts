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
export interface SeoFields {
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

/** Everything needed to list a post (cards, menus, SEO). Loaded broadly, so it stays free of article text. */
export interface BlogPostMeta {
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
  /** Feature slugs to promote at the end of the post. */
  relatedFeatures: string[]
}

/** The article itself. Loaded only on article pages. */
export interface BlogContent {
  blocks: ContentBlock[]
  faqs?: FaqItem[]
}

export interface BlogPost extends BlogPostMeta, BlogContent {}

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

/** Light data shared by every page: menus, footer and cards. */
export interface PageMeta {
  slug: string
  /** Canonical path with trailing slash. */
  path: string
  navLabel: string
  navBlurb: string
  icon: IconName
  tint: Tint
  /** Short selling points shown on cards. */
  cardPoints: string[]
}

export type FeatureMeta = PageMeta
export type SolutionMeta = PageMeta

export interface FeatureContent extends SeoFields {
  benefits: Benefit[]
  stepsHeading: string
  steps: Step[]
  outcomes: string[]
  faqs: FaqItem[]
  related: string[]
}

export interface SolutionContent extends SeoFields {
  /** The problems this business type runs into every day. */
  painPoints: Array<{ title: string; body: string }>
  /** What LocalPOS does about them, linked to feature pages. */
  highlights: Benefit[]
  workflowHeading: string
  workflow: Step[]
  faqs: FaqItem[]
  relatedFeatures: string[]
}

export interface Feature extends FeatureMeta, FeatureContent {}
export interface Solution extends SolutionMeta, SolutionContent {}
