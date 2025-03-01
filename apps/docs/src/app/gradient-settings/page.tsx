import type { Prop } from '@/types/props'

import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { TypographyH2, TypographyP } from '@/components/ui/typography'

const props: Prop[] = [
  {
    name: 'type',
    type: 'string',
    description: 'The type of gradient',
    required: true,
    possibleValues: ['linear', 'radial'],
  },
  {
    name: 'stops',
    type: 'GradientSettingsStop[]',
    description: 'The gradient stops',
    required: true,
  },
  {
    name: 'rotation',
    type: 'number',
    description: 'The gradient rotation',
    defaultValue: '0',
    possibleValues: ['0 - 360'],
  },
]

const stopProps: Prop[] = [
  {
    name: 'offset',
    type: 'string',
    description:
      'The gradient stop offset. It should be a percentage including the % sign e.g. 0%, 50%, 100%',
    required: true,
  },
  {
    name: 'color',
    type: 'string',
    description: 'The gradient stop color',
    required: true,
  },
]

export default function Page() {
  return (
    <>
      <PageHeading heading='GradientSettings' />
      <TypographyP>
        These are the properties you can use to customize the gradient for the QR code
        data or background
      </TypographyP>
      <PropsTable props={props} />
      <hr />
      <TypographyH2>GradientSettingsStop</TypographyH2>
      <PropsTable props={stopProps} />
    </>
  )
}
