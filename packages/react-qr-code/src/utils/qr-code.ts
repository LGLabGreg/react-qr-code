import { DEFAULT_IMG_SCALE, DEFAULT_MARGIN_SIZE } from '../constants'
import type { CrossOrigin, Excavation, ImageSettings, Modules } from '../types/lib'

export const excavateModules = (modules: Modules, excavation: Excavation): Modules => {
  return modules.slice().map((row, y) => {
    if (y < excavation.y || y >= excavation.y + excavation.h) {
      return row
    }
    return row.map((cell, x) => {
      if (x < excavation.x || x >= excavation.x + excavation.w) {
        return cell
      }
      return false
    })
  })
}

export const getImageSettings = (
  cells: Modules,
  size: number,
  margin: number,
  imageSettings?: ImageSettings,
): null | {
  x: number
  y: number
  h: number
  w: number
  excavation: Excavation | null
  opacity: number
  crossOrigin: CrossOrigin
} => {
  if (imageSettings == null) {
    return null
  }
  const numCells = cells.length + margin * 2
  const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE)
  const scale = numCells / size
  const w = (imageSettings.width || defaultSize) * scale
  const h = (imageSettings.height || defaultSize) * scale
  const x = imageSettings.x == null ? cells.length / 2 - w / 2 : imageSettings.x * scale
  const y = imageSettings.y == null ? cells.length / 2 - h / 2 : imageSettings.y * scale
  const opacity = imageSettings.opacity == null ? 1 : imageSettings.opacity

  let excavation = null
  if (imageSettings.excavate) {
    const floorX = Math.floor(x)
    const floorY = Math.floor(y)
    const ceilW = Math.ceil(w + x - floorX)
    const ceilH = Math.ceil(h + y - floorY)
    excavation = { x: floorX, y: floorY, w: ceilW, h: ceilH }
  }

  const crossOrigin = imageSettings.crossOrigin

  return { x, y, h, w, excavation, opacity, crossOrigin }
}

export const getMarginSize = (marginSize?: number): number => {
  if (marginSize != null) {
    return Math.max(Math.floor(marginSize), 0)
  }
  return DEFAULT_MARGIN_SIZE
}
