import { type PropsWithChildren } from 'react'
import { FaCheckSquare } from 'react-icons/fa'

import { PageHeading } from '@/components/page-heading'
import {
  TypographyBold,
  TypographyH2,
  TypographyList,
  TypographyP,
} from '@/components/ui/typography'

export default function Page() {
  const Check = () => <FaCheckSquare color='#1dc355' size={24} />
  const ListItem = ({ children }: PropsWithChildren) => (
    <div className='flex items-center gap-2'>
      <Check />
      {children}
    </div>
  )
  return (
    <>
      <PageHeading heading='Overview' />
      <TypographyH2>The Ultimate Customizable QR Code Generator for React</TypographyH2>
      <TypographyP>
        Welcome to <TypographyBold>@lglab/react-qr-code</TypographyBold>, the modern,
        high-performance QR code generator built for React developers. Designed for
        flexibility, this library lets you create highly customizable QR codes with
        advanced styling options.
      </TypographyP>

      <TypographyList
        className='p-0 list-none'
        items={[
          {
            key: 'Customizable',
            content: (
              <ListItem>
                <div>
                  <span className='font-semibold'>Highly Customizable</span> - Style the
                  finder patterns, modules, and colors exactly how you want.
                </div>
              </ListItem>
            ),
          },
          {
            key: 'Performance',
            content: (
              <ListItem>
                <div>
                  <span className='font-semibold'>Performance Optimized</span> - Generates
                  QR codes efficiently without sacrificing quality.
                </div>
              </ListItem>
            ),
          },
          {
            key: 'SVG',
            content: (
              <ListItem>
                <div>
                  <span className='font-semibold'>SVG-Based Rendering</span> - Crisp and
                  scalable output for web and print
                </div>
              </ListItem>
            ),
          },
          {
            key: 'Developer-Friendly',
            content: (
              <ListItem>
                <div>
                  <span className='font-semibold'>Developer-Friendly</span> - Built with
                  TypeScript, easy to use, and well-documented
                </div>
              </ListItem>
            ),
          },
        ]}
      ></TypographyList>
    </>
  )
}
