import { type ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface TypographyProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
}

interface TypographyListItem {
  key: React.Key
  content: string | React.ReactNode
}

interface TypographyListProps extends TypographyProps {
  items: TypographyListItem[]
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn('scroll-m-20 text-3xl font-bold tracking-tight', className)}>
      {children}
    </h1>
  )
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 mb-3',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn('scroll-m-20 text-xl font-semibold tracking-tight mb-3', className)}
    >
      {children}
    </h3>
  )
}

export function TypographyH4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn('scroll-m-20 text-lg font-semibold tracking-tight mb-2', className)}
    >
      {children}
    </h4>
  )
}

export function TypographyP({ children, className }: TypographyProps) {
  return <p className={cn('leading-7 mb-6', className)}>{children}</p>
}

export function TypographyBlockquote({ children, className }: TypographyProps) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  )
}

export function TypographyList({ items, className }: TypographyListProps) {
  return (
    <ul className={cn('mb-6 ml-6 list-disc [&>li]:mt-2', className)}>
      {items.map(({ key, content }) => (
        <li key={key}>{content}</li>
      ))}
    </ul>
  )
}

export function TypographyInlineCode({ children, className }: TypographyProps) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
    >
      {children}
    </code>
  )
}

export function TypographyLead({ children, className }: TypographyProps) {
  return <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
}

export function TypographyLarge({ children, className }: TypographyProps) {
  return <div className={cn('text-lg font-semibold', className)}>{children}</div>
}

export function TypographySmall({ children, className }: TypographyProps) {
  return (
    <small className={cn('text-sm font-medium leading-none', className)}>
      {children}
    </small>
  )
}

export function TypographyBold({ children, className }: TypographyProps) {
  return <span className={cn('font-semibold', className)}>{children}</span>
}

export function Bold(props: TypographyProps) {
  return <TypographyBold {...props} />
}

export function TypographyMuted({ children, className }: TypographyProps) {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
}

interface TypographyTableRow {
  key: React.Key
  items: string[]
}

export function TypographyTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: TypographyTableRow[]
}) {
  return (
    <div className='my-6 w-full overflow-y-auto'>
      <table className='w-full'>
        <thead>
          <tr className='m-0 border-t p-0 even:bg-muted'>
            {headers.map((header) => (
              <th
                key={header}
                className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ key, items }) => (
            <tr className='m-0 border-t p-0 even:bg-muted' key={key}>
              {items.map((item) => (
                <td
                  key={item}
                  className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'
                >
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const LabelValue = ({ label, value }: { label: ReactNode; value: ReactNode }) => {
  return (
    <div>
      <div className='text-xs text-muted-foreground'>{label}</div>
      <div className='font-medium'>{value}</div>
    </div>
  )
}
