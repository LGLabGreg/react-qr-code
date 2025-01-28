import { ReactNode, useMemo } from 'react';

import {
  DEFAULT_FINDER_PATTERN_OUTER_STYLE,
  FINDER_PATTERN_OUTER_RADIUSES,
  FINDER_PATTERN_OUTER_ROTATIONS,
  FINDER_PATTERN_SIZE,
} from '../constants';
import { FinderPatternOuterStyle } from '../types/lib';
import { GeneratePathFnProps } from '../types/utils';
import {
  finderPatternsInOutPoint,
  finderPatternsOuterLeaf,
  finderPatternsOuterRoundedSquare,
} from '../utils/finder-patterns-outer';

export const FinderPatternsOuter = ({
  modules,
  margin,
  settings,
}: GeneratePathFnProps): ReactNode => {
  const style: FinderPatternOuterStyle =
    settings.style || DEFAULT_FINDER_PATTERN_OUTER_STYLE;
  const ops: Array<string> = [];

  const coordinates = useMemo(
    () => [
      { x: margin, y: margin },
      { x: modules.length - margin - 1, y: margin },
      { x: margin, y: modules.length - margin - 1 },
    ],
    [margin, modules.length],
  );

  if (['rounded-sm', 'rounded', 'rounded-lg', 'circle', 'square'].includes(style)) {
    coordinates.forEach(({ x, y }) => {
      if (style === 'rounded-sm' || style === 'rounded' || style === 'rounded-lg') {
        ops.push(
          finderPatternsOuterRoundedSquare({
            x,
            y,
            radius: FINDER_PATTERN_OUTER_RADIUSES[style],
          }),
        );
      } else if (style === 'circle') {
        ops.push(
          `M ${x + FINDER_PATTERN_SIZE / 2} ${y}` +
            `a ${FINDER_PATTERN_SIZE / 2} ${FINDER_PATTERN_SIZE / 2} 0 1 0 0.01 0z` +
            `z` +
            `m 0 1` +
            `a ${FINDER_PATTERN_SIZE / 2 - 1} ${FINDER_PATTERN_SIZE / 2 - 1} 0 1 1 -0.01 0` +
            `Z`,
        );
      } else {
        ops.push(
          `M ${x} ${y}` +
            `v ${FINDER_PATTERN_SIZE}` +
            `h ${FINDER_PATTERN_SIZE}` +
            `v ${-FINDER_PATTERN_SIZE}` +
            `z` +
            `M ${x + 1} ${y + 1}` +
            `h ${FINDER_PATTERN_SIZE - 2 * 1}` +
            `v ${FINDER_PATTERN_SIZE - 2 * 1}` +
            `h ${-FINDER_PATTERN_SIZE + 2 * 1}` +
            `z`,
        );
      }
    });
    return <path fill={settings.color} d={ops.join('')} />;
  } else if (
    style === 'inpoint-sm' ||
    style === 'inpoint' ||
    style === 'inpoint-lg' ||
    style === 'outpoint-sm' ||
    style === 'outpoint' ||
    style === 'outpoint-lg' ||
    style === 'leaf-sm' ||
    style === 'leaf' ||
    style === 'leaf-lg'
  ) {
    const pathFn =
      style === 'leaf-sm' || style === 'leaf' || style === 'leaf-lg'
        ? finderPatternsOuterLeaf
        : finderPatternsInOutPoint;
    return coordinates
      .map((coordinate, index) => ({
        ...coordinate,
        rotation: FINDER_PATTERN_OUTER_ROTATIONS[style][index],
      }))
      .map(({ x, y, rotation }) => {
        const path = pathFn({
          x,
          y,
          radius: FINDER_PATTERN_OUTER_RADIUSES[style],
        });
        return (
          <path
            fill={settings.color}
            d={path}
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
          />
        );
      });
  }
};
