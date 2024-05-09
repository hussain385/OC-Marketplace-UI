import { Color } from '../../theme';

const popupBoxChildrenStyles = {
  width: '95%',
  maxWidth: '444px',
  borderRadius: '8px',
  height: 'auto',
  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.12)',
  padding: '36px',
  position: 'fixed',
  background: Color.priWhite,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
};

const singpassInfoText = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '1.5',
  letterSpacing: '-0.5px',
  marginBottom: '6px',
  color: Color.negative,
};

const singpassInfoDescriptionText = {
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '1.5',
  letterSpacing: '-0.5px',
  marginBottom: '6px',
  color: Color.textBlack,
};

const singpassButtonWrapper = {
  display: 'flex',
  justifyContent: 'center',
};

const singpassButtonLabel = {
  fontSize: '14px',
  fontWeight: 'bold',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.5,
  letterSpacing: '-0.5px',
  textTransform: 'initial',
  color: Color.textBlack,
};

export const SingpassInvalidMessageStyles = {
  popupBoxChildrenStyles,
  singpassInfoText,
  singpassInfoDescriptionText,
  singpassButtonWrapper,
  singpassButtonLabel,
};
