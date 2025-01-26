import { useMemo } from 'react';

import { ERROR_LEVEL_MAP } from '../constants';
import qrcodegen from '../lib/qrcodegen';
import { ErrorCorrectionLevel, ImageSettings } from '../types';
import { getImageSettings, getMarginSize } from '../utils/qr-code';

export const useQRCode = ({
  value,
  level,
  minVersion,
  marginSize,
  imageSettings,
  size,
  boostLevel,
}: {
  value: string | string[];
  level: ErrorCorrectionLevel;
  minVersion: number;
  marginSize?: number;
  imageSettings?: ImageSettings;
  size: number;
  boostLevel?: boolean;
}) => {
  let qrcode = useMemo(() => {
    const values = Array.isArray(value) ? value : [value];
    const segments = values.reduce<qrcodegen.QrSegment[]>((accum, v) => {
      accum.push(...qrcodegen.QrSegment.makeSegments(v));
      return accum;
    }, []);
    return qrcodegen.QrCode.encodeSegments(
      segments,
      ERROR_LEVEL_MAP[level],
      minVersion,
      undefined,
      undefined,
      boostLevel,
    );
  }, [value, level, minVersion, boostLevel]);

  const { cells, margin, numCells, calculatedImageSettings } = useMemo(() => {
    let cells = qrcode.getModules();

    const margin = getMarginSize(marginSize);
    const numCells = cells.length + margin * 2;
    const calculatedImageSettings = getImageSettings(cells, size, margin, imageSettings);
    return {
      cells,
      margin,
      numCells,
      calculatedImageSettings,
    };
  }, [qrcode, size, imageSettings, marginSize]);

  return {
    qrcode,
    margin,
    cells,
    numCells,
    calculatedImageSettings,
  };
};
