import type { IconName } from '@/components/Icon'
import { FORMAT_META, TOOL_META, type ResourceMeta } from './resourceMeta'

export interface FooterDirectoryItem {
  label: string
  icon: IconName
  /** Path of the page. An item without one is shown as plain text rather than linking to a URL that would 404. */
  to?: string
}

export interface FooterDirectorySection {
  id: string
  title: string
  items: FooterDirectoryItem[]
}

const item = (r: ResourceMeta): FooterDirectoryItem => ({ label: r.label, icon: r.icon, to: r.path })

/** The two footer grids. The pages themselves are listed in data/resourceMeta.ts. */
export const FOOTER_DIRECTORY: FooterDirectorySection[] = [
  { id: 'footer-tools', title: 'LocalPOS Tools', items: TOOL_META.map(item) },
  { id: 'footer-formats', title: 'LocalPOS Business Formats', items: FORMAT_META.map(item) },
]

export const FOOTER_TRUST: Array<{ icon: IconName; title: string; note?: string; tone: string }> = [
  { icon: 'award', title: 'Made in India', tone: 'text-gold-700' },
  { icon: 'shield', title: 'Secure', note: 'SSL Encryption', tone: 'text-brand-600' },
  { icon: 'badge-check', title: 'Trusted by MSMEs', tone: 'text-sky-700' },
]
