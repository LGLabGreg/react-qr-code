'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface CodeBlockProps {
  code: string
  title?: string
}

export const CodeBlock = ({ code, title = '' }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Card className='mb-4'>
      <CardContent className='p-0'>
        <div className='flex items-center justify-between bg-muted px-4 py-2'>
          <span className='text-sm font-medium text-muted-foreground'>{title}</span>
          <Button
            variant='ghost'
            size='sm'
            onClick={copyToClipboard}
            className='h-8 w-8 p-0 cursor-pointer'
          >
            {isCopied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
            <span className='sr-only'>
              {isCopied ? 'Copied' : 'Copy code to clipboard'}
            </span>
          </Button>
        </div>
        <pre className='overflow-x-auto p-4'>
          <code className='text-sm'>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
