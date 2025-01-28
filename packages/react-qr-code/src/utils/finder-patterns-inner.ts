import { FINDER_PATTERN_INNER_MASK } from '../constants';
import type { FilterFnProps, GeneratePathFnProps } from '../types/utils';

export const isFinderPatternInnerModule = ({
	x,
	y,
	numCells,
}: FilterFnProps): boolean => {
	if (
		FINDER_PATTERN_INNER_MASK[x]?.[y] ||
		FINDER_PATTERN_INNER_MASK[x - numCells + 7]?.[y] ||
		FINDER_PATTERN_INNER_MASK[x]?.[y - numCells + 7]
	) {
		return true;
	}
	return false;
};

export const generateFinderPatternInnerPath = ({
	modules,
	margin,
	settings,
}: GeneratePathFnProps): string => {
	console.log('generateDataModulesPath', settings);
	const ops: Array<string> = [];
	modules.forEach((row, y) => {
		row.forEach((cell, x) => {
			if (isFinderPatternInnerModule({ x, y, numCells: modules.length })) {
				ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
			}
		});
	});
	return ops.join('');
};
