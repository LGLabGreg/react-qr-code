import { render } from '@testing-library/react'
import { expect, test } from 'vitest'

import { ReactQRCode } from './react-qr-code'

test('renders QR code component', () => {
  const result = render(<ReactQRCode value='test' />)
  expect(result.container).toBeInTheDocument()
  expect(result).toMatchSnapshot()
})
