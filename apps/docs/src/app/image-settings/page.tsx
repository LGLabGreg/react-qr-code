import type { Prop } from '@/types/props'

import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { TypographyP } from '@/components/ui/typography'

const props: Prop[] = [
  {
    name: 'src',
    type: 'string',
    description: 'The URI of the embedded image.',
    required: true,
  },
  {
    name: 'width',
    type: 'number',
    description: 'The width, in pixels, of the image.',
    required: true,
  },
  {
    name: 'height',
    type: 'number',
    description: 'The height, in pixels, of the image.',
    required: true,
  },
  {
    name: 'excavate',
    type: 'boolean',
    description: 'Remove the modules around the embedded image.',
    possibleValues: ['true', 'false'],
    defaultValue: 'false',
  },
  {
    name: 'x',
    type: 'number',
    description:
      'The horizontal offset of the embedded image, starting from the top left corner.',
    defaultValue: 'center',
  },
  {
    name: 'y',
    type: 'number',
    description:
      'The vertical offset of the embedded image, starting from the top left corner.',
    defaultValue: 'center',
  },
  {
    name: 'opacity',
    type: 'number',
    description: 'The opacity of the embedded image in the range',
    defaultValue: '1',
    possibleValues: ['0-1'],
  },
]

export default function Page() {
  return (
    <>
      <PageHeading heading='ImageSettings' />
      <TypographyP>
        These are the properties you can use to customize the image in the QR Code.
      </TypographyP>
      <PropsTable props={props} />
    </>
  )
}
