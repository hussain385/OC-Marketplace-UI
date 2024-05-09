// @flow
import React, { useState } from 'react';
import { Box, Button, Tab, Tabs } from '@mui/material';
import { PackageToggleComponent } from './package-toggle.component';
import { isEmpty, isNull } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { PackagesOverviewLoading } from '../components/packages-overview-loading';

import { Package } from '@/common/interface/service-interface';

import { useAppSelector } from '@/redux/hooks';
import { showToast, ToastTypes } from '../../../common/utils';
import { Color } from '@/theme';
import EmptyUI from '../../../common/components/empty-ui.component';
import MuiAppThemeBtnComponent from '../../../common/components/mui-app-theme-btn.component';
import useBackToLogin from '@/common/utils/hooks/useBackToLogin';
import { RenderIf } from '@/common/components';

type companyServicesType = {
  companyServices: Package[];
  setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>;
  serviceName: string;
  companyName?: string;
  categoryName: string;
  companyId: string | undefined;
  serviceId: string;
};

export const PackagesOverviewComponent = ({
  companyServices,
  setOpenMessage,
  companyName,
  categoryName,
  serviceName,
  companyId,
  serviceId,
}: companyServicesType) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const { user, selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const { redirect } = useBackToLogin();

  const isMyOwnService = user?.roles.some((e) => e.entityId === companyId) as boolean;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChoosePackage = async () => {
    if (isEmpty(user)) {
      redirect();
    } else if (isNull(selectedEntity)) {
      navigate('/freelance-individual-registration');
      showToast('Please verify your identity/company', ToastTypes.SUCCESS);
    } else {
      // dispatch(
      //   packageInfoUpdateAction({
      //     merchantId: '',
      //     planId: `${companyServices[value].id}`,
      //     serviceId: serviceId ? serviceId : '',
      //     companyId: companyId ? companyId : '',
      //     serviceName: serviceName,
      //     companyName: companyName ? companyName : '',
      //     categoryName: categoryName,
      //     whatYouGet: companyServices[value].description,
      //     deliveryTime: companyServices?.[value]?.deliveryDays?.toString() ?? '',
      //     requirements: companyServices[value].prerequisite ?? 'No requirements',
      //     paymentSchedule: companyServices[value].paymentFrequency ? true : false,
      //     packageHeading: companyServices[value].name,
      //     price: Number(companyServices[value].price),
      //     orderId: '',
      //     vkey: '',
      //     vcode: '',
      //     returnurl: '',
      //     callbackurl: '',
      //     paymentUrl: '',
      //   }),
      // );
      navigate(`/checkout/${companyServices[value].id}`);
    }
  };

  if (!isEmpty(companyServices)) {
    return (
      <Box className='Package'>
        <Box sx={{ borderBottom: '1px solid #EAEAEA' }}>
          <Tabs
            TabIndicatorProps={{ style: { background: '#c4c4c4', color: '#c4c4c4' } }}
            variant='fullWidth'
            textColor='secondary'
            indicatorColor='secondary'
            value={value}
            onChange={handleChange}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: `${Color.priBlue} !important`,
              },
              '& .Mui-selected': {
                color: Color.priBlue,
              },
            }}
          >
            {companyServices.map((plan, key) => {
              if (plan.status === 'ACTIVE') {
                return <Tab key={key} value={key} label={plan.name} />;
              }
            })}
          </Tabs>
        </Box>
        {value === 0
          ? companyServices[0].status === 'ACTIVE' && (
              <PackageToggleComponent serviceCount={companyServices.length} packageProp={companyServices[0]} />
            )
          : value === 1
            ? companyServices.length >= 2 &&
              companyServices[1].status === 'ACTIVE' && (
                <PackageToggleComponent serviceCount={companyServices.length} packageProp={companyServices[1]} />
              )
            : companyServices.length === 3 &&
              companyServices[2].status === 'ACTIVE' && (
                <PackageToggleComponent serviceCount={companyServices.length} packageProp={companyServices[2]} />
              )}
        <Box
          sx={{
            marginTop: '1em',
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            width: '100%',
          }}
        >
          <RenderIf value={!isMyOwnService}>
            {!companyServices[value].isContactFirst && (
              <MuiAppThemeBtnComponent
                onClick={handleChoosePackage}
                type='button'
                widthSize='100%'
                heightSize='44px'
                style={{
                  background: Color.priBlue,
                  borderRadius: '2px',
                  color: Color.priWhite,
                  lineHeight: 1.71,
                  letterSpacing: '-0.5px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
                value={'Choose'}
              />
            )}

            <Button
              onClick={() => {
                if (isEmpty(user)) {
                  redirect();
                } else {
                  setOpenMessage(true);
                }
              }}
              sx={{
                background: Color.priWhite,
                borderRadius: '2px',
                width: '100%',
                height: '44px',
                border: `1px solid ${Color.positive}`,
                color: Color.positive,
                textTransform: 'capitalize',
                lineHeight: 1.71,
                letterSpacing: '-0.5px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Contact Provider
            </Button>
          </RenderIf>
          <RenderIf value={isMyOwnService}>
            <MuiAppThemeBtnComponent
              onClick={() => navigate(`/account/manage-listing/edit/${serviceId}`)}
              type='button'
              widthSize='100%'
              heightSize='44px'
              style={{
                background: Color.priBlue,
                borderRadius: '2px',
                color: Color.priWhite,
                lineHeight: 1.71,
                letterSpacing: '-0.5px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              value={'Edit service'}
            />
          </RenderIf>
        </Box>
      </Box>
    );
  }

  if (isEmpty(companyServices)) {
    return (
      <Box className='Package' sx={{ alignItems: 'center', justifyContent: 'center', height: '45em' }}>
        <EmptyUI text={'No Packages Available'} />
      </Box>
    );
  }

  return (
    <Box className='Package'>
      <PackagesOverviewLoading />
    </Box>
  );
};
