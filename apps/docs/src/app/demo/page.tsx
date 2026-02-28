import type { Metadata } from 'next'

import { Demo } from '@/components/demo/demo'
import { PageHeading } from '@/components/page-heading'

export const metadata: Metadata = {
  title: 'Demo',
  description:
    'Try the interactive React QR Code demo to experiment with customization options and see how the library works in real time.',
}

export default function Page() {
  return (
    <>
      <PageHeading heading='Demo' />
      <Demo />
    </>
  )
}
