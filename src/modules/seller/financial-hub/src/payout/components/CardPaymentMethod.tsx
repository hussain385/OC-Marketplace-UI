import React, { useCallback, useEffect, useMemo } from 'react';
import { useSetState } from 'react-use';
import { Box, Button, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { BsThreeDots } from 'react-icons/bs';
import { AddMainContainer } from './addPaymentMethod.styles';
import PayoutFormComponent from './payoutFormComponent';
import { PrimaryButton, SecondryButton } from '../../../../../../common/styles';
import { ReactComponent as InfoIcon } from '../../../../../../assets/icons/Info-triangle.svg';
import { TagStatus } from '../../../../../../common/styles/tag-status.styles';
import { FaCheckCircle, FaQuestion } from 'react-icons/fa';
import { useGetPayoutInfoQuery, useUpdatePayoutRequestOwnerMutation } from '../../services/payout.api';
import { RenderIf } from '../../../../../../common/components';
import { useAppSelector } from '../../../../../../redux/hooks';
import { UserRole } from '../../../../../../common/interface/User';
import { ACTION } from '../../../../../../common/interface';
import DeleteOwnerModal from './modals/delete.owner.modal';
import { Color } from '../../../../../../theme';
import OtpModalComponent from '../../components/OtpModal.component';
import { showToast, ToastTypes } from '../../../../../../common/utils';
import useQueryParams from '../../../../../../common/utils/hooks/useQueryParams';
import { useDispatch } from 'react-redux';
import { setSelectedCard } from '../../services/payout.slice';
import { useGetKeyStatusQuery } from '../../../../../../redux/apis/transactionApi';

function CardPaymentMethod() {
  const { data, isFetching } = useGetPayoutInfoQuery({});
  const dispatch = useDispatch();
  const [params, setParams] = useQueryParams();
  const { selectedRole, user } = useAppSelector((state) => state.mainState.useInfo);
  const { selectedCard } = useAppSelector((state) => state.mainState.payoutHub);
  const [ApproveOwnerRequest, { isLoading: isLoadingOwner }] = useUpdatePayoutRequestOwnerMutation();
  const { data: bankData } = useGetKeyStatusQuery({ filter: ['type||eq||banks'] });
  const [{ isForms, isView, anchorEl, isDelete, isReject, isApprove, isEditReview }, setState] = useSetState({
    isForms: params.get('isForms')?.toLowerCase() === 'true',
    isView: params.get('isView')?.toLowerCase() === 'true',
    isDelete: false,
    isReject: false,
    isApprove: false,
    isEditReview: params.get('isEditReview')?.toLowerCase() === 'true',
    anchorEl: null as null | HTMLElement,
  });
  const bankLogo = useMemo(() => {
    const banks = bankData?.data.filter((e) => e.code === selectedCard?.bankCode);
    if (banks && banks.length > 0) {
      return banks[0].metadata?.logo;
    }

    return undefined;
  }, [bankData?.data, selectedCard?.bankCode]);

  useEffect(() => {
    if (isFetching) {
      setState({ isForms: false, isReject: false, isDelete: false, isEditReview: false });
      setParams('isForms', '');
      setParams('isView', '');
      setParams('isEditReview', '');
      window.location.replace('#tab=payout-method');
    }
  }, [isFetching, setParams, setState]);

  useEffect(() => {
    if (data && data.data.length > 0) {
      dispatch(setSelectedCard(data.data[0]));
    }
  }, [data, dispatch]);

  const onApproveOtp = useCallback(
    (otp: string) => {
      ApproveOwnerRequest({
        id: selectedCard?.latestRequest?.id ?? '',
        body: {
          otp,
          status: 'APPROVED',
          additionalData: {
            type: selectedCard?.type,
          },
        },
      })
        .unwrap()
        .then(() => {
          showToast('Updated successfully', ToastTypes.SUCCESS);
          setState({ isApprove: false });
        });
    },
    [ApproveOwnerRequest, selectedCard?.latestRequest?.id, selectedCard?.type, setState],
  );

  const FormRender = useCallback(
    () =>
      selectedCard && (
        <PayoutFormComponent
          isView={isView}
          isUpdate
          onCancelOrDelete={() => setState({ isForms: false, isEditReview: false })}
          defaultValues={
            isEditReview && selectedCard?.latestRequest?.metadata?.bankAccountNumber
              ? {
                  id: selectedCard.latestRequest.id,
                  ...selectedCard.latestRequest.metadata,
                  contactMobile: Number(
                    selectedCard.latestRequest.metadata.contactMobile?.replace(
                      selectedCard.latestRequest.metadata.contactMobileCountryCode ?? '',
                      '',
                    ),
                  ),
                }
              : {
                  ...selectedCard,
                  companyName: selectedCard.companyName ?? undefined,
                  companyRegistrationId: selectedCard.companyRegistrationNumber ?? undefined,
                  contactMobileCountryCode: selectedCard.accountMobileCountryCode,
                  bankAccountUsername: selectedCard.accountName,
                  bankAccountNumber: selectedCard.accountNumber,
                  contactEmail: selectedCard.accountEmail,
                  contactMobile: Number(selectedCard.accountMobile.replace(selectedCard.accountMobileCountryCode, '')),
                }
          }
        />
      ),
    [selectedCard, isEditReview, isView, setState],
  );

  if (!isView && isForms) {
    return <>{FormRender()}</>;
  }

  return (
    <AddMainContainer sx={{ flexDirection: 'column', alignItems: 'start', padding: { xs: '24px 16px', sm: '40px 56px' } }}>
      {isView && isForms && selectedCard ? (
        FormRender()
      ) : (
        <>
          <div>
            <Typography className={'head'}>Payout method</Typography>
            <Typography className={'sub'} sx={{ mb: '0 !important' }}>
              A payout method to withdraw your earnings
            </Typography>
          </div>

          <RenderIf value={selectedCard?.latestRequest?.status === 'PENDING'}>
            <div className={'warn-admin'}>
              <InfoIcon width={24} height={24} />
              <RenderIf value={selectedCard?.latestRequest?.action === ACTION.delete}>
                <Typography>Deleting this payout method requires owner&apos;s approval.</Typography>
              </RenderIf>

              <RenderIf value={selectedCard?.latestRequest?.action === ACTION.update}>
                <Typography>Updating this payout method requires owner&apos;s approval.</Typography>
              </RenderIf>

              <RenderIf value={selectedCard?.latestRequest?.action === ACTION.create}>
                <Typography>Adding this bank account requires owner&apos;s approval.</Typography>
              </RenderIf>
            </div>
          </RenderIf>

          <Box className={'card-box'} sx={{ padding: { xs: '16px', sm: '24px 40px' } }}>
            {bankLogo ? (
              <img src={bankLogo} alt={'bank-image'} onClick={() => setState({ isForms: true, isView: true })} />
            ) : (
              <Box
                sx={{
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  background: 'gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                }}
              >
                <FaQuestion color={'white'} size={20} />
              </Box>
            )}

            <div className={'text-container'}>
              <div className={'container-h'}>
                <div className={'head-container'}>
                  <Typography className={'head-bank'}>
                    {selectedCard?.bankName} -{' '}
                    <Typography component={'span'}>**** {selectedCard?.accountNumber.slice(-4)}</Typography>
                  </Typography>
                  <Typography className={'subHeading'}>{selectedCard?.accountName}</Typography>
                </div>
                {selectedCard?.isVerified ? (
                  <TagStatus variant={'success'}>
                    <FaCheckCircle />
                    <Typography>Verified</Typography>
                  </TagStatus>
                ) : (
                  <TagStatus variant={'error'}>
                    <Typography>Unverified</Typography>
                  </TagStatus>
                )}
              </div>

              <IconButton className={'menu-btn'} onClick={(e) => setState({ anchorEl: e.currentTarget })}>
                <BsThreeDots />
              </IconButton>

              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setState({ anchorEl: null })}
                PaperProps={{
                  sx: {
                    width: 208,
                    borderRadius: '8px',
                    boxShadow: '0px 6px 16px 0px rgba(0, 0, 0, 0.12)',
                  },
                }}
              >
                <MenuItem onClick={() => setState({ isView: false, anchorEl: null, isForms: true })}>Edit</MenuItem>
                <Divider sx={{ marginTop: '0 !important', marginBottom: '0 !important' }} />
                <MenuItem onClick={() => setState({ isDelete: true, anchorEl: null })}>Delete</MenuItem>
              </Menu>
            </div>
          </Box>
        </>
      )}

      <RenderIf value={!(selectedRole?.role === UserRole.Owner && selectedCard?.latestRequest?.status === 'PENDING') && isForms}>
        <Box className={'pending-btn-container'}>
          <SecondryButton
            sx={{ padding: '8px 32px', color: '#7E7E7E', bgcolor: 'transparent', ':hover': { bgcolor: 'transparent' } }}
            disableRipple
            onClick={() => setState({ isForms: false, isDelete: true })}
          >
            Delete
          </SecondryButton>
          <PrimaryButton type={'button'} onClick={() => setState({ isView: false })} sx={{ padding: '8px 32px' }}>
            Edit
          </PrimaryButton>
        </Box>
      </RenderIf>

      <RenderIf value={selectedRole?.role === UserRole.Owner && selectedCard?.latestRequest?.status === 'PENDING'}>
        <Box className={'pending-btn-container'}>
          <SecondryButton
            sx={{ bgcolor: 'transparent', color: '#7E7E7E', ':hover': { bgcolor: 'transparent' } }}
            disableRipple
            onClick={() => setState({ isDelete: true, isReject: true })}
          >
            Reject
          </SecondryButton>
          <Box>
            <Button
              sx={{
                color: Color.priBlue,
                border: `1px solid ${Color.priBlue}`,
                padding: '8px 32px',
                textTransform: 'inherit',
              }}
              variant={'outlined'}
              onClick={() => setState({ isForms: true, isView: false, isEditReview: true })}
            >
              Edit
            </Button>
            <PrimaryButton onClick={() => setState({ isApprove: true })}>Approve</PrimaryButton>
          </Box>
        </Box>
      </RenderIf>

      <DeleteOwnerModal isOpen={isDelete} onClose={() => setState({ isDelete: false, isReject: false })} isReject={isReject} />

      <OtpModalComponent
        isOpen={isApprove}
        onClose={() => setState({ isApprove: false })}
        countryCode={user?.mobileCountryCode ?? ''}
        mobile={user?.mobile ?? ''}
        onVerifyOtp={onApproveOtp}
        isLoading={isLoadingOwner}
        preText={'To approve this bank account, '}
      />
    </AddMainContainer>
  );
}

export default CardPaymentMethod;
