import React, { useCallback, useMemo } from 'react';
import { ActivityRequestCancellation, activityType, ActivityTypes, orderStatus } from '@/modules/servi-order/interface';
import { Box, Typography } from '@mui/material';
import {
  activityDateLabelStyle,
  ActivityIcons,
  ActivityLabel,
  activityListStyles,
  ActivityVerticalLine,
} from '@/modules/servi-order/components/activities/activity.style.ts';
import dayjs from 'dayjs';

import { ReactComponent as CancellationRequestIcon } from '@/assets/order-icon/bell.svg';
import DetailCardView from '@/modules/servi-order/components/detail-card';
import { ReactComponent as WarningIcon } from '@/assets/order-icon/warning.svg';
import moment from 'moment';
import { useAppSelector } from '@/redux/hooks.tsx';
import { getEntityByRole, getOrderMyRole } from '@/modules/servi-order/Service/order.slice.ts';
import { ActionButtonOutlined, ActionButtonOutlinedPrimary } from '@/common/styles';
import { useActivityActionsMutation } from '@/modules/servi-order/Service/order.api.ts';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component.tsx';
import { mediaUrlGenerator } from '@/common/utils';

interface IActivityRequestCancellationView {
  activity: ActivityRequestCancellation;
}

function ActivityRequestCancellationView({ activity }: IActivityRequestCancellationView) {
  const myRole = useAppSelector(getOrderMyRole);
  const selectedOrder = useAppSelector((state) => state.mainState.order.selectedOrder);
  const entity = useAppSelector((state) => getEntityByRole(state, activity.data.by));

  const [CancellationActions, { isLoading }] = useActivityActionsMutation();

  /**
   * Get latest cancellation request
   */
  const isLatest = useMemo(
    () =>
      [...(selectedOrder?.activities ?? [])].reverse().find((e) => e.type === activityType.requestCancellation)?.id ===
      activity.id,
    [activity.id, selectedOrder?.activities],
  );

  const onAction = useCallback(
    (aType: ActivityTypes) => {
      CancellationActions({
        data: {
          orderId: selectedOrder!.id,
          activity: {
            type: aType,
          },
        },
      });
    },
    [CancellationActions, selectedOrder],
  );

  return (
    <Box>
      <Box sx={{ padding: '5px 16px' }}>
        <Box sx={activityListStyles}>
          <ActivityIcons className={activity.type}>
            <CancellationRequestIcon />
          </ActivityIcons>
          <ActivityLabel>
            Cancellation request
            <Typography sx={activityDateLabelStyle} component={'span'}>
              {dayjs(activity.createdAt).format('MMM D, HH:mm A')}
            </Typography>
          </ActivityLabel>
        </Box>
      </Box>
      <ActivityVerticalLine sx={{ paddingTop: 0 }}>
        <DetailCardView>
          <DetailCardView.Header>Cancellation request</DetailCardView.Header>

          <DetailCardView.Content>
            <Typography sx={{ fontSize: '12px' }}>
              <Typography component={'strong'} sx={{ fontWeight: 700 }}>
                Reason:
              </Typography>{' '}
              {activity.data.reason}
            </Typography>

            {activity.data.message && (
              <Box sx={{ display: 'flex', marginTop: '16px', gap: '8px', alignItems: 'center' }}>
                <NameOrPictureAvatar
                  name={entity?.profile.detail.name}
                  url={entity?.profile.detail.logo ? mediaUrlGenerator(entity.profile.detail.logo) : undefined}
                  style={{ width: '24px', height: '24px' }}
                />
                <Typography sx={{ fontSize: '12px' }}>{activity.data.message}</Typography>
              </Box>
            )}
          </DetailCardView.Content>

          {isLatest && selectedOrder?.status === orderStatus.requestCancellation && (
            <DetailCardView.Footer>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon style={{ marginRight: '10px' }} />
                <Typography sx={{ fontSize: '12px' }}>
                  If{' '}
                  {myRole !== activity.data.by
                    ? "you don't "
                    : activity.data.by === 'SELLER'
                      ? "the buyer doesn't "
                      : "the seller doesn't "}
                  decline {myRole === activity.data.by ? 'your' : 'their'} request by &nbsp;
                  <strong>{moment(activity.createdAt).add(72, 'hours').format('MMM DD, HH:mm a')} (within 72 hours)</strong>, the
                  order will be automatically cancelled.
                </Typography>
              </Box>
            </DetailCardView.Footer>
          )}
        </DetailCardView>

        {isLatest && selectedOrder?.status === orderStatus.requestCancellation && (
          <>
            {myRole === activity.data.by && (
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', paddingTop: '16px' }}>
                <ActionButtonOutlinedPrimary onClick={() => onAction(activityType.withdrawCancellation)} disabled={isLoading}>
                  Withdraw request
                </ActionButtonOutlinedPrimary>
              </Box>
            )}

            {myRole !== activity.data.by && (
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', paddingTop: '16px', gap: '16px' }}>
                <ActionButtonOutlined onClick={() => onAction(activityType.rejectCancellation)}>Decline</ActionButtonOutlined>
                <ActionButtonOutlinedPrimary onClick={() => onAction(activityType.approveCancellation)}>
                  Accept
                </ActionButtonOutlinedPrimary>
              </Box>
            )}
          </>
        )}
      </ActivityVerticalLine>
    </Box>
  );
}

export default ActivityRequestCancellationView;
