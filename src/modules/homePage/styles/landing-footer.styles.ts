import { Box, styled } from '@mui/material';
import { Color } from '../../../theme';

// const boxContainer = {
//   width: '100%',
//   maxWidth: '1328px',
//   marginInline: 'auto',
//   display: 'grid',
//   gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)' },
//   gridTemplateRows: 'repeat(3,1fr)',
//   justifyContent: 'space-between',
//   mt:'5rem',

// };

export const BoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1328px',
  marginInline: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gridTemplateRows: 'repeat(3,1fr)',
  justifyContent: 'space-between',
  marginTop: '5rem',

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    marginTop: '3rem',
  },
  [theme.breakpoints.down(321)]: {
    maxWidth: '320px',
    margin: 0,
    marginTop: '2rem',
  },
}));

const gridItem = {
  gridColumn: '1 / 2',
  gridRow: '1 / 2',
};

const box1 = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: '10px',
  paddingInline: { xs: '16px', sm: 'auto' },
};

const box2 = {
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: { xs: 'column', sm: 'row' },
  flexWrap: 'wrap',
  mb: '1.5rem',
  mt: { xs: '1.9rem', sm: 'auto' },
  paddingInline: { xs: '16px', sm: 'auto' },
};

const boxContainerFlex = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: { xs: '5px', sm: '12px' },
};

const emailBoxFlex = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: '#2752E7',
  gap: '8px',
};

const heading = {
  fontWeight: 600,
  fontSize: '16px',
  letterSpacing: '-0.03em',
  mb: { xs: 'auto', sm: '1rem' },
};

const subheading = {
  fontWeight: 400,
  fontSize: '14px',
  lineHeigt: '165%',
  letterSpacing: '-0.03em',
  color: Color.pureBlack,
  cursor: 'pointer',
  '&:hover': {
    color: Color.priBlue,
  },
};

const boxheading = {
  mb: { xs: '1.9rem', sm: 'auto' },
};

const copyRightBoxContainer = {
  gridColumn: '1 / -1',
  gridRow: '-2 / 4',
  justifySelf: 'center',
  alignSelf: 'center',
  borderTop: '1px solid #C4C4C4',
  width: '100%',
  maxWidth: '1328px',
  marginInline: 'auto',
};

const copyRightTextContainerBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '56px',
};

const copyRightText = {
  fontWeight: 400,
  fontSize: '14px',
  lineHeigt: '165%',
  letterSpacing: '-0.03em',
  color: '#9B9B9B',
};

const LandingFooterStyles = {
  gridItem,
  box1,
  box2,
  heading,
  subheading,
  boxheading,
  boxContainerFlex,
  emailBoxFlex,
  copyRightBoxContainer,
  copyRightTextContainerBox,
  copyRightText,
};

export default LandingFooterStyles;
