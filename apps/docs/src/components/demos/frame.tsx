'use client'

import { type FrameStyle, ReactQRCode, type ReactQRCodeProps } from '@lglab/react-qr-code'

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
import { ReactQRCode, type ReactQRCodeProps } from '@lglab/react-qr-code'

const examples: Omit<ReactQRCodeProps, 'value'>[] = [
  {
    frameSettings: { style: 'ticket', text: 'View menu', color: '#4f46e5' },
    dataModulesSettings: { style: 'circle', color: '#4f46e5' },
    finderPatternOuterSettings: { style: 'rounded-lg', color: '#4f46e5' },
    finderPatternInnerSettings: { style: 'circle', color: '#4f46e5' },
  },
  {
    frameSettings: { style: 'bubble', text: 'Follow us', color: '#18181b' },
    dataModulesSettings: { style: 'rounded', color: '#18181b' },
    finderPatternOuterSettings: { style: 'rounded-lg', color: '#18181b' },
    finderPatternInnerSettings: { style: 'rounded', color: '#00a3ab' },
  },
  {
    frameSettings: { style: 'banner-top', text: 'Free Wi-Fi', color: '#0e7490' },
    gradient: {
      type: 'linear',
      rotation: 45,
      stops: [
        { offset: '0%', color: '#0e7490' },
        { offset: '100%', color: '#2563eb' },
      ],
    },
    dataModulesSettings: { style: 'leaf' },
    finderPatternOuterSettings: { style: 'leaf-lg' },
    finderPatternInnerSettings: { style: 'leaf' },
  },
]

export const Demo = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      {examples.map((props, i) => (
        <ReactQRCode
          key={i}
          {...props}
          marginSize={2}
          size={180}
          value='https://reactqrcode.com'
        />
      ))}
    </div>
  )
}
`

const examples: Omit<ReactQRCodeProps, 'value'>[] = [
  {
    frameSettings: { style: 'ticket', text: 'View menu', color: '#4f46e5' },
    dataModulesSettings: { style: 'circle', color: '#4f46e5' },
    finderPatternOuterSettings: { style: 'rounded-lg', color: '#4f46e5' },
    finderPatternInnerSettings: { style: 'circle', color: '#4f46e5' },
  },
  {
    frameSettings: { style: 'bubble', text: 'Follow us', color: '#18181b' },
    dataModulesSettings: { style: 'rounded', color: '#18181b' },
    finderPatternOuterSettings: { style: 'rounded-lg', color: '#18181b' },
    finderPatternInnerSettings: { style: 'rounded', color: '#00a3ab' },
  },
  {
    frameSettings: { style: 'banner-top', text: 'Free Wi-Fi', color: '#0e7490' },
    gradient: {
      type: 'linear',
      rotation: 45,
      stops: [
        { offset: '0%', color: '#0e7490' },
        { offset: '100%', color: '#2563eb' },
      ],
    },
    dataModulesSettings: { style: 'leaf' },
    finderPatternOuterSettings: { style: 'leaf-lg' },
    finderPatternInnerSettings: { style: 'leaf' },
  },
]

export const DemoCustom = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      {examples.map((props, i) => (
        <ReactQRCode
          key={i}
          {...props}
          marginSize={2}
          size={180}
          value='https://reactqrcode.com'
        />
      ))}
    </div>
  )
}
