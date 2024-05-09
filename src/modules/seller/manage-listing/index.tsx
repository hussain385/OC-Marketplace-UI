// @flow
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MainLayout from '../../../common/layout/main.layout';
import { EmptyListingComponent } from './component/empty-lisitng.component';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isEmpty, isUndefined } from 'lodash';
import { ShimmerCard } from '../../catalog/components/shimmer-card';
import ServiceCardComponent from './component/service-card.component';
import { ReactComponent as NewDoc } from '../../../assets/icons/new-document.svg';
import { useNavigate } from 'react-router-dom';
import { OMTabs } from '@/common/components/tabs/tabs.component';
import { OnTabChangeProps } from '@/common/components/tabs/tabs.interface';
import { SearchBoxComponent } from '@/common/components/search-box/search-box.component';
import DropdownFilter from '../../../common/components/forms/filter-search-form';
import { ICategories } from '@/common/interface';
import useCatalogPayload from '../../../common/utils/hooks/useCatalogPayload';
import RenderIf from '../../../common/components/render-if.component';
import { FooterComp } from '../common/footer-comp';
import { useGetServicesQuery } from '@/redux/apis/marketplace';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import SearchEmptyResult from '@/common/components/search-empty-result.component';
import { createNoResultFoundContext, createNoresultFoundLabel } from '@/common/utils/global_state.util';
import { resetCompanySetupData } from '@/redux/reducers/companySetupReducers';
import useQueryParams from '@/common/utils/hooks/useQueryParams';
import CreateNewServiceErrorComponent from '@/modules/seller/manage-listing/component/create-new-service-error.component';
import useScroll from '@/common/utils/hooks/useScroll';
import { IService } from '@/common/interface/service-interface.ts';
import queryBuilder from '@/common/utils/helpers/queryBuilder.ts';

export const ManageListing = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [serviceStatus, setServiceStatus] = useState<'asc' | 'desc' | 'ascending' | 'descending'>('asc');
  const { selectedEntity, selectedRole } = useAppSelector((state) => state.mainState.useInfo);
  const [services, setServices] = useState<IService[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCatalogIndex, setSelectedCatalogIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [createServiceError, setCreateServiceError] = useState<boolean>(false);

  const { data, isLoading } = useGetServicesQuery(
    queryBuilder((builder) =>
      builder
        .search({
          $and: [
            { 'entity.id': { $eq: selectedEntity?.uid } },
            ...(selectedCategory ? [{ 'categories.id': { $in: [selectedCategory] } }] : []),
            ...(searchText ? [{ name: { $contL: searchText } }] : []),
          ],
        })
        .setJoin(['entity.profile']),
    ),
  );
  const [_categories, setCategories] = React.useState<ICategories[]>([]);
  const { allCategories } = useCatalogPayload();
  const status = useMemo(() => selectedEntity?.status, [selectedEntity?.status]);
  const [, setNoResultFound] = createNoResultFoundContext();
  const [, setSearchKeywords] = createNoresultFoundLabel();
  const [params] = useQueryParams();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [tabIndex]);

  const onTabChangeHandle = (value: OnTabChangeProps) => {
    setTabIndex(value.index);
  };

  useScroll({ useEffectDep: [] });

  useEffect(() => {
    if (!isEmpty(allCategories)) {
      const setItems: ICategories[] = [];

      allCategories
        .filter((category) => category.level === 1)
        .map((category) => {
          setItems.push({ uid: category.id as string, name: category.name as string });
        });
      setItems.push({ uid: '0', name: 'All Categories' });
      setItems.reverse();

      setCategories(setItems);
    }
  }, [allCategories]);

  const addNewPackage = async () => {
    if (status === 'VERIFIED') {
      dispatch(resetCompanySetupData());
      navigate('/account/manage-listing/form');
    } else {
      setCreateServiceError(true);
    }
  };

  useEffect(() => {
    if (!isUndefined(data)) {
      if (tabIndex === 0) {
        setServices(
          data.data.filter((service) => {
            if (service.status === 'ACTIVE') {
              return service;
            }
          }),
        );
      } else if (tabIndex === 1) {
        setServices(
          data.data.filter((service) => {
            if (service.status === 'DISABLED' && Number(service.step) >= 4) {
              return service;
            }
          }),
        );
      } else {
        setServices(
          data.data.filter((service) => {
            if (service.status === 'DISABLED' && Number(service.step) < 4) {
              return service;
            }
          }),
        );
      }
    }
  }, [data, tabIndex]);

  useEffect(() => {
    if (data) {
      if (searchText === '') {
        setNoResultFound(false);
      } else {
        setNoResultFound(true);
        setSearchKeywords(searchText);
      }
    }
  }, [data, searchText, services, setNoResultFound, setSearchKeywords]);

  useEffect(() => {
    if (params.get('tab')) {
      setTabIndex(Number(params.get('tab')));
    }
  }, [params.get('tab')]);

  return (
    <MainLayout pageTitle='Manage listing' breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Manage listing' }]}>
      <RenderIf value={!!selectedRole?.entityType?.includes(companyProfiles.business)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: { xs: '0px 16px', md: '0px' },
          }}
        >
          <Typography>Entity name:</Typography>
          <Typography style={{ fontWeight: '700' }}>{selectedEntity?.profile?.detail?.name}</Typography>
          {status === 'VERIFIED' ? (
            <img alt='verified' src={require('../../../assets/icons/verified.svg').default} />
          ) : (
            <Box className='pending-status' style={{ margin: '0px' }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '600',
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  lineHeight: '1.33',
                  letterSpacing: '-0.5px',
                  textAlign: 'center',
                  color: '#ff6a68',
                }}
              >
                Pending verification
              </Typography>
            </Box>
          )}
        </Box>
      </RenderIf>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBlock: '1em',
          flexDirection: { xs: 'column', md: 'row' },
          padding: { xs: '0px 16px', md: '0px' },
        }}
      >
        <OMTabs activeTab={tabIndex} tabs={['Active', 'Inactive', 'Draft']} onTabChange={onTabChangeHandle} />
        <SearchBoxComponent
          onClear={() => {
            setSearchText('');
          }}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setSearchText(event.target.value);
          }}
          placeholder='Search for service'
          styleOverrides={{ width: { xs: '100%', md: '320px' }, marginTop: '1em' }}
        />
      </Box>
      <Box sx={{ width: '100%', marginBottom: '1em', padding: { xs: '0px 16px', md: '0px' } }}>
        <DropdownFilter
          managelisting={true}
          width={367}
          label='Category'
          objectArraItems={_categories}
          handlerClick={(i, value) => {
            setSelectedCatalogIndex(i);
            setSelectedCategory(value === '0' ? '' : value);
          }}
          selectedIndex={selectedCatalogIndex}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        {isUndefined(data) || isLoading ? (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1em',
              justifyContent: 'center',
              padding: { xs: '0px 16px', md: '0px' },
            }}
          >
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
          </Box>
        ) : !isEmpty(services) ? (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1em',
              justifyContent: { xs: 'center', md: 'flex-start' },
              padding: { xs: '0px 16px', md: '0px' },
            }}
          >
            {services.map((service, key: number) => {
              return (
                <ServiceCardComponent
                  serviceStatus={serviceStatus}
                  setServiceStatus={setServiceStatus}
                  key={key}
                  service={service}
                />
              );
            })}
            <Box
              onClick={addNewPackage}
              sx={{
                width: { xs: '100%', md: '21em' },
                height: '25.5em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                borderRadius: '5px',
                gap: '10px',
                marginBlock: '1em',
                cursor: 'pointer',
              }}
            >
              <NewDoc />
              <Typography sx={{ fontSize: '16px', color: '#2752E7', fontWeight: '700' }}>Create a new service</Typography>
            </Box>
          </Box>
        ) : searchText !== '' ? (
          <Box sx={{ margin: 'auto' }}>
            <SearchEmptyResult />
          </Box>
        ) : (
          <Box sx={{ width: '100%' }}>
            <EmptyListingComponent />
          </Box>
        )}
      </Box>
      <CreateNewServiceErrorComponent onCloseHandle={() => setCreateServiceError(false)} open={createServiceError} />
      <Box sx={{ position: 'absolute', bottom: { xs: '-10em', md: '-5em' }, width: '100%' }}>
        <FooterComp />
      </Box>
    </MainLayout>
  );
};
