/* eslint-disable react/no-unescaped-entities */
import { Box } from '@mui/material';
import React, { ComponentProps } from 'react';

type TermPolicyProps = {
  children: React.ReactNode;
} & ComponentProps<typeof Box>;

const TermPolicyItems = ({ children, ...props }: TermPolicyProps) => {
  return (
    <Box
      sx={{
        padding: { xs: '0 0 0 15px', sm: '0 37px' },
        mt: '16px ',
        position: 'relative',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default TermPolicyItems;
