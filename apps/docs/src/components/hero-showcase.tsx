'use client'

import { ReactQRCode, type ReactQRCodeProps } from '@lglab/react-qr-code'

const examples: Omit<ReactQRCodeProps, 'value'>[] = [
  {
    dataModulesSettings: { style: 'rounded', color: '#18181b' },
    finderPatternOuterSettings: { style: 'rounded-lg', color: '#18181b' },
    finderPatternInnerSettings: { style: 'rounded', color: '#00a3ab' },
  },
  {
    dataModulesSettings: { style: 'circle', color: '#4f46e5' },
    finderPatternOuterSettings: { style: 'circle', color: '#4f46e5' },
    finderPatternInnerSettings: { style: 'circle', color: '#4f46e5' },
  },
  {
    gradient: {
      type: 'linear',
      rotation: 45,
      stops: [
        { offset: '0%', color: '#00c2cb' },
        { offset: '100%', color: '#2563eb' },
      ],
    },
    dataModulesSettings: { style: 'leaf' },
    finderPatternOuterSettings: { style: 'leaf-lg' },
    finderPatternInnerSettings: { style: 'leaf' },
  },
  {
    dataModulesSettings: { style: 'diamond', color: '#18181b' },
    finderPatternOuterSettings: { style: 'inpoint', color: '#18181b' },
    finderPatternInnerSettings: { style: 'star', color: '#e11d48' },
  },
]

export const HeroShowcase = () => {
  return (
    <div className='mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4'>
      {examples.map((props, i) => (
        <div
          key={i}
          className='flex aspect-square items-center justify-center rounded-xl border bg-white p-3 shadow-xs transition-shadow hover:shadow-md [&>svg]:h-full [&>svg]:w-full'
        >
          <ReactQRCode
            value='https://reactqrcode.com'
            marginSize={0}
            size={160}
            {...props}
          />
        </div>
      ))}
    </div>
  )
}
