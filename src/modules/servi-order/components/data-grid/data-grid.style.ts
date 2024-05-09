import { Box, styled } from '@mui/material';
import { Color } from '@/theme';

export const BoxBorder = styled(Box)(({ theme }) => ({
  border: `1px solid ${Color.line}`,
  borderRadius: '4px',
  padding: '16px',
  [theme.breakpoints.up('xs')]: {
    margin: '0px',
    marginTop: '16px',
    '&::first-of-type': {
      marginTop: '0px',
    },
    maxWidth: '100vw',
  },
}));
