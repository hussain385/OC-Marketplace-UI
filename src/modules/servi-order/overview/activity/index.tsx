import React from 'react';
// import { useLocation } from 'react-router-dom';
import ActivitiesComponent from '../../components/activities';
import MessageBoxComponent from '../../components/message-box';
import { RenderIf } from '@/common/components';
import { useAppSelector } from '@/redux/hooks.tsx';
import { orderStatus } from '@/modules/servi-order/interface';
import OrderStatusComponent from '../../components/status-box/status-box.component';
import { OrderReview } from '@/modules/reviews/src';
// import { useParams } from '@/router.ts';
// import { useGetOrderDetailsQuery } from '@/modules/servi-order/Service/order.api.ts';

const Activity = () => {
  const selectedOrder = useAppSelector((state) => state.mainState.order.selectedOrder);

  return (
    <>
      <OrderStatusComponent />
      <RenderIf value={selectedOrder?.status === orderStatus.completed}>
        <OrderReview />
      </RenderIf>
      <RenderIf value={![orderStatus.completed, orderStatus.cancelled].includes(selectedOrder?.status as any)}>
        <MessageBoxComponent />
      </RenderIf>
      <ActivitiesComponent />
    </>
  );
};
export default Activity;
