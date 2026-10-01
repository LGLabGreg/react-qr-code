import type { ReactQRCodeProps } from '../../../packages/react-qr-code/src'
import { easeInOutCubic, easeOutElastic, prog } from './anim'

export const INK = '#0A0A0F'
export const CYAN = '#00C2CB'
export const VIOLET = '#7C3AED'
export const PINK = '#EC4899'
export const AMBER = '#F59E0B'
export const BLUE = '#3B82F6'
export const LIME = '#A3E635'

export type QRLook = Omit<ReactQRCodeProps, 'value' | 'size'>
export type Origin = 'center' | 'tl' | 'tr' | 'bl' | 'br'

export interface Look {
  at: number
  origin: Origin
  accent: string
  glow: [string, string]
  props: (t: number) => QRLook
}

const mono = (
  data: NonNullable<QRLook['dataModulesSettings']>,
  outer: NonNullable<QRLook['finderPatternOuterSettings']>['style'],
  inner: NonNullable<QRLook['finderPatternInnerSettings']>['style'],
  color = INK,
  innerColor = color,
): QRLook => ({
  background: '#FFFFFF',
  dataModulesSettings: { color, ...data },
  finderPatternOuterSettings: { color, style: outer },
  finderPatternInnerSettings: { color: innerColor, style: inner },
})

export const BASE_LOOK = mono({ style: 'square' }, 'square', 'square')

export const LOOKS: Look[] = [
  { at: 0, origin: 'center', accent: CYAN, glow: [CYAN, BLUE], props: () => BASE_LOOK },
  {
    at: 2.25,
    origin: 'center',
    accent: CYAN,
    glow: [CYAN, BLUE],
    props: () => mono({ style: 'rounded' }, 'rounded-lg', 'rounded'),
  },
  {
    at: 2.85,
    origin: 'tl',
    accent: CYAN,
    glow: [CYAN, VIOLET],
    props: () => mono({ style: 'circle' }, 'circle', 'circle'),
  },
  {
    at: 3.4,
    origin: 'br',
    accent: CYAN,
    glow: [VIOLET, CYAN],
    props: () => mono({ style: 'diamond' }, 'inpoint', 'diamond'),
  },
  {
    at: 3.9,
    origin: 'tr',
    accent: CYAN,
    glow: [VIOLET, PINK],
    props: () => mono({ style: 'star' }, 'outpoint-lg', 'star'),
  },
  {
    at: 4.4,
    origin: 'bl',
    accent: PINK,
    glow: [PINK, VIOLET],
    props: () => mono({ style: 'heart' }, 'leaf', 'heart'),
  },
  {
    at: 4.9,
    origin: 'center',
    accent: LIME,
    glow: [LIME, CYAN],
    props: () => mono({ style: 'circuit-board' }, 'rounded-sm', 'microchip'),
  },
  {
    at: 5.4,
    origin: 'tl',
    accent: CYAN,
    glow: [CYAN, BLUE],
    props: (t) =>
      mono(
        {
          style: 'vertical-line',
          lineWidth: 0.3 + 0.7 * easeInOutCubic(prog(t, 5.55, 0.45)),
        },
        'leaf-lg',
        'leaf',
      ),
  },
  {
    // Rotating linear gradient
    at: 6.1,
    origin: 'center',
    accent: VIOLET,
    glow: [VIOLET, CYAN],
    props: (t) => ({
      background: '#FFFFFF',
      gradient: {
        type: 'linear',
        rotation: ((t - 6.1) * 140) % 360,
        stops: [
          { offset: '0%', color: CYAN },
          { offset: '50%', color: VIOLET },
          { offset: '100%', color: PINK },
        ],
      },
      dataModulesSettings: { style: 'rounded' },
      finderPatternOuterSettings: { style: 'rounded-lg' },
      finderPatternInnerSettings: { style: 'circle' },
    }),
  },
  {
    // Dark radial background, glowing radial gradient modules, popping dots
    at: 7.2,
    origin: 'br',
    accent: AMBER,
    glow: [AMBER, PINK],
    props: (t) => ({
      background: {
        type: 'radial',
        stops: [
          { offset: '0%', color: '#2A1748' },
          { offset: '100%', color: '#0B0716' },
        ],
      },
      gradient: {
        type: 'radial',
        stops: [
          { offset: '0%', color: '#FDE68A' },
          { offset: '55%', color: AMBER },
          { offset: '100%', color: PINK },
        ],
      },
      dataModulesSettings: {
        style: 'circle',
        size: 0.35 + 0.65 * easeOutElastic(prog(t, 7.3, 1.1)),
      },
      finderPatternOuterSettings: { style: 'circle' },
      finderPatternInnerSettings: { style: 'star' },
    }),
  },
  {
    // Vivid gradient background with light modules
    at: 8.3,
    origin: 'tl',
    accent: '#FFFFFF',
    glow: [BLUE, CYAN],
    props: (t) => ({
      background: {
        type: 'linear',
        rotation: 135 + (t - 8.3) * 30,
        stops: [
          { offset: '0%', color: '#0EA5E9' },
          { offset: '100%', color: '#4F46E5' },
        ],
      },
      dataModulesSettings: { color: '#FFFFFF', style: 'leaf' },
      finderPatternOuterSettings: { color: '#FFFFFF', style: 'leaf-lg' },
      finderPatternInnerSettings: { color: '#FFFFFF', style: 'leaf' },
    }),
  },
  {
    // Final brand look, receives the logo
    at: 12.15,
    origin: 'center',
    accent: CYAN,
    glow: [CYAN, VIOLET],
    props: () => mono({ style: 'rounded' }, 'rounded-lg', 'circle', INK, CYAN),
  },
]

/** Static looks for the wall of cards. */
export const WALL_LOOKS: QRLook[] = [
  mono({ style: 'rounded' }, 'rounded-lg', 'circle'),
  {
    background: '#111118',
    dataModulesSettings: { color: CYAN, style: 'circle' },
    finderPatternOuterSettings: { color: CYAN, style: 'circle' },
    finderPatternInnerSettings: { color: CYAN, style: 'circle' },
  },
  {
    background: '#FFFFFF',
    gradient: {
      type: 'linear',
      rotation: 45,
      stops: [
        { offset: '0%', color: VIOLET },
        { offset: '100%', color: PINK },
      ],
    },
    dataModulesSettings: { style: 'diamond' },
    finderPatternOuterSettings: { style: 'inpoint' },
    finderPatternInnerSettings: { style: 'diamond' },
  },
  {
    background: {
      type: 'linear',
      rotation: 45,
      stops: [
        { offset: '0%', color: CYAN },
        { offset: '100%', color: BLUE },
      ],
    },
    dataModulesSettings: { color: '#FFFFFF', style: 'star' },
    finderPatternOuterSettings: { color: '#FFFFFF', style: 'outpoint' },
    finderPatternInnerSettings: { color: '#FFFFFF', style: 'star' },
  },
  mono({ style: 'heart' }, 'leaf', 'heart', '#BE185D'),
  {
    background: '#0B1220',
    dataModulesSettings: { color: LIME, style: 'circuit-board' },
    finderPatternOuterSettings: { color: LIME, style: 'rounded-sm' },
    finderPatternInnerSettings: { color: LIME, style: 'microchip' },
  },
  {
    background: '#FEF3C7',
    dataModulesSettings: { color: '#78350F', style: 'vertical-line' },
    finderPatternOuterSettings: { color: '#78350F', style: 'leaf-lg' },
    finderPatternInnerSettings: { color: '#78350F', style: 'leaf' },
  },
  {
    background: {
      type: 'radial',
      stops: [
        { offset: '0%', color: '#4C1D95' },
        { offset: '100%', color: '#1E0B3A' },
      ],
    },
    gradient: {
      type: 'linear',
      rotation: 90,
      stops: [
        { offset: '0%', color: AMBER },
        { offset: '100%', color: PINK },
      ],
    },
    dataModulesSettings: { style: 'hashtag' },
    finderPatternOuterSettings: { style: 'pinched-square' },
    finderPatternInnerSettings: { style: 'hashtag' },
  },
  {
    background: '#FFFFFF',
    gradient: {
      type: 'radial',
      stops: [
        { offset: '0%', color: CYAN },
        { offset: '100%', color: VIOLET },
      ],
    },
    dataModulesSettings: { style: 'leaf' },
    finderPatternOuterSettings: { style: 'leaf' },
    finderPatternInnerSettings: { style: 'leaf' },
  },
  {
    background: '#141414',
    dataModulesSettings: { color: '#FFFFFF', style: 'horizontal-line' },
    finderPatternOuterSettings: { color: '#FFFFFF', style: 'rounded' },
    finderPatternInnerSettings: { color: PINK, style: 'rounded' },
  },
  {
    background: {
      type: 'linear',
      rotation: 120,
      stops: [
        { offset: '0%', color: '#FBCFE8' },
        { offset: '100%', color: '#FDE68A' },
      ],
    },
    dataModulesSettings: { color: INK, style: 'circle', randomSize: true },
    finderPatternOuterSettings: { color: INK, style: 'rounded-lg' },
    finderPatternInnerSettings: { color: INK, style: 'rounded-lg' },
  },
  mono({ style: 'pinched-square' }, 'pinched-square', 'pinched-square', '#1E3A8A'),
  {
    background: '#ECFEFF',
    dataModulesSettings: { color: '#0E7490', style: 'rounded', lineWidth: 0.55 },
    finderPatternOuterSettings: { color: '#0E7490', style: 'circle' },
    finderPatternInnerSettings: { color: '#0E7490', style: 'circle' },
  },
]
