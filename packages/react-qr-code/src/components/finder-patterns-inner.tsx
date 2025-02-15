import { type ReactNode, useMemo } from 'react'

import {
  DEFAULT_NUM_STAR_POINTS,
  FINDER_PATTERN_INNER_RADIUSES,
  FINDER_PATTERN_INNER_SIZE,
  FINDER_PATTERN_OUTER_ROTATIONS,
  FINDER_PATTERN_SIZE,
} from '../constants'
import type { FinderPatternsInnerProps } from '../types/utils'
import {
  finderPatternsInnerInOutPoint,
  finderPatternsInnerLeaf,
} from '../utils/finder-patterns-inner'
import { sanitizeFinderPatternInnerSettings } from '../utils/settings'
import { hashtag, heart, pinchedSquare, star } from '../utils/svg'

const testProps = {
  'data-testid': 'finder-patterns-inner',
}

export const FinderPatternsInner = ({
  modules,
  margin,
  settings,
  gradient,
  gradientId,
}: FinderPatternsInnerProps): ReactNode => {
  const { color, style } = useMemo(
    () => sanitizeFinderPatternInnerSettings(settings),
    [settings],
  )
  const fill = gradient ? `url(#${gradientId})` : color

  const coordinates = useMemo(
    () => [
      { x: margin + 2, y: margin + 2 },
      { x: modules.length + margin - FINDER_PATTERN_SIZE + 2, y: margin + 2 },
      { x: margin + 2, y: modules.length + margin - FINDER_PATTERN_SIZE + 2 },
    ],
    [margin, modules.length],
  )

  const key = (x: number, y: number) => `finder-patterns-inner-${style}-${x}-${y}`

  if (
    style === 'rounded-sm' ||
    style === 'rounded' ||
    style === 'rounded-lg' ||
    style === 'circle' ||
    style === 'square'
  ) {
    return coordinates.map((coordinate) => {
      const { x, y } = coordinate
      return (
        <rect
          key={key(x, y)}
          x={x}
          y={y}
          width={FINDER_PATTERN_INNER_SIZE}
          height={FINDER_PATTERN_INNER_SIZE}
          fill={fill}
          rx={FINDER_PATTERN_INNER_RADIUSES[style]}
          {...testProps}
        />
      )
    })
  }

  if (style === 'pinched-square') {
    return coordinates.map((coordinate) => {
      const { x, y } = coordinate
      const path = pinchedSquare(x, y, FINDER_PATTERN_INNER_SIZE, 0.25)
      return <path key={key(x, y)} fill={fill} d={path} {...testProps} />
    })
  }

  if (style === 'diamond') {
    return coordinates.map((coordinate) => {
      const { x, y } = coordinate
      const sizeDiff = Math.sqrt(1.5)
      const size = FINDER_PATTERN_INNER_SIZE / sizeDiff
      const posDiff = size - size / sizeDiff
      return (
        <rect
          key={key(x, y)}
          x={x + posDiff / 2}
          y={y + posDiff / 2}
          width={size}
          height={size}
          fill={fill}
          style={{
            transform: `rotate(${45}deg)`,
            transformOrigin: 'center',
            transformBox: 'fill-box',
          }}
          {...testProps}
        />
      )
    })
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
        ? finderPatternsInnerLeaf
        : finderPatternsInnerInOutPoint
    return coordinates
      .map((coordinate, index) => ({
        ...coordinate,
        rotation: FINDER_PATTERN_OUTER_ROTATIONS[style][index],
      }))
      .map(({ x, y, rotation }) => {
        const path = pathFn({
          x,
          y,
          radius: FINDER_PATTERN_INNER_RADIUSES[style],
        })
        return (
          <path
            key={key(x, y)}
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

  if (style === 'heart') {
    return coordinates.map(({ x, y }) => {
      return (
        <path
          key={key(x, y)}
          fill={fill}
          d={heart(x, y, FINDER_PATTERN_INNER_SIZE)}
          {...testProps}
        />
      )
    })
  }

  if (style === 'star') {
    return coordinates.map(({ x, y }) => {
      const cx = x + FINDER_PATTERN_INNER_SIZE / 2
      const cy = y + FINDER_PATTERN_INNER_SIZE / 2
      const path = star(cx, cy, FINDER_PATTERN_INNER_SIZE * 1.2, DEFAULT_NUM_STAR_POINTS)
      return <path key={key(x, y)} fill={fill} d={path} {...testProps} />
    })
  }

  if (style === 'hashtag') {
    return coordinates.map(({ x, y }) => {
      const path = hashtag(x - 0.25, y - 0.25, 3.5)
      return <path key={key(x, y)} fill={fill} d={path} {...testProps} />
    })
  }
}
