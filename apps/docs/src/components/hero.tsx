import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { TypographyLead } from './ui/typography'

export const Hero = () => {
  return (
    <section className='py-8 mb-5'>
      <div className='container text-center'>
        <div className='mx-auto flex max-w-5xl flex-col gap-6'>
          <h1 className='text-3xl font-semibold lg:text-6xl'>
            The ultimate customizable QR code generator for React
          </h1>
          <TypographyLead>
            Create high-performance, stylized QR codes with a library designed for the
            modern web.
          </TypographyLead>
        </div>
        <div className='flex items-center gap-4 justify-center mt-6'>
          <Button asChild size='lg'>
            <Link href='/installation'>
              Get started
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <Link href='/demo'>Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
