import type {
  DataModulesSettings,
  FinderPatternInnerSettings,
  FinderPatternOuterSettings,
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
