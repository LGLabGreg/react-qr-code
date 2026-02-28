import type { Metadata } from 'next'

import { Demo, codeBlock } from '@/components/demos/demo-basic'
import { PageHeading } from '@/components/page-heading'
import { ExampleTabs } from '@/components/ui/example-tabs'
import { TypographyP } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Basic Example',
  description:
    'See a basic example of using the @lglab/react-qr-code library to render a customizable QR code in a React application.',
}

export default function Page() {
  return (
    <>
      <PageHeading heading='Basic example' />
      <TypographyP>
        The @lglab/react-qr-code library makes it easy to generate customizable QR codes
        in your React applications. Here&apos;s a simple example to get you started.
      </TypographyP>

      <ExampleTabs codeBlock={codeBlock} preview={<Demo />} />
    </>
  )
}
