import { useId } from 'react'

import { BG_GRADIENT_ID, FRAME_MASK_ID, GRADIENT_ID } from '../constants'

export const useIds = () => {
  const uuid = useId()

  return {
    gradientId: `${GRADIENT_ID}-${uuid}`,
    bgGradientId: `${BG_GRADIENT_ID}-${uuid}`,
    frameMaskId: `${FRAME_MASK_ID}-${uuid}`,
  }
}
