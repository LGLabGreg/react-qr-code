import Link from 'next/link'

import type { Prop } from '@/types/props'

import { PageHeading } from '@/components/page-heading'
import { PropsTable } from '@/components/props-table'
import { TypographyBold, TypographyP } from '@/components/ui/typography'

const props: Prop[] = [
  {
    name: 'value',
    type: 'string | string[]',
    description: 'The value to encode into the QR Code.',
    required: true,
  },

  {
    name: 'size',
    type: 'number',
    description: 'QR Code size in pixels',
    defaultValue: '128',
  },
  {
    name: 'marginSize',
    type: 'number',
    description: 'The number of modules to use for margin. Recommended: 4',
    defaultValue: '4',
  },
  {
    name: 'background',
    type: 'string | GradientSettings',
    description: (
      <>
        QR Code background. hex or{' '}
        <Link className='underline' href='/gradient-settings'>
          GradientSettings
        </Link>
        . Transparent when no value is provided.
      </>
    ),
  },
  {
    name: 'gradient',
    type: 'GradientSettings',
    description: (
      <>
        See{' '}
        <Link className='underline' href='/gradient-settings'>
          GradientSettings
        </Link>
      </>
    ),
  },
  {
    name: 'dataModulesSettings',
    type: 'DataModulesSettings',
    description: (
      <>
        See{' '}
        <Link className='underline' href='/data-modules-settings'>
          DataModulesSettings
        </Link>
      </>
    ),
  },
  {
    name: 'finderPatternOuterSettings',
    type: 'FinderPatternOuterSettings',
    description: (
      <>
        See{' '}
        <Link className='underline' href='/finder-pattern-outer-settings'>
          FinderPatternOuterSettings
        </Link>
      </>
    ),
  },
  {
    name: 'finderPatternInnerSettings',
    type: 'FinderPatternInnerSettings',
    description: (
      <>
        See{' '}
        <Link className='underline' href='/finder-pattern-inner-settings'>
          FinderPatternInnerSettings
        </Link>
      </>
    ),
  },
  {
    name: 'imageSettings',
    type: 'ImageSettings',
    description: (
      <>
        See{' '}
        <Link className='underline' href='/image-settings'>
          ImageSettings
        </Link>
      </>
    ),
  },
  {
    name: 'level',
    type: 'ErrorCorrectionLevel',
    description: 'The Error Correction Level to use.',
    defaultValue: 'M',
    possibleValues: ['L', 'M', 'Q', 'H'],
  },
  {
    name: 'minVersion',
    type: 'number',
    description:
      'The minimum version used when encoding the QR Code. The optimal (lowest) version is determined, using minVersion as the lower bound.',
    defaultValue: '1',
    possibleValues: ['1-40'],
  },
  {
    name: 'boostLevel',
    type: 'boolean',
    description:
      'If enabled, the Error Correction Level of the result may be higher than the specified Error Correction Level option if it can be done without increasing the version.',
    defaultValue: 'true',
    possibleValues: ['true', 'false'],
  },
  {
    name: 'ref',
    type: 'React.RefObject<ReactQRCodeRef>',
    description: (
      <>
        See{' '}
        <Link className='underline' href='/ref-api'>
          ReactQRCodeRef
        </Link>
      </>
    ),
  },
  {
    name: 'svgProps',
    type: 'React.SVGProps<SVGSVGElement>',
    description: 'Props passed to the svg element',
  },
]

export default function Page() {
  return (
    <>
      <PageHeading heading='ReactQRCode' />
      <TypographyP>
        The <TypographyBold>@lglab/react-qr-code</TypographyBold> component provides a
        flexible and customizable way to generate QR codes in React. Below is a complete
        list of available props and their descriptions.
      </TypographyP>
      <PropsTable props={props} />
    </>
  )
}
