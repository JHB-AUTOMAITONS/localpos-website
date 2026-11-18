import { useEffect } from 'react'
import { Link } from 'react-router'
import { SITE } from '@/data/site'

const FORM_URL = new URL(SITE.demoForm.url)
const FORM_ID = FORM_URL.pathname.split('/').filter(Boolean).pop() ?? 'demo-form'
const EMBED_SCRIPT = `${FORM_URL.origin}/js/form_embed.js`

/**
 * The Book a Demo form: a GoHighLevel form shown in an iframe, with the form provider's own embed script, which keeps the frame exactly as
 * tall as the form (no inner scrollbar, no cut-off) as it grows for validation messages and the thank-you message.
 *
 * - The iframe is in the prerendered HTML, so the form shows even before JavaScript runs; without the script it simply has a fixed height.
 * - The script is added once, after hydration, and only on this page. It is allowed by the site's Content Security Policy (see scripts/prerender.mjs).
 * - Visitors who cannot see the frame (blocked by an extension or a company network) get a plain link to the same form.
 */
export function DemoFormEmbed() {
  useEffect(() => {
    const existing = document.querySelector('script[data-demo-form-embed]')
    // The provider script only looks for frames when it first runs. If this page is opened again later in the same visit (client-side
    // navigation), the old copy is replaced so the new frame is picked up too.
    existing?.remove()
    const script = document.createElement('script')
    script.src = EMBED_SCRIPT
    script.async = true
    script.setAttribute('data-demo-form-embed', '')
    document.body.appendChild(script)
    return () => script.remove()
  }, [])

  return (
    <div>
      <iframe
        id={`inline-${FORM_ID}`}
        src={FORM_URL.href}
        title="Book a free LocalPOS demo: your details"
        loading="lazy"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Book a Demo"
        data-height="560"
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-id={FORM_ID}
        className="block h-[560px] w-full rounded-xl border-0"
      />
      <p className="mt-4 text-[0.85rem] text-ink-3">
        Form not showing?{' '}
        <a href={FORM_URL.href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline underline-offset-2">
          Open it in a new tab
        </a>
        . We use your details only to get back to you about a demo. Read our{' '}
        <Link to="/privacy-policy/" className="font-medium text-brand-700 underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
    </div>
  )
}
