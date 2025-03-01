'use client'

import { ReactQRCode } from '@lglab/react-qr-code'

export const codeBlock = `
import { ReactQRCode } from '@lglab/react-qr-code'

export const Demo = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      <ReactQRCode
        dataModulesSettings={{
          style: 'leaf',
          color: '#4267B2',
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        dataModulesSettings={{
          style: 'circle',
          color: '#4267B2',
          randomSize: true,
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        dataModulesSettings={{
          style: 'vertical-line',
          color: '#4267B2',
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
        dataModulesSettings={{
          style: 'leaf',
          color: '#4267B2',
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        dataModulesSettings={{
          style: 'circle',
          color: '#4267B2',
          randomSize: true,
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        dataModulesSettings={{
          style: 'vertical-line',
          color: '#4267B2',
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
    </div>
  )
}
