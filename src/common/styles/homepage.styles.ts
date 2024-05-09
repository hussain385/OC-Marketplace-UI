import { styled } from '@mui/system';
import { Color } from '../../theme';
import { Box, Typography } from '@mui/material';

export const MuiTextField = styled('input')(({ theme }) => ({
  color: Color.lightBlack,
  width: '100%',
  padding: '15px 24px',
  fontSize: '16px',
  fontFamily: 'Manrope',
  borderRadius: '4px',
  border: `0.5px solid ${Color.priBlue}`,

  '&:focus': {
    outline: 'none',
    border: `0.5px solid ${Color.priBlue}`,
  },

  [theme.breakpoints.down('sm')]: {
    padding: '15px 16px',
  },
  [theme.breakpoints.down(321)]: {
    fontSize: '14px',
    padding: '15px 8px',
  },
}));

export const HeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '38px',
  letterSpacing: '-0.5px',
  [theme.breakpoints.up('sm')]: {
    fontWeight: 700,
    fontSize: { sm: '56px', md: '56px' },
    letterSpacing: '-0.02em',
    lineHeight: '120%',
    maxWidth: '21ch',
    color: Color.priBlue,
  },
  [theme.breakpoints.down(321)]: {
    fontSize: '34px',
  },
}));

export const GridTextExplore = styled(Typography)(({ theme }: any) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 600,
    width: '179px',
    height: '40px',
    fontSize: '16px',
    textAlign: 'center',
    lineHeight: 1.25,
    color: Color.textBlack,
    margin: '16px 0',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 600,
    width: '130px',
    height: '54px',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: 1.25,
    color: Color.textBlack,
    marginTop: '0.875rem',
  },
}));

export const GridBoxContentExplore = styled(Box)(() => ({
  width: '72px',
  borderRadius: '8px',
  height: '72px',
}));

export const GridBoxContainer = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  lineHeight: 1.25,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    width: '100%',
    maxWidth: '211px',
    padding: '24px 16px',
  },

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '154px',
    padding: '16px 12px',
    height: 'auto',
    margin: '16px 0',
  },
  [theme.breakpoints.down(321)]: {
    display: 'flex',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '154px',
    padding: '16px 0',
    height: 'auto',
    margin: '16px 0',
  },
}));
