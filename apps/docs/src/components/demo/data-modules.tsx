import { type DataModulesStyle, type ReactQRCodeProps } from '@lglab/react-qr-code'
import { type Dispatch } from 'react'

import { FormCheckbox, FormField } from '@/components/ui/form-fields'

import { Button } from '../ui/button'

interface DataModulesProps {
  qrProps: ReactQRCodeProps
  setQrProps: Dispatch<React.SetStateAction<ReactQRCodeProps>>
}

const styles: DataModulesStyle[] = [
  'square',
  'square-sm',
  'pinched-square',
  'rounded',
  'leaf',
  'vertical-line',
  'horizontal-line',
  'circle',
  'diamond',
  'star',
  'heart',
  'hashtag',
]

export const DataModules = ({ qrProps, setQrProps }: DataModulesProps) => {
  const onValueChange = (value: string, key: string) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      gradient: key === 'color' ? undefined : prevProps.gradient,
      dataModulesSettings: {
        ...prevProps.dataModulesSettings,
        [key]: value,
      },
    }))
  }
  const onCheckboxChange = (checked: boolean, key: string) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      dataModulesSettings: {
        ...prevProps.dataModulesSettings,
        [key]: checked,
      },
    }))
  }

  const canBeRandomSize = [
    'square',
    'pinched-square',
    'circle',
    'diamond',
    'heart',
    'star',
    'hashtag',
  ].includes(qrProps.dataModulesSettings?.style ?? '')

  return (
    <>
      <FormField label='Style'>
        <div className='flex flex-wrap gap-2'>
          {styles.map((style) => (
            <Button
              key={style}
              size='sm'
              variant={
                qrProps.dataModulesSettings?.style === style ? 'default' : 'outline'
              }
              onClick={() => onValueChange(style, 'style')}
            >
              {style}
            </Button>
          ))}
        </div>
      </FormField>
      {canBeRandomSize && (
        <FormCheckbox
          label='Random size'
          checked={qrProps.dataModulesSettings?.randomSize}
          onCheckedChange={(checked) =>
            onCheckboxChange(checked as boolean, 'randomSize')
          }
        />
      )}
    </>
  )
}
