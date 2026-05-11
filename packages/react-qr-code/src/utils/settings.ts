import {
  CIRCUIT_BOARD_LINE_WIDTH,
  DEFAULT_DATA_MODULES_COLOR,
  DEFAULT_DATA_MODULES_STYLE,
  DEFAULT_FINDER_PATTERN_INNER_STYLE,
  DEFAULT_FINDER_PATTERN_OUTER_STYLE,
} from '../constants'
import type {
  DataModulesSettings,
  FinderPatternInnerSettings,
  FinderPatternOuterSettings,
} from '../types/lib'

export const sanitizeDataModulesSettings = (settings?: DataModulesSettings) => {
  const style = settings?.style || DEFAULT_DATA_MODULES_STYLE
  const defaultLineWidth = style === 'circuit-board' ? CIRCUIT_BOARD_LINE_WIDTH : 1
  return {
    color: settings?.color || DEFAULT_DATA_MODULES_COLOR,
    style,
    randomSize: settings?.randomSize || false,
    size: settings?.size ?? 1,
    lineWidth: settings?.lineWidth ?? defaultLineWidth,
  }
}

export const sanitizeFinderPatternOuterSettings = (
  settings?: FinderPatternOuterSettings,
) => {
  return {
    color: settings?.color || DEFAULT_DATA_MODULES_COLOR,
    style: settings?.style || DEFAULT_FINDER_PATTERN_OUTER_STYLE,
  }
}

export const sanitizeFinderPatternInnerSettings = (
  settings?: FinderPatternInnerSettings,
) => {
  return {
    color: settings?.color || DEFAULT_DATA_MODULES_COLOR,
    style: settings?.style || DEFAULT_FINDER_PATTERN_INNER_STYLE,
  }
}
