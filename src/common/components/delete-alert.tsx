import { Box, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import React from 'react';

export const DeleteAlert = ({ heading, subHeading }: { heading?: string; subHeading?: string }) => {
  return (
    <Box sx={{ mb: '8px' }}>
      <Typography sx={{ fontWeight: 'bold', mb: '8px' }}>
        Delete your {!isUndefined(heading) ? heading : ' award / achievement'}
      </Typography>
      <Typography>
        Are you sure you want to delete this {!isUndefined(subHeading) ? subHeading : ' award / achievement?  '}
        This action cannot be undone.
      </Typography>
    </Box>
  );
};
