'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

import { CopyButton } from './copy-button'

interface CodeBlockProps {
  commands: { title: string; code: string }[]
}

export const CodeBlock = ({ commands }: CodeBlockProps) => {
  const [active, setActive] = useState(0)
  const { code } = commands[active]

  return (
    <div className='mb-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm'>
      <div className='flex h-10 items-center justify-between border-b border-zinc-800 pl-2 pr-2'>
        <div className='flex items-center gap-1' role='tablist'>
          {commands.map(({ title }, i) => (
            <button
              key={title}
              type='button'
              role='tab'
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                'h-7 cursor-pointer rounded-md px-2.5 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-100',
                i === active && 'bg-white/10 text-zinc-50',
              )}
            >
              {title}
            </button>
          ))}
        </div>
        <CopyButton value={code} />
      </div>
      <pre className='overflow-x-auto p-4'>
        <code className='font-mono text-sm text-zinc-100'>
          <span className='select-none text-zinc-500'>$ </span>
          {code}
        </code>
      </pre>
    </div>
  )
}
