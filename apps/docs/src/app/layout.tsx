import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter, Source_Code_Pro } from 'next/font/google'
import Script from 'next/script'

import { IS_PRODUCTION } from '@/config/env'

import { PageSkeleton } from '@/components/page-skeleton'

import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const mono = Source_Code_Pro({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'React QR Code - Customizable QR Code Generator for React',
  description:
    'React QR Code is a highly customizable and lightweight QR code generator for React applications. Easily style QR codes with unique finder patterns, rounded corners, and customizable colors. Explore the documentation and live demo to get started quickly!',
  verification: {
    google: 'Goj4S4p5vftypzgOYaMYR-93W3hdlgOT_1qpFmW2gfE',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${mono.variable} antialiased`}>
        <PageSkeleton>{children}</PageSkeleton>
        <Analytics />
        {IS_PRODUCTION && (
          <Script
            src='https://cloud.umami.is/script.js'
            data-website-id='f474cb7d-6ce8-44e3-8174-96bdd5ecdffb'
          />
        )}
      </body>
    </html>
  )
}
