import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
  BG_GRADIENT_ID,
  DEFAULT_MARGIN_SIZE,
  DEFAULT_SIZE,
  GRADIENT_ID,
} from './constants'
import { ReactQRCode } from './react-qr-code'
import type {
  BackgroundSettings,
  DataModulesSettings,
  FinderPatternInnerSettings,
  FinderPatternOuterSettings,
  GradientSettings,
  GradientSettingsType,
  ReactQRCodeRef,
} from './types/lib'
import { downloadRaster, downloadSVG } from './utils/download'

vi.mock('./utils/download', () => ({
  downloadSVG: vi.fn(),
  downloadRaster: vi.fn(),
}))

describe('ReactQRCode', () => {
  it('renders with default props', () => {
    render(<ReactQRCode value='test' />)

    const svg = screen.getByRole('img')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('height', DEFAULT_SIZE.toString())
    expect(svg).toHaveAttribute('width', DEFAULT_SIZE.toString())
    expect(svg).toHaveAttribute('aria-label', 'QR Code')
  })

  it.each([
    [2, 2],
    [10, 10],
    [undefined, DEFAULT_MARGIN_SIZE],
  ])('applies margin %s', (marginSize, expected) => {
    render(<ReactQRCode value='test' marginSize={marginSize} />)

    const finderPattern = screen.getAllByTestId('finder-patterns-outer')
    expect(
      finderPattern[0]
        .getAttribute('d')!
        .toString()
        .startsWith(`M ${expected} ${expected}`),
    ).toBe(true)
  })

  it('applies custom size', () => {
    const customSize = 300
    render(<ReactQRCode value='test' size={customSize} />)

    const svg = screen.getByRole('img')
    expect(svg).toHaveAttribute('height', customSize.toString())
    expect(svg).toHaveAttribute('width', customSize.toString())
  })

  it('applies custom aria-label', () => {
    const customLabel = 'Custom QR Code'
    render(<ReactQRCode value='test' svgProps={{ 'aria-label': customLabel }} />)

    const svg = screen.getByRole('img')
    expect(svg).toHaveAttribute('aria-label', customLabel)
  })

  describe('Data modules', () => {
    it('renders the path with correct color', () => {
      const dataModulesSettings: DataModulesSettings = {
        color: '#560bad',
      }
      render(<ReactQRCode value='test' dataModulesSettings={dataModulesSettings} />)

      const path = screen.getByTestId('data-modules')

      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('fill', dataModulesSettings.color)
    })
  })

  describe('Finder patterns outer', () => {
    it('renders the path with correct color', () => {
      const finderPatternOuterSettings: FinderPatternOuterSettings = {
        color: '#560bad',
      }
      render(
        <ReactQRCode
          value='test'
          finderPatternOuterSettings={finderPatternOuterSettings}
        />,
      )

      screen.getAllByTestId('finder-patterns-outer').forEach((path) => {
        expect(path).toHaveAttribute('fill', finderPatternOuterSettings.color)
      })
    })
  })

  describe('Finder patterns inner', () => {
    it('renders the path with correct color', () => {
      const finderPatternInnerSettings: FinderPatternInnerSettings = {
        color: '#560bad',
      }
      render(
        <ReactQRCode
          value='test'
          finderPatternInnerSettings={finderPatternInnerSettings}
        />,
      )

      screen.getAllByTestId('finder-patterns-inner').forEach((path) => {
        expect(path).toHaveAttribute('fill', finderPatternInnerSettings.color)
      })
    })
  })

  describe('Background', () => {
    it('renders without background if not provided', () => {
      render(<ReactQRCode value='test' />)

      const background = screen.queryByTestId('background')
      expect(background).not.toBeInTheDocument()
    })

    it('renders with custom background color', () => {
      const color = '#ff0000'
      render(<ReactQRCode value='test' background={color} />)

      const background = screen.getByTestId('background')
      expect(background).toHaveAttribute('fill', color)
    })

    it.each([
      ['linear', 'linearGradient'],
      ['radial', 'radialGradient'],
    ])('renders with %s gradient background', (type, selector) => {
      const gradient: BackgroundSettings = {
        type: type as GradientSettingsType,
        rotation: 0,
        stops: [
          { offset: '0%', color: '#4568DC' },
          { offset: '100%', color: '#B06AB3' },
        ],
      }
      const { container } = render(<ReactQRCode value='test' background={gradient} />)

      const backgroundPath = screen.getByTestId('background')
      const gradientElement = container.querySelector(
        `${selector}[id^="${BG_GRADIENT_ID}-"]`,
      )

      const stops = gradientElement?.querySelectorAll('stop')

      expect(backgroundPath).toHaveAttribute('fill', `url(#${gradientElement?.id})`)
      expect(container.querySelector(`${selector}`)).toBeInTheDocument()
      expect(stops?.length).toBe(2)

      if (stops) {
        expect(stops[0]).toHaveAttribute('stop-color', gradient.stops[0].color)
        expect(stops[0]).toHaveAttribute('offset', gradient.stops[0].offset)
        expect(stops[1]).toHaveAttribute('stop-color', gradient.stops[1].color)
        expect(stops[1]).toHaveAttribute('offset', gradient.stops[1].offset)
      }
    })
  })

  describe('QR code data gradient', () => {
    it.each([
      ['linear', 'linearGradient'],
      ['radial', 'radialGradient'],
    ])('renders with %s gradient for QR code data', (type, selector) => {
      const gradient: GradientSettings = {
        type: type as GradientSettingsType,
        rotation: 0,
        stops: [
          { offset: '0%', color: '#4568DC' },
          { offset: '100%', color: '#B06AB3' },
        ],
      }
      const { container } = render(<ReactQRCode value='test' gradient={gradient} />)

      const gradientElement = container.querySelector(
        `${selector}[id^="${GRADIENT_ID}-"]`,
      )
      const stops = gradientElement?.querySelectorAll('stop')

      expect(gradientElement).toBeInTheDocument()
      expect(screen.getByTestId('data-modules')).toHaveAttribute(
        'fill',
        `url(#${gradientElement?.id})`,
      )
      screen.getAllByTestId('finder-patterns-outer').forEach((path) => {
        expect(path).toHaveAttribute('fill', `url(#${gradientElement?.id})`)
      })
      screen.getAllByTestId('finder-patterns-inner').forEach((path) => {
        expect(path).toHaveAttribute('fill', `url(#${gradientElement?.id})`)
      })

      expect(stops).toHaveLength(2)
      if (stops) {
        expect(stops[0]).toHaveAttribute('stop-color', gradient.stops[0].color)
        expect(stops[0]).toHaveAttribute('offset', gradient.stops[0].offset)
        expect(stops[1]).toHaveAttribute('stop-color', gradient.stops[1].color)
        expect(stops[1]).toHaveAttribute('offset', gradient.stops[1].offset)
      }
    })
  })

  describe('Image settings', () => {
    it('renders with image settings', () => {
      const imageSettings = {
        src: 'test-image.png',
        height: 30,
        width: 30,
        excavate: true,
      }
      const { container } = render(
        <ReactQRCode value='test' imageSettings={imageSettings} />,
      )

      const image = container.querySelector('image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('href', imageSettings.src)
    })
  })

  describe('ref functionality', () => {
    it('provides access to SVG element', () => {
      const ref = createRef<ReactQRCodeRef>()
      render(<ReactQRCode value='test' ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(ref.current?.svg instanceof SVGSVGElement).toBe(true)
    })

    it('provides download method', async () => {
      const ref = createRef<ReactQRCodeRef>()
      render(<ReactQRCode value='test' ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(typeof ref.current?.download).toBe('function')
    })

    it('handles svg download method call when ref is available', () => {
      const ref = createRef<ReactQRCodeRef>()
      render(<ReactQRCode value='test' ref={ref} />)

      if (ref.current) {
        ref.current.download({ format: 'svg', name: 'test-name', size: 300 })
        expect(vi.mocked(downloadSVG)).toHaveBeenCalledWith({
          svgRef: { current: ref.current.svg },
          fileSize: 300,
          fileName: 'test-name',
        })
      }
    })

    it('handles raster download method call when ref is available', () => {
      const ref = createRef<ReactQRCodeRef>()
      render(<ReactQRCode value='test' ref={ref} />)

      if (ref.current) {
        ref.current.download({ format: 'png', name: 'test-name', size: 300 })
        expect(vi.mocked(downloadRaster)).toHaveBeenCalledWith(
          expect.objectContaining({
            svgRef: { current: ref.current.svg },
            fileSize: 300,
            fileName: 'test-name',
          }),
        )
      }
    })
  })
})
