import { describe, expect, it } from 'vitest'

import { sanitizeDataModulesSettings } from './settings'

describe('sanitizeDataModulesSettings lineWidth', () => {
  it('defaults to 1 for line and rounded styles', () => {
    expect(sanitizeDataModulesSettings({ style: 'vertical-line' }).lineWidth).toBe(1)
    expect(sanitizeDataModulesSettings({ style: 'horizontal-line' }).lineWidth).toBe(1)
    expect(sanitizeDataModulesSettings({ style: 'rounded' }).lineWidth).toBe(1)
  })

  it('defaults to 0.5 for circuit-board', () => {
    expect(sanitizeDataModulesSettings({ style: 'circuit-board' }).lineWidth).toBe(0.5)
  })

  it('passes through an explicitly provided lineWidth', () => {
    expect(
      sanitizeDataModulesSettings({ style: 'vertical-line', lineWidth: 0.8 }).lineWidth,
    ).toBe(0.8)
    expect(
      sanitizeDataModulesSettings({ style: 'circuit-board', lineWidth: 0.3 }).lineWidth,
    ).toBe(0.3)
  })
})
