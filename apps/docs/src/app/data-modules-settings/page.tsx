import type { Prop } from '@/types/props'

import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { Bold, TypographyP } from '@/components/ui/typography'

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
      'square',
      'square-sm',
      'pinched-square',
      'rounded',
      'leaf',
      'vertical-line',
      'horizontal-line',
      'circle',
      'diamond',
      'star',
      'heart',
      'hashtag',
    ],
  },
  {
    name: 'randomSize',
    type: 'boolean',
    description: (
      <>
        If true, the modules will have random sizes. Can only be used with styles{' '}
        <Bold>square</Bold>, <Bold>circle</Bold>, <Bold>diamond</Bold>, <Bold>star</Bold>,{' '}
        <Bold>heart</Bold> and <Bold>hashtag</Bold>.
      </>
    ),
    defaultValue: 'false',
    possibleValues: ['true', 'false'],
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
