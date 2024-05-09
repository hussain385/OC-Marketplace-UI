import React, { Suspense } from 'react';
import LoaderTextEffect from './text-loader-effect';

const ShimmerLoader = ({ children, customStyle }: { children: React.ReactNode; customStyle?: React.CSSProperties }) => {
  return (
    <Suspense fallback={<LoaderTextEffect customStyle={{ width: '100%', height: '100%', ...customStyle }} />}>
      {children}
    </Suspense>
  );
};

export default ShimmerLoader;
