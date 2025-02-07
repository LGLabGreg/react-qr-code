import { describe, expect, it } from 'vitest'

import { DEFAULT_IMG_SCALE } from '../constants'
import type { CrossOrigin, ImageSettings, Modules } from '../types/lib'
import { getImageSettings } from './qr-code'

describe('getImageSettings', () => {
  const cells: Modules = [
    [true, false, true],
    [false, true, false],
    [true, false, true],
  ]
  const size = 100
  const margin = 2

  it('returns null when imageSettings is undefined', () => {
    const result = getImageSettings(cells, size, margin, undefined)
    expect(result).toBeNull()
  })

  it('returns null when imageSettings is undefined', () => {
    const result = getImageSettings(cells, size, margin, undefined)
    expect(result).toBeNull()
  })

  it('calculates default position when x and y are not provided', () => {
    const imageSettings = {
      width: 50,
      height: 50,
      src: 'test.png',
    }
    const result = getImageSettings(cells, size, margin, imageSettings)

    expect(result).not.toBeNull()
    expect(result?.x).toBeCloseTo(
      cells.length / 2 - (50 * (cells.length + margin * 2)) / size / 2,
    )
    expect(result?.y).toBeCloseTo(
      cells.length / 2 - (50 * (cells.length + margin * 2)) / size / 2,
    )
  })

  it('uses provided x and y coordinates', () => {
    const imageSettings = {
      width: 50,
      height: 50,
      x: 10,
      y: 20,
      src: 'test.png',
    }
    const scale = (cells.length + margin * 2) / size
    const result = getImageSettings(cells, size, margin, imageSettings)

    expect(result?.x).toBe(10 * scale)
    expect(result?.y).toBe(20 * scale)
  })

  it('uses default size when width and height are not provided', () => {
    const imageSettings = {
      src: 'test.png',
    } as ImageSettings
    const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE)
    const scale = (cells.length + margin * 2) / size
    const result = getImageSettings(cells, size, margin, imageSettings)

    expect(result?.w).toBe(defaultSize * scale)
    expect(result?.h).toBe(defaultSize * scale)
  })

  it('handles opacity settings', () => {
    const imageSettings = {
      width: 50,
      height: 50,
      opacity: 0.5,
      src: 'test.png',
    }
    const result = getImageSettings(cells, size, margin, imageSettings)

    expect(result?.opacity).toBe(0.5)
  })

  it('uses default opacity when not provided', () => {
    const imageSettings = {
      width: 50,
      height: 50,
      src: 'test.png',
    }
    const result = getImageSettings(cells, size, margin, imageSettings)

    expect(result?.opacity).toBe(1)
  })

  it('calculates excavation when excavate is true', () => {
    const imageSettings = {
      width: 50,
      height: 50,
      x: 10.6,
      y: 20.3,
      excavate: true,
      src: 'test.png',
    }
    const scale = (cells.length + margin * 2) / size
    const result = getImageSettings(cells, size, margin, imageSettings)

    expect(result?.excavation).toEqual({
      x: Math.floor(10.6 * scale),
      y: Math.floor(20.3 * scale),
      w: Math.ceil(50 * scale + (10.6 * scale - Math.floor(10.6 * scale))),
      h: Math.ceil(50 * scale + (20.3 * scale - Math.floor(20.3 * scale))),
    })
  })

  it('excavation is null when excavate is false', () => {
    const imageSettings = {
      width: 50,
      height: 50,
      excavate: false,
      src: 'test.png',
    }
    const result = getImageSettings(cells, size, margin, imageSettings)

    expect(result?.excavation).toBeNull()
  })

  it('preserves crossOrigin setting', () => {
    const imageSettings = {
      width: 50,
      height: 50,
      crossOrigin: 'anonymous' as CrossOrigin,
      src: 'test.png',
    }
    const result = getImageSettings(cells, size, margin, imageSettings)

    expect(result?.crossOrigin).toBe('anonymous')
  })
})
