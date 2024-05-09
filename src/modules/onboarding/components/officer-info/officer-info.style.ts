import { Box, styled } from '@mui/material';
import { Color } from '../../../../theme';

export const OfficerInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxWidth: '656px',
  marginTop: '10px',
  alignItems: 'center',
  flexDirection: 'row',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: 'Manrope',
  borderRadius: '4px',
  padding: '8px',
  color: Color.textHint,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: Color.bgLine,
  background: Color.priWhite,
  '&.is-active': {
    background: Color.bgGreyLight,
    borderColor: Color.bgGreyLight,
  },
  [theme.breakpoints.down('sm')]: {
    '&.info': {
      flexDirection: 'column',
    },
  },
}));

const officerInfoFlex = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
};

const officerboxContainerLabel = {
  ...officerInfoFlex,
  flexDirection: 'row',
  gap: '1%',
};

const officerBoxContainerValue = {
  ...officerInfoFlex,
  flexDirection: 'row',
};

// desktop

const desktopOfficerBoxWrapper = {
  ...officerInfoFlex,
  flexDirection: 'column',
  flexWrap: 'wrap',
};

// mobile

const mobileOfficerBoxWrapper = {
  ...officerInfoFlex,
  justifyContent: 'space-around',
  flexDirection: 'column',
  flexWrap: 'wrap',
};

const mobileContainerValue1 = {
  ...officerBoxContainerValue,
  mb: '10px',
};

const officerInfoStyles = {
  desktopOfficerBoxWrapper,
  officerboxContainerLabel,
  officerBoxContainerValue,
  mobileContainerValue1,
  mobileOfficerBoxWrapper,
  officerInfoFlex,
};

export default officerInfoStyles;
