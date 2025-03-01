'use client'

import { Check, Copy } from 'lucide-react'
import { Highlight, type Language } from 'prism-react-renderer'
import { useState } from 'react'

import { Card } from '@/components/ui/card'

import { Button } from './ui/button'

interface CodeEditorProps {
  code: string
  language?: Language
}

export const CodeEditor = ({ code, language = 'tsx' }: CodeEditorProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Card className='mb-4 max-w-full overflow-x-auto'>
      <div className='flex items-center justify-between bg-muted px-4 py-2'>
        <span className='text-sm font-medium text-muted-foreground'>{language}</span>
        <Button
          variant='ghost'
          size='sm'
          onClick={copyToClipboard}
          className='h-8 w-8 p-0 cursor-pointer'
          data-umami-event='copy-code'
        >
          {isCopied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
          <span className='sr-only'>
            {isCopied ? 'Copied' : 'Copy code to clipboard'}
          </span>
        </Button>
      </div>

      <Highlight code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 overflow-x-auto`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })} className='table-row'>
                <span className='table-cell text-right pr-4 select-none opacity-50 text-sm'>
                  {i + 1}
                </span>
                <span className='table-cell'>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Card>
  )
}
