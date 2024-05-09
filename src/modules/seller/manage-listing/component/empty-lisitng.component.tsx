// @flow
import React, { useMemo, useState } from 'react';
import { ReactComponent as EmptyIcon } from '../../../../assets/icons/empty-list.svg';
import { Box, Typography } from '@mui/material';
import { Color } from '@/theme';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetCompanySetupData } from '@/redux/reducers/companySetupReducers';
import CreateNewServiceErrorComponent from '@/modules/seller/manage-listing/component/create-new-service-error.component';

export const EmptyListingComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createServiceError, setCreateServiceError] = useState<boolean>(false);
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const status = useMemo(() => selectedEntity?.status === 'VERIFIED', [selectedEntity?.status]);

  const addNewPackage = async () => {
    if (status) {
      dispatch(resetCompanySetupData());
      navigate('/account/manage-listing/form');
    } else {
      setCreateServiceError(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
          border: '1px solid #EFEEEE',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          minHeight: '65vh',
          gap: '1em',
          marginBlock: '1em',
        }}
      >
        <EmptyIcon />
        <div style={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: '14px !important',
              fontWeight: '600',
              color: Color.textBlack,
              marginBottom: '6px',
            }}
          >
            Your listing page is empty
          </Typography>
          <Typography
            sx={{
              fontSize: '14px !important',
              fontWeight: '600',
              color: Color.bgGreyDark,
            }}
          >
            To start selling, add your services here.
          </Typography>
        </div>
        <AppThemeBtnComponent
          onClick={addNewPackage}
          customButtonStyle={{ height: '40px' }}
          color={Color.priWhite}
          backgroundColor={Color.priBlue}
          width={'40%'}
          fontSize={'14px'}
          text={'Create a new service'}
          hover={Color.textHint}
        />
      </Box>
      <CreateNewServiceErrorComponent onCloseHandle={() => setCreateServiceError(false)} open={createServiceError} />
    </>
  );
};
