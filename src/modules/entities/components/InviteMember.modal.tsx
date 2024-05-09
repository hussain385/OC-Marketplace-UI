import React, { useCallback } from 'react';
import { Box, ButtonBase, Input, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import Modal from '@/common/components/modal.component.tsx';
import { showToast, ToastTypes } from '@/common/utils';
import { useSetState } from 'react-use';
import { useSendInvitationMutation } from '@/redux/apis/teamManagementApi.ts';

interface IInviteMemberModal {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
}

function InviteMemberModal({ isOpen, onClose, uid }: IInviteMemberModal) {
  const [{ email }, setState] = useSetState({
    email: '',
  });
  const [sendInvitation, { isLoading }] = useSendInvitationMutation();

  const onSendInvitation = useCallback(
    (event: React.FormEvent<HTMLDivElement>) => {
      event.preventDefault();

      sendInvitation({
        invitation: {
          email,
          entityId: uid,
          role: 'Member',
        },
      })
        .unwrap()
        .then((res) => {
          setState({ email: '' });
          showToast(res.message ?? 'Invitation sent successfully', ToastTypes.SUCCESS);
          onClose();
        });
    },
    [email, uid, sendInvitation],
  );

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onClose}
      noBtnDisplay
      closeVariant={'outside'}
      dialogSx={{ '& .MuiPaper-root': { maxWidth: '617px' } }}
      content={
        <Box component={'form'} sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSendInvitation}>
          <Typography sx={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.96px', mb: '1em' }}>
            Invite a member to join your business account
          </Typography>
          <Input
            required
            fullWidth
            disableUnderline
            placeholder={'Email address'}
            type={'email'}
            sx={{ border: '1px solid #EAEAEA', padding: '10px 16px', borderRadius: '4px', mb: '30px' }}
            value={email}
            onChange={(e) => setState({ email: e.target.value })}
          />
          <ButtonBase
            sx={{
              maxWidth: '254px',
              width: '100%',
              height: '44px',
              textAlign: 'center',
              backgroundColor: Color.priBlue,
              borderRadius: '4px',
              color: 'white',
              fontWeight: 600,
              alignSelf: 'center',
            }}
            type={'submit'}
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : 'Send invite'}
          </ButtonBase>
        </Box>
      }
    />
  );
}

export default InviteMemberModal;
