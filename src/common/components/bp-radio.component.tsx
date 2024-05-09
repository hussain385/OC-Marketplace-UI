import { Radio, RadioProps } from '@mui/material';
import { BpCheckedIcon, BpIcon } from '../styles';
import React from 'react';

function BpRadio(props: RadioProps) {
  return <Radio disableRipple color='default' checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} {...props} />;
}

export default BpRadio;
