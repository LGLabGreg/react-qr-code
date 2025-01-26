import qrcodegen from './lib/qrcodegen';
import {
  ERROR_LEVEL_MAPPED_TYPE,
  ErrorCorrectionLevel,
  FinderPatternOuterStyle,
} from './types/lib';

export const ERROR_LEVEL_MAP: ERROR_LEVEL_MAPPED_TYPE = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH,
} as const;

export const DEFAULT_SIZE = 128;
export const DEFAULT_LEVEL: ErrorCorrectionLevel = 'M';
export const DEFAULT_BGCOLOR = '#FFFFFF';

export const DEFAULT_MINVERSION = 1;
export const DEFAULT_MARGIN_SIZE = 4;

export const DEFAULT_DATA_MODULES_COLOR = '#000000';
export const DEFAULT_FINDER_PATTERN_OUTER_STYLE: FinderPatternOuterStyle = 'square';

// This is *very* rough estimate of max amount of QRCode allowed to be covered.
// It is "wrong" in a lot of ways (area is a terrible way to estimate, it
// really should be number of modules covered), but if for some reason we don't
// get an explicit height or width, I'd rather default to something than throw.
export const DEFAULT_IMG_SCALE = 0.1;

export const FINDER_PATTERN_SIZE = 7;

export const FINDER_PATTERN_OUTER_MASK = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

export const FINDER_PATTERN_INNER_MASK = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
