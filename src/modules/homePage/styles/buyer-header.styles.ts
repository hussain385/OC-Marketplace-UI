import { Box, styled } from '@mui/material';
import { Color } from '../../../theme';
import HomePageImage from '@/assets/new-homepage/homepage.png';
import HomePageXsImage from '@/assets/new-homepage/homepage-xs.png';

// const boxGridContainer = {
//   backgroundImage: {
//     xs: `url(${require('../../../assets/home-page/buyer/header-xs.svg').default})`,
//     md: `url(${require('../../../assets/home-page/buyer/header.svg').default})`,
//   },

//   backgroundSize: 'cover',
//   backgroundRepeat: 'no-repeat',
//   backgroundPosition: 'center bottom',
//   display: 'grid',
//   placeItems: 'center',
// };
export const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  placeItems: 'center',
  [theme.breakpoints.up('sm')]: {
    background: `url(${HomePageImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
  },

  [theme.breakpoints.down('sm')]: {
    background: `url(${HomePageXsImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
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
  justifyContent: { xs: 'flex-start', md: 'center' },
  alignItems: { xs: 'center', md: 'flex-start' },
};

const headingText = {
  fontWeight: 700,
  color: 'var(--gray-900, #101828)',
  fontSize: { xs: '32px', sm: '54px' },
  lineHeight: { xs: '135%', sm: '125%' },
  letterSpacing: '-0.04em',
  maxWidth: '14ch',
  textAlign: { xs: 'center', md: 'start' },
};

const subheadingText = {
  fontWeight: 500,
  fontSize: '20px',
  lineHeigt: '155%',
  letterSpacing: '-0.04em',
  maxWidth: '32ch',
  mt: '8px',
  mb: '16px',
  textAlign: { xs: 'center', md: 'start' },
};

const button = {
  background: Color.priBlue,
  color: Color.priWhite,
  paddingBlock: '8px',
  width: '100%',
  fontWeight: 700,
  maxWidth: '274px',
  borderRadius: '100px',
  height: '50px',
  '&:hover': {
    background: Color.priBlue,
  },
  textTransform: 'initial',
};

const BuyerHeaderStyles = {
  gridItem,
  headingText,
  subheadingText,
  button,
};

export const GridBoxContainer2 = styled(Box)(({ theme }) => ({
  width: '100%',
  marginInline: 'auto',
  [theme.breakpoints.down(321)]: {
    maxWidth: '320px',
    margin: 0,
    padding: 0,
  },
}));

export default BuyerHeaderStyles;
