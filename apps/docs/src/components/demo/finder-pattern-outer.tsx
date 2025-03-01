import { type FinderPatternOuterStyle, type ReactQRCodeProps } from '@lglab/react-qr-code'
import { type Dispatch } from 'react'

import { FormField } from '@/components/ui/form-fields'

import { Button } from '../ui/button'

interface DataModulesProps {
  qrProps: ReactQRCodeProps
  setQrProps: Dispatch<React.SetStateAction<ReactQRCodeProps>>
}

const styles: FinderPatternOuterStyle[] = [
  'square',
  'pinched-square',
  'rounded-sm',
  'rounded',
  'rounded-lg',
  'circle',
  'inpoint-sm',
  'inpoint',
  'inpoint-lg',
  'outpoint-sm',
  'outpoint',
  'outpoint-lg',
  'leaf-sm',
  'leaf',
  'leaf-lg',
]

export const FinderPatternOuter = ({ qrProps, setQrProps }: DataModulesProps) => {
  const onValueChange = (value: string, key: string) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      gradient: key === 'color' ? undefined : prevProps.gradient,
      finderPatternOuterSettings: {
        ...prevProps.finderPatternOuterSettings,
        [key]: value,
      },
    }))
  }

  return (
    <>
      <FormField label='Style'>
        <div className='flex flex-wrap gap-2'>
          {styles.map((style) => (
            <Button
              key={style}
              size='sm'
              variant={
                qrProps.finderPatternOuterSettings?.style === style
                  ? 'default'
                  : 'outline'
              }
              onClick={() => onValueChange(style, 'style')}
            >
              {style}
            </Button>
          ))}
        </div>
      </FormField>
    </>
  )
}
