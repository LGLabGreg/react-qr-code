'use client'

import { ReactQRCode } from '@lglab/react-qr-code'

export const codeBlock = `
import { ReactQRCode } from '@lglab/react-qr-code'

export const Demo = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      <ReactQRCode
        imageSettings={{
          src: 'https://reactqrcode.com/images/logo-60.png',
          width: 60,
          height: 60,
          excavate: true,
          opacity: 1,
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
    </div>
  )
}
`

export const Demo = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      <ReactQRCode
        imageSettings={{
          src: 'https://reactqrcode.com/images/logo-60.png',
          width: 60,
          height: 60,
          excavate: true,
          opacity: 1,
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
    </div>
  )
}
