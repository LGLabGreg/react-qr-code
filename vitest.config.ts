import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    // The native example runs its own Jest suite against the built package.
    exclude: [...configDefaults.exclude, 'examples/**'],
    coverage: {
      include: ['packages/react-qr-code/src'],
      exclude: ['packages/react-qr-code/src/index.ts', 'packages/react-qr-code/src/lib'],
    },
  },
})
