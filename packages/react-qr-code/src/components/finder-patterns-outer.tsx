import { ReactNode, useMemo } from 'react';

import { DEFAULT_FINDER_PATTERN_OUTER_STYLE, FINDER_PATTERN_SIZE } from '../constants';
import { FinderPatternOuterStyle } from '../types/lib';
import { GeneratePathFnProps } from '../types/utils';
import {
  finderPatternsOuterClassy,
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

  const rotations = {
    inpoint: [0, 90, -90],
    outpoint: [180, -90, 90],
    classy: [0, 90, -90],
    'classy-rounded': [0, 90, -90],
  };

  const radiuses = {
    classy: 3,
    'classy-rounded': 5,
  };

  if (['rounded-sm', 'rounded', 'rounded-lg', 'circle', 'square'].includes(style)) {
    coordinates.forEach(({ x, y }) => {
      if (style === 'rounded-sm') {
        ops.push(finderPatternsOuterRoundedSquare({ x, y, radius: 3 }));
      } else if (style === 'rounded') {
        ops.push(finderPatternsOuterRoundedSquare({ x, y, radius: 4 }));
      } else if (style === 'rounded-lg') {
        ops.push(finderPatternsOuterRoundedSquare({ x, y, radius: 5 }));
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
  } else if (style === 'inpoint' || style === 'outpoint') {
    return coordinates
      .map((coordinate, index) => ({
        ...coordinate,
        rotation: rotations[style][index],
      }))
      .map(({ x, y, rotation }) => {
        const path =
          `M ${x} ${y + 2.5}` +
          `v ${2}` +
          `a ${2.5} ${2.5}, 0, 0, 0, ${2.5} ${2.5}` +
          `h ${4.5}` +
          `v ${-4.5}` +
          `a ${2.5} ${2.5}, 0, 0, 0, ${-2.5} ${-2.5}` +
          `h ${-2}` +
          `a ${2.5} ${2.5}, 0, 0, 0, ${-2.5} ${2.5}` +
          `M ${x + 2.5} ${y + 1}` +
          `h ${2}` +
          `a ${1.5} ${1.5}, 0, 0, 1, ${1.5} ${1.5}` +
          `v ${3.5}` +
          `h ${-3.5}` +
          `a ${1.5} ${1.5}, 0, 0, 1, ${-1.5} ${-1.5}` +
          `v ${-2}` +
          `a ${1.5} ${1.5}, 0, 0, 1, ${1.5} ${-1.5}`;
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
  } else if (style === 'classy' || style === 'classy-rounded') {
    return coordinates
      .map((coordinate, index) => ({
        ...coordinate,
        rotation: rotations[style][index],
      }))
      .map(({ x, y, rotation }) => {
        const path = finderPatternsOuterClassy({ x, y, radius: radiuses[style] });
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
