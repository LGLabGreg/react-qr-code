import { Defs, LinearGradient, RadialGradient, Stop } from '../platform/primitives'
import type { GradientSettings } from '../types/lib'
import { calculateGradientVectors } from '../utils/svg'

interface GradientProps {
  gradient?: GradientSettings
  gradientId: string
}

export const Gradient = ({ gradient, gradientId }: GradientProps) => {
  if (!gradient) {
    return null
  }

  const vectors = calculateGradientVectors(gradient?.rotation || 0)

  return (
    <Defs>
      {gradient.type === 'linear' ? (
        <LinearGradient id={gradientId} gradientUnits='userSpaceOnUse' {...vectors}>
          {gradient.stops?.map((stop, index) => (
            <Stop key={index} offset={stop.offset} stopColor={stop.color} />
          ))}
        </LinearGradient>
      ) : (
        <RadialGradient
          id={gradientId}
          gradientUnits='userSpaceOnUse'
          cx='50%'
          cy='50%'
          r='50%'
        >
          {gradient.stops?.map((stop, index) => (
            <Stop key={index} offset={stop.offset} stopColor={stop.color} />
          ))}
        </RadialGradient>
      )}
    </Defs>
  )
}
