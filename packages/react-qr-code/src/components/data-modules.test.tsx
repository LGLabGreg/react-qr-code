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

    const path = screen.getByTestId('data-modules')

    expect(path.tagName.toLowerCase()).toBe('path')
    expect(path).toHaveAttribute('fill', '#ffdd99')
    expect(path).not.toHaveAttribute('stroke')
    const d = path.getAttribute('d') ?? ''
    const traceHalf = CIRCUIT_BOARD_LINE_WIDTH / 2
    const traceLength = 1 + CIRCUIT_BOARD_LINE_WIDTH
    expect(d).toContain(
      dataModulesUtils.rect(
        10.5 - traceHalf,
        10.5 - traceHalf,
        traceLength,
        CIRCUIT_BOARD_LINE_WIDTH,
      ),
    )
    expect(d).toContain(
      dataModulesUtils.rect(
        10.5 - traceHalf,
        10.5 - traceHalf,
        CIRCUIT_BOARD_LINE_WIDTH,
        traceLength,
      ),
    )
    expect(d).toContain(
      dataModulesUtils.circuitBoardPad(11.5, 10.5, CIRCUIT_BOARD_PAD_RADIUS),
    )
    expect(d).toContain(
      dataModulesUtils.circuitBoardPad(10.5, 11.5, CIRCUIT_BOARD_PAD_RADIUS),
    )
    expect(d).not.toContain(
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

    const path = screen.getByTestId('data-modules')

    expect(path.tagName.toLowerCase()).toBe('path')
    expect(path).toHaveAttribute('d', 'M10.125,10.125h0.75v0.75h-0.75Z')
  })

  it('fully covers the cell centre at circuit-board junctions', () => {
    // Junction cell at (8,8) with neighbours at (7,8), (9,8), (8,7), (8,9):
    // it has top+left+right+bottom = count 4 but draws no traces itself
    // (only right/bottom). The incoming traces from each neighbour must
    // collectively fill the cell centre or a white notch appears.
    const modules = Array.from({ length: 12 }, () => Array(12).fill(false))
    modules[7][8] = true
    modules[8][7] = true
    modules[8][8] = true
    modules[8][9] = true
    modules[9][8] = true

    render(
      <DataModules
        modules={modules}
        margin={2}
        gradientId='mock-gradient-id'
        settings={{ style: 'circuit-board', color: '#000000' }}
      />,
    )

    const d = screen.getByTestId('data-modules').getAttribute('d') ?? ''
    const traceHalf = CIRCUIT_BOARD_LINE_WIDTH / 2
    const traceLength = 1 + CIRCUIT_BOARD_LINE_WIDTH

    // Incoming horizontal trace from cell (8,7), centre (9.5, 10.5):
    // must extend past its own end (10.5) by traceHalf so the junction
    // cell's centre is covered from the left.
    expect(d).toContain(
      dataModulesUtils.rect(
        9.5 - traceHalf,
        10.5 - traceHalf,
        traceLength,
        CIRCUIT_BOARD_LINE_WIDTH,
      ),
    )
    // Incoming vertical trace from cell (7,8), centre (10.5, 9.5):
    // covers the junction from above.
    expect(d).toContain(
      dataModulesUtils.rect(
        10.5 - traceHalf,
        9.5 - traceHalf,
        CIRCUIT_BOARD_LINE_WIDTH,
        traceLength,
      ),
    )
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
