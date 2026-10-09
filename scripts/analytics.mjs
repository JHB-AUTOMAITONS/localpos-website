// Site-wide analytics: Google Analytics 4 (G-G9MG10MD6W) and Microsoft Clarity (yuextem7j4).
//
// The two snippets below are exactly as supplied by Google and Microsoft. They are injected once into the <head> of every
// prerendered page (including 404.html) by scripts/prerender.mjs, in place of the <!--app-analytics-->
// marker in index.html. They are not part of the React app, so client-side navigation can never initialise them twice,
// and `npm run dev` (which never runs the prerender) does not send any data from developer machines.
import { createHash } from 'node:crypto'

export const ANALYTICS_MARKER = '<!--app-analytics-->'

const GOOGLE_ANALYTICS = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-G9MG10MD6W"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-G9MG10MD6W');
</script>`

const MICROSOFT_CLARITY = `<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "yuextem7j4");
</script>`

export const ANALYTICS_HTML = `${GOOGLE_ANALYTICS}\n    ${MICROSOFT_CLARITY}`

/**
 * CSP hash sources for the inline scripts above, computed from the very text that is injected, so they cannot drift from it.
 * A hash allows exactly these two scripts and nothing else inline, which is why the policy does not need 'unsafe-inline' for scripts.
 */
export function inlineScriptHashes(html = ANALYTICS_HTML) {
  return [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => `'sha256-${createHash('sha256').update(m[1], 'utf8').digest('base64')}'`)
}

/**
 * The extra CSP sources these two tools need, kept to what a real browser was observed to request (October 2026):
 *   script:  www.googletagmanager.com (gtag.js), www.clarity.ms (loader) and scripts.clarity.ms (clarity.js)
 *   connect: www.google-analytics.com (GA4 hits), z.clarity.ms / h.clarity.ms (Clarity uploads; the letter varies, hence the wildcard)
 *   img:     c.clarity.ms (Clarity pixel)
 * `*.google-analytics.com` and `*.analytics.google.com` are Google's regional collection hosts (for example region1.), which a visitor in
 * another country can be sent to; they are connect-only. tests/e2e/analytics.spec.ts loads the real scripts under this policy and fails on
 * any CSP violation. If you later switch on other Google features (Ads, Signals, remarketing) their hosts will show up there as violations.
 */
export const ANALYTICS_CSP = {
  script: ['https://www.googletagmanager.com', 'https://www.clarity.ms', 'https://scripts.clarity.ms'],
  connect: ['https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://*.clarity.ms'],
  img: ['https://*.google-analytics.com', 'https://*.clarity.ms'],
}
