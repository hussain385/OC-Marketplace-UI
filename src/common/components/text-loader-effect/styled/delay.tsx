import { ComponentType, lazy } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DelayLoadEffect = <T extends ComponentType<any>>(factory: () => Promise<{ default: T }>, minLoadTimeMs = 2000) =>
  lazy(() =>
    Promise.all([factory(), new Promise((resolve) => setTimeout(resolve, minLoadTimeMs))]).then(
      ([moduleExports]) => moduleExports,
    ),
  );
