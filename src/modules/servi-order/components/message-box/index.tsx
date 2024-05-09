import React, { useCallback, useMemo } from 'react';
import { Avatar, Box, TextField, Typography } from '@mui/material';
import { RenderIf, useMediaBreakpoint } from '@/common/components';
import { FloatChatIcon, MessageBoxContainer, ModalBackDrop } from './message-box.style';
import { mediaUrlGenerator } from '@/common/utils';
import { Color } from '@/theme';
import { ActionButtonOutlinedSecondary } from '@/common/styles';
import { ReactComponent as ChatIcon } from '@/assets/order-icon/chat.svg';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppSelector } from '@/redux/hooks.tsx';
import { getOppositeOrderEntity } from '@/modules/servi-order/Service/order.slice.ts';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component.tsx';
import { InferType, mixed, object, string } from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from '@/router.ts';
import { activityType } from '@/modules/servi-order/interface';
import { useActivityActionsMutation } from '@/modules/servi-order/Service/order.api.ts';
import MediaUpload from '@/modules/servi-order/components/message-box/media.tsx';
import { ReactComponent as AttachmentIcon } from '@/assets/icons/attach_icon_2.svg';

const schema = object({
  message: string().required('Message is required'),
  files: mixed(),
});

type Schema = InferType<typeof schema>;

const MessageBoxComponent = () => {
  const { id } = useParams('/account/order-management/:id');
  const { xs, mdLg } = useMediaBreakpoint();

  const oppositeEntity = useAppSelector(getOppositeOrderEntity);
  const photoUrl = useMemo(
    () => (oppositeEntity?.profile.detail.logo ? mediaUrlGenerator(oppositeEntity.profile.detail.logo) : undefined),
    [oppositeEntity?.profile.detail.logo],
  );

  const name = useMemo(() => oppositeEntity?.profile.detail.name, [oppositeEntity?.profile.detail.name]);

  /**
   * Form handling
   */
  const { register, handleSubmit, reset, control } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * State for message box in mobile view
   */
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [SubmitAction, { isLoading }] = useActivityActionsMutation();

  /**
   * Handle form submit
   */
  const onSubmit: SubmitHandler<Schema> = useCallback(
    (data) => {
      const body = {
        orderId: id,
        activity: {
          type: activityType.conversation,
          data: {
            message: data.message,
            attachs: [],
          },
        },
      };

      const formData = new FormData();

      if (data.files && data.files.length > 0) {
        (data.files as any[]).forEach((file, i) => {
          if (file instanceof File) formData.append(`file.${i}`, file);
        });
      }

      SubmitAction({ formData, data: body })
        .unwrap()
        .then(() => reset());
    },
    [SubmitAction, id, reset],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RenderIf value={mdLg}>
        <MessageBoxContainer sx={{ marginTop: '24px' }}>
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <NameOrPictureAvatar url={photoUrl} style={{ height: '32px', width: '32px' }} name={name} />
            <Typography>
              Have something to share with <strong>{name}</strong>?
            </Typography>
          </Box>
          <Box sx={{ border: `1px solid ${Color.borderColorGray}`, marginTop: '16px' }}>
            <TextField
              multiline
              placeholder='Type your message here'
              rows={5}
              sx={{
                border: `0px solid ${Color.bgLine}`,
                padding: '10px',
                borderRadius: '2px',
                width: '100%',
                height: '100%',
                outline: 'none',
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    border: 'none',
                    borderRadius: '4px',
                  },
                },
                '& .MuiOutlinedInput-root:hover': {
                  '& > fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  '& > fieldset': {
                    borderColor: 'none',
                    borderRadius: '4px',
                  },
                },
              }}
              {...register('message')}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px',
                borderTop: `1px solid ${Color.borderColorGray}`,
              }}
            >
              <Controller
                control={control}
                name={'files'}
                render={({ field }) => (
                  <MediaUpload
                    name={'attachs'}
                    maxUploadFileSize={100000000} //100mb
                    value={field.value as any}
                    onChange={(files) => field.onChange(files)}
                    uploadButtonElement={<AttachmentIcon style={{ marginTop: '10px' }} />}
                  />
                )}
              />
              <ActionButtonOutlinedSecondary disabled={isLoading} type={'submit'}>
                Send
              </ActionButtonOutlinedSecondary>
            </Box>
          </Box>
        </MessageBoxContainer>
      </RenderIf>

      <RenderIf value={xs}>
        <FloatChatIcon onClick={() => setIsOpen(true)}>
          <ChatIcon />
        </FloatChatIcon>
      </RenderIf>
      <RenderIf value={isOpen}>
        <ModalBackDrop>
          <Box sx={{ background: 'white', borderRadius: '8px 8px 0px 0px', padding: '24px 16px 0px 16px', width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ClearIcon sx={{ color: Color.pureBlack, cursor: 'pointer', fontSize: '22px' }} onClick={() => setIsOpen(false)} />
            </Box>
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Avatar src={photoUrl} sx={{ height: '32px', width: '32px' }} />
              <Typography>
                Have something to share with <strong>{name}</strong>?
              </Typography>
            </Box>
            <Box sx={{ border: `1px solid ${Color.borderColorGray}`, marginTop: '16px' }}>
              <TextField
                multiline
                placeholder='Type your message here'
                rows={10}
                sx={{
                  border: `0px solid ${Color.bgLine}`,
                  padding: '10px',
                  borderRadius: '2px',
                  width: '100%',
                  height: '100%',
                  outline: 'none',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      border: 'none',
                      borderRadius: '4px',
                    },
                  },
                  '& .MuiOutlinedInput-root:hover': {
                    '& > fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: 'none',
                      borderRadius: '4px',
                    },
                  },
                }}
                {...register('message')}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px',
                borderTop: `1px solid ${Color.borderColorGray}`,
              }}
            >
              <Controller
                control={control}
                name={'files'}
                render={({ field }) => (
                  <MediaUpload
                    uploadButtonElement={<AttachmentIcon style={{ marginTop: '10px' }} />}
                    name={'attachs'}
                    maxUploadFileSize={100000000} //100mb
                    value={field.value as any}
                    onChange={(files) => field.onChange(files)}
                  />
                )}
              />
              <ActionButtonOutlinedSecondary disabled={isLoading} type={'submit'}>
                Send
              </ActionButtonOutlinedSecondary>
            </Box>
          </Box>
        </ModalBackDrop>
      </RenderIf>
    </form>
  );
};

export default MessageBoxComponent;
