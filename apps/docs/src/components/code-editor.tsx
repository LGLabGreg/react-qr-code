'use client'

import { Highlight, type Language, themes } from 'prism-react-renderer'

import { CopyButton } from './copy-button'

interface CodeEditorProps {
  code: string
  language?: Language
}

export const CodeEditor = ({ code, language = 'tsx' }: CodeEditorProps) => {
  const trimmed = code.trim()

  return (
    <div className='mb-4 max-w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm'>
      <div className='flex h-10 items-center justify-between border-b border-zinc-800 pl-4 pr-2'>
        <span className='font-mono text-xs text-zinc-400'>{language}</span>
        <CopyButton value={trimmed} />
      </div>

      <Highlight code={trimmed} language={language} theme={themes.oneDark}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto py-4 font-mono text-[13.5px] leading-6`}
            style={{ ...style, background: 'transparent' }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className='table-row'>
                <span className='table-cell w-12 select-none pr-4 text-right text-zinc-600'>
                  {i + 1}
                </span>
                <span className='table-cell pr-4'>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
