import type { ImageSourcePropType } from 'react-native'
import type { Svg, SvgProps } from 'react-native-svg'

export type SvgRootProps = SvgProps

/**
 * A remote URI, or a bundled asset such as `require('./logo.png')`.
 */
export type ImageSource = string | ImageSourcePropType

export interface ToDataURLOptions {
  /**
   * The width of the exported image in pixels. The height follows the aspect
   * ratio of the rendered code. Defaults to the rendered size.
   */
  size?: number
}

export interface ReactQRCodeRef {
  svg: Svg | null
  /**
   * Resolves with the QR code as a base64 encoded PNG (no `data:` prefix).
   * Saving or sharing the image is left to the app.
   */
  toDataURL: (options?: ToDataURLOptions) => Promise<string>
}
