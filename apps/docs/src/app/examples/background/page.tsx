import {
  DemoGradient,
  DemoSolid,
  gradientCodeBlock,
  solidCodeBlock,
} from '@/components/demos/demo-background'
import { PageHeading } from '@/components/page-heading'
import { ExampleTabs } from '@/components/ui/example-tabs'
import { TypographyH3, TypographyP } from '@/components/ui/typography'

export default function Page() {
  return (
    <>
      <PageHeading heading='Background' />
      <TypographyP>
        The @lglab/react-qr-code library allows you to customize the background of your QR
        codes to match your brand or design preferences. Below are different ways to set
        backgrounds using solid colors, gradients, and transparency. For a transparent
        background, don&apos;t pass any background prop.
      </TypographyP>

      <TypographyH3>Solid Color</TypographyH3>
      <ExampleTabs codeBlock={solidCodeBlock} preview={<DemoSolid />} />

      <hr className='border-0' />

      <TypographyH3>Gradient</TypographyH3>
      <ExampleTabs codeBlock={gradientCodeBlock} preview={<DemoGradient />} />
    </>
  )
}
