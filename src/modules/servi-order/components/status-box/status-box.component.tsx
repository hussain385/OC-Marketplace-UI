import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useCallback } from 'react';
import { getOppositeOrderEntity, getOrderMyRole } from '../../Service/order.slice';
import { ActionButtonOutlined, Heading20 } from '@/common/styles';
import { RenderIf } from '@/common/components';
import { Box } from '@mui/material';
import { getOrderCurrentActivity, getOrderStatusDescription, getOrderStatusTitle } from '.';
import { activityType, ActivityTypes, orderStatus, subOrderStatus } from '../../interface';
import { StatusBoxCard } from './status-box.style';
import { useActivityActionsMutation } from '../../Service/order.api';
import { useNavigate } from '@/router';
import { setReviewModal } from '@/modules/reviews/src/service/review.slice.ts';
import moment from 'moment/moment';

const OrderStatusComponent = ({ setTabIndex }: { setTabIndex?: React.Dispatch<React.SetStateAction<number>> }) => {
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  const dispatch = useAppDispatch();
  const oppositeEntity = useAppSelector(getOppositeOrderEntity);
  const role = useAppSelector(getOrderMyRole);
  const title = getOrderStatusTitle(oppositeEntity!);
  const description = getOrderStatusDescription(oppositeEntity!, selectedOrder!);
  const requestCancellationActivity = getOrderCurrentActivity(activityType.requestCancellation, selectedOrder!);
  const selectedEntity = useAppSelector((state) => state.mainState.useInfo.selectedEntity);
  const [CancellationActions, { isLoading }] = useActivityActionsMutation();
  const navigate = useNavigate();

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

  // Abstract pay now function update the dependency
  const onPayNowAction = useCallback(() => {
    navigate(
      { pathname: `/checkout/:id`, search: `orderId=${selectedOrder!.id}` },
      { params: { id: selectedOrder!.pkg.id as string } },
    );
  }, [navigate, selectedOrder]);

  //Abstract submit requirement function
  const onSubmitRequirementAction = useCallback(() => {
    navigate(
      { pathname: '/account/order-management/:id', search: 'tab=REQUIREMENTS' },
      { params: { id: selectedOrder!.id as string } },
    );
  }, [navigate, selectedOrder]);

  const onReview = useCallback(() => {
    dispatch(setReviewModal(true));
  }, [dispatch]);

  return selectedOrder ? (
    <StatusBoxCard className={`status ${selectedOrder.status.toLowerCase()}`}>
      <Box>
        {/** Status Title */}
        <Heading20
          dangerouslySetInnerHTML={{
            __html: [orderStatus.requestCancellation, orderStatus.completed, orderStatus.cancelled].includes(
              selectedOrder.status as any,
            )
              ? title[selectedOrder.status][role!]
              : title[selectedOrder.currentSubOrder.status][role!],
          }}
        ></Heading20>
        {/** Status Description */}
        <div
          style={{ fontSize: '12px', maxWidth: '556px' }}
          dangerouslySetInnerHTML={{
            __html: [orderStatus.requestCancellation, orderStatus.completed, orderStatus.cancelled].includes(
              selectedOrder.status as any,
            )
              ? description[selectedOrder.status][role!]
              : description[selectedOrder.currentSubOrder.status][role!],
          }}
        />
      </Box>
      {/**
       * Action Buttons
       */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <RenderIf value={selectedOrder.status === orderStatus.requestCancellation}>
          {requestCancellationActivity?.type === activityType.requestCancellation &&
            role === requestCancellationActivity.data.by && (
              <ActionButtonOutlined
                variant='outlined'
                onClick={() => onAction(activityType.withdrawCancellation)}
                disabled={isLoading}
              >
                Withdraw request
              </ActionButtonOutlined>
            )}

          {requestCancellationActivity?.type === activityType.requestCancellation &&
            role !== requestCancellationActivity.data.by && (
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', paddingTop: '16px', gap: '16px' }}>
                <ActionButtonOutlined
                  variant='outlined'
                  onClick={() => onAction(activityType.rejectCancellation)}
                  disabled={isLoading}
                >
                  Decline
                </ActionButtonOutlined>
                <ActionButtonOutlined
                  variant='outlined'
                  onClick={() => onAction(activityType.approveCancellation)}
                  disabled={isLoading}
                >
                  Accept
                </ActionButtonOutlined>
              </Box>
            )}
        </RenderIf>

        <RenderIf
          value={
            selectedOrder.status !== orderStatus.requestCancellation &&
            selectedOrder.currentSubOrder.status === subOrderStatus.waitingPayment &&
            role === 'BUYER'
          }
        >
          <ActionButtonOutlined variant='outlined' onClick={() => onPayNowAction()} disabled={isLoading}>
            {selectedOrder.paymentType === 'SUBSCRIPTION' ? 'Pay now' : 'Fund milestone'}
          </ActionButtonOutlined>
        </RenderIf>

        <RenderIf
          value={
            selectedOrder.status !== orderStatus.requestCancellation &&
            selectedOrder.currentSubOrder.status === subOrderStatus.waitingRequirement &&
            role === 'BUYER'
          }
        >
          <ActionButtonOutlined variant='outlined' onClick={() => onSubmitRequirementAction()} disabled={isLoading}>
            Submit requirements
          </ActionButtonOutlined>
        </RenderIf>

        <RenderIf
          value={
            // Is Complete
            selectedOrder.status === orderStatus.completed &&
            // Should be in 14 days after complete
            moment().diff(selectedOrder.subOrders[selectedOrder.subOrders.length - 1].finishedAt, 'days') <= 14 &&
            // Already reviewed
            !selectedOrder.reviews?.some((e) => e.from === selectedEntity?.id)
          }
        >
          <ActionButtonOutlined variant='outlined' onClick={onReview} disabled={isLoading}>
            Review
          </ActionButtonOutlined>
        </RenderIf>
      </Box>
    </StatusBoxCard>
  ) : (
    <Box>Loading info...</Box>
  );
};

export default OrderStatusComponent;
