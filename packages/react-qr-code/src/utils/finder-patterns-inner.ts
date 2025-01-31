import { FINDER_PATTERN_INNER_MASK, FINDER_PATTERN_INNER_SIZE } from '../constants'
import type { FilterFnProps } from '../types/utils'

export const isFinderPatternInnerModule = ({
  x,
  y,
  numCells,
}: FilterFnProps): boolean => {
  if (
    FINDER_PATTERN_INNER_MASK[x]?.[y] ||
    FINDER_PATTERN_INNER_MASK[x - numCells + 7]?.[y] ||
    FINDER_PATTERN_INNER_MASK[x]?.[y - numCells + 7]
  ) {
    return true
  }
  return false
}

export const finderPatternsInnerLeaf = ({
  x,
  y,
  radius,
}: {
  x: number
  y: number
  radius: number
}) => {
  const size = FINDER_PATTERN_INNER_SIZE - radius
  const arc = radius / 2
  const arcSize = FINDER_PATTERN_INNER_SIZE - arc
  return (
    `M ${x} ${y + arc}` +
    `v ${size}` +
    `a ${arc} ${arc}, 0, 0, 0, ${arc} ${arc}` +
    `h ${arcSize}` +
    `v ${-arcSize}` +
    `a ${arc} ${arc}, 0, 0, 0, ${-arc} ${-arc}` +
    `h ${-size}` +
    `H ${x}` +
    'z'
  )
}

export const finderPatternsInnerInOutPoint = ({
  x,
  y,
  radius,
}: {
  x: number
  y: number
  radius: number
}) => {
  const size = FINDER_PATTERN_INNER_SIZE - radius
  const arc = radius / 2
  const arcSize = FINDER_PATTERN_INNER_SIZE - arc
  return (
    `M ${x} ${y + arc}` +
    `v ${size}` +
    `a ${arc} ${arc}, 0, 0, 0, ${arc} ${arc}` +
    `h ${arcSize}` +
    `v ${-arcSize}` +
    `a ${arc} ${arc}, 0, 0, 0, ${-arc} ${-arc}` +
    `h ${-size}` +
    `a ${arc} ${arc}, 0, 0, 0, ${-arc} ${arc}`
  )
}
