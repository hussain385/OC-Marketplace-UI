import React from 'react';
import { ActivityApproveDelivery } from '@/modules/servi-order/interface';
import { Box, Typography } from '@mui/material';
import {
  activityDateLabelStyle,
  ActivityIcons,
  ActivityLabel,
  activityListStyles,
  ActivityVerticalLine,
} from '@/modules/servi-order/components/activities/activity.style.ts';
import dayjs from 'dayjs';

import { ReactComponent as OrderComplete } from '@/assets/order-icon/order_complete.svg';
import { useAppSelector } from '@/redux/hooks.tsx';
import { paymentType } from '@/common/interface/service-interface';

interface IActivityApproveView {
  activity: ActivityApproveDelivery;
}

function ActivityApproveView({ activity }: IActivityApproveView) {
  const selectedOrder = useAppSelector((state) => state.mainState.order.selectedOrder);

  return (
    <Box>
      <Box sx={{ padding: '5px 16px' }}>
        <Box sx={activityListStyles}>
          <ActivityIcons className={activity.type}>
            <OrderComplete />
          </ActivityIcons>
          <ActivityLabel>
            {selectedOrder?.paymentType === paymentType.milestone ? 'Milestone' : 'Delivery'} #{activity.data.sequence} was
            reviewed.
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

export default ActivityApproveView;
