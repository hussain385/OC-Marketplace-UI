import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { Color } from '../../theme';
import PopupModalBox from './popup-modal-box';

const CircularLoading = () => {
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
        <CircularProgress sx={{ color: Color.textHint, fontWeight: 400 }} size={60} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant='caption' component='h6' color='text.secondary'>
            Loading
          </Typography>
        </Box>
      </Box>
    </PopupModalBox>
  );
};

export default CircularLoading;
