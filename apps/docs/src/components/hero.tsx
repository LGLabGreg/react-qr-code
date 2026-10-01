import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { CopyButton } from './copy-button'
import { HeroShowcase } from './hero-showcase'
import { TypographyLead } from './ui/typography'

const INSTALL_COMMAND = 'npm i @lglab/react-qr-code'

export const Hero = () => {
  return (
    <section className='relative pt-6 pb-16 md:pt-12'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 -top-10 -z-10 h-[420px] bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]'
      />
      <div className='mx-auto flex max-w-4xl flex-col items-center gap-6 text-center'>
        <Link
          href='https://github.com/LGLabGreg/react-qr-code'
          target='_blank'
          className='inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs transition-colors hover:text-foreground'
        >
          <span className='size-1.5 rounded-full bg-brand' />
          Open source · MIT licensed
        </Link>
        <h1 className='text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl'>
          The ultimate customizable QR code generator for React
        </h1>
        <TypographyLead className='max-w-2xl text-balance'>
          Create high-performance, stylized QR codes with a library designed for the
          modern web.
        </TypographyLead>
        <div className='flex flex-wrap items-center justify-center gap-3'>
          <Button asChild size='lg' className='px-6'>
            <Link href='/installation'>
              Get started
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size='lg' variant='outline' className='px-6'>
            <Link href='/demo'>Try the demo</Link>
          </Button>
        </div>
        <div className='flex h-10 items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 pl-4 pr-1.5 font-mono text-sm text-zinc-100 shadow-sm'>
          <span className='select-none text-zinc-500'>$</span>
          {INSTALL_COMMAND}
          <CopyButton value={INSTALL_COMMAND} />
        </div>
      </div>
      <div className='mt-14'>
        <HeroShowcase />
      </div>
    </section>
  )
}
