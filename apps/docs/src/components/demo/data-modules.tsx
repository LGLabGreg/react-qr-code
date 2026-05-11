import { type DataModulesStyle, type ReactQRCodeProps } from '@lglab/react-qr-code'
import { type Dispatch } from 'react'

import { FormCheckbox, FormField } from '@/components/ui/form-fields'
import { Slider } from '@/components/ui/slider'

import { Button } from '../ui/button'

interface DataModulesProps {
  qrProps: ReactQRCodeProps
  setQrProps: Dispatch<React.SetStateAction<ReactQRCodeProps>>
}

const styles: DataModulesStyle[] = [
  'circle',
  'circuit-board',
  'diamond',
  'hashtag',
  'heart',
  'horizontal-line',
  'leaf',
  'pinched-square',
  'rounded',
  'square',
  'square-sm',
  'star',
  'vertical-line',
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

  const size = qrProps.dataModulesSettings?.size ?? 1
  const randomSize = qrProps.dataModulesSettings?.randomSize ?? false

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
        <>
          <FormCheckbox
            label='Random size'
            checked={randomSize}
            onCheckedChange={(checked) =>
              onCheckboxChange(checked as boolean, 'randomSize')
            }
          />
          <FormField label={`Size (${size.toFixed(2)})`}>
            <Slider
              value={[size]}
              onValueChange={([value]) =>
                setQrProps((prevProps) => ({
                  ...prevProps,
                  dataModulesSettings: {
                    ...prevProps.dataModulesSettings,
                    size: value,
                  },
                }))
              }
              min={0.75}
              max={1}
              step={0.01}
              disabled={randomSize}
              className={randomSize ? 'opacity-50' : undefined}
            />
          </FormField>
        </>
      )}
    </>
  )
}
