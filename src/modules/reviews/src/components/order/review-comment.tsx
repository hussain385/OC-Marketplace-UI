// import React, { useMemo } from 'react';
//
// import { Avatar, Box, Button, Typography } from '@mui/material';
// import { Star } from '@mui/icons-material';
//
// import { Color } from '../../../../../theme';
// import { styled } from '@mui/system';
// import { RenderIf } from '../../../../../common/components';
// import { Review } from '../../utils/interface-validation';
// import { isNil } from 'lodash';
// import moment from 'moment';
// import { setReviewModal } from '../../service/review.slice';
// import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
// import { getAverageReviewsRating } from '../../utils/functions';
// import { mediaUrlGenerator } from '../../../../../common/utils';
// import { getCookie } from '../../../../../common/utils/cookie';
//
// interface Props {
//   children?: React.ReactNode;
//   review?: Review;
//   isExpire?: boolean;
//   isUser: boolean;
// }
//
// function ReviewComment({ children, review, isExpire = true, isUser }: Props) {
//   const dispatch = useAppDispatch();
//   const { selectedOrder } = useAppSelector((state) => state.mainState.order);
//   const totalRating = useMemo(() => {
//     if (!isNil(review)) {
//       if (review.from === 'SELLER') {
//         return review.ratingPoints.overview;
//       } else {
//         const rates = review.ratingPoints;
//         return getAverageReviewsRating(rates);
//       }
//     }
//     return 0;
//   }, [review]);
//   const parentComment = useMemo(() => {
//     const userType = getCookie('x-client-type');
//     if (userType === 'buyer') {
//       return {
//         name: selectedOrder?.seller.profile.detail.name,
//         logo: selectedOrder?.buyer.profile.detail.name,
//       };
//     }
//     return {
//       name: selectedOrder?.buyer.profile.detail.name,
//       logo: selectedOrder?.seller.profile.detail.name,
//     };
//   }, [selectedOrder]);
//
//   if (isNil(review)) {
//     return <>{children}</>;
//   }
//
//   return (
//     <StyledReviewComment>
//       <RenderIf value={isUser}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
//           <Typography
//             sx={{
//               color: 'black',
//               fontSize: '16px !important',
//               fontWeight: '600',
//               letterSpacing: '-0.48px',
//             }}
//           >
//             Reviews by you
//           </Typography>
//
//           <RenderIf value={!isExpire}>
//             <Button
//               variant={'text'}
//               sx={{
//                 color: '#2752E7',
//                 fontSize: 12,
//                 fontFamily: 'Manrope',
//                 fontWeight: '600',
//                 padding: 0,
//                 textTransform: 'none',
//               }}
//               onClick={() => dispatch(setReviewModal(true))}
//             >
//               Edit your review
//             </Button>
//           </RenderIf>
//         </Box>
//       </RenderIf>
//
//       <RenderIf value={!isUser}>
//         <Box className={'LogoContainer'}>
//           <Avatar title={'Logo'} src={parentComment?.logo == null ? undefined : mediaUrlGenerator(parentComment?.logo)} />
//           <Typography variant={'subHeading'} className={'title'}>
//             {parentComment?.name}
//           </Typography>
//         </Box>
//       </RenderIf>
//
//       <Box className={'RatingContainer'}>
//         <Star className={'star'} />
//         <Typography className={'rate-number'}>{totalRating.toPrecision(2)}</Typography>
//         <Typography className={'rate-text'}>{review.from === 'BUYER' ? 'Rating on service' : 'Rating for customer'}</Typography>
//       </Box>
//
//       <Box className={'CommentContainer'}>
//         <Typography className={'comment-text'}>{review.comment}</Typography>
//         <Typography className={'date'}>{moment(review.updatedAt).format('DD MMM YYYY')}</Typography>
//       </Box>
//
//       <RenderIf value={!isNil(children)}>
//         <Box className={'NestedContainer'}>{children}</Box>
//       </RenderIf>
//     </StyledReviewComment>
//   );
// }
//
// const StyledReviewComment = styled(Box)`
//   display: flex;
//   gap: 10px;
//   flex-direction: column;
//
//   & .LogoContainer {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//
//     & .title {
//       color: black;
//       font-weight: 600;
//       letter-spacing: -0.5px;
//     }
//   }
//
//   & .RatingContainer {
//     display: flex;
//
//     & .star {
//       color: ${Color.orderStar};
//       margin-right: 6px;
//     }
//
//     & .rate-number {
//       margin-right: 10px;
//       color: black;
//       font-size: 12px !important;
//       font-weight: 600;
//       letter-spacing: -0.36px;
//     }
//
//     & .rate-text {
//       color: #7e7e7e;
//       font-size: 12px !important;
//       font-weight: 600;
//       letter-spacing: -0.36px;
//     }
//   }
//
//   & .CommentContainer {
//     & .comment-text {
//       min-height: 10px;
//       font-size: 14px;
//       font-style: normal;
//       font-weight: 400;
//       margin-bottom: 4px;
//       letter-spacing: -0.5px;
//       word-break: break-word;
//     }
//
//     & .date {
//       color: #7e7e7e;
//       font-size: 10px !important;
//       font-style: normal;
//       font-weight: 600;
//       letter-spacing: -0.3px;
//     }
//   }
//
//   & .NestedContainer {
//     padding: 16px;
//     background: #fff;
//     border-radius: 4px;
//   }
// `;
//
// export default ReviewComment;
