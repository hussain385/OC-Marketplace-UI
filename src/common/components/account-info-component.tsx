import * as React from 'react';
import { useLayoutEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import '../styles/account-cards.css';
import { PiWarningCircleFill } from 'react-icons/pi';
import MainLayout from '@/common/layout/main.layout';
import { isEmpty, isUndefined } from 'lodash';
import { Color } from '@/theme';
import { selectedEntityUpdated, selectEntityFromManage } from '@/redux/reducers/authReducers';
import { companyProfiles } from '../interface/busines-company-profile-interface';
import { FooterComp } from '@/modules/seller/common/footer-comp';
import { ActionButtonVerify } from '../styles/index';
import { cards } from '@/common/constants';
import {
  AccountWrapper,
  NotificationSubTitle,
  NotificationSubWrapper,
  NotificationTitle,
  NotificationWrapper,
  TitleBox,
} from '@/common/styles/dashboard.styles';
import { showToast, ToastTypes } from '@/common/utils';
import DashboardRenderCard from '@/common/components/dashboard/dashboard-render.components';
import { Path, useNavigate } from '@/router.ts';
import EntityStatus from '@/modules/entities/components/EntityStatus';
import { PROFILE_TYPE } from '@/common/interface/entity-interface.ts';

export const AccountInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    useInfo: { selectedRole },
  } = useAppSelector((state) => state.mainState);
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isIndividual = useMemo(
    () =>
      !isUndefined(selectedEntity) &&
      !isEmpty(selectedEntity) &&
      selectedEntity?.profile?.type !== null &&
      selectedEntity?.profile?.type.includes(companyProfiles.individual) === true,
    [selectedEntity],
  );

  const accountType = useMemo(
    () =>
      !isUndefined(selectedEntity) && !isEmpty(selectedEntity) && selectedEntity?.profile?.type !== null
        ? selectedEntity?.profile?.type
        : PROFILE_TYPE.individual,
    [selectedEntity],
  );

  const TitleSection = () => (
    <Box sx={{ marginTop: '20px', marginBottom: isIndividual ? '36px' : '0px' }}>
      {selectedEntity && selectedRole && selectedRole.entityStatus === 'DRAFT' && (
        <NotificationWrapper>
          <NotificationSubWrapper>
            <PiWarningCircleFill color={Color.borderLightOrange} size='40' />
            <TitleBox>
              <NotificationTitle>
                Hi {selectedEntity?.profile.detail.name}, please submit the necessary info to verify your identity
              </NotificationTitle>
              <NotificationSubTitle>
                You only need to verify your identity once. This will make succeeding Verifications a breeze
              </NotificationSubTitle>
            </TitleBox>
          </NotificationSubWrapper>

          <ActionButtonVerify
            onClick={() => {
              navigate(
                selectedEntity?.profile.type.includes(companyProfiles.business)
                  ? '/account/entities/verify-now/company'
                  : '/account/entities/verify-now/freelancer',
              );
              dispatch(selectEntityFromManage(selectedEntity));
              dispatch(selectedEntityUpdated(selectedEntity));
            }}
          >
            {' '}
            Verify now
          </ActionButtonVerify>
        </NotificationWrapper>
      )}
    </Box>
  );

  const tileName = ['Buying', 'Selling', 'General'];

  const pageTitleRender = () => {
    return (
      <div style={{ display: 'flex', alignContent: 'center', gap: '8px' }}>
        Dashboard - {selectedEntity?.profile.detail.name} <EntityStatus status={selectedEntity?.status} />
      </div>
    );
  };

  return (
    <MainLayout
      pageDesc='Access all the tools and services you need to manage your account'
      pageTitle={pageTitleRender()}
      breadcrumb={[{ label: 'Home', path: '/account' }, { label: 'Dashboard' }]}
    >
      {/* <NavBar /> */}

      <AccountWrapper>
        <TitleSection></TitleSection>
        {tileName.map(
          (tile) =>
            cards.some((c) => c.type === tile && c.allowedAccounts.includes(accountType)) && (
              <Box key={tile}>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    margin: isIndividual
                      ? { xs: '16px 0px 8px 20px', md: '16px 0px 8px 0px' }
                      : { xs: '36px 0px 24px 20px', md: '36px 0px 24px 0px' },
                    color: '#7e7e7e',
                  }}
                >
                  {isIndividual ? '' : tile}
                </Typography>
                <Box
                  sx={{
                    gap: '16px',
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  {cards.map((cardInfo, key) => {
                    if (cardInfo.type === tile && cardInfo.allowedAccounts.includes(accountType)) {
                      return (
                        <DashboardRenderCard
                          key={key}
                          value={cardInfo}
                          onClick={() => {
                            if (isIndividual && cardInfo.text1 === 'Team management') {
                              showToast('Team management is not available.', ToastTypes.ERROR);
                            } else if (isIndividual && cardInfo.text1 === 'Seller profile') {
                              showToast('Seller profile is not available.', ToastTypes.ERROR);
                            } else {
                              navigate(cardInfo.url as Path);
                            }
                          }}
                          isIndividual={isIndividual}
                        />
                      );
                    }
                  })}
                </Box>
              </Box>
            ),
        )}
        <Box sx={{ width: '100%', marginTop: '5em' }}>
          <FooterComp />
        </Box>
      </AccountWrapper>
    </MainLayout>
  );
};
