import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSetState } from 'react-use';
import { ReactComponent as PersonUI } from '../../assets/man-using-laptop.svg';
import { PrimaryButton } from '@/common/styles';
import { AddMainContainer, VerifyAccountModal } from './addPaymentMethod.styles';
import PayoutFormComponent from './payoutFormComponent';
import { SetUpPayoutModal } from './payout.modals';
import { useAppSelector } from '@/redux/hooks';
import { EntityStatus } from '@/common/interface';
import { BasicModal } from '../../components/modal.component';
import { ReactComponent as ManIcon } from '../../assets/man_1.svg';
import useQueryParams from '@/common/utils/hooks/useQueryParams';

function AddPaymentMethod() {
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const [params] = useQueryParams();
  const [{ isModal, isForms }, setState] = useSetState({
    isModal: Boolean(params.get('setup')),
    isForms: false,
  });

  if (isForms) {
    return <PayoutFormComponent onCancelOrDelete={() => setState({ isForms: false })} />;
  }

  return (
    <AddMainContainer>
      <PersonUI />
      <Box>
        <Typography className={'head'}>Payout method</Typography>
        <Typography className={'sub'}>A payout method to withdraw your earnings</Typography>
        <PrimaryButton onClick={() => setState({ isModal: true })}>Add a payment method</PrimaryButton>
      </Box>

      <SetUpPayoutModal
        isOpen={isModal && selectedEntity?.status !== EntityStatus.pending}
        onClose={() => setState({ isModal: false })}
        onSetUp={() => setState({ isForms: true, isModal: false })}
      />

      <BasicModal
        isOpen={isModal && selectedEntity?.status === EntityStatus.pending}
        onClose={() => setState({ isModal: false })}
        boxSx={{ maxWidth: '545px', padding: '40px' }}
        isClose
      >
        <VerifyAccountModal>
          <ManIcon />
          <Typography className={'head'}>Entity verification in progress</Typography>
          <Typography className={'sub'}>
            Once your entity has been verified, you&apos;ll get a notification and can then proceed to add a payout method.
          </Typography>
        </VerifyAccountModal>
      </BasicModal>
    </AddMainContainer>
  );
}

export default AddPaymentMethod;
