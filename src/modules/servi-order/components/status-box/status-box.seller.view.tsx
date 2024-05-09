// import dayjs from 'dayjs';
// import { useParams } from 'react-router-dom';
// import { isNil } from 'lodash';
// import React, { useMemo } from 'react';
// import { Box } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { transactionApi } from '@/redux/apis/transactionApi';
// import { RenderIf } from '@/common/components';
// import { ActionButtonOutlined, ActionButtonPrimary, BorderRoundedContainer, Heading20 } from '@/common/styles';
// import { StatusBoxCard } from './status-box.style';
// import { showToast, ToastTypes } from '@/common/utils';
// import { setReviewModal } from '@/modules/reviews/src/service/review.slice';
// import { isWriteReview } from '@/modules/reviews/src/utils/functions';
// import { displayOrderStateDescription } from './status-box.component';
// import { ORDER_STATUS } from '@/common/constants';
// import { Color } from '@/theme';
// import { ReactComponent as WarningIcon } from '@/assets/order-icon/warning.svg';
// import { useGetOrderDetailsQuery } from '@/modules/servi-order/Service/order.api.ts';

// const OrderStatusSellerView = ({ setTabIndex }: { setTabIndex: React.Dispatch<React.SetStateAction<number>> }) => {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.mainState.useInfo);
//   const { id: orderId } = useParams();
//   const { data: orderData } = useGetOrderDetailsQuery({
//     orderId: orderId ?? '',
//   });
//   const selected_order = useMemo(() => orderData, [orderData]);
//   let duration = dayjs(selected_order?.createdAt);
//   duration = duration.add(48, 'hours');
//   const orderStatuses: string = selected_order?.orderStatus;

//   const isOrderLate = useMemo(
//     () => ORDER_STATUS[selected_order?.state.filter((state: string) => state === '2051')],
//     [selected_order],
//   );

//   const isLocalWriteReview = useMemo(() => {
//     if (isNil(orderData) || !orderData.completionAt) {
//       return false;
//     }

//     return isWriteReview({
//       orderStatuses: orderData.orderStatus,
//       completionAt: orderData.completionAt,
//       reviews: orderData?.reviews,
//     });
//   }, [orderData]);

//   const __predefinedLabels: { [index: string]: { text: string; description: string } } = {
//     2000: {
//       text: 'Your order is not yet started',
//       description: `This order can be started once <b>${selected_order?.buyerEntityName}'s</b> identity is verified. You'll be notified once the verification is done. `,
//     },
//     2001: {
//       text: 'Order started',
//       description: `<strong>${selected_order?.buyerEntityName}</strong> met all the qualifications. You can start working on this order now.`,
//     },
//     2002: {
//       text: 'Revision requested',
//       description: `${selected_order?.buyerEntityName} sent a request for revision`,
//     },
//     2003: {
//       text: 'Order is overdue',
//       description: `Communicate with ${selected_order?.buyerEntityName} and give an update about order to avoid any issues.`,
//     },
//     2004: {
//       text: 'You made a delivery',
//       description: `<strong>${selected_order?.buyerEntityName}</strong> has 48 hours to review and accept your delivery. If the buyer doesn't respond by <strong>${duration.format(
//         'MMM DD, YYYY H:mm a',
//       )}</strong>, the order will automatically be marked as completed.`,
//     },
//     2005: {
//       text: 'Order cancellation requested',
//       description:
//         selected_order?.activities && selected_order?.activities.history.createdBy === user?.id
//           ? `<b>You</b> sent a request to cancel this order. If the buyer doesn't respond, you may contact support to cancel the order immediately.`
//           : `${selected_order?.buyerEntityName} send a request to cancel the order. You either accept or decline the request`,
//     },
//     2006: {
//       text: 'Order was cancelled',
//       description: 'Your request to cancel this order has been approved',
//     },
//     2007: {
//       text: 'Order completed',
//       description: `We're glad you got your order!`,
//     },
//     2054: {
//       text: 'Order on hold',
//       description: `This order can be started once <b>${selected_order?.buyerEntityName}</b> provides the requirements. You'll be notified once the requirements are submitted.`,
//     },
//   };

//   const onWidthdrawRequestClick = () => {
//     const response = dispatch(
//       transactionApi.endpoints.requestCancellation.initiate({ orderId: selected_order?.id, isCancel: false }),
//     );
//     response.then((res: any) => {
//       if (res) {
//         showToast('Request withdrawn successfully', ToastTypes.SUCCESS);
//       }
//     });
//   };

//   function OpenOrderReview() {
//     dispatch(setReviewModal(true));
//   }

//   return (
//     <>
//       <StatusBoxCard
//         className={`status ${ORDER_STATUS[selected_order?.orderStatus ?? -1].toLowerCase()} ${
//           selected_order?.state ?? ORDER_STATUS[selected_order?.state.filter((state: string) => state === '2051')].toLowerCase()
//         }`}
//       >
//         <Box>
//           <Heading20>
//             {ORDER_STATUS[selected_order!.orderStatus] === 'NOT-STARTED'
//               ? isOrderLate
//                 ? 'Order is overdue'
//                 : 'Order on hold'
//               : __predefinedLabels[orderStatuses].text}{' '}
//           </Heading20>
//           {ORDER_STATUS[selected_order!.orderStatus] === 'NOT-STARTED' ? (
//             <div
//               style={{ fontSize: '12px', maxWidth: '556px' }}
//               dangerouslySetInnerHTML={{
//                 __html: displayOrderStateDescription(selected_order),
//               }}
//             />
//           ) : (
//             <div
//               style={{ fontSize: '12px', maxWidth: '556px' }}
//               dangerouslySetInnerHTML={{ __html: __predefinedLabels[orderStatuses].description }}
//             />
//           )}
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//           <RenderIf
//             value={
//               !!selected_order?.activities &&
//               ORDER_STATUS[selected_order?.orderStatus ?? -1] === 'REQUEST-CANCELLATION' &&
//               selected_order?.activities.history.createdBy === user?.id
//             }
//           >
//             <ActionButtonOutlined variant='outlined' onClick={() => onWidthdrawRequestClick()}>
//               Withdraw request
//             </ActionButtonOutlined>
//           </RenderIf>

//           <RenderIf value={isLocalWriteReview}>
//             <ActionButtonPrimary
//               variant='contained'
//               sx={{
//                 height: '43px',
//                 color: Color.pureBlack,
//                 fontWeight: '600',
//                 backgroundColor: Color.yellow,
//                 '&:hover': {
//                   backgroundColor: Color.yellow,
//                 },
//               }}
//               onClick={OpenOrderReview}
//             >
//               Write a review
//             </ActionButtonPrimary>
//           </RenderIf>

//           <RenderIf
//             value={
//               !['CANCELLED', 'REQUEST-CANCELLATION', 'COMPLETED', 'MISSING-REQUIREMENT'].includes(
//                 ORDER_STATUS[selected_order?.orderStatus ?? -1],
//               ) ||
//               (ORDER_STATUS[selected_order?.orderStatus ?? -1] === 'REQUEST-CANCELLATION' &&
//                 selected_order?.activities?.history.createdBy !== user?.id)
//             }
//           >
//             <ActionButtonOutlined variant='outlined' as={'a'} href={'#order-details'}>
//               View Details
//             </ActionButtonOutlined>
//           </RenderIf>
//         </Box>
//       </StatusBoxCard>
//       <RenderIf
//         value={
//           ORDER_STATUS[selected_order!.orderStatus] !== 'COMPLETED' &&
//           ORDER_STATUS[selected_order?.state.filter((state: string) => state === '2051')]
//         }
//       >
//         <BorderRoundedContainer sx={{ marginY: '1em', display: 'flex', alignItems: 'center' }}>
//           <WarningIcon style={{ marginRight: '10px', width: '2.1em', height: '2.1em' }} />
//           <div>This order is now overdue. We suggest resolving this right away as it can affect your ratings.</div>
//         </BorderRoundedContainer>
//       </RenderIf>
//     </>
//   );
// };
// export default OrderStatusSellerView;
