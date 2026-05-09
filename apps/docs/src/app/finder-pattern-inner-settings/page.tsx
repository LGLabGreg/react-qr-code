import type { Metadata } from 'next'

import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { TypographyP } from '@/components/ui/typography'
import type { Prop } from '@/types/props'

export const metadata: Metadata = {
  title: 'FinderPatternInnerSettings',
  description:
    'Configuration options for FinderPatternInnerSettings in @lglab/react-qr-code, used to style the inner part of QR code finder patterns.',
}

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
      'circle',
      'diamond',
      'hashtag',
      'heart',
      'inpoint',
      'inpoint-lg',
      'inpoint-sm',
      'leaf',
      'leaf-lg',
      'leaf-sm',
      'microchip',
      'outpoint',
      'outpoint-lg',
      'outpoint-sm',
      'pinched-square',
      'rounded',
      'rounded-lg',
      'rounded-sm',
      'square',
      'star',
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
