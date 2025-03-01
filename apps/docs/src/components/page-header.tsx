import Link from 'next/link'
import { FaGithub } from 'react-icons/fa6'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { Logo } from './logo'

export const Header = () => {
  return (
    <header className='z-30 flex sticky top-0 bg-background h-16 shrink-0 items-center justify-between gap-2 border-b px-4'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger />
        <Separator orientation='vertical' className='mr-1 h-4' />
        <Logo />
      </div>
      <div>
        <Link href='https://github.com/LGLabGreg/react-qr-code' target='_blank'>
          <FaGithub size={24} />
        </Link>
      </div>
    </header>
  )
}
