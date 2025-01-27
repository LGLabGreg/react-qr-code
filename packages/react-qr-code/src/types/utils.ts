import type {
	DataModulesSettings,
	FinderPatternInnerSettings,
	FinderPatternOuterSettings,
	Modules,
} from './lib';

export interface FilterFnProps {
	x: number;
	y: number;
	numCells: number;
}

export interface GeneratePathFnProps {
	modules: Modules;
	margin: number;
	settings:
		| DataModulesSettings
		| FinderPatternInnerSettings
		| FinderPatternOuterSettings;
}
