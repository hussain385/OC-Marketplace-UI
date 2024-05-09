import { styled, Box } from '@mui/material';
import { Color } from '@/theme';

export const StatusBoxCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  filter: 'drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.08))',
  background: Color.priWhite,
  borderRadius: '0px 2px 2px 0px',
  justifyContent: 'space-between',
  padding: '24px',
  border: `1px solid ${Color.borderColorGray}`,
  '&.status': {
    borderLeftWidth: '8px',
    borderLeftColor: Color.priWhite,
    '&.not-started, &.on_hold': {
      borderLeftColor: Color.orderStatus.notstarted,
    },
    '&.in_progress': {
      borderLeftColor: Color.orderStatus.inprogress,
    },
    '&.request_cancellation': {
      borderLeftColor: Color.orderStatus.requestCancellation,
    },
    '&.cancelled': {
      borderLeftColor: Color.orderStatus.cancelled,
    },
    '&.request_revision': {
      borderLeftColor: Color.orderStatus.requestRevision,
    },
    '&.late': {
      borderLeftColor: Color.orderStatus.late,
    },
    '&.review_delivery': {
      borderLeftColor: Color.orderStatus.reviewDelivery,
    },
    '&.completed': {
      borderLeftColor: Color.orderStatus.completed,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      margin: '0px 16px',
    },
  },
}));
