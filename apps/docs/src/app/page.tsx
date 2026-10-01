import { ArrowRight, Bot, Code, Layers, Sparkles, Zap } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Hero } from '@/components/hero'
import { TypographyBold } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: {
    absolute: 'React QR Code – Customizable QR Code Generator for React',
  },
  description:
    'React QR Code is a highly customizable and lightweight QR code generator for React applications. Easily style QR codes with unique finder patterns, rounded corners, and customizable colors.',
}

const features = [
  {
    title: 'Highly Customizable',
    description:
      'Style finder patterns, modules, and colors exactly how you want with advanced configuration.',
    icon: Sparkles,
  },
  {
    title: 'Performance Optimized',
    description:
      'Generates QR codes efficiently without sacrificing quality or bundle size.',
    icon: Zap,
  },
  {
    title: 'SVG-Based Rendering',
    description: 'Crisp and scalable output for web and print, powered by SVG.',
    icon: Layers,
  },
  {
    title: 'Developer-Friendly',
    description:
      'Built with TypeScript, easy to use, and focused on a great developer experience.',
    icon: Code,
  },
]

const FeatureIcon = ({ icon: Icon }: { icon: typeof Sparkles }) => (
  <div className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background shadow-xs'>
    <Icon className='size-4 text-brand' />
  </div>
)

export default function Page() {
  return (
    <>
      <Hero />
      <div className='mx-auto w-full max-w-4xl'>
        <div className='grid grid-cols-1 overflow-hidden rounded-xl border bg-border gap-px sm:grid-cols-2'>
          {features.map((feature) => (
            <div key={feature.title} className='flex flex-col gap-4 bg-background p-6'>
              <FeatureIcon icon={feature.icon} />
              <div className='space-y-1.5'>
                <h3 className='font-semibold tracking-tight'>{feature.title}</h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href='/llms-txt'
          className='group mt-4 flex flex-col gap-4 rounded-xl border bg-muted/40 p-6 transition-colors hover:bg-muted/70 sm:flex-row sm:items-center'
        >
          <FeatureIcon icon={Bot} />
          <div className='flex-1 space-y-1.5'>
            <h3 className='font-semibold tracking-tight'>Optimized for AI</h3>
            <p className='text-sm leading-relaxed text-muted-foreground'>
              We provide{' '}
              <TypographyBold className='text-foreground'>llms.txt</TypographyBold> and{' '}
              <TypographyBold className='text-foreground'>llms-full.txt</TypographyBold>{' '}
              files to help tools like Cursor and Windsurf understand the library
              documentation instantly.
            </p>
          </div>
          <span className='inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap'>
            Learn more
            <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
          </span>
        </Link>
      </div>
    </>
  )
}
