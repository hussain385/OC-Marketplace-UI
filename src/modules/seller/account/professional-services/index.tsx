import { Box } from '@mui/material';

import { styled } from '@mui/system';

import './style.css';

import { Color } from '../../../../theme';

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 304,
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.12)',
      borderRadius: 2,
      border: 'none',
      fontSize: 14,
      marginTop: 10,
      paddingInline: 16,
      paddingBlock: 5,
    },
  },
};

export const MuiBox = styled(Box)(() => ({
  height: '132px',
  color: Color.textBlue,
  backgroundSize: 'contain',
  backgroundColor: Color.bgGreyLight,
  backgroundPosition: 'center bottom',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '0.7em',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
}));
