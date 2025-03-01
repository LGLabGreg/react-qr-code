import type * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { type PropsWithChildren } from 'react'

import { Checkbox } from './checkbox'
import { Label } from './label'

interface FormFieldProps extends PropsWithChildren {
  label: string
}

interface FormCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label: string
}

export const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <div className='flex flex-col space-y-2'>
      <Label>{label}</Label>
      {children}
    </div>
  )
}

export const FormCheckbox = ({
  label,
  checked,
  onCheckedChange,
  ...checkboxProps
}: FormCheckboxProps) => {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={onCheckedChange}
        {...checkboxProps}
      />
      <label
        htmlFor={label}
        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {label}
      </label>
    </div>
  )
}
