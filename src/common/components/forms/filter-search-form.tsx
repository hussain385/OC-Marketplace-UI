/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, FormControl, Menu, MenuItem, PopoverProps, RadioGroup, Typography } from '@mui/material';
import { isEmpty, isUndefined } from 'lodash';
import React from 'react';
// import { StateOrderNameDropdownGlobal, StateProviderNameDropdownGlobal } from "../../../modules/buyer/order/component/order-list.component";
import { Color } from '../../../theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import RadioOptionButton from './option-radio.component';

import {
  createBudgetMin,
  createBudgetMax,
  createDeliverTime,
  createNoResultFoundContext,
  getValueDefaultDeliveryOptionContext,
} from '../../utils/global_state.util';
import { ICategories } from '../../interface';
import { getUniqueArray } from '../../utils';

type ItemsProps = {
  label: string;
  value: string;
  options?: object;
};

interface DropdownFilterProps {
  isCheckBoxOn?: boolean;
  managelisting?: boolean;
  isRange?: boolean;
  width: string | number;
  label: string;
  items?: ItemsProps[];
  objectArraItems?: ICategories[];
  menuItemCustomStyle?: React.CSSProperties;
  handlerClick?: (
    i: number,
    value: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>,
    options?: object,
  ) => void;
  minRef?: React.MutableRefObject<HTMLInputElement | null>;
  maxRef?: React.MutableRefObject<HTMLInputElement | null>;
  selectedIndex?: number;
}

const DropdownFilter = ({
  isCheckBoxOn,
  isRange,
  width,
  label,
  items = [],
  menuItemCustomStyle,
  objectArraItems,
  handlerClick,
  managelisting,
  minRef,
  maxRef,
  selectedIndex,
}: DropdownFilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | number>(null);

  // const [orderName] = StateOrderNameDropdownGlobal();
  // const [providerName] = StateProviderNameDropdownGlobal();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const uniqueItem = getUniqueArray(items, 'label');

  const [getValue, setValue] = getValueDefaultDeliveryOptionContext();

  const [minRange] = createBudgetMin();
  const [maxRange] = createBudgetMax();

  // eslint-disable-next-line no-unused-vars
  const [deliveryTime] = createDeliverTime();

  const [noResultFound] = createNoResultFoundContext();

  return (
    <Box>
      <Button
        sx={{ color: Color.pureBlack, textTransform: 'initial' }}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Typography>
          {label}:{' '}
          {managelisting &&
            (objectArraItems && !isEmpty(objectArraItems) ? objectArraItems[selectedIndex ? selectedIndex : 0].name : '')}
        </Typography>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        PaperProps={{
          style: {
            width: width,
            borderRadius: 4,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            ...menuItemCustomStyle,
          },
        }}
        anchorEl={anchorEl as PopoverProps['anchorEl']}
        open={open}
        onClose={handleClose}
      >
        {!isEmpty(items) && !isUndefined(isCheckBoxOn) && isUndefined(isRange) && (
          <FormControl sx={{ p: '16px' }} variant='standard'>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              value={getValue}
              onChange={(event) => {
                setValue((event.target as HTMLInputElement).value);
                // onDeliverSelected((event.target as HTMLInputElement).value as string);
              }}
            >
              {uniqueItem?.map((list, i) => (
                <RadioOptionButton
                  checked={isEmpty(getValue) && i === 4 ? true : undefined}
                  customStyles={true}
                  key={i}
                  value={list.value}
                  label={list.label}
                />
              ))}
            </RadioGroup>
            <Box sx={{ my: '8px', display: noResultFound === true ? 'block' : 'none' }}>
              <Typography sx={{ color: Color.negative, fontWeight: 700, fontSize: '12px', letterSpacing: '-0.03em' }}>
                No result found
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                sx={{
                  color: Color.textHint,
                  background: 'transparent',
                  width: 'auto',
                  padding: '5px 10px 5px 10px',
                  height: '34px',
                  textTransform: 'initial',
                  fontWeight: 600,
                  fotnSize: '14px',
                  letterSpacing: '-0.03em',
                }}
                // onClick={() => clearAllFilteredQuery(setAnchorEl)}
              >
                Clear All
              </Button>
              <Button
                sx={{
                  color: Color.priWhite,
                  background: Color.priBlue,
                  width: 'auto',
                  padding: '5px 10px 5px 10px',
                  height: '34px',
                  textTransform: 'initial',
                  fontWeight: 600,
                  fotnSize: '14px',
                  letterSpacing: '-0.03em',
                  '&:hover': {
                    background: Color.priBlue,
                  },
                }}
                // onClick={() => onDeliverTimeQuery(deliveryTime as string, setAnchorEl)}
              >
                Apply
              </Button>
            </Box>
          </FormControl>
        )}

        {isEmpty(items) && !isUndefined(isRange) && isUndefined(isCheckBoxOn) && (
          <Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.03em', lineHeight: '125%' }}>
                Min
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.03em', lineHeight: '125%' }}>
                Max
              </Typography>
              <Box
                type='number'
                ref={minRef}
                // onChange={handleMinRange}
                component='input'
                sx={{
                  width: '96px',
                  height: '40px',
                  mt: '10px',
                  outline: 'transparent',
                  border: '1px solid #eaeaea',
                  textAlign: 'center',
                }}
                defaultValue={minRange !== 0 && maxRange !== 0 ? minRange : ''}
              ></Box>
              <Box
                type='number'
                ref={maxRef}
                // onChange={handleMaxRange}
                component='input'
                sx={{
                  width: '96px',
                  height: '40px',
                  mt: '10px',
                  outline: 'transparent',
                  border: '1px solid #eaeaea',
                  textAlign: 'center',
                }}
                defaultValue={minRange !== 0 && maxRange !== 0 ? maxRange : ''}
              ></Box>
            </Box>
            <Box sx={{ mt: '8px', display: noResultFound === true ? 'block' : 'none', paddingInline: '16px' }}>
              <Typography sx={{ color: Color.negative, fontWeight: 700, fontSize: '12px', letterSpacing: '-0.03em' }}>
                No result found
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
              <Button
                sx={{
                  color: Color.textHint,
                  background: 'transparent',
                  width: 'auto',
                  padding: '5px 10px 5px 10px',
                  height: '34px',
                  textTransform: 'initial',
                  fontWeight: 600,
                  fotnSize: '14px',
                  letterSpacing: '-0.03em',
                }}
                // onClick={() => clearAllFilteredQuery(setAnchorEl)}
              >
                Clear All
              </Button>
              <Button
                sx={{
                  color: Color.priWhite,
                  background: Color.priBlue,
                  width: 'auto',
                  padding: '5px 10px 5px 10px',
                  height: '34px',
                  textTransform: 'initial',
                  fontWeight: 600,
                  fotnSize: '14px',
                  letterSpacing: '-0.03em',
                  '&:hover': {
                    background: Color.priBlue,
                  },
                }}
                // onClick={() => onBugetRangeQuery(minRange, maxRange, setAnchorEl)}
              >
                Apply
              </Button>
            </Box>
          </Box>
        )}

        {!isEmpty(items) && isUndefined(objectArraItems) && isUndefined(isCheckBoxOn) && isUndefined(isRange) && (
          <div>
            <Box sx={{ mt: '8px', display: noResultFound === true ? 'block' : 'none', paddingInline: '16px' }}>
              <Typography sx={{ color: Color.negative, fontWeight: 700, fontSize: '12px', letterSpacing: '-0.03em' }}>
                No result found
              </Typography>
            </Box>
            {uniqueItem?.map((list, i) => (
              <MenuItem
                selected={false}
                sx={{
                  color: i === 0 ? Color.textHint : Color.textBlack,
                  background: i === selectedIndex && selectedIndex !== 0 ? Color.bgGreyLight : 'initial',
                }}
                key={i}
                onClick={() => handlerClick && handlerClick(i as number, list.value as string, setAnchorEl)}
              >
                {list.label}
              </MenuItem>
            ))}
          </div>
        )}

        {!isEmpty(objectArraItems) &&
          isEmpty(items) &&
          isUndefined(isCheckBoxOn) &&
          isUndefined(isRange) &&
          objectArraItems?.map((value, i) => (
            <MenuItem
              selected={false}
              sx={{
                color: i === 0 ? Color.textHint : Color.textBlack,
                background: i === selectedIndex && selectedIndex !== 0 ? Color.bgGreyLight : 'initial',
              }}
              key={i}
              onClick={() => {
                if (managelisting && handlerClick) {
                  handlerClick(i as number, value.uid, setAnchorEl);
                } else {
                  // handleCategoriesQuery(i as number, value.name as string, value.uid as string, setAnchorEl).then(null);
                }
              }}
            >
              {value.name}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default DropdownFilter;
