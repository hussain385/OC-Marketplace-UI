import dayjs from 'dayjs';
import { Activity, ActivityTypes, Order, activityType, orderStatus, subOrderStatus } from '../../interface';
import { IEntity } from '@/common/interface/entity-interface';

// const OrderStatusBox = ({ setTabIndex }: { setTabIndex?: React.Dispatch<React.SetStateAction<number>> }) => {
//   return (
//     <Suspense fallback={<Typography>Loading...</Typography>}>
//       <OrderStatusComponent setTabIndex={setTabIndex} />
//     </Suspense>
//   );
// };
// export default OrderStatusBox;

export const isRequirementNotSubittied = (selectedOrder: Order): boolean => {
  let isSubmitted = false;
  if (selectedOrder.status === orderStatus.onHold && selectedOrder.currentSubOrder.status === subOrderStatus.waitingRequirement) {
    isSubmitted = true;
  }
  return isSubmitted;
};

export const displayOrderStateDescription = (selectedOrder: Order | undefined, entity: IEntity) => {
  let output = '';
  if (selectedOrder?.currentSubOrder.status === subOrderStatus.waitingRequirement) {
    output = `This order can be started once <b>${entity.profile.detail.name}</b> provides the requirements. You'll be notified once the requirements are submitted.`;
  }
  /** Late order  */
  // if (selected_order?.state[i] === '2051') {
  //   output = `Communicate with ${entityName} and give an update about order to avoid any issues.`;
  //   break;
  // }
  return output;
};

/**
 * @param role BUYER | SELLER
 * @param orderStatus OrderStatuses
 * @param entity Selected Entity
 */

export const getOrderStatusTitle = (entity: IEntity) => {
  const name = entity ? entity.profile.detail.name : 'N/A';
  const titles: { [key: string]: { BUYER: string; SELLER: string } } = {
    IN_PROGRESS: {
      BUYER: 'Your order is now in the works',
      SELLER: 'Order started',
    },
    REQUEST_REVISION: {
      BUYER: 'You requested a revision',
      SELLER: `<strong style="color:#2752e7;">${name}</strong> requested a revision`,
    },
    REVIEW_DELIVERY: {
      BUYER: 'Your delivery is here',
      SELLER: 'You made a delivery',
    },
    REQUEST_CANCELLATION: {
      BUYER: 'Order cancellation request',
      SELLER: 'Order cancellation request',
    },
    CANCELLED: {
      BUYER: 'Order was cancelled',
      SELLER: 'Order was cancelled',
    },
    COMPLETED: {
      BUYER: 'Order completed',
      SELLER: 'Order completed',
    },
    WAITING_REQUIREMENTS: {
      BUYER: 'Your order is not yet started',
      SELLER: `Order is on hold.`,
    },
    WAITING_PAYMENT: {
      BUYER: 'Order on hold',
      SELLER: `Order on hold`,
    },
  };
  return titles;
};

/**
 * @param entity
 * @returns Object description
 */

export const getOrderStatusDescription = (entity: IEntity, selectedOrder: Order) => {
  const name = entity ? entity.profile.detail.name : 'N/A';
  const requestCancellationActivity = getOrderCurrentActivity(activityType.requestCancellation, selectedOrder);

  let duration = dayjs(selectedOrder?.createdAt);
  duration = duration.add(48, 'hours');

  const descriptions: { [key: string]: { BUYER: string; SELLER: string } } = {
    IN_PROGRESS: {
      BUYER: `Your order is in progress <strong style="color:#2752e7;">>${name}</strong> has been notified about your order`,
      SELLER: `<strong style="color:#2752e7;">${name}</strong> met all the qualifications. You can start working on this order now.`,
    },
    REQUEST_REVISION: {
      BUYER: 'We suggest being as detailed and clear as possible to help the seller complete the revisions more efficiently.',
      SELLER: `${name} sent a request for revision`,
    },
    REVIEW_DELIVERY: {
      BUYER: `If you take no action by <strong>${duration.format(
        'MMM DD, YYYY H:mm a',
      )} (within 48 hours)</strong>, this order will automatically be marked as completed.`,
      SELLER: `<strong>${name}</strong> has 48 hours to review and accept your delivery. If the buyer doesn't respond by <strong>${duration.format(
        'MMM DD, YYYY H:mm a',
      )}</strong>, the order will automatically be marked as completed.`,
    },
    REQUEST_CANCELLATION: {
      BUYER:
        requestCancellationActivity?.type === activityType.requestCancellation && requestCancellationActivity.data.by === 'BUYER'
          ? `You sent a request to cancel the this order. The <strong style="color:#2752e7;">${selectedOrder.seller.profile.detail.name}</strong> can either accept or decline your request.`
          : `<strong style="color:#2752e7;">${selectedOrder.seller.profile.detail.name}</strong> sent a request to cancel the order. You can accept or decline the request`,
      SELLER:
        requestCancellationActivity?.type === activityType.requestCancellation && requestCancellationActivity.data.by === 'SELLER'
          ? `<strong style="color:#2752e7;">You</strong> sent a request to cancel this order. If the buyer doesn't respond, you may contact support to cancel the order immediately.`
          : `<strong style="color:#2752e7;">${name}</strong> send a request to cancel the order. You either accept or decline the request`,
    },
    CANCELLED: {
      BUYER: 'Your request to cancel this order has been approved',
      SELLER: 'Your request to cancel this order has been approved',
    },
    COMPLETED: {
      BUYER: `We're glad you got your order!`,
      SELLER: `We're glad you got your order!`,
    },
    WAITING_REQUIREMENTS: {
      BUYER: `<strong style="color:#2752e7;">${selectedOrder.seller.profile.detail.name}</strong> has been notified about your order. To get started submit the requirements.`,
      SELLER: `This order can be started once <strong style="color:#2752e7;">${name}</strong> provides the requirements. You'll be notified once the requirements are submitted.`,
    },
    WAITING_PAYMENT: {
      BUYER: `Your order is currently on hold pending payment. <strong style="color:#0F9757;">$${name}</strong> has been notified and will proceed with your order as soon as the payment is made.`,
      SELLER: `This order is currently on hold pending payment. <strong style="color:#2752e7;">${name}</strong> has been notified about the payment.`,
    },
  };
  return descriptions;
};

/**
 * Find last activit by type and sort by date desc order
 * @param aType
 * @param selectedOrder
 * @return Sorted activity by date
 */
export const getOrderCurrentActivity = (aType: ActivityTypes, selectedOrder: Order): Activity | undefined => {
  const activities = [...selectedOrder.activities];
  const filterActivity = activities
    .filter((activity) => activity.type === aType)
    .sort((a, b) => {
      const newA = new Date(a.createdAt);
      const newB = new Date(b.createdAt);
      return newA.getTime() - newB.getTime();
    });
  return filterActivity.pop() ?? undefined; //get the last sorted item
};
