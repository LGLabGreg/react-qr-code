import { type PropsWithChildren } from 'react'

import { Header } from '@/components/page-header'
import { AppSidebar } from '@/components/page-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export const PageSkeleton = async ({ children }: PropsWithChildren) => {
  const Content = () => {
    return (
      <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-8 pb-16 md:px-8 md:pt-10'>
        {children}
      </main>
    )
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
