import { afterEach, describe, expect, it, vi } from 'vitest'

import { DEFAULT_BGCOLOR } from '../constants'
import type { DownloadFileFormat } from '../types/lib'
import { downloadRaster, getFileHeight } from './download'

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

describe('downloadRaster', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const run = (fileFormat: DownloadFileFormat) => {
    const ctx = { fillStyle: '', fillRect: vi.fn(), drawImage: vi.fn() }
    const canvas = document.createElement('canvas')
    vi.spyOn(canvas, 'getContext').mockReturnValue(
      ctx as unknown as CanvasRenderingContext2D,
    )
    const createElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) =>
      tag === 'canvas' ? canvas : createElement(tag),
    )
    URL.createObjectURL = vi.fn(() => 'blob:qr')

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 33 33')
    downloadRaster({
      svgRef: { current: svg },
      fileSize: 300,
      fileName: 'qr',
      fileFormat,
      imageSettings: undefined,
      calculatedImageSettings: null,
      size: 128,
      numCells: 33,
      margin: 4,
      frameLayout: null,
    })
    return ctx
  }

  it('fills a white background for jpeg, which has no transparency', () => {
    const ctx = run('jpeg')

    expect(ctx.fillStyle).toBe(DEFAULT_BGCOLOR)
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 300, 300)
  })

  it('keeps png transparent', () => {
    const ctx = run('png')

    expect(ctx.fillRect).not.toHaveBeenCalled()
  })
})
