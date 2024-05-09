import { Box, Typography } from '@mui/material';
import React from 'react';
import { Color } from '../../theme';
import MainLayout from './main.layout';

export default function NoMatchRoute() {
  return (
    <MainLayout>
      <Box
        sx={{
          background: Color.priWhite,
          padding: '20px',
          width: '100%',
        }}
      >
        <Typography align='center' variant='h3' component='h3'>
          404
        </Typography>
        <Typography align='center' variant='subtitle1' component='h6'>
          Oops page not found
        </Typography>
      </Box>
    </MainLayout>
  );
}
