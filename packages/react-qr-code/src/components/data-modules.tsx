import { type ReactNode, useCallback, useMemo } from 'react'

import { DEFAULT_NUM_STAR_POINTS } from '../constants'
import type { DataModulesProps } from '../types/utils'
import {
  bottomRounded,
  circle,
  dataModuleCanBeRandomSize,
  diamond,
  getScaleFactor,
  leaf,
  leftRounded,
  rightRounded,
  square,
  topRounded,
} from '../utils/data-modules'
import {
  bottomLeftRounded,
  bottomRightRounded,
  getModuleNeighbours,
  topLeftRounded,
  topRightRounded,
} from '../utils/data-modules'
import { isFinderPatternInnerModule } from '../utils/finder-patterns-inner'
import { isFinderPatternOuterModule } from '../utils/finder-patterns-outer'
import { sanitizeDataModulesSettings } from '../utils/settings'
import { hashtag, heart, pinchedSquare, star } from '../utils/svg'

export const DataModules = ({
  modules,
  margin,
  settings,
  gradient,
  gradientId,
}: DataModulesProps): ReactNode => {
  const { color, style, randomSize } = useMemo(
    () => sanitizeDataModulesSettings(settings),
    [settings],
  )

  const ops: Array<string> = []
  const numCells = modules.length
  const isRandom = dataModuleCanBeRandomSize(style) && randomSize

  const scaleFactor = useCallback(
    () => getScaleFactor(style, isRandom),
    [style, isRandom],
  )

  modules.forEach((row, y) => {
    row.forEach((cell, x) => {
      // Skip the finder patterns
      if (
        isFinderPatternOuterModule({ x, y, numCells }) ||
        isFinderPatternInnerModule({ x, y, numCells })
      ) {
        return
      }

      const scale = scaleFactor()
      const size = 1 * scale
      const posOffset = (1 - 1 * scale) / 2
      const xPos = x + margin + posOffset
      const yPos = y + margin + posOffset

      if (cell) {
        if (style === 'square' || style === 'square-sm') {
          ops.push(square(xPos, yPos, size))
        } else if (style === 'pinched-square') {
          ops.push(pinchedSquare(xPos, yPos, size, 0.25))
        } else if (style === 'circle') {
          ops.push(circle(xPos, yPos, size))
        } else if (style === 'diamond') {
          ops.push(diamond(xPos, yPos, size))
        } else if (style === 'star') {
          ops.push(
            star(xPos + size / 2, yPos + size / 2, size * 1.1, DEFAULT_NUM_STAR_POINTS),
          )
        } else if (style === 'heart') {
          ops.push(heart(xPos, yPos, size))
        } else if (style === 'hashtag') {
          ops.push(hashtag(xPos, yPos, size))
        } else if (style === 'rounded') {
          const { left, right, top, bottom, count } = getModuleNeighbours(x, y, modules)

          if (count === 0) {
            ops.push(circle(xPos, yPos, 1))
          } else if (count > 2 || (left && right) || (top && bottom)) {
            ops.push(square(xPos, yPos, 1))
          } else if (count === 2) {
            if (left && top) {
              ops.push(bottomRightRounded(xPos, yPos))
            } else if (top && right) {
              ops.push(bottomLeftRounded(xPos, yPos))
            } else if (right && bottom) {
              ops.push(topLeftRounded(xPos, yPos))
            } else {
              ops.push(topRightRounded(xPos, yPos))
            }
          } else {
            if (top) {
              ops.push(bottomRounded(xPos, yPos))
            } else if (right) {
              ops.push(leftRounded(xPos, yPos))
            } else if (bottom) {
              ops.push(topRounded(xPos, yPos))
            } else {
              ops.push(rightRounded(xPos, yPos))
            }
          }
        } else if (style === 'leaf') {
          const { left, right, top, bottom, count } = getModuleNeighbours(x, y, modules)

          if (count === 0) {
            ops.push(leaf(xPos, yPos, size))
          } else if (!left && !top) {
            ops.push(topLeftRounded(xPos, yPos))
            return
          } else if (!right && !bottom) {
            ops.push(bottomRightRounded(xPos, yPos))
          } else {
            ops.push(square(xPos, yPos, 1))
          }
        } else if (style === 'vertical-line') {
          const { left, right, top, bottom, count } = getModuleNeighbours(x, y, modules)

          if (count === 0 || (left && !(top || bottom)) || (right && !(top || bottom))) {
            ops.push(circle(xPos, yPos, 1))
          } else if (top && bottom) {
            ops.push(square(xPos, yPos, 1))
          } else if (top && !bottom) {
            ops.push(bottomRounded(xPos, yPos))
          } else if (bottom && !top) {
            ops.push(topRounded(xPos, yPos))
          }
        } else if (style === 'horizontal-line') {
          const { left, right, top, bottom, count } = getModuleNeighbours(x, y, modules)

          if (count === 0 || (top && !(left || right)) || (bottom && !(left || right))) {
            ops.push(circle(xPos, yPos, 1))
          } else if (left && right) {
            ops.push(square(xPos, yPos, 1))
          } else if (left && !right) {
            ops.push(rightRounded(xPos, yPos))
          } else if (right && !left) {
            ops.push(leftRounded(xPos, yPos))
          }
        }
      }
    })
  })
  return (
    <path
      fill={gradient ? `url(#${gradientId})` : color}
      d={ops.join('')}
      shapeRendering={style === 'square' ? 'crispEdges' : 'geometricPrecision'}
      data-testid='data-modules'
    />
  )
}
