import Link from 'next/link'
import { FaGithub } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { Logo } from './logo'

export const Header = () => {
  return (
    <header className='z-30 flex sticky top-0 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 h-14 shrink-0 items-center justify-between gap-2 border-b px-4'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='text-muted-foreground hover:text-foreground' />
        <Separator orientation='vertical' className='mr-1 h-4' />
        <Logo />
      </div>
      <div className='flex items-center'>
        <Button
          asChild
          variant='ghost'
          size='icon'
          className='text-muted-foreground hover:text-foreground [&_svg]:size-5'
        >
          <Link
            href='https://github.com/LGLabGreg/react-qr-code'
            target='_blank'
            aria-label='GitHub repository'
          >
            <FaGithub />
          </Link>
        </Button>
      </div>
    </header>
  )
}
