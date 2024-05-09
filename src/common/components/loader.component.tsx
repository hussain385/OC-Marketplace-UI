import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Color } from '@/theme';

type Props = {
  isLoading: boolean;
  sx?: React.CSSProperties;
  size?: number;
  isCenter?: boolean;
  isCenterUIStyle?: React.CSSProperties;
};

const Loader = ({
  isLoading,
  isCenter,
  sx,
  size,
  isCenterUIStyle,
  ...otherProps
}: Props & React.PropsWithoutRef<any>): JSX.Element => {
  const defaultStyles = {
    color: Color.priBlue,
    ...sx,
  };
  const defaultSize: number = size ? size : 20;
  return isLoading ? (
    isCenter ? (
      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.5)',
          zIndex: 100,
          ...isCenterUIStyle,
        }}
      >
        <CircularProgress size={defaultSize} sx={defaultStyles} {...otherProps} />
        <div>{otherProps.children}</div>
      </div>
    ) : (
      <div>
        <CircularProgress size={defaultSize} sx={defaultStyles} {...otherProps} />
        <div>{otherProps.children}</div>
      </div>
    )
  ) : (
    <></>
  );
};
export default Loader;
