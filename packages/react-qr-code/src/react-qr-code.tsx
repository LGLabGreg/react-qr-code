import { useMemo } from 'react';

import {
  DEFAULT_BGCOLOR,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_SIZE,
} from './constants';
import { useQRCode } from './hooks/use-qr-code';
import { ReactQRCodeProps } from './types';
import { excavateModules } from './utils/qr-code';
import {
  sanitizeDataModulesSettings,
  sanitizeFinderPatternInnerSettings,
  sanitizeFinderPatternOuterSettings,
} from './utils/settings';
import {
  generateDataModulesPath,
  generateFinderPatternInnerPath,
  generateFinderPatternOuterPath,
} from './utils/svg';

const ReactQRCode = (props: ReactQRCodeProps) => {
  const {
    ref,
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    bgColor = DEFAULT_BGCOLOR,
    minVersion = DEFAULT_MINVERSION,
    boostLevel,
    title,
    marginSize,
    imageSettings,
    svgProps,
  } = props;

  const dataModulesSettings = useMemo(
    () => sanitizeDataModulesSettings(props.dataModulesSettings),
    [props.dataModulesSettings],
  );

  const finderPatternOuterSettings = useMemo(
    () => sanitizeFinderPatternOuterSettings(props.finderPatternOuterSettings),
    [props.finderPatternOuterSettings],
  );

  const finderPatternInnerSettings = useMemo(
    () => sanitizeFinderPatternInnerSettings(props.finderPatternInnerSettings),
    [props.finderPatternInnerSettings],
  );

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

  const dataModulesPath = generateDataModulesPath(cellsToDraw, margin);
  const finderPatternOuterPath = generateFinderPatternOuterPath(cellsToDraw, margin);
  const finderPatternInnerPath = generateFinderPatternInnerPath(cellsToDraw, margin);

  return (
    <svg
      height={size}
      width={size}
      viewBox={`0 0 ${numCells} ${numCells}`}
      ref={ref}
      role='img'
      {...svgProps}
    >
      {!!title && <title>{title}</title>}
      <path
        fill={bgColor}
        d={`M0,0 h${numCells}v${numCells}H0z`}
        shapeRendering='crispEdges'
      />
      <path
        fill={finderPatternOuterSettings.color}
        d={finderPatternOuterPath}
        shapeRendering='crispEdges'
      />
      <path
        fill={finderPatternInnerSettings.color}
        d={finderPatternInnerPath}
        shapeRendering='crispEdges'
      />
      <path
        fill={dataModulesSettings.color}
        d={dataModulesPath}
        shapeRendering='crispEdges'
      />
      {image}
    </svg>
  );
};

ReactQRCode.displayName = 'ReactQRCode';

export { ReactQRCode };
