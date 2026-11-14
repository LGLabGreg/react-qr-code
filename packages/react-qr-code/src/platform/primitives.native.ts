import type { CrossOrigin, DataModulesStyle } from '../types/lib'

export {
  Circle,
  Defs,
  G,
  Image as SvgImage,
  Line,
  LinearGradient,
  Mask,
  Path,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Text,
} from 'react-native-svg'

// `sans-serif` is a CSS generic family, not a font React Native can load.
// Leaving the family unset renders the label in the system font.
export const DEFAULT_FRAME_FONT_FAMILY: string | undefined = undefined

// react-native-svg lays text out at its font size in viewBox units (a few units
// for a frame label) and only then scales it up to the rendered size, so glyph
// advances that are slightly off get magnified into uneven letter spacing.
// Laying the label out at its rendered pixel size avoids that.
export const labelLayoutScale = (pixelsPerUnit: number) => Math.max(1, pixelsPerUnit)

export const testId = (id: string) => ({ testID: id })

// react-native-svg has no `dominantBaseline`; `alignmentBaseline` is its equivalent.
export const centralBaseline = { alignmentBaseline: 'central' } as const

// react-native-svg (15.16) accepts `textLength` and `lengthAdjust` in its types
// but never forwards them to the native text view, so they have no effect.
// Squeezing the label horizontally about its centre gives the same condensed
// look, using the estimated width since text cannot be measured up front.
export const fitLabel = (maxWidth: number, estimatedWidth: number, centerX: number) => {
  const scale = maxWidth / estimatedWidth
  return {
    transform: `translate(${centerX} 0) scale(${scale} 1) translate(${-centerX} 0)`,
  }
}

// react-native-svg has no `shapeRendering`.
export const shapeRendering = (_style: DataModulesStyle) => ({})

// Native image loading has no CORS mode.
export const imageCrossOrigin = (_crossOrigin: CrossOrigin) => ({})
