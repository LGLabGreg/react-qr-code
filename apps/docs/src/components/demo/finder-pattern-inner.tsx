import { type FinderPatternInnerStyle, type ReactQRCodeProps } from '@lglab/react-qr-code'
import { type Dispatch } from 'react'

import { FormField } from '@/components/ui/form-fields'

import { Button } from '../ui/button'

interface FinderPatternInnerProps {
  qrProps: ReactQRCodeProps
  setQrProps: Dispatch<React.SetStateAction<ReactQRCodeProps>>
}

const styles: FinderPatternInnerStyle[] = [
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
  'diamond',
  'star',
  'heart',
  'hashtag',
]

export const FinderPatternInner = ({ qrProps, setQrProps }: FinderPatternInnerProps) => {
  const onValueChange = (value: string, key: string) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      gradient: key === 'color' ? undefined : prevProps.gradient,
      finderPatternInnerSettings: {
        ...prevProps.finderPatternInnerSettings,
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
                qrProps.finderPatternInnerSettings?.style === style
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
