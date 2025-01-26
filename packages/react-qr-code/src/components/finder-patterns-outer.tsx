import { ReactNode } from 'react';

import { DEFAULT_FINDER_PATTERN_OUTER_STYLE, FINDER_PATTERN_SIZE } from '../constants';
import { FinderPatternOuterStyle } from '../types/lib';
import { GeneratePathFnProps } from '../types/utils';

export const FinderPatternsOuter = ({
  modules,
  margin,
  settings,
}: GeneratePathFnProps): ReactNode => {
  const style: FinderPatternOuterStyle =
    settings.style || DEFAULT_FINDER_PATTERN_OUTER_STYLE;
  const ops: Array<string> = [];

  // Coordinates for each finder pattern
  const coordinates = [
    { x: margin, y: margin }, // Top left
    { x: modules.length - margin - 1, y: margin }, // Top right
    { x: margin, y: modules.length - margin - 1 }, // Bottom left
  ];

  const rotations = {
    inpoint: [0, 90, -90],
    outpoint: [180, -90, 90],
    classy: [0, 90, -90],
  };

  if (['extra-rounded', 'circle', 'square'].includes(style)) {
    coordinates.forEach(({ x, y }) => {
      if (style === 'extra-rounded') {
        ops.push(
          `M ${x} ${y + 2.5}` +
            `v ${2}` +
            `a ${2.5} ${2.5}, 0, 0, 0, ${2.5} ${2.5}` +
            `h ${2}` +
            `a ${2.5} ${2.5}, 0, 0, 0, ${2.5} ${-2.5}` +
            `v ${-2}` +
            `a ${2.5} ${2.5}, 0, 0, 0, ${-2.5} ${-2.5}` +
            `h ${-2}` +
            `a ${2.5} ${2.5}, 0, 0, 0, ${-2.5} ${2.5}` +
            `M ${x + 2.5} ${y + 1}` +
            `h ${2}` +
            `a ${1.5} ${1.5}, 0, 0, 1, ${1.5} ${1.5}` +
            `v ${2}` +
            `a ${1.5} ${1.5}, 0, 0, 1, ${-1.5} ${1.5}` +
            `h ${-2}` +
            `a ${1.5} ${1.5}, 0, 0, 1, ${-1.5} ${-1.5}` +
            `v ${-2}` +
            `a ${1.5} ${1.5}, 0, 0, 1, ${1.5} ${-1.5}`,
        );
      } else if (style === 'circle') {
        ops.push(
          `M ${x + FINDER_PATTERN_SIZE / 2} ${y}` + // M cx, y //  Move to top of ring
            `a ${FINDER_PATTERN_SIZE / 2} ${FINDER_PATTERN_SIZE / 2} 0 1 0 0.01 0z` + // a outerRadius, outerRadius, 0, 1, 0, 1, 0 // Draw outer arc, but don't close it
            `z` + // Z // Close the outer shape
            `m 0 1` + // m -1 outerRadius-innerRadius // Move to top point of inner radius
            `a ${FINDER_PATTERN_SIZE / 2 - 1} ${FINDER_PATTERN_SIZE / 2 - 1} 0 1 1 -0.01 0` + // a innerRadius, innerRadius, 0, 1, 1, -1, 0 // Draw inner arc, but don't close it
            `Z`, // Z // Close the inner ring. Actually will still work without, but inner ring will have one unit missing in stroke
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
  } else if (style === 'classy') {
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
          `H ${x}` +
          `z` +
          `M ${x + 2.5} ${y + 1}` +
          `h ${2}` +
          `a ${1.5} ${1.5}, 0, 0, 1, ${1.5} ${1.5}` +
          `v ${3.5}` +
          `h ${-3.5}` +
          `a ${1.5} ${1.5}, 0, 0, 1, ${-1.5} ${-1.5}` +
          `v ${-3.5}` +
          `z`;
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
