'use client'

import { ReactQRCode, type ReactQRCodeRef } from '@lglab/react-qr-code'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'

export const codeBlock = `
import { ReactQRCode, type ReactQRCodeRef } from '@lglab/react-qr-code'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'

export const Demo = () => {
  const ref = useRef<ReactQRCodeRef>(null)

  const handleDownload = () => {
    ref.current?.download({
      name: 'download-demo',
      format: 'png',
      size: 1000,
    })
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <ReactQRCode
        background='#FFFFFF'
        marginSize={2}
        ref={ref}
        size={256}
        value='https://reactqrcode.com'
      />
      <Button onClick={handleDownload}>Download PNG</Button>
    </div>
  )
}
`

export const DemoDownload = () => {
  const ref = useRef<ReactQRCodeRef>(null)

  const handleDownload = () => {
    ref.current?.download({
      name: 'download-demo',
      format: 'png',
      size: 1000,
    })
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <ReactQRCode
        background='#FFFFFF'
        marginSize={2}
        ref={ref}
        size={256}
        value='https://reactqrcode.com'
      />
      <Button onClick={handleDownload}>Download PNG</Button>
    </div>
  )
}
