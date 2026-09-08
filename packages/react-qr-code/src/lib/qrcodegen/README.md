# QR Code generator library (TypeScript)

Copyright (c) Project Nayuki. (MIT License)

https://www.nayuki.io/page/qr-code-generator-library

Obtained via https://github.com/nayuki/QR-Code-generator/blob/942f4319a6ba913dbc6775d8e665ccf18f401d83/typescript-javascript/qrcodegen.ts

## Modifications:

- Converted from TypeScript `namespace`s to plain ES module exports (`QrCode`, `QrSegment`, `Ecc`, `Mode`).
  The namespace-merge emit (`let t; … t ||= ns.QrCode ||= {}`) was mis-compiled by consumers' minifiers
  when down-levelling to ES2020, producing `ReferenceError: l is not defined` in production builds (#621).
- Added `getModules` method to `QrCode` class, to bypass excessive calls to `getModule`.
