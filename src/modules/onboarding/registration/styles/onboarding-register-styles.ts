import { Color } from '../../../../theme';

export const customChildStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  maxWidth: 'fit-content',
  padding: '2em',
};

export const createAccountText = {
  maxWidth: '432px',
  height: { xs: '24px', sm: '33px', md: '33px' },
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: { xs: '-0.5px', sm: '0', md: '0' },
  color: Color.lightBlack,
  textAlign: { xs: 'center', sm: 'left' },
  paddingBottom: '2em',
};

export const BoxForm = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: { xs: 'auto', md: '40em' },
  // maxWidth: '432px',
  margin: { xs: '16px auto', sm: '0' },
};

export const createAccountButtonStyle = {
  width: '50%',
  borderRadius: '2px',
  height: '44px',
  fontSize: '1.25rem',
  marginTop: '1em',
};

export const createAccountButtonText = {
  fontSize: '16px',
  fontWeight: 'bold',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.5,
  letterSpacing: '-0.5px',
  textTransform: 'none',
};

export const createAccountBoxWrapperButton = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const pleaseWaitText = {
  fontSize: '1rem',
  fontWeight: 'bold',
};

export const termandcondtionText = {
  color: Color.bgGreyDark,
  fontSize: '12px',
  width: { xs: '90%', sm: 'auto' },
  fontWeight: 600,
  lineHeight: 1.5,
  letterSpacing: '-0.5px',
  marginBlock: '1.5rem',
};

export const emailAddressBoxWrapper = {
  display: 'flex',
  gap: '1em',
  width: '100%',
};

export const customBackLayoutStyle = {
  boxShadow: 'none',
  padding: '0px',
};

export const registerCustomStyles = {
  BoxForm,
  createAccountBoxWrapperButton,
  createAccountButtonStyle,
  createAccountButtonText,
  createAccountText,
  customBackLayoutStyle,
  customChildStyle,
  emailAddressBoxWrapper,
  pleaseWaitText,
  termandcondtionText,
};
