import { forwardRef, useImperativeHandle, useRef } from 'react'

import { QRCodeContent } from './components/qr-code-content'
import { DEFAULT_FILENAME } from './constants'
import { useQRCodeRender } from './hooks/use-qr-code-render'
import type {
  DownloadOptions,
  ReactQRCodeProps,
  ReactQRCodeRef,
  ToDataURLOptions,
} from './types/lib'
import { downloadRaster, downloadSVG, renderRaster } from './utils/download'

const ReactQRCode = forwardRef<ReactQRCodeRef, ReactQRCodeProps>((props, ref) => {
  const { imageSettings, svgProps } = props

  const svgRef = useRef<SVGSVGElement | null>(null)
  const {
    size,
    width,
    height,
    viewBox,
    margin,
    numCells,
    calculatedImageSettings,
    frameLayout,
    contentProps,
  } = useQRCodeRender(props)

  const rasterProps = {
    svgRef,
    imageSettings,
    calculatedImageSettings,
    size,
    numCells,
    margin,
    frameLayout,
  }

  useImperativeHandle(ref, () => ({
    svg: svgRef.current,
    toDataURL: ({ size: fileSize = size }: ToDataURLOptions = {}) =>
      renderRaster({ ...rasterProps, fileSize, fileFormat: 'png' }),
    download: ({
      name: fileName = DEFAULT_FILENAME,
      format: fileFormat = 'svg',
      size: fileSize = 500,
    }: DownloadOptions) => {
      if (!svgRef.current) return

      if (fileFormat === 'svg') {
        void downloadSVG({ svgRef, fileSize, fileName })
      } else {
        downloadRaster({ ...rasterProps, fileSize, fileName, fileFormat })
      }
    },
  }))

  return (
    <svg
      height={height}
      width={width}
      viewBox={viewBox}
      ref={svgRef}
      role='img'
      aria-label={svgProps?.['aria-label'] || 'QR Code'}
      {...svgProps}
    >
      <QRCodeContent {...contentProps} />
    </svg>
  )
})

ReactQRCode.displayName = 'ReactQRCode'

export { ReactQRCode }
