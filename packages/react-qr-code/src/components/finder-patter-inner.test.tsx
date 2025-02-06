import { cleanup, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FINDER_PATTERN_INNER_SIZE, FINDER_PATTERN_OUTER_ROTATIONS } from '../constants'
import type { FinderPatternInnerStyle } from '../types/lib'
import * as finderPatternInnerUtils from '../utils/finder-patterns-inner'
import * as svgUtils from '../utils/svg'
import { FinderPatternsInner } from './finder-patterns-inner'

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

  it.each([['rounded-sm'], ['rounded'], ['rounded-lg'], ['circle'], ['square']])(
    'renders correctly with style %s',
    (style) => {
      render(
        <FinderPatternsInner
          {...defaultProps}
          settings={{ style: style as FinderPatternInnerStyle, color: '#ff0000' }}
        />,
      )
      const rects = screen.getAllByTestId('finder-patterns-inner')
      expect(rects).toHaveLength(3)
      rects.forEach((rect) => {
        expect(rect).toBeInTheDocument()
        expect(rect.getAttribute('width')).toBe(FINDER_PATTERN_INNER_SIZE.toString())
        expect(rect.getAttribute('height')).toBe(FINDER_PATTERN_INNER_SIZE.toString())
        expect(rect.getAttribute('fill')).toBe('#ff0000')
        expect(rect.style.transform).toBeFalsy()
      })
    },
  )

  it('renders correctly with style diamond', () => {
    const sizeDiff = Math.sqrt(1.5)
    const size = FINDER_PATTERN_INNER_SIZE / sizeDiff
    render(
      <FinderPatternsInner
        {...defaultProps}
        settings={{ style: 'diamond', color: '#ff0000' }}
      />,
    )
    const rects = screen.getAllByTestId('finder-patterns-inner')
    expect(rects).toHaveLength(3)
    rects.forEach((rect) => {
      expect(rect).toBeInTheDocument()
      expect(rect.getAttribute('width')).toBe(size.toString())
      expect(rect.getAttribute('height')).toBe(size.toString())
      expect(rect.getAttribute('fill')).toBe('#ff0000')
      expect(rect.style.transform).toBe('rotate(45deg)')
    })
  })

  it('calls the correct shape function based on style prop', () => {
    const stylesToMethods = {
      'inpoint-sm': 'finderPatternsInnerInOutPoint',
      inpoint: 'finderPatternsInnerInOutPoint',
      'inpoint-lg': 'finderPatternsInnerInOutPoint',
      'outpoint-sm': 'finderPatternsInnerInOutPoint',
      outpoint: 'finderPatternsInnerInOutPoint',
      'outpoint-lg': 'finderPatternsInnerInOutPoint',
      'leaf-sm': 'finderPatternsInnerLeaf',
      leaf: 'finderPatternsInnerLeaf',
      'leaf-lg': 'finderPatternsInnerLeaf',
    }

    Object.entries(stylesToMethods).forEach(([style, method]) => {
      const spy = vi.spyOn(
        finderPatternInnerUtils,
        method as keyof typeof finderPatternInnerUtils,
      )

      render(
        <FinderPatternsInner
          settings={{ style: style as FinderPatternInnerStyle, color: '#00ff00' }}
          {...defaultProps}
        />,
      )

      const paths = screen.getAllByTestId('finder-patterns-inner')
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

  it('renders correctly with style heart', () => {
    const spy = vi.spyOn(svgUtils, 'heart')
    render(
      <FinderPatternsInner
        {...defaultProps}
        settings={{ style: 'heart', color: '#ff0000' }}
      />,
    )
    const paths = screen.getAllByTestId('finder-patterns-inner')
    expect(paths).toHaveLength(3)
    paths.forEach((path) => {
      expect(spy).toHaveBeenCalled()
      expect(path.getAttribute('fill')).toBe('#ff0000')
    })
  })

  it('renders correctly with style star', () => {
    const spy = vi.spyOn(svgUtils, 'star')
    render(
      <FinderPatternsInner
        {...defaultProps}
        settings={{ style: 'star', color: '#ff0000' }}
      />,
    )
    const paths = screen.getAllByTestId('finder-patterns-inner')
    expect(paths).toHaveLength(3)
    paths.forEach((path) => {
      expect(spy).toHaveBeenCalled()
      expect(path.getAttribute('fill')).toBe('#ff0000')
    })
  })
})
