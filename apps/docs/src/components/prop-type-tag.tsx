import type { PropType } from '@/types/props'

import { Badge } from './ui/badge'

export const PropTypeTag = ({ type }: { type: PropType }) => {
  const colorMap: Record<PropType, string> = {
    string: 'bg-blue-100 text-blue-800',
    'string | string[]': 'bg-blue-100 text-blue-800',
    'linear | radial': 'bg-blue-100 text-blue-800',
    'React.Ref<SVGSVGElement>': 'bg-sky-100 text-sky-800',
    'React.SVGProps<SVGSVGElement>': 'bg-sky-100 text-sky-800',
    SVGSVGElement: 'bg-sky-100 text-sky-800',
    number: 'bg-green-100 text-green-800',
    boolean: 'bg-yellow-100 text-yellow-800',
    function: 'bg-purple-100 text-purple-800',
    object: 'bg-red-100 text-red-800',
    array: 'bg-indigo-100 text-indigo-800',
    ErrorCorrectionLevel: 'bg-purple-100 text-purple-800',
    DataModulesSettings: 'bg-purple-100 text-purple-800',
    FinderPatternOuterSettings: 'bg-purple-100 text-purple-800',
    FinderPatternInnerSettings: 'bg-purple-100 text-purple-800',
    DataModulesStyle: 'bg-purple-100 text-purple-800',
    FinderPatternOuterStyle: 'bg-purple-100 text-purple-800',
    FinderPatternInnerStyle: 'bg-purple-100 text-purple-800',
    'string | GradientSettings': 'bg-purple-100 text-purple-800',
    GradientSettings: 'bg-purple-100 text-purple-800',
    GradientSettingsStop: 'bg-purple-100 text-purple-800',
    'GradientSettingsStop[]': 'bg-purple-100 text-purple-800',
    DownloadFileFormat: 'bg-purple-100 text-purple-800',
    '(options: DownloadOptions) => void': 'bg-purple-100 text-purple-800',
    'React.RefObject<ReactQRCodeRef>': 'bg-purple-100 text-purple-800',
    ImageSettings: 'bg-purple-100 text-purple-800',
  }

  return (
    <Badge variant='secondary' className={`font-mono text-xs ${colorMap[type]}`}>
      {type}
    </Badge>
  )
}
