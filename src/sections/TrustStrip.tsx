import { Icon, type IconName } from '@/components/Icon'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

const POINTS: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'badge-check', title: 'Built for Indian businesses', text: 'Rupees, GSTIN, HSN and UPI built in' },
  { icon: 'gst-receipt', title: 'GST-ready invoices', text: 'Tax split worked out on every bill' },
  { icon: 'shield', title: 'Secure business data', text: 'Your records stay protected' },
  { icon: 'handshake', title: 'Easy for the whole team', text: 'Simple screens, quick to learn' },
  { icon: 'phone2', title: 'Multi-device support', text: 'Bill from counter, tablet or phone' },
]

/** Neutral trust statements directly under the hero. No invented logos, counts or ratings. */
export function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="relative z-10 -mt-2 pb-4">
      <h2 id="trust-heading" className="sr-only">
        Why growing businesses choose LocalPOS
      </h2>
      <Container>
        <Reveal>
          <ul className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-white shadow-card sm:grid-cols-2 lg:grid-cols-5">
            {POINTS.map((p) => (
              <li
                key={p.title}
                className="flex items-start gap-3 border-line px-5 py-4 max-sm:border-b max-sm:last:border-b-0 sm:max-lg:border-b sm:max-lg:odd:border-r sm:max-lg:last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-[10px] bg-brand-50 text-brand-700">
                  <Icon name={p.icon} size={18} />
                </span>
                <span>
                  <span className="block text-[0.9688rem] font-semibold leading-snug text-ink">{p.title}</span>
                  <span className="block text-[0.86rem] leading-snug text-ink-3">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
