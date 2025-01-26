import {
  DEFAULT_BGCOLOR,
  DEFAULT_FGCOLOR,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_SIZE,
} from './constants';
import { useQRCode } from './hooks/use-qr-code';
import { QRPropsSVG, ReactQRCodeOptions } from './types';
import { excavateModules } from './utils/qr-code';
import { generatePath } from './utils/svg';

const ReactQRCode = (props: QRPropsSVG) => {
  const {
    ref,
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    bgColor = DEFAULT_BGCOLOR,
    fgColor = DEFAULT_FGCOLOR,
    minVersion = DEFAULT_MINVERSION,
    boostLevel,
    title,
    marginSize,
    imageSettings,
    ...otherProps
  } = props;

  const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
    value,
    level,
    minVersion,
    boostLevel,
    marginSize,
    imageSettings,
    size,
  });

  let cellsToDraw = cells;
  let image = null;
  if (imageSettings != null && calculatedImageSettings != null) {
    if (calculatedImageSettings.excavation != null) {
      cellsToDraw = excavateModules(cells, calculatedImageSettings.excavation);
    }

    image = (
      <image
        href={imageSettings.src}
        height={calculatedImageSettings.h}
        width={calculatedImageSettings.w}
        x={calculatedImageSettings.x + margin}
        y={calculatedImageSettings.y + margin}
        preserveAspectRatio='none'
        opacity={calculatedImageSettings.opacity}
        // Note: specified here always, but undefined will result in no attribute.
        crossOrigin={calculatedImageSettings.crossOrigin}
      />
    );
  }

  // Drawing strategy: instead of a rect per module, we're going to create a
  // single path for the dark modules and layer that on top of a light rect,
  // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
  // way faster than DOM ops.
  // For level 1, 441 nodes -> 2
  // For level 40, 31329 -> 2
  const fgPath = generatePath(cellsToDraw, margin);

  return (
    <svg
      height={size}
      width={size}
      viewBox={`0 0 ${numCells} ${numCells}`}
      ref={ref}
      role='img'
      {...otherProps}
    >
      {!!title && <title>{title}</title>}
      <path
        fill={bgColor}
        d={`M0,0 h${numCells}v${numCells}H0z`}
        shapeRendering='crispEdges'
      />
      <path fill={fgColor} d={fgPath} shapeRendering='crispEdges' />
      {image}
    </svg>
  );
};

ReactQRCode.displayName = 'ReactQRCode';

export { ReactQRCode };
