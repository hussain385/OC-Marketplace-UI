import { Color } from '../../../../theme';

const singpassInfoBoxWrapper = {
  marginBottom: '1em',
  border: { xs: '1px solid #eaeaea', sm: 'none' },
  padding: { xs: '16px', sm: '0' },
  marginTop: '10px',
};

const singpassInfoBoxContainer = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  marginTop: '10px',
};

const singpassInfoBoxContainerLabel = {
  fontSize: '14px !important',
  fontWeight: '600',
};

const singpassInfoBoxContainerLabel1 = {
  ...singpassInfoBoxContainerLabel,
  color: Color.bgGreyDark,
  width: '30%',
};

const singpassInfoBoxContainerLabel2 = {
  ...singpassInfoBoxContainerLabel,
  color: Color.pureBlack,
  width: '70%',
  ml: 1,
  overflowWrap: 'break-word',
};

const checkMarkBoxContainer = {
  fontSize: '12px !important',
  fontWeight: '600',
  maxWidth: { xs: '100%', md: '645px' },
  marginTop: '1em',
};

const buttonBoxContainer = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  flex: '1',
  justifyContent: 'space-between',
  alginItems: 'flex-end',
  mt: 5,
};

const singpassReviewStyles = {
  checkMarkBoxContainer,
  buttonBoxContainer,
  singpassInfoBoxWrapper,
  singpassInfoBoxContainer,
  singpassInfoBoxContainerLabel1,
  singpassInfoBoxContainerLabel2,
  singpassInfoBoxContainerLabel,
};

export default singpassReviewStyles;
