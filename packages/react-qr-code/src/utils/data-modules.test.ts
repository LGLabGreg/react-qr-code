import { describe, expect, it, vi } from 'vitest'

import { getScaleFactor } from './data-modules'

describe('getScaleFactor', () => {
  it('returns 0.75 for square-sm style', () => {
    expect(getScaleFactor('square-sm', false)).toBe(0.75)
    expect(getScaleFactor('square-sm', true)).toBe(0.75)
  })

  it('returns 1 when randomSize is false and not square-sm', () => {
    expect(getScaleFactor('circle', false)).toBe(1)
  })

  it('returns a random value between 0.75 and 1 when randomSize is true', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9)
    const scaleFactor = getScaleFactor('circle', true)
    expect(scaleFactor).toEqual(0.9 * (1 - 0.75) + 0.75)
  })
})
