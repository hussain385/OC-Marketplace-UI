/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import usePayloadUseInfo from '@/common/utils/hooks/usePayloadUseInfo';
import LogoutModalComponent from '@/common/components/logout-popup.component';
import { selectedEntityUpdated, updateTempData } from '@/redux/reducers/authReducers';
import { useGlobalLogoutState } from '@/common/utils/global_state.util';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Modal from '@/common/components/modal.component';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import useValidateUser from '@/common/utils/hooks/useValidateUser';
import { IEntity } from '@/common/interface/entity-interface';
import { socketManager } from '@/modules/communication';
import { resetChat } from '@/modules/communication/services';
import { baseApi } from '@/redux/baseAPI';
import MobileUserPopupMenuComponent, { MuiButton } from '@/common/components/navbar/mobile-user-popup-menu.component';
import { Box } from '@mui/material';
import LoginButtonComponent from '@/common/components/navbar/login-button.component';
import SwitchBtnComponent from '@/common/components/navbar/switch-btn.component';

type componentPropType = {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerComponent = ({ openDrawer, setOpenDrawer }: componentPropType) => {
  const { user } = usePayloadUseInfo();
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutModal, setLogout] = useGlobalLogoutState();

  const isIndividual = useMemo(
    () => !!selectedEntity?.profile?.type && selectedEntity.profile?.type.includes(companyProfiles.individual) === true,
    [selectedEntity],
  );

  const { navigateAccountInfo } = useValidateUser();

  const onSelectEntity = useCallback(
    (entity: IEntity) => {
      dispatch(selectedEntityUpdated(entity));
      socketManager.disconnect();
      dispatch(resetChat());
      dispatch(baseApi.util?.resetApiState());
    },
    [dispatch],
  );

  const handlerSignOut = () => {
    handleClose();
    setLogout(true);
    dispatch(updateTempData({}));
  };

  const navigationVerification = () => {
    if (isIndividual) {
      navigate('/freelance-individual-registration');
    } else {
      navigate('/setup-organisation');
    }
  };

  const handleClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Modal
        isBottomSheet
        content={
          <>
            {user ? (
              <MobileUserPopupMenuComponent
                onSelectEntity={onSelectEntity}
                handlerSignOut={handlerSignOut}
                navigateAccountInfo={navigateAccountInfo}
                navigationVerification={navigationVerification}
              />
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <MuiButton onClick={() => navigate('/')}>Home</MuiButton>
                <MuiButton onClick={() => navigate('/catalog/category')}>Explore services</MuiButton>
                <LoginButtonComponent scrollDirection={475} />
                <SwitchBtnComponent />
              </Box>
            )}
          </>
        }
        isOpen={openDrawer}
        onCancel={handleClose}
        noBtnDisplay
        dialogContentStyle={{
          padding: { xs: '16px 7px', md: '24px' },
        }}
      />
      {logoutModal && <LogoutModalComponent />}
    </>
  );
};

export default DrawerComponent;
