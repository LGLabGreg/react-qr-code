'use client'

import { ReactQRCode, type ReactQRCodeProps } from '@lglab/react-qr-code'
import { type PropsWithChildren, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Colors } from './colors'
import { DataModules } from './data-modules'
import { FinderPatternInner } from './finder-pattern-inner'
import { FinderPatternOuter } from './finder-pattern-outer'
import { ImageSettingsDemo } from './image-settings'
import { MainSettings } from './main-settings'

export const defaultImageSettings = {
  src: 'https://j2f4u60ri0.ufs.sh/f/SP31UeyNJl0QZ6JHB40s0b6HcXRBOL2IGNzKC4E7g5uiQdkm',
  width: 60,
  height: 60,
  excavate: true,
  opacity: 1,
  x: undefined,
  y: undefined,
}

export const defaultBgColor = '#FFFFFF'
export const defaultBgGradient = {
  type: 'linear',
  stops: [
    { offset: '0%', color: '#FFFFFF' },
    { offset: '100%', color: '#FFFFFF' },
  ],
  rotation: 0,
}
export const defaultDataGradient = {
  type: 'linear',
  stops: [
    { offset: '0%', color: '#000000' },
    { offset: '100%', color: '#000000' },
  ],
  rotation: 0,
}

const AccContent = ({ children }: PropsWithChildren) => (
  <AccordionContent className='p-2 pb-5 space-y-5'>{children}</AccordionContent>
)

export const Demo = () => {
  const [qrProps, setQrProps] = useState<ReactQRCodeProps>({
    value: 'https://reactqrcode.com',
    size: 400,
    level: 'M',
    marginSize: 3,
    minVersion: 1,
    boostLevel: true,
    background: '#FFFFFF',
    dataModulesSettings: {
      style: 'square',
      color: '#000000',
      randomSize: false,
    },
    finderPatternOuterSettings: {
      style: 'square',
      color: '#000000',
    },
    finderPatternInnerSettings: {
      style: 'square',
      color: '#000000',
    },
    imageSettings: defaultImageSettings,
  })

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-5'>
      <div className='sm:col-span-3'>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='main-props'>
            <AccordionTrigger>Main props</AccordionTrigger>
            <AccContent>
              <MainSettings qrProps={qrProps} setQrProps={setQrProps} />
            </AccContent>
          </AccordionItem>
          <AccordionItem value='colors'>
            <AccordionTrigger>Colors</AccordionTrigger>
            <AccContent>
              <Colors qrProps={qrProps} setQrProps={setQrProps} />
            </AccContent>
          </AccordionItem>
          <AccordionItem value='data-modules'>
            <AccordionTrigger>Data modules</AccordionTrigger>
            <AccContent>
              <DataModules qrProps={qrProps} setQrProps={setQrProps} />
            </AccContent>
          </AccordionItem>
          <AccordionItem value='finder-pattern-outer'>
            <AccordionTrigger>Finder pattern outer</AccordionTrigger>
            <AccContent>
              <FinderPatternOuter qrProps={qrProps} setQrProps={setQrProps} />
            </AccContent>
          </AccordionItem>
          <AccordionItem value='finder-pattern-inner'>
            <AccordionTrigger>Finder pattern inner</AccordionTrigger>
            <AccContent>
              <FinderPatternInner qrProps={qrProps} setQrProps={setQrProps} />
            </AccContent>
          </AccordionItem>
          <AccordionItem value='image-settings'>
            <AccordionTrigger>Image settings</AccordionTrigger>
            <AccContent>
              <ImageSettingsDemo qrProps={qrProps} setQrProps={setQrProps} />
            </AccContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='flex justify-center [&>svg]:self-start [&>svg]:h-auto sm:col-span-2'>
        <ReactQRCode {...qrProps} />
      </div>
    </div>
  )
}
