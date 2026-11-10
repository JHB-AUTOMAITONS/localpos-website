import { SITE } from '@/data/site'

/** Opens a chat with the pre-filled message. The visitor reviews and sends it themselves; nothing is sent automatically. */
const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(SITE.whatsapp.message)}`

/** The WhatsApp logo (Simple Icons, CC0). */
function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/**
 * Floating "chat on WhatsApp" button, mounted once in SiteLayout so it appears on every public page.
 *
 * - z-20: above page content, but under the header (z-40), its dropdowns and the open mobile menu (z-30), so it never covers them.
 * - Positioned with safe-area insets so it clears the home indicator on notched phones.
 * - Static ring and a hover scale only: no looping animation (an endless animation keeps the browser busy), and the scale is off under reduced motion.
 * - The tooltip is for desktop hover and keyboard focus; it is hidden below 1024px.
 */
export function WhatsAppButton() {
  // The <aside> is a labelled landmark: axe (and screen-reader landmark navigation) require every piece of page content to sit inside one.
  return (
    <aside aria-label="WhatsApp chat">
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact LocalPOS on WhatsApp"
      className="group fixed bottom-[max(18px,env(safe-area-inset-bottom))] right-[max(18px,env(safe-area-inset-right))] z-20 grid size-14 cursor-pointer place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_0_6px_rgb(37_211_102/0.2),0_10px_24px_-6px_rgb(19_33_28/0.35)] transition-transform duration-200 ease-out hover:scale-110 focus-visible:outline-ink motion-reduce:transition-none motion-reduce:hover:scale-100 lg:bottom-[max(28px,env(safe-area-inset-bottom))] lg:right-[max(28px,env(safe-area-inset-right))] lg:size-16 lg:shadow-[0_0_0_8px_rgb(37_211_102/0.2),0_12px_28px_-6px_rgb(19_33_28/0.35)] print:hidden"
    >
      <WhatsAppLogo className="size-7 lg:size-8" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 mr-5 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-ink px-3.5 py-2 text-[0.875rem] font-semibold text-white opacity-0 shadow-card transition-opacity duration-150 before:absolute before:left-full before:top-1/2 before:-translate-y-1/2 before:border-[6px] before:border-transparent before:border-l-ink before:content-[''] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none lg:block"
      >
        Chat with LocalPOS
      </span>
    </a>
    </aside>
  )
}
