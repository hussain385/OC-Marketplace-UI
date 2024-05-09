import { styled, Typography } from '@mui/material';
import { Color } from '@/theme';

export const OutlineTextLabel = styled(Typography)(({ theme }) => ({
  border: `1px solid ${Color.borderColorGray}`,
  padding: '12px 8px',
  fontSize: '14px',
  fontWeight: 600,
  color: Color.textBlack,
  flexGrow: 1,
  letterSpacing: '-0.5px',
  marginRight: '8px',
  '&::last-child': {
    marginRight: '0px',
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    padding: '12px 6px',
  },
}));
