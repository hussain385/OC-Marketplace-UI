import { Box } from '@mui/material';
import { isUndefined } from 'lodash';
import React from 'react';
import { Color } from '../../theme';

type Wrong = {
  name?: string;
  isNotError?: boolean;
  resetValue: any;
  setValue?: any;
  srcImg?: string;
};

const Invalid = ({ name, isNotError, resetValue, setValue }: Wrong) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '14px',
        height: '14px',
        padding: '8px  8px 9px',
        alignItems: 'center',
        borderRadius: '50%',
        background: !isUndefined(isNotError) ? Color.line : 'transparent',
        cursor: 'pointer',
      }}
      onClick={() => {
        resetValue(name);
        setValue(name, '');
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: !isUndefined(isNotError) ? '12px' : '16px',
          fontWeight: 'bold',
          color: !isUndefined(isNotError) ? Color.pureBlack : Color.negative,
        }}
      >
        x
      </div>
    </Box>
  );
};

export default React.memo(Invalid);
