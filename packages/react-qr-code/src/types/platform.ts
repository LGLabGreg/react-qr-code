import type { DownloadOptions, ToDataURLOptions } from './lib'

/**
 * Types that differ between the web build and the React Native build. The
 * React Native build resolves `platform.native.ts` instead.
 */
export type SvgRootProps = React.SVGProps<SVGSVGElement>

export type ImageSource = string

export interface ReactQRCodeRef {
  svg: SVGSVGElement | null
  /**
   * Downloads the QR code as an SVG, PNG or JPEG file.
   */
  download: (options: DownloadOptions) => void
  /**
   * Resolves with the QR code as a PNG data URL (`data:image/png;base64,...`).
   * Works the same in the React Native build.
   */
  toDataURL: (options?: ToDataURLOptions) => Promise<string>
}
