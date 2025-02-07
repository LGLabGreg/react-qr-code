import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
  dataModulesHorizontalLineNeighbours,
  dataModulesLeafNeighbours,
  dataModulesRoundedNeighbours,
  dataModulesVerticalLineNeighbours,
} from '../test/data-modules-neightbours'
import type { DataModulesStyle } from '../types/lib'
import type { DataModulesNeighbours } from '../types/utils'
import * as dataModulesUtils from '../utils/data-modules'
import * as svgUtils from '../utils/svg'
import { DataModules } from './data-modules'

describe('DataModules', () => {
  const mockModules = [
    [true, false, true],
    [false, true, false],
    [true, false, true],
  ]

  const getModuleNeighboursSpy = vi.spyOn(dataModulesUtils, 'getModuleNeighbours')

  const defaultProps = {
    modules: mockModules,
    margin: 2,
  }

  it('calls the correct shape function based on style prop', () => {
    const stylesToMethods = {
      square: 'square',
      circle: 'circle',
      diamond: 'diamond',
      heart: 'heart',
      star: 'star',
    }

    Object.entries(stylesToMethods).forEach(([style, method]) => {
      const utils = style === 'heart' || style === 'star' ? svgUtils : dataModulesUtils
      const spy = vi.spyOn(utils, method as keyof typeof utils)

      render(
        <DataModules settings={{ style: style as DataModulesStyle }} {...defaultProps} />,
      )

      expect(spy).toHaveBeenCalled()
    })
  })

  it.each(dataModulesRoundedNeighbours)(
    `with neighbours %j calls the correct shape function %s for style rounded`,
    (neighbours, method) => {
      getModuleNeighboursSpy.mockImplementation(() => neighbours as DataModulesNeighbours)
      const methodSpy = vi.spyOn(
        dataModulesUtils,
        method as keyof typeof dataModulesUtils,
      )

      render(<DataModules settings={{ style: 'rounded' }} {...defaultProps} />)

      expect(methodSpy).toHaveBeenCalled()
    },
  )

  it.each(dataModulesLeafNeighbours)(
    `with neighbours %j calls the correct shape function %s for style leaf`,
    (neighbours, method) => {
      getModuleNeighboursSpy.mockImplementation(() => neighbours as DataModulesNeighbours)
      const methodSpy = vi.spyOn(
        dataModulesUtils,
        method as keyof typeof dataModulesUtils,
      )

      render(<DataModules settings={{ style: 'leaf' }} {...defaultProps} />)

      expect(methodSpy).toHaveBeenCalled()
    },
  )

  it.each(dataModulesVerticalLineNeighbours)(
    `with neighbours %j calls the correct shape function %s for style leaf`,
    (neighbours, method) => {
      getModuleNeighboursSpy.mockImplementation(() => neighbours as DataModulesNeighbours)
      const methodSpy = vi.spyOn(
        dataModulesUtils,
        method as keyof typeof dataModulesUtils,
      )

      render(<DataModules settings={{ style: 'vertical-line' }} {...defaultProps} />)

      expect(methodSpy).toHaveBeenCalled()
    },
  )

  it.each(dataModulesHorizontalLineNeighbours)(
    `with neighbours %j calls the correct shape function %s for style leaf`,
    (neighbours, method) => {
      getModuleNeighboursSpy.mockImplementation(() => neighbours as DataModulesNeighbours)
      const methodSpy = vi.spyOn(
        dataModulesUtils,
        method as keyof typeof dataModulesUtils,
      )

      render(<DataModules settings={{ style: 'horizontal-line' }} {...defaultProps} />)

      expect(methodSpy).toHaveBeenCalled()
    },
  )
})
