import type { DownloadOptions } from './lib'

/**
 * Types that differ between the web build and the React Native build. The
 * React Native build resolves `platform.native.ts` instead.
 */
export type SvgRootProps = React.SVGProps<SVGSVGElement>

export type ImageSource = string

export interface ReactQRCodeRef {
  svg: SVGSVGElement | null
  download: (options: DownloadOptions) => void
}
