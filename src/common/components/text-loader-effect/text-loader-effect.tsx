import { Typography } from '@mui/material';
import React from 'react';
import './styled/shimmer.css';

const LoaderTextEffect = ({ customStyle }: { customStyle?: React.CSSProperties }) => {
  return <Typography className='shimmer-effect' sx={{ ...customStyle }}></Typography>;
};

export default LoaderTextEffect;
