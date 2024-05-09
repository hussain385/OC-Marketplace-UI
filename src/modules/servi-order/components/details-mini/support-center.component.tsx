import { Box, Divider, IconButton, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Heading14, ShadowBox, Text14 } from '@/common/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Color } from '@/theme';
import { useAppSelector } from '@/redux/hooks';
import Modal from '@/common/components/modal.component';
import { RenderIf } from '@/common/components';
import { getOrderMyRole } from '@/modules/servi-order/Service/order.slice.ts';
import { useActivityActionsMutation } from '@/modules/servi-order/Service/order.api.ts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { activityType } from '@/modules/servi-order/interface';
import RatioForm from '@/common/components/forms/ratio.form.tsx';
import TextAreaForm from '@/common/components/forms/text-area.form.tsx';

const schema = object({
  reason: string().required('You must select reason in order to submit'),
  message: string().notRequired(),
});

type Schema = InferType<typeof schema>;

const SupportCenterComponent = () => {
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  const myRole = useAppSelector(getOrderMyRole);

  /**
   * Cancellation Actions mutation
   */
  const [CancellationActions, { isLoading }] = useActivityActionsMutation();

  /**
   * Form
   */
  const { handleSubmit, reset, control } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * Modal state
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const reasons = useMemo(
    () =>
      myRole === 'BUYER'
        ? ['I placed wrong order', 'The seller is unresponsive', 'The delivery is late', 'Other reason']
        : ['I am unable to fulfil the order', 'The buyer is unresponsive', 'Other'],
    [myRole],
  );

  /**
   * Reset form on modal close
   */
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const _onCancelRequestHandle = () => {
    setIsOpen(true);
  };

  const onSubmit: SubmitHandler<Schema> = useCallback(
    (data) => {
      CancellationActions({
        data: {
          orderId: selectedOrder?.id ?? '',
          activity: {
            type: activityType.requestCancellation,
            data: {
              reason: data.reason,
              message: data.reason.includes('Other') ? data.message : undefined,
            },
          },
        },
      })
        .unwrap()
        .then(() => setIsOpen(false));
    },
    [CancellationActions, selectedOrder?.id],
  );

  const __renderModalContent = () => {
    return (
      <Box>
        <Text14 sx={{ fontWeight: '700' }}>Request cancellation</Text14>
        <Box sx={{ marginY: '16px' }}>
          <Text14 sx={{ fontWeight: '700', marginBottom: '10px' }}>Let us know what happened</Text14>
          <RatioForm control={control} name={'reason'} items={reasons.map((e) => ({ value: e, label: e }))} />
          <Typography sx={{ fontWeight: 'bold', marginY: '10px' }}>
            Inform the {myRole === 'BUYER' ? 'seller' : 'buyer'} why you decided to cancel this order (optional)
          </Typography>
          <Controller
            name={'reason'}
            control={control}
            render={({ field }) => (
              <TextAreaForm
                isDisabled={!(field.value as string)?.match(/Other|reason/g)}
                control={control}
                name={'message'}
                inputProps={{ placeholder: 'Type your message here', maxRows: 2, minRows: 2 }}
              />
            )}
          />
        </Box>
      </Box>
    );
  };

  return (
    <RenderIf value={!['COMPLETED', 'CANCELLED'].includes(selectedOrder!.status)}>
      <ShadowBox sx={{ flexDirection: 'column', marginY: '24px' }}>
        <Box>
          <Heading14>Support center</Heading14>
        </Box>
        <Box>
          <List>
            {/* <ListItem
            secondaryAction={
              <IconButton sx={{ color: Color.priBlue }}>
                <ArrowForwardIcon />
              </IconButton>
            }
          >
            <ListItemText>
              Have a question? checkout <Link sx={{ color: Color.priBlue, fontWeight: 700 }}>FAQs</Link>
            </ListItemText>
          </ListItem>
          <Divider /> */}
            <Divider />
            <ListItem
              sx={{ margin: 0, paddingLeft: 0, paddingRight: '35px' }}
              secondaryAction={
                <IconButton sx={{ color: Color.priBlue }} edge='end' onClick={_onCancelRequestHandle}>
                  <ArrowForwardIcon fontSize='small' />
                </IconButton>
              }
            >
              <ListItemText sx={{ paddingX: '0px' }}>
                <Typography sx={{ display: 'inline-block', fontSize: { xs: '12px', lg: '14px' } }}>
                  Have an issue with the order?
                </Typography>{' '}
                <Link
                  sx={{
                    color: Color.priBlue,
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'inline-block',
                  }}
                  onClick={_onCancelRequestHandle}
                >
                  Cancel the order
                </Link>
              </ListItemText>
            </ListItem>
            {/* <Divider />
          <ListItem
            secondaryAction={
              <IconButton sx={{ color: Color.priBlue }}>
                <ArrowForwardIcon />
              </IconButton>
            }
          >
            <ListItemText>
              Need any help? Go to <Link sx={{ color: Color.priBlue, fontWeight: 700 }}>Help center</Link>
            </ListItemText>
          </ListItem> */}
          </List>
        </Box>
        <Modal
          isForm
          onSubmit={handleSubmit(onSubmit)}
          maxWidth='md'
          footerDisplay='block'
          isOpen={isOpen}
          okBtnLabel='Submit request'
          content={__renderModalContent()}
          onCancel={() => setIsOpen(false)}
          isLoading={isLoading}
        />
      </ShadowBox>
    </RenderIf>
  );
};

export default SupportCenterComponent;
