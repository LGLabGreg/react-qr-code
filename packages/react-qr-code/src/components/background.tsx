import { BG_GRADIENT_ID } from '../constants'
import type { BackgroundSettings } from '../types/lib'
import { calculateGradientVectors } from '../utils/svg'

interface BackgroundProps {
  background?: BackgroundSettings
  numCells: number
}

const testProps = {
  'data-testid': 'background',
}

export const Background = ({ background, numCells }: BackgroundProps) => {
  if (!background) {
    return null
  }

  if (typeof background === 'string') {
    return (
      <path fill={background} d={`M0,0 h${numCells}v${numCells}H0z`} {...testProps} />
    )
  }

  const vectors = calculateGradientVectors(background?.rotation || 0)

  return (
    <>
      <defs>
        {background.type === 'linear' ? (
          <linearGradient id={BG_GRADIENT_ID} gradientUnits='userSpaceOnUse' {...vectors}>
            {background.stops?.map((stop, index) => (
              <stop key={index} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        ) : (
          <radialGradient
            id={BG_GRADIENT_ID}
            gradientUnits='userSpaceOnUse'
            cx='50%'
            cy='50%'
            r='50%'
          >
            {background.stops?.map((stop, index) => (
              <stop key={index} offset={stop.offset} stopColor={stop.color} />
            ))}
          </radialGradient>
        )}
      </defs>
      <path
        fill={`url(#${BG_GRADIENT_ID})`}
        d={`M0,0 h${numCells}v${numCells}H0z`}
        {...testProps}
      />
    </>
  )
}
