import { Box, styled } from '@mui/material';

export const GridDivContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1440px',
  marginInline: 'auto',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '80vh 1fr 1fr 0.4fr 322px 200px',
  background: '#ffffff',
  height: '100vh',
  [theme.breakpoints.down(321)]: {
    width: '89%',
    margin: 0,
    padding: 0,
    userSelect: 'none',
  },
}));

export const GridBoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginInline: 'auto',

  [theme.breakpoints.down(321)]: {
    width: '89%',
    margin: 0,
    padding: 0,
  },
}));

export const MarketPlaceBoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginInline: 'auto',

  [theme.breakpoints.down(1441)]: {
    marginTop: '6vh',
  },
  [theme.breakpoints.down(321)]: {
    width: '89%',
    margin: 0,
    padding: 0,
  },
}));

// };

// promote

const promote_customWrapperStyles = {
  maxWidth: '1440px',
  background: {
    xs: 'none',
    sm: `url(${require('../../../assets/home-page/buyer/services-bg.svg').default}),rgba(255,255,255, 0.15)`,
  },
  backgroundPosition: `top,center`,
  minHeight: '489px',
};

const promote_customStyles = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
};

const promote_customFontHeaderStyles = {
  fontWeight: 700,
  fontSize: '24px',
  lineHeigt: '135%',
  letterSpacing: '-0.04em',
  color: '#E50F8C',
  maxWidth: '319px',
};

const promote_customFontDescriptionStyles = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeigt: '135%',
  letterSpacing: '-0.04em',
  mt: '16px',
  maxWidth: '320px',
  mb: { xs: '2rem', sm: 'auto' },
};

const promote_subheading = {
  fontWeight: 400,
  fontSize: '20px',
  lineHeigt: '135%',
  letterSpacing: '-0.04em',
  textAlign: 'center',
  mt: '24px',
  maxWidth: '880px',
  marginInline: 'auto',
};

// custom marketplacebox styles

// start card items

const card_boxCustomStyles = {
  justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' },
  alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
  mt: { xs: '4rem', sm: 'auto' },
};

const card_customHeadlineStyles = {
  fontSize: { xs: '32px', sm: '36px' },
  maxWidth: '28ch',
  marginInline: 'auto',
};

const card_customFontHeaderStyles = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeigt: '135%',
  letterSpacing: '-0.04em',
  textAlign: 'left',

  maxWidth: '334px',
  mt: { xs: '1rem', sm: '2rem' },
};

const card_customFontDescriptionStyles = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeigt: '135%',
  letterSpacing: '-0.04em',
  textAlign: 'left',
  maxWidth: '334px',
  mt: '10px',
};

const MarketPlaceBoxCustomStyles = {
  promote_customWrapperStyles,
  promote_customStyles,
  promote_customFontHeaderStyles,
  promote_customFontDescriptionStyles,
  promote_subheading,
  card_boxCustomStyles,
  card_customFontHeaderStyles,
  card_customFontDescriptionStyles,
  card_customHeadlineStyles,
};

const guildelineRouteCustomButtonStyle = {
  background: '#E50F8C',
  height: '50px',
  '&:hover': {
    background: '#E50F8C',
  },
};

const guildelineRouteButtonText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '135%',
  cursor: 'pointer',
};

const guildelineRouteButtonTextalignment = {
  marginRight: '6px',
};

const GuidelineRouteCustomStyles = {
  guildelineRouteCustomButtonStyle,
  guildelineRouteButtonText,
  guildelineRouteButtonTextalignment,
};

// end card items

const SellerComponentStyles = {
  MarketPlaceBoxCustomStyles,
  GuidelineRouteCustomStyles,
};

export default SellerComponentStyles;
