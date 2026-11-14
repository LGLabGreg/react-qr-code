---
'@lglab/react-qr-code': minor
---

Add React Native support. The same `ReactQRCode` component now renders in React Native 0.82+ and Expo through `react-native-svg` (an optional peer dependency), picked by Metro through a new `react-native` export condition. Both the web and native refs gain `toDataURL({ size })`, which resolves with a PNG data URL.

PNG and JPEG downloads now draw the logo exactly where the SVG shows it: `imageSettings.height`, `opacity`, `crossOrigin` and an `x` or `y` of `0` were ignored before.
