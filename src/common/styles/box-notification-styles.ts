import { SxProps } from '@mui/material';

const verificationOnHoldMessage = {
  width: '100%',
  maxWidth: '644px',
  height: 'auto',
};

const visitDashboardCustomFont = {
  fontWeight: 700,
};

const visitDashboardCustomButton = {
  border: '1px solid #eaeaea',
  height: '44px',
  display: 'flex',
};

const customHeading = {
  fontSize: { xs: '18px', sm: '20px' },
  fontWeight: 700,
  lineHeight: '27px',
  letterSpacing: '-0.03em',
  mb: '6px',
};

const customSubHeading = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '-0.03em',
};

const customWrapperButton = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  flexDirection: { xs: 'row', md: 'row' },
  marginTop: '1.5em',
};

const boxMessageNotificationWrapper: SxProps = {
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  padding: { xs: '16px', sm: '26.15px 36px 24px' },
};

const backgroundWrapperIdentifiedMessage = {
  // background: { xs: 'url(../../login/bg_mobile.svg) !important', sm: 'url(../../login/bg_login_desk.svg)' },
  overflow: 'hidden',
  position: 'absolute',
};

const BoxNotificationMessageStyles = {
  verificationOnHoldMessage,
  visitDashboardCustomFont,
  visitDashboardCustomButton,
  customHeading,
  customSubHeading,
  customWrapperButton,
  boxMessageNotificationWrapper,
  backgroundWrapperIdentifiedMessage,
};

export default BoxNotificationMessageStyles;
