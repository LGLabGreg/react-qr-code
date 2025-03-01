import type { ReactNode } from 'react'

export type PropType =
  | 'string'
  | 'string | string[]'
  | 'number'
  | 'boolean'
  | 'function'
  | 'object'
  | 'array'
  | 'linear | radial'
  | 'React.Ref<SVGSVGElement>'
  | 'React.SVGProps<SVGSVGElement>'
  | 'ErrorCorrectionLevel'
  | 'DataModulesSettings'
  | 'FinderPatternOuterSettings'
  | 'FinderPatternInnerSettings'
  | 'DataModulesStyle'
  | 'FinderPatternOuterStyle'
  | 'FinderPatternInnerStyle'
  | 'string | GradientSettings'
  | 'GradientSettings'
  | 'GradientSettingsStop'
  | 'GradientSettingsStop[]'
  | '(options: DownloadOptions) => void'
  | 'DownloadFileFormat'
  | 'React.RefObject<ReactQRCodeRef>'
  | 'SVGSVGElement'
  | 'ImageSettings'

export interface Prop {
  name: string
  type: PropType
  description: string | ReactNode
  defaultValue?: string
  required?: boolean
  possibleValues?: string[]
}
