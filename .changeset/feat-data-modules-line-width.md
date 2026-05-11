---
'@lglab/react-qr-code': minor
---

Add `lineWidth` option to `dataModulesSettings`. Controls the stroke width (in module units) for connected-shape styles: `vertical-line`, `horizontal-line`, `rounded`, and `circuit-board`. Defaults preserve existing rendering (`1` for line/rounded, `0.5` for `circuit-board`). The `rounded` style fillets exposed outer hub corners so the rounded character is preserved at any `lineWidth`.
