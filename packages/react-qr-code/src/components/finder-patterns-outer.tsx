import { type ReactNode, useMemo } from 'react'

import {
  FINDER_PATTERN_OUTER_RADIUSES,
  FINDER_PATTERN_OUTER_ROTATIONS,
  FINDER_PATTERN_SIZE,
  GRADIENT_ID,
} from '../constants'
import type { FinderPatternsOuterProps } from '../types/utils'
import {
  finderPatternsOuterInOutPoint,
  finderPatternsOuterLeaf,
  finderPatternsOuterRoundedSquare,
} from '../utils/finder-patterns-outer'
import { sanitizeFinderPatternOuterSettings } from '../utils/settings'

const testProps = {
  'data-testid': 'finder-patterns-outer',
}

export const FinderPatternsOuter = ({
  modules,
  margin,
  settings,
  gradient,
}: FinderPatternsOuterProps): ReactNode => {
  const { style, color } = useMemo(
    () => sanitizeFinderPatternOuterSettings(settings),
    [settings],
  )
  const fill = gradient ? `url(#${GRADIENT_ID})` : color

  const ops: Array<string> = []

  const coordinates = useMemo(
    () => [
      { x: margin, y: margin },
      { x: modules.length + margin - FINDER_PATTERN_SIZE, y: margin },
      { x: margin, y: modules.length + margin - FINDER_PATTERN_SIZE },
    ],
    [margin, modules.length],
  )

  if (
    [
      'rounded-sm',
      'rounded',
      'rounded-lg',
      'circle',
      'square',
      'pinched-square',
    ].includes(style)
  ) {
    for (const coordinate of coordinates) {
      const { x, y } = coordinate
      if (style === 'rounded-sm' || style === 'rounded' || style === 'rounded-lg') {
        ops.push(
          finderPatternsOuterRoundedSquare({
            x,
            y,
            radius: FINDER_PATTERN_OUTER_RADIUSES[style],
          }),
        )
      } else if (style === 'circle') {
        ops.push(
          `M ${x + FINDER_PATTERN_SIZE / 2} ${y}` +
            `a ${FINDER_PATTERN_SIZE / 2} ${FINDER_PATTERN_SIZE / 2} 0 1 0 0.01 0z` +
            'z' +
            'm 0 1' +
            `a ${FINDER_PATTERN_SIZE / 2 - 1} ${
              FINDER_PATTERN_SIZE / 2 - 1
            } 0 1 1 -0.01 0` +
            'Z',
        )
      } else if (style === 'pinched-square') {
        ops.push(
          `M ${x} ${y}` +
            `Q ${x + 0.5} ${y + FINDER_PATTERN_SIZE / 2}, ${x} ${y + FINDER_PATTERN_SIZE}` +
            `Q ${x + FINDER_PATTERN_SIZE / 2} ${y + FINDER_PATTERN_SIZE - 0.5}, ${x + FINDER_PATTERN_SIZE} ${y + FINDER_PATTERN_SIZE}` +
            `Q ${x + FINDER_PATTERN_SIZE - 0.5} ${y + FINDER_PATTERN_SIZE / 2}, ${x + FINDER_PATTERN_SIZE} ${y}` +
            `Q ${x + FINDER_PATTERN_SIZE / 2} ${y + 0.5}, ${x} ${y}` +
            'z' +
            `M ${x + 1} ${y + 1}` +
            `Q ${x + FINDER_PATTERN_SIZE / 2} ${y + 1.25}, ${x + FINDER_PATTERN_SIZE - 1} ${y + 1}` +
            `Q ${x + FINDER_PATTERN_SIZE - 1.25} ${y + FINDER_PATTERN_SIZE / 2}, ${x + FINDER_PATTERN_SIZE - 1} ${y + FINDER_PATTERN_SIZE - 1}` +
            `Q ${x + FINDER_PATTERN_SIZE / 2} ${y + FINDER_PATTERN_SIZE - 1.25}, ${x + 1} ${y + FINDER_PATTERN_SIZE - 1}` +
            `Q ${x + 1.25} ${y + FINDER_PATTERN_SIZE / 2}, ${x + 1} ${y + 1}` +
            'z',
        )
      } else {
        ops.push(
          `M ${x} ${y}` +
            `v ${FINDER_PATTERN_SIZE}` +
            `h ${FINDER_PATTERN_SIZE}` +
            `v ${-FINDER_PATTERN_SIZE}` +
            'z' +
            `M ${x + 1} ${y + 1}` +
            `h ${FINDER_PATTERN_SIZE - 2}` +
            `v ${FINDER_PATTERN_SIZE - 2}` +
            `h ${-FINDER_PATTERN_SIZE + 2}` +
            'z',
        )
      }
    }
    return <path fill={fill} d={ops.join('')} {...testProps} />
  }

  if (
    style === 'inpoint-sm' ||
    style === 'inpoint' ||
    style === 'inpoint-lg' ||
    style === 'outpoint-sm' ||
    style === 'outpoint' ||
    style === 'outpoint-lg' ||
    style === 'leaf-sm' ||
    style === 'leaf' ||
    style === 'leaf-lg'
  ) {
    const pathFn =
      style === 'leaf-sm' || style === 'leaf' || style === 'leaf-lg'
        ? finderPatternsOuterLeaf
        : finderPatternsOuterInOutPoint
    return coordinates
      .map((coordinate, index) => ({
        ...coordinate,
        rotation: FINDER_PATTERN_OUTER_ROTATIONS[style][index],
      }))
      .map(({ x, y, rotation }) => {
        const path = pathFn({
          x,
          y,
          radius: FINDER_PATTERN_OUTER_RADIUSES[style],
        })
        return (
          <path
            key={`finder-patterns-outer-${style}-${x}-${y}`}
            fill={fill}
            d={path}
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
            {...testProps}
          />
        )
      })
  }
}
