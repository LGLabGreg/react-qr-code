// Renders the promo frame by frame with headless Chromium and pipes it to ffmpeg.
//
//   node media/promo/render.mjs                       -> media/promo/out/promo-1920x1080.mp4
//   node media/promo/render.mjs --w 1080 --h 1080     -> square cut
//   node media/promo/render.mjs --stills 1,3.2,6.5    -> PNG stills at those seconds
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { createServer } from 'vite'

const require = createRequire(import.meta.url)
let chromium
try {
  ;({ chromium } = require('playwright'))
} catch {
  ;({ chromium } = require('/opt/node22/lib/node_modules/playwright'))
}

const here = dirname(fileURLToPath(import.meta.url))
const { values: args } = parseArgs({
  options: {
    w: { type: 'string', default: '1920' },
    h: { type: 'string', default: '1080' },
    fps: { type: 'string', default: '60' },
    stills: { type: 'string' },
    from: { type: 'string' },
    to: { type: 'string' },
  },
})
const W = Number(args.w)
const H = Number(args.h)
const outDir = join(here, 'out')
mkdirSync(outDir, { recursive: true })

const server = await createServer({
  configFile: join(here, 'vite.config.ts'),
  logLevel: 'warn',
})
await server.listen()
const url = `http://localhost:5199/?w=${W}&h=${H}&fps=${args.fps}`

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: [
    '--force-color-profile=srgb',
    '--disable-lcd-text',
    '--font-render-hinting=none',
  ],
})
const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
})
page.on('pageerror', (e) => console.error('pageerror', e))
await page.goto(url)
await page.waitForFunction(() => window.__setFrame && window.__meta)
const meta = await page.evaluate(() => window.__meta)

const shot = async (frame) => {
  await page.evaluate((f) => window.__setFrame(f), frame)
  return page.screenshot({ type: 'png' })
}

if (args.stills) {
  for (const s of args.stills.split(',').map(Number)) {
    const buf = await shot(Math.round(s * meta.fps))
    const file = join(outDir, `still-${s.toFixed(2)}.png`)
    writeFileSync(file, buf)
    console.log(file)
  }
} else {
  const start = args.from ? Math.round(Number(args.from) * meta.fps) : 0
  const end = args.to ? Math.round(Number(args.to) * meta.fps) : meta.frames
  const file = join(outDir, `promo-${W}x${H}.mp4`)
  const ff = spawn(
    'ffmpeg',
    [
      '-y',
      '-loglevel',
      'error',
      '-f',
      'image2pipe',
      '-framerate',
      String(meta.fps),
      '-i',
      '-',
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      '16',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      file,
    ],
    { stdio: ['pipe', 'inherit', 'inherit'] },
  )
  const t0 = Date.now()
  for (let f = start; f < end; f++) {
    const buf = await shot(f)
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
    if (f % 60 === 0)
      console.log(`frame ${f}/${end} (${((Date.now() - t0) / 1000).toFixed(0)}s)`)
  }
  ff.stdin.end()
  await new Promise((r) => ff.on('close', r))
  console.log(file)
}

await browser.close()
await server.close()
