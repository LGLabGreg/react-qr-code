# React Native example

A small Expo app that renders `@lglab/react-qr-code` through its React Native
build (react-native-svg). It lives outside the pnpm workspace on purpose, so it
installs the library from a packed tarball the same way an app would from npm.

```sh
cd examples/native
npm run setup   # builds the library, packs it, installs this app
npm start       # then scan the code with Expo Go, or press i / a
```

Run `npm run setup` again after changing the library.

Each card on the screen covers one thing that differs from the web build:
rotated finder patterns, gradients, masks (ticket frame), frame labels, a
bundled logo passed with `require()`, and `ref.toDataURL()`.
