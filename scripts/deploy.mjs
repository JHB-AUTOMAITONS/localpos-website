// Publishes the built site (dist/) to the `gh-pages` branch of the "origin" remote, which GitHub Pages serves.
//
//   npm run deploy                 build, verify, then publish
//   node scripts/deploy.mjs        publish the existing dist/ (run `npm run build` first)
//
// The custom domain comes from VITE_SITE_URL (default https://www.localpos.in) and is written to a CNAME file.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const git = (args, cwd = root) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim()

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/ not found. Run `npm run build` first.')
  process.exit(1)
}

const origin = git(['remote', 'get-url', 'origin'])
const sourceSha = git(['rev-parse', '--short', 'HEAD'])
const dirty = git(['status', '--porcelain']) ? ' (with uncommitted changes)' : ''
const domain = new URL(process.env.VITE_SITE_URL ?? 'https://www.localpos.in').hostname

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'localpos-deploy-'))
try {
  fs.cpSync(dist, tmp, { recursive: true })
  fs.writeFileSync(path.join(tmp, 'CNAME'), `${domain}\n`) // tells GitHub Pages which custom domain to serve
  fs.writeFileSync(path.join(tmp, '.nojekyll'), '') // serve files as-is, no Jekyll processing

  git(['init', '-q', '-b', 'gh-pages'], tmp)
  git(['config', 'core.autocrlf', 'false'], tmp) // publish files byte-for-byte, whatever the global line-ending setting is
  git(['add', '-A'], tmp)
  git(['-c', 'core.autocrlf=false', 'commit', '-q', '-m', `Deploy ${sourceSha}${dirty}`], tmp)
  git(['push', '-q', '--force', origin, 'gh-pages'], tmp)
  console.log(`Published dist/ to gh-pages (${origin}) for ${domain}, from source ${sourceSha}${dirty}`)
} finally {
  fs.rmSync(tmp, { recursive: true, force: true })
}
