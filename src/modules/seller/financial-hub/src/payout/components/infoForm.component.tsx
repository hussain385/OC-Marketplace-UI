import React, { useCallback, useMemo } from 'react';
import { PayoutFormType } from './payoutFormComponent';
import { Box, Typography } from '@mui/material';
import { PrimaryButton, SecondryButton } from '../../../../../../common/styles';
import { MainFormContainer } from './addForm.styles';
import { useSetState } from 'react-use';
import { BasicModal } from '../../components/modal.component';
import { InfoFormModal } from './infoForm.styles';
import { RenderIf } from '../../../../../../common/components';
import { useAppSelector } from '../../../../../../redux/hooks';
import { UserRole } from '../../../../../../common/interface/User';
import { ReactComponent as BankIcon } from '../../assets/bank.svg';
import { companyProfiles } from '../../../../../../common/interface/busines-company-profile-interface';
import {
  useCreatePayoutMutation,
  useCreatePayoutRequestMutation,
  useUpdatePayoutMutation,
  useUpdatePayoutRequestOwnerMutation,
} from '../../services/payout.api';
import { ACTION } from '../../../../../../common/interface';
import OtpModalComponent from '../../components/OtpModal.component';
import { showToast, ToastTypes } from '../../../../../../common/utils';
import { PatternFormat } from 'react-number-format';

interface IProps {
  data: PayoutFormType;
  onEdit: () => void;
  isUpdate: boolean;
}

function InfoFormComponent({ data, onEdit, isUpdate }: IProps) {
  const { selectedEntity, user, selectedRole } = useAppSelector((state) => state.mainState.useInfo);
  const { isReview } = useAppSelector((state) => state.mainState.payoutHub);
  const isIndividual = useMemo(
    () => selectedEntity?.profile.type.includes(companyProfiles.individual),
    [selectedEntity?.profile.type],
  );
  const [{ isOtp, isAdminRequires }, setState] = useSetState({
    isOtp: false,
    isAdminRequires: false,
  });

  const [CreateOwner, { isLoading: isLoading2 }] = useCreatePayoutMutation();
  const [CreateRequest, { isLoading: isLoading3 }] = useCreatePayoutRequestMutation();
  const [UpdateOwner, { isLoading: isLoading4 }] = useUpdatePayoutMutation();
  const [UpdateOwnerRequest] = useUpdatePayoutRequestOwnerMutation();
  const isLoading = useMemo(() => isLoading2 || isLoading3 || isLoading4, [isLoading2, isLoading3, isLoading4]);

  const onVerifyOtp = useCallback(
    (otp: string) => {
      if (selectedRole?.role === UserRole.Owner) {
        if (isUpdate) {
          if (isReview) {
            UpdateOwnerRequest({
              id: data.id ?? '',
              body: {
                otp,
                status: 'APPROVED',
                additionalData: {
                  ...data,
                  contactMobile: data.contactMobileCountryCode + data.contactMobile,
                  type: selectedRole?.entityType?.includes('INDIVIDUAL') ? 'INDIVIDUAL' : 'BUSINESS',
                },
              },
            })
              .unwrap()
              .then(() => showToast('Updated successfully', ToastTypes.SUCCESS));
          } else {
            UpdateOwner({
              id: data.id ?? '',
              data: {
                ...data,
                contactMobile: data.contactMobileCountryCode + data.contactMobile,
                otp,
                type: selectedRole?.entityType?.includes('INDIVIDUAL') ? 'INDIVIDUAL' : 'BUSINESS',
              },
            })
              .unwrap()
              .then(() => showToast('Updated successfully', ToastTypes.SUCCESS));
          }
        } else {
          CreateOwner({
            ...data,
            contactMobile: data.contactMobileCountryCode + data.contactMobile,
            otp,
            type: selectedRole?.entityType?.includes('INDIVIDUAL') ? 'INDIVIDUAL' : 'BUSINESS',
          })
            .unwrap()
            .then(() => showToast('Added successfully', ToastTypes.SUCCESS));
        }
      }
    },
    [selectedRole?.role, selectedRole?.entityType, isUpdate, isReview, UpdateOwnerRequest, data, UpdateOwner, CreateOwner],
  );

  const onRequest = useCallback(() => {
    if (isUpdate) {
      CreateRequest({
        action: ACTION.update,
        bankAccountId: data?.id,
        data: { ...data, contactMobile: data.contactMobileCountryCode + data.contactMobile, type: 'BUSINESS' },
      });
    } else {
      CreateRequest({
        action: ACTION.create,
        data: { ...data, contactMobile: data.contactMobileCountryCode + data.contactMobile, type: 'BUSINESS' },
      });
    }
  }, [CreateRequest, data, isUpdate]);

  return (
    <MainFormContainer sx={{ padding: { xs: '24px 16px', sm: '40px 56px' } }}>
      <Box className={'head-container'}>
        <Typography className={'head'}>Bank account details</Typography>
        <Typography className={'sub'}>Your local bank account to withdraw your earnings in SGD</Typography>
      </Box>

      <InfoTile label={'Bank name (Singapore)'} value={data.bankName} />
      <InfoTile label={'Bank Code'} value={data.bankCode} />
      <RenderIf value={!isIndividual}>
        <InfoTile label={'Company name'} value={data.companyName ?? ''} />
        <InfoTile label={'Company registration number (CRN)'} value={data.companyRegistrationId ?? ''} />
      </RenderIf>
      <InfoTile label={'Account holder name'} value={data.bankAccountUsername} />
      <Box className={'view-tile'}>
        <Typography>{'Account number'}</Typography>
        <PatternFormat displayType={'text'} format={'### ### ### ###'} value={data.bankAccountNumber} />
      </Box>

      <Typography className={'sub-head'}>Account holder&apos;s details</Typography>

      <InfoTile label={'Street address'} value={data.location?.streetAddress} />
      <InfoTile label={'Country'} value={data.location?.country} />
      <InfoTile label={'State/Province'} value={data.location?.state} />
      <InfoTile label={'City'} value={data.location?.city} />
      <InfoTile label={'Postal code'} value={data.location?.postalCode} />

      <InfoTile label={'Email address'} value={data.contactEmail} />
      <InfoTile label={'Phone number'} value={data.contactMobileCountryCode + data.contactMobile} />

      <Box className={'btn-container'}>
        <SecondryButton sx={{ padding: '8px 32px', color: '#7E7E7E', background: 'transparent' }} onClick={onEdit}>
          Edit
        </SecondryButton>
        <PrimaryButton
          sx={{ padding: '8px 32px' }}
          disabled={isLoading}
          onClick={() => {
            if (selectedRole?.role === UserRole.Owner) {
              setState({ isOtp: true });
            } else {
              setState({ isAdminRequires: true });
            }
          }}
        >
          Confirm
        </PrimaryButton>
      </Box>

      <BasicModal
        isClose
        isOpen={isAdminRequires}
        onClose={() => {
          setState({ isAdminRequires: false });
          onRequest();
        }}
        boxSx={{
          maxWidth: '545px',
          padding: '40px',
        }}
      >
        <InfoFormModal>
          <BankIcon width={72} height={72} />
          <Typography className={'head'}>
            {isUpdate ? 'This update requires owner’s approval' : "Adding this bank account requires owner's approval"}
          </Typography>
          <Typography className={'body-light'}>
            {isUpdate
              ? 'The owner has already been notified to review and decide whether to edit, reject, or approve the changes made.'
              : 'The owner has already been notified to review and decide whether to reject or approve adding this bank account.'}
          </Typography>
        </InfoFormModal>
      </BasicModal>

      <OtpModalComponent
        isOpen={isOtp}
        countryCode={user?.mobileCountryCode ?? ''}
        mobile={user?.mobile ?? ''}
        onClose={() => setState({ isOtp: false })}
        onVerifyOtp={onVerifyOtp}
        isLoading={isLoading}
        preText={isUpdate ? 'To update this bank account, ' : 'To add this bank account, '}
      />
    </MainFormContainer>
  );
}

function InfoTile({ label, value }: { label: string; value?: string | number }) {
  if (!value) {
    return null;
  }

  return (
    <Box className={'view-tile'}>
      <Typography>{label}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}

export default InfoFormComponent;
