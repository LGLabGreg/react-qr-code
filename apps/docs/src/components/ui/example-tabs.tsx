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
      className='px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent cursor-pointer data-[state=active]:shadow-none'
    >
      {children}
    </TabsTrigger>
  )
}

export const ExampleTabs = ({ codeBlock, preview }: ExampleTabsProps) => {
  return (
    <Tabs defaultValue='preview' className='w-full'>
      <div className='border-b mb-4'>
        <TabsList className='w-fit h-auto p-0 bg-transparent'>
          <ExampleTabsTrigger value='preview'>Preview</ExampleTabsTrigger>
          <ExampleTabsTrigger value='code'>Code</ExampleTabsTrigger>
        </TabsList>
      </div>

      <TabsContent value='preview'>
        <div className='flex rounded-lg border p-6'>{preview}</div>
      </TabsContent>

      <TabsContent value='code'>
        <CodeEditor code={codeBlock} />
      </TabsContent>
    </Tabs>
  )
}
