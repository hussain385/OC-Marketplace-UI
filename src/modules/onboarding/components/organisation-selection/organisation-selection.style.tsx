import { styled, Box, Button } from '@mui/material';
import { Color } from '../../../../theme';

export const BusinessEentityType = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const ToggleButton = styled(Button)({
  fontSize: '14px',
  fontWeight: '500',
  color: Color.textBlack,
  padding: '10px 16px',
  textTransform: 'inherit',
  border: `1px solid ${Color.bgLine}`,
  '&:hover, &.active': {
    border: `1px solid ${Color.priBlue}`,
    background: Color.priWhite,
    color: Color.textBlack,
    fontWeight: '600',
  },
});

export const heading24Mobile = {
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '32px',
  letterSpacing: '-0.03em',
  border: 'none',
  maxWidth: '343px',
};

const mobileBoxWrapper = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const mobiletoggleNonSingaporeButton = {
  maxWidth: '100%',
  height: '40px',
};

const mobileToggleSingaporeButton = {
  ...mobiletoggleNonSingaporeButton,
  mr: '8px',
};

const mobileButtonBoxWrapper = {
  display: 'flex',
  flex: 1,
  mt: '16px',
};

const mobileButtonText = {
  fontSize: '13px',
  letterSpacing: '-0.03em',
  fontWeight: 600,
  lineHeight: '135%',
  padding: '8px 0',
};

const mobiletoggleButtonText1 = {
  ...mobileButtonText,
  width: '126px',
};

const mobiletoggleButtonText2 = {
  ...mobileButtonText,
  width: '157px',
};

const organizationSelectionStyle = {
  mobileBoxWrapper,
  mobiletoggleNonSingaporeButton,
  mobiletoggleButtonText1,
  mobiletoggleButtonText2,
  heading24Mobile,
  mobileToggleSingaporeButton,
  mobileButtonBoxWrapper,
};

export default organizationSelectionStyle;
