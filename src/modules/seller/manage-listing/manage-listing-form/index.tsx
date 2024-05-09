// @flow
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Tab, Tabs } from '@mui/material';
import { Color } from '@/theme';
import { ProfileSetupSteps } from '../../common/profile-setup-steps';
import { OverviewView } from './overview.view';
import { ManagePlanView } from './manage-plan.view';
import { SuccessBoxView } from './success-box.view';
import LogoutModal from '../../../../common/components/logout-popup.component';
import { useGlobalLogoutState } from '@/common/utils/global_state.util';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import NavBar from '@/common/components/navbar';
import { useSetState } from 'react-use';
import Modal from '@/common/components/modal.component';
import { useNavigate } from 'react-router-dom';
import useScroll from '@/common/utils/hooks/useScroll';
import Requirements from '@/modules/seller/manage-listing/manage-listing-form/requirements';
import { resetCompanySetupData } from '@/redux/reducers/companySetupReducers';
import { DiscardMessage } from '@/modules/seller/manage-listing/component/quit-editing-modal.component';
import { FooterComp } from '@/modules/seller/common/footer-comp';
import PaymentView from '@/modules/seller/manage-listing/manage-listing-form/payment.view';

export const ManageListingForm = () => {
  const navigate = useNavigate();
  const [stepCount, setStepCount] = useState<number>(0);
  const [logoutModal] = useGlobalLogoutState();
  const { serviceData } = useAppSelector((state) => state.mainState.companySetup);
  const [{ discardModal }, setState] = useSetState({
    discardModal: false,
  });
  useScroll({ useEffectDep: [stepCount] });
  const dispatch = useAppDispatch();

  const isEdit = useMemo(
    () => serviceData.edit && serviceData.step > 3,
    [serviceData.edit, serviceData.status, serviceData.step],
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setStepCount(newValue);

  useEffect(() => {
    if ((serviceData.status === 'DISABLED' || serviceData.status === 'DRAFT') && serviceData.step < 4) {
      setStepCount(serviceData.step);
    }
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      <NavBar />
      <div>
        <Box
          sx={{
            display: 'flex',
            borderBottom: `1px solid ${Color.line}`,
            alignItems: 'center',
            marginInline: '5%',
            width: '90%',
            justifyContent: { xs: 'center', sm: 'space-between' },
            flexDirection: 'row',
            marginTop: '1.5em',
          }}
        >
          {isEdit ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: '6px',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: { xs: 'none', sm: 'center' },
              }}
            >
              <Tabs
                TabIndicatorProps={{ style: { background: '#c4c4c4', color: '#c4c4c4' } }}
                textColor='secondary'
                indicatorColor='secondary'
                value={stepCount}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{
                  textTransform: 'none',
                  '& .MuiTabs-indicator': {
                    backgroundColor: `${Color.positive} !important`,
                  },
                  '& .Mui-selected': {
                    color: `${Color.positive} !important`,
                    textTransform: 'none',
                  },
                  '& .MuiButtonBase-root': {
                    textTransform: 'none',
                    fontSize: { xs: '13px', md: '14px' },
                    fontWeight: '700',
                  },
                  '& .MuiTabs-scroller': {
                    overflow: 'auto !important',
                  },
                }}
              >
                <Tab value={0} label={'Overview'} />
                <Tab value={1} label={'Packages'} />
                <Tab value={2} label={'Payment'} />
                <Tab value={3} label={'Requirements'} />
              </Tabs>
            </Box>
          ) : (
            <ProfileSetupSteps manageListing={true} stepCount={stepCount} />
          )}
          {isEdit && (
            <Button
              sx={{
                border: `1px solid ${Color.priRed}`,
                color: Color.priRed,
                textTransform: 'none',
                fontSize: '14px',
                height: '40px',
                letterSpacing: '-0.5px',
                minWidth: '105px',
                display: { xs: 'none', md: 'block' },
              }}
              onClick={() => setState({ discardModal: true })}
            >
              Quit editing
            </Button>
          )}
        </Box>
        {stepCount === 0 ? (
          <OverviewView updateStepCount={(value) => setStepCount(value)} step={stepCount} />
        ) : stepCount === 1 ? (
          <ManagePlanView updateStepCount={(value) => setStepCount(value)} step={stepCount} />
        ) : stepCount === 2 ? (
          <PaymentView updateStepCount={(value) => setStepCount(value)} step={stepCount} />
        ) : stepCount === 3 ? (
          <Requirements updateStepCount={(value) => setStepCount(value)} step={stepCount} manageListing />
        ) : (
          <SuccessBoxView />
        )}
      </div>
      {logoutModal && <LogoutModal />}

      <Modal
        isOpen={discardModal}
        content={
          <DiscardMessage
            heading={'Quit editing?'}
            message={
              "If you quit now, any changes you've made and haven't saved will be lost. To save your progress, click 'Save and quit'."
            }
          />
        }
        okBtnLabel={'Quit'}
        isRedPriButton={true}
        cancelBtnText={'Cancel'}
        buttons={{ fontSize: '12px', width: { xs: '50%', md: '45%' } }}
        onCancel={() => {
          setState({ discardModal: false });
        }}
        onOk={() => {
          setState({ discardModal: false });
          //clear data
          dispatch(resetCompanySetupData());
          navigate('/account/manage-listing');
        }}
      />
      <Box sx={{ position: 'absolute', bottom: '-5em', width: '100%' }}>
        <FooterComp />
      </Box>
    </Box>
  );
};
