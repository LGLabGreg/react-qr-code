import type { DataModulesStyle } from '../types/lib'

export const dataModuleCanBeRandomSize = (style: DataModulesStyle): boolean =>
  style === 'square' ||
  style === 'circle' ||
  style === 'star' ||
  style === 'heart' ||
  style === 'diamond'
