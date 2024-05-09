/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, BoxProps } from '@mui/material';

const BoxUI = (props: BoxProps & { value: string | React.ReactNode }) => {
  return <Box {...props}>{props.value}</Box>;
};

export default React.memo(BoxUI);
