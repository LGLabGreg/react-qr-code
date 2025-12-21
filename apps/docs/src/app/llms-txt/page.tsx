import { PageHeading } from '@/components/page-heading'
import {
  TypographyBold,
  TypographyH2,
  TypographyInlineCode,
  TypographyList,
  TypographyP,
} from '@/components/ui/typography'

export default function Page() {
  return (
    <>
      <PageHeading heading='llms.txt' />
      <TypographyP>
        We support the <TypographyBold>llms.txt</TypographyBold> standard to help AI
        coding assistants better understand the{' '}
        <TypographyInlineCode>@lglab/react-qr-code</TypographyInlineCode> library, its
        API, and various customization options.
      </TypographyP>

      <TypographyH2>What is llms.txt?</TypographyH2>
      <TypographyP>
        The <TypographyBold>llms.txt</TypographyBold> file is a proposal to standardize
        the provision of information to Large Language Models (LLMs) at inference time. It
        provides a curated, LLM-friendly overview of a project, making it easier for AI
        tools to provide accurate code suggestions and documentation.
      </TypographyP>

      <TypographyH2>Available Routes</TypographyH2>
      <TypographyP>
        We provide two distinct files to cater to different levels of detail:
      </TypographyP>
      <TypographyList
        items={[
          {
            key: 'llms',
            content: (
              <>
                <TypographyBold>
                  <a href='/llms.txt' target='_blank' rel='noreferrer'>
                    /llms.txt
                  </a>
                </TypographyBold>{' '}
                - A structured overview of the project with links to all documentation
                pages.
              </>
            ),
          },
          {
            key: 'llms-full',
            content: (
              <>
                <TypographyBold>
                  <a href='/llms-full.txt' target='_blank' rel='noreferrer'>
                    /llms-full.txt
                  </a>
                </TypographyBold>{' '}
                - A comprehensive technical reference including all component props,
                settings interfaces, and usage examples.
              </>
            ),
          },
        ]}
      />

      <TypographyH2>Usage with Cursor</TypographyH2>
      <TypographyP>
        You can use these files in <TypographyBold>Cursor</TypographyBold> to enhance its
        understanding of the library. For more details, see the{' '}
        <a
          href='https://cursor.com/docs/context/mentions#docs'
          target='_blank'
          rel='noreferrer'
          className='text-primary underline underline-offset-4'
        >
          Cursor Documentation
        </a>
        .
      </TypographyP>
      <TypographyList
        items={[
          {
            key: 'cursor-docs',
            content: (
              <>
                Type <TypographyInlineCode>@Docs</TypographyInlineCode> in the chat or
                composer and select <TypographyBold>Add new doc</TypographyBold>. Paste{' '}
                <TypographyInlineCode>
                  https://reactqrcode.com/llms-full.txt
                </TypographyInlineCode>{' '}
                to give Cursor full access to the library specification.
              </>
            ),
          },
          {
            key: 'cursor-chat',
            content: (
              <>
                Alternatively, you can reference the file directly in any prompt by typing{' '}
                <TypographyInlineCode>
                  @https://reactqrcode.com/llms-full.txt
                </TypographyInlineCode>{' '}
                for immediate context.
              </>
            ),
          },
        ]}
      />
    </>
  )
}
