import { type ErrorCorrectionLevel, type ReactQRCodeProps } from '@lglab/react-qr-code'
import { type Dispatch } from 'react'

import { FormCheckbox, FormField } from '@/components/ui/form-fields'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface MainSettingsProps {
  qrProps: ReactQRCodeProps
  setQrProps: Dispatch<React.SetStateAction<ReactQRCodeProps>>
}

const errorCorrectionLevels: ErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H']

export const MainSettings = ({ qrProps, setQrProps }: MainSettingsProps) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      [key]: e.target.value,
    }))
  }
  const onValueChange = (value: string, key: string) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      [key]: value,
    }))
  }
  const onCheckboxChange = (checked: boolean, key: string) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      [key]: checked,
    }))
  }

  return (
    <>
      <FormField label='Value'>
        <Input
          type='text'
          placeholder='QR Code Value'
          value={qrProps.value}
          onChange={(e) => onInputChange(e, 'value')}
        />
      </FormField>

      <FormField label='Error correction level'>
        <Select
          value={qrProps.level}
          onValueChange={(value) => onValueChange(value, 'level')}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Error correction level' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {errorCorrectionLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormField>
      <FormField label='Margin size'>
        <Input
          type='number'
          placeholder='Margin size'
          min={0}
          max={10}
          value={qrProps.marginSize}
          onChange={(e) => onInputChange(e, 'marginSize')}
        />
      </FormField>
      <FormField label='Min version'>
        <Input
          type='number'
          placeholder='Min version'
          min={1}
          max={40}
          value={qrProps.minVersion}
          onChange={(e) => onInputChange(e, 'minVersion')}
        />
      </FormField>
      <FormCheckbox
        label='Boost level'
        checked={qrProps.boostLevel}
        onCheckedChange={(checked) => onCheckboxChange(checked as boolean, 'boostLevel')}
      />
    </>
  )
}
