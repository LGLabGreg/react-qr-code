import { DEFAULT_FRAME_COLOR, DEFAULT_FRAME_TEXT } from '../constants'
import type { FrameSettings } from '../types/lib'
import { type FrameLayout, isFilledFrame } from '../utils/frame'

interface FrameProps {
  settings: FrameSettings
  layout: FrameLayout
  maskId: string
}

// Rough average glyph width relative to font size for bold sans-serif fonts.
const GLYPH_WIDTH_RATIO = 0.6

export const FrameBack = ({ settings, layout, maskId }: FrameProps) => {
  const color = settings.color ?? DEFAULT_FRAME_COLOR
  const { width, height, radius, padding, strokeWidth, labelHeight } = layout

  switch (settings.style) {
    case 'banner-bottom':
    case 'banner-top':
      return (
        <rect
          width={width}
          height={height}
          rx={radius}
          fill={color}
          data-testid='frame'
        />
      )
    case 'ticket': {
      const notchRadius = padding * 0.8
      return (
        <>
          <defs>
            <mask id={maskId}>
              <rect width={width} height={height} fill='#fff' />
              <circle cx={0} cy={layout.dividerY} r={notchRadius} fill='#000' />
              <circle cx={width} cy={layout.dividerY} r={notchRadius} fill='#000' />
            </mask>
          </defs>
          <rect
            width={width}
            height={height}
            rx={radius}
            fill={color}
            mask={`url(#${maskId})`}
            data-testid='frame'
          />
        </>
      )
    }
    case 'bubble': {
      const bubbleY = height - labelHeight
      const pointerSize = padding * 1.1
      const cx = width / 2
      return (
        <g data-testid='frame'>
          <rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={width - strokeWidth}
            height={width - strokeWidth}
            rx={radius}
            fill='none'
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <path
            d={`M${cx - pointerSize},${bubbleY + 0.01} L${cx},${bubbleY - pointerSize} L${cx + pointerSize},${bubbleY + 0.01}z`}
            fill={color}
          />
          <rect
            y={bubbleY}
            width={width}
            height={labelHeight}
            rx={labelHeight / 2}
            fill={color}
          />
        </g>
      )
    }
    case 'border':
      return (
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={width - strokeWidth}
          rx={radius}
          fill='none'
          stroke={color}
          strokeWidth={strokeWidth}
          data-testid='frame'
        />
      )
    default:
      return null
  }
}

export const FrameLabel = ({ settings, layout }: Omit<FrameProps, 'maskId'>) => {
  const color = settings.color ?? DEFAULT_FRAME_COLOR
  const text = settings.text ?? DEFAULT_FRAME_TEXT
  const textColor =
    settings.textColor ??
    (isFilledFrame(settings.style) || settings.style === 'bubble' ? '#FFFFFF' : color)
  const { width, padding, labelHeight, labelY } = layout

  const fontSize = labelHeight * 0.5
  const maxTextWidth = width - padding * 3
  const overflows = text.length * fontSize * GLYPH_WIDTH_RATIO > maxTextWidth

  return (
    <>
      {settings.style === 'ticket' && (
        <line
          x1={padding * 1.4}
          x2={width - padding * 1.4}
          y1={layout.dividerY}
          y2={layout.dividerY}
          stroke={textColor}
          strokeWidth={padding * 0.15}
          strokeDasharray={`${padding * 0.5} ${padding * 0.35}`}
        />
      )}
      {text && (
        <text
          x={width / 2}
          y={labelY}
          fill={textColor}
          fontSize={fontSize}
          fontFamily={settings.fontFamily ?? 'sans-serif'}
          fontWeight='bold'
          textAnchor='middle'
          dominantBaseline='central'
          textLength={overflows ? maxTextWidth : undefined}
          lengthAdjust={overflows ? 'spacingAndGlyphs' : undefined}
          data-testid='frame-label'
        >
          {text}
        </text>
      )}
    </>
  )
}
