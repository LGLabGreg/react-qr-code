/* oxlint-disable no-console -- CLI script, output is its purpose */
/**
 * Emits the declarations for the React Native build into `dist/native`.
 *
 * `tsconfig.native.json` resolves `./foo` to `./foo.native` through
 * `moduleSuffixes`, so tsc writes `foo.native.d.ts`. Consumers do not set
 * `moduleSuffixes`, so those files are renamed to the plain `foo.d.ts` the
 * emitted imports point at.
 */
import { execFileSync } from 'node:child_process'
import { readdir, rename, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(pkgDir, 'dist/native')

await rm(outDir, { recursive: true, force: true })
execFileSync('tsc', ['-p', 'tsconfig.native.json'], { cwd: pkgDir, stdio: 'inherit' })

let renamed = 0
for (const entry of await readdir(outDir, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.native.d.ts')) continue
  const from = join(entry.parentPath, entry.name)
  await rename(from, from.replace(/\.native\.d\.ts$/, '.d.ts'))
  renamed++
}
console.log(`ok   native declarations written to dist/native (${renamed} renamed)`)
