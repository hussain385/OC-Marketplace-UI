// @flow
import React, { useMemo } from 'react';

import { isEmpty, isNull, isUndefined } from 'lodash';

import { Box, Typography } from '@mui/material';

import { CatalogCard } from '../components/catalog-card';

import { CatalogWrapper } from '../components/catalog-wrapper';

import { ShimmerCard } from '../components/shimmer-card';

import { SortServicesComponent } from './sort-services.component';

import { mediaUrlGenerator } from '../../../common/utils';

import EmptyUI from '../../../common/components/empty-ui.component';

import { createNoResultFoundContext, createSubFilterDefault } from '../../../common/utils/global_state.util';

import useCatalogPayload from '../../../common/utils/hooks/useCatalogPayload';

import SearchEmptyResult from '../../../common/components/search-empty-result.component';

import { useGetServicesQuery } from '../../../redux/apis/marketplace';
import useQueryParams from '../../../common/utils/hooks/useQueryParams';
import DropDownMenuComponent from '../../../common/components/dropdown-menu-component';
import { IMenuItems } from '../../../common/interface';
import SearchOptions from '../components/searchOptions';
import { useParams } from '@/router.ts';
import { useGetCategoriesQuery } from '@/redux/apis/catalogApi.ts';
import queryBuilder from '@/common/utils/helpers/queryBuilder.ts';

const SORT: IMenuItems[] = [
  { name: 'New Arrivals', value: '1', object: {} },
  { name: 'Lowest to highest', value: '2', object: { field: 'minPrice', order: 'ASC' } },
  { name: 'Highest to lowest', value: '3', object: { field: 'minPrice', order: 'DESC' } },
];

const SHOW: IMenuItems[] = [
  { name: '16', value: '' },
  { name: '24', value: '24' },
  { name: '48', value: '48' },
];

export const SubCategoryListView = () => {
  const { uid } = useParams('/catalog/sub-category/:uid');
  const [params, setParams] = useQueryParams();

  const { catalogSubServiceDetails } = useCatalogPayload();
  const [filterSubCatagoryActive] = createSubFilterDefault();
  const [noResultFound] = createNoResultFoundContext();

  /**
   * Get Category
   */
  const { data: category } = useGetCategoriesQuery(
    {
      filter: [`id||$eq||${uid}`],
    },
    { selectFromResult: (e) => ({ data: e.data?.data?.[0] }) },
  );

  const { min, max } = useMemo(() => {
    return {
      min: Number(params.get('minP')),
      max: Number(params.get('maxP')),
    };
  }, [params]);

  /**
   * Delivery Time
   */
  const deliveryTime = useMemo(() => params.get('dt'), [params]);

  /**
   * Get Services
   */
  const { data, isLoading } = useGetServicesQuery(
    queryBuilder((builder) =>
      builder
        .search({
          $and: [
            // Filter by Category id
            { 'categories.id': { $eq: uid } },

            // Filter by Completed service
            { status: { $eq: 'ACTIVE' } },

            // Filter by Min/Max Price
            ...(min > 0 || max > 0 ? [{ minPrice: { $gte: min > 0 ? min : undefined, $lte: max > 0 ? max : undefined } }] : []),

            // Filter by delivery time
            ...(deliveryTime ? [{ minDeliveryDays: { $lte: deliveryTime } }] : []),
          ],
        })
        .sortBy(JSON.parse(params.get('sort') ?? '{"field":"createdAt","order":"DESC"}'))
        .setJoin(['entity.profile'])
        .setLimit(+(params.get('limit') ?? 16))
        .setPage(+(params.get('page') ?? 1)),
    ),
  );

  if (isEmpty(data) || isLoading) {
    return (
      <CatalogWrapper>
        <>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '24px !important',
            }}
          >
            {category?.name}
          </Typography>
          <Typography>{category?.description}</Typography>
          {/*<SubCategoryFilterComponents code={uid as string} setIsLoading={setIsLoading} setData={setData} />*/}
          <SortServicesComponent quantity={0} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[...Array(8).keys()].map((value) => (
              <ShimmerCard key={value} />
            ))}
          </Box>
        </>
      </CatalogWrapper>
    );
  }

  if (isEmpty(data?.data)) {
    return (
      <CatalogWrapper>
        <>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '24px !important',
            }}
          >
            {category?.name}
          </Typography>
          <Typography>{isUndefined(category?.description) ? '' : category?.description}</Typography>
          {/*<SubCategoryFilterComponents code={uid as string} setIsLoading={setIsLoading} setData={setData} />*/}
          <SortServicesComponent quantity={0} />
          <Box sx={{ display: 'flex', alignItems: 'center', height: '50vh', justifyContent: 'center' }}>
            <EmptyUI text='No services yet.' />
          </Box>
        </>
      </CatalogWrapper>
    );
  }

  return (
    <CatalogWrapper>
      <>
        <Typography
          sx={{
            fontWeight: '700',
            fontSize: '24px !important',
          }}
        >
          {category?.name}
        </Typography>
        {/*<Typography>{data[0].attributes.subcategory.data.attributes.description}</Typography>*/}
        {/*<SubCategoryFilterComponents code={uid as string} setIsLoading={setIsLoading} setData={setData} />*/}
        <SearchOptions isBudget isDelivery />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>{data?.total ?? 0} services available</Typography>
          <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <DropDownMenuComponent
              label={'Show'}
              defaultSelectedItem={SORT.findIndex((e) => e.value === (params.get('limit') ?? ''))}
              overideStyle={{ borderRadius: '4px' }}
              menuItems={SHOW}
              noTick
              onMenuItemClick={(item) => setParams('limit', item.value)}
              buttonOverrideStyle={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
            <DropDownMenuComponent
              label={'Sort by'}
              defaultSelectedItem={SORT.findIndex((e) => JSON.stringify(e.object) === (params.get('sort') ?? ''))}
              overideStyle={{ borderRadius: '4px' }}
              menuItems={SORT}
              noTick
              onMenuItemClick={(item) => setParams('sort', isEmpty(item.object) ? '' : JSON.stringify(item.object))}
              buttonOverrideStyle={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
          </Box>
        </Box>
        {!filterSubCatagoryActive && isEmpty(catalogSubServiceDetails) && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: '0.5em', md: '1em' } }}>
            {data?.data.map((service, key: number) => {
              let logoUrl = '';
              if (service.entity?.profile.detail.logo) {
                logoUrl = mediaUrlGenerator(service.entity?.profile.detail.logo);
              }

              return (
                <CatalogCard
                  key={service?.id ?? key}
                  service={service}
                  logo={logoUrl}
                  index={key}
                  companyName={service.entity?.profile?.detail?.name}
                />
              );
            })}
          </Box>
        )}
        {!isEmpty(catalogSubServiceDetails) && !noResultFound && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: '0.5em', md: '1em' } }}>
            {catalogSubServiceDetails.map((service: any, key: number) => {
              let logoUrl = '';
              if (!isUndefined(service['__entity']['__logo']) && !isNull(service['__entity']['__logo'])) {
                logoUrl = mediaUrlGenerator(service['__entity']['__logo']);
              }
              return (
                <CatalogCard
                  key={key}
                  service={service}
                  logo={logoUrl}
                  index={key}
                  companyName={service['__entity']?.profile?.detail?.name}
                />
              );
            })}
          </Box>
        )}

        {noResultFound && filterSubCatagoryActive && <SearchEmptyResult />}
      </>
    </CatalogWrapper>
  );
};
