import { useId } from 'react'

import { BG_GRADIENT_ID, GRADIENT_ID } from '../constants'

export const useIds = () => {
  const uuid = useId()

  return {
    gradientId: `${GRADIENT_ID}-${uuid}`,
    bgGradientId: `${BG_GRADIENT_ID}-${uuid}`,
  }
}
