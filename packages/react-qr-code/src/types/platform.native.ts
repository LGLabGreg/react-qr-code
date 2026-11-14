import type { ImageSourcePropType } from 'react-native'
import type { Svg, SvgProps } from 'react-native-svg'

import type { ToDataURLOptions } from './lib'

export type SvgRootProps = SvgProps

/**
 * A remote URI, or a bundled asset such as `require('./logo.png')`.
 */
export type ImageSource = string | ImageSourcePropType

export interface ReactQRCodeRef {
  svg: Svg | null
  /**
   * Resolves with the QR code as a PNG data URL (`data:image/png;base64,...`).
   * Saving or sharing the image is left to the app.
   */
  toDataURL: (options?: ToDataURLOptions) => Promise<string>
}
