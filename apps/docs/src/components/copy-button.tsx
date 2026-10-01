'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

interface CopyButtonProps {
  value: string
  className?: string
}

export const CopyButton = ({ value, className }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <button
      type='button'
      onClick={copyToClipboard}
      className={cn(
        'inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-50',
        className,
      )}
      data-umami-event='copy-code'
    >
      {isCopied ? <Check className='size-3.5' /> : <Copy className='size-3.5' />}
      <span className='sr-only'>{isCopied ? 'Copied' : 'Copy code to clipboard'}</span>
    </button>
  )
}
