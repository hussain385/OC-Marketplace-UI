import React, { useMemo } from 'react';
import { ActivityNoData, activityType } from '@/modules/servi-order/interface';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {
  activityDateLabelStyle,
  ActivityIcons,
  ActivityLabel,
  activityListStyles,
  ActivityVerticalLine,
} from '@/modules/servi-order/components/activities/activity.style.ts';
import { ReactComponent as OrderStartedIcon } from '@/assets/order-icon/flag.svg';
import { ReactComponent as OrderComplete } from '@/assets/order-icon/order_complete.svg';
import { ReactComponent as OrderPlaceIcon } from '@/assets/order-icon/order_place.svg';
import { ReactComponent as RequirementIcon } from '@/assets/order-icon/requirement.svg';
import { useAppSelector } from '@/redux/hooks.tsx';

interface IActivityInfoView {
  activity: ActivityNoData;
}

const icons: Record<ActivityNoData['type'], React.ReactElement> = {
  [activityType.orderStarted]: <OrderStartedIcon />,
  [activityType.cancelled]: <OrderPlaceIcon />,
  [activityType.completed]: <OrderComplete />,
  [activityType.submittedRequirement]: <RequirementIcon />,
  [activityType.submitRequirement]: <RequirementIcon />, // Placeholder, won't show
};

function ActivityInfoView({ activity }: IActivityInfoView) {
  const selectedOrder = useAppSelector((state) => state.mainState.order.selectedOrder);
  const selectedEntity = useAppSelector((state) => state.mainState.useInfo.selectedEntity);

  const __predefinedLabels: Record<ActivityNoData['type'], React.ReactNode> = useMemo(
    () => ({
      [activityType.orderStarted]: 'The order started',
      [activityType.cancelled]: 'The order has been cancelled',
      [activityType.completed]: 'The order was completed',
      [activityType.submittedRequirement]: (
        <Typography component={'span'}>
          <strong>{selectedEntity?.id === selectedOrder?.buyer.id ? 'You' : selectedOrder?.buyer.profile.detail.name}</strong>{' '}
          submitted requirements
        </Typography>
      ),
      [activityType.submitRequirement]: (
        <Typography component={'span'}>
          <strong>{selectedEntity?.id === selectedOrder?.buyer.id ? 'You' : selectedOrder?.buyer.profile.detail.name}</strong>{' '}
          submitted requirements
        </Typography>
      ),
    }),
    [selectedEntity?.id, selectedOrder?.buyer.id, selectedOrder?.buyer.profile.detail.name],
  );

  return (
    <Box>
      <Box sx={{ padding: '5px 16px' }}>
        <Box sx={activityListStyles}>
          <ActivityIcons className={activity.type}>{icons[activity.type]}</ActivityIcons>
          <ActivityLabel>
            {__predefinedLabels[activity.type]}
            <Typography sx={activityDateLabelStyle} component={'span'}>
              {dayjs(activity.createdAt).format('MMM D, HH:mm A')}
            </Typography>
          </ActivityLabel>
        </Box>
      </Box>
      <ActivityVerticalLine sx={{ paddingTop: 0 }} />
    </Box>
  );
}

export default ActivityInfoView;
