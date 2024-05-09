/* eslint-disable no-unused-vars */
import React from 'react';
import { styled } from '@mui/system';
import { Color } from '../../theme';

const ButtonStyled = styled('button')(() => ({
  border: 'none',
  outline: 'none',
  color: Color.priWhite,
  borderRadius: '2px',
  '&:hover': {
    color: Color.lightBlack,
    background: '#f4f3f2',
    cursor: 'pointer',
  },
}));
const MuiButton: React.FunctionComponent<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    widthSize?: string | object;
    heightSize?: string;
    mxWidth?: string;
    xs?: string;
    value?: string;
    children?: React.ReactNode;
    style?: any;
  }
> = ({ value, widthSize, mxWidth, xs, style, heightSize, children, ...rest }) => {
  return (
    <ButtonStyled
      {...rest}
      sx={(theme) => ({
        ...style,
        width: widthSize,
        height: heightSize,
        maxWidth: mxWidth,

        [theme.breakpoints.down('sm')]: {
          display: xs,
        },
      })}
    >
      {value ?? children}
      {!value && ''}
    </ButtonStyled>
  );
};

export default React.memo(MuiButton);
