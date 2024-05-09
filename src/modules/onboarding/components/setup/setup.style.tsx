import { styled, Stepper } from '@mui/material';
import { Color } from '../../../../theme';

export const CustomStepper = styled(Stepper)({
  '.MuiStepLabel-label': {
    fontSize: '14px',
    fontWeight: 700,
  },
  '.Mui-completed, .Mui-active': {
    color: Color.priBlue,
  },
});
