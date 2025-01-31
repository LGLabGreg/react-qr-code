import { type ReactNode, useCallback, useMemo } from 'react'

import type { DataModulesProps } from '../types/utils'
import { dataModuleCanBeRandomSize } from '../utils/data-modules'
import { isFinderPatternInnerModule } from '../utils/finder-patterns-inner'
import { isFinderPatternOuterModule } from '../utils/finder-patterns-outer'
import { sanitizeDataModulesSettings } from '../utils/settings'

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
          ops.push(`M${xPos},${yPos}h${size}v${size}h-${size}Z`)
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
