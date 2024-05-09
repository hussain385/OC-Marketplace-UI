import { Button, styled, Box, Typography } from '@mui/material';
import { Color } from '../../../theme';

export const BoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1328px',
  marginInline: 'auto',
  backgroundRepeat: 'no-repeat',
  display: 'grid',
  placeItems: 'center',
  borderRadius: '12px',

  [theme.breakpoints.up('sm')]: {
    background: `url(${
      require('../../../assets/home-page/buyer/circle-bg.svg').default
    }),linear-gradient(180deg, #378FF8 0%, #00B4D8 100%)`,
  },

  [theme.breakpoints.down('sm')]: {
    background: `url(${
      require('../../../assets/home-page/buyer/circle-bg-xs.svg').default
    }),linear-gradient(180deg, #378FF8 0%, #00B4D8 100%)`,
    borderRadius: 0,
  },
  [theme.breakpoints.down(321)]: {
    maxWidth: '320px',
    margin: 0,
  },
}));

const gridItem = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center',
};

export const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '36px',
  lineHeigt: '125%',
  letterSpacing: '-0.04em',
  textAlign: 'center',
  color: Color.priWhite,
  marginInline: 'auto',
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  },
  [theme.breakpoints.down(321)]: {
    maxWidth: '89%',
    userSelect: 'none',
    fontSize: '24px',
  },
}));

export const ExploreServicesBtn = styled(Button)(({ theme }) => ({
  background: Color.priBlue,
  color: Color.priWhite,
  paddingBlock: '8px',
  width: '100%',
  maxWidth: '208px',
  borderRadius: '100px',
  height: '50px',
  '&:hover': {
    background: Color.priBlue,
  },
  fontSize: '16px',
  textTransform: 'initial',
}));

const GuidelineRouteStyles = {
  gridItem,
};

export default GuidelineRouteStyles;
