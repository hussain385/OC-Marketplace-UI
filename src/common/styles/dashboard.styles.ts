import { Color } from '@/theme';
import { Box, styled, Typography } from '@mui/material';

export const AccountInfoBox = styled(Box)(({ theme }) => ({
  width: '320px',
  height: '162px',
  flexGrow: '0',
  padding: '24px 24px 38px',
  borderRadius: ' 8px',
  boxShadow: ' 0 2px 12px 0 rgba(0, 0, 0, 0.12)',
  backgroundColor: '#fff',
  border: 'none',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    display: 'grid',
    width: '100%',
    placeItems: 'flex-start',
    gridTemplateColumns: '10% 80% 10%',
    gap: '16px',
    margin: 0,
    padding: '10px 21px 10px 16px',
    boxShadow: 'none',
    borderTop: `1px solid ${Color.line}`,
    borderBottom: `1px solid ${Color.line}`,
    borderRadius: '0',
    height: 'auto',
  },
}));
export const TitleBox = styled(Box)(({ theme }) => ({
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
}));
export const NotificationWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px 5px 10px 5px',
  background: Color.bgLightOrange,
  border: `1px solid ${Color.borderLightOrange}`,
  [theme.breakpoints.up('lg')]: {
    maxWidth: '70%', // Set maxWidth to 70% for lg and larger screens
    padding: '10px 21px 10px 21px',
    flexDirection: 'row',
  },
}));
export const NotificationSubWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
export const NotificationTitle = styled(Typography)(({ theme }) => ({
  Color: Color.pureBlack,
  fontWeight: 700,
  fontSize: '12px',
  textAlign: 'center',
  [theme.breakpoints.up('lg')]: {
    fontSize: '15px',
    textAlign: 'left',
  },
}));
export const NotificationSubTitle = styled(Typography)(({ theme }) => ({
  color: '#7A7A7A',
  fontWeight: 600,
  fontSize: '10px',
  textAlign: 'center',
  marginBottom: '10px',
  [theme.breakpoints.up('lg')]: {
    fontSize: '11px',
    textAlign: 'left',
    margin: 0,
  },
}));
export const AccountWrapper = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    width: '100%',
    margin: '0 auto',
  },
  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
  },
}));
