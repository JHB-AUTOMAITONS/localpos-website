# LocalPOS website

Marketing website for **LocalPOS** (billing software / POS / business management for Indian businesses).
React 19 + TypeScript + Tailwind CSS v4, built as a **statically prerendered** site: every page is real HTML with its own
title, meta description, canonical URL, Open Graph tags and JSON-LD, then hydrated in the browser.

The URL structure, primary and secondary keywords and placement rules come from
*"LocalPOS - Final SEO URL & Keyword Mapping"*. There is deliberately no `/billing-software/`, `/faq/` or `/sitemap/` page.

## Commands

```bash
npm install
npm run start      # start the site in development and open it in your browser (same as dev, plus auto-open)
npm run start:prod # build everything, then serve the production build locally (what visitors will get)
npm run dev        # Vite dev server (client-rendered, hot reload), no auto-open
npm run build      # typecheck + client build + SSR build + prerender all pages + sitemap.xml + robots.txt
npm run verify     # audit every built page against the SEO document (run after build)
npm run preview    # serve an existing dist/ like a static host does; picks the next free port if busy (PORT=5188 to start from another)
npm run test:e2e   # Playwright end-to-end suite against the production build in dist/ (see Testing)
```

`npm run build` writes to `dist/`. Upload that folder to any static host.

## Testing

The end-to-end suite lives in `tests/e2e/` and runs against the **production build** (`dist/`, served by `scripts/preview.mjs`),
in your installed Chrome (set `PW_CHANNEL=msedge` for Edge, or run `npx playwright install chromium` and set `PW_CHANNEL=` to use Playwright's own).

```bash
npm run build && npm run test:e2e     # or: npm run test:e2e:build
npx playwright test tests/e2e/forms.spec.ts --workers=4   # one spec (plain playwright writes test-results/results.json)
node scripts/verify-seo.mjs --json=test-results/seo.json   # SEO verifier with machine-readable output
node scripts/lighthouse-audit.mjs                          # optional: Lighthouse runs (needs a server; see the script header)
node scripts/audit-report.mjs                              # rebuild AUDIT_REPORT.md from the measured results
```

| Project | What runs |
| --- | --- |
| `mobile-390`, `tablet-768`, `desktop-1440` | routes, navigation, journeys, links, accessibility (axe-core) and layout quality, on all 33 routes |
| `single` | 15-width overflow matrix (320 to 1920 px), forms, SEO, analytics and performance budgets |

`npm run test:e2e` runs two passes (`scripts/run-e2e.mjs`): everything except performance in parallel, then the performance spec alone with one worker, because timing budgets are meaningless while other browsers compete for the CPU. Keep the machine idle during pass 2.
Every spec imports `test` from `tests/e2e/fixtures.ts`, whose automatic fixture answers all requests to Google Analytics and Microsoft Clarity locally, so tests never send hits to the real accounts and do not need the internet (see Analytics below).
Tests wait for `html[data-app-ready]`, an attribute the app sets once React has hydrated the prerendered page, before they click anything.

The forms spec runs against the Vite dev server (started by Playwright with `VITE_LEAD_ENDPOINT=https://leads.test/submit`); that
endpoint is intercepted in the browser, so no real backend is contacted. Other environment variables: `DIST_DIR` and `SSR_DIR`
(build into, and test, a folder other than `dist/`), `E2E_PORT` and `E2E_DEV_PORT` (server ports), `PW_CHANNEL` (browser).
`AUDIT_REPORT.md` is generated from `test-results/` by `scripts/audit-report.mjs`; edit the narrative in `scripts/audit-report.template.md`.

## Deploying (Netlify, `localpos.in`)

`netlify.toml` tells Netlify to run `npm run build && npm run verify` and publish `dist/`, with `VITE_SITE_URL=https://localpos.in`
(the primary domain; `www.localpos.in` redirects to it). Push to the connected branch and Netlify builds it.

- **The build command must be `npm run build`.** A bare `vite build` (what Netlify suggests for Vite projects) only writes the client
  bundle: there are no per-page HTML files, `404.html`, `sitemap.xml` or `robots.txt`, so every URL except `/` answers with Netlify's
  "Page not found". `netlify.toml` overrides the Netlify UI setting so this cannot happen again; `npm run verify` fails the deploy if a
  prerendered page is missing.
- **There is no `_redirects` / `/* /index.html 200` rule on purpose.** Every route is a real prerendered file, and unknown URLs get
  `dist/404.html` with a true 404 status. A catch-all rewrite would answer unknown URLs with the homepage and a 200 (a soft 404).
- Drag-and-drop deploys: upload the `dist/` folder produced by `npm run build`, not the output of `vite build`.
- `tests/e2e/deploy.spec.ts` guards this: it checks every route is prerendered (no `<!--app-html-->` placeholder), loads by direct URL,
  survives a refresh and loads its assets from root-absolute paths. Run the suite against a Netlify-style build with
  `VITE_SITE_URL=https://localpos.in npm run build` and `E2E_SITE_ORIGIN=https://localpos.in npm run test:e2e`.
- After a deploy, check the live site (the tests above run locally, not on Netlify):

  ```bash
  curl -s https://localpos.in/ | grep -c "app-html"                 # 0: the homepage is prerendered, not the empty template
  curl -s https://localpos.in/pricing/ | grep -o '<link rel="canonical"[^>]*>'   # href="https://localpos.in/pricing/"
  for p in / /pricing/ /solutions/retail-billing-software/ /features/gst-billing-software/ /sitemap.xml /robots.txt; do
    curl -s -o /dev/null -w "%{http_code} $p\n" "https://localpos.in$p"; done   # all 200
  curl -s -o /dev/null -w "%{http_code}\n" https://localpos.in/this-page-does-not-exist/   # 404 (the custom page, not the homepage)
  curl -sI https://localpos.in/pricing | grep -iE "^(HTTP|location)"   # one 301 to /pricing/
  ```

## Deploying (GitHub Pages, alternative)

The site is served by GitHub Pages from the `gh-pages` branch of `JHB-AUTOMAITONS/localpos-website`, on the custom
domain `www.localpos.in`.

```bash
npm run deploy     # build + SEO verify + publish dist/ to the gh-pages branch (takes about a minute to go live)
```

DNS records at the domain registrar:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (four records) |
| CNAME | `www` | `jhb-automaitons.github.io` |

`www.localpos.in` is the main address; the bare `localpos.in` redirects to it. Once DNS resolves, turn on **Enforce HTTPS**
in the repository's Pages settings. Set `VITE_SITE_URL` / `VITE_LOGIN_URL` in the shell before `npm run deploy` if they differ
from the defaults.

## Configuration

Copy `.env.example` to `.env` and set:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Production origin, no trailing slash. Used for canonicals, Open Graph, sitemap and schema. **Set this before deploying.** |
| `VITE_LOGIN_URL` | Where the header's **Login** button goes. |
| `VITE_LEAD_ENDPOINT` | Optional URL that receives Book a Demo / Contact form submissions as JSON `POST`. Empty = preview mode: the form works but nothing is sent, and the success screen says so. |

## Project structure

```
src/
  components/   reusable UI: layout (Navbar, Footer, Breadcrumbs), ui primitives, forms, demos, cards
  sections/     page sections: Hero, TrustStrip, ProductOverview (tabs), FeatureGrid, FAQ, CTA, ...
  mockups/      original product screens built in React/CSS (dashboard, POS, invoice, inventory, ...)
  pages/        route components (features/, solutions/, plus home, pricing, blog, legal, ...)
  data/         ALL content and SEO data: features, solutions, blog, legal, pricing, site config, routes
  lib/          SEO/head management, schema builders, formatting, form helpers
  styles/       design tokens and global CSS
scripts/        prerender.mjs, verify-seo.mjs, preview.mjs, subset-fonts.py
public/         favicon, OG image, logo, manifest
```

Feature pages (10) and solution pages (5) read their SEO fields and copy from `src/data/features.ts` and
`src/data/solutions.ts`. Each has its own page component with its own layout and visuals, built from shared parts
(`PageHero`, `BenefitsSection`, `StepList`, `FlowRow`, `PainPointsSection`, `FAQSection`, ...).

## Design system

Light UI only. Warm-white paper, deep emerald primary (`brand-*`), marigold accent (`gold-*`), small coral/sky/violet
highlights. Signature motifs: thermal-receipt zig-zag edges, price-tag labels, perforated tear lines. Type: Bricolage
Grotesque (headings), Figtree (body), JetBrains Mono (receipts). Tokens live in `src/styles/index.css` (`@theme`).

Fonts are trimmed Latin subsets plus a ~1 KB rupee-only file, generated by `scripts/subset-fonts.py`
(only needed if you change fonts; requires `pip install fonttools brotli`).

## SEO and technical notes

- Every page has a unique title and description, canonical, Open Graph and Twitter tags, one H1, and a valid heading order.
- JSON-LD: `Organization` + `WebSite` (home), `SoftwareApplication` (home, feature and solution pages), `BreadcrumbList`
  (inner pages), `FAQPage` (only where an FAQ is visible), `Article` (blog posts). No ratings or offers are invented.
- `npm run verify` checks, for each mapped page, that the primary keyword is in the URL, title, meta description, H1,
  the first 100 words and an H2; checks canonicals, duplicates, internal links and schema; and fails if page content is
  not present in the static HTML.
- Hosting needs: serve `/some/page/` from `some/page/index.html`, use `404.html` for unknown URLs, and enable gzip/brotli
  (most hosts do this by default).

## Analytics (Google Analytics 4 and Microsoft Clarity)

Both tools are installed once, site-wide, as the exact snippets Google and Microsoft supply (GA4 `G-G9MG10MD6W`, Clarity `yuextem7j4`).

- **Where:** the snippets live only in `scripts/analytics.mjs`. `npm run build` injects them into the `<head>` of every prerendered page, 404.html included, in place
  of the `<!--app-analytics-->` marker in `index.html`. They are not part of the React app, so client-side navigation cannot start either tool twice,
  and `npm run dev` / `npm run start` (which never run the prerender) send nothing from developer machines. To change an ID, edit `scripts/analytics.mjs` and the
  golden copy in `tests/e2e/analytics.spec.ts`.
- **Page views:** GA4 counts the first load from the supplied `gtag('config', ...)` call, and counts client-side route changes itself through the data stream's
  *Enhanced measurement > Page views > "Page changes based on browser history events"*, which is on for this property. **Do not add manual `page_view` calls and do not turn that
  setting off**: the first would double-count every navigation, the second would stop counting navigations. The analytics spec fails if either happens (the live part runs only when the internet is reachable).
- **Content Security Policy:** the policy is a `<meta>` tag written by `scripts/prerender.mjs`. The two inline snippets are allowed by SHA-256 hash (computed from the injected text),
  not by `unsafe-inline`, and only the Google and Microsoft hosts that were observed in use are added to `script-src`, `connect-src` and `img-src`. If you switch on other
  Google features (Ads, Signals, remarketing) their hosts will appear as CSP errors in the browser console; add them in `ANALYTICS_CSP`.
- **Tests:** `tests/e2e/analytics.spec.ts` checks the built pages, then loads the REAL scripts in Chrome under the real policy (skipped when offline). Every request that would carry measurement data
  is answered locally, so no test traffic reaches your accounts.
- **Privacy:** both tools set cookies, and Clarity records sessions. The privacy policy template (`src/data/legal.ts`, "Cookies and similar technologies") still has a
  bracketed placeholder where the analytics tools and consent approach must be described; fill it in, and decide whether you need a cookie notice.
- **Your own visits** (and any `npm run start:prod` preview on localhost) are counted. Filter them in GA4 (Admin > Data settings > Data filters, or by hostname in reports) and in Clarity (Settings > Setup > IP blocking).

## Placeholders and things to confirm before launch

These are intentionally marked, not invented:

1. **Domain** in `VITE_SITE_URL` (default `https://www.localpos.in` is a placeholder) and **Login URL**.
2. **Pricing** (`src/data/pricing.ts`): every price is `null`, so the page shows "Price to be announced / Placeholder".
   Add real prices and the monthly/yearly toggle appears automatically. Plan names and contents are placeholders too.
3. **Contact details** (`src/data/site.ts` → `contact`): email, phone, address and hours show as "to be added" until set.
   Social links appear only when you add real ones to `social`.
4. **Legal pages** (`src/data/legal.ts`) are templates with `[bracketed placeholders]` (company name, address, refund window,
   governing law, ...). Have them reviewed before publishing.
5. **Product claims.** Feature copy describes capabilities in general terms. Please check each against what LocalPOS really does
   (for example: online/multi-device access, barcode scanner support, label printing, stock transfers, role-based access,
   export formats, batch/expiry tracking, kitchen tickets, jewellery weight/purity billing).
6. **Mission and values** on the About page are written in general terms. Replace with the company's own words.
7. **Testimonials**: none are shown. Add real, permitted quotes to `src/data/testimonials.ts` and the section appears.
8. **Sample data**: all mockups use fictional names, numbers and a dummy GSTIN. Demos are labelled as sample data.
9. **GST/tax content** in the blog and demos is general guidance. The GST demo takes any rate typed by the visitor
   so it never goes stale.

## Browser/accessibility

Keyboard navigable (skip link, visible focus, dropdowns and tabs with arrow keys), semantic landmarks, labelled forms with
inline errors, reduced-motion respected, no horizontal overflow from 320px to 1920px.
