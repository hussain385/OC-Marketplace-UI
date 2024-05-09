// @flow
import * as React from 'react';
import { Typography } from '@mui/material';

type Props = {
  text: string;
};
export const HomepageSubheadingsComponents = ({ text }: Props) => {
  return (
    <Typography
      sx={{
        fontWeight: 400,
        fontSize: { xs: '14px', sm: '16px', md: '18px' },
        maxWidth: '70ch',
        lineHeight: '165%',
      }}
    >
      {text}
    </Typography>
  );
};
