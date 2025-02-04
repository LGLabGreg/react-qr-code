import qrcodegen from './lib/qrcodegen'
import type {
  DataModulesStyle,
  ERROR_LEVEL_MAPPED_TYPE,
  ErrorCorrectionLevel,
  FinderPatternInnerStyle,
  FinderPatternOuterStyle,
} from './types/lib'

/**
 * Error correction level map.
 */
export const ERROR_LEVEL_MAP: ERROR_LEVEL_MAPPED_TYPE = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH,
} as const

/**
 * Default values.
 */
export const DEFAULT_SIZE = 128
export const DEFAULT_LEVEL: ErrorCorrectionLevel = 'M'
export const DEFAULT_BGCOLOR = '#FFFFFF'

export const DEFAULT_MINVERSION = 1
export const DEFAULT_MARGIN_SIZE = 4
export const DEFAULT_NUM_STAR_POINTS = 5

export const DEFAULT_DATA_MODULES_COLOR = '#000000'
export const DEFAULT_FINDER_PATTERN_OUTER_STYLE: FinderPatternOuterStyle = 'square'
export const DEFAULT_FINDER_PATTERN_INNER_STYLE: FinderPatternInnerStyle = 'square'
export const DEFAULT_DATA_MODULES_STYLE: DataModulesStyle = 'square'

export const GRADIENT_ID = 'react-qr-code-gradient'

// This is *very* rough estimate of max amount of QRCode allowed to be covered.
// It is "wrong" in a lot of ways (area is a terrible way to estimate, it
// really should be number of modules covered), but if for some reason we don't
// get an explicit height or width, I'd rather default to something than throw.
export const DEFAULT_IMG_SCALE = 0.1

/**
 * Finder pattern.
 */

export const FINDER_PATTERN_SIZE = 7
export const FINDER_PATTERN_INNER_SIZE = 3

export const FINDER_PATTERN_OUTER_MASK = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
]

export const FINDER_PATTERN_OUTER_ROTATIONS = {
  'inpoint-sm': [0, 90, -90],
  inpoint: [0, 90, -90],
  'inpoint-lg': [0, 90, -90],
  'outpoint-sm': [180, -90, 90],
  outpoint: [180, -90, 90],
  'outpoint-lg': [180, -90, 90],
  'leaf-sm': [0, 90, -90],
  leaf: [0, 90, -90],
  'leaf-lg': [0, 90, -90],
}

export const FINDER_PATTERN_OUTER_RADIUSES = {
  'rounded-sm': 3,
  rounded: 4,
  'rounded-lg': 5,
  'leaf-sm': 3,
  leaf: 4,
  'leaf-lg': 5,
  'inpoint-sm': 3,
  inpoint: 4,
  'inpoint-lg': 5,
  'outpoint-sm': 3,
  outpoint: 4,
  'outpoint-lg': 5,
}

export const FINDER_PATTERN_INNER_RADIUSES = {
  square: 0,
  diamond: 0,
  circle: 3,
  'rounded-sm': 0.5,
  rounded: 0.9,
  'rounded-lg': 1.1,
  'leaf-sm': 1.5,
  leaf: 2,
  'leaf-lg': 2.3,
  'inpoint-sm': 1.5,
  inpoint: 2,
  'inpoint-lg': 2.3,
  'outpoint-sm': 1.5,
  outpoint: 2,
  'outpoint-lg': 2.3,
}

export const FINDER_PATTERN_INNER_MASK = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
]
