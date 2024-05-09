import { Box, styled, Typography } from '@mui/material';
import { Color } from '@/theme';
import { activityType } from '@/modules/servi-order/interface';

export const DateLabel = styled(Typography)({
  background: `${Color.priBlue}10`,
  borderRadius: '0px 16px 16px 0px',
  padding: '5px 24px 4px 16px',
  height: '28px',
  color: Color.textBlack,
  gap: '8px',
  fontSize: '12px',
  textAlign: 'center',
  display: 'inline-block',
  maxWidth: '120px',
});

export const ActivityIcons = styled(Box)({
  width: '32px',
  height: '32px',
  borderRadius: '100%',
  background: Color.bgGreyLight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [`&.${activityType.orderPlaced}`]: {
    background: '#C5C6C8310',
    color: '#C5C6C8',
  },
  [`&.${activityType.submittedRequirement}`]: {
    background: '#EA941310',
    color: '#EA9413',
  },
  [`&.${activityType.submitRequirement}`]: {
    background: '#EA941310',
    color: '#EA9413',
  },
  '&.in-progress': {
    background: '#0F975710',
    color: '#0F9757',
  },
  [`&.${activityType.completed}`]: {
    background: '#0F975710',
    color: '#0F9757',
  },
  [`&.${activityType.approveDelivery}`]: {
    background: '#0F975710',
    color: '#0F9757',
  },
  [`&.${activityType.orderStarted}`]: {
    background: '#E6F6EF',
    color: '#0F9757',
  },
  '&.request-revision': {
    background: '#C0157410',
    color: '#C01574',
  },
  [`&.${activityType.requestCancellation}`]: {
    background: '#B5470810',
    color: '#B54708',
  },
  [`&.${activityType.cancelled}`]: {
    background: '#C5C6C810',
    color: '#C5C6C8',
  },
  [`&.${activityType.delivery}`]: {
    background: '#F2FFFF',
    color: '#0F9797',
  },
  [`&.${activityType.review}`]: {
    background: '#FFFAEF',
    color: '#DCAC32',
  },
  '&.attachment': {
    background: '#FFF5FB',
    color: '#E60E8B',
  },
});

export const ActivityLabel = styled(Typography)({
  fontSize: '12px',
  fontWeight: 600,
  color: Color.textBlack,
  letterSpacing: '-0.5px',
  paddingLeft: '8px',
});

export const activityListStyles = {
  display: 'flex',
  alignItems: 'center',
  height: '32px',
};

export const activityDateLabelStyle = {
  color: Color.gray9C,
  fontSize: '12px',
  paddingLeft: '5px',
};

export const ActivityVerticalLine = styled(Box)({
  borderLeft: `2px solid ${Color.borderColorGray}`,
  padding: '16px',
  marginLeft: '30px',
  '&.last': {
    display: 'none',
  },
});
