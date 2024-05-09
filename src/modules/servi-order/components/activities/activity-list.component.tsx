/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { DateLabel } from './activity.style';
import { useAppSelector } from '@/redux/hooks';
import { ActivityActionCancellation, ActivityNoData, activityType } from '@/modules/servi-order/interface';
import ActivityInfoView from '@/modules/servi-order/components/activities/activity-info.view.tsx';
import ActivityPlacedView from '@/modules/servi-order/components/activities/activity-placed.view.tsx';
import { ActivityConverstationView } from '@/modules/servi-order/components/activities/activity-conversation.view.tsx';
import { ActivityDeliveryView } from '@/modules/servi-order/components/activities/activity-delivery.view.tsx';
import { ActivityRevisionView } from '@/modules/servi-order/components/activities/activity-revision.view.tsx';
import ActivityCancellationView from '@/modules/servi-order/components/activities/activity-cancellation.view.tsx';
import ActivityApproveView from '@/modules/servi-order/components/activities/activity-approve.view.tsx';
import ActivityRequestCancellationView from '@/modules/servi-order/components/activities/activity-requestCancellation.view.tsx';
import ActivityReviewView from '@/modules/servi-order/components/activities/activity-review.view.tsx';

const ActivityListComponent = () => {
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  const orderActivities = useMemo(() => selectedOrder?.activities ?? [], [selectedOrder?.activities]);

  const dateGroup: string[] = [];

  return (
    <Box sx={{ width: '100%' }} id={'order-details'}>
      {orderActivities.map((activity, index: number) => {
        const activityDate = dayjs(activity.createdAt).format('YYYY-MM-DD');
        const findIndex = dateGroup.findIndex((item) => item === activityDate);

        if (findIndex < 0) {
          dateGroup.push(activityDate);
        }

        return (
          <Box key={activity.id}>
            {dateGroup[findIndex] !== activityDate ? (
              <DateLabel sx={{ marginBottom: '24px' }}>{dayjs(activity.createdAt).format('MMM D, YYYY')}</DateLabel>
            ) : null}

            {/** Request Revision */}
            {activity.type === activityType.requestRevision && <ActivityRevisionView activity={activity} />}

            {/** Delivery */}
            {activity.type === activityType.delivery && <ActivityDeliveryView activity={activity} />}

            {/** Conversation */}
            {activity.type === activityType.conversation && <ActivityConverstationView activity={activity} />}

            {/** Order placed */}
            {activity.type === activityType.orderPlaced && <ActivityPlacedView activity={activity} />}

            {/** Order Approve */}
            {activity.type === activityType.approveDelivery && <ActivityApproveView activity={activity} />}

            {/** Request Cancellation */}
            {activity.type === activityType.requestCancellation && <ActivityRequestCancellationView activity={activity} />}

            {/** Review */}
            {activity.type === activityType.review && <ActivityReviewView activity={activity} />}

            {/** Order Info */}
            {[
              activityType.completed,
              activityType.submitRequirement,
              activityType.orderStarted,
              activityType.cancelled,
              activityType.submittedRequirement,
            ].includes(activity.type as any) && <ActivityInfoView activity={activity as ActivityNoData} />}

            {/** Order Cancellation Actions */}
            {[activityType.approveCancellation, activityType.rejectCancellation, activityType.withdrawCancellation].includes(
              activity.type as any,
            ) && <ActivityCancellationView activity={activity as ActivityActionCancellation} />}
          </Box>
        );
      })}
    </Box>
  );
};

export default ActivityListComponent;
