import type { DataModulesStyle, Modules } from '../types/lib'
import type { DataModulesNeighbours } from '../types/utils'
import { isFinderPatternInnerModule } from './finder-patterns-inner'
import { isFinderPatternOuterModule } from './finder-patterns-outer'

export const dataModuleCanBeRandomSize = (style: DataModulesStyle): boolean =>
  style === 'square' ||
  style === 'pinched-square' ||
  style === 'circle' ||
  style === 'star' ||
  style === 'heart' ||
  style === 'diamond' ||
  style === 'hashtag'

export const getScaleFactor = (style: string, isRandom: boolean, size = 1) => {
  if (style === 'square-sm') {
    return 0.75
  } else if (isRandom) {
    return Math.random() * (1 - 0.75) + 0.75
  } else if (dataModuleCanBeRandomSize(style as DataModulesStyle)) {
    return size
  }
  return 1
}

export const getModuleNeighbours = (
  x: number,
  y: number,
  modules: Modules,
): DataModulesNeighbours => {
  const sides = {
    left: x === 0 ? false : modules[y][x - 1],
    right: x === modules[y].length - 1 ? false : modules[y][x + 1],
    top: y === 0 ? false : modules[y - 1][x],
    bottom: y === modules.length - 1 ? false : modules[y + 1][x],
  }

  return {
    ...sides,
    count: Object.values(sides).filter(Boolean).length,
  }
}

export const isRenderableDataModule = ({
  x,
  y,
  modules,
  numCells,
}: {
  x: number
  y: number
  modules: Modules
  numCells: number
}) => {
  return (
    y >= 0 &&
    y < modules.length &&
    x >= 0 &&
    x < modules[y].length &&
    modules[y][x] &&
    !isFinderPatternOuterModule({ x, y, numCells }) &&
    !isFinderPatternInnerModule({ x, y, numCells })
  )
}

export const getRenderableDataModuleNeighbours = (
  x: number,
  y: number,
  modules: Modules,
  numCells: number,
): DataModulesNeighbours => {
  const sides = {
    left: isRenderableDataModule({ x: x - 1, y, modules, numCells }),
    right: isRenderableDataModule({ x: x + 1, y, modules, numCells }),
    top: isRenderableDataModule({ x, y: y - 1, modules, numCells }),
    bottom: isRenderableDataModule({ x, y: y + 1, modules, numCells }),
  }

  return {
    ...sides,
    count: Object.values(sides).filter(Boolean).length,
  }
}

export const rect = (x: number, y: number, width: number, height: number) =>
  `M${x},${y}h${width}v${height}h${-width}Z`

export const square = (x: number, y: number, size: number) => rect(x, y, size, size)

export const circle = (x: number, y: number, size: number) =>
  `M${x},${y + size / 2}a${size / 2},${size / 2} 0 1,0 ${size},0a${size / 2},${size / 2} 0 1,0 -${size},0Z`

export const diamond = (x: number, y: number, size: number) =>
  `M${x},${y + size / 2}l${size / 2},-${size / 2}l${size / 2},${size / 2}l-${size / 2},${size / 2}Z`

// Wound clockwise (sweep-flag 1) so the pad fills correctly when combined
// in a single path with clockwise-wound trace rects under nonzero fill.
// Switching to circle() (counter-clockwise) would XOR the overlap and
// produce donut-shaped pads.
export const circuitBoardPad = (cx: number, cy: number, radius: number) =>
  `M${cx - radius},${cy}a${radius},${radius} 0 1,1 ${radius * 2},0a${radius},${radius} 0 1,1 ${-radius * 2},0Z`

export const circuitBoardShouldDrawPad = ({ count }: DataModulesNeighbours) => count === 1

export const topRightRounded = (x: number, y: number) =>
  `M ${x} ${y} 
   v 1 
   h 1 
   v -0.5 
   a 0.5 0.5, 0, 0, 0, -0.5 -0.5`

export const topLeftRounded = (x: number, y: number) =>
  `M ${x + 1} ${y} 
   v 1 
   h -1 
   v -0.5 
   a 0.5 0.5, 0, 0, 1, 0.5 -0.5`

export const bottomRightRounded = (x: number, y: number) =>
  `M ${x} ${y} 
   v 1 
   h 0.5 
   a 0.5 0.5, 0, 0, 0, 0.5 -0.5
   v -0.5
   h -1`

export const bottomLeftRounded = (x: number, y: number) =>
  `M ${x + 1} ${y} 
   v 1 
   h -0.5 
   a 0.5 0.5, 0, 0, 1, -0.5 -0.5 
   v -0.5 
   h 1`

export const rightRounded = (x: number, y: number) =>
  `M ${x} ${y} 
   v 1 
   h 0.5 
   a 0.5 0.5, 0, 0, 0, 0 -1`

export const leftRounded = (x: number, y: number) =>
  `M ${x + 1} ${y} 
   v 1 
   h -0.5 
   a 0.5 0.5, 0, 0, 1, 0 -1`

export const topRounded = (x: number, y: number) =>
  `M ${x} ${y + 1} 
   h 1 
   v -0.5 
   a 0.5 0.5, 0, 0, 0, -1 0`

export const bottomRounded = (x: number, y: number) =>
  `M ${x} ${y} 
   h 1 
   v 0.5 
   a 0.5 0.5, 0, 0, 1, -1 0`

export const leaf = (x: number, y: number, size: number) => {
  return (
    `M ${x + 1} ${y}` +
    `h -${size / 2}` +
    `a ${size / 2.5} ${size / 2.5}, 0, 0, 0, ${-size / 2.5} ${size / 2.5}` +
    `v ${size / 2}` +
    `h ${size / 2}` +
    `a ${size / 2.5} ${size / 2.5}, 0, 0, 0, ${size / 2.5} ${-size / 2.5}`
  )
}
