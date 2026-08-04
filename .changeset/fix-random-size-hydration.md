---
'@lglab/react-qr-code': patch
---

Fix `randomSize` breaking server-side rendering. `getScaleFactor` called `Math.random()` during render, so the server and the client produced different module sizes, causing a hydration mismatch, and static prerenders froze one arbitrary result into the HTML. Scale factors are now derived deterministically from the module's position and a seed hashed from the code's pre-excavation module grid: the same `value` always renders the same layout, different values still get different layouts, resizing an excavating image no longer reshuffles the rest of the code, and SSR output matches hydration.
