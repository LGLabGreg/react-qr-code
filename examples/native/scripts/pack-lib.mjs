/* oxlint-disable no-console -- CLI script, output is its purpose */
/**
 * Packs the local library build into `.lib/react-qr-code.tgz`, exactly as it
 * would be published, so the example resolves it through `exports` like a real
 * install. A workspace symlink would instead load a second copy of React.
 */
import { execFileSync } from 'node:child_process'
import { mkdir, readdir, rename, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const exampleDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const libDir = resolve(exampleDir, '../../packages/react-qr-code')
const outDir = join(exampleDir, '.lib')

await rm(outDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })
execFileSync('pnpm', ['pack', '--pack-destination', outDir], {
  cwd: libDir,
  stdio: 'inherit',
})

const [tarball] = (await readdir(outDir)).filter((name) => name.endsWith('.tgz'))
await rename(join(outDir, tarball), join(outDir, 'react-qr-code.tgz'))
// Drop the installed copy so npm picks up the fresh tarball.
await rm(join(exampleDir, 'node_modules/@lglab'), { recursive: true, force: true })
console.log('ok   packed the library into .lib/react-qr-code.tgz')
