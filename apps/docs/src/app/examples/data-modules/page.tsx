import Link from 'next/link'

import { Demo, codeBlock } from '@/components/demos/data-modules'
import { PageHeading } from '@/components/page-heading'
import { ExampleTabs } from '@/components/ui/example-tabs'
import { TypographyP } from '@/components/ui/typography'

export default function Page() {
  return (
    <>
      <PageHeading heading='Data Modules' />
      <TypographyP>
        The data modules in a QR code are the small squares that encode the actual
        information. With @lglab/react-qr-code, you can customize their shape and color,
        as well as render random sizes for certain shapes. See{' '}
        <Link className='underline' href='/data-modules-settings'>
          Data Modules Settings
        </Link>{' '}
        api reference for more information.
      </TypographyP>

      <ExampleTabs codeBlock={codeBlock} preview={<Demo />} />
    </>
  )
}
