import { forwardRef, useImperativeHandle, useRef } from 'react'

import { Background } from './components/background'
import { DataModules } from './components/data-modules'
import { FinderPatternsInner } from './components/finder-patterns-inner'
import { FinderPatternsOuter } from './components/finder-patterns-outer'
import { FrameBack, FrameLabel } from './components/frame'
import { Gradient } from './components/gradient'
import {
  DEFAULT_BGCOLOR,
  DEFAULT_FILENAME,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_SIZE,
} from './constants'
import { useIds } from './hooks/use-ids'
import { useQRCode } from './hooks/use-qr-code'
import type { DownloadOptions, ReactQRCodeProps, ReactQRCodeRef } from './types/lib'
import { downloadRaster, downloadSVG } from './utils/download'
import { getFrameLayout } from './utils/frame'
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
    frameSettings,
    svgProps,
  } = props

  const svgRef = useRef<SVGSVGElement | null>(null)
  const { gradientId, bgGradientId, frameMaskId } = useIds()
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
          frameLayout,
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

  const qrCode = (
    <>
      <Gradient gradient={gradient} gradientId={gradientId} />
      <Background
        background={background}
        bgGradientId={bgGradientId}
        numCells={numCells}
      />
      <FinderPatternsOuter settings={finderPatternOuterSettings} {...svgElementsProps} />
      <FinderPatternsInner settings={finderPatternInnerSettings} {...svgElementsProps} />
      <DataModules settings={dataModulesSettings} cells={cells} {...svgElementsProps} />
      {image}
    </>
  )

  return (
    <svg
      height={(size * viewBoxHeight) / viewBoxWidth}
      width={size}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      ref={svgRef}
      role='img'
      aria-label={svgProps?.['aria-label'] || 'QR Code'}
      {...svgProps}
    >
      {frameSettings && frameLayout ? (
        <>
          <FrameBack settings={frameSettings} layout={frameLayout} maskId={frameMaskId} />
          <rect
            x={frameLayout.panelX}
            y={frameLayout.panelY}
            width={frameLayout.panelSize}
            height={frameLayout.panelSize}
            // Frames usually have a dark fill, so the code keeps a light quiet zone.
            fill={typeof background === 'string' ? background : DEFAULT_BGCOLOR}
            data-testid='frame-panel'
          />
          <g transform={`translate(${frameLayout.qrX} ${frameLayout.qrY})`}>{qrCode}</g>
          <FrameLabel settings={frameSettings} layout={frameLayout} />
        </>
      ) : (
        qrCode
      )}
    </svg>
  )
})

ReactQRCode.displayName = 'ReactQRCode'

export { ReactQRCode }
