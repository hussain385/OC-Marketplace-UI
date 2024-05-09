import { AppBar, Box, styled } from '@mui/material';
import { Color } from '../../theme';

export const BackLayoutWrapperStyle = styled(AppBar)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
  background: Color.priWhite,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
  display: 'flex',
  color: Color.textBlack,
  maxHeight: '64px',
  padding: '20px 15px',
}));

export const BackLayoutBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  cursor: 'pointer',
}));

export const BackText = styled('span')(({ theme }) => ({
  fontWeight: 700,
  lineHeight: '24px',
  fontSize: '16px',
}));
