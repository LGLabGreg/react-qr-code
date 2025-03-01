import type { Prop } from '@/types/props'

import { APITable } from '@/components/api-table'
import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { TypographyH2, TypographyP } from '@/components/ui/typography'

const props: Prop[] = [
  {
    name: 'svg',
    type: 'SVGSVGElement',
    description: 'The SVG element of the QR code.',
  },
  {
    name: 'download',
    type: '(options: DownloadOptions) => void',
    description: 'Method to download the QR code in different formats.',
  },
]

const downloadOptions: Prop[] = [
  {
    name: 'name',
    type: 'string',
    description: 'The name of the file to download.',
    defaultValue: 'qr-code',
  },
  {
    name: 'format',
    type: 'DownloadFileFormat',
    description: 'The format of the file to download.',
    defaultValue: 'svg',
    possibleValues: ['svg', 'png', 'jpeg'],
  },
  {
    name: 'size',
    type: 'number',
    description: 'The size of the QR Code to download.',
    defaultValue: '500',
  },
]

export default function Page() {
  return (
    <>
      <PageHeading heading='ReactQRCodeRef' />
      <TypographyP>
        The ReactQRCode component supports React refs. Developers can use ref to access
        the underlying svg and trigger actions such as downloading the QR code in
        different formats.
      </TypographyP>

      <TypographyH2>Props</TypographyH2>
      <APITable props={props} />

      <hr />

      <TypographyH2>DownloadOptions</TypographyH2>
      <PropsTable props={downloadOptions} />
    </>
  )
}
