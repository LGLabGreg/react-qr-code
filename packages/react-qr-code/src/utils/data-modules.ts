import type { DataModulesStyle, Modules } from '../types/lib'
import type { DataModulesNeighbours } from '../types/utils'

export const dataModuleCanBeRandomSize = (style: DataModulesStyle): boolean =>
  style === 'square' ||
  style === 'circle' ||
  style === 'star' ||
  style === 'heart' ||
  style === 'diamond' ||
  style === 'hashtag'

export const getScaleFactor = (style: string, isRandom: boolean) => {
  if (style === 'square-sm') {
    return 0.75
  } else if (isRandom) {
    return Math.random() * (1 - 0.75) + 0.75
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

export const square = (x: number, y: number, size: number) =>
  `M${x},${y}h${size}v${size}h-${size}Z`

export const circle = (x: number, y: number, size: number) =>
  `M${x},${y + size / 2}a${size / 2},${size / 2} 0 1,0 ${size},0a${size / 2},${size / 2} 0 1,0 -${size},0Z`

export const diamond = (x: number, y: number, size: number) =>
  `M${x},${y + size / 2}l${size / 2},-${size / 2}l${size / 2},${size / 2}l-${size / 2},${size / 2}Z`

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
