import type { Metadata } from 'next'

import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { TypographyP } from '@/components/ui/typography'
import type { Prop } from '@/types/props'

export const metadata: Metadata = {
  title: 'FinderPatternOuterSettings',
  description:
    'Configuration options for FinderPatternOuterSettings in @lglab/react-qr-code, used to style the outer part of QR code finder patterns.',
}

const props: Prop[] = [
  {
    name: 'color',
    type: 'string',
    description: 'The color of the finder patterns outer part',
    defaultValue: '#000000',
  },
  {
    name: 'style',
    type: 'FinderPatternOuterStyle',
    description: 'The style of the finder patterns outer part',
    defaultValue: 'square',
    possibleValues: [
      'circle',
      'inpoint',
      'inpoint-lg',
      'inpoint-sm',
      'leaf',
      'leaf-lg',
      'leaf-sm',
      'outpoint',
      'outpoint-lg',
      'outpoint-sm',
      'pinched-square',
      'rounded',
      'rounded-lg',
      'rounded-sm',
      'square',
    ],
  },
]

export default function Page() {
  return (
    <>
      <PageHeading heading='FinderPatternOuterSettings' />
      <TypographyP>
        These are the properties you can use to customize the outer part of the QR Code
        finder patterns (the big squares).
      </TypographyP>
      <PropsTable props={props} />
    </>
  )
}
