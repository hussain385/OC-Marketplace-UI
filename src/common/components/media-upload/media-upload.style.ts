import { Box, styled } from '@mui/material';
import { Color } from '../../../theme';

export const UploadFilesButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  fontFamily: 'Manrope',
  color: Color.priBlue,
  fontWeight: 600,
  textTransform: 'inherit',
  backgroundColor: Color.bgGreyLight,
  padding: '10px 28px',
  '&:hover': {
    backgroundColor: Color.secondaryHover,
  },
});

export const AttachedFile = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 0px',
  color: Color.priBlue,
  fontWeight: 600,
  margin: '10px 0px',
});
