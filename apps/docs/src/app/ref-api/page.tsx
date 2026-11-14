import type { Metadata } from 'next'

import { APITable } from '@/components/api-table'
import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { TypographyH2, TypographyP } from '@/components/ui/typography'
import type { Prop } from '@/types/props'

export const metadata: Metadata = {
  title: 'ReactQRCodeRef API',
  description:
    'API reference for ReactQRCodeRef, including access to the SVG element, the download helper and toDataURL for exporting QR codes.',
}

const props: Prop[] = [
  {
    name: 'svg',
    type: 'SVGSVGElement',
    description: 'The SVG element of the QR code.',
  },
  {
    name: 'download',
    type: '(options: DownloadOptions) => void',
    description: 'Method to download the QR code in different formats. Web only.',
  },
  {
    name: 'toDataURL',
    type: '(options?: ToDataURLOptions) => Promise<string>',
    description:
      'Renders the QR code to a PNG and resolves with its data URL (data:image/png;base64,...). Works on the web and in React Native.',
  },
]

const toDataURLOptions: Prop[] = [
  {
    name: 'size',
    type: 'number',
    description:
      'The width of the image in pixels. The height follows the aspect ratio of the QR code or frame.',
    defaultValue: 'the rendered size',
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

      <hr />

      <TypographyH2>ToDataURLOptions</TypographyH2>
      <PropsTable props={toDataURLOptions} />

      <TypographyP>
        In React Native, svg is the react-native-svg Svg instance and the ref has no
        download method. See the React Native page for an example.
      </TypographyP>
    </>
  )
}
