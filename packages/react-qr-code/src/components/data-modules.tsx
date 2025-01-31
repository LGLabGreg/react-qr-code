import { type ReactNode, useCallback, useMemo } from 'react'

import { DEFAULT_NUM_STAR_POINTS } from '../constants'
import type { DataModulesProps } from '../types/utils'
import {
  bottomRounded,
  circle,
  dataModuleCanBeRandomSize,
  diamond,
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
import { heart, star } from '../utils/svg'

export const DataModules = ({
  modules,
  margin,
  settings,
}: DataModulesProps): ReactNode => {
  const { color, style, randomSize } = useMemo(
    () => sanitizeDataModulesSettings(settings),
    [settings],
  )

  const ops: Array<string> = []
  const numCells = modules.length
  const isRandom = dataModuleCanBeRandomSize(style) && randomSize

  const getScaleFactor = useCallback(() => {
    if (style === 'square-sm') {
      return 0.75
    } else if (isRandom) {
      return Math.random() * (1 - 0.75) + 0.75
    }
    return 1
  }, [style, isRandom])

  modules.forEach((row, y) => {
    row.forEach((cell, x) => {
      // Skip the finder patterns
      if (
        isFinderPatternOuterModule({ x, y, numCells }) ||
        isFinderPatternInnerModule({ x, y, numCells })
      ) {
        return
      }

      const scaleFactor = getScaleFactor()
      const size = 1 * scaleFactor
      const posOffset = (1 - 1 * scaleFactor) / 2
      const xPos = x + margin + posOffset
      const yPos = y + margin + posOffset

      if (cell) {
        if (style === 'square' || style === 'square-sm') {
          ops.push(square(xPos, yPos, size))
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
        }
      }
    })
  })
  return (
    <path
      fill={color}
      d={ops.join('')}
      shapeRendering={style === 'square' ? 'crispEdges' : 'geometricPrecision'}
    />
  )
}
