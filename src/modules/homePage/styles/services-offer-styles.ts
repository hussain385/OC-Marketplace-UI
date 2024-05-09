import { Color } from '../../../theme';
import { Box, styled } from '@mui/material';

const boxGridContainer = {
  backgroundPosition: `center bottom`,
  display: 'grid',
  gridTemplateColumns: '1fr',
  minHeight: '50vh',
  backgroundRepeat: 'no-repeat',
};

const gridItem = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
};

export const GridItemDiv = styled(Box)(({ theme }) => ({
  display: 'grid',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2,1fr)',
    gridAutoFlow: 'column',
  },

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    minWidth: '343px',
    marginInline: 'auto',
  },
}));

export const BoxContainerItem = styled(Box)(({ theme }) => ({
  backgroundRepeat: 'no-repeat',
  backgroundPosition: `center top, center bottom`,
  height: 'auto',
  backgroundSize: 'contain',
}));

export const BoxDetailInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '615px',
  marginInline: 'auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '92%',
    marginInline: 'auto',
  },
}));

const headingText = {
  fontWeight: 600,
  fontSize: { xs: '14px', lg: '19px' },
  lineHeigt: '130%',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  color: Color.textHint,
  mb: { xs: '1rem', sm: 'auto' },
  mt: { xs: '3rem', sm: 'auto' },
};

const subheadingText = {
  fontWeight: 600,
  fontSize: { xs: '32px', lg: '49px' },
  lineHeigt: '135%',
  letterSpacing: '-0.04em',
  mb: { xs: '1rem', sm: 'auto' },
};

const descriptionText = {
  fontWeight: 500,
  fontSize: { xs: '14px', lg: '18px' },
  lineHeigt: '155%',
  letterSpacing: '-0.04em',
};

const ServicesOfferStyles = {
  boxGridContainer,
  gridItem,
  headingText,
  subheadingText,
  descriptionText,
};

export default ServicesOfferStyles;
