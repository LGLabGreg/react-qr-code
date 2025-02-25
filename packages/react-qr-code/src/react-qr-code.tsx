import { forwardRef, useImperativeHandle, useRef } from 'react'

import { Background } from './components/background'
import { DataModules } from './components/data-modules'
import { FinderPatternsInner } from './components/finder-patterns-inner'
import { FinderPatternsOuter } from './components/finder-patterns-outer'
import { Gradient } from './components/gradient'
import {
  DEFAULT_FILENAME,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_SIZE,
} from './constants'
import { useIds } from './hooks/use-ids'
import { useQRCode } from './hooks/use-qr-code'
import type { DownloadOptions, ReactQRCodeProps, ReactQRCodeRef } from './types/lib'
import { downloadRaster, downloadSVG } from './utils/download'
import { excavateModules } from './utils/qr-code'

const ReactQRCode = forwardRef<ReactQRCodeRef, ReactQRCodeProps>((props, ref) => {
  const {
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    background,
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
  const { gradientId, bgGradientId } = useIds()
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
      name: fileName = DEFAULT_FILENAME,
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
    gradientId,
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
      <Gradient gradient={gradient} gradientId={gradientId} />
      <Background
        background={background}
        bgGradientId={bgGradientId}
        numCells={numCells}
      />
      <FinderPatternsOuter settings={finderPatternOuterSettings} {...svgElementsProps} />
      <FinderPatternsInner settings={finderPatternInnerSettings} {...svgElementsProps} />
      <DataModules settings={dataModulesSettings} {...svgElementsProps} />
      {image}
    </svg>
  )
})

ReactQRCode.displayName = 'ReactQRCode'

export { ReactQRCode }
