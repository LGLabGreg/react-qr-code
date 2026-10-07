import { describe, expect, it } from 'vitest'

import { FRAME_MIN_QUIET_ZONE } from '../constants'
import type { FrameStyle } from '../types/lib'
import { getFrameLayout, isFilledFrame } from './frame'

const NUM_CELLS = 33
const MARGIN = 4
const styles: FrameStyle[] = ['banner-bottom', 'banner-top', 'ticket', 'bubble', 'border']

describe('getFrameLayout', () => {
  it.each(styles)('fits the code and the label inside the %s frame', (style) => {
    const layout = getFrameLayout(style, NUM_CELLS, MARGIN)

    expect(layout.width).toBeCloseTo(NUM_CELLS + layout.padding * 2)
    expect(layout.qrX + NUM_CELLS).toBeLessThanOrEqual(layout.width)
    expect(layout.qrY + NUM_CELLS).toBeLessThanOrEqual(layout.height)
    expect(layout.labelY + layout.labelHeight / 2).toBeLessThanOrEqual(
      layout.height + 1e-9,
    )
  })

  it('puts the label above the code for banner-top', () => {
    const layout = getFrameLayout('banner-top', NUM_CELLS, MARGIN)

    expect(layout.labelY).toBeLessThan(layout.qrY)
  })

  it.each(['banner-bottom', 'ticket', 'bubble', 'border'] as FrameStyle[])(
    'puts the label below the code for %s',
    (style) => {
      const layout = getFrameLayout(style, NUM_CELLS, MARGIN)

      expect(layout.labelY - layout.labelHeight / 2).toBeGreaterThanOrEqual(
        layout.qrY + NUM_CELLS,
      )
    },
  )

  it('places the ticket divider between the code and the label', () => {
    const layout = getFrameLayout('ticket', NUM_CELLS, MARGIN)

    expect(layout.dividerY).toBeGreaterThan(layout.qrY + NUM_CELLS)
    expect(layout.dividerY).toBeLessThan(layout.labelY)
  })

  it('places the code inside the panel', () => {
    const layout = getFrameLayout('ticket', NUM_CELLS, MARGIN)

    expect(layout.panelSize).toBe(NUM_CELLS)
    expect(layout.qrX).toBe(layout.panelX)
    expect(layout.qrY).toBe(layout.panelY)
  })

  it.each([0, 1])('adds a quiet zone around codes with a margin of %s', (margin) => {
    const layout = getFrameLayout('ticket', NUM_CELLS, margin)
    const quietZone = FRAME_MIN_QUIET_ZONE - margin

    expect(layout.panelSize).toBe(NUM_CELLS + quietZone * 2)
    expect(layout.qrX - layout.panelX).toBeCloseTo(quietZone)
    expect(layout.qrY - layout.panelY).toBeCloseTo(quietZone)
  })

  it.each(styles)('collapses the %s frame without a label', (style) => {
    const layout = getFrameLayout(style, NUM_CELLS, MARGIN, false)

    expect(layout.labelHeight).toBe(0)
    expect(layout.height).toBeCloseTo(layout.width)
    expect(layout.qrY).toBeCloseTo(layout.padding)
  })

  it('scales with the number of cells', () => {
    const small = getFrameLayout('ticket', 21, MARGIN)
    const large = getFrameLayout('ticket', 42, MARGIN)

    expect(large.width / small.width).toBeCloseTo(2)
    expect(large.height / small.height).toBeCloseTo(2)
  })
})

describe('isFilledFrame', () => {
  it.each([
    ['banner-bottom', true],
    ['banner-top', true],
    ['ticket', true],
    ['bubble', false],
    ['border', false],
  ] as [FrameStyle, boolean][])('%s -> %s', (style, expected) => {
    expect(isFilledFrame(style)).toBe(expected)
  })
})
