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
    <div className='flex flex-wrap items-end justify-between gap-4 mb-8 border-b pb-6'>
      <div className='space-y-2'>
        <TypographyH1>{heading}</TypographyH1>
        {subheading && <p className='text-lg text-muted-foreground'>{subheading}</p>}
      </div>
      {CallToAction && CallToAction}
    </div>
  )
}
