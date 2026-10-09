import { Icon } from '@/components/Icon'

/**
 * Collapsible table of contents for long pages on phones and tablets. The desktop layout shows a sticky sidebar instead,
 * so this is hidden from `lg` up.
 */
export function MobileToc({ title, items }: { title: string; items: Array<{ id: string; label: string }> }) {
  if (items.length < 2) return null
  return (
    <details data-toc className="group mb-8 rounded-2xl border border-line bg-white shadow-card lg:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 font-display text-[1.05rem] font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
        {title}
        <Icon name="chevron-down" size={18} strokeWidth={2.4} className="shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <nav aria-label={title} className="border-t border-line px-4 pb-3 pt-2">
        <ol className="divide-y divide-line">
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} className="block py-2.5 text-[0.97rem] leading-snug text-ink-2 hover:text-brand-700">
                {it.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  )
}
