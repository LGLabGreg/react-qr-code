import { type ImageSettings, type ReactQRCodeProps } from '@lglab/react-qr-code'
import { type Dispatch, useState } from 'react'

import { FormCheckbox, FormField } from '@/components/ui/form-fields'
import { Input } from '@/components/ui/input'

import { defaultImageSettings } from './demo'

interface ImageSettingsDemoProps {
  qrProps: ReactQRCodeProps
  setQrProps: Dispatch<React.SetStateAction<ReactQRCodeProps>>
}

export const ImageSettingsDemo = ({ qrProps, setQrProps }: ImageSettingsDemoProps) => {
  const [centerImage, setCenterImage] = useState(true)
  const [includeImage, setIncludeImage] = useState(true)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.name === 'x-pos' || e.target.name === 'y-pos') {
      setCenterImage(false)
    }
    setQrProps((prevProps) => ({
      ...prevProps,
      imageSettings: {
        ...prevProps.imageSettings,
        [key]: e.target.value,
      } as ImageSettings,
    }))
  }
  const onCheckboxChange = (checked: boolean, key: string) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      imageSettings: {
        ...prevProps.imageSettings,
        [key]: checked,
      } as ImageSettings,
    }))
  }
  const onCenterChange = (checked: boolean) => {
    setCenterImage(checked)
    if (checked) {
      setQrProps((prevProps) => ({
        ...prevProps,
        imageSettings: {
          ...prevProps.imageSettings,
          x: undefined,
          y: undefined,
        } as ImageSettings,
      }))
    }
  }
  const onIncludeImageChange = (checked: boolean) => {
    setIncludeImage(checked)
    const update = checked ? defaultImageSettings : undefined
    setQrProps((prevProps) => ({
      ...prevProps,
      imageSettings: update as ImageSettings,
    }))
  }
  return (
    <>
      <FormCheckbox
        label='Include image'
        checked={includeImage}
        onCheckedChange={onIncludeImageChange}
      />
      <FormField label='Image'>
        <Input
          disabled={!includeImage}
          type='text'
          placeholder='Image'
          value={qrProps.imageSettings?.src || ''}
          onChange={(e) => onInputChange(e, 'src')}
        />
      </FormField>
      <FormCheckbox
        disabled={!includeImage}
        label='Excavate'
        checked={qrProps.imageSettings?.excavate}
        onCheckedChange={(checked) => onCheckboxChange(checked as boolean, 'excavate')}
      />
      <FormField label='Width'>
        <Input
          disabled={!includeImage}
          type='number'
          placeholder='Width'
          min={0}
          value={qrProps.imageSettings?.width || ''}
          onChange={(e) => onInputChange(e, 'width')}
        />
      </FormField>
      <FormField label='Height'>
        <Input
          disabled={!includeImage}
          type='number'
          placeholder='Height'
          min={0}
          value={qrProps.imageSettings?.height || ''}
          onChange={(e) => onInputChange(e, 'height')}
        />
      </FormField>
      <FormCheckbox
        disabled={!includeImage}
        label='Center image'
        checked={centerImage}
        onCheckedChange={onCenterChange}
      />

      <FormField label='Image x position'>
        <Input
          disabled={!includeImage || centerImage}
          type='number'
          name='x-pos'
          placeholder='x'
          min={0}
          value={qrProps.imageSettings?.x || ''}
          onChange={(e) => onInputChange(e, 'x')}
        />
      </FormField>
      <FormField label='Image y position'>
        <Input
          disabled={!includeImage || centerImage}
          type='number'
          name='y-pos'
          placeholder='y'
          min={0}
          value={qrProps.imageSettings?.y || ''}
          onChange={(e) => onInputChange(e, 'y')}
        />
      </FormField>
    </>
  )
}
