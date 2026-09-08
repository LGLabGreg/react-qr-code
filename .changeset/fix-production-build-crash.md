---
'@lglab/react-qr-code': patch
---

fix: `ReferenceError: l is not defined` in production builds (#621)

The vendored qrcodegen library used TypeScript `namespace`s. The bundled output for the namespace merge (`let t; … t ||= ns.QrCode ||= {}`) was mis-compiled by consumers' minifiers when down-levelling to ES2020 (e.g. Vite with esbuild), dropping the variable declaration and crashing at load time. The library now uses plain ES module exports and the published bundle targets ES2020, so nothing needs to be down-levelled.
