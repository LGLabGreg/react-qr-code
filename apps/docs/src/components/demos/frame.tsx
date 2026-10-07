'use client'

import { type FrameStyle, ReactQRCode } from '@lglab/react-qr-code'

const styles: FrameStyle[] = ['banner-bottom', 'banner-top', 'ticket', 'bubble', 'border']

export const stylesCodeBlock = `
import { type FrameStyle, ReactQRCode } from '@lglab/react-qr-code'

const styles: FrameStyle[] = ['banner-bottom', 'banner-top', 'ticket', 'bubble', 'border']

export const Demo = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      {styles.map((style) => (
        <ReactQRCode
          key={style}
          frameSettings={{ style }}
          marginSize={2}
          size={160}
          value='https://reactqrcode.com'
        />
      ))}
    </div>
  )
}
`

export const DemoStyles = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      {styles.map((style) => (
        <ReactQRCode
          key={style}
          frameSettings={{ style }}
          marginSize={2}
          size={160}
          value='https://reactqrcode.com'
        />
      ))}
    </div>
  )
}

export const customCodeBlock = `
import { ReactQRCode } from '@lglab/react-qr-code'

export const Demo = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      <ReactQRCode
        frameSettings={{
          style: 'ticket',
          text: 'View menu',
          color: '#0b4d3c',
          textColor: '#f5e6b8',
        }}
        dataModulesSettings={{ style: 'rounded', color: '#0b4d3c' }}
        finderPatternOuterSettings={{ style: 'rounded', color: '#0b4d3c' }}
        finderPatternInnerSettings={{ style: 'rounded', color: '#0b4d3c' }}
        marginSize={2}
        size={200}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        frameSettings={{
          style: 'bubble',
          text: 'Follow us',
          color: '#c40000',
          fontFamily: 'Georgia, serif',
        }}
        dataModulesSettings={{ color: '#c40000' }}
        marginSize={2}
        size={200}
        value='https://reactqrcode.com'
      />
    </div>
  )
}
`

export const DemoCustom = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      <ReactQRCode
        frameSettings={{
          style: 'ticket',
          text: 'View menu',
          color: '#0b4d3c',
          textColor: '#f5e6b8',
        }}
        dataModulesSettings={{ style: 'rounded', color: '#0b4d3c' }}
        finderPatternOuterSettings={{ style: 'rounded', color: '#0b4d3c' }}
        finderPatternInnerSettings={{ style: 'rounded', color: '#0b4d3c' }}
        marginSize={2}
        size={200}
        value='https://reactqrcode.com'
      />
      <ReactQRCode
        frameSettings={{
          style: 'bubble',
          text: 'Follow us',
          color: '#c40000',
          fontFamily: 'Georgia, serif',
        }}
        dataModulesSettings={{ color: '#c40000' }}
        marginSize={2}
        size={200}
        value='https://reactqrcode.com'
      />
    </div>
  )
}
