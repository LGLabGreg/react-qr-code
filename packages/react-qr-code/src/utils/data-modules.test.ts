import { describe, expect, it, vi } from 'vitest'

import type { Modules } from '../types/lib'
import { getModuleNeighbours, getScaleFactor } from './data-modules'

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

describe('getModuleNeighbours', () => {
  it('should return correct neighbours for a center cell', () => {
    const modules: Modules = [
      [false, true, false],
      [true, false, true],
      [false, true, false],
    ]

    const result = getModuleNeighbours(1, 1, modules)

    expect(result).toEqual({
      left: true,
      right: true,
      top: true,
      bottom: true,
      count: 4,
    })
  })

  it('should handle top-left corner cell', () => {
    const modules: Modules = [
      [false, true, false],
      [true, false, false],
      [false, false, false],
    ]

    const result = getModuleNeighbours(0, 0, modules)

    expect(result).toEqual({
      left: false,
      right: true,
      top: false,
      bottom: true,
      count: 2,
    })
  })

  it('should handle bottom-right corner cell', () => {
    const modules: Modules = [
      [false, false, false],
      [false, false, true],
      [false, true, false],
    ]

    const result = getModuleNeighbours(2, 2, modules)

    expect(result).toEqual({
      left: true,
      right: false,
      top: true,
      bottom: false,
      count: 2,
    })
  })

  it('should handle edge cell (middle of right edge)', () => {
    const modules: Modules = [
      [false, false, false],
      [false, true, true],
      [false, false, false],
    ]

    const result = getModuleNeighbours(2, 1, modules)

    expect(result).toEqual({
      left: true,
      right: false,
      top: false,
      bottom: false,
      count: 1,
    })
  })

  it('should handle cell with no true neighbours', () => {
    const modules: Modules = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]

    const result = getModuleNeighbours(1, 1, modules)

    expect(result).toEqual({
      left: false,
      right: false,
      top: false,
      bottom: false,
      count: 0,
    })
  })

  it('should handle cell with all true neighbours', () => {
    const modules: Modules = [
      [true, true, true],
      [true, false, true],
      [true, true, true],
    ]

    const result = getModuleNeighbours(1, 1, modules)

    expect(result).toEqual({
      left: true,
      right: true,
      top: true,
      bottom: true,
      count: 4,
    })
  })

  it('should handle a 1x1 grid', () => {
    const modules: Modules = [[true]]

    const result = getModuleNeighbours(0, 0, modules)

    expect(result).toEqual({
      left: false,
      right: false,
      top: false,
      bottom: false,
      count: 0,
    })
  })

  it('should handle cells in different size grids', () => {
    const modules: Modules = [
      [true, false, true, false],
      [false, true, false, true],
      [true, false, true, false],
      [false, true, false, true],
    ]

    const result = getModuleNeighbours(2, 2, modules)

    expect(result).toEqual({
      left: false,
      right: false,
      top: false,
      bottom: false,
      count: 0,
    })
  })
})
