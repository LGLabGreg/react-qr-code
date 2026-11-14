/**
 * Renders the built library through its React Native entry and react-native-svg's
 * JS layer (prop extraction, transform parsing, paint resolution), which is what
 * runs on a device before props reach the native views. Run `pnpm build:lib`
 * first: this tests the package as it would be published.
 */
import {
  ReactQRCode,
  type DataModulesStyle,
  type FinderPatternInnerStyle,
  type FinderPatternOuterStyle,
  type FrameStyle,
  type ReactQRCodeProps,
  type ReactQRCodeRef,
} from '@lglab/react-qr-code'
import { createRef } from 'react'
import { act, create, type ReactTestRendererJSON } from 'react-test-renderer'

const outer: FinderPatternOuterStyle[] = [
  'square',
  'pinched-square',
  'rounded-sm',
  'rounded',
  'rounded-lg',
  'circle',
  'inpoint-sm',
  'inpoint',
  'inpoint-lg',
  'outpoint-sm',
  'outpoint',
  'outpoint-lg',
  'leaf-sm',
  'leaf',
  'leaf-lg',
]
const inner: FinderPatternInnerStyle[] = [
  ...outer,
  'diamond',
  'star',
  'heart',
  'hashtag',
  'microchip',
]
const data: DataModulesStyle[] = [
  'square',
  'square-sm',
  'pinched-square',
  'rounded',
  'leaf',
  'vertical-line',
  'horizontal-line',
  'circuit-board',
  'circle',
  'diamond',
  'star',
  'heart',
  'hashtag',
]
const frames: FrameStyle[] = ['banner-bottom', 'banner-top', 'ticket', 'bubble', 'border']
const gradient: ReactQRCodeProps['gradient'] = {
  type: 'linear',
  rotation: 45,
  stops: [
    { offset: '0%', color: '#2563eb' },
    { offset: '100%', color: '#db2777' },
  ],
}

const cases: Array<[string, ReactQRCodeProps]> = [
  ...outer.map((style): [string, ReactQRCodeProps] => [
    `outer ${style}`,
    { value: 'a', finderPatternOuterSettings: { style } },
  ]),
  ...inner.map((style): [string, ReactQRCodeProps] => [
    `inner ${style}`,
    { value: 'a', finderPatternInnerSettings: { style } },
  ]),
  ...data.map((style): [string, ReactQRCodeProps] => [
    `data ${style}`,
    { value: 'a', dataModulesSettings: { style, randomSize: true } },
  ]),
  ...frames.flatMap((style): Array<[string, ReactQRCodeProps]> => [
    [`frame ${style}`, { value: 'a', frameSettings: { style } }],
    [`frame ${style} without label`, { value: 'a', frameSettings: { style, text: '' } }],
    [
      `frame ${style} with long label`,
      {
        value: 'a',
        frameSettings: { style, text: 'Scan this code to open the documentation' },
      },
    ],
  ]),
  ['linear gradient', { value: 'a', gradient }],
  ['radial gradient', { value: 'a', gradient: { ...gradient!, type: 'radial' } }],
  ['gradient background', { value: 'a', background: gradient }],
  ['gradient with frame', { value: 'a', gradient, frameSettings: { style: 'ticket' } }],
  [
    'remote logo',
    {
      value: 'a',
      level: 'H',
      imageSettings: {
        src: 'https://example.com/logo.png',
        width: 30,
        height: 30,
        excavate: true,
      },
    },
  ],
  // oxlint-disable-next-line typescript/no-require-imports -- Metro asset
  [
    'bundled logo',
    {
      value: 'a',
      level: 'H',
      // oxlint-disable-next-line typescript/no-require-imports -- Metro bundles assets through require()
      imageSettings: { src: require('../assets/logo.png'), width: 30, height: 30 },
    },
  ],
  ['svgProps', { value: 'a', svgProps: { testID: 'qr', style: { margin: 4 } } }],
]

const TEXT_HOSTS = new Set(['RNSVGText', 'RNSVGTSpan'])

/** React Native throws on any string child outside a text component, even an empty one. */
const bareStrings = (node: ReactTestRendererJSON, found: string[] = []) => {
  for (const child of node.children ?? []) {
    if (typeof child === 'string') {
      if (!TEXT_HOSTS.has(node.type))
        found.push(`${node.type} > ${JSON.stringify(child)}`)
    } else {
      bareStrings(child, found)
    }
  }
  return found
}

const render = (props: ReactQRCodeProps) => {
  let renderer!: ReturnType<typeof create>
  act(() => {
    renderer = create(<ReactQRCode {...props} />)
  })
  return renderer
}

let problems: string[] = []
beforeEach(() => {
  problems = []
  for (const method of ['error', 'warn'] as const) {
    jest.spyOn(console, method).mockImplementation((...args) => {
      problems.push(`${method}: ${args.map(String).join(' ')}`)
    })
  }
})
afterEach(() => jest.restoreAllMocks())

it('resolves the React Native build', () => {
  expect(require.resolve('@lglab/react-qr-code')).toMatch(/dist[\\/]index\.native\.js$/)
})

it.each(cases)('renders %s', (_name, props) => {
  const renderer = render(props)
  const tree = renderer.toJSON() as ReactTestRendererJSON

  expect(tree.type).toBe('RNSVGSvgView')
  expect(bareStrings(tree)).toEqual([])
  expect(problems).toEqual([])
  act(() => renderer.unmount())
})

it('exposes toDataURL on the ref', () => {
  const ref = createRef<ReactQRCodeRef>()
  render({ value: 'a', ref } as ReactQRCodeProps)
  expect(typeof ref.current?.toDataURL).toBe('function')
})
