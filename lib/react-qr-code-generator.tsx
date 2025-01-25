import React from 'react';

import { ReactQRCodeGeneratorOptions } from './types';

export const ReactQRCodeGenerator = (options: ReactQRCodeGeneratorOptions) => {
  const { data } = options;
  return <>{data}</>;
};
