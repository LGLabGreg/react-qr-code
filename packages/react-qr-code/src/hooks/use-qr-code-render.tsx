import { DEFAULT_LEVEL, DEFAULT_MINVERSION, DEFAULT_SIZE } from '../constants'
import type { ReactQRCodeProps } from '../types/lib'
import { getFrameLayout } from '../utils/frame'
import { useIds } from './use-ids'
import { useQRCode } from './use-qr-code'

/**
 * Resolves props into everything the root element and `QRCodeContent` need.
 * Platform neutral: shared by the web and React Native entry points.
 */
export const useQRCodeRender = (props: ReactQRCodeProps) => {
  const {
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    minVersion = DEFAULT_MINVERSION,
    boostLevel,
    marginSize,
    imageSettings,
    frameSettings,
  } = props

  const ids = useIds()
  const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
    value,
    level,
    minVersion,
    boostLevel,
    marginSize,
    imageSettings,
    size,
  })

  const frameLayout = frameSettings
    ? getFrameLayout(frameSettings.style, numCells, margin, frameSettings.text !== '')
    : null
  const viewBoxWidth = frameLayout?.width ?? numCells
  const viewBoxHeight = frameLayout?.height ?? numCells

  return {
    size,
    width: size,
    height: (size * viewBoxHeight) / viewBoxWidth,
    viewBox: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
    margin,
    numCells,
    calculatedImageSettings,
    frameLayout,
    contentProps: {
      background: props.background,
      gradient: props.gradient,
      finderPatternOuterSettings: props.finderPatternOuterSettings,
      finderPatternInnerSettings: props.finderPatternInnerSettings,
      dataModulesSettings: props.dataModulesSettings,
      imageSettings,
      frameSettings,
      cells,
      margin,
      numCells,
      calculatedImageSettings,
      frameLayout,
      pixelsPerUnit: size / viewBoxWidth,
      ...ids,
    },
  }
}
