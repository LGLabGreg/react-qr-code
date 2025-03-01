import { DemoDownload, codeBlock } from '@/components/demos/demo-download'
import { PageHeading } from '@/components/page-heading'
import { ExampleTabs } from '@/components/ui/example-tabs'
import { TypographyP } from '@/components/ui/typography'

export default function Page() {
  return (
    <>
      <PageHeading heading='Download QR Code' />
      <TypographyP>
        The Download API in @lglab/react-qr-code allows you to easily export QR codes as
        image files in various formats, including PNG, JPEG and SVG. This is useful for
        saving QR codes locally, embedding them in documents, or generating assets for
        printing.
      </TypographyP>

      <ExampleTabs codeBlock={codeBlock} preview={<DemoDownload />} />
    </>
  )
}
