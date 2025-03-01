import { ColorPicker } from './color-picker'
import { Slider } from './slider'

interface GradientColorPickerProps {
  color: string
  offset: number
  onColorChange: (value: string) => void
  onOffsetChange: (value: number) => void
}

export const GradientColorPicker = ({
  color,
  offset,
  onColorChange,
  onOffsetChange,
}: GradientColorPickerProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <ColorPicker defaultColor={color} onChange={onColorChange} />
      <Slider
        value={[offset]}
        onValueChange={(value) => onOffsetChange(value[0])}
        max={100}
        step={1}
      />
    </div>
  )
}
