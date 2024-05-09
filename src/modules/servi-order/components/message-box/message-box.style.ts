import { Box, Button, styled } from '@mui/material';
import { Color } from '@/theme';

export const MessageBoxContainer = styled(Box)({
  border: `1px solid ${Color.borderColorGray}`,
  padding: '24px 16px',
  background: Color.priWhite,
});

export const FloatChatIcon = styled(Button)({
  borderRadius: '50%',
  height: '60px',
  width: '40px',
  background: Color.priBlue,
  position: 'fixed',
  zIndex: 100,
  bottom: '4%',
  right: '5%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.08)',
});

export const ModalBackDrop = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  background: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 101,
});
