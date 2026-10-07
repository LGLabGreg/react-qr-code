---
'@lglab/react-qr-code': patch
---

Fix JPEG downloads of QR codes without a background: transparent areas were exported as black, making the code unscannable. JPEG downloads now use a white background; PNG downloads stay transparent.
