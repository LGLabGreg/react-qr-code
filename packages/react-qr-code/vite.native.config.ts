import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// React Native build. Same sources as the web build, but `*.native.ts(x)`
// modules win, which swaps DOM tags for react-native-svg. Runs after the web
// build and adds `index.native.js` next to it.
export default defineConfig({
  resolve: {
    extensions: ['.native.tsx', '.native.ts', '.tsx', '.ts', '.mjs', '.js', '.json'],
  },
  build: {
    target: 'es2020',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: () => 'index.native.js',
      formats: ['es'],
    },
    rolldownOptions: {
      external: ['react', 'react/jsx-runtime', 'react-native', 'react-native-svg'],
    },
  },
})
