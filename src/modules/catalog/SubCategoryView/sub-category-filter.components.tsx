// @flow

import React, { useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { styled } from '@mui/system';

import { BudgetPopup } from '../components/budget-popup';

import { DeliveryPopup } from '../components/delivery-popup';

import { Color } from '../../../theme';

import useSubCatagorySearch from '../../../common/utils/hooks/useSubCatagorySearch';

const FilterBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  minWidth: '7.5em',
  paddingInline: '1em',
  borderRadius: '2px',
  paddingBlock: '0.8em',
  cursor: 'pointer',
  border: '1px solid #EAEAEA',
}));

type Props = {
  setData: React.Dispatch<React.SetStateAction<any | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  code: string;
};

export const SubCategoryFilterComponents = ({ setIsLoading, code, setData }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);

  const { clearAllSubCategoryDetails, setMin, setMax, min, max, clearAll, setClearAll } = useSubCatagorySearch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setAnchorEl1(null);
  };
  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(anchorEl1 ? null : event.currentTarget);
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);

  return (
    <Stack direction='row' spacing={2} sx={{ marginBlock: '15px' }}>
      <Box>
        <FilterBox onClick={handleClick}>
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            {max > min && max > 0 ? `${min} - ${max} $SGD` : 'Budget'}
          </Typography>
          {open ? <IoIosArrowUp style={{ marginLeft: '5px' }} /> : <IoIosArrowDown style={{ marginLeft: '5px' }} />}
        </FilterBox>
        <BudgetPopup
          open={open}
          anchorEl={anchorEl}
          setMin={setMin}
          setAnchorEl={setAnchorEl}
          setMax={setMax}
          code={code}
          setData={setData}
          setIsLoading={setIsLoading}
        />
      </Box>
      <Box>
        <FilterBox onClick={handleClick1}>
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Delivery Time
          </Typography>
          {open1 ? <IoIosArrowUp style={{ marginLeft: '5px' }} /> : <IoIosArrowDown style={{ marginLeft: '5px' }} />}
        </FilterBox>
        <DeliveryPopup
          setClearAll={setClearAll}
          open={open1}
          anchorEl={anchorEl1}
          setAnchorEl={setAnchorEl1}
          code={code}
          setData={setData}
          setIsLoading={setIsLoading}
        />
      </Box>
      <Box>
        {(max > 0 || clearAll) && (
          <FilterBox sx={{ border: 'none' }} onClick={clearAllSubCategoryDetails}>
            <Typography sx={{ color: Color.priBlue, fontSize: '16px', fontWeight: '600', textTransform: 'capitalize' }}>
              Clear All
            </Typography>
          </FilterBox>
        )}
      </Box>
    </Stack>
  );
};
