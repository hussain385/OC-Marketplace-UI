import React, { useCallback, useEffect } from 'react';
import Modal from '@/common/components/modal.component';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.tsx';
import { getOrderMyRole } from '@/modules/servi-order/Service/order.slice.ts';
import { setReviewModal } from '@/modules/reviews/src/service/review.slice.ts';
import { Box, Divider, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import RatingTile from '@/modules/reviews/src/components/order/rating-tile.tsx';
import TextBoxComponent from '@/modules/seller/common-service-components/text-box.component.tsx';
import OrderInfo from '@/modules/reviews/src/components/order/order-info.tsx';
import { useGetReviewQuestionsQuery } from '@/modules/reviews/src/service/review.api.ts';
import queryBuilder from '@/common/utils/helpers/queryBuilder.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReviewSchema, reviewSchema } from '@/modules/reviews/src/utils/interface-validation.ts';
import { useActivityActionsMutation } from '@/modules/servi-order/Service/order.api.ts';
import { activityType } from '@/modules/servi-order/interface';
import FormModalError from '@/modules/reviews/src/components/order/form-error.tsx';
import { RenderIf } from '@/common/components';

function OrderReviewComponent() {
  const selectedOrder = useAppSelector((state) => state.mainState.order.selectedOrder);
  const { showModal } = useAppSelector((state) => state.mainState.review);
  const myRole = useAppSelector(getOrderMyRole);
  const dispatch = useAppDispatch();

  /**
   * Form Hook
   */
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });

  /**
   * Get reviews questions mutation
   */
  const { data: reviewQuestions } = useGetReviewQuestionsQuery(
    queryBuilder((builder) => builder.search({ $and: [{ target: { $eq: myRole === 'SELLER' ? 'BUYER' : 'SELLER' } }] })),
  );

  /**
   * Review Actions
   */
  const [ReviewAction, { isLoading: isActionLoading }] = useActivityActionsMutation();

  const onModalClose = useCallback(() => {
    dispatch(setReviewModal(false));
  }, [dispatch]);

  const onFormModalSubmit: SubmitHandler<ReviewSchema> = useCallback(
    (data) => {
      ReviewAction({
        data: {
          orderId: selectedOrder!.id,
          activity: {
            type: activityType.review,
            data: {
              ...data,
              target: myRole === 'SELLER' ? 'BUYER' : 'SELLER',
            },
          },
        },
      })
        .unwrap()
        .then(onModalClose);
    },
    [ReviewAction, myRole, onModalClose, selectedOrder],
  );

  useEffect(() => {
    if (reviewQuestions) {
      reviewQuestions.data.forEach((e, index) => {
        setValue(`ratings.${index}.code`, e.code);
      });
    }
  }, [reviewQuestions, setValue]);

  return (
    <>
      <Modal
        isForm
        isOpen={showModal}
        isResponseFull
        okBtnLabel={'Submit'}
        onCancel={onModalClose}
        maxWidth={'md'}
        footerJustify={'end'}
        isLoading={isActionLoading}
        onSubmit={handleSubmit(onFormModalSubmit)}
        footerSx={{
          justifyContent: 'space-between',
        }}
        extraFooter={<Box />}
        content={
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '24px', md: '16px' } }}>
            <Typography variant={'heading'}>Write a review</Typography>

            <RenderIf value={Object.keys(errors).length !== 0}>
              <FormModalError onClear={clearErrors} isBuyer={myRole === 'BUYER'} />
            </RenderIf>

            <OrderInfo isSeller={myRole === 'SELLER'} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myRole === 'BUYER' && <Typography variant={'subHeading'}>Share your experience with the community</Typography>}

              {reviewQuestions?.data.map((rate, index) => (
                <Controller
                  key={rate.code}
                  control={control}
                  name={`ratings.${index}.point`}
                  render={({ field }) => <RatingTile title={rate.title} subtitle={rate.description} field={field} />}
                />
              ))}
            </Box>

            <Divider />

            <Typography variant={'subHeading'}>
              Write a detailed comment about your experience with this {myRole === 'SELLER' ? 'buyer' : 'seller'}
            </Typography>
            <Controller
              control={control}
              name={'message'}
              render={({ field }) => (
                <Box>
                  <TextBoxComponent
                    characters={500}
                    description={field.value ?? ''}
                    errors={errors}
                    onChange={field.onChange}
                    fieldName={'message'}
                  />
                </Box>
              )}
            />
          </Box>
        }
      />
    </>
  );

  // return (
  //   <>
  //     <RenderIf value={isExpired ? !isNil(reviewSection.user) || !isNil(reviewSection.opposite) : !isNil(reviewSection.user)}>
  //       <Box sx={{ marginTop: '16px', marginX: { xs: '16px', md: 0 } }}>
  //         <RenderIf value={!isExpired}>
  //           <Box
  //             sx={{
  //               display: 'flex',
  //               padding: '8px',
  //               background: '#FFE164',
  //               borderRadius: '4px',
  //               gap: '10px',
  //               alignItems: 'center',
  //             }}
  //           >
  //             <InfoIcon />
  //             <Typography variant={'subText'} sx={{ color: Color.textBlack, fontWeight: 400, letterSpacing: '-0.5px' }}>
  //               Buyer and seller reviews are due within 14 days after order completion. Once both reviews are in, they&apos;ll be
  //               published within 24 hours. No further changes are allowed thereafter.
  //             </Typography>
  //           </Box>
  //         </RenderIf>
  //
  //         <Box
  //           sx={{
  //             background: isExpired ? '#F6F6F6' : '#E9EEFD',
  //             padding: '16px',
  //             borderRadius: '4px',
  //             marginTop: '6px',
  //           }}
  //         >
  //           <ReviewComment review={isExpired ? reviewSection.opposite : undefined} isUser={false}>
  //             {!isNil(reviewSection.user) ? <ReviewComment review={reviewSection.user} isExpire={isExpired} isUser /> : undefined}
  //           </ReviewComment>
  //         </Box>
  //       </Box>
  //     </RenderIf>
  //
  //     <Modal
  //       isOpen={showModal}
  //       isResponseFull
  //       content={
  //         <Suspense fallback={<Typography>Loading...</Typography>}>
  //           <FormModal formRef={formRef} onSubmit={onFormModalSubmit} initData={reviewSection.user as any} />
  //         </Suspense>
  //       }
  //       okBtnLabel={'Submit'}
  //       onCancel={onModalClose}
  //       onOk={() => formRef.current?.requestSubmit()}
  //       maxWidth={'md'}
  //       footerJustify={'end'}
  //       isLoading={isLoading || isLoadingUpdate}
  //       buttons={{
  //         flex: 0,
  //         minWidth: '146px',
  //       }}
  //     />
  //   </>
  // );
}

export default OrderReviewComponent;
