import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { RenderIf } from '@/common/components';
import Timeline, { TimelineProps } from '@/common/components/timeline';
import { CustomChip, FlatStatusBadge, PrimaryButtonGreen, Text14 } from '@/common/styles';
import PaymentSummary from '@/modules/servi-order/components/payment-summary';
import { useAppSelector } from '@/redux/hooks';
import { Color } from '@/theme';
import { Box, Typography } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { orderStatus, payType, subOrderStatus } from '../../interface';
import { paymentType } from '@/common/interface/service-interface';
import { useNavigate } from '@/router';
import { getOrderMyRole } from '../../Service/order.slice';

const DeliveryTimeline = () => {
  const navigate = useNavigate();
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  const myRole = useAppSelector(getOrderMyRole);
  const unSortedSubOrders = [...(selectedOrder?.subOrders ?? [])];
  const sortedSubOrdes = unSortedSubOrders.sort((a, b) => a.sequence - b.sequence);
  // eslint-disable-next-line no-unused-vars
  const [timeline, setTimeline] = useState<TimelineProps[]>([]);

  const onPayButtonClick = useCallback(
    (pkgId: string, orderId: string) => {
      navigate({ pathname: `/checkout/:id`, search: `orderId=${orderId}` }, { params: { id: pkgId as string } });
    },
    [navigate],
  );

  useEffect(() => {
    if (selectedOrder && isEmpty(timeline)) {
      const tempTimeline: TimelineProps[] = [];
      // suborder sequence 0 === intial payment order
      let dueDate: string = '';
      const intialPaymentOrder = sortedSubOrdes.find((a) => a.sequence === 0);
      sortedSubOrdes.map((order, index) => {
        if (sortedSubOrdes[index - 1]) {
          if (sortedSubOrdes[index - 1].startedAt) {
            dueDate = dayjs(sortedSubOrdes[index - 1].startedAt)
              .add(order.deliveryDays as number, 'day')
              .format('MMMM DD');
          } else {
            dueDate = dayjs(dueDate)
              .add(order.deliveryDays as number, 'day')
              .format('MMMM DD');
          }
        } else {
          dueDate = dayjs(new Date())
            .add(order.deliveryDays as number, 'day')
            .format('MMMM DD');
        }
        /** First element order started */
        if (index === 0) {
          tempTimeline.push({
            contentLeft: {
              date: dayjs(selectedOrder.createdAt).format('MMMM DD'),
            },
            contentRight: {
              text: 'Order placed',
              htmlContent: intialPaymentOrder ? <Typography>Initial payment ${intialPaymentOrder.amount}</Typography> : null,
            },
            status: 'done',
            marker: {
              label: '1',
            },
          });
        }

        if (order.sequence > 0) {
          tempTimeline.push({
            marker: {
              label: index + 1,
            },
            contentLeft: {
              date: dueDate,
              htmlContent: (
                <>
                  <RenderIf value={order.isEscrow}>
                    <FlatStatusBadge className='yellow uppercase bold'>Servi Safe</FlatStatusBadge>
                  </RenderIf>
                  <RenderIf value={selectedOrder.payType === payType.UPFRONT}>
                    <FlatStatusBadge className='blue uppercase bold'>Pay Upfront</FlatStatusBadge>
                  </RenderIf>
                  <RenderIf value={selectedOrder.payType === payType.LATER}>
                    <FlatStatusBadge className='red uppercase bold'>Pay Later</FlatStatusBadge>
                  </RenderIf>
                </>
              ),
            },
            contentRight: {
              text: order.description,
              htmlContent: (
                <>
                  <Text14 sx={{ color: Color.textGray, marginTop: '8px' }}>$ {order.amount}</Text14>
                  <RenderIf value={order.status !== subOrderStatus.finished}>
                    <CustomChip
                      variant='outlined'
                      label={
                        ![subOrderStatus.finished].includes(order.status as any) && selectedOrder.currentSubOrder.isPaid
                          ? order.status.replace('_', ' ').toLowerCase()
                          : 'Pending'
                      }
                      className={'pending'}
                    />
                  </RenderIf>
                  <RenderIf
                    value={
                      myRole !== 'SELLER' &&
                      selectedOrder.currentSubOrder.id === order.id &&
                      !selectedOrder.currentSubOrder.isPaid
                    }
                  >
                    <PrimaryButtonGreen
                      sx={{ marginTop: '8px' }}
                      onClick={() => onPayButtonClick(selectedOrder.pkg.id, selectedOrder.id)}
                    >
                      {selectedOrder.paymentType === paymentType.milestone ? 'Fund Milestone' : 'Make Payment'}
                    </PrimaryButtonGreen>
                  </RenderIf>
                </>
              ),
            },
            status: [subOrderStatus.inProgress, subOrderStatus.waitingPayment].includes(order.status as any)
              ? 'active'
              : order.status === subOrderStatus.finished || order.isPaid
                ? 'done'
                : undefined,
            connector: {
              style: 'solid',
            },
          });
        }
      });

      //Last timeline element
      tempTimeline.push({
        marker: {
          label: '',
        },
        contentLeft: {
          date: '',
        },
        contentRight: {
          text: selectedOrder.status === orderStatus.cancelled ? 'Order was cancelled' : 'Order completed',
        },
        status: selectedOrder.status === orderStatus.completed ? 'done' : undefined,
        connector: {
          hide: true,
        },
      });
      setTimeline(tempTimeline);
    }
  }, [onPayButtonClick, selectedOrder, setTimeline, sortedSubOrdes, timeline]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box className='overview-timeline' sx={{ flex: 1 }}>
        <Timeline timelines={timeline} />
      </Box>
      <Box>
        <PaymentSummary totalAmount={selectedOrder!.totalAmount} paidAmount={selectedOrder!.paidAmount} />
      </Box>
    </Box>
  );
};

export default DeliveryTimeline;
