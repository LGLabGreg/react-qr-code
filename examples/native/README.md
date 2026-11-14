# React Native example

A small Expo app that renders `@lglab/react-qr-code` through its React Native
build (react-native-svg). It is part of the pnpm workspace, so it needs no
setup of its own.

From the repository root:

```sh
pnpm install
pnpm example:native   # builds the library, then starts Expo
```

Scan the QR code in the terminal with Expo Go (SDK 58), or press `a`, `i` or
`w` for an Android emulator, iOS simulator or the browser. If Expo Go cannot
reach your computer, run `pnpm --filter react-qr-code-native-example start --tunnel`.

After changing the library, run `pnpm build:lib` (or `pnpm example:native`
again). The example installs the library as a copy rather than a symlink
(`injected` in its `package.json`) so it uses the example's React instead of
the library's dev copy, and building the library refreshes that copy.

Each card on the screen covers one thing that differs from the web build:
rotated finder patterns, gradients, masks (ticket frame), frame labels, a
bundled logo passed with `require()`, and exporting a PNG.
