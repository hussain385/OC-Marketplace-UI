// import { Box, styled } from '@mui/material';

import { styled, Typography, Box } from '@mui/material';
import { Color } from '../../theme';

import { utilityStyles } from './utility.styles';

const {
  maxWidthx748,
  lineHeightx24,
  lineHeightx16,
  lineHeightx33,
  fontSizex14,
  fontSizex12,
  flex,
  flexgapx2,
  spacingx3,
  positionEnd,
  positionCenter,
  boldText,
  semiBoldText,
  lightBold,
  spacingx05,
  topx19,
  topx4,
} = utilityStyles;

const backgroundWrapperImage = {
  background: {
    xs: Color.priWhite,
    sm: 'url(../../login/bg_login_desk.svg)',
  },
  overflow: 'auto',
  // '&::-webkit-scrollbar': {
  //   width: '0.1em',
  // },
  // '&::-webkit-scrollbar-track': {
  //   boxShadow: `inset 0 0 6px ${Color.line}`,
  //   webkitBoxShadow: `inset 0 0 6px ${Color.line}`,
  // },
  // '&::-webkit-scrollbar-thumb': {
  //   backgroundColor: Color.line,
  //   outline: '1px solid #eaeaea',
  // },
  position: 'relative',
};

const boxWrapperCustomtyles = {
  maxWidth: maxWidthx748,
  position: 'absolute',
  top: 0,
  marginTop: { xs: '5rem', md: '8rem' },
  height: 'auto',
  padding: {
    xs: '0',
    sm: '56px 56px 0 52px',
    md: '48px 46px 46px 46px',
  },
};

// wrappper
const backLayoutCustomStyle = {
  boxShadow: 'none',
  padding: 0,
  marginLeft: '-12px',
  marginTop: '-20px',
};

/////////// Typography //////////////

// VerifyIdentityTypography styles

export const IdentityHeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: boldText,
  fontSize: lineHeightx24,
  lineHeight: lineHeightx33,
  letterSpacing: spacingx3,
  mt: topx19,
}));

export const IdentitySubHeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: lightBold,
  fontSize: fontSizex14,
  lineHeight: lineHeightx24,
  letterSpacing: spacingx05,
}));

export const OptioSubmitText = styled('span')(({ theme }) => ({
  fontWeight: boldText,
  fontSize: fontSizex14,
  lineHeight: lineHeightx24,
  letterSpacing: spacingx3,
  color: Color.priBlue,
  [theme.breakpoints.down(376)]: {
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
  },
}));

export const OptioReviewDetailsText = styled('span')(({ theme }) => ({
  fontWeight: boldText,
  fontSize: fontSizex14,
  lineHeight: lineHeightx24,
  letterSpacing: spacingx3,
  color: Color.textHint,
  [theme.breakpoints.down(376)]: {
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
    width: '6ch',
  },
}));

//identiti registration info

export const IdentityParagraphInfo = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '32px',
  letterSpacing: '-0.03em',
  color: '#7e7e7e',
}));

export const IdentityRegistrationInfo = styled(Typography)(({ theme }) => ({
  mb: 1,
  fontWeight: 700,
  fontSize: '16px',
  letterSpacing: '-0.03em',
  lineHeight: '22px',
  [theme.breakpoints.down('sm')]: {
    paddingInline: '16px',
  },
}));

//end identiti registration info

// end VerifyIdentityTypography

// RetrieveInfoComponent styles

export const QuestionResidentText = styled(Typography)(({ theme }) => ({
  fontWeight: semiBoldText,
  fontSize: fontSizex12,
  lineHeight: lineHeightx16,
  letterSpacing: spacingx3,
  color: Color.textHint,
  display: flex,
  justifyContent: positionEnd,
}));

// end RetrieveInfoComponent

//DocumentTypeComponent

export const DocumentTypeText = styled('span')(({ theme }) => ({
  fontWeight: boldText,
  fontSize: fontSizex14,
  lineHeight: lineHeightx24,
  letterSpacing: spacingx3,
  color: Color.textHint,
}));

//end DocumentTypeComponent

//term and condtion span

const customCheckMark = {
  mt: '2px',
};

//end term and condtion span

//end typography

/////////////////// Box ////////////////////////

//VerifyIdentityTypography

export const VerifyIdentityBox = styled(Box)(({ theme }) => ({
  display: flex,
  gap: flexgapx2,
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

export const ChoicesBoxFlex = styled(Box)(({ theme }) => ({
  display: flex,
  alignItems: positionEnd,
  gap: '5px',
  [theme.breakpoints.down(376)]: {
    display: 'flex',
    marginBlock: '16px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    maxWidth: '103px',
  },
}));

export const TermConditonBoxFlex = styled(Box)(({ theme }) => ({
  display: flex,
  alignItems: positionEnd,
  gap: '5px',
  // [theme.breakpoints.down(376)]: {
  //   display: 'flex',
  //   marginBlock: '16px',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexWrap: 'wrap',
  //   alignContent: 'center',
  //   maxWidth: '103px',
  // },
  [theme.breakpoints.down('sm')]: {
    paddingInline: '16px',
  },
}));

// end VerifyIdentityTypography

// RetrieveInfoComponent

export const RetrieveInfoBox = styled(Box)(({ theme }) => ({
  mt: topx4,
  display: flex,
  justifyContent: positionEnd,
  cursor: 'pointer',
}));

//term condition

const termCondtionWrapper = {
  alignItems: 'flex-start',
};

const termConditionDescription = {
  fontWeight: semiBoldText,
  fontSize: fontSizex12,
  lineHeight: '18px',
  letterSpacing: spacingx3,
  color: '#1E1E1E',
};
// end term condition

//DocumentTypeComponent

export const DocumentComponentFlex = styled(Box)(({ theme }) => ({
  display: flex,
  alignItems: positionCenter,
  gap: '5px',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

// end DocumentTypeComponent

//end RetrieveInfoComponent

//identitiy registration info

export const IdentityRegistrationInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '20%',
  marginTop: '15px',
  [theme.breakpoints.down('sm')]: {
    paddingInline: '16px',
  },
}));

//end identityregistrationinfo

// button

const btnCustomStyles = {
  width: { xs: '50%', sm: '138px' },
  height: { xs: '50px', sm: '40px' },
  outline: { xs: `1px solid ${Color.line}`, sm: `1px solid ${Color.priBlue}` },
  fontSize: fontSizex14,
  display: 'flex',
};

const customActionCallButton = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: '24px',
};

// button

const skipNowButton = {
  color: Color.pureBlack,
  background: Color.priWhite,
  width: '100%',
  maxWidth: '375px',
  height: '50px',
  mt: 1,
  border: '1px solid #eaeaea',
  fontWeight: 700,
  fontSize: '14px',
  letterSpacing: '-0.05px',
  textTransform: 'initial',
};

export const IndividualStyles = {
  skipNowButton,
  customActionCallButton,
  btnCustomStyles,
  termConditionDescription,
  termCondtionWrapper,
  customCheckMark,
  backLayoutCustomStyle,
  boxWrapperCustomtyles,
  backgroundWrapperImage,
};
