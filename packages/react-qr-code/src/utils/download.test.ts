import { describe, expect, it } from 'vitest'

import { getFileHeight } from './download'

const svgWithViewBox = (width: number, height: number) =>
  ({ viewBox: { baseVal: { width, height } } }) as unknown as SVGSVGElement

describe('getFileHeight', () => {
  it('keeps square codes square', () => {
    expect(getFileHeight(svgWithViewBox(33, 33), 500)).toBe(500)
  })

  it('scales the height by the frame aspect ratio', () => {
    expect(getFileHeight(svgWithViewBox(40, 50), 400)).toBe(500)
  })

  it('falls back to the file size without a viewBox', () => {
    expect(
      getFileHeight({ viewBox: { baseVal: null } } as unknown as SVGSVGElement, 300),
    ).toBe(300)
  })
})
