import { Box } from '@mui/material';

import { Color } from '../../../../theme';

import { styled } from '@mui/system';

export const MuiBox = styled(Box)(({ theme }) => ({
  height: '144px',
  fontSize: '12px',
  background: 'white',
  color: Color.textBlue,
  borderRadius: '4px',
  border: `1px dashed  ${Color.bgLine} !important`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },

  [theme.breakpoints.up('md')]: {
    width: '320px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
