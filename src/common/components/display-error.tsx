import { Box } from '@mui/material';
import React from 'react';
import { Color } from '../../theme';
import PopupModalBox from './popup-modal-box';

const DisplayError = ({ errorMsg }: { errorMsg: object }) => {
  return (
    <PopupModalBox
      parentStyle={{ background: 'transparent' }}
      childrenStyle={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <Box sx={{ color: Color.negative }}>{JSON.stringify(errorMsg)}</Box>
      </Box>
    </PopupModalBox>
  );
};

export default DisplayError;
