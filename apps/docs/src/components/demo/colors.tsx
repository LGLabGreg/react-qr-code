import {
  type DataModulesSettings,
  type GradientSettings,
  type ReactQRCodeProps,
} from '@lglab/react-qr-code'
import { type Dispatch, useState } from 'react'

import { FormField } from '@/components/ui/form-fields'
import { Input } from '@/components/ui/input'

import { ColorPicker } from '../ui/color-picker'
import { GradientColorPicker } from '../ui/gradient-color-picker'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Switch } from '../ui/switch'
import { defaultBgColor, defaultBgGradient, defaultDataGradient } from './demo'

interface MainSettingsProps {
  qrProps: ReactQRCodeProps
  setQrProps: Dispatch<React.SetStateAction<ReactQRCodeProps>>
}

export const Colors = ({ qrProps, setQrProps }: MainSettingsProps) => {
  const [isGradientBg, setIsGradientBg] = useState(typeof qrProps.background !== 'string')
  const [isGradientData, setIsGradientData] = useState(!!qrProps.gradient)

  const onValueChange = (value: string | undefined, key: string) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      [key]: value,
    }))
  }

  const onIsGradientBgChange = (checked: boolean) => {
    setIsGradientBg(checked)
    setQrProps((prevProps) => ({
      ...prevProps,
      background: checked
        ? (defaultBgGradient as GradientSettings)
        : (defaultBgColor as string),
    }))
  }

  const onBgStopChange = (stopNumber: number, key: string, value: string) => {
    setQrProps((prevProps) => {
      const prevBgGradientSettings = prevProps.background as GradientSettings
      return {
        ...prevProps,
        background: {
          ...prevBgGradientSettings,
          stops: prevBgGradientSettings.stops?.map((stop, i) => {
            if (i === stopNumber) {
              return { ...stop, [key]: value }
            }
            return stop
          }),
        },
      }
    })
  }

  const onBgGradientSettingsChange = (key: string, value: string) => {
    setQrProps((prevProps) => {
      const prevBgGradientSettings = prevProps.background as GradientSettings
      return {
        ...prevProps,
        background: {
          ...prevBgGradientSettings,
          [key]: value,
        },
      }
    })
  }

  const onIsGradientDataChange = (checked: boolean) => {
    setIsGradientData(checked)
    setQrProps((prevProps) => ({
      ...prevProps,
      gradient: checked ? (defaultDataGradient as GradientSettings) : undefined,
    }))
  }

  const onDataStopChange = (stopNumber: number, key: string, value: string) => {
    setQrProps((prevProps) => {
      const prevDataGradientSettings = prevProps.gradient as GradientSettings
      return {
        ...prevProps,
        gradient: {
          ...prevDataGradientSettings,
          stops: prevDataGradientSettings.stops?.map((stop, i) => {
            if (i === stopNumber) {
              return { ...stop, [key]: value }
            }
            return stop
          }),
        },
      }
    })
  }

  const onDataGradientSettingsChange = (key: string, value: string) => {
    setQrProps((prevProps) => {
      const prevDataGradientSettings = prevProps.gradient as GradientSettings
      return {
        ...prevProps,
        gradient: {
          ...prevDataGradientSettings,
          [key]: value,
        },
      }
    })
  }

  const onColorChange = (
    value: string,
    key: keyof ReactQRCodeProps,
    nestedKey: keyof DataModulesSettings,
  ) => {
    setQrProps((prevProps) => ({
      ...prevProps,
      gradient: undefined,
      [key]: {
        ...(typeof prevProps[key] === 'object' ? prevProps[key] : {}),
        [nestedKey]: value,
      },
    }))
  }

  const bgGradientSettings = qrProps.background as GradientSettings
  const dataGradientSettings = qrProps.gradient as GradientSettings

  return (
    <>
      <div>
        <div className='flex items-center gap-3 mb-5'>
          <Label>Background</Label>
          <div className='flex items-center gap-2'>
            <Switch
              id='isGradientBg'
              checked={isGradientBg}
              onCheckedChange={onIsGradientBgChange}
            />
            <Label htmlFor='isGradientBg'>Gradient</Label>
          </div>
          <div className='flex items-center gap-2'>
            <Switch
              id='transparent'
              checked={!bgGradientSettings}
              onCheckedChange={(checked) => {
                const value = checked ? undefined : '#FFFFFF'
                onValueChange(value, 'background')
              }}
            />
            <Label htmlFor='transparent'>Transparent</Label>
          </div>
        </div>

        {bgGradientSettings &&
          (isGradientBg ? (
            <div className='flex flex-col space-y-5'>
              <div className='flex items-center gap-3'>
                <GradientColorPicker
                  color={bgGradientSettings.stops?.[0].color}
                  offset={Number(bgGradientSettings.stops?.[0].offset.split('%')[0])}
                  onColorChange={(value) => onBgStopChange(0, 'color', value)}
                  onOffsetChange={(value) => onBgStopChange(0, 'offset', `${value}%`)}
                />
                <GradientColorPicker
                  color={bgGradientSettings.stops?.[1].color}
                  offset={Number(bgGradientSettings.stops?.[1].offset.split('%')[0])}
                  onColorChange={(value) => onBgStopChange(1, 'color', value)}
                  onOffsetChange={(value) => onBgStopChange(1, 'offset', `${value}%`)}
                />
              </div>
              <FormField label='Gradient rotation'>
                <Input
                  type='number'
                  placeholder='Rotation'
                  min={0}
                  max={360}
                  value={bgGradientSettings.rotation || 0}
                  onChange={(e) => onBgGradientSettingsChange('rotation', e.target.value)}
                />
              </FormField>
            </div>
          ) : (
            <ColorPicker
              defaultColor={qrProps.background as string}
              onChange={(value) => onValueChange(value, 'background')}
            />
          ))}
      </div>
      <Separator />
      <div>
        <div className='flex items-center gap-3 mb-5'>
          <Label>QR Code data</Label>
          <div className='flex items-center gap-2'>
            <Switch
              id='isGradientData'
              checked={isGradientData}
              onCheckedChange={onIsGradientDataChange}
            />
            <Label htmlFor='isGradientData'>Gradient</Label>
          </div>
        </div>

        {isGradientData ? (
          <div className='flex flex-col space-y-5'>
            <div className='flex items-center gap-3'>
              <GradientColorPicker
                color={dataGradientSettings.stops?.[0].color}
                offset={Number(dataGradientSettings.stops?.[0].offset.split('%')[0])}
                onColorChange={(value) => onDataStopChange(0, 'color', value)}
                onOffsetChange={(value) => onDataStopChange(0, 'offset', `${value}%`)}
              />
              <GradientColorPicker
                color={dataGradientSettings.stops?.[1].color}
                offset={Number(dataGradientSettings.stops?.[1].offset.split('%')[0])}
                onColorChange={(value) => onDataStopChange(1, 'color', value)}
                onOffsetChange={(value) => onDataStopChange(1, 'offset', `${value}%`)}
              />
            </div>
            <FormField label='Gradient rotation'>
              <Input
                type='number'
                placeholder='Rotation'
                min={0}
                max={360}
                value={dataGradientSettings.rotation}
                onChange={(e) => onDataGradientSettingsChange('rotation', e.target.value)}
              />
            </FormField>
          </div>
        ) : (
          <div className='flex flex-col space-y-5'>
            <FormField label='Data modules'>
              <ColorPicker
                defaultColor={qrProps.dataModulesSettings?.color}
                onChange={(value) => onColorChange(value, 'dataModulesSettings', 'color')}
              />
            </FormField>
            <FormField label='Finder patterns outer'>
              <ColorPicker
                defaultColor={qrProps.finderPatternOuterSettings?.color}
                onChange={(value) =>
                  onColorChange(value, 'finderPatternOuterSettings', 'color')
                }
              />
            </FormField>
            <FormField label='Finder patterns inner'>
              <ColorPicker
                defaultColor={qrProps.finderPatternInnerSettings?.color}
                onChange={(value) =>
                  onColorChange(value, 'finderPatternInnerSettings', 'color')
                }
              />
            </FormField>
          </div>
        )}
      </div>
    </>
  )
}
