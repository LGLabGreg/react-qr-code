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
    gradientId: 'mock-gradient-id',
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

  it('renders correctly with style pinched-square', () => {
    render(
      <FinderPatternsOuter
        {...defaultProps}
        settings={{ style: 'pinched-square', color: '#ff0000' }}
      />,
    )
    const paths = screen.getAllByTestId('finder-patterns-outer')
    expect(paths).toHaveLength(1)
    expect(paths[0].getAttribute('fill')).toBe('#ff0000')
    expect(paths[0].getAttribute('d')).toBe(
      'M 2 2Q 2.5 5.5, 2 9Q 5.5 8.5, 9 9Q 8.5 5.5, 9 2Q 5.5 2.5, 2 2zM 3 3Q 5.5 3.25, 8 3Q 7.75 5.5, 8 8Q 5.5 7.75, 3 8Q 3.25 5.5, 3 3zM -2 2Q -1.5 5.5, -2 9Q 1.5 8.5, 5 9Q 4.5 5.5, 5 2Q 1.5 2.5, -2 2zM -1 3Q 1.5 3.25, 4 3Q 3.75 5.5, 4 8Q 1.5 7.75, -1 8Q -0.75 5.5, -1 3zM 2 -2Q 2.5 1.5, 2 5Q 5.5 4.5, 9 5Q 8.5 1.5, 9 -2Q 5.5 -1.5, 2 -2zM 3 -1Q 5.5 -0.75, 8 -1Q 7.75 1.5, 8 4Q 5.5 3.75, 3 4Q 3.25 1.5, 3 -1z',
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
