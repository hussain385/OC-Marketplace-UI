import moment from 'moment';
import { Box, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { OutlineTextLabel } from './delivery-due-by.style';
import Modal from '@/common/components/modal.component';
import { useAppSelector } from '@/redux/hooks';
import { Heading14, PrimaryButton, ShadowBox, Text12, Text14 } from '@/common/styles';
import { Color } from '@/theme';
import { activityType, orderStatus, subOrderStatus } from '../../interface';
import { useActivityActionsMutation } from '@/modules/servi-order/Service/order.api.ts';
import MediaUpload from '@/modules/servi-order/components/message-box/media.tsx';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InferType, mixed, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { dateDiff } from '@/common/utils';

const schema = object({
  message: string().required('Message is required'),
  files: mixed(),
});

type Schema = InferType<typeof schema>;

const DeliveryDueByComponent = () => {
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  const [CreateDelivery, { isLoading }] = useActivityActionsMutation();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const startDate = moment();
  const endDate = moment(selectedOrder?.currentSubOrder.startedAt).add(selectedOrder!.currentSubOrder.deliveryDays, 'day');
  const { time, date, month, year } = selectedOrder?.currentSubOrder.startedAt
    ? dateDiff(startDate, endDate)
    : { time: '00:00H', date: 0, month: 0, year: 0 };

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = useCallback(
    (data) => {
      const formData = new FormData();

      (data.files as any[])?.forEach((file, i) => {
        if (file instanceof File) formData.append(`files.${i}`, file);
      });

      CreateDelivery({
        formData,
        data: {
          orderId: selectedOrder?.id ?? '',
          activity: {
            type: activityType.delivery,
            data: {
              message: data.message,
              attachs: [],
            },
          },
        },
      })
        .unwrap()
        .then(() => {
          setIsOpen(false);
          reset();
        });
    },
    [CreateDelivery, reset, selectedOrder?.id],
  );

  const __onCloseModal = () => {
    setIsOpen(false);
  };

  const __renderDeliveryModalContent = () => {
    return (
      <Box>
        <Text14 sx={{ fontWeight: '700' }}>Deliver your work</Text14>
        <Controller
          name={'files'}
          control={control}
          render={({ field }) => (
            <MediaUpload
              name={'files'}
              maxUploadFileSize={100000000} //100mb
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Text12 sx={{ color: Color.textHint }}>Tip: Make sure to upload everything you need to deliver</Text12>
          <Text12 sx={{ color: Color.textHint }}>. Format not supported: .exe, .js</Text12>
          <Text12 sx={{ color: Color.textHint }}>. Max file size: 100 MB</Text12>
        </Box>
        <Box sx={{ marginY: '16px' }}>
          <Text14 sx={{ fontWeight: '700', marginBottom: '10px' }}>Describe your delivery in details</Text14>
          <TextField
            multiline
            placeholder='Type your message here'
            rows={5}
            sx={{
              border: `1px solid ${errors?.message ? Color.priRed : Color.bgLine}`,
              padding: '10px',
              borderRadius: '2px',
              width: '100%',
              height: '100%',
            }}
            {...register('message')}
          ></TextField>
        </Box>
      </Box>
    );
  };

  /**
   * When currentSubOrder status is WAITING_REQUIREMENT
   */
  if (selectedOrder?.currentSubOrder.status === subOrderStatus.waitingRequirement) {
    return null;
  }

  // If order completed don't need to display delivery component
  if (selectedOrder?.status === orderStatus.completed) {
    return null;
  }

  return (
    <ShadowBox sx={{ display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
      <Box>
        <Heading14>Delivery due by</Heading14>
      </Box>
      <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', maxWidth: '100vw' }}>
        <OutlineTextLabel>{time}</OutlineTextLabel>
        <OutlineTextLabel>{date}</OutlineTextLabel>
        <OutlineTextLabel>{month}</OutlineTextLabel>
        <OutlineTextLabel>{year}</OutlineTextLabel>
      </Box>
      <Box sx={{ marginTop: '16px' }}>
        <PrimaryButton
          sx={{ width: '100%' }}
          disabled={['COMPLETED', 'CANCELLED', 'REQUEST-CANCELLATION'].includes(selectedOrder!.status)}
          onClick={() => setIsOpen(true)}
        >
          {['REQUEST-REVISION', 'REVIEW-DELIVERY'].includes(selectedOrder!.currentSubOrder.status)
            ? 'Deliver again'
            : 'Deliver now'}
        </PrimaryButton>
      </Box>
      <Modal
        isForm
        onSubmit={handleSubmit(onSubmit)}
        maxWidth='md'
        footerDisplay='block'
        isOpen={isOpen}
        okBtnLabel='Deliver now'
        content={__renderDeliveryModalContent()}
        onCancel={() => __onCloseModal()}
        isLoading={isLoading}
      />
    </ShadowBox>
  );
};

// const dateDiff = (startDate: moment.Moment, endDate: moment.Moment) => {
//   const duration = moment.duration(endDate.diff(startDate));
//   const totalHours = parseInt(duration.asHours().toFixed(0));
//   const time = `${endDate.format('HH:mm')}H`;
//   const totalDays = parseInt(duration.asDays().toFixed(0));
//
//   const dateObj: any = {
//     date: endDate.date(),
//     month: endDate.format('MMMM'),
//     year: endDate.year(),
//     hourLeft: '',
//     time,
//   };
//
//   if (totalDays >= 2) {
//     dateObj.hourLeft = `${totalDays}day(s)`;
//   } else {
//     if (totalDays >= 1 && totalDays < 2) {
//       dateObj.hourLeft = `${endDate.format('HH:mm')}H`;
//     } else {
//       dateObj.hourLeft = `${totalHours}h`;
//     }
//   }
//   return dateObj;
// };

export default DeliveryDueByComponent;
