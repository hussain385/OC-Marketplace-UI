// @flow
import React from 'react';

import { Box, Divider, Typography } from '@mui/material';

type Props = {
  serviceName: string;
  companyName: string;
  categoryName: string;
};

export const title = {
  fontSize: '14px',
  fontWeight: '700',
};

export const titleValue = {
  fontSize: '16px',
  fontWeight: '600',
  marginTop: '17px',
};

export const categoryTextStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#7E7E7E',
};

export const ServiceInfoBox = ({ serviceName, companyName, categoryName }: Props) => {
  return (
    <Box sx={{ width: '100%', marginTop: '1em' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '10px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <Typography sx={title}>Service name</Typography>
          <Typography sx={titleValue}>{serviceName}</Typography>
          <Typography sx={categoryTextStyle}>{categoryName}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <Typography sx={title}>Service provider</Typography>
          <Typography sx={titleValue}>{companyName}</Typography>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};
