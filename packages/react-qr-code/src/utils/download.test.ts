import { afterEach, describe, expect, it, vi } from 'vitest'

import { DEFAULT_BGCOLOR } from '../constants'
import type { DownloadFileFormat } from '../types/lib'
import { downloadRaster, getFileHeight, inlineImages } from './download'

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

describe('inlineImages', () => {
  const svgWithImage = (href: string) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image')
    image.setAttribute('href', href)
    svg.appendChild(image)
    return { svg, image }
  }

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('replaces linked images with data URLs', async () => {
    const blob = new Blob(['<svg/>'], { type: 'image/svg+xml' })
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, blob: async () => blob })),
    )
    const { svg, image } = svgWithImage('https://example.com/logo.svg')
    await inlineImages(svg)
    expect(image.getAttribute('href')).toMatch(/^data:image\/svg\+xml;base64,/)
  })

  it('keeps the original href when the fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('Failed to fetch')
      }),
    )
    const { svg, image } = svgWithImage('https://example.com/logo.svg')
    await inlineImages(svg)
    expect(image.getAttribute('href')).toBe('https://example.com/logo.svg')
  })

  it('keeps the original href on an HTTP error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, status: 404 })),
    )
    const { svg, image } = svgWithImage('https://example.com/missing.svg')
    await inlineImages(svg)
    expect(image.getAttribute('href')).toBe('https://example.com/missing.svg')
  })

  it('sends credentials when the image uses use-credentials', async () => {
    const blob = new Blob(['<svg/>'], { type: 'image/svg+xml' })
    const fetchMock = vi.fn(async () => ({ ok: true, blob: async () => blob }))
    vi.stubGlobal('fetch', fetchMock)
    const { svg, image } = svgWithImage('https://example.com/logo.svg')
    image.setAttribute('crossorigin', 'use-credentials')
    await inlineImages(svg)
    expect(fetchMock).toHaveBeenCalledWith('https://example.com/logo.svg', {
      credentials: 'include',
    })
  })

  it('leaves data URLs untouched', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const { svg } = svgWithImage('data:image/png;base64,AAAA')
    await inlineImages(svg)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
