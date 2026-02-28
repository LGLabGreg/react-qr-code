import type { Metadata } from 'next'

import { CodeBlock } from '@/components/code-block'
import { PageHeading } from '@/components/page-heading'
import { TypographyBold, TypographyP } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Installation',
  description:
    'Install the @lglab/react-qr-code library using your preferred JavaScript package manager, including pnpm, npm, yarn, or bun.',
}

export default function Page() {
  return (
    <>
      <PageHeading heading='Installation' />
      <TypographyP>
        Setting up <TypographyBold>@lglab/react-qr-code</TypographyBold> is quick and
        easy. Install it using your favourite package manager:
      </TypographyP>
      <CodeBlock code='pnpm add @lglab/react-qr-code' title='pnpm' />
      <CodeBlock code='npm i @lglab/react-qr-code' title='npm' />
      <CodeBlock code='yarn add @lglab/react-qr-code' title='yarn' />
      <CodeBlock code='bun add @lglab/react-qr-code' title='bun' />
    </>
  )
}
