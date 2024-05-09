import React, { useMemo } from 'react';
import { ActivityOrderPlaced } from '@/modules/servi-order/interface';
import {
  activityDateLabelStyle,
  ActivityIcons,
  ActivityLabel,
  activityListStyles,
} from '@/modules/servi-order/components/activities/activity.style.ts';
import { Box, Typography } from '@mui/material';

import { ReactComponent as OrderPlaceIcon } from '@/assets/order-icon/order_place.svg';
import dayjs from 'dayjs';
import { useAppSelector } from '@/redux/hooks.tsx';

interface IActivityPlacedView {
  activity: ActivityOrderPlaced;
}

function ActivityPlacedView({ activity }: IActivityPlacedView) {
  const order = useAppSelector((state) => state.mainState.order.selectedOrder);
  const selectedId = useAppSelector((state) => state.mainState.useInfo.selectedEntity?.id);
  const isMe = useMemo(() => {
    if (activity.data.by === 'BUYER') {
      return order!.buyer.id === selectedId;
    }

    return order!.seller.id === selectedId;
  }, [activity.data.by, order, selectedId]);

  return (
    <Box>
      <Box sx={{ padding: '5px 16px' }}>
        <Box sx={activityListStyles}>
          <ActivityIcons className={activity.type}>
            <OrderPlaceIcon />
          </ActivityIcons>

          <ActivityLabel>
            <strong>{isMe ? 'You' : activity.data.name}</strong>{' '}
            <Typography component={'span'} sx={{ fontSize: '12px', fontWeight: 400 }}>
              placed an order
            </Typography>
            <Typography sx={activityDateLabelStyle} component={'span'}>
              {dayjs(activity.createdAt).format('MMM D, HH:mm A')}
            </Typography>
          </ActivityLabel>
        </Box>
      </Box>
    </Box>
  );
}

export default ActivityPlacedView;
