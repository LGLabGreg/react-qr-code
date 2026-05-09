import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CIRCUIT_BOARD_LINE_WIDTH, CIRCUIT_BOARD_PAD_RADIUS } from '../constants'
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
    gradientId: 'mock-gradient-id',
  }

  it('calls the correct shape function based on style prop', () => {
    const stylesToMethods = {
      square: 'square',
      circle: 'circle',
      diamond: 'diamond',
      heart: 'heart',
      star: 'star',
      hashtag: 'hashtag',
      'pinched-square': 'pinchedSquare',
    }

    Object.entries(stylesToMethods).forEach(([style, method]) => {
      const utils = ['heart', 'star', 'hashtag', 'pinched-square'].includes(style)
        ? svgUtils
        : dataModulesUtils
      const spy = vi.spyOn(utils, method as keyof typeof utils)

      render(
        <DataModules settings={{ style: style as DataModulesStyle }} {...defaultProps} />,
      )

      expect(spy).toHaveBeenCalled()
    })
  })

  it('renders circuit-board as traces with pads', () => {
    const modules = Array.from({ length: 10 }, () => Array(10).fill(false))
    modules[8][8] = true
    modules[8][9] = true
    modules[9][8] = true

    render(
      <DataModules
        modules={modules}
        margin={2}
        gradientId='mock-gradient-id'
        settings={{ style: 'circuit-board', color: '#ffdd99' }}
      />,
    )

    const group = screen.getByTestId('data-modules')
    const paths = group.querySelectorAll('path')

    expect(group.tagName.toLowerCase()).toBe('g')
    expect(group).toHaveAttribute('fill', '#ffdd99')
    expect(group).toHaveAttribute('stroke', '#ffdd99')
    expect(group).toHaveAttribute('stroke-width', CIRCUIT_BOARD_LINE_WIDTH.toString())
    expect(paths).toHaveLength(2)
    expect(paths[0]).toHaveAttribute('fill', 'none')
    expect(paths[0].getAttribute('d')).toContain('M10.5,10.5L11.5,10.5')
    expect(paths[0].getAttribute('d')).toContain('M10.5,10.5L10.5,11.5')
    expect(paths[1]).toHaveAttribute('stroke', 'none')
    const padPath = paths[1].getAttribute('d') ?? ''
    expect(padPath).toContain(
      dataModulesUtils.circuitBoardPad(11.5, 10.5, CIRCUIT_BOARD_PAD_RADIUS),
    )
    expect(padPath).toContain(
      dataModulesUtils.circuitBoardPad(10.5, 11.5, CIRCUIT_BOARD_PAD_RADIUS),
    )
    expect(padPath).not.toContain(
      dataModulesUtils.circuitBoardPad(10.5, 10.5, CIRCUIT_BOARD_PAD_RADIUS),
    )
  })

  it('renders standalone circuit-board modules as squares', () => {
    const modules = Array.from({ length: 10 }, () => Array(10).fill(false))
    modules[8][8] = true

    render(
      <DataModules
        modules={modules}
        margin={2}
        gradientId='mock-gradient-id'
        settings={{ style: 'circuit-board', color: '#ffdd99' }}
      />,
    )

    const group = screen.getByTestId('data-modules')
    const paths = group.querySelectorAll('path')

    expect(paths).toHaveLength(1)
    expect(paths[0]).toHaveAttribute('stroke', 'none')
    expect(paths[0]).toHaveAttribute('d', 'M10.125,10.125h0.75v0.75h-0.75Z')
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
