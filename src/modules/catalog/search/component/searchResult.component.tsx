import React, { useCallback, useMemo } from 'react';
import { useGetServicesQuery } from '@/redux/apis/marketplace.ts';
import CircularLoading from '../../../../common/components/circular-loading';
import Pagination from '../../../../common/components/pagination';
import { RenderIf } from '../../../../common/components';
import { CatalogContainer, MainCatalogsContainer } from './searchResult.styles';
import useQueryParams from '../../../../common/utils/hooks/useQueryParams';
import { Box, Button, Typography } from '@mui/material';
import DropDownMenuComponent from '../../../../common/components/dropdown-menu-component';
import { IMenuItems } from '@/common/interface';
import { useCatalogSearchOptions } from '@/common/utils/hooks/useCatalogSearch.tsx';
import SearchOptions from '../../components/searchOptions';
import { isEmpty } from 'lodash';
import { ReactComponent as EmptyResultImage } from '../../../../assets/catalog-icons/empty-results.svg';
import { Color } from '@/theme.ts';
import { CatalogCard } from '@/modules/catalog/components/catalog-card.tsx';
import { mediaUrlGenerator } from '@/common/utils';

const SORT: IMenuItems[] = [
  { name: 'New Arrivals', value: '1', object: {} },
  { name: 'Lowest to highest', value: '2', object: { field: 'minPrice', order: 'ASC' } },
  { name: 'Highest to lowest', value: '3', object: { field: 'minPrice', order: 'DESC' } },
];

function SearchResultComponent() {
  const [params, setParams] = useQueryParams();
  const options = useCatalogSearchOptions();
  const { data, isLoading, isError, error } = useGetServicesQuery(options);

  /**
   * Check if default search param is changed
   */
  const isChanged: boolean = useMemo(() => {
    return !!params.get('cat') || !!params.get('ser') || !!params.get('minP') || !!params.get('maxP') || !!params.get('dt');
  }, [params]);

  /**
   * Clear the params when click on clear all
   */
  const onClear = useCallback(() => {
    setParams('cat', '');
    setParams('ser', '');
    setParams('dt', '');
    setParams('minP', '');
    setParams('maxP', '');
  }, [setParams]);

  if (isLoading) {
    return <CircularLoading />;
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <MainCatalogsContainer sx={{ px: { xs: '10px', md: '40px' } }}>
      <SearchOptions isCategory isBudget isDelivery isService />

      <Box className={'sort-container'}>
        <Typography>{data?.total ?? 0} services available</Typography>
        <DropDownMenuComponent
          label={'Sort'}
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

      {data?.data && data?.data.length > 0 ? (
        <CatalogContainer>
          {data?.data.map((service, index) => (
            <CatalogCard
              isCatalog
              key={service.id}
              service={service}
              logo={service.entity?.profile.detail.logo ? mediaUrlGenerator(service.entity?.profile.detail.logo) : undefined}
              companyName={service.entity?.profile.detail.name}
            />
          ))}
        </CatalogContainer>
      ) : (
        <Box className={'empty-container'}>
          <EmptyResultImage />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '32px',
              letterSpacing: '-0.03em',
              maxWidth: '36ch',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {isChanged ? "We couldn't find any match for your search" : "We couldn't find any matches for"} <br />
            {isChanged ? (
              <Button
                sx={{
                  mt: '6px',
                  maxWidth: '135px',
                  width: '100%',
                  background: Color.priBlue,
                  color: Color.priWhite,
                  textTransform: 'initial',
                  '&:hover': { background: Color.priBlue },
                }}
                onClick={onClear}
              >
                Clear All
              </Button>
            ) : (
              <span style={{ color: Color.priBlue }}>
                &apos;
                {params.get('s') ? (
                  <p
                    style={{
                      maxWidth: '35ch',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: 0,
                      display: 'table-cell',
                    }}
                  >
                    {params.get('s')}
                  </p>
                ) : (
                  <span>%$^%$^%$</span>
                )}
                &apos;
              </span>
            )}
          </Typography>
          {!isChanged && (
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '32px',
                letterSpacing: '-0.03em',
                maxWidth: '432px',
                color: Color.textHint,
              }}
            >
              Check your search for any typos or try a different search term
            </Typography>
          )}
        </Box>
      )}

      <RenderIf value={(data?.pageCount ?? 0) > 1}>
        <Box className={'pagination-container'}>
          <Pagination
            options={{
              defaultPage: +(params.get('page') ?? 1),
              count: data?.pageCount,
              onChange: (event, page) => setParams('page', page.toString()),
            }}
          />
        </Box>
      </RenderIf>
    </MainCatalogsContainer>
  );
}

export default SearchResultComponent;
