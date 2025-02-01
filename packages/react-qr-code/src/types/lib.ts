import type { Ref } from 'react'

import type qrcodegen from '../lib/qrcodegen'

/**
 * qrcodegen
 */
export type Modules = ReturnType<qrcodegen.QrCode['getModules']>
export type Excavation = { x: number; y: number; w: number; h: number }
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'
export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined

export type ERROR_LEVEL_MAPPED_TYPE = {
  [index in ErrorCorrectionLevel]: qrcodegen.QrCode.Ecc
}

/**
 * ReactQRCode props.
 */
export type DataModulesStyle =
  | 'square'
  | 'square-sm'
  | 'rounded'
  | 'leaf'
  | 'vertical-line'
  | 'horizontal-line'
  | 'circle'
  | 'diamond'
  | 'star'
  | 'heart'

export interface DataModulesSettings {
  color?: string
  style?: DataModulesStyle
  randomSize?: boolean
}

export type FinderPatternOuterStyle =
  | 'square'
  | 'rounded-sm'
  | 'rounded'
  | 'rounded-lg'
  | 'circle'
  | 'inpoint-sm'
  | 'inpoint'
  | 'inpoint-lg'
  | 'outpoint-sm'
  | 'outpoint'
  | 'outpoint-lg'
  | 'leaf-sm'
  | 'leaf'
  | 'leaf-lg'

export interface FinderPatternOuterSettings {
  color?: string
  style?: FinderPatternOuterStyle
}

export type FinderPatternInnerStyle =
  | 'square'
  | 'rounded-sm'
  | 'rounded'
  | 'rounded-lg'
  | 'circle'
  | 'inpoint-sm'
  | 'inpoint'
  | 'inpoint-lg'
  | 'outpoint-sm'
  | 'outpoint'
  | 'outpoint-lg'
  | 'leaf-sm'
  | 'leaf'
  | 'leaf-lg'
  | 'diamond'
  | 'star'
  | 'heart'

export interface FinderPatternInnerSettings {
  color?: string
  style?: FinderPatternInnerStyle
}

export interface ReactQRCodeProps {
  ref?: Ref<SVGSVGElement>
  /**
   * The value to encode into the QR Code. An array of strings can be passed in
   * to represent multiple segments to further optimize the QR Code.
   */
  value: string | string[]
  /**
   * The size, in pixels, to render the QR Code.
   * @defaultValue 128
   */
  size?: number
  /**
   * The Error Correction Level to use.
   * @see https://www.qrcode.com/en/about/error_correction.html
   * @defaultValue L
   */
  level?: ErrorCorrectionLevel

  /**
   * The number of _modules_ to use for margin. The QR Code specification
   * requires `4`, however you can specify any number. Values will be turned to
   * integers with `Math.floor`.
   * @defaultValue 0
   */
  marginSize?: number
  /**
   * The title to assign to the QR Code. Used for accessibility reasons.
   */
  title?: string
  /**
   * The minimum version used when encoding the QR Code. Valid values are 1-40
   * with higher values resulting in more complex QR Codes. The optimal
   * (lowest) version is determined for the `value` provided, using `minVersion`
   * as the lower bound.
   * @defaultValue 1
   */
  minVersion?: number
  /**
   * If enabled, the Error Correction Level of the result may be higher than
   * the specified Error Correction Level option if it can be done without
   * increasing the version.
   * @defaultValue true
   */
  boostLevel?: boolean
  /**
   * The background color used to render the QR Code.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * @defaultValue #FFFFFF
   */
  bgColor?: string
  /**
   * The settings for the data modules.
   */
  dataModulesSettings?: DataModulesSettings
  /**
   * The settings for the finder pattern outer modules.
   */
  finderPatternOuterSettings?: FinderPatternOuterSettings
  /**
   * The settings for the finder pattern outer modules.
   */
  finderPatternInnerSettings?: FinderPatternInnerSettings
  /**
   * The settings for the embedded image.
   */
  imageSettings?: ImageSettings
  /**
   * Optional props to pass to the SVG element.
   */
  svgProps?: React.SVGProps<SVGSVGElement>
}

/**
 * Image settings for the QR Code.
 */
export interface ImageSettings {
  /**
   * The URI of the embedded image.
   */
  src: string
  /**
   * The height, in pixels, of the image.
   */
  height: number
  /**
   * The width, in pixels, of the image.
   */
  width: number
  /**
   * Whether or not to "excavate" the modules around the embedded image. This
   * means that any modules the embedded image overlaps will use the background
   * color.
   */
  excavate?: boolean
  /**
   * The horiztonal offset of the embedded image, starting from the top left corner.
   * Will center if not specified.
   */
  x?: number
  /**
   * The vertical offset of the embedded image, starting from the top left corner.
   * Will center if not specified.
   */
  y?: number
  /**
   * The opacity of the embedded image in the range of 0-1.
   * @defaultValue 1
   */
  opacity?: number
  /**
   * The cross-origin value to use when loading the image. This is used to
   * ensure compatibility with CORS, particularly when extracting image data
   * from QRCodeCanvas.
   * Note: `undefined` is treated differently than the seemingly equivalent
   * empty string. This is intended to align with HTML behavior where omitting
   * the attribute behaves differently than the empty string.
   */
  crossOrigin?: CrossOrigin
}
