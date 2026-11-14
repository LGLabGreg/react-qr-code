import {
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
  testId,
} from '../platform/primitives'
import type { BackgroundSettings } from '../types/lib'
import { calculateGradientVectors } from '../utils/svg'

interface BackgroundProps {
  background?: BackgroundSettings
  bgGradientId: string
  numCells: number
}

const testProps = testId('background')

export const Background = ({ background, bgGradientId, numCells }: BackgroundProps) => {
  if (!background) {
    return null
  }

  if (typeof background === 'string') {
    return (
      <Path fill={background} d={`M0,0 h${numCells}v${numCells}H0z`} {...testProps} />
    )
  }

  const vectors = calculateGradientVectors(background?.rotation || 0)

  return (
    <>
      <Defs>
        {background.type === 'linear' ? (
          <LinearGradient id={bgGradientId} gradientUnits='userSpaceOnUse' {...vectors}>
            {background.stops?.map((stop, index) => (
              <Stop key={index} offset={stop.offset} stopColor={stop.color} />
            ))}
          </LinearGradient>
        ) : (
          <RadialGradient
            id={bgGradientId}
            gradientUnits='userSpaceOnUse'
            cx='50%'
            cy='50%'
            r='50%'
          >
            {background.stops?.map((stop, index) => (
              <Stop key={index} offset={stop.offset} stopColor={stop.color} />
            ))}
          </RadialGradient>
        )}
      </Defs>
      <Path
        fill={`url(#${bgGradientId})`}
        d={`M0,0 h${numCells}v${numCells}H0z`}
        {...testProps}
      />
    </>
  )
}
