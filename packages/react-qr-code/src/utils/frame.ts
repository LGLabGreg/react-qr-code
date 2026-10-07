import type { FrameStyle } from '../types/lib'

export interface FrameLayout {
  width: number
  height: number
  qrX: number
  qrY: number
  padding: number
  radius: number
  labelY: number
  labelHeight: number
  // Y position of the ticket divider.
  dividerY: number
  // Stroke width for outlined styles.
  strokeWidth: number
}

const FILLED_STYLES: FrameStyle[] = ['banner-bottom', 'banner-top', 'ticket']

export const isFilledFrame = (style: FrameStyle) => FILLED_STYLES.includes(style)

/**
 * Computes the frame geometry, in module units, around a QR code of `numCells`.
 */
export const getFrameLayout = (style: FrameStyle, numCells: number): FrameLayout => {
  const padding = numCells * 0.07
  const radius = numCells * 0.08
  const labelHeight = numCells * 0.24
  const strokeWidth = padding * 0.45
  const width = numCells + padding * 2

  const base = {
    width,
    qrX: padding,
    qrY: padding,
    padding,
    radius,
    labelHeight,
    dividerY: 0,
    strokeWidth,
  }

  switch (style) {
    case 'banner-top':
      return {
        ...base,
        qrY: labelHeight,
        height: labelHeight + numCells + padding,
        labelY: labelHeight / 2,
      }
    case 'ticket': {
      const dividerY = numCells + padding * 1.6
      return {
        ...base,
        height: dividerY + labelHeight,
        labelY: dividerY + labelHeight / 2,
        dividerY,
      }
    }
    case 'bubble': {
      const gap = padding * 1.4
      const bubbleY = width + gap
      return {
        ...base,
        height: bubbleY + labelHeight,
        labelY: bubbleY + labelHeight / 2,
      }
    }
    case 'border':
      return {
        ...base,
        height: width + labelHeight,
        labelY: width + labelHeight / 2,
      }
    case 'banner-bottom':
    default:
      return {
        ...base,
        height: numCells + padding + labelHeight,
        labelY: numCells + padding + labelHeight / 2,
      }
  }
}
