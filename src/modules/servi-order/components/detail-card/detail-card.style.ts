import { Box, styled } from '@mui/material';
import { Color } from '@/theme';

export const DetailCardBox = styled(Box)({
  fontSize: '12px',
  fontFamily: 'Manrope',
  border: `1px solid ${Color.borderColorGray}`,
  '& .header': {
    fontWeight: 700,
    border: `1px solid ${Color.line}`,
    background: 'rgba(39, 82, 231, 0.1)',
    padding: '12px 16px',
    '&.sub-header': {
      background: Color.priWhite,
    },
  },
  '& .content': {
    padding: '16px',
    background: Color.priWhite,
    fontWeight: 400,
  },
  '& .footer': {
    borderTop: `1px solid ${Color.borderColorGray}`,
    padding: '12px 16px',
  },
});
