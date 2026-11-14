import { afterEach, describe, expect, it, vi } from 'vitest'

import { DEFAULT_BGCOLOR } from '../constants'
import type { DownloadFileFormat } from '../types/lib'
import { downloadRaster, getFileHeight, inlineImages, renderRaster } from './download'

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

describe('renderRaster', () => {
  // jsdom never loads images, so fire onload (or onerror for failing sources) on assignment.
  class FakeImage {
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    crossOrigin = ''
    set src(value: string) {
      queueMicrotask(() =>
        value.includes('broken') ? this.onerror?.() : this.onload?.(),
      )
    }
  }

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  const setup = () => {
    vi.stubGlobal('Image', FakeImage)
    URL.createObjectURL = vi.fn(() => 'blob:qr')
    URL.revokeObjectURL = vi.fn()
    const ctx = { fillStyle: '', fillRect: vi.fn(), drawImage: vi.fn() }
    const canvas = document.createElement('canvas')
    vi.spyOn(canvas, 'getContext').mockReturnValue(
      ctx as unknown as CanvasRenderingContext2D,
    )
    vi.spyOn(canvas, 'toDataURL').mockImplementation(
      (type?: string) => `data:${type};base64,AAAA`,
    )
    const createElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) =>
      tag === 'canvas' ? canvas : createElement(tag),
    )
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 33 33')
    return { ctx, svg }
  }

  const baseProps = (svg: SVGSVGElement) => ({
    svgRef: { current: svg },
    fileSize: 300,
    fileFormat: 'png' as const,
    imageSettings: undefined,
    calculatedImageSettings: null,
    size: 128,
    numCells: 33,
    margin: 4,
    frameLayout: null,
  })

  it('resolves with a PNG data URL and frees the SVG blob', async () => {
    const { ctx, svg } = setup()
    await expect(renderRaster(baseProps(svg))).resolves.toBe('data:image/png;base64,AAAA')
    expect(ctx.drawImage).toHaveBeenCalledTimes(1)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:qr')
  })

  it('draws the logo on top', async () => {
    const { ctx, svg } = setup()
    await renderRaster({
      ...baseProps(svg),
      imageSettings: { src: 'logo.png', width: 24, height: 24 },
      calculatedImageSettings: {
        x: 0,
        y: 0,
        w: 6,
        h: 6,
        excavation: null,
        opacity: 1,
        crossOrigin: undefined,
      },
    })
    expect(ctx.drawImage).toHaveBeenCalledTimes(2)
  })

  it('rejects when the logo fails to load', async () => {
    const { svg } = setup()
    await expect(
      renderRaster({
        ...baseProps(svg),
        imageSettings: { src: 'broken.png', width: 24, height: 24 },
        calculatedImageSettings: {
          x: 0,
          y: 0,
          w: 6,
          h: 6,
          excavation: null,
          opacity: 1,
          crossOrigin: undefined,
        },
      }),
    ).rejects.toThrow('Failed to load the logo')
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:qr')
  })

  it('rejects when the QR code is not mounted', async () => {
    await expect(
      renderRaster({
        ...baseProps(
          document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement,
        ),
        svgRef: { current: null },
      }),
    ).rejects.toThrow('not mounted')
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
