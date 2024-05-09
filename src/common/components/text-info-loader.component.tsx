import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

const TextInfo = (props: TypographyProps & { text: string | React.ReactNode }) => {
  return <Typography {...props}>{props.text}</Typography>;
};

export default React.memo(TextInfo);
