import type { Metadata } from 'next'

import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { TypographyP } from '@/components/ui/typography'
import type { Prop } from '@/types/props'

export const metadata: Metadata = {
  title: 'FrameSettings',
  description:
    'Configuration options for FrameSettings in @lglab/react-qr-code, used to draw a frame with a call-to-action label such as "Scan me!" around QR codes.',
}

const props: Prop[] = [
  {
    name: 'style',
    type: 'FrameStyle',
    description: 'The style of the frame.',
    required: true,
    possibleValues: ['banner-bottom', 'banner-top', 'border', 'bubble', 'ticket'],
  },
  {
    name: 'text',
    type: 'string',
    description:
      'The label rendered in the frame. Long labels are condensed to fit the frame width. Pass an empty string to hide the label, the frame then wraps the QR Code evenly.',
    defaultValue: 'Scan me!',
  },
  {
    name: 'color',
    type: 'string',
    description: 'The frame color.',
    defaultValue: '#000000',
  },
  {
    name: 'textColor',
    type: 'string',
    description:
      'The label color. Defaults to white on filled frames (banner-bottom, banner-top, ticket, bubble) and to the frame color on border.',
  },
  {
    name: 'fontFamily',
    type: 'string',
    description: 'The label font family.',
    defaultValue: 'sans-serif',
  },
]

export default function Page() {
  return (
    <>
      <PageHeading heading='FrameSettings' />
      <TypographyP>
        These are the properties you can use to draw a frame with a call-to-action label
        around the QR Code. When a frame is set, the size prop applies to the frame width
        and the height grows to fit the label. The QR Code gets a white background by
        default so it stays scannable on dark frames; pass a background to override it.
      </TypographyP>
      <PropsTable props={props} />
    </>
  )
}
