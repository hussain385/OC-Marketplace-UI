import { Typography } from '@mui/material';

import { styled } from '@mui/system';

import { Color } from '../../../../theme';

export const MuiSearchText = styled(Typography)(() => ({
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: 1.67,
  letterSpacing: '-0.5px',
  color: Color.textHint,
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const MuiSearchTextField = styled('input')(() => ({
  margin: '0',
  height: '44px',
  border: `1px solid ${Color.line}`,
  padding: '0px 16px',
  mb: '0 !important',
  outline: 'none',
}));
