import { CodeEditor } from '@/components/code-editor'
import { PageHeading } from '@/components/page-heading'
import { TypographyP } from '@/components/ui/typography'

const codeBlock = `
import { ReactQRCode } from '@lglab/react-qr-code'

export const Demo = () => {
  return (
    <ReactQRCode value='https://reactqrcode.com' />
  );
}
`
export default function Page() {
  return (
    <>
      <PageHeading heading='Quick Start' />
      <TypographyP>
        Once installed, you can generate a QR code with just a few lines of code:
      </TypographyP>
      <CodeEditor code={codeBlock} />
    </>
  )
}
