import type { Metadata } from 'next'
import Link from 'next/link'

import {
  DemoCustom,
  DemoStyles,
  customCodeBlock,
  stylesCodeBlock,
} from '@/components/demos/frame'
import { PageHeading } from '@/components/page-heading'
import { ExampleTabs } from '@/components/ui/example-tabs'
import { TypographyH3, TypographyP } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Frame Example',
  description:
    'Example showing how to add a frame with a "Scan me!" call-to-action label around QR codes using the FrameSettings options in @lglab/react-qr-code.',
}

export default function Page() {
  return (
    <>
      <PageHeading heading='Frame example' />
      <TypographyP>
        The @lglab/react-qr-code library can draw a frame with a call-to-action label
        around your QR codes, making them easier to spot on print and screens. Frames are
        part of the SVG, so they are included when you download the QR code. See{' '}
        <Link className='underline' href='/frame-settings'>
          Frame Settings
        </Link>{' '}
        api reference for more information.
      </TypographyP>

      <TypographyH3>Styles</TypographyH3>
      <ExampleTabs codeBlock={stylesCodeBlock} preview={<DemoStyles />} />

      <hr className='border-0' />

      <TypographyH3>Custom label and colors</TypographyH3>
      <ExampleTabs codeBlock={customCodeBlock} preview={<DemoCustom />} />
    </>
  )
}
