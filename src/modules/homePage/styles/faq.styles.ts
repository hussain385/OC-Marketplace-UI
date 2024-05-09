import { styled } from '@mui/material';

const boxWrapper = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1104px',
  marginInline: 'auto',
  mt: '5rem',
  mb: '2rem',
};

const headline = {
  fontWeight: 600,
  fontSize: '36px',
  lineHeigt: '135%',
  letterSpacing: '-0.04em',
  textAlign: 'center',
};

const boxGridContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  marginTop: '1em',
};

const gridItem = {
  width: { xs: '92%', sm: '100%', md: '100%' },
  maxWidth: '544px',
  marginInline: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  border: '1px solid #eaeaea',
  padding: '16px',
  minHeight: '140px',
  borderRadius: '8px',
  marginTop: '1em',
};

const headingText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeigt: '22px',
  letterSpacing: '-0.03em',
  textAlign: 'left',
};

const subheadingText = {
  fontWeight: 400,
  fontSize: '14px',
  lineHeigt: '19px',
  letterSpacing: '-0.03em',
  textAlign: 'left',
};

const FaQStyles = {
  boxWrapper,
  headline,
  boxGridContainer,
  gridItem,
  headingText,
  subheadingText,
};

export const TextFaqSubheading = styled('p')(({ theme }) => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeigt: '19px',
  letterSpacing: '-0.03em',
  textAlign: 'left',
}));

export default FaQStyles;
