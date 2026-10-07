import { FRAME_MIN_QUIET_ZONE } from '../constants'
import type { FrameStyle } from '../types/lib'

export interface FrameLayout {
  width: number
  height: number
  // Position of the QR code, inside the panel.
  qrX: number
  qrY: number
  // Light panel behind the QR code that guarantees a quiet zone against the frame.
  panelX: number
  panelY: number
  panelSize: number
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

const getPanelLayout = (
  style: FrameStyle,
  panelSize: number,
  hasLabel: boolean,
): Omit<FrameLayout, 'qrX' | 'qrY'> => {
  const padding = panelSize * 0.07
  const radius = panelSize * 0.08
  const labelHeight = panelSize * 0.24
  const strokeWidth = padding * 0.45
  const width = panelSize + padding * 2

  const base = {
    width,
    panelX: padding,
    panelY: padding,
    panelSize,
    padding,
    radius,
    labelHeight,
    dividerY: 0,
    strokeWidth,
  }

  // Without a label every style collapses to an even frame around the code.
  if (!hasLabel) {
    return { ...base, labelHeight: 0, height: width, labelY: width }
  }

  switch (style) {
    case 'banner-top':
      return {
        ...base,
        panelY: labelHeight,
        height: labelHeight + panelSize + padding,
        labelY: labelHeight / 2,
      }
    case 'ticket': {
      const dividerY = panelSize + padding * 1.6
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
        height: panelSize + padding + labelHeight,
        labelY: panelSize + padding + labelHeight / 2,
      }
  }
}

/**
 * Computes the frame geometry, in module units, around a QR code of `numCells`
 * (margin included).
 */
export const getFrameLayout = (
  style: FrameStyle,
  numCells: number,
  margin: number,
  hasLabel = true,
): FrameLayout => {
  const layout = getPanelLayout(
    style,
    numCells + Math.max(0, FRAME_MIN_QUIET_ZONE - margin) * 2,
    hasLabel,
  )
  const quietZone = (layout.panelSize - numCells) / 2

  return { ...layout, qrX: layout.panelX + quietZone, qrY: layout.panelY + quietZone }
}
