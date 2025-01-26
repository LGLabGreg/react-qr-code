import { FINDER_PATTERN_OUTER_MASK } from '../constants';
import { FilterFnProps } from '../types/utils';

export const isFinderPatternOuterModule = ({
  x,
  y,
  numCells,
}: FilterFnProps): boolean => {
  if (
    FINDER_PATTERN_OUTER_MASK[x]?.[y] ||
    FINDER_PATTERN_OUTER_MASK[x - numCells + 7]?.[y] ||
    FINDER_PATTERN_OUTER_MASK[x]?.[y - numCells + 7]
  ) {
    return true;
  }
  return false;
};
