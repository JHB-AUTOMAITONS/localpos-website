// Runs the whole Playwright suite in two passes and exits non-zero if either fails:
//   1. everything except the performance spec, in parallel (fast)
//   2. the performance spec alone, one worker, nothing else running, so timings are not distorted by other tests
// Each pass writes its own JSON file (test-results/results-main.json, results-perf.json); scripts/audit-report.mjs merges them.
// Extra arguments (for example --project=mobile-390) are passed to both passes.
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

const cli = path.join(path.dirname(createRequire(import.meta.url).resolve('@playwright/test/package.json')), 'cli.js')
const extra = process.argv.slice(2)
const dir = path.join(process.cwd(), 'test-results')
fs.mkdirSync(dir, { recursive: true })
// E2E_PASS=main or E2E_PASS=perf runs just that pass (and only clears that pass's result file); the default runs both.
const only = process.env.E2E_PASS
if (only && only !== 'main' && only !== 'perf') throw new Error('E2E_PASS must be main or perf')
for (const f of fs.readdirSync(dir)) {
  const stale = only ? f === `results-${only}.json` : /^results(-.*)?\.json$/.test(f)
  if (stale) fs.rmSync(path.join(dir, f))
}

const PERF = 'Core Web Vitals|resource budgets'
function pass(label, json, args) {
  console.log(`\n=== ${label} ===`)
  const r = spawnSync(process.execPath, [cli, 'test', ...args, ...extra], { stdio: 'inherit', env: { ...process.env, PW_JSON: json } })
  return r.status ?? 1
}

const main = only === 'perf' ? 0 : pass('Pass 1: all tests except performance (4 workers)', 'test-results/results-main.json', ['--grep-invert', PERF])
// Give the browsers and servers from pass 1 time to exit; a straggler would steal CPU from the timing measurements.
if (!only) {
  console.log('Settling for 20 s before the performance pass...')
  await new Promise((resolve) => setTimeout(resolve, 20_000))
}
const perf = only === 'main' ? 0 : pass('Pass 2: performance budgets alone (1 worker)', 'test-results/results-perf.json', ['--grep', PERF, '--workers=1'])
console.log(`\nPass 1 exit ${main}, pass 2 exit ${perf}`)
process.exit(main || perf ? 1 : 0)
