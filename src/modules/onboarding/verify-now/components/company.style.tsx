import { styled, Button } from '@mui/material';
import { Color } from '../../../../theme';

export const ToggleButton = styled(Button)({
  fontSize: '14px',
  fontWeight: '500',
  color: Color.textBlack,
  padding: '10px 16px',
  textTransform: 'inherit',
  border: `1px solid ${Color.bgLine}`,
  '&:hover, &.active': {
    border: `1px solid ${Color.priBlue}`,
    background: Color.priWhite,
    color: Color.textBlack,
    fontWeight: '600',
  },
});
