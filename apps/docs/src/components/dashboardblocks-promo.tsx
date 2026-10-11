import { ArrowUpRightIcon } from 'lucide-react'

import { DashboardBlocksIcon } from '@/components/icons/dashboardblocks'
import { cn } from '@/lib/utils'

export const DASHBOARDBLOCKS_URL =
  'https://www.dashboardblocks.com/?utm_source=reactqrcode.com'

/**
 * Decorative "dashboard" illustration: a tiny wireframe with stat tiles and
 * a bar chart that grows on hover. Purely visual, hidden from assistive tech.
 */
function DashboardIllustration() {
  const block =
    'rounded-[3px] bg-foreground/[0.09] transition-all duration-500 ease-out group-hover/promo:bg-foreground/[0.16]'
  const bar =
    'w-full origin-bottom rounded-[2px] bg-foreground/[0.12] transition-transform duration-500 ease-out group-hover/promo:bg-foreground/[0.2]'

  return (
    <div
      aria-hidden='true'
      className='pointer-events-none absolute top-2 -right-4 w-24 rotate-[-8deg] [mask-image:linear-gradient(200deg,black_35%,transparent_75%)] transition-transform duration-500 ease-out group-hover/promo:-translate-x-1 group-hover/promo:rotate-[-5deg]'
    >
      <div className='grid grid-cols-[1fr_4fr] gap-1'>
        <div className={cn(block, 'row-span-2')} />
        <div className='grid grid-cols-3 gap-1'>
          <div className={cn(block, 'h-3')} />
          <div className={cn(block, 'h-3')} />
          <div className={cn(block, 'h-3')} />
        </div>
        <div className={cn(block, 'flex h-9 items-end gap-0.5 p-1')}>
          <div className={cn(bar, 'h-2 delay-75 group-hover/promo:scale-y-150')} />
          <div className={cn(bar, 'h-4 delay-100 group-hover/promo:scale-y-125')} />
          <div className={cn(bar, 'h-3 delay-150 group-hover/promo:scale-y-150')} />
          <div className={cn(bar, 'h-5 delay-200 group-hover/promo:scale-y-110')} />
          <div className={cn(bar, 'h-4 delay-300 group-hover/promo:scale-y-125')} />
        </div>
      </div>
    </div>
  )
}

export function DashboardBlocksPromo({ className }: { className?: string }) {
  return (
    <a
      href={DASHBOARDBLOCKS_URL}
      target='_blank'
      rel='noopener'
      aria-label='Dashboardblocks: dashboard blocks and templates built with shadcn/ui'
      data-umami-event='Dashboardblocks promo'
      data-umami-event-placement='sidebar'
      className={cn(
        'group/promo relative isolate flex flex-col gap-3 overflow-hidden rounded-xl bg-card p-3 text-card-foreground ring-1 ring-foreground/10 transition-all duration-300 ease-out outline-none',
        'hover:shadow-md hover:shadow-foreground/5 hover:ring-foreground/20 focus-visible:ring-2 focus-visible:ring-ring',
        // subtle dot grid so the card reads as a "canvas"
        'bg-[radial-gradient(hsl(var(--foreground)/0.07)_1px,transparent_1px)] bg-[size:14px_14px]',
        className,
      )}
    >
      <DashboardIllustration />

      <div className='relative flex items-start'>
        <div className='flex size-9 items-center justify-center rounded-lg bg-foreground text-background shadow-sm transition-transform duration-300 ease-out group-hover/promo:scale-105 group-hover/promo:-rotate-3'>
          <DashboardBlocksIcon className='size-5' />
        </div>
      </div>

      <div className='relative flex flex-col gap-1'>
        <p className='text-sm leading-tight font-semibold'>
          Build dashboards faster with Dashboardblocks
        </p>
        <p className='text-xs leading-relaxed text-muted-foreground'>
          Ready-made dashboard blocks &amp; templates built with shadcn/ui.
        </p>
      </div>

      <div className='relative flex items-center'>
        <span className='flex items-center gap-1 text-xs font-medium'>
          <span className='underline-offset-4 group-hover/promo:underline'>
            Explore Dashboardblocks
          </span>
          <ArrowUpRightIcon className='size-3.5 transition-transform duration-300 ease-out group-hover/promo:translate-x-0.5 group-hover/promo:-translate-y-0.5' />
        </span>
      </div>
    </a>
  )
}
