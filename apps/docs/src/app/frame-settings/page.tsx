import type { Metadata } from 'next'

import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import {
  TypographyH2,
  TypographyInlineCode,
  TypographyP,
} from '@/components/ui/typography'
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
    description:
      'The label font family, as a CSS font-family value. See the font family section below for how it behaves in downloads.',
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
        and the height grows to fit the label. The QR Code sits on a light panel (the
        background color, white by default) with a quiet zone of at least 2 modules, so it
        stays scannable on dark frames.
      </TypographyP>
      <PropsTable props={props} />

      <TypographyH2>Font family</TypographyH2>
      <TypographyP>
        The fontFamily value is set as the font-family of the SVG label, so it accepts any
        CSS font-family list such as{' '}
        <TypographyInlineCode>&apos;Georgia, serif&apos;</TypographyInlineCode>. The label
        is always bold. Which font is actually used depends on where the QR Code is
        displayed:
      </TypographyP>
      <TypographyP>
        On the page, the label can use system fonts and any web font your page has already
        loaded, for example through Google Fonts, next/font or @font-face, as long as the
        name matches.
      </TypographyP>
      <TypographyP>
        Downloads only keep the font name, not the font file. An SVG download shows the
        font if it is installed where the file is opened. PNG and JPEG downloads are
        rendered as an isolated image that cannot see your page&apos;s web fonts, so they
        use the font only if it is installed on the user&apos;s device.
      </TypographyP>
      <TypographyP>
        In every case a missing font falls back to the next font in the list, so always
        end it with a generic family such as sans-serif or serif. For labels that must
        look the same everywhere, prefer widely installed fonts like Arial, Helvetica,
        Georgia or Verdana.
      </TypographyP>
    </>
  )
}
