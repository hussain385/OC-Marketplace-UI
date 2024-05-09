import { Color } from '@/theme';
import { Box, styled } from '@mui/material';

export const ProfileStatus = styled(Box)(() => ({
  borderRadius: '8px',
  background: Color.priBlue,
  border: '0px',
  fontFamily: 'Manrope',
  fontWeight: '700',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '4px 12px',
  textTransform: 'uppercase',
  position: 'relative',
  maxWidth: '200px',
  color: Color.priWhite,
  textAlign: 'center',
  height: '22px',
}));

export const TagLabel = styled(Box)(() => ({
  display: 'inline-flex',
  borderRadius: '24px',
  background: Color.priWhite,
  border: `1px solid ${Color.pureBlack}`,
  fontFamily: 'Manrope',
  fontWeight: '700',
  fontSize: '12px',
  padding: '6px 14px',
  position: 'relative',
  color: '#646465',
  textAlign: 'center',
  height: '32px',
  gap: '10px',
  cursor: 'pointer',
  margin: '0px 8px 8px 0px',
  '&::last-child': {
    marginRight: '0px',
  },
}));
