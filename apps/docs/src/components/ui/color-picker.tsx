'use client'

import { Sketch } from '@uiw/react-color'
import { Lock } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ColorPickerProps {
  defaultColor?: string
  disabled?: boolean
  onChange: (value: string) => void
}

export const ColorPicker = ({
  defaultColor = '#000000',
  disabled = false,
  onChange,
}: ColorPickerProps) => {
  const [color, setColor] = React.useState(defaultColor)

  const handleChange = (hex: string) => {
    setColor(hex)
    onChange?.(hex)
  }

  return (
    <div className='flex'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={`w-[36px] h-[36px] p-0 rounded-tr-none rounded-br-none`}
            style={{ backgroundColor: color }}
            disabled={disabled}
          />
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 border-none'>
          <Sketch color={color} onChange={(color) => handleChange(color.hex)} />
        </PopoverContent>
      </Popover>
      <div className='relative flex-1'>
        <Input
          id='hex-color'
          value={color}
          onChange={(e) => handleChange(e.target.value)}
          className='pr-8 rounded-tl-none rounded-bl-none border-l-0 max-w-[150px]'
          disabled={disabled}
        />
        {disabled && (
          <Lock className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
        )}
      </div>
    </div>
  )
}
