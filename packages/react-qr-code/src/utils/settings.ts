import {
	DEFAULT_DATA_MODULES_COLOR,
	DEFAULT_FINDER_PATTERN_INNER_STYLE,
	DEFAULT_FINDER_PATTERN_OUTER_STYLE,
} from '../constants';
import type {
	DataModulesSettings,
	FinderPatternInnerSettings,
	FinderPatternOuterSettings,
} from '../types/lib';

export const sanitizeDataModulesSettings = (settings?: DataModulesSettings) => {
	return {
		color: settings?.color || DEFAULT_DATA_MODULES_COLOR,
	};
};

export const sanitizeFinderPatternOuterSettings = (
	settings?: FinderPatternOuterSettings,
) => {
	return {
		color: settings?.color || DEFAULT_DATA_MODULES_COLOR,
		style: settings?.style || DEFAULT_FINDER_PATTERN_OUTER_STYLE,
	};
};

export const sanitizeFinderPatternInnerSettings = (
	settings?: FinderPatternInnerSettings,
) => {
	return {
		color: settings?.color || DEFAULT_DATA_MODULES_COLOR,
		style: settings?.style || DEFAULT_FINDER_PATTERN_INNER_STYLE,
	};
};
