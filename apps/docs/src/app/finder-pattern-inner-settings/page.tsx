import type { Prop } from '@/types/props'

import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { TypographyP } from '@/components/ui/typography'

const props: Prop[] = [
  {
    name: 'color',
    type: 'string',
    description: 'The color of the finder patterns inner part',
    defaultValue: '#000000',
  },
  {
    name: 'style',
    type: 'FinderPatternInnerStyle',
    description: 'The style of the finder patterns inner part',
    defaultValue: 'square',
    possibleValues: [
      'square',
      'pinched-square',
      'rounded-sm',
      'rounded',
      'rounded-lg',
      'circle',
      'inpoint-sm',
      'inpoint',
      'inpoint-lg',
      'outpoint-sm',
      'outpoint',
      'outpoint-lg',
      'leaf-sm',
      'leaf',
      'leaf-lg',
      'diamond',
      'star',
      'heart',
      'hashtag',
    ],
  },
]

export default function Page() {
  return (
    <>
      <PageHeading heading='FinderPatternInnerSettings' />
      <TypographyP>
        These are the properties you can use to customize the inner part of the QR Code
        finder patterns (the big squares).
      </TypographyP>
      <PropsTable props={props} />
    </>
  )
}
