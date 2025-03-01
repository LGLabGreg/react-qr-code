import { type PropsWithChildren } from 'react'

import { Header } from '@/components/page-header'
import { AppSidebar } from '@/components/page-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export const PageSkeleton = async ({ children }: PropsWithChildren) => {
  const Content = () => {
    return <div className='flex flex-1 flex-col pt-5 pb-8 px-8'>{children}</div>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Content />
      </SidebarInset>
    </SidebarProvider>
  )
}
