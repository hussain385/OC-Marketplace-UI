import { Color } from '../../../theme';
import { Box, styled } from '@mui/material';

export const GridSellerDivContainer = styled(Box)(({ theme }) => ({
  backgroundPosition: 'center',
  backgroundBlendMode: 'multiply',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: 'grid',
  gridTemplateRows: '4vh 1fr',
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
  [theme.breakpoints.down(321)]: {
    width: '320px',
    margin: 0,
    padding: 0,
    userSelect: 'none',
  },

  [theme.breakpoints.down(1441)]: {
    minHeight: '100vh',
  },
}));

const gridItem = {
  // background: '#ffffff',
  // height:'80px',
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  justifyContent: 'space-between',
};

const gridItemVisible = {
  background: '#ffffff',
  height: '80px',
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  justifyContent: 'space-between',
  position: 'sticky',
  top: 0,
  zIndex: 999999999,
};

export const BoxContainerItem = styled(Box)(({ theme }) => ({
  backgroundRepeat: 'no-repeat',
  backgroundPosition: `center top, center bottom`,
  height: '532px',
}));

export const BoxDetailInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '615px',
  marginInline: 'auto',
}));

const topBoxContainer = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '16px',
  alignItems: 'center',
  paddingRight: '56px',
};

const loginSignUpButton = {
  background: Color.priWhite,
  color: Color.priBlue,
  paddingBlock: '8px',
  width: '100%',
  maxWidth: '157px',
  borderRadius: '100px',
  height: '40px',
  '&:hover': {
    background: Color.priWhite,
  },
  textTransform: 'initial',
};

const exploreServiceBtn = {
  background: Color.priBlue,
  color: Color.priWhite,
  fontWeight: 700,
  paddingBlock: '8px',
  width: '100%',
  maxWidth: '137px',
  borderRadius: '100px',
  height: '40px',
  '&:hover': {
    background: Color.priBlue,
  },
  textTransform: 'initial',
};

export const BottomBoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center',
}));

const startSellingBtn = {
  mt: '24px',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '135%',
  background: '#E50F8C',
  color: Color.priWhite,
  paddingBlock: '8px',
  width: '100%',
  maxWidth: '274px',
  borderRadius: '100px',
  height: '50px',
  '&:hover': {
    background: '#E50F8C',
  },
  textTransform: 'initial',
  marginInline: 'auto',
};

const headlineText = {
  fontWeight: { xs: 600, sm: 700 },
  fontSize: { xs: '32px', sm: '54px' },
  lineHeigt: { xs: '135%', sm: '125%' },
  letterSpacing: '-0.04em',
  maxWidth: '25ch',
  marginInline: 'auto',
  textAlign: 'center',
  color: Color.priWhite,
};

const startSellingBtnText = {
  marginRight: '6px',
};

const SellerHeaderStyles = {
  gridItem,
  gridItemVisible,
  headlineText,
  topBoxContainer,
  loginSignUpButton,
  exploreServiceBtn,
  startSellingBtn,
  startSellingBtnText,
};

export default SellerHeaderStyles;
