import { DataModules } from './components/data-modules'
import { FinderPatternsInner } from './components/finder-patterns-inner'
import { FinderPatternsOuter } from './components/finder-patterns-outer'
import {
  DEFAULT_BGCOLOR,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_SIZE,
} from './constants'
import { useQRCode } from './hooks/use-qr-code'
import type { ReactQRCodeProps } from './types/lib'
import { excavateModules } from './utils/qr-code'

const ReactQRCode = (props: ReactQRCodeProps) => {
  const {
    ref,
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    bgColor = DEFAULT_BGCOLOR,
    minVersion = DEFAULT_MINVERSION,
    boostLevel,
    marginSize,
    finderPatternOuterSettings,
    finderPatternInnerSettings,
    dataModulesSettings,
    imageSettings,
    svgProps,
  } = props

  const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
    value,
    level,
    minVersion,
    boostLevel,
    marginSize,
    imageSettings,
    size,
  })

  let modules = cells
  let image = null
  if (imageSettings != null && calculatedImageSettings != null) {
    if (calculatedImageSettings.excavation != null) {
      modules = excavateModules(cells, calculatedImageSettings.excavation)
    }

    image = (
      <image
        href={imageSettings.src}
        height={calculatedImageSettings.h}
        width={calculatedImageSettings.w}
        x={calculatedImageSettings.x + margin}
        y={calculatedImageSettings.y + margin}
        preserveAspectRatio='none'
        opacity={calculatedImageSettings.opacity}
        // Note: specified here always, but undefined will result in no attribute.
        crossOrigin={calculatedImageSettings.crossOrigin}
      />
    )
  }

  return (
    <svg
      height={size}
      width={size}
      viewBox={`0 0 ${numCells} ${numCells}`}
      ref={ref}
      role='img'
      aria-label={svgProps?.['aria-label'] || 'QR Code'}
      {...svgProps}
    >
      <path fill={bgColor} d={`M0,0 h${numCells}v${numCells}H0z`} />
      <FinderPatternsOuter
        modules={modules}
        margin={margin}
        settings={finderPatternOuterSettings}
      />
      <FinderPatternsInner
        modules={modules}
        margin={margin}
        settings={finderPatternInnerSettings}
      />
      <DataModules modules={modules} margin={margin} settings={dataModulesSettings} />
      {image}
    </svg>
  )
}

ReactQRCode.displayName = 'ReactQRCode'

export { ReactQRCode }
