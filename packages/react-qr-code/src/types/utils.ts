import { type RefObject } from 'react'

import type {
  CrossOrigin,
  DataModulesSettings,
  DownloadFileFormat,
  Excavation,
  FinderPatternInnerSettings,
  FinderPatternOuterSettings,
  GradientSettings,
  ImageSettings,
  Modules,
} from './lib'

export interface FilterFnProps {
  x: number
  y: number
  numCells: number
}

export interface GeneratePathFnProps {
  modules: Modules
  margin: number
  gradient?: GradientSettings
}

export interface FinderPatternsOuterProps extends GeneratePathFnProps {
  settings?: FinderPatternOuterSettings
}

export interface FinderPatternsInnerProps extends GeneratePathFnProps {
  settings?: FinderPatternInnerSettings
}

export interface DataModulesProps extends GeneratePathFnProps {
  settings?: DataModulesSettings
}

export interface DataModulesNeighbours {
  left: boolean
  right: boolean
  top: boolean
  bottom: boolean
  count: number
}

export interface DownloadSVGProps {
  svgRef: RefObject<SVGSVGElement | null>
  fileSize: number
  fileName: string
}

export interface DownloadRasterProps {
  svgRef: RefObject<SVGSVGElement | null>
  fileSize: number
  fileName: string
  imageSettings: ImageSettings | undefined
  calculatedImageSettings: CalculatedImageSettings | null
  fileFormat: DownloadFileFormat
  size: number
  numCells: number
  margin: number
}

export interface CalculatedImageSettings {
  x: number
  y: number
  h: number
  w: number
  excavation: Excavation | null
  opacity: number
  crossOrigin: CrossOrigin
}
