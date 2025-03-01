'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { MenuItemProps } from '@/types/navigation'

import { SidebarMenuSubButton } from './ui/sidebar'

export const PageSidebarButton = ({ title, url, external }: MenuItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === url
  return (
    <SidebarMenuSubButton
      asChild
      isActive={isActive}
      className={isActive ? 'font-semibold' : ''}
    >
      <Link
        href={url}
        target={external ? '_blank' : undefined}
        data-umami-event={
          external ? `sidebar-click-${title.toLowerCase().replace(' ', '-')}` : null
        }
      >
        {title} {external && <SquareArrowOutUpRight />}
      </Link>
    </SidebarMenuSubButton>
  )
}
