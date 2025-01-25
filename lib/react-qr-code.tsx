import React from 'react';

import { ReactQRCodeOptions } from './types';

export const ReactQRCode = (options: ReactQRCodeOptions) => {
  const { data } = options;
  return <>{data}</>;
};
