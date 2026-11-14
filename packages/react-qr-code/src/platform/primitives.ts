import type { CrossOrigin, DataModulesStyle } from '../types/lib'

/**
 * The SVG elements the library renders, plus the handful of props that are
 * spelled differently per platform. On the web these are plain DOM tags; the
 * React Native build resolves `primitives.native.ts` instead, which maps the
 * same names onto react-native-svg.
 */
export const Svg = 'svg'
export const G = 'g'
export const Path = 'path'
export const Rect = 'rect'
export const Circle = 'circle'
export const Line = 'line'
export const Defs = 'defs'
export const LinearGradient = 'linearGradient'
export const RadialGradient = 'radialGradient'
export const Stop = 'stop'
export const Mask = 'mask'
export const Text = 'text'
export const SvgImage = 'image'

export const DEFAULT_FRAME_FONT_FAMILY: string | undefined = 'sans-serif'

/**
 * Browsers lay out SVG text at its rendered size whatever the viewBox scale,
 * so the label can use viewBox units directly.
 */
export const labelLayoutScale = (_pixelsPerUnit: number) => 1

export const testId = (id: string) => ({ 'data-testid': id })

export const centralBaseline = { dominantBaseline: 'central' } as const

/**
 * Props that squeeze a label that is too long into `maxWidth`. The browser
 * condenses the glyphs to an exact width.
 */
export const fitLabel = (maxWidth: number, _estimatedWidth: number, _centerX: number) =>
  ({ textLength: maxWidth, lengthAdjust: 'spacingAndGlyphs' }) as const

export const shapeRendering = (style: DataModulesStyle) =>
  ({
    shapeRendering: style === 'square' ? 'crispEdges' : 'geometricPrecision',
  }) as const

// Note: specified always, but undefined will result in no attribute.
export const imageCrossOrigin = (crossOrigin: CrossOrigin) => ({ crossOrigin })
