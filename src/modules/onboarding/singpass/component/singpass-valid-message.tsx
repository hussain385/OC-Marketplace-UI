import { Box, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as SingpassImg } from '../../../../assets/icons/singpass-img.svg';
import { SingpassValidMessageStyles } from '../styles/singpass.valid-styles';

const SingpassValidMessage = () => {
  return (
    <Box sx={SingpassValidMessageStyles.wrapper}>
      <Typography component='span' sx={SingpassValidMessageStyles.description}>
        The info shown below was retrieved from
      </Typography>
      <Typography sx={{ mt: 1 }} component='span'>
        <SingpassImg />
      </Typography>
    </Box>
  );
};

export default SingpassValidMessage;
