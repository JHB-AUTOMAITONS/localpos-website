import { defineConfig } from '@playwright/test'

/**
 * End-to-end tests run against the PRODUCTION build (dist/), served by scripts/preview.mjs.
 * The forms suite runs against the Vite dev server instead, because it needs a lead endpoint configured at build time.
 *
 *   npm run build && npm run test:e2e
 *
 * Browser: uses your installed Chrome by default (no download). Set PW_CHANNEL=msedge for Edge, or run
 * `npx playwright install chromium` and set PW_CHANNEL= (empty) to use Playwright's own Chromium.
 */
const PORT = Number(process.env.E2E_PORT ?? 4520)
const DEV_PORT = Number(process.env.E2E_DEV_PORT ?? 4521)
const channel = process.env.PW_CHANNEL === '' ? undefined : (process.env.PW_CHANNEL ?? 'chrome')

/**
 * Google Analytics and Microsoft Clarity must never receive traffic from tests (it would pollute the live accounts) and tests must not depend on the internet.
 * They are blocked inside the browser with a DNS rule, which, unlike Playwright's request interception, leaves Chrome's HTTP cache working, so every
 * test sees the site loading the way a real visitor's browser does. Only tests/e2e/analytics.spec.ts opts out (to run the real scripts), and it
 * keeps all measurement data local by interception instead. helpers.ts fails any test in which a tracking host actually answers.
 */
const BLOCK_TRACKING = '--host-resolver-rules=MAP *.googletagmanager.com ~NOTFOUND, MAP *.google-analytics.com ~NOTFOUND, MAP *.analytics.google.com ~NOTFOUND, MAP *.clarity.ms ~NOTFOUND'

const SHARED_SPECS = /(routes|navigation|journeys|links|a11y|layout-quality)\.spec\.ts/
const SINGLE_SPECS = /(responsive|forms|seo|perf|deploy|analytics|analytics-live)\.spec\.ts/

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: process.env.PW_JSON ?? 'test-results/results.json' }]],
  outputDir: 'test-results/artifacts',
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel,
    launchOptions: { args: [BLOCK_TRACKING] },
    screenshot: 'only-on-failure',
    trace: 'off',
  },
  projects: [
    { name: 'mobile-390', testMatch: SHARED_SPECS, use: { viewport: { width: 390, height: 844 }, hasTouch: true } },
    { name: 'tablet-768', testMatch: SHARED_SPECS, use: { viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'desktop-1440', testMatch: SHARED_SPECS, use: { viewport: { width: 1440, height: 900 } } },
    { name: 'single', testMatch: SINGLE_SPECS, use: { viewport: { width: 1440, height: 900 } } },
  ],
  webServer: [
    {
      command: 'node scripts/preview.mjs',
      url: `http://localhost:${PORT}/`,
      env: { PORT: String(PORT), STRICT_PORT: '1' },
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
    {
      command: `npx vite --port ${DEV_PORT} --strictPort`,
      url: `http://localhost:${DEV_PORT}/`,
      env: { VITE_LEAD_ENDPOINT: 'https://leads.test/submit' },
      reuseExistingServer: false,
      timeout: 90_000,
    },
  ],
})
