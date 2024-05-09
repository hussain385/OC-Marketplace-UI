// import { isNil } from 'lodash';
// import React, { useMemo } from 'react';
// import dayjs from 'dayjs';
// import { Box } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import { ActionButtonOutlined, ActionButtonPrimary, Heading20 } from '@/common/styles';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { ORDER_STATUS } from '@/common/constants';
// import { StatusBoxCard } from './status-box.style';
// import { RenderIf } from '@/common/components';
// import { transactionApi } from '@/redux/apis/transactionApi';
// import { showToast, ToastTypes } from '@/common/utils';
// import { setReviewModal } from '@/modules/reviews/src/service/review.slice';
// import { isWriteReview } from '@/modules/reviews/src/utils/functions';
// import { displayOrderStateDescription } from './';
// import { Color } from '@/theme';
// import { orderStatus, subOrderStatus } from '../../interface';
// import { getOppositeOrderEntity } from '../../Service/order.slice';

// const OrderStatusBuyerView = ({ setTabIndex }: { setTabIndex: React.Dispatch<React.SetStateAction<number>> }) => {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.mainState.useInfo);
//   const { id: orderId } = useParams();
//   const { selectedOrder } = useAppSelector((state) => state.mainState.order);
//   const oppositeEntity = useAppSelector(getOppositeOrderEntity);
  
//   //refactor late logic once discuss with BE
//   // const isOrderLate = useMemo(
//   //   () => ORDER_STATUS[selected_order?.state.filter((state: string) => state === '2051')],
//   //   [selected_order],
//   // );


//   const orderStatuses: string = selectedOrder!.orderStatus;

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
//     'WAITING_REQUIREMENTS': {
//       text: 'Your order is not yet started',
//       description: `You will be notified. When your order starts by <b>${selected_order?.sellerEntityName}</b>`,
//     },
//     'IN_PROGRESS': {
//       text: 'Your order is now in the works',
//       description:
//         selected_order?.activities && selected_order?.activities.history.createdBy === user?.id
//           ? `Your order is in progress <b>${selected_order?.sellerEntityName}</b> has been notified about your order`
//           : `${selected_order?.sellerEntityName} send a request to cancel the order. You either accept or decline the request`,
//     },
//     'REQUEST_REVISION': {
//       text: 'You requested a revision',
//       description:
//         'We suggest being as detailed and clear as possible to help the seller complete the revisions more efficiently.',
//     },
//     2003: {
//       text: 'Your order is overdue',
//       description: `Communicate with <b>${selected_order?.sellerEntityName}</b> and give an update about the order to avoid any issues.`,
//     },
//     'REVIEW_DELIVERY': {
//       text: 'Your delivery is here',
//       description: `If you take no action by <strong>${duration.format(
//         'MMM DD, YYYY H:mm a',
//       )} (within 48 hours)</strong>, this order will automatically be marked as completed.`,
//     },
//     'REQUEST_CANCELLATION': {
//       text: 'Order cancellation request',
//       description:
//         selected_order?.activities && selected_order?.activities.history.createdBy === user?.id
//           ? `You sent a request to cancel the this order. The <b>${selected_order?.sellerEntityName}</b> can either accept or decline your request.`
//           : `<b>${selected_order?.sellerEntityName}</b> sent a request to cancel the order. You can accept or decline the request`,
//     },
//     'CANCELLED': {
//       text: 'Order was cancelled',
//       description: 'Your request to cancel this order has been approved',
//     },
//     'COMPLETED': {
//       text: 'Order completed',
//       description: `We're glad you got your order!`,
//     },
//   };

//   const onWidthdrawRequestClick = () => {
//     const response = dispatch(
//       transactionApi.endpoints.requestCancellation.initiate({ orderId: selectedOrder?.id, isCancel: false }),
//     );
//     response.then((res: any) => {
//       if (res) {
//         showToast('Request cancellation withdrawn successfully', ToastTypes.SUCCESS);
//       }
//     });
//   };

//   /*
//   const onVerifyNowClick = () => {
//     if (selectedEntity?.profile?.type !== null) {
//       navigate('/account/company/profile');
//     } else {
//       navigate('/profile-choice');
//     }
//   };
//   */

//   const onSubmitRequirementHandle = () => {
//     setTabIndex(1);
//   };

//   function OpenOrderReview() {
//     dispatch(setReviewModal(true));
//   }

//   return selectedOrder ? (
//     <StatusBoxCard
//       className={`status ${selectedOrder.status.toLowerCase()} ${
//         selected_order?.state ?? ORDER_STATUS[selected_order?.state.filter((state: string) => state === '2051')].toLowerCase()
//       }`}
//     >
//       <Box>
//         <Heading20>
//           { selectedOrder.status === orderStatus.onHold
//             ? isOrderLate
//               ? 'Your order is overdue'
//               : 'Order on hold'
//             : __predefinedLabels[orderStatuses].text}{' '}
//         </Heading20>
//         {selectedOrder.status === orderStatus.onHold && selectedOrder.currentSubOrder.status === subOrderStatus.waitingRequirement ? (
//           <div
//             style={{ fontSize: '12px', maxWidth: '556px' }}
//             dangerouslySetInnerHTML={{
//               __html: displayOrderStateDescription(selectedOrder, oppositeEntity!),
//             }}
//           />
//         ) : (
//           <div
//             style={{ fontSize: '12px', maxWidth: '556px' }}
//             dangerouslySetInnerHTML={{ __html: __predefinedLabels[orderStatuses].description }}
//           />
//         )}
//       </Box>
//       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//         <RenderIf
//           value={
//             !!selected_order?.activities &&
//             ORDER_STATUS[selected_order?.orderStatus] === 'REQUEST-CANCELLATION' &&
//             selected_order?.activities.history.createdBy === user?.id
//           }
//         >
//           <ActionButtonOutlined variant='outlined' onClick={() => onWidthdrawRequestClick()}>
//             Withdraw request
//           </ActionButtonOutlined>
//         </RenderIf>
//         {/*
//         <RenderIf
//           value={
//             ORDER_STATUS[selected_order?.orderStatus] !== 'REQUEST-CANCELLATION' && selected_order.buyerEntityStatus == 'VERIFIED'
//           }
//         >
//           <ActionButtonOutlined variant='outlined'>View Details</ActionButtonOutlined>
//         </RenderIf>
//         */}
//         {/* this CTA is obsolete due to new flow buyer verification skip.
//         <RenderIf
//           value={selected_order.buyerEntityStatus !== 'VERIFIED' && ORDER_STATUS[selected_order.orderStatus] === 'NOT-STARTED'}
//         >
//           <ActionButtonOutlined variant='outlined' onClick={() => onVerifyNowClick()}>
//             Verify now
//           </ActionButtonOutlined>
//         </RenderIf>
//       */}

//         <RenderIf
//           value={
//             ORDER_STATUS[selected_order?.state.filter((state: string) => state === '2054')] === 'MISSING-REQUIREMENT' &&
//             ORDER_STATUS[selected_order?.orderStatus] !== 'REQUEST-CANCELLATION'
//           }
//         >
//           <ActionButtonOutlined variant='outlined' onClick={() => onSubmitRequirementHandle()}>
//             Submit requirements
//           </ActionButtonOutlined>
//         </RenderIf>

//         <RenderIf value={isLocalWriteReview}>
//           <ActionButtonPrimary
//             variant='contained'
//             sx={{
//               height: '43px',
//               color: Color.pureBlack,
//               fontWeight: '600',
//               backgroundColor: Color.yellow,
//               '&:hover': {
//                 backgroundColor: Color.yellow,
//               },
//             }}
//             onClick={OpenOrderReview}
//           >
//             Write a review
//           </ActionButtonPrimary>
//         </RenderIf>

//         <RenderIf
//           value={
//             !['CANCELLED', 'REQUEST-CANCELLATION', 'COMPLETED', 'MISSING-REQUIREMENT', 'NOT-STARTED'].includes(
//               ORDER_STATUS[selected_order?.orderStatus],
//             ) ||
//             (ORDER_STATUS[selected_order?.orderStatus] === 'REQUEST-CANCELLATION' &&
//               selected_order?.activities?.history.createdBy !== user?.id)
//           }
//         >
//           <ActionButtonOutlined variant='outlined' as={'a'} href={'#order-details'}>
//             View Details
//           </ActionButtonOutlined>
//         </RenderIf>
//       </Box>
//     </StatusBoxCard>
//   ) : (
//     'Loading info...'
//   );
// };
// export default OrderStatusBuyerView;
