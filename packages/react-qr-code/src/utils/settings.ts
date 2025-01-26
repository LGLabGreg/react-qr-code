import { DEFAULT_DATA_MODULES_COLOR } from '../constants';
import {
  DataModulesSettings,
  FinderPatternInnerSettings,
  FinderPatternOuterSettings,
} from '../types';

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
  };
};

export const sanitizeFinderPatternInnerSettings = (
  settings?: FinderPatternInnerSettings,
) => {
  return {
    color: settings?.color || DEFAULT_DATA_MODULES_COLOR,
  };
};
