'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { MenuItemProps } from '@/types/navigation'

import { SidebarMenuButton, useSidebar } from './ui/sidebar'

export const PageSidebarButton = ({ title, url, external }: MenuItemProps) => {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  const isActive = pathname === url
  return (
    <SidebarMenuButton
      asChild
      size='sm'
      isActive={isActive}
      className='h-8 text-[13.5px] text-muted-foreground hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground'
    >
      <Link
        href={url}
        target={external ? '_blank' : undefined}
        onClick={() => isMobile && setOpenMobile(false)}
        data-umami-event={
          external ? `sidebar-click-${title.toLowerCase().replace(' ', '-')}` : null
        }
      >
        <span>{title}</span>
        {external && <ArrowUpRight className='ml-auto opacity-60' />}
      </Link>
    </SidebarMenuButton>
  )
}
