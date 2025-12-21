import { Code, Layers, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'

import { Hero } from '@/components/hero'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TypographyBold } from '@/components/ui/typography'

export default function Page() {
  const features = [
    {
      title: 'Highly Customizable',
      description:
        'Style finder patterns, modules, and colors exactly how you want with advanced configuration.',
      icon: <Sparkles className='h-5 w-5 text-primary' />,
    },
    {
      title: 'Performance Optimized',
      description:
        'Generates QR codes efficiently without sacrificing quality or bundle size.',
      icon: <Zap className='h-5 w-5 text-primary' />,
    },
    {
      title: 'SVG-Based Rendering',
      description: 'Crisp and scalable output for web and print, powered by SVG.',
      icon: <Layers className='h-5 w-5 text-primary' />,
    },
    {
      title: 'Developer-Friendly',
      description:
        'Built with TypeScript, easy to use, and focused on a great developer experience.',
      icon: <Code className='h-5 w-5 text-primary' />,
    },
  ]

  return (
    <>
      <Hero />
      <div className='mb-12 grid grid-cols-1 gap-4 md:grid-cols-2'>
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader className='flex-row items-start gap-4 space-y-0'>
              <div className='mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background shadow-sm'>
                {feature.icon}
              </div>
              <div>
                <CardTitle className='text-lg'>{feature.title}</CardTitle>
                <CardDescription className='text-sm leading-relaxed'>
                  {feature.description}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className='flex-row items-start gap-4 space-y-0'>
          <div className='mt-1 shrink-0 rounded-lg bg-background p-2 shadow-sm'>
            <Sparkles className='h-6 w-6 text-primary' />
          </div>
          <div>
            <CardTitle className='mb-1 text-xl'>Optimized for AI</CardTitle>
            <CardDescription className='text-base text-foreground/80'>
              We provide <TypographyBold>llms.txt</TypographyBold> and{' '}
              <TypographyBold>llms-full.txt</TypographyBold> files to help tools like
              Cursor and Windsurf understand the library documentation instantly.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className='pt-0'>
          <Link
            href='/llms-txt'
            className='ml-14 inline-flex items-center gap-1 font-medium text-primary hover:underline'
          >
            Learn how to use with AI tools →
          </Link>
        </CardContent>
      </Card>
    </>
  )
}
