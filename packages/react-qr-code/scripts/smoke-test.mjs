/* oxlint-disable no-console -- CLI script, output is its purpose */
/**
 * Production-bundle smoke test.
 *
 * Consumers do not run `dist/index.es.js` as-is: their bundler minifies it and
 * down-levels it to their browser target. Some of those transforms have broken
 * the library in the past (see #621: esbuild targeting ES2020 mis-compiled the
 * TypeScript namespace emit into `ReferenceError: l is not defined`).
 *
 * This script runs the built bundle through esbuild at several targets, then
 * actually executes each result by rendering a QR code with react-dom/server.
 *
 * esbuild is deliberately pinned to 0.28.1 (exact, and ignored by Dependabot):
 * every release from 0.25.0 through 0.28.1 exhibits the #621 mis-compilation,
 * and Vite 5/6/7 pin into that range, so it is what consumers actually run.
 * 0.28.2 fixed it upstream, which would make this test blind to a regression.
 *
 * Usage: node scripts/smoke-test.mjs [path/to/index.es.js]
 */
import { mkdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { build } from 'esbuild'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const entry = resolve(process.argv[2] ?? resolve(pkgDir, 'dist/index.es.js'))
const outDir = resolve(pkgDir, 'dist/.smoke')
const targets = ['es2015', 'es2020', 'es2022', 'esnext']

await rm(outDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })

let failed = false

for (const target of targets) {
  const outfile = resolve(outDir, `${target}.js`)
  try {
    await build({
      entryPoints: [entry],
      bundle: true,
      minify: true,
      format: 'esm',
      target,
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      outfile,
      logLevel: 'silent',
    })
    const { ReactQRCode } = await import(pathToFileURL(outfile).href)
    const html = renderToStaticMarkup(
      createElement(ReactQRCode, { value: 'https://reactqrcode.com', level: 'H' }),
    )
    if (!html.includes('<svg'))
      throw new Error(`rendered output has no <svg>: ${html.slice(0, 200)}`)
    console.log(`ok   ${target}`)
  } catch (error) {
    failed = true
    console.error(
      `FAIL ${target}: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

await rm(outDir, { recursive: true, force: true })

if (failed) {
  console.error(`\nSmoke test failed for ${entry}`)
  process.exit(1)
}
console.log(`\nSmoke test passed for ${entry}`)
