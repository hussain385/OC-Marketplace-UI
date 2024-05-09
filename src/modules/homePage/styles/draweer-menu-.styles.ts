import { IconButton, styled } from '@mui/material';
import { Color } from '../../../theme';

const boxContainer = {
  width: '100%',
  marginInline: 'auto',
  p: '32px 24px',
};

const gridBoxtem = {
  display: 'flex',
  flexDirection: 'column',
};

const gridItem1 = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const gridItemFlex1 = {
  display: 'flex',
};

const gridItem2 = {
  display: 'flex',
  gap: '10px',
};

const listItems = {
  lineHeight: '40px',
  padding: '0',
};

const listItemText = {
  color: '#1D2130',
  fontWeight: 600,
  fontSize: '13px',
  paddingBlock: '8px',
  '&:hover': {
    background: Color.bgGreyLight,
  },
};

const gridItem3 = {
  gridColumn: '1/-1',
  gridRow: '3 / 4',
  mt: '2rem',
};

const button = {
  width: '100%',
  maxWidth: '327px',
  paddingBlock: '8px',
  borderRadius: '100px',
  height: '40px',
  mt: '1rem',
  textTransform: 'initial',
};

const buttonWhite = {
  ...button,
  outline: `1px solid ${Color.priBlue}`,
  color: Color.textBlack,
  display: 'flex',
  gap: '5px',
};

const buttonBlue = {
  ...button,
  background: Color.priBlue,
  color: Color.priWhite,
  mt: '1rem',
  '&:hover': {
    background: Color.priBlue,
  },
};

const footerContainer = {
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  left: '0',
  right: '0',
  bottom: '24px',
};

const footerContainerBoxItems = {
  display: 'flex',
  gap: '24px',
  width: '100%',
  justifyContent: 'center',
};

const footerText = {
  color: '#7e7e7e',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '165%',
  '&:hover': {
    cursor: 'pointer',
    color: Color.priBlue,
  },
};

export const DrawerIcon = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  color: '#000000',
  justifyContent: 'flex-end',
  [theme.breakpoints.up('sm')]: {
    padding: '12px !important',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px 0 8px 8px !important',
  },
}));

const menuIcon = {
  display: { xs: 'flex', md: 'none' },
  fontSize: '2.2rem',
  '&:hover': {
    background: 'transparent !important',
  },
};

const paperProps = {
  width: '100%',
};

const DraweMenuStyles = {
  boxContainer,
  gridBoxtem,
  gridItem1,
  gridItemFlex1,
  gridItem2,
  listItemText,
  listItems,
  gridItem3,
  buttonWhite,
  buttonBlue,
  footerContainer,
  footerContainerBoxItems,
  footerText,
  menuIcon,
  paperProps,
};

export default DraweMenuStyles;
