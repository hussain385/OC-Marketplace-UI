import { Box, styled } from '@mui/material';

const urlImage = {
  mobile: 'url(../../login/bg_login_mobile.svg)',
  tablet: 'url(../../login/bg_login_desk.svg)',
  desktop: 'url(../../login/bg_login_desk.svg)',
};

export const BackgroundWrapperCustomStyle = styled(Box)(({ theme }) => ({
  maxWidth: '100%',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat !important',
  backgroundSize: 'cover !important',
  width: '100%',
  height: '100vh',
  overflow: 'auto',

  [theme.breakpoints.up('xs')]: {
    background: urlImage.mobile,
    backgroundPositionY: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    backgroundPositionY: '100%',
    background: urlImage.tablet,
  },
  [theme.breakpoints.up('md')]: {
    background: urlImage.desktop,
    backgroundPositionY: '90%',
  },
}));
