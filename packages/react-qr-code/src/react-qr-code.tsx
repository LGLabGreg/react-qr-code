import { forwardRef, useImperativeHandle, useRef } from 'react'

import { QRCodeContent } from './components/qr-code-content'
import { DEFAULT_FILENAME } from './constants'
import { useQRCodeRender } from './hooks/use-qr-code-render'
import type { DownloadOptions, ReactQRCodeProps, ReactQRCodeRef } from './types/lib'
import { downloadRaster, downloadSVG } from './utils/download'

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

  useImperativeHandle(ref, () => ({
    svg: svgRef.current,
    download: ({
      name: fileName = DEFAULT_FILENAME,
      format: fileFormat = 'svg',
      size: fileSize = 500,
    }: DownloadOptions) => {
      if (!svgRef.current) return

      if (fileFormat === 'svg') {
        void downloadSVG({ svgRef, fileSize, fileName })
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
