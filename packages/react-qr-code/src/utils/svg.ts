import { FINDER_PATTERN_INNER_MASK, FINDER_PATTERN_OUTER_MASK } from '../constants';
import { Modules } from '../types';

interface FilterFnProps {
  x: number;
  y: number;
  numCells: number;
}

const isFinderPatternOuterModule = ({ x, y, numCells }: FilterFnProps): boolean => {
  if (
    FINDER_PATTERN_OUTER_MASK[x]?.[y] ||
    FINDER_PATTERN_OUTER_MASK[x - numCells + 7]?.[y] ||
    FINDER_PATTERN_OUTER_MASK[x]?.[y - numCells + 7]
  ) {
    return true;
  }
  return false;
};

const isFinderPatternInnerModule = ({ x, y, numCells }: FilterFnProps): boolean => {
  if (
    FINDER_PATTERN_INNER_MASK[x]?.[y] ||
    FINDER_PATTERN_INNER_MASK[x - numCells + 7]?.[y] ||
    FINDER_PATTERN_INNER_MASK[x]?.[y - numCells + 7]
  ) {
    return true;
  }
  return false;
};

export const generateFinderPatternOuterPath = (
  modules: Modules,
  margin: number = 0,
): string => {
  const ops: Array<string> = [];
  modules.forEach(function (row, y) {
    row.forEach(function (cell, x) {
      if (isFinderPatternOuterModule({ x, y, numCells: modules.length })) {
        ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
      }
    });
  });
  return ops.join('');
};

export const generateFinderPatternInnerPath = (
  modules: Modules,
  margin: number = 0,
): string => {
  const ops: Array<string> = [];
  modules.forEach(function (row, y) {
    row.forEach(function (cell, x) {
      if (isFinderPatternInnerModule({ x, y, numCells: modules.length })) {
        ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
      }
    });
  });
  return ops.join('');
};

export const generateDataModulesPath = (modules: Modules, margin: number = 0): string => {
  const ops: Array<string> = [];
  modules.forEach(function (row, y) {
    let start: number | null = null;
    row.forEach(function (cell, x) {
      // Skip the timing patterns
      if (
        isFinderPatternOuterModule({ x, y, numCells: modules.length }) ||
        isFinderPatternInnerModule({ x, y, numCells: modules.length })
      ) {
        return;
      }

      if (!cell && start !== null) {
        // M0 0h7v1H0z injects the space with the move and drops the comma,
        // saving a char per operation
        ops.push(`M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`);
        start = null;
        return;
      }

      // end of row, clean up or skip
      if (x === row.length - 1) {
        if (!cell) {
          // We would have closed the op above already so this can only mean
          // 2+ light modules in a row.
          return;
        }
        if (start === null) {
          // Just a single dark module.
          ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
        } else {
          // Otherwise finish the current line.
          ops.push(
            `M${start + margin},${y + margin} h${x + 1 - start}v1H${start + margin}z`,
          );
        }
        return;
      }

      if (cell && start === null) {
        start = x;
      }
    });
  });
  return ops.join('');
};
