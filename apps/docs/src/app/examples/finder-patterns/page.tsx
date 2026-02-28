import type { Metadata } from 'next'
import Link from 'next/link'

import { Demo, codeBlock } from '@/components/demos/finder-patterns'
import { PageHeading } from '@/components/page-heading'
import { ExampleTabs } from '@/components/ui/example-tabs'
import { TypographyP } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Finder Patterns Example',
  description:
    'Example showing how to customize QR code finder patterns in @lglab/react-qr-code, including inner and outer styles.',
}

export default function Page() {
  return (
    <>
      <PageHeading heading='Finder patterns example' />
      <TypographyP>
        The finder patterns are the three prominent squares located at the corners of a QR
        code, essential for orientation during scanning. With @lglab/react-qr-code, you
        can customize both the outer and inner parts of these patterns to align with your
        design preferences. See{' '}
        <Link className='underline' href='/finder-pattern-inner-settings'>
          Finder Pattern Inner Settings
        </Link>{' '}
        and{' '}
        <Link className='underline' href='/finder-pattern-outer-settings'>
          Finder Pattern Outer Settings
        </Link>{' '}
        api reference for more information.
      </TypographyP>

      <ExampleTabs codeBlock={codeBlock} preview={<Demo />} />
    </>
  )
}
