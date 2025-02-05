import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { BG_GRADIENT_ID, DEFAULT_BGCOLOR, DEFAULT_SIZE } from './constants'
import { ReactQRCode } from './react-qr-code'
import type {
  BackgroundSettings,
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

  describe('background', () => {
    it('renders with default background color', () => {
      render(<ReactQRCode value='test' />)

      const background = screen.getByTestId('background')
      expect(background).toHaveAttribute('fill', DEFAULT_BGCOLOR)
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

      const background = screen.getByTestId('background')
      const stops = container.querySelectorAll(`${selector} stop`)

      expect(background).toHaveAttribute('fill', `url(#${BG_GRADIENT_ID})`)
      expect(container.querySelector(`${selector}`)).toBeInTheDocument()
      expect(stops).toHaveLength(2)
      expect(stops[0]).toHaveAttribute('stop-color', gradient.stops[0].color)
      expect(stops[0]).toHaveAttribute('offset', gradient.stops[0].offset)
      expect(stops[1]).toHaveAttribute('stop-color', gradient.stops[1].color)
      expect(stops[1]).toHaveAttribute('offset', gradient.stops[1].offset)
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
