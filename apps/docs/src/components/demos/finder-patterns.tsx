'use client'

import { ReactQRCode } from '@lglab/react-qr-code'

export const codeBlock = `
import { ReactQRCode } from '@lglab/react-qr-code'

export const Demo = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      <ReactQRCode
        finderPatternInnerSettings={{
          style: 'leaf-lg',
          color: '#4267B2',
        }}
        finderPatternOuterSettings={{
          style: 'leaf-lg',
          color: '#4267B2',
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        finderPatternInnerSettings={{
          style: 'pinched-square',
          color: '#4267B2',
        }}
        finderPatternOuterSettings={{
          style: 'pinched-square',
          color: '#4267B2',
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        finderPatternInnerSettings={{
          style: 'heart',
          color: '#4267B2',
        }}
        finderPatternOuterSettings={{
          style: 'rounded',
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
        finderPatternInnerSettings={{
          style: 'leaf-lg',
          color: '#4267B2',
        }}
        finderPatternOuterSettings={{
          style: 'leaf-lg',
          color: '#4267B2',
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        finderPatternInnerSettings={{
          style: 'pinched-square',
          color: '#4267B2',
        }}
        finderPatternOuterSettings={{
          style: 'pinched-square',
          color: '#4267B2',
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        finderPatternInnerSettings={{
          style: 'heart',
          color: '#4267B2',
        }}
        finderPatternOuterSettings={{
          style: 'rounded',
          color: '#4267B2',
        }}
        marginSize={2}
        size={256}
        value='https://reactqrcode.com'
      />
    </div>
  )
}
