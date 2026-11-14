import type { Metadata } from 'next'

import { CodeBlock } from '@/components/code-block'
import { CodeEditor } from '@/components/code-editor'
import { PageHeading } from '@/components/page-heading'
import {
  TypographyH2,
  TypographyInlineCode,
  TypographyList,
  TypographyP,
} from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'React Native',
  description:
    'Use @lglab/react-qr-code in React Native and Expo apps. The same component renders through react-native-svg, with toDataURL for PNG export.',
}

const usage = `
import { ReactQRCode } from '@lglab/react-qr-code'

export const Ticket = () => {
  return (
    <ReactQRCode
      value='https://reactqrcode.com'
      size={240}
      dataModulesSettings={{ style: 'rounded' }}
      frameSettings={{ style: 'badge', text: 'Scan me!' }}
    />
  )
}
`

const exportCode = `
import { useRef } from 'react'
import { Button } from 'react-native'
import { ReactQRCode, type ReactQRCodeRef } from '@lglab/react-qr-code'

export const Share = () => {
  const ref = useRef<ReactQRCodeRef>(null)

  const exportPng = async () => {
    // Resolves with "data:image/png;base64,..."
    const png = await ref.current?.toDataURL({ size: 1024 })
    // Show it with <Image source={{ uri: png }} />, or write the base64
    // part to a file with expo-file-system and share it.
  }

  return (
    <>
      <ReactQRCode ref={ref} value='https://reactqrcode.com' />
      <Button title='Export PNG' onPress={exportPng} />
    </>
  )
}
`

const logo = `
<ReactQRCode
  value='https://reactqrcode.com'
  imageSettings={{
    src: require('./assets/logo.png'),
    width: 48,
    height: 48,
    excavate: true,
  }}
/>
`

export default function Page() {
  return (
    <>
      <PageHeading heading='React Native' />
      <TypographyP>
        The same <TypographyInlineCode>ReactQRCode</TypographyInlineCode> component works
        in React Native and Expo apps. It renders through{' '}
        <TypographyInlineCode>react-native-svg</TypographyInlineCode> and supports every
        style, gradient, logo and frame option that the web version does.
      </TypographyP>

      <TypographyH2>Requirements</TypographyH2>
      <TypographyList
        items={[
          {
            key: 'rn',
            content:
              'React Native 0.82 or later (the New Architecture), or Expo SDK 55+.',
          },
          { key: 'svg', content: 'react-native-svg 15 or later.' },
        ]}
      />

      <TypographyH2>Installation</TypographyH2>
      <TypographyP>
        Install the library together with react-native-svg. In an Expo app,{' '}
        <TypographyInlineCode>expo install</TypographyInlineCode> picks the
        react-native-svg version that matches your SDK.
      </TypographyP>
      <CodeBlock
        commands={[
          {
            title: 'expo',
            code: 'npx expo install @lglab/react-qr-code react-native-svg',
          },
          { title: 'npm', code: 'npm i @lglab/react-qr-code react-native-svg' },
          { title: 'pnpm', code: 'pnpm add @lglab/react-qr-code react-native-svg' },
          { title: 'yarn', code: 'yarn add @lglab/react-qr-code react-native-svg' },
        ]}
      />
      <TypographyP>
        In a bare React Native app, run{' '}
        <TypographyInlineCode>npx pod-install</TypographyInlineCode> afterwards so iOS
        links react-native-svg.
      </TypographyP>

      <TypographyH2>Usage</TypographyH2>
      <TypographyP>
        Import the component as you would on the web. Metro picks the React Native build
        from the package&apos;s <TypographyInlineCode>react-native</TypographyInlineCode>{' '}
        export condition, and Expo web keeps using the DOM build.
      </TypographyP>
      <CodeEditor code={usage} />

      <TypographyH2>Exporting a PNG</TypographyH2>
      <TypographyP>
        There is no file download on a phone, so the native ref has no{' '}
        <TypographyInlineCode>download()</TypographyInlineCode>. Use{' '}
        <TypographyInlineCode>toDataURL()</TypographyInlineCode> instead. It resolves with
        a PNG data URL, at the rendered size unless you pass{' '}
        <TypographyInlineCode>size</TypographyInlineCode>. The web ref has the same
        method.
      </TypographyP>
      <CodeEditor code={exportCode} />

      <TypographyH2>Logos</TypographyH2>
      <TypographyP>
        <TypographyInlineCode>imageSettings.src</TypographyInlineCode> takes a URL or a
        bundled image from <TypographyInlineCode>require()</TypographyInlineCode>.
      </TypographyP>
      <CodeEditor code={logo} />

      <TypographyH2>Differences from the web</TypographyH2>
      <TypographyList
        items={[
          {
            key: 'ref',
            content:
              'ref.current.svg is the react-native-svg Svg instance, and the ref has toDataURL() but no download().',
          },
          {
            key: 'props',
            content:
              'svgProps are react-native-svg SvgProps, so use testID, style and accessibility props there.',
          },
          {
            key: 'font',
            content:
              'Frame labels use the system font by default. To use another, load it in your app (for example with expo-font) and pass its name as frameSettings.fontFamily.',
          },
          {
            key: 'label',
            content:
              'Labels too long for the frame are squeezed horizontally to fit, because react-native-svg does not support textLength.',
          },
          {
            key: 'cross',
            content: 'imageSettings.crossOrigin has no effect.',
          },
        ]}
      />
    </>
  )
}
