import dayjs from 'dayjs';
import { Box, Link, TextField, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import DetailCardView from '../detail-card';
import { mediaUrlGenerator } from '@/common/utils';
import { activityDateLabelStyle, ActivityIcons, ActivityLabel, activityListStyles, ActivityVerticalLine } from './activity.style';
import { ReactComponent as DeliveredIcon } from '@/assets/order-icon/delivered.svg';
import { ReactComponent as DocumentIcon } from '@/assets/order-icon/document.svg';
import { Color } from '@/theme';
import { ILogo } from '@/common/interface';
import { ActivityDelivery, activityType } from '../../interface';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component.tsx';
import { ReactComponent as WarningIcon } from '@/assets/order-icon/warning.svg';
import moment from 'moment/moment';
import { getOrderMyRole } from '@/modules/servi-order/Service/order.slice.ts';
import { ActionButtonOutlined, ActionButtonOutlinedPrimary, Text14 } from '@/common/styles';
import { useActivityActionsMutation } from '@/modules/servi-order/Service/order.api.ts';
import Modal from '@/common/components/modal.component';
import MediaUpload from '@/modules/servi-order/components/message-box/media.tsx';
import { ReactComponent as OPNIcon } from '@/assets/order-icon/opn_logo_icon.svg';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InferType, mixed, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { paymentType, PaymentTypes } from '@/common/interface/service-interface.ts';

interface IActivityDeliveryView {
  activity: ActivityDelivery;
}

const schema = object({
  message: string().required('Message is required'),
  files: mixed(),
});

type Schema = InferType<typeof schema>;

const _modalBody: Record<PaymentTypes, string> = {
  [paymentType.subscription]:
    'Make sure your have reviewed the delivery. Once you approve it, you current delivery will be marked as completed.',
  [paymentType.milestone]:
    'Make sure your have reviewed the milestone. Once you approve it, you milestone will be marked as completed.',
};

export const ActivityDeliveryView = ({ activity }: IActivityDeliveryView) => {
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  const myRole = useAppSelector(getOrderMyRole);
  const [DeliveryAction, { isLoading }] = useActivityActionsMutation();

  const [isModal, setIsModal] = useState<'Approve' | 'Revision' | undefined>(undefined);

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * On delivery approve
   */
  const onApprove = useCallback(() => {
    DeliveryAction({
      data: {
        orderId: selectedOrder?.id ?? '',
        activity: {
          type: activityType.approveDelivery,
          data: {
            deliveryId: activity.id,
          },
        },
      },
    })
      .unwrap()
      .then(() => setIsModal(undefined));
  }, [DeliveryAction, activity.id, selectedOrder?.id]);

  /**
   * On request revision
   */
  const onRevision: SubmitHandler<Schema> = useCallback(
    (data) => {
      const formData = new FormData();

      (data.files as any[])?.forEach((file, i) => {
        if (file instanceof File) formData.append(`files.${i}`, file);
      });

      DeliveryAction({
        formData,
        data: {
          orderId: selectedOrder?.id ?? '',
          activity: {
            type: activityType.requestRevision,
            data: {
              deliveryId: activity.id,
              message: data.message,
              attachs: [],
            },
          },
        },
      })
        .unwrap()
        .then(() => {
          reset();
          setIsModal(undefined);
        });
    },
    [DeliveryAction, activity.id, reset, selectedOrder?.id],
  );

  const __renderAttachment = () => {
    if (activity.data.attachs.length > 0) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginY: '10px' }}>
          <ActivityIcons className='attachment'>{<DocumentIcon />}</ActivityIcons>
          {activity.data.attachs.map((attachment, index: number) => (
            <Link
              key={index}
              href={mediaUrlGenerator(attachment)}
              target='_blank'
              sx={{ color: Color.priBlue, marginLeft: '5px' }}
            >
              Download attachment
            </Link>
          ))}
        </Box>
      );
    }
  };

  return (
    <>
      <Box id={activity.id}>
        <Box sx={{ padding: '5px 16px' }}>
          <Box sx={activityListStyles}>
            <ActivityIcons className={activity.type}>{<DeliveredIcon />}</ActivityIcons>
            <ActivityLabel>
              {selectedOrder?.paymentType === paymentType.subscription ? 'The order' : `Milestone #${activity.data.sequence}`} has
              been delivered
              <Typography sx={activityDateLabelStyle} component={'span'}>
                {dayjs(activity.createdAt).format('MMM D, HH:mm A')}
              </Typography>
            </ActivityLabel>
          </Box>
        </Box>
        <ActivityVerticalLine sx={{ paddingTop: 0 }}>
          <DetailCardView>
            <DetailCardView.Header>
              {selectedOrder?.paymentType === paymentType.subscription ? 'Delivery' : 'Milestone'} #{activity.data.sequence}.
              {activity.data.subSequence}
            </DetailCardView.Header>
            <DetailCardView.Content>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <NameOrPictureAvatar
                  style={{ height: '24px', width: '24px' }}
                  name={selectedOrder?.seller.profile.detail.name}
                  url={
                    selectedOrder?.seller.profile.detail.logo
                      ? mediaUrlGenerator(selectedOrder?.seller.profile.detail.logo as ILogo)
                      : undefined
                  }
                />
                <Box sx={{ pt: '4px' }}>
                  {activity.data.message} {__renderAttachment()}
                </Box>
              </Box>
            </DetailCardView.Content>

            {activity.data.deliveryStatus === 'DELIVERED' && myRole && (
              <DetailCardView.Footer>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WarningIcon style={{ marginRight: '10px' }} />
                  <Typography sx={{ fontSize: '12px' }}>
                    {myRole === 'SELLER' ? "If the buyer doesn't respond" : 'If you take no action'} by&nbsp;
                    <strong>{moment(activity.createdAt).add(72, 'hours').format('MMM DD, HH:mm a')} (within 72 hours)</strong>,
                    this order will automatically be marked as completed.
                  </Typography>
                </Box>
              </DetailCardView.Footer>
            )}
          </DetailCardView>
          {activity.data.deliveryStatus === 'DELIVERED' && myRole === 'BUYER' && (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', paddingTop: '16px' }}>
              <ActionButtonOutlined disabled={isLoading} sx={{ marginRight: '16px' }} onClick={() => setIsModal('Revision')}>
                Request a revision
              </ActionButtonOutlined>
              <ActionButtonOutlinedPrimary disabled={isLoading} onClick={() => setIsModal('Approve')}>
                Approve {selectedOrder?.paymentType === paymentType.milestone ? 'milestone' : ''} delivery
              </ActionButtonOutlinedPrimary>
            </Box>
          )}
        </ActivityVerticalLine>
      </Box>

      {/** Revision Modal */}
      <Modal
        isForm
        onSubmit={handleSubmit(onRevision)}
        maxWidth='md'
        footerDisplay={'flex'}
        isOpen={isModal === 'Revision'}
        isLoading={isLoading}
        onCancel={() => setIsModal(undefined)}
        footerSx={{
          alignItems: 'center',
        }}
        okBtnLabel={isModal}
        content={
          <Box>
            <Text14 sx={{ fontWeight: '700' }}>
              <OPNIcon style={{ marginRight: '10px' }} /> What revisions would you like{' '}
              <span style={{ color: '#2752E7' }}>{selectedOrder?.seller.profile.detail.name}</span> to make?
            </Text14>
            <Box sx={{ marginY: '16px' }}>
              <Box>
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
                />
              </Box>
            </Box>
          </Box>
        }
        extraFooter={
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
        }
      />

      {/** Approve Modal */}
      <Modal
        maxWidth='sm'
        footerDisplay={'flex'}
        isOpen={isModal === 'Approve'}
        isLoading={isLoading}
        onCancel={() => setIsModal(undefined)}
        footerSx={{
          alignItems: 'center',
        }}
        okBtnLabel={'Approve'}
        onOk={onApprove}
        content={
          <Box>
            <Text14 sx={{ fontWeight: '700' }}>
              Approve {selectedOrder?.paymentType === paymentType.subscription ? 'delivery' : 'milestone'}?
            </Text14>
            <Box sx={{ marginY: '16px' }}>{_modalBody[selectedOrder!.paymentType]}</Box>
          </Box>
        }
      />
    </>
  );
};
