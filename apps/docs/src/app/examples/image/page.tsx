import Link from 'next/link'

import { Demo, codeBlock } from '@/components/demos/image'
import { PageHeading } from '@/components/page-heading'
import { ExampleTabs } from '@/components/ui/example-tabs'
import { TypographyP } from '@/components/ui/typography'

export default function Page() {
  return (
    <>
      <PageHeading heading='Data Modules' />
      <TypographyP>
        The @lglab/react-qr-code library allows you to embed images or logos within your
        QR codes, enhancing branding and visual appeal. This guide details the
        ImageSettings properties you can utilize to customize the embedded image. See{' '}
        <Link className='underline' href='/image-settings'>
          Image Settings
        </Link>{' '}
        api reference for more information.
      </TypographyP>

      <ExampleTabs codeBlock={codeBlock} preview={<Demo />} />
    </>
  )
}
