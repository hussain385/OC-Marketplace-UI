import { Box, SxProps, Typography } from '@mui/material';
import React, { useState } from 'react';
import Modal from '../../../common/components/modal.component';
import { useAppDispatch } from '../../../redux/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActionButtonSecondry } from '../../../common/styles';
import { useEntitySkipVerificationMutation } from '../../../redux/apis/marketplace';
import { getCookie } from '../../../common/utils/cookie';
import { identityUserInfoTempDataUpdated, skipOnboardingUpdated } from '../../../redux/reducers/authReducers';
import { companyProfiles } from '../../../common/interface/busines-company-profile-interface';

export const SkipAlertComponent = ({ isIndividual, buttonSx }: { isIndividual?: boolean; buttonSx?: SxProps }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const [entitySkipVerification, { isLoading }] = useEntitySkipVerificationMutation();

  const _onModalOkHandle = async () => {
    dispatch(skipOnboardingUpdated(true));
    dispatch(identityUserInfoTempDataUpdated({ skip: true, routePath: location.pathname }));
    await entitySkipVerification({ entityType: isIndividual ? companyProfiles.individual : 'BUSINESS' });
    navigate('/account');
  };

  const SkipAlertText = () => (
    <Box sx={{ mb: '8px' }}>
      <Typography sx={{ fontWeight: 'bold', mb: '8px' }}>Skip setting up your organisation?</Typography>
      <Typography>You’ll have to finish setting up your organisation profile later to access all services on OPNCORP</Typography>
    </Box>
  );

  return (
    <>
      {getCookie('x-client-type') === 'buyer' ? (
        <ActionButtonSecondry
          onClick={() => setOpenModal(true)}
          color='inherit'
          type={'button'}
          sx={{ mr: 1, fontSize: { xs: '12px', md: '14px' }, ...buttonSx }}
        >
          Skip for now
        </ActionButtonSecondry>
      ) : (
        <Box />
      )}
      <Modal
        isOpen={openModal}
        content={<SkipAlertText />}
        okBtnLabel={isLoading ? 'Loading...' : 'Skip for now'}
        isRedPriButton={false}
        onCancel={() => {
          setOpenModal(false);
        }}
        onOk={_onModalOkHandle}
        buttons={{ fontSize: { xs: '12px', md: '14px' }, width: { xs: '100%', md: '40%' } }}
      />
    </>
  );
};
