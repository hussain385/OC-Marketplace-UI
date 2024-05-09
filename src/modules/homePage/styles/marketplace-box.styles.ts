import { Box, Typography, styled } from '@mui/material';
import { Color } from '../../../theme';

export const MarketPlaceBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1101px',
  marginInline: 'auto',
  marginTop: '5rem',
}));

export const MarketPlaceHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '48px',
  lineHeigt: '135%',
  letterSpacing: '-0.04em',
  textAlign: 'center',

  [theme.breakpoints.down('sm')]: {
    fontSize: '32px',
  },
}));

export const ExploreHeading = styled(Typography)(({ theme }) => ({
  maxWidth: '201px',
  fontWeight: 600,
  fontSize: '19px',
  lineHeigt: '130%',
  letterSpacing: '-0.02em',
  textAlign: 'center',
  marginTop: '2rem',
}));

export const TextAlignment = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
}));

export const MarketPlaceGridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(201px, 1fr))',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  marginTop: '2rem',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const MarketPlaceGridItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '215px',
}));

export const MarketPlaceIndicatorBox = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  display: 'flex',
  alignItems: 'baseline',
  marginBottom: '16px',
}));

export const MarketPlaceIndicatorBoxItem = styled(Box)(({ theme }) => ({
  width: '64px',
  height: '6px',
  background: Color.priBlue,
  borderRadius: '6px',
}));
