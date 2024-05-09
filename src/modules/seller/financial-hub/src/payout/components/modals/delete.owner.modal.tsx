import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { SecondryButton } from '@/common/styles';
import OtpModalComponent from '../../../components/OtpModal.component';
import { BasicModal } from '../../../components/modal.component';
import { UserRole } from '@/common/interface/User';
import { ACTION } from '@/common/interface';
import {
  useCreatePayoutRequestMutation,
  useDeletePayoutMutation,
  useUpdatePayoutRequestOwnerMutation,
} from '../../../services/payout.api';
import { useAppSelector } from '@/redux/hooks';
import { useSetState } from 'react-use';
import { showToast, ToastTypes } from '@/common/utils';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  isReject: boolean;
}

function DeleteOwnerModal({ isOpen, onClose, isReject }: IProps) {
  const { selectedRole, user } = useAppSelector((state) => state.mainState.useInfo);
  const [{ isOtp }, setState] = useSetState({ isOtp: false });
  const { selectedCard: firstCard } = useAppSelector((state) => state.mainState.payoutHub);

  const [DeleteCard, { isLoading }] = useDeletePayoutMutation();
  const [DeleteRequest, { isLoading: isLoadingRequest }] = useCreatePayoutRequestMutation({});
  const [DeleteOwnerRequest, { isLoading: isLoadingOwner }] = useUpdatePayoutRequestOwnerMutation();

  const onDelete = useCallback(() => {
    if (selectedRole?.role === UserRole.Admin) {
      return DeleteRequest({
        action: ACTION.delete,
        bankAccountId: firstCard?.id,
      });
    }

    setState({ isOtp: true });
  }, [DeleteRequest, firstCard?.id, selectedRole?.role, setState]);

  const onVerifyOtp = useCallback(
    (otp: string) => {
      if (isReject) {
        return DeleteOwnerRequest({
          id: firstCard?.latestRequest?.id ?? '',
          body: {
            otp,
            status: 'REJECTED',
            additionalData: {
              type: 'BUSINESS',
            },
          },
        });
      }
      DeleteCard({
        id: firstCard?.id ?? '',
        otp,
      })
        .unwrap()
        .then(() => showToast('Payout method deleted', ToastTypes.SUCCESS));
    },
    [DeleteCard, DeleteOwnerRequest, firstCard?.id, firstCard?.latestRequest?.id, isReject],
  );

  return (
    <BasicModal
      isOpen={isOpen}
      onClose={onClose}
      boxSx={{
        maxWidth: '500px',
        padding: '36px',
        borderRadius: '12px',
      }}
    >
      <Typography className={'subHeading'} sx={{ mb: '8px' }}>
        {isReject ? 'Reject this payout method?' : 'Delete payout method?'}
      </Typography>
      <Typography>
        {isReject
          ? "There won't be any changes made to your payout method."
          : selectedRole?.role === UserRole.Admin
          ? "You're attempting to delete a payout method. Owner's approval is required before this action can be completed."
          : "Once deleted, you won't have any account in record to receive your earnings. To proceed, you'll need to verify this action via OTP sent to your registered mobile number. Delete anyway?"}
      </Typography>
      <Box sx={{ display: 'flex', gap: '16px', mt: '24px', '& > button': { width: '100%' } }}>
        <SecondryButton onClick={onClose}>Cancel</SecondryButton>
        <SecondryButton
          sx={{ background: '#FF6A68', color: 'white', ':hover': { background: '#FF6A68' } }}
          disabled={isLoadingRequest}
          onClick={onDelete}
        >
          {isReject ? 'Reject' : 'Delete'}
        </SecondryButton>
      </Box>

      <OtpModalComponent
        isOpen={isOtp}
        onClose={() => setState({ isOtp: false })}
        countryCode={user?.mobileCountryCode ?? ''}
        mobile={user?.mobile ?? ''}
        isLoading={isLoading || isLoadingOwner}
        onVerifyOtp={onVerifyOtp}
        preText={isReject ? 'To reject this bank account, ' : 'To delete this bank account, '}
      />
    </BasicModal>
  );
}

export default DeleteOwnerModal;
