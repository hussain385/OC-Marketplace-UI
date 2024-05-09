import React, { Suspense } from 'react';
import LoaderTextEffect from './text-loader-effect';

const ShimmerLoaderText = ({ children, customStyle }: { children: React.ReactNode; customStyle?: React.CSSProperties }) => {
  return (
    <Suspense fallback={<LoaderTextEffect customStyle={{ width: 'auto', height: 'auto', ...customStyle }} />}>
      {children}
    </Suspense>
  );
};

export default ShimmerLoaderText;
