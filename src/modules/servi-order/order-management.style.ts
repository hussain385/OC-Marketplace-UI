import { Box, styled, Stepper } from '@mui/material';
import { Color } from '@/theme';
export const OrderStatusLabel = styled(Box)(({ theme }: any) => ({
  borderRadius: '24px',
  background: Color.bgGreyLight,
  border: '0px',
  fontFamily: 'Manrope',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '16px',
  padding: '4px 16px 4px 24px',
  textTransform: 'inherit',
  position: 'relative',
  maxWidth: '200px',
  '&::before': {
    content: '""',
    width: '8px',
    height: '8px',
    borderRadius: '8px',
    background: Color.bgGreyDark,
    position: 'absolute',
    left: '10px',
    top: '50%',
    marginTop: '-3px',
  },
  '&.in_progress': {
    background: `${Color.orderStatus.inprogress}10`,
    color: Color.orderStatus.inprogress,
    '&::before': {
      background: `${Color.orderStatus.inprogress}`,
    },
  },
  '&.request_cancellation': {
    background: `${Color.orderStatus.requestCancellation}10`,
    color: Color.orderStatus.requestCancellation,
    '&::before': {
      background: `${Color.orderStatus.requestCancellation}`,
    },
  },
  '&.request_revision': {
    background: `${Color.orderStatus.requestRevision}10`,
    color: Color.orderStatus.requestRevision,
    '&::before': {
      background: `${Color.orderStatus.requestRevision}`,
    },
  },
  '&.late': {
    background: `${Color.orderStatus.late}10`,
    color: Color.orderStatus.late,
    '&::before': {
      background: `${Color.orderStatus.late}`,
    },
  },
  '&.review_delivery': {
    background: `${Color.orderStatus.reviewDelivery}10`,
    color: Color.orderStatus.reviewDelivery,
    '&::before': {
      background: `${Color.orderStatus.reviewDelivery}`,
    },
  },
  '&.completed, &.finished': {
    background: `${Color.orderStatus.completed}10`,
    color: Color.orderStatus.completed,
    '&::before': {
      background: `${Color.orderStatus.completed}`,
    },
  },
}));

export const ProjectStatusStepper = styled(Stepper)({
  '.MuiStepLabel-label': {
    fontSize: '14px',
    fontWeight: 700,
  },
  '.Mui-completed': {
    '& .MuiStepLabel-iconContainer .Mui-completed': {
      color: `${Color.priBlue} !important`,
    },
  },
  '& .MuiStepConnector-lineVertical': {
    borderWidth: 3,
    borderColor: '#7A7A7A30',
  },
  '& .MuiStepConnector-vertical.Mui-active ': {
    '& .MuiStepConnector-lineVertical': {
      borderColor: Color.priBlue,
      borderWidth: 3,
    },
  },
  '& .MuiStepLabel-labelContainer': {
    color: '#7A7A7A30',
    fontWeight: 500,
    fontFamily: 'Inter',
  },
  '& .MuiStepLabel-vertical': {
    padding: '4px 0',
  },
  '& .MuiStepLabel-iconContainer': {
    marginLeft: '2px',
  },
});

export const ProjectStepperIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
  color: '#7A7A7A30',
  display: 'flex',
  alignItems: 'center',
  ...(ownerState.active && {
    color: Color.priBlue,
  }),
  '& .CustomStepIcon-completedIcon': {
    color: Color.priBlue,
    zIndex: 1,
  },
  '& .CustomStepIcon-circle': {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '3px solid currentColor',
  },
}));
