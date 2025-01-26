import { GeneratePathFnProps } from '../types/utils';
import { isFinderPatternInnerModule } from './finder-patterns-inner';
import { isFinderPatternOuterModule } from './finder-patterns-outer';

export const generateDataModulesPath = ({
  modules,
  margin,
  settings,
}: GeneratePathFnProps): string => {
  console.log('generateDataModulesPath', settings);
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
