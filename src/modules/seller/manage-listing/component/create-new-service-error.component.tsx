import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetCompanySetupData } from '@/redux/reducers/companySetupReducers';
import { useNavigate } from '@/router';
import { Box, Typography } from '@mui/material';
import { isEmpty, isUndefined } from 'lodash';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import Modal from '@/common/components/modal.component';
import { Color } from '@/theme';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';

type componentProps = {
  open: boolean;
  onCloseHandle: () => void;
};

const CreateNewServiceErrorComponent = ({ open, onCloseHandle }: componentProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.mainState.useInfo);
  const isIndividual = useMemo(
    () =>
      !isUndefined(selectedRole) &&
      !isEmpty(selectedRole) &&
      selectedRole?.entityType !== null &&
      selectedRole?.entityType?.includes(companyProfiles.individual) === true,
    [selectedRole],
  );

  const addNewService = async () => {
    dispatch(resetCompanySetupData());
    await navigate('/account/manage-listing/form');
  };

  const onVerifyClickHandler = () => {
    if (isIndividual) {
      navigate('/account/entities/verify-now/freelancer');
    } else {
      navigate('/setup-organisation');
    }
    onCloseHandle();
  };

  return (
    <Modal
      isBottomSheet
      content={
        <Box>
          <Typography sx={{ fontSize: { xs: '16px', md: '24px' }, fontWeight: '700', marginTop: '1em', textAlign: 'center' }}>
            Be ready to showcase!
            <br />
            Get verified to publish your service
          </Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', marginTop: '0.3em', textAlign: 'center' }}>
            We&apos;re all about excellence and quality at OPNCORP. To maintain it, we&apos;ve established a process where only
            verified users can offer services on our platform. Take the next step and verify now to join the community of our
            trusted providers.
          </Typography>
        </Box>
      }
      isOpen={open}
      onCancel={onCloseHandle}
      noBtnDisplay
      extraFooter={
        <Box
          sx={{
            marginTop: '2em',
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <AppThemeBtnComponent
            onClick={onVerifyClickHandler}
            customButtonStyle={{ height: '40px', width: { xs: '100%', md: '60%' } }}
            color={Color.priWhite}
            backgroundColor={Color.priBlue}
            fontSize={'14px'}
            hover={Color.textHint}
            text={'Verify now'}
          />
          <AppThemeBtnComponent
            onClick={addNewService}
            customButtonStyle={{
              height: '40px',
              width: { xs: '100%', md: '60%' },
              border: `1px solid ${Color.priBlue}`,
              '&:hover': {
                backgroundColor: Color.priWhite,
                border: `1px solid ${Color.priBlue}`,
              },
            }}
            color={Color.priBlue}
            backgroundColor={Color.priWhite}
            fontSize={'14px'}
            hover={Color.textHint}
            text={'Set up a service'}
          />
        </Box>
      }
    />
  );
};

export default CreateNewServiceErrorComponent;
