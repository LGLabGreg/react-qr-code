import { type ReactNode } from 'react'

import { TypographyH1 } from './ui/typography'

interface PageHeaderProps {
  heading: string
  subheading?: string
  callToAction?: ReactNode
}

export const PageHeading = ({
  heading,
  subheading,
  callToAction: CallToAction,
}: PageHeaderProps) => {
  return (
    <div className='flex items-center justify-between mb-6 border-b pb-3'>
      <div className='space-y-1'>
        <TypographyH1>{heading}</TypographyH1>
        {subheading && <p className='text-muted-foreground'>{subheading}</p>}
      </div>
      {CallToAction && CallToAction}
    </div>
  )
}
