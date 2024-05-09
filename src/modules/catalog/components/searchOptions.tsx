import React, { useCallback, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import DropDownMenuComponent from '../../../common/components/dropdown-menu-component';
import useQueryParams from '../../../common/utils/hooks/useQueryParams';
import { IMenuItems } from '../../../common/interface';
import { Color } from '../../../theme';
import { RangeDropDownMenuComponent } from '../../../common/components/dropdown-menu-component/dropdown-menu.component';
import { OptionsContainer } from '../search/component/searchResult.styles';
import { RenderIf } from '../../../common/components';
import { paymentType } from '@/common/interface/service-interface.ts';
import { useGetCategoriesQuery } from '@/redux/apis/catalogApi.ts';

const SERVICES: IMenuItems[] = [
  { name: 'All', value: '' },
  // { name: 'One time payment', value: 'SINGLE' },
  { name: 'Milestone payment', value: paymentType.milestone },
  { name: 'Subscription payment', value: paymentType.subscription },
];

export const DELIVERY: IMenuItems[] = [
  { name: 'Within 1 -3 days', value: '3' },
  { name: 'Up to a week', value: '7' },
  { name: 'Up to 2 weeks', value: '14' },
  { name: 'Up to a month', value: '30' },
  { name: 'Anytime', value: '' },
];

interface IProps {
  isBudget?: boolean;
  isCategory?: boolean;
  isService?: boolean;
  isDelivery?: boolean;
}

/**
 * Main Catalog search filters
 */
function SearchOptions({ isCategory, isBudget, isService, isDelivery }: IProps) {
  const [params, setParams] = useQueryParams();
  const { data } = useGetCategoriesQuery({ filter: 'level||$eq||1' });

  const _categories: IMenuItems[] = useMemo(() => {
    return [{ name: 'All Categories', value: '' }].concat(data?.data.map((e) => ({ name: e.name, value: e.id })).reverse() ?? []);
  }, [data?.data]);

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

  return (
    <OptionsContainer sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <Box className={'options'} sx={{ flexDirection: { xs: 'column', md: 'row' }, width: { xs: '100%', md: 'unset' } }}>
        <RenderIf value={!!isCategory}>
          <DropDownMenuComponent
            label={'Category'}
            defaultSelectedItem={_categories.findIndex((e) => e.value === (params.get('cat') ?? ''))}
            menuItems={_categories}
            noTick
            noSelectionMode
            isDivider={false}
            onMenuItemClick={(item) => setParams('cat', item.value)}
            overideStyle={{
              width: { xs: '100%', md: 367 },
              borderRadius: '4px',
              '& .Mui-selected': {
                p: {
                  color: 'rgb(126, 126, 126)',
                  fontWeight: '400 !important',
                },
              },
            }}
          />
        </RenderIf>
        <RenderIf value={!!isService}>
          <DropDownMenuComponent
            label={'Service Options'}
            defaultSelectedItem={SERVICES.findIndex((e) => e.value === (params.get('ser') ?? ''))}
            menuItems={SERVICES}
            noTick
            noSelectionMode
            isDivider={false}
            onMenuItemClick={(item) => setParams('ser', item.value)}
            overideStyle={{
              width: { xs: '100%', md: 267 },
              borderRadius: '4px',
              '& .Mui-selected': {
                p: {
                  color: 'rgb(126, 126, 126)',
                  fontWeight: '400 !important',
                },
              },
            }}
          />
        </RenderIf>
        <RenderIf value={!!isBudget}>
          <RangeDropDownMenuComponent
            label={'Budget'}
            defaultMax={Number(params.get('maxP'))}
            defaultMin={Number(params.get('minP'))}
            overideStyle={{
              width: { xs: '100%', md: 240 },
              borderRadius: '4px',
            }}
            isApply
            onChange={(min, max) => {
              setParams('minP', min > 0 ? min.toString() : '');
              setParams('maxP', max > 0 ? max.toString() : '');
            }}
          />
        </RenderIf>
        <RenderIf value={!!isDelivery}>
          <DropDownMenuComponent
            label={'Delivery time'}
            isApplyOption
            defaultSelectedItem={DELIVERY.findIndex((e) => e.value === (params.get('dt') ?? ''))}
            menuItems={DELIVERY}
            isRadio
            noTick
            noSelectionMode
            overideStyle={{
              width: { xs: '100%', md: 200 },
              borderRadius: '4px',
            }}
            onMenuItemClick={(item) => setParams('dt', item.value)}
          />
        </RenderIf>
      </Box>
      {isChanged && (
        <Button
          sx={{
            ml: '20px',
            maxWidth: '135px',
            background: Color.priBlue,
            color: Color.priWhite,
            textTransform: 'initial',
            alignSelf: { xs: 'end', md: 'center' },
            '&:hover': { background: Color.priBlue },
          }}
          onClick={onClear}
        >
          Clear All
        </Button>
      )}
    </OptionsContainer>
  );
}

export default SearchOptions;
