import { type ComponentProps } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { mainNav } from '@/config/navigation'

import { PageSidebarButton } from './page-sidebar-button'

export const AppSidebar = async ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarContent className='py-4'>
        {mainNav.map((section) => (
          <SidebarGroup key={section.title} className='py-1'>
            <SidebarGroupLabel className='h-7 text-xs font-semibold text-foreground'>
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className='gap-0.5'>
                {section.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <PageSidebarButton {...item} />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
