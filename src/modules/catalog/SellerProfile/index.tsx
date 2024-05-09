// @flow
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { CatalogWrapper } from '../components/catalog-wrapper';
import { Box, Typography } from '@mui/material';
import { CompanyDetailsInfoComponent } from './company-details-info.component';
import { useLocation } from 'react-router-dom';
import { isNull, isUndefined } from 'lodash';
import { MessageSuccessBox } from '../components/message-success-box';
import { SellerProfileLoadingPage } from '../components/seller-profile-loading-page';
import { mediaUrlGenerator, showToast, ToastTypes } from '../../../common/utils';
import { useGetEntityInfoQuery, useGetServiceLiseQuery } from '../../../redux/apis/marketplace';
import { CatalogCard } from '../components/catalog-card';
import QuickChat from '../DetailOverview/serviceDetail.quickChat';
import ServiceReview from '../../reviews/src/service-review';
import EmptyUI from '../../../common/components/empty-ui.component';
import { useAppSelector } from '@/redux/hooks';
import { useGet4ServicesQuery } from '@/redux/apis/catalogApi.ts';

export const SellerProfile = () => {
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const { state, search } = useLocation() as any;
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const serviceId = query.get('serviceId') as string;
  const entityUid = location.pathname.split('/').slice(-1)[0];
  const {
    data,
    isLoading: isEntityLoading,
    error,
  } = useGetEntityInfoQuery({ entityId: state ? state.id : entityUid }, { skip: state ? !state.id : !entityUid });
  const { data: getServicesById, isLoading: isServiceLoading } = useGet4ServicesQuery({
    filter: `entity.id||$eq||${state ? state.id : entityUid}`,
    join: ['packages', 'entity.profile'],
  });

  useEffect(() => {
    if (!isUndefined(error)) {
      const message = error as any;
      showToast(message.error, ToastTypes.ERROR);
    }
  }, [error]);

  if (isEntityLoading || isServiceLoading) {
    return (
      <CatalogWrapper>
        <SellerProfileLoadingPage />
      </CatalogWrapper>
    );
  }

  if (isUndefined(data) || isUndefined(getServicesById)) {
    return (
      <CatalogWrapper>
        <EmptyUI text={'Seller not found'} />
      </CatalogWrapper>
    );
  }

  return (
    <CatalogWrapper>
      <>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <CompanyDetailsInfoComponent serviceId={serviceId} setOpenMessage={setOpenMessage} companyDetails={data?.data} />
          <Box
            sx={{
              marginLeft: { xs: '0px', md: '1.5em' },
              width: '100%',
              marginTop: { xs: '1em', md: '0px' },
              gap: '1.5em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ fontSize: '24px', fontWeight: '700' }}>{data?.data?.profile.detail.name}’s services</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
              {getServicesById?.data?.map((value: any, key: number) => {
                let logoUrl = '';
                if (!isUndefined(data?.data.profile.detail.logo) && !isNull(data?.data.profile.detail.logo)) {
                  logoUrl = mediaUrlGenerator(data?.data.profile.detail.logo);
                }
                return (
                  <CatalogCard
                    logo={logoUrl}
                    companyName={data?.data?.profile?.detail?.name}
                    key={key}
                    service={value}
                    isCatalog
                    index={key}
                  />
                );
              })}
            </Box>
            <ServiceReview />
          </Box>
        </Box>
        {/*{!openMessage || !(data as any).data.entity ? (*/}
        {/*  <></>*/}
        {/*) : (*/}
        {/*  <QuickChat*/}
        {/*    purchasingEntity={selectedEntity?.uid ?? ''}*/}
        {/*    salesEntity={(data as any).data.entity}*/}
        {/*    service={(data as any).data.entity['__services'] ? (data as any).data.entity['__services'][0] : { uid: '' }}*/}
        {/*    onClickClose={() => setOpenMessage(!openMessage)}*/}
        {/*  />*/}
        {/*)}*/}
        <MessageSuccessBox isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
      </>
    </CatalogWrapper>
  );
};
