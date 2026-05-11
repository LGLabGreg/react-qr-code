import type { Metadata } from 'next'

import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { Bold, TypographyP } from '@/components/ui/typography'
import type { Prop } from '@/types/props'

export const metadata: Metadata = {
  title: 'DataModulesSettings',
  description:
    'Configuration options for DataModulesSettings in @lglab/react-qr-code, used to control QR code data module color, shape, and random sizing.',
}

const props: Prop[] = [
  {
    name: 'color',
    type: 'string',
    description: 'The color of the modules',
    defaultValue: '#000000',
  },
  {
    name: 'style',
    type: 'DataModulesStyle',
    description: 'The style of the modules',
    defaultValue: 'square',
    possibleValues: [
      'circle',
      'circuit-board',
      'diamond',
      'hashtag',
      'heart',
      'horizontal-line',
      'leaf',
      'pinched-square',
      'rounded',
      'square',
      'square-sm',
      'star',
      'vertical-line',
    ],
  },
  {
    name: 'randomSize',
    type: 'boolean',
    description: (
      <>
        If true, the modules will have random sizes. Can only be used with styles{' '}
        <Bold>square</Bold>, <Bold>pinched-square</Bold>, <Bold>circle</Bold>,{' '}
        <Bold>diamond</Bold>, <Bold>star</Bold>, <Bold>heart</Bold> and{' '}
        <Bold>hashtag</Bold>.
      </>
    ),
    defaultValue: 'false',
    possibleValues: ['true', 'false'],
  },
  {
    name: 'size',
    type: 'number',
    description: (
      <>
        Fixed size multiplier applied to each data module (1 = full size). Keep between{' '}
        <Bold>0.75</Bold> and <Bold>1</Bold> for best results — lower values may degrade
        scannability. Only applies to styles <Bold>square</Bold>,{' '}
        <Bold>pinched-square</Bold>, <Bold>circle</Bold>, <Bold>diamond</Bold>,{' '}
        <Bold>star</Bold>, <Bold>heart</Bold> and <Bold>hashtag</Bold>. Ignored when{' '}
        <Bold>randomSize</Bold> is true.
      </>
    ),
    defaultValue: '1',
  },
]

export default function Page() {
  return (
    <>
      <PageHeading heading='DataModulesSettings' />
      <TypographyP>
        These are the properties you can use to customize the QR Code data modules (the
        small squares that make up the QR Code).
      </TypographyP>
      <PropsTable props={props} />
    </>
  )
}
