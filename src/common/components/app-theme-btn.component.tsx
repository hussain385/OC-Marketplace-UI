// @flow
import React from 'react';
import { Button, SxProps, Typography } from '@mui/material';

type BtnProps = {
  color?: string;
  hover?: string;
  backgroundColor?: string;
  width?: string | object;
  text?: string | React.ReactNode;
  onClick?: () => void;
  customButtonStyle?: React.CSSProperties | SxProps;
  fontSize?: string;
  type?: 'button' | 'submit' | 'reset';
  overrideFontStyle?: React.CSSProperties | SxProps;
  disabled?: boolean;
};

export const AppThemeBtnComponent = ({
  color,
  hover,
  backgroundColor,
  width,
  text,
  onClick,
  customButtonStyle,
  overrideFontStyle,
  fontSize,
  type,
  disabled,
}: BtnProps) => {
  return (
    <Button
      disabled={disabled}
      type={type ? type : 'button'}
      variant='outlined'
      sx={{
        borderRadius: '',
        display: 'block',
        color: color,
        backgroundColor: backgroundColor,
        width: width,
        '&:hover': {
          background: hover ? hover : 'initial',
        },
        ...customButtonStyle,
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          fontSize: {
            xs: fontSize ? fontSize : '12px',
            sm: fontSize ? fontSize : '14px',
            md: fontSize ? fontSize : '14px',
            lineHeight: '150%',
            fontWeight: 600,
          },
          textTransform: 'initial',
          ...overrideFontStyle,
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};
