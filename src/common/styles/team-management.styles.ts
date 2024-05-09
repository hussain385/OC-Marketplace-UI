import { Box, Button, styled, Typography } from '@mui/material';
import { Color } from '../../theme';

export const EntityLabel = styled(Typography)({
  fontSize: '12px',
  fontFamily: 'Manrope',
  fontWeight: 700,
  display: 'inline-flex',
  color: Color.textHint,
  alignItems: 'center',
});

export const EntityName = styled(Box)({
  fontSize: '12px',
  fontFamily: 'Manrope',
  fontWeight: 700,
  textTransform: 'uppercase',
  display: 'inline-flex',
  color: Color.textBlack,
  alignItems: 'center',
  marginLeft: '15px',
});

export const SortableContainer = styled(Box)({
  borderTop: `1px solid ${Color.bgLine}`,
  borderBottom: `1px solid ${Color.bgLine}`,
  marginTop: '18px',
  marginBottom: '18px',
  padding: '14px 0px',
  display: 'flex',
});

export const RemoveButton = styled(Button)({
  padding: '4px 8px',
  background: Color.bgGreyLight,
  color: Color.priBlue,
  fontWeight: 700,
  textTransform: 'capitalize',
});

export const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));
