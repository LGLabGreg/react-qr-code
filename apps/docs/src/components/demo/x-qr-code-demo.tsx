'use client'

import { type FrameSettings, type ReactQRCodeProps } from '@lglab/react-qr-code'
import { type Dispatch, type SetStateAction, useState } from 'react'

import { FormField } from '@/components/ui/form-fields'
import { Input } from '@/components/ui/input'

import { Demo } from './demo'

const xProfileUrl = (handle: string) =>
  handle ? `https://x.com/${handle}` : 'https://x.com'

const xFollowText = (handle: string) => (handle ? `Follow @${handle}` : 'Follow me on X')

// Accepts "handle", "@handle" or a pasted profile URL
const normalizeHandle = (input: string) =>
  input
    .trim()
    .replace(/^@/, '')
    .replace(/^(https?:\/\/)?(www\.)?(x|twitter)\.com\//i, '')
    .replace(/[/?#].*$/, '')
    .replace(/[^A-Za-z0-9_]/g, '')
    .slice(0, 15)

interface XHandleProps {
  setQrProps: Dispatch<SetStateAction<ReactQRCodeProps>>
}

const XHandle = ({ setQrProps }: XHandleProps) => {
  const [handle, setHandle] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = normalizeHandle(e.target.value)
    setHandle(next)
    setQrProps((prevProps) => ({
      ...prevProps,
      value: xProfileUrl(next),
      frameSettings: prevProps.frameSettings && {
        ...prevProps.frameSettings,
        text: xFollowText(next),
      },
    }))
  }

  return (
    <div className='mb-4 rounded-lg border p-4'>
      <FormField label='Your X handle'>
        <Input
          type='text'
          placeholder='@yourhandle'
          value={handle ? `@${handle}` : ''}
          onChange={onChange}
          aria-label='Your X handle'
        />
      </FormField>
    </div>
  )
}

const xFrameSettings: FrameSettings = {
  style: 'banner-bottom',
  text: xFollowText(''),
  color: '#000000',
}

const xQrProps: ReactQRCodeProps = {
  value: xProfileUrl(''),
  size: 400,
  level: 'Q',
  marginSize: 3,
  minVersion: 1,
  boostLevel: true,
  background: '#FFFFFF',
  dataModulesSettings: {
    style: 'rounded',
    color: '#000000',
    randomSize: false,
  },
  finderPatternOuterSettings: {
    style: 'rounded-lg',
    color: '#000000',
  },
  finderPatternInnerSettings: {
    style: 'rounded',
    color: '#000000',
  },
  imageSettings: {
    src: '/images/x-logo.svg',
    width: 64,
    height: 64,
    excavate: true,
    opacity: 1,
  },
  frameSettings: xFrameSettings,
}

export const XQrCodeDemo = () => (
  <Demo
    initialProps={xQrProps}
    downloadName='x-qr-code'
    header={(setQrProps) => <XHandle setQrProps={setQrProps} />}
  />
)
