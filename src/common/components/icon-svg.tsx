import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import React from 'react';

const IconImage = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 36 36.17'>
      <path d='M7.92,17.69H0C1.25.26,17.41,0,17.41,0l0,8A10.45,10.45,0,0,0,7.92,17.69Z' />
      <path d='M18.32,7.89V0C35.75,1.23,36,17.38,36,17.38l-8,0S27.49,8.82,18.32,7.89Z' />
      <path d='M28,18.5h7.89C34.64,35.91,18.47,36.17,18.47,36.17l0-8S27,27.66,28,18.5Z' />
      <path d='M17.45,9.07V17.7l-8.72,0S9.29,9.72,17.45,9.07Z' />
      <path d='M27,17.74H18.36V9S26.34,9.58,27,17.74Z' />
      <path d='M18.31,27.14V18.51l8.71,0S26.48,26.48,18.31,27.14Z' />
      <path d='M17.45,18.61H8.73L8.81,33.5S17.59,29,17.45,18.61Z' />
      <path d='M0,36.17V18.62H7.92V33.87S7.55,35,0,36.17Z' />
    </SvgIcon>
  );
};

export default IconImage;
