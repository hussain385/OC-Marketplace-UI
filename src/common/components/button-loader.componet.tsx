/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, ButtonProps } from '@mui/material';

const ButtonDefault = (props: ButtonProps & { value: string | React.ReactNode }) => {
  return <Button {...props}>{props.value}</Button>;
};

export default React.memo(ButtonDefault);
