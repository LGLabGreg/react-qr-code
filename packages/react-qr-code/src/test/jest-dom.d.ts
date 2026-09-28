// @testing-library/jest-dom's vitest types augment `Assertion<T>`, but Vitest 5 changed it to
// `Assertion<R, T>` and expects custom matchers on `Matchers<R, T>` instead.
import 'vitest'
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare module 'vitest' {
  // oxlint-disable-next-line typescript/no-empty-object-type
  interface Matchers<R, T> extends TestingLibraryMatchers<unknown, R> {}
}
