import type { Metadata } from 'next'

import { CodeEditor } from '@/components/code-editor'
import { XQrCodeDemo } from '@/components/demo/x-qr-code-demo'
import { PageHeading } from '@/components/page-heading'
import {
  TypographyH2,
  TypographyH3,
  TypographyInlineCode,
  TypographyList,
  TypographyP,
} from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'X (Twitter) QR Code Generator',
  description:
    'Create a free, custom QR code for your X (Twitter) profile with a "Follow" frame, the X logo and your own colors. Download it as PNG or SVG.',
}

const faqs = [
  {
    question: 'Does X still have a built-in profile QR code?',
    answer:
      'Twitter used to show a QR code for your profile in its mobile apps, but the X apps no longer offer it. A generator like this one is now the easiest way to get a scannable code for your profile.',
  },
  {
    question: 'What happens if I change my X handle?',
    answer:
      'The QR code points to x.com/yourhandle, so changing your handle breaks it. Generate and print a new code after renaming your account.',
  },
  {
    question: 'Is it free?',
    answer:
      'Yes. The QR code is generated in your browser, has no watermark and never expires, because it links straight to your profile with no redirect in between.',
  },
  {
    question: 'Which format should I download?',
    answer:
      'Use SVG for print (badges, stickers, posters) since it scales without losing quality, and PNG for slides, websites and social posts.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

const codeBlock = `
import { ReactQRCode } from '@lglab/react-qr-code'

export const XQrCode = ({ handle }: { handle: string }) => (
  <ReactQRCode
    value={\`https://x.com/\${handle}\`}
    level='Q'
    dataModulesSettings={{ style: 'rounded' }}
    finderPatternOuterSettings={{ style: 'rounded-lg' }}
    finderPatternInnerSettings={{ style: 'rounded' }}
    imageSettings={{ src: '/x-logo.svg', width: 64, height: 64, excavate: true }}
    frameSettings={{ style: 'banner-bottom', text: \`Follow @\${handle}\` }}
  />
)
`

export default function Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeading
        heading='X (Twitter) QR Code Generator'
        subheading='Make a QR code that opens your X profile, with a "Follow" frame and your own style.'
      />
      <TypographyP>
        Enter your handle, tweak any setting below, and download your code as PNG or SVG.
        Everything runs in your browser and the code links straight to your profile, so it
        never expires.
      </TypographyP>
      <div className='mt-6'>
        <XQrCodeDemo />
      </div>

      <TypographyH2>Where to use your X QR code</TypographyH2>
      <TypographyList
        items={[
          {
            key: 'badges',
            content:
              'Conference and meetup badges, so people can follow you on the spot.',
          },
          {
            key: 'slides',
            content: 'The last slide of a talk, where everyone has their phone out.',
          },
          { key: 'cards', content: 'Business cards, flyers and posters.' },
          { key: 'merch', content: 'Stickers, t-shirts, laptop lids and packaging.' },
          {
            key: 'stream',
            content: 'Video and livestream overlays, or the end screen of a video.',
          },
        ]}
      />

      <TypographyH2>Build it into your own app</TypographyH2>
      <TypographyP>
        This generator is built with{' '}
        <TypographyInlineCode>@lglab/react-qr-code</TypographyInlineCode>, a free and
        open-source React component. Here is the same X preset in a few lines of code:
      </TypographyP>
      <CodeEditor code={codeBlock} />

      <TypographyH2>FAQ</TypographyH2>
      {faqs.map(({ question, answer }) => (
        <div key={question}>
          <TypographyH3>{question}</TypographyH3>
          <TypographyP>{answer}</TypographyP>
        </div>
      ))}
    </>
  )
}
