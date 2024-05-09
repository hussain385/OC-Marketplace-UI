import { Color } from '../../theme';

export const skipModalWrapper = {
  width: '95%',
  maxWidth: '504px',
  borderRadius: '8px',
  height: 'auto',
  padding: { xs: '40px 18px', md: '40px 36px' },
  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.12)',
  position: 'fixed',
  background: Color.priWhite,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
};

export const skipCustomHeading = {
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '1.5',
  letterSpacing: '-0.5px',
  marginBottom: '6px',
};

export const skipCustomSubHeading = {
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '24px',
  letterSpacing: '-0.5px',
  marginBottom: '24px',
};

export const skipCustomButtonWrapper = {
  display: 'flex',
  flexDirection: { xs: 'column-reverse', md: 'row' },
  gap: '16px',
};

export const skipCustomCancelButton = {
  width: { xs: '100%', md: '50%' },
  borderRadius: '2px',
  height: '44px',
  fontSize: '1.25rem',
  marginTop: '8px',
  background: Color.bgGreyLight,
  color: Color.priBlue,
};

export const skipCustomActionButton = {
  width: { xs: '100%', md: '50%' },
  borderRadius: '2px',
  height: '44px',
  fontSize: '1rem',
  marginTop: '8px',
};
export const skipCustomButtonLabel = {
  fontSize: '14px',
  fontWeight: 'bold',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.5,
  letterSpacing: '-0.5px',
  textTransform: 'initial',
};
