// @flow
import React from 'react';

import { Box, Typography } from '@mui/material';

import { IMenuItems } from '../../../common/interface';

import { useMediaBreakpoint } from '../../../common/components';

import DropDownMenu from '../../../common/components/dropdown-menu-component';
import useSubCatagorySearch from '../../../common/utils/hooks/useSubCatagorySearch';
import { createSubcategoryBudgetRange } from '../../../common/utils/global_state.util';

type SortServicesProptypes = {
  quantity: number;
};

const showItems: IMenuItems[] = [
  {
    name: '16',
    value: '16',
  },
  {
    name: '24',
    value: '24',
  },
  {
    name: '48',
    value: '48',
  },
];

const sortBy: IMenuItems[] = [
  {
    name: 'Newest',
    value: 'newest',
  },
  {
    name: 'Price low to high',
    value: 'low',
  },
  {
    name: 'Price high to low',
    value: 'high',
  },
];

const menuLabel = { fontWeight: '600', fontSize: '16px', color: '#1D2130' };
const menu = { border: '1px solid #C4C4C4', marginLeft: '10px', borderRadius: '2px' };

export const SortServicesComponent = ({ quantity }: SortServicesProptypes) => {
  const { xs } = useMediaBreakpoint();
  const [budgetRange] = createSubcategoryBudgetRange();
  const [menuItem, setMenuItem] = React.useState<any>();
  const { onHandlerRecommended, onHandlerPageSearch } = useSubCatagorySearch();

  React.useEffect(() => {
    if (menuItem) {
      onHandlerRecommended(menuItem, budgetRange);
    }
  }, [menuItem]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-end', md: 'center' } }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '16px',
          height: '2em',
          fontWeight: '600',
          color: '#7E7E7E',
          border: { xs: '1px solid #EAEAEA', md: 'none' },
          paddingInline: { xs: '1em', md: 0 },
          borderRadius: { xs: '20em', md: 0 },
          marginBottom: { xs: '1.7%', md: 0 },
        }}
      >
        {xs ? `${quantity} services` : `${quantity} services available`}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-end', md: 'center' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: '1em',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={menuLabel}>Show:</Typography>
          <Box sx={menu}>
            <DropDownMenu onMenuItemClick={onHandlerPageSearch} defaultSelectedItem={0} menuItems={showItems} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={menuLabel}>Sort by:</Typography>
          <Box sx={menu}>
            <DropDownMenu
              onMenuItemClick={(item) => {
                setMenuItem(item);
              }}
              defaultSelectedItem={0}
              menuItems={sortBy}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
