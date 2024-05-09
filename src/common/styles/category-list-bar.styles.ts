import { Box, styled } from '@mui/material';

export const BoxScroll = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  left: 0,
  right: 0,
  width: '100%',
  margin: '0 auto',
  background: 'rgba(255, 255, 255)',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const ContainerNav = styled(Box)(() => ({
  paddingBlock: '1.2em',
  cursor: 'pointer',
}));
