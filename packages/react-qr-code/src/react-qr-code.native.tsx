import { forwardRef, useImperativeHandle, useRef } from 'react'
import { PixelRatio, Platform } from 'react-native'
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
    toDataURL: ({ size: fileSize = width } = {}) =>
      new Promise<string>((resolve, reject) => {
        const svg = svgRef.current
        if (!svg) {
          reject(new Error('The QR code is not mounted'))
          return
        }
        if (!(fileSize >= 1)) {
          reject(new Error('The size must be at least 1 pixel'))
          return
        }
        const fileWidth = Math.round(fileSize)
        const fileHeight = Math.round((fileSize * height) / width)
        // Android sizes the snapshot in pixels, iOS in points that it then
        // multiplies by the screen scale. Both give fileWidth pixels this way.
        const unit = Platform.OS === 'ios' ? PixelRatio.get() : 1
        svg.toDataURL(
          (base64?: string) => {
            // iOS calls back with no value when the snapshot fails.
            if (typeof base64 !== 'string' || base64 === '') {
              reject(new Error('Failed to render the QR code'))
              return
            }
            // react-native-svg returns bare base64 (with line breaks on iOS);
            // match the web build's data URL.
            resolve(`data:image/png;base64,${base64.replace(/\s/g, '')}`)
          },
          { width: fileWidth / unit, height: fileHeight / unit },
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
