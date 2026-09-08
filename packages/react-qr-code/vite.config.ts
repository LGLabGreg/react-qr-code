import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      // rollupTypes uses API Extractor with an older bundled TS than the project (TS 6); it emitted empty `export { }`.
      rollupTypes: false,
    }),
  ],
  build: {
    // Emit ES2020 (no `||=`, no `static {}` blocks) so consumers' bundlers never have to
    // down-level the shipped code; that down-levelling is what broke #621.
    target: 'es2020',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactQRCode',
      fileName: (format) => `index.${format}.js`,
      formats: ['es'],
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
