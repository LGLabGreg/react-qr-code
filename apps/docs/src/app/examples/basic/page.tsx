import { Demo, codeBlock } from '@/components/demos/demo-basic'
import { PageHeading } from '@/components/page-heading'
import { ExampleTabs } from '@/components/ui/example-tabs'
import { TypographyP } from '@/components/ui/typography'

export default function Page() {
  return (
    <>
      <PageHeading heading='Basic' />
      <TypographyP>
        The @lglab/react-qr-code library makes it easy to generate customizable QR codes
        in your React applications. Here&apos;s a simple example to get you started.
      </TypographyP>

      <ExampleTabs codeBlock={codeBlock} preview={<Demo />} />
    </>
  )
}
