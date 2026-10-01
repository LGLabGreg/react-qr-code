'use client'

import { CodeEditor } from '@/components/code-editor'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ExampleTabsProps {
  codeBlock: string
  preview: React.ReactNode
}

const ExampleTabsTrigger = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  return (
    <TabsTrigger
      value={value}
      className='-mb-px px-3 pb-2.5 pt-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground rounded-none bg-transparent cursor-pointer data-[state=active]:shadow-none'
    >
      {children}
    </TabsTrigger>
  )
}

export const ExampleTabs = ({ codeBlock, preview }: ExampleTabsProps) => {
  return (
    <Tabs defaultValue='preview' className='w-full'>
      <div className='border-b mb-4 mt-2'>
        <TabsList className='w-fit h-auto p-0 bg-transparent'>
          <ExampleTabsTrigger value='preview'>Preview</ExampleTabsTrigger>
          <ExampleTabsTrigger value='code'>Code</ExampleTabsTrigger>
        </TabsList>
      </div>

      <TabsContent value='preview'>
        <div className='flex min-h-[200px] items-center justify-center rounded-xl border bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:16px_16px] p-6 md:p-10'>
          {preview}
        </div>
      </TabsContent>

      <TabsContent value='code'>
        <CodeEditor code={codeBlock} />
      </TabsContent>
    </Tabs>
  )
}
