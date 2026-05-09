import { type FinderPatternOuterStyle, type ReactQRCodeProps } from '@lglab/react-qr-code'
import { type Dispatch } from 'react'

import { FormField } from '@/components/ui/form-fields'

import { Button } from '../ui/button'

interface DataModulesProps {
  qrProps: ReactQRCodeProps
  setQrProps: Dispatch<React.SetStateAction<ReactQRCodeProps>>
}

const styles: FinderPatternOuterStyle[] = [
  'circle',
  'inpoint',
  'inpoint-lg',
  'inpoint-sm',
  'leaf',
  'leaf-lg',
  'leaf-sm',
  'outpoint',
  'outpoint-lg',
  'outpoint-sm',
  'pinched-square',
  'rounded',
  'rounded-lg',
  'rounded-sm',
  'square',
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
