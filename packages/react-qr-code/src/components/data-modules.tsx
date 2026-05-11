import { type ReactNode, useCallback, useMemo } from 'react'

import { CIRCUIT_BOARD_PAD_RADIUS, DEFAULT_NUM_STAR_POINTS } from '../constants'
import type { DataModulesProps } from '../types/utils'
import {
  bottomRounded,
  circle,
  circuitBoardPad,
  circuitBoardShouldDrawPad,
  dataModuleCanBeRandomSize,
  diamond,
  getRenderableDataModuleNeighbours,
  getScaleFactor,
  leaf,
  leftRounded,
  rect,
  rightRounded,
  roundedDataModule,
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
  const { color, style, randomSize, size, lineWidth } = useMemo(
    () => sanitizeDataModulesSettings(settings),
    [settings],
  )

  const ops: Array<string> = []
  const numCells = modules.length
  const isRandom = dataModuleCanBeRandomSize(style) && randomSize

  const scaleFactor = useCallback(
    () => getScaleFactor(style, isRandom, size),
    [style, isRandom, size],
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
      const baseX = x + margin
      const baseY = y + margin
      const xPos = baseX + posOffset
      const yPos = baseY + posOffset
      const lwOffset = (1 - lineWidth) / 2

      if (cell) {
        if (style === 'circuit-board') {
          const cx = baseX + 0.5
          const cy = baseY + 0.5
          const traceHalf = lineWidth / 2
          // Traces extend traceHalf past both endpoints so that adjacent
          // traces fully cover the cell-center square at every junction
          // (preventing white notches at L/T/+ bends under nonzero fill).
          const traceLength = 1 + lineWidth
          const neighbours = getRenderableDataModuleNeighbours(x, y, modules, numCells)
          const { right, bottom, count } = neighbours

          if (right) {
            ops.push(rect(cx - traceHalf, cy - traceHalf, traceLength, lineWidth))
          }
          if (bottom) {
            ops.push(rect(cx - traceHalf, cy - traceHalf, lineWidth, traceLength))
          }
          if (count === 0) {
            const isolatedSize = 0.75
            const isolatedOffset = (1 - isolatedSize) / 2
            ops.push(square(baseX + isolatedOffset, baseY + isolatedOffset, isolatedSize))
          } else if (circuitBoardShouldDrawPad({ ...neighbours, count })) {
            ops.push(circuitBoardPad(cx, cy, CIRCUIT_BOARD_PAD_RADIUS))
          }
        } else if (style === 'square' || style === 'square-sm') {
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
          const neighbours = getModuleNeighbours(x, y, modules)
          const { left, right, top, bottom, count } = neighbours

          if (lineWidth === 1) {
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
          } else {
            ops.push(roundedDataModule(baseX, baseY, lineWidth, neighbours))
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
            ops.push(circle(baseX + lwOffset, baseY + lwOffset, lineWidth))
          } else if (top && bottom) {
            ops.push(rect(baseX + lwOffset, baseY, lineWidth, 1))
          } else if (top && !bottom) {
            ops.push(bottomRounded(baseX, baseY, lineWidth))
          } else if (bottom && !top) {
            ops.push(topRounded(baseX, baseY, lineWidth))
          }
        } else if (style === 'horizontal-line') {
          const { left, right, top, bottom, count } = getModuleNeighbours(x, y, modules)

          if (count === 0 || (top && !(left || right)) || (bottom && !(left || right))) {
            ops.push(circle(baseX + lwOffset, baseY + lwOffset, lineWidth))
          } else if (left && right) {
            ops.push(rect(baseX, baseY + lwOffset, 1, lineWidth))
          } else if (left && !right) {
            ops.push(rightRounded(baseX, baseY, lineWidth))
          } else if (right && !left) {
            ops.push(leftRounded(baseX, baseY, lineWidth))
          }
        }
      }
    })
  })

  const paint = gradient ? `url(#${gradientId})` : color

  return (
    <path
      fill={paint}
      d={ops.join('')}
      shapeRendering={style === 'square' ? 'crispEdges' : 'geometricPrecision'}
      data-testid='data-modules'
    />
  )
}
