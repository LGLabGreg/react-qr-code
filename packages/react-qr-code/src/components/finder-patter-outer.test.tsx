import { cleanup, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FINDER_PATTERN_OUTER_ROTATIONS } from '../constants'
import type { FinderPatternOuterStyle } from '../types/lib'
import * as finderPatternOuterUtils from '../utils/finder-patterns-outer'
import { FinderPatternsOuter } from './finder-patterns-outer'

describe('DataModules', () => {
  const mockModules = [
    [true, false, true],
    [false, true, false],
    [true, false, true],
  ]

  const defaultProps = {
    modules: mockModules,
    margin: 2,
  }

  it.each([['rounded-sm', 'rounded', 'rounded-lg']])(
    'renders correctly with style %s',
    (style) => {
      const spy = vi.spyOn(finderPatternOuterUtils, 'finderPatternsOuterRoundedSquare')
      render(
        <FinderPatternsOuter
          {...defaultProps}
          settings={{ style: style as FinderPatternOuterStyle, color: '#ff0000' }}
        />,
      )
      const paths = screen.getAllByTestId('finder-patterns-outer')
      expect(paths).toHaveLength(1)
      paths.forEach((path) => {
        expect(spy).toHaveBeenCalledTimes(3)
        expect(path.getAttribute('fill')).toBe('#ff0000')
      })
    },
  )

  it('renders correctly with style circle', () => {
    render(
      <FinderPatternsOuter
        {...defaultProps}
        settings={{ style: 'circle', color: '#ff0000' }}
      />,
    )
    const paths = screen.getAllByTestId('finder-patterns-outer')
    expect(paths).toHaveLength(1)
    expect(paths[0].getAttribute('fill')).toBe('#ff0000')
    expect(paths[0].getAttribute('d')).toBe(
      'M 5.5 2a 3.5 3.5 0 1 0 0.01 0zzm 0 1a 2.5 2.5 0 1 1 -0.01 0ZM 1.5 2a 3.5 3.5 0 1 0 0.01 0zzm 0 1a 2.5 2.5 0 1 1 -0.01 0ZM 5.5 -2a 3.5 3.5 0 1 0 0.01 0zzm 0 1a 2.5 2.5 0 1 1 -0.01 0Z',
    )
  })

  it('renders correctly with style square', () => {
    render(
      <FinderPatternsOuter
        {...defaultProps}
        settings={{ style: 'square', color: '#ff0000' }}
      />,
    )
    const paths = screen.getAllByTestId('finder-patterns-outer')
    expect(paths).toHaveLength(1)
    expect(paths[0].getAttribute('fill')).toBe('#ff0000')
    expect(paths[0].getAttribute('d')).toBe(
      'M 2 2v 7h 7v -7zM 3 3h 5v 5h -5zM -2 2v 7h 7v -7zM -1 3h 5v 5h -5zM 2 -2v 7h 7v -7zM 3 -1h 5v 5h -5z',
    )
  })

  it('calls the correct shape function based on style prop', () => {
    const stylesToMethods = {
      'inpoint-sm': 'finderPatternsOuterInOutPoint',
      inpoint: 'finderPatternsOuterInOutPoint',
      'inpoint-lg': 'finderPatternsOuterInOutPoint',
      'outpoint-sm': 'finderPatternsOuterInOutPoint',
      outpoint: 'finderPatternsOuterInOutPoint',
      'outpoint-lg': 'finderPatternsOuterInOutPoint',
      'leaf-sm': 'finderPatternsOuterLeaf',
      leaf: 'finderPatternsOuterLeaf',
      'leaf-lg': 'finderPatternsOuterLeaf',
    }

    Object.entries(stylesToMethods).forEach(([style, method]) => {
      const spy = vi.spyOn(
        finderPatternOuterUtils,
        method as keyof typeof finderPatternOuterUtils,
      )

      render(
        <FinderPatternsOuter
          settings={{ style: style as FinderPatternOuterStyle, color: '#00ff00' }}
          {...defaultProps}
        />,
      )

      const paths = screen.getAllByTestId('finder-patterns-outer')
      paths.forEach((path, index) => {
        const rotation =
          FINDER_PATTERN_OUTER_ROTATIONS[style as keyof typeof stylesToMethods][index]
        expect(path.getAttribute('fill')).toBe('#00ff00')
        expect(path.style.transform).toBe(`rotate(${rotation}deg)`)
      })

      expect(spy).toHaveBeenCalled()
      cleanup()
    })
  })
})
