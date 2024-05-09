// @flow
import React, { useMemo } from 'react';

import { Box, Typography } from '@mui/material';

import { CatalogCard } from '../components/catalog-card';

import { CategoryButton } from '../components/category-button';

import { SectionHeader } from '../components/section-header';

import { CatalogWrapper } from '../components/catalog-wrapper';

import { isEmpty, isUndefined } from 'lodash';

import { CategoryLoadingPage } from '../components/category-loading-page';

import EmptyUI from '../../../common/components/empty-ui.component';

import { useAppSelector } from '../../../redux/hooks';

import { useGetCategoriesQuery } from '../../../redux/apis/catalogApi';

import { mediaUrlGenerator } from '../../../common/utils';
import { useGetServicesQuery } from '@/redux/apis/marketplace.ts';
import queryBuilder from '@/common/utils/helpers/queryBuilder.ts';

export const CategoryListView = () => {
  const { category, allCategories } = useAppSelector((state) => state.mainState.buyerCatalog);
  const { data: categories, isLoading } = useGetCategoriesQuery({
    filter: ['level||$eq||1', `id||$eq||${isEmpty(category.id) ? allCategories[0].id : category.id}`],
    join: ['childs'],
  });

  const { data: services } = useGetServicesQuery(
    queryBuilder((builder) =>
      builder
        .search({
          $and: [
            { 'categories.id': { $in: categories?.data?.[0].childs?.map((c) => c.id) ?? [] } },
            { status: { $eq: 'ACTIVE' } },
          ],
        })
        .setJoin(['entity.profile']),
    ),
  );

  /**
   * All the sub categories
   */
  const allSubCategories = useMemo(() => categories?.data?.[0].childs ?? [], [categories?.data]);

  if (isLoading) {
    return (
      <CatalogWrapper>
        <>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '24px !important',
            }}
          >
            Browse by category
          </Typography>
          <CategoryLoadingPage />
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
          Browse by category
        </Typography>
        <Box sx={{ marginBlock: '15px', flexWrap: 'wrap', display: 'flex' }}>
          {!isEmpty(allSubCategories) &&
            allSubCategories.map((subCategory, key: number) => (
              <CategoryButton
                key={key}
                title={subCategory.name}
                fileName={subCategory.name.split(' ')[0].concat('.png')}
                id={subCategory.id}
                description={subCategory.description}
              />
            ))}
        </Box>
        {!isEmpty(allSubCategories) &&
          allSubCategories.map((subCategory, key: number) => {
            const servicesFilter =
              services?.data.filter((service) => service.categories.some((s) => s.id === subCategory.id)) ?? [];

            if (!isUndefined(servicesFilter)) {
              return (
                <div key={key}>
                  <SectionHeader
                    title={subCategory.name}
                    id={subCategory.id}
                    description={subCategory.description}
                    isServices={servicesFilter.length}
                  />
                  {isEmpty(servicesFilter) ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '20vh', justifyContent: 'center' }}>
                      <EmptyUI text='No services yet.' />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        py: '8px',
                        gap: { xs: '0.5em', md: '1em' },
                        justifyContent: {
                          sm: undefined,
                          md: servicesFilter.length < 4 ? 'flex-start' : 'space-between',
                        },
                      }}
                    >
                      {servicesFilter.map((details, key: number) => {
                        let logoUrl = '';
                        if (details.entity?.profile.detail.logo) {
                          logoUrl = mediaUrlGenerator(details.entity?.profile.detail.logo);
                        }
                        return (
                          <CatalogCard
                            key={key}
                            service={details}
                            logo={logoUrl}
                            index={key}
                            companyName={details.entity?.profile?.detail?.name}
                          />
                        );
                      })}
                    </Box>
                  )}
                </div>
              );
            }
          })}
      </>
    </CatalogWrapper>
  );
};
