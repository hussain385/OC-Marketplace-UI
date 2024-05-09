import { Box, Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import { Color } from '../../theme';

export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  width: '95%',
  margin: '0 auto',
  justifyContent: 'space-between',
  paddingBlock: '1rem',
  [theme.breakpoints.up('md')]: {
    width: '95%',
    maxWidth: '1440px',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
}));

export const WrapperMain = styled('div')(({ theme }) => ({
  display: 'block',
  width: '90%',
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    width: '92%',
    margin: '0 auto',
  },
  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: '92%',
    maxWidth: '1280px',
    margin: '0 auto',
  },
}));

export const WrapperFooter = styled('div')(({ theme }) => ({
  background: Color.priWhite,
  marginTop: '48px',
  [theme.breakpoints.up('sm')]: {
    background: Color.priWhite,
    marginTop: '80px',
  },
  [theme.breakpoints.up('md')]: {
    background: Color.priWhite,
    marginTop: '114px',
  },
}));

export const Wrapper = styled('div')(() => ({
  width: '100%',
  margin: '0 auto',
}));

export const appBarStyles = {
  width: '100%',
  backgroundColor: { xs: Color.priWhite, md: 'transparent' },
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '5em',
  paddingInline: '1em',
};

export const mainContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  width: '100%',
  maxWidth: '1440px',
};

export const ForSellerText = styled('span')(({ theme }) => ({
  color: '#33AAD7',
  fontWeight: 600,
  letterSpacing: '-0.03em',
  fontSize: '14px',
  marginTop: '12px',
  [theme.breakpoints.up('xs')]: {
    fontSize: '10px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
}));

export const SecondaryBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'row',
  minHeight: '48px',
  alignItems: 'center',
  width: '80%',
  [theme.breakpoints.up('xs')]: {
    gap: '5px',
  },
  [theme.breakpoints.up('lg')]: {
    gap: '14px',
  },
}));

export const loginBtnStyles = {
  color: Color.priBlue,
  gap: '5px',
  borderRadius: '100px',
  border: `1px solid ${Color.priBlue}`,
  padding: '5px 10px',
  textTransform: 'none',
  height: { xs: 'fit-content', md: 'auto' },
};

export const MobileDrawerItemButton = {
  color: 'black',
  textTransform: 'none',
  fontWeight: '600',
  minWidth: 0,
  fontSize: '15px',
  flexDirection: 'row',
  gap: '1em',
  width: '80%',
  justifyContent: 'flex-start',
};
