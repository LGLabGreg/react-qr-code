import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Svg } from 'react-native-svg'

import { QRCodeContent } from './components/qr-code-content'
import { useQRCodeRender } from './hooks/use-qr-code-render'
import type { ReactQRCodeProps, ReactQRCodeRef } from './types/lib'

const ReactQRCode = forwardRef<ReactQRCodeRef, ReactQRCodeProps>((props, ref) => {
  const { svgProps } = props

  const svgRef = useRef<Svg | null>(null)
  const { width, height, viewBox, contentProps } = useQRCodeRender(props)

  useImperativeHandle(ref, () => ({
    svg: svgRef.current,
    toDataURL: ({ size: fileSize } = {}) =>
      new Promise<string>((resolve, reject) => {
        const svg = svgRef.current
        if (!svg) {
          reject(new Error('The QR code is not mounted'))
          return
        }
        svg.toDataURL(
          resolve,
          fileSize ? { width: fileSize, height: (fileSize * height) / width } : undefined,
        )
      }),
  }))

  return (
    <Svg
      height={height}
      width={width}
      viewBox={viewBox}
      ref={svgRef}
      accessible
      accessibilityRole='image'
      accessibilityLabel='QR Code'
      {...svgProps}
    >
      <QRCodeContent {...contentProps} />
    </Svg>
  )
})

ReactQRCode.displayName = 'ReactQRCode'

export { ReactQRCode }
