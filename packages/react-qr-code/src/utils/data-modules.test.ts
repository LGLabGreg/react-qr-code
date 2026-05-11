import { describe, expect, it, vi } from 'vitest'

import type { Modules } from '../types/lib'
import {
  bottomRounded,
  circuitBoardShouldDrawPad,
  dataModuleCanBeRandomSize,
  getModuleNeighbours,
  getRenderableDataModuleNeighbours,
  getScaleFactor,
  isRenderableDataModule,
  leftRounded,
  rightRounded,
  roundedDataModule,
  topRounded,
} from './data-modules'

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

  it('returns the provided size for fillable styles when randomSize is false', () => {
    expect(getScaleFactor('circle', false, 0.8)).toBe(0.8)
    expect(getScaleFactor('square', false, 0.9)).toBe(0.9)
  })

  it('ignores size for styles that cannot be scaled', () => {
    expect(getScaleFactor('rounded', false, 0.8)).toBe(1)
    expect(getScaleFactor('leaf', false, 0.8)).toBe(1)
    expect(getScaleFactor('vertical-line', false, 0.8)).toBe(1)
    expect(getScaleFactor('horizontal-line', false, 0.8)).toBe(1)
    expect(getScaleFactor('circuit-board', false, 0.8)).toBe(1)
  })

  it('ignores size when randomSize is true', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    expect(getScaleFactor('circle', true, 0.8)).toEqual(0.5 * (1 - 0.75) + 0.75)
  })
})

describe('dataModuleCanBeRandomSize', () => {
  it('does not allow random size for circuit-board modules', () => {
    expect(dataModuleCanBeRandomSize('circuit-board')).toBe(false)
  })
})

describe('circuitBoardShouldDrawPad', () => {
  it('draws pads only for endpoints', () => {
    expect(
      circuitBoardShouldDrawPad({
        left: true,
        right: false,
        top: false,
        bottom: false,
        count: 1,
      }),
    ).toBe(true)
  })

  it('does not draw pads for isolated, turn, junction, or straight-through modules', () => {
    expect(
      circuitBoardShouldDrawPad({
        left: false,
        right: false,
        top: false,
        bottom: false,
        count: 0,
      }),
    ).toBe(false)
    expect(
      circuitBoardShouldDrawPad({
        left: true,
        right: false,
        top: true,
        bottom: false,
        count: 2,
      }),
    ).toBe(false)
    expect(
      circuitBoardShouldDrawPad({
        left: true,
        right: true,
        top: true,
        bottom: false,
        count: 3,
      }),
    ).toBe(false)
    expect(
      circuitBoardShouldDrawPad({
        left: false,
        right: false,
        top: true,
        bottom: true,
        count: 2,
      }),
    ).toBe(false)
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

describe('isRenderableDataModule', () => {
  it('returns false for finder pattern modules', () => {
    const modules: Modules = Array.from({ length: 21 }, () => Array(21).fill(false))
    modules[0][0] = true

    expect(isRenderableDataModule({ x: 0, y: 0, modules, numCells: 21 })).toBe(false)
  })
})

describe('rounded line-cap helpers', () => {
  const normalize = (s: string) => s.replace(/\s+/g, ' ').trim()

  it('emit the legacy full-width path when width defaults to 1', () => {
    expect(normalize(topRounded(0, 0))).toBe(
      normalize(`M 0 1 h 1 v -0.5 a 0.5 0.5, 0, 0, 0, -1 0`),
    )
    expect(normalize(bottomRounded(0, 0))).toBe(
      normalize(`M 0 0 h 1 v 0.5 a 0.5 0.5, 0, 0, 1, -1 0`),
    )
    expect(normalize(leftRounded(0, 0))).toBe(
      normalize(`M 1 0 v 1 h -0.5 a 0.5 0.5, 0, 0, 1, 0 -1`),
    )
    expect(normalize(rightRounded(0, 0))).toBe(
      normalize(`M 0 0 v 1 h 0.5 a 0.5 0.5, 0, 0, 0, 0 -1`),
    )
  })

  it('centers the cap on the cell axis when width < 1', () => {
    // width = 0.5, vertical-line top cap: cap is 0.5 wide, centered at x+0.5,
    // straight body 0.75 tall, semicircle radius 0.25 on top.
    expect(normalize(topRounded(0, 0, 0.5))).toBe(
      normalize(`M 0.25 1 h 0.5 v -0.75 a 0.25 0.25, 0, 0, 0, -0.5 0`),
    )
    expect(normalize(leftRounded(0, 0, 0.5))).toBe(
      normalize(`M 1 0.25 v 0.5 h -0.75 a 0.25 0.25, 0, 0, 1, 0 -0.5`),
    )
  })
})

describe('roundedDataModule', () => {
  const n = { left: false, right: false, top: false, bottom: false }

  it('fillets every hub corner when isolated (count=0)', () => {
    const d = roundedDataModule(0, 0, 0.75, n)
    // Four quarter-circle arcs of radius 0.375 → full circle
    const arcs = d.match(/A 0.375 0.375 0 0 1/g) ?? []
    expect(arcs.length).toBe(4)
  })

  it('fillets only the outer (bottom-right) corner for a left+top L-bend', () => {
    const d = roundedDataModule(0, 0, 0.5, { ...n, left: true, top: true })
    const arcs = d.match(/A 0.25 0.25 0 0 1/g) ?? []
    expect(arcs.length).toBe(1)
    // Outer fillet sits at the hub's BR corner (cx+r, cy+r) = (0.75, 0.75)
    expect(d).toContain('A 0.25 0.25 0 0 1 0.5 0.75')
  })

  it('emits no fillets for a straight-through (left+right) cell', () => {
    const d = roundedDataModule(0, 0, 0.5, { ...n, left: true, right: true })
    expect(d.includes('A ')).toBe(false)
  })

  it('fillets the two corners on the open side for a 1-neighbour cell', () => {
    // Only top neighbour → BR and BL exposed
    const d = roundedDataModule(0, 0, 0.5, { ...n, top: true })
    const arcs = d.match(/A 0.25 0.25 0 0 1/g) ?? []
    expect(arcs.length).toBe(2)
  })
})

describe('getRenderableDataModuleNeighbours', () => {
  it('ignores neighbouring finder pattern modules', () => {
    const modules: Modules = Array.from({ length: 21 }, () => Array(21).fill(false))
    modules[3][6] = true
    modules[3][7] = true
    modules[3][8] = true

    expect(getRenderableDataModuleNeighbours(7, 3, modules, 21)).toEqual({
      left: false,
      right: true,
      top: false,
      bottom: false,
      count: 1,
    })
  })
})
