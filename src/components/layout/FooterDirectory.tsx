import { Link } from 'react-router'
import { Icon } from '@/components/Icon'
import { FOOTER_DIRECTORY, FOOTER_TRUST, type FooterDirectoryItem } from '@/data/footerDirectory'
import { cn } from '@/lib/cn'

const chipClass = 'flex min-h-11 items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.06] px-3.5 py-2 text-[0.9375rem] leading-snug'

function DirectoryItem({ item }: { item: FooterDirectoryItem }) {
  const content = (
    <>
      <Icon name={item.icon} size={18} className="shrink-0 text-brand-300" />
      <span>{item.label}</span>
    </>
  )
  return (
    <li>
      {item.to ? (
        <Link
          to={item.to}
          className={cn(chipClass, 'text-white transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.12] focus-visible:outline-gold-300 motion-reduce:transition-none')}
        >
          {content}
        </Link>
      ) : (
        // No page for this item yet (see data/footerDirectory.ts), so it is plain text, not a link to a missing URL.
        <span className={cn(chipClass, 'text-white/80')}>{content}</span>
      )}
    </li>
  )
}

/** The dark "LocalPOS Tools" and "LocalPOS Business Formats" grids in the footer. Static markup, no client-side behaviour. */
export function FooterDirectory() {
  return (
    <div className="space-y-9">
      {FOOTER_DIRECTORY.map((section) => (
        <nav key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id} className="font-sans text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-white">
            {section.title}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {section.items.map((item) => (
              <DirectoryItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>
      ))}
    </div>
  )
}

/** Light strip that closes the footer. */
export function FooterTrustStrip() {
  return (
    <ul className="flex flex-col items-center justify-center gap-x-14 gap-y-4 sm:flex-row sm:flex-wrap" aria-label="Why businesses trust LocalPOS">
      {FOOTER_TRUST.map((t) => (
        <li key={t.title} className="flex items-center gap-2.5">
          <Icon name={t.icon} size={26} className={cn('shrink-0', t.tone)} />
          <span className="leading-tight">
            <span className="block text-[1rem] font-bold text-ink">{t.title}</span>
            {t.note && <span className="block text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-ink-3">{t.note}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}
