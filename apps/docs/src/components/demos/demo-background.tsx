'use client'

import { ReactQRCode } from '@lglab/react-qr-code'

export const solidCodeBlock = `
import { ReactQRCode } from '@lglab/react-qr-code'

export const Demo = () => {
  return <ReactQRCode background='#f0f0f0' size={256} value='https://reactqrcode.com' />
}
`

export const DemoSolid = () => {
  return <ReactQRCode background='#f0f0f0' size={256} value='https://reactqrcode.com' />
}

export const gradientCodeBlock = `
import { ReactQRCode } from '@lglab/react-qr-code'

export const Demo = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      <ReactQRCode
        background={{
          type: 'linear',
          rotation: 45,
          stops: [
            { offset: '0%', color: '#83a4d4' },
            { offset: '100%', color: '#b6fbff' },
          ],
        }}
        size={256}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        background={{
          type: 'radial',
          stops: [
            { offset: '0%', color: '#ff4e50' },
            { offset: '100%', color: '#f9d423' },
          ],
        }}
        size={256}
        value='https://reactqrcode.com'
      />
    </div>
  )
}
`

export const DemoGradient = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      <ReactQRCode
        background={{
          type: 'linear',
          rotation: 45,
          stops: [
            { offset: '0%', color: '#83a4d4' },
            { offset: '100%', color: '#b6fbff' },
          ],
        }}
        size={256}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        background={{
          type: 'radial',
          stops: [
            { offset: '0%', color: '#ff4e50' },
            { offset: '100%', color: '#f9d423' },
          ],
        }}
        size={256}
        value='https://reactqrcode.com'
      />
    </div>
  )
}
