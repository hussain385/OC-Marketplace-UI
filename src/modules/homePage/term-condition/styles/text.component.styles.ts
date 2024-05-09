import { styled as materialStyled, Typography } from '@mui/material';

export const TextContentStyle = materialStyled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeigt: '155%',
  marginTop: '24px',
  marginBottom: '16px',
}));

export const TextContentBold = materialStyled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  lineHeigt: '155%',
  marginTop: '24px',
  marginBottom: '16px',
}));
