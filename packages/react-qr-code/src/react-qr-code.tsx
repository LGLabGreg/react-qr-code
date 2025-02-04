import { useImperativeHandle, useRef } from 'react'

import { DataModules } from './components/data-modules'
import { FinderPatternsInner } from './components/finder-patterns-inner'
import { FinderPatternsOuter } from './components/finder-patterns-outer'
import { Gradient } from './components/gradient'
import {
  DEFAULT_BGCOLOR,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_SIZE,
} from './constants'
import { useQRCode } from './hooks/use-qr-code'
import type { DownloadOptions, ReactQRCodeProps } from './types/lib'
import { downloadRaster, downloadSVG } from './utils/download'
import { excavateModules } from './utils/qr-code'

const ReactQRCode = (props: ReactQRCodeProps) => {
  const {
    ref,
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    bgColor = DEFAULT_BGCOLOR,
    gradient,
    minVersion = DEFAULT_MINVERSION,
    boostLevel,
    marginSize,
    finderPatternOuterSettings,
    finderPatternInnerSettings,
    dataModulesSettings,
    imageSettings,
    svgProps,
  } = props

  const svgRef = useRef<SVGSVGElement | null>(null)

  const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
    value,
    level,
    minVersion,
    boostLevel,
    marginSize,
    imageSettings,
    size,
  })

  useImperativeHandle(ref, () => ({
    svg: svgRef.current,
    download: ({
      name: fileName = 'qr-code',
      format: fileFormat = 'svg',
      size: fileSize = 500,
    }: DownloadOptions) => {
      if (!svgRef.current) return

      if (fileFormat === 'svg') {
        downloadSVG({ svgRef, fileSize, fileName })
      } else {
        downloadRaster({
          svgRef,
          fileSize,
          fileName,
          fileFormat,
          imageSettings,
          calculatedImageSettings,
          size,
          numCells,
          margin,
        })
      }
    },
  }))

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

  const svgElementsProps = {
    modules,
    margin,
    gradient,
  }

  return (
    <svg
      height={size}
      width={size}
      viewBox={`0 0 ${numCells} ${numCells}`}
      ref={svgRef}
      role='img'
      aria-label={svgProps?.['aria-label'] || 'QR Code'}
      {...svgProps}
    >
      <Gradient gradient={gradient} />
      <path fill={bgColor} d={`M0,0 h${numCells}v${numCells}H0z`} />
      <FinderPatternsOuter settings={finderPatternOuterSettings} {...svgElementsProps} />
      <FinderPatternsInner settings={finderPatternInnerSettings} {...svgElementsProps} />
      <DataModules settings={dataModulesSettings} {...svgElementsProps} />
      {image}
    </svg>
  )
}

ReactQRCode.displayName = 'ReactQRCode'

export { ReactQRCode }
