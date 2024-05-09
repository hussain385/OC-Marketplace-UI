import { Box, SxProps } from '@mui/material';

import React from 'react';

import { Color } from '../../theme';

type BoxWrapperProps = {
  onLeaveHandler?: () => void;
  children?: React.ReactNode;
  onCustomParentStyle?: React.CSSProperties | SxProps;
  onCustomChildrenStyle?: React.CSSProperties | SxProps;
};

const BoxWrapper = ({ onLeaveHandler, children, onCustomParentStyle, onCustomChildrenStyle }: BoxWrapperProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        ...onCustomParentStyle,
      }}
    >
      <Box
        sx={{
          width: '100%',
          margin: '0 auto',
          maxWidth: '544px',
          borderRadius: '8px',
          border: { xs: 'none', sm: `1px solid ${Color.line}`, md: `1px solid ${Color.line}` },
          background: { xs: 'transparent', sm: Color.priWhite, md: Color.priWhite },
          ...onCustomChildrenStyle,
        }}
        onMouseLeave={onLeaveHandler}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BoxWrapper;
