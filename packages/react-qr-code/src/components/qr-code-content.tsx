import { DEFAULT_BGCOLOR } from '../constants'
import { G, Rect, SvgImage, imageCrossOrigin, testId } from '../platform/primitives'
import type { ReactQRCodeProps } from '../types/lib'
import type { Modules } from '../types/lib'
import type { CalculatedImageSettings } from '../types/utils'
import type { FrameLayout } from '../utils/frame'
import { excavateModules } from '../utils/qr-code'
import { Background } from './background'
import { DataModules } from './data-modules'
import { FinderPatternsInner } from './finder-patterns-inner'
import { FinderPatternsOuter } from './finder-patterns-outer'
import { FrameBack, FrameLabel } from './frame'
import { Gradient } from './gradient'

interface QRCodeContentProps extends Pick<
  ReactQRCodeProps,
  | 'background'
  | 'gradient'
  | 'finderPatternOuterSettings'
  | 'finderPatternInnerSettings'
  | 'dataModulesSettings'
  | 'imageSettings'
  | 'frameSettings'
> {
  cells: Modules
  margin: number
  numCells: number
  calculatedImageSettings: CalculatedImageSettings | null
  frameLayout: FrameLayout | null
  /** Rendered pixels per viewBox unit. */
  pixelsPerUnit: number
  gradientId: string
  bgGradientId: string
  frameMaskId: string
}

/**
 * Everything drawn inside the root `<svg>`. Shared by the web and React Native
 * builds, which only differ in the root element and what the ref exposes.
 */
export const QRCodeContent = ({
  background,
  gradient,
  finderPatternOuterSettings,
  finderPatternInnerSettings,
  dataModulesSettings,
  imageSettings,
  frameSettings,
  cells,
  margin,
  numCells,
  calculatedImageSettings,
  frameLayout,
  pixelsPerUnit,
  gradientId,
  bgGradientId,
  frameMaskId,
}: QRCodeContentProps) => {
  let modules = cells
  let image = null
  if (imageSettings != null && calculatedImageSettings != null) {
    if (calculatedImageSettings.excavation != null) {
      modules = excavateModules(cells, calculatedImageSettings.excavation)
    }

    image = (
      <SvgImage
        href={imageSettings.src}
        height={calculatedImageSettings.h}
        width={calculatedImageSettings.w}
        x={calculatedImageSettings.x + margin}
        y={calculatedImageSettings.y + margin}
        preserveAspectRatio='none'
        opacity={calculatedImageSettings.opacity}
        {...imageCrossOrigin(calculatedImageSettings.crossOrigin)}
      />
    )
  }

  const svgElementsProps = {
    modules,
    margin,
    gradient,
    gradientId,
  }

  const qrCode = (
    <>
      <Gradient gradient={gradient} gradientId={gradientId} />
      <Background
        background={background}
        bgGradientId={bgGradientId}
        numCells={numCells}
      />
      <FinderPatternsOuter settings={finderPatternOuterSettings} {...svgElementsProps} />
      <FinderPatternsInner settings={finderPatternInnerSettings} {...svgElementsProps} />
      <DataModules settings={dataModulesSettings} cells={cells} {...svgElementsProps} />
      {image}
    </>
  )

  if (!frameSettings || !frameLayout) {
    return qrCode
  }

  return (
    <>
      <FrameBack settings={frameSettings} layout={frameLayout} maskId={frameMaskId} />
      <Rect
        x={frameLayout.panelX}
        y={frameLayout.panelY}
        width={frameLayout.panelSize}
        height={frameLayout.panelSize}
        // Frames usually have a dark fill, so the code keeps a light quiet zone.
        fill={typeof background === 'string' ? background : DEFAULT_BGCOLOR}
        {...testId('frame-panel')}
      />
      <G transform={`translate(${frameLayout.qrX} ${frameLayout.qrY})`}>{qrCode}</G>
      <FrameLabel
        settings={frameSettings}
        layout={frameLayout}
        pixelsPerUnit={pixelsPerUnit}
      />
    </>
  )
}
