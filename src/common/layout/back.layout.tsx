/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { SxProps } from '@mui/material';
import { ReactComponent as ArrowIcon } from './../../assets/icons/ic-arrow-left.svg';

import { BackLayoutBox, BackLayoutWrapperStyle, BackText } from '../styles/back-layout.styles';

type Position = 'fixed' | 'sticky' | 'relative' | 'absolute';

type Props = {
  route?: string;
  backHandler?: () => void;
  onCustomStyle?: React.CSSProperties | SxProps;
  position?: Position;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BackLayout({ backHandler, route, onCustomStyle, position = 'sticky' }: Props) {
  return (
    <BackLayoutWrapperStyle
      position={position}
      color={'primary'}
      sx={{
        ...onCustomStyle,
        display: { xs: 'none', md: 'flex' },
      }}
    >
      <BackLayoutBox onClick={backHandler}>
        <ArrowIcon />
        <BackText>Back</BackText>
      </BackLayoutBox>
    </BackLayoutWrapperStyle>
  );
}
