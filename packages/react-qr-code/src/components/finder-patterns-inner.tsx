import { type ReactNode, useMemo } from 'react';

import {
	DEFAULT_FINDER_PATTERN_INNER_STYLE,
	FINDER_PATTERN_INNER_RADIUSES,
	FINDER_PATTERN_INNER_SIZE,
	FINDER_PATTERN_OUTER_ROTATIONS,
} from '../constants';
import type { FinderPatternInnerStyle } from '../types/lib';
import type { FinderPatternsInnerProps } from '../types/utils';
import {
	finderPatternsInnerInOutPoint,
	finderPatternsInnerLeaf,
} from '../utils/finder-patterns-inner';

export const FinderPatternsInner = ({
	modules,
	margin,
	settings,
}: FinderPatternsInnerProps): ReactNode => {
	const style: FinderPatternInnerStyle =
		settings.style || DEFAULT_FINDER_PATTERN_INNER_STYLE;

	const coordinates = useMemo(
		() => [
			{ x: margin + 2, y: margin + 2 },
			{ x: modules.length - margin + 1, y: margin + 2 },
			{ x: margin + 2, y: modules.length - margin + 1 },
		],
		[margin, modules.length],
	);

	const key = (x: number, y: number) =>
		`finder-patterns-inner-${style}-${x}-${y}`;

	if (
		style === 'rounded-sm' ||
		style === 'rounded' ||
		style === 'rounded-lg' ||
		style === 'circle' ||
		style === 'square'
	) {
		return coordinates.map((coordinate) => {
			const { x, y } = coordinate;
			return (
				<rect
					key={key(x, y)}
					x={x}
					y={y}
					width={FINDER_PATTERN_INNER_SIZE}
					height={FINDER_PATTERN_INNER_SIZE}
					fill={settings.color}
					rx={FINDER_PATTERN_INNER_RADIUSES[style]}
				/>
			);
		});
	}

	if (style === 'diamond') {
		return coordinates.map((coordinate) => {
			const { x, y } = coordinate;
			const sizeDiff = Math.sqrt(1.5);
			const size = FINDER_PATTERN_INNER_SIZE / sizeDiff;
			const posDiff = size - size / sizeDiff;
			return (
				<rect
					key={key(x, y)}
					x={x + posDiff / 2}
					y={y + posDiff / 2}
					width={size}
					height={size}
					fill={settings.color}
					style={{
						transform: `rotate(${45}deg)`,
						transformOrigin: 'center',
						transformBox: 'fill-box',
					}}
				/>
			);
		});
	}

	if (
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
				? finderPatternsInnerLeaf
				: finderPatternsInnerInOutPoint;
		return coordinates
			.map((coordinate, index) => ({
				...coordinate,
				rotation: FINDER_PATTERN_OUTER_ROTATIONS[style][index],
			}))
			.map(({ x, y, rotation }) => {
				const path = pathFn({
					x,
					y,
					radius: FINDER_PATTERN_INNER_RADIUSES[style],
				});
				return (
					<path
						key={key(x, y)}
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

	return null;
};
