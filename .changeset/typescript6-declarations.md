---
'@lglab/react-qr-code': patch
---

Fix TypeScript declaration output when building with TypeScript 6: disable `vite-plugin-dts` type rollup (API Extractor used an older TS and emitted an empty declaration file). Update `types` / `exports.types` to `./dist/src/index.d.ts`.
