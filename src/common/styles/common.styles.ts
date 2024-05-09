import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import { Color } from '../../theme';
import { styled as materialStyled } from '@mui/material/styles';

export const MuiModalTextHeading = styled(Typography)(() => ({
  width: '100%',
  maxWidth: 'auto',
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: 1.71,
  letterSpacing: '-0.5px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  color: Color.pureBlack,
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const bottomBtnStyle = {
  display: { xs: 'undefined', md: 'none' },
  background: Color.priWhite,
  borderRadius: '2px',
  width: '100%',
  height: '44px',
  textTransform: 'capitalize',
  lineHeight: 1.71,
  marginBottom: '1em',
  letterSpacing: '-0.5px',
  fontSize: '16px',
  fontWeight: 'bold',
};

export const ErrorLabel = materialStyled(Typography)({
  padding: '4px 0px',
  fontFamily: 'Manrope',
  display: 'inline-block',
  fontSize: '14px',
  margin: '5px 0px',
  color: Color.negative,
});

export const BoxText = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '1rem',
  lineHeight: 1.25,
}));

export const ContainerNav = styled(Box)(() => ({
  paddingBlock: '1.2em',
  cursor: 'pointer',
}));

export const ProductInfoText = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: '600',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: '-webkit-box',
  '-webkit-line-clamp': '2' /* number of lines to show */,
  'line-clamp': '2',
  '-webkit-box-orient': 'vertical',
}));

export const CompanyBottomContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up(0)]: {
    width: '100%',
    gap: '5px',
    flexDirection: 'column',
  },
  [theme.breakpoints.up(769)]: {
    width: '60%',
    gap: '10px',
    flexDirection: 'row',
  },
  [theme.breakpoints.up(869)]: {
    width: '50%',
    gap: '10px',
    flexDirection: 'row',
  },
  [theme.breakpoints.up(990)]: {
    width: '40%',
    gap: '10px',
    flexDirection: 'row',
  },
}));
