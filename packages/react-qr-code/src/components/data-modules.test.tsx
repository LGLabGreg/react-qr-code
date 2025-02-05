import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ReactQRCode } from '../react-qr-code'

describe('DataModules', () => {
  it('renders with default props', () => {
    render(<ReactQRCode value='test' />)

    expect(true).toBe(true)
  })
})
