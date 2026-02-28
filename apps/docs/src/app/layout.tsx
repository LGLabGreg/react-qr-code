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
  metadataBase: new URL('https://reactqrcode.com'),
  title: {
    default: 'React QR Code – Customizable QR Code Generator for React',
    template: '%s – React QR Code',
  },
  description:
    'React QR Code is a highly customizable and lightweight QR code generator for React applications. Easily style QR codes with unique finder patterns, rounded corners, and customizable colors.',
  keywords: [
    'React QR Code',
    'QR code generator',
    'React QR library',
    'SVG QR code',
    'customizable QR codes',
  ],
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    url: 'https://reactqrcode.com',
    title: 'React QR Code – Customizable QR Code Generator for React',
    description:
      'Generate highly customizable, high-performance QR codes in React using SVG, gradients, and finder pattern controls.',
    siteName: 'React QR Code',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React QR Code – Customizable QR Code Generator for React',
    description:
      'Lightweight, customizable QR code generator for React with SVG rendering and fine-grained styling.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          crossOrigin='anonymous'
        />
      </body>
    </html>
  )
}
