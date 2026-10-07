import {
  type FrameSettings,
  type FrameStyle,
  type ReactQRCodeProps,
} from '@lglab/react-qr-code'
import { type Dispatch, useState } from 'react'

import { FormCheckbox, FormField } from '@/components/ui/form-fields'
import { Input } from '@/components/ui/input'

import { Button } from '../ui/button'
import { ColorPicker } from '../ui/color-picker'
import { defaultFrameSettings } from './demo'

interface FrameSettingsDemoProps {
  qrProps: ReactQRCodeProps
  setQrProps: Dispatch<React.SetStateAction<ReactQRCodeProps>>
}

const styles: FrameStyle[] = ['banner-bottom', 'banner-top', 'border', 'bubble', 'ticket']

export const FrameSettingsDemo = ({ qrProps, setQrProps }: FrameSettingsDemoProps) => {
  const [includeFrame, setIncludeFrame] = useState(!!qrProps.frameSettings)
  const [customTextColor, setCustomTextColor] = useState(
    !!qrProps.frameSettings?.textColor,
  )

  const onValueChange = (key: keyof FrameSettings, value: string | undefined) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      frameSettings: {
        ...(prevProps.frameSettings ?? defaultFrameSettings),
        [key]: value,
      } as FrameSettings,
    }))
  }

  const onIncludeFrameChange = (checked: boolean) => {
    setIncludeFrame(checked)
    setQrProps((prevProps) => ({
      ...prevProps,
      frameSettings: checked ? defaultFrameSettings : undefined,
    }))
  }

  const onCustomTextColorChange = (checked: boolean) => {
    setCustomTextColor(checked)
    onValueChange('textColor', checked ? '#FFFFFF' : undefined)
  }

  return (
    <>
      <FormCheckbox
        label='Include frame'
        checked={includeFrame}
        onCheckedChange={(checked) => onIncludeFrameChange(checked as boolean)}
      />
      <FormField label='Style'>
        <div className='flex flex-wrap gap-2'>
          {styles.map((style) => (
            <Button
              key={style}
              size='sm'
              disabled={!includeFrame}
              variant={qrProps.frameSettings?.style === style ? 'default' : 'outline'}
              onClick={() => onValueChange('style', style)}
            >
              {style}
            </Button>
          ))}
        </div>
      </FormField>
      <FormField label='Text'>
        <Input
          disabled={!includeFrame}
          type='text'
          placeholder='Scan me!'
          value={qrProps.frameSettings?.text ?? ''}
          onChange={(e) => onValueChange('text', e.target.value)}
        />
      </FormField>
      <FormField label='Frame color'>
        <ColorPicker
          disabled={!includeFrame}
          defaultColor={qrProps.frameSettings?.color}
          onChange={(value) => onValueChange('color', value)}
        />
      </FormField>
      <FormCheckbox
        disabled={!includeFrame}
        label='Custom text color'
        checked={customTextColor}
        onCheckedChange={(checked) => onCustomTextColorChange(checked as boolean)}
      />
      <FormField label='Text color'>
        <ColorPicker
          disabled={!includeFrame || !customTextColor}
          defaultColor={qrProps.frameSettings?.textColor ?? '#FFFFFF'}
          onChange={(value) => onValueChange('textColor', value)}
        />
      </FormField>
    </>
  )
}
