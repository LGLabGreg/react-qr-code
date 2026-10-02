import type { Metadata } from 'next'
import { Inter, Source_Code_Pro } from 'next/font/google'
import Script from 'next/script'

import { PageSkeleton } from '@/components/page-skeleton'
import { IS_PRODUCTION } from '@/config/env'

import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const mono = Source_Code_Pro({
  variable: '--font-source-code',
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
    url: './',
    siteName: 'React QR Code',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
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
        {IS_PRODUCTION && (
          <Script
            src='https://cloud.umami.is/script.js'
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </body>
    </html>
  )
}
