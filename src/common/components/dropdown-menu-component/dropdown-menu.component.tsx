/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';

import { Box, Button, Checkbox, Divider, Input, Menu, MenuItem, RadioGroup, SxProps, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import './dropdown-menu.style.css';

import { MENUICON_POSITION } from '.';

import { isNil, isUndefined } from 'lodash';

import { IMenuItems } from '../../interface';

import { Color } from '../../../theme';

import RenderIf from '../render-if.component';

import useMediaBreakpoint from '../breakpoint';

import ExpandLess from '@mui/icons-material/ExpandLess';

import { useSearchParams } from 'react-router-dom';
import RadioOptionButton from '../forms/option-radio.component';
import { useSetState } from 'react-use';

type Props = {
  label?: string;
  menuItems: IMenuItems[];
  defaultSelectedItem?: number;
  iconPosition?: MENUICON_POSITION;
  icon?: React.ReactNode;
  onMenuItemClick?: (item: IMenuItems, label?: string) => void;
  noSelectionMode?: boolean;
  overideStyle?: SxProps;
  overideFilterStyle?: React.CSSProperties;
  buttonOverrideStyle?: SxProps;
  overrideNameStyle?: SxProps;
  overrideLabelStyle?: SxProps;
  noTick?: boolean;
  reset?: boolean;
  resetParam?: string;
  isDivider?: boolean;
  isRadio?: boolean;
  isApplyOption?: boolean;
  customMenuList?: (onChange: (index: number) => void) => React.ReactNode;
  isActive?: boolean;
  isCheckBox?: boolean;
  isFilterApplied?: boolean;
  onMenuItemMultiSelect?: (items: IMenuItems[]) => void;
  customClassName?: string;
};

type MenuListProps = {
  imgStyle?: React.CSSProperties;
};

export const DropDownMenuComponent = ({
  defaultSelectedItem,
  menuItems,
  label,
  icon,
  noSelectionMode,
  noTick,
  reset,
  buttonOverrideStyle,
  overrideLabelStyle,
  overideStyle,
  resetParam,
  overrideNameStyle,
  overideFilterStyle,
  onMenuItemClick,
  isDivider = true,
  isRadio = false,
  isApplyOption = false,
  isActive = false,
  isCheckBox = false,
  isFilterApplied,
  onMenuItemMultiSelect,
  customClassName,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    isNil(defaultSelectedItem) || defaultSelectedItem < 0 ? 0 : defaultSelectedItem,
  );

  const [multipleChecked, setMultipleChecked] = useState<boolean[]>(new Array(menuItems.length).fill(false));

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onMenuItemClickHandle = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      setAnchorEl(null);
      const selectedItem: IMenuItems = menuItems[index];
      if (label === 'Permission') {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('Permission', selectedItem.value === 'all' ? '' : selectedItem.value);
        setSearchParams(newSearchParams);
      } else if (label === 'Position') {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('Position', selectedItem.value === 'all' ? '' : selectedItem.value);
        setSearchParams(newSearchParams);
      }
      onMenuItemClick && onMenuItemClick(selectedItem, label);
    },
    [label, menuItems, onMenuItemClick, searchParams, setSearchParams],
  );

  const onCheckBoxClickHandle = useCallback(
    (position: number) => {
      const checked = multipleChecked.map((value, index) => (index === position ? !value : value));
      setMultipleChecked(checked);
    },
    [multipleChecked],
  );

  const onCheckboxApplyClick = useCallback(() => {
    const items: IMenuItems[] = [];
    multipleChecked.map((value, index) => {
      if (value) {
        items.push(menuItems[index]);
      }
    });
    setAnchorEl(null);
    onMenuItemMultiSelect && onMenuItemMultiSelect(items);
  }, [menuItems, multipleChecked, onMenuItemMultiSelect]);

  const { xs, sm, mdLg } = useMediaBreakpoint();

  useEffect(() => {
    setSelectedIndex(isNil(defaultSelectedItem) || defaultSelectedItem < 0 ? 0 : defaultSelectedItem);
  }, [defaultSelectedItem]);

  useEffect(() => {
    if (reset) {
      setSelectedIndex(isNil(defaultSelectedItem) || defaultSelectedItem < 0 ? 0 : defaultSelectedItem);
      setMultipleChecked(new Array(menuItems.length).fill(false));
      setSearchParams((prev) => {
        if (resetParam) {
          prev.delete(resetParam);
        }
        return prev;
      });
    }
  }, [reset, defaultSelectedItem, setSearchParams, resetParam, menuItems.length]);

  const MenuList = useCallback(
    (localProps: MenuListProps) => {
      const { imgStyle } = localProps;

      if (isRadio) {
        return (
          <Box p={'6px 16px'}>
            <RadioGroup
              value={menuItems[selectedIndex].value}
              onChange={(event, value) => {
                const index = menuItems.findIndex((e) => e.value === value);
                isApplyOption ? setSelectedIndex(index > 0 ? index : 0) : onMenuItemClickHandle(index);
              }}
            >
              {menuItems.map((item, index) => (
                <RadioOptionButton key={`menu-item-${index}`} label={item.name} value={item.value} />
              ))}
            </RadioGroup>
            <RenderIf value={isApplyOption}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant={'text'}
                  sx={{
                    textTransform: 'initial',
                    color: Color.textHint,
                    width: 'auto',
                    padding: '5px 10px 5px 10px',
                  }}
                  onClick={() => {
                    const index = menuItems.findIndex((e) => e.value === '');
                    if (index >= 0) {
                      onMenuItemClickHandle(index);
                    } else {
                      onMenuItemClickHandle(0);
                    }
                  }}
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
                  onClick={() => onMenuItemClickHandle(selectedIndex)}
                >
                  Apply
                </Button>
              </Box>
            </RenderIf>
          </Box>
        );
      }

      if (isCheckBox) {
        return (
          <Box p={'6px 16px'} display={'flex'} flexDirection={'column'}>
            {menuItems.map((item, index) => (
              <Box key={`menu-item-${index}`} display='flex' alignItems={'center'}>
                <Checkbox
                  checked={multipleChecked[index]}
                  onChange={(event, value) => {
                    onCheckBoxClickHandle(index);
                  }}
                />
                <Typography sx={{ ...item.labelStyle }}>{item.name}</Typography>
              </Box>
            ))}
            <RenderIf value={isApplyOption}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <Button
                  variant={'text'}
                  sx={{
                    textTransform: 'initial',
                    color: Color.textHint,
                    width: 'auto',
                    padding: '5px 10px 5px 10px',
                  }}
                  onClick={() => {
                    setAnchorEl(null);
                    if (!isFilterApplied) {
                      setMultipleChecked(new Array(menuItems.length).fill(false));
                    }
                  }}
                >
                  Cancel
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
                  onClick={() => onCheckboxApplyClick()}
                >
                  Apply
                </Button>
              </Box>
            </RenderIf>
          </Box>
        );
      }

      return menuItems.map((item, index) => (
        <div key={`menu-item-${index}`}>
          <MenuItem
            disabled={isUndefined(noSelectionMode) && index === selectedIndex}
            selected={index === selectedIndex}
            style={{ height: '2.5em', display: 'flex', justifyContent: 'space-between', opacity: 'inherit' }}
            sx={{ color: '#000 !important' }}
            onClick={(event) => onMenuItemClickHandle(index)}
          >
            <Typography sx={{ fontWeight: index === selectedIndex ? '600' : 'normal' }}>{item.name}</Typography>
            {!noTick && index === selectedIndex ? (
              <img
                alt=''
                src={require('../../../assets/icons/ic-check.svg').default}
                style={{ width: '15px', height: '15px', ...imgStyle }}
              />
            ) : null}
          </MenuItem>
          <RenderIf value={index < menuItems.length - 1 && isDivider}>
            <Divider sx={{ marginTop: '0 !important', marginBottom: '0 !important' }} />
          </RenderIf>
        </div>
      ));
    },
    [
      isRadio,
      isCheckBox,
      menuItems,
      selectedIndex,
      isApplyOption,
      onMenuItemClickHandle,
      multipleChecked,
      onCheckBoxClickHandle,
      isFilterApplied,
      onCheckboxApplyClick,
      noSelectionMode,
      noTick,
      isDivider,
    ],
  );

  const dropDownMenuClass = classNames('dropdown-button', { active: isActive });

  return (
    <div className={customClassName}>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={dropDownMenuClass}
        endIcon={
          <>
            <RenderIf value={!isUndefined(icon)}>{icon}</RenderIf>
            <RenderIf value={isUndefined(icon)}>
              {open ? <ExpandLess className='menu-arrow' /> : <ExpandMoreIcon className='menu-arrow' />}
            </RenderIf>
          </>
        }
        sx={{
          border: { xs: '1px solid #eaeaea', sm: 'transparent', md: 'transparent' },
          minWidth: { xs: '100%', sm: '64px', md: '64px' },
          justifyContent: { xs: 'flex-start', sm: 'center', md: 'center' },
          color: Color.priBlue,
          paddingX: '15px',
          height: '44px',
          '& .MuiButton-endIcon': {
            marginLeft: 0,
          },
          ...buttonOverrideStyle,
        }}
      >
        <RenderIf value={sm || mdLg}>
          <RenderIf value={label !== undefined}>
            <Box
              sx={{
                color: Color.textHint,
                fontSize: '14px',
                lineHeight: '24px',
                letterSpacing: '-0.5px',
                ...overrideLabelStyle,
              }}
              component='span'
              className='menu-label'
            >
              {label}
              {label && isUndefined(noSelectionMode) && !noSelectionMode ? ':' : ''}
            </Box>
          </RenderIf>

          <RenderIf value={isUndefined(noSelectionMode)}>
            <Box
              sx={{ fontWeight: 'bold', fontSize: '14px', lineHeight: '24px', pl: '6px', ...overrideNameStyle }}
              component='span'
              className='menu-label'
            >
              {menuItems[selectedIndex].name}
            </Box>
          </RenderIf>
        </RenderIf>
        <RenderIf value={xs}>
          <RenderIf value={label !== undefined}>
            <Box
              sx={{ color: Color.textHint, fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px', ...overrideLabelStyle }}
              component='span'
              className='menu-label'
            >
              {label}
              {label && isUndefined(noSelectionMode) && !noSelectionMode ? ':' : ''}
            </Box>
          </RenderIf>
          <RenderIf value={isUndefined(noSelectionMode)}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Box
                sx={{ fontWeight: 'bold', fontSize: '14px', lineHeight: '24px', pl: '6px' }}
                component='span'
                className='menu-label'
              >
                {menuItems[selectedIndex].name}
              </Box>
            </Box>
          </RenderIf>
        </RenderIf>
      </Button>
      <RenderIf value={mdLg}>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              minWidth: 160,
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              ...overideStyle,
            },
          }}
        >
          {MenuList({})}
        </Menu>
      </RenderIf>
      <RenderIf value={sm}>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              minWidth: 320,
              borderRadius: 10,
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              ...overideStyle,
            },
          }}
        >
          {MenuList({})}
        </Menu>
      </RenderIf>
      {/* <RenderIf value={xs}>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            style: {
              minWidth: 160,
              marginInline: 'auto',
              borderRadius: 10,
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              ...overideFilterStyle,
            },
          }}
        >
          {MenuList({ imgStyle: { marginLeft: '10px' } })}
        </Menu>
      </RenderIf> */}
    </div>
  );
};

interface IRangeDropDown {
  defaultMin?: number;
  defaultMax?: number;
  label?: string;
  buttonOverrideStyle?: SxProps;
  overrideLabelStyle?: SxProps;
  overideStyle?: SxProps;
  iconPosition?: MENUICON_POSITION;
  icon?: React.ReactNode;
  isApply?: boolean;
  onChange: (min: number, max: number) => void;
}

export function RangeDropDownMenuComponent({
  defaultMax,
  defaultMin,
  buttonOverrideStyle,
  icon,
  label,
  overrideLabelStyle,
  overideStyle,
  isApply = false,
  onChange,
}: IRangeDropDown) {
  const [{ min, max, anchor }, setState] = useSetState({
    min: defaultMin ?? 0,
    max: defaultMax ?? 0,
    anchor: null as HTMLElement | null,
  });
  const open = useMemo(() => Boolean(anchor), [anchor]);
  const { xs, sm, mdLg } = useMediaBreakpoint();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setState({ anchor: event.currentTarget });
  };
  const onCloseMenu = useCallback(() => {
    setState({ anchor: null });
  }, [setState]);

  useEffect(() => {
    setState({ min: defaultMin, max: defaultMax });
  }, [defaultMax, defaultMin, setState]);

  useEffect(() => {
    if (!isApply) {
      onChange(min, max);
    }
  }, [isApply, max, min, onChange]);

  return (
    <div>
      <Button
        id={'basic-button'}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='dropdown-button'
        endIcon={
          <>
            <RenderIf value={!isUndefined(icon)}>{icon}</RenderIf>
            <RenderIf value={isUndefined(icon)}>{open ? <ExpandLess /> : <ExpandMoreIcon />}</RenderIf>
          </>
        }
        sx={{
          border: { xs: '1px solid #eaeaea', sm: 'transparent', md: 'transparent' },
          minWidth: { xs: '100%', sm: '64px', md: '64px' },
          justifyContent: { xs: 'flex-start', sm: 'center', md: 'center' },
          paddingX: '15px',
          height: '44px',
          '& .MuiButton-endIcon': {
            marginLeft: 0,
          },
          ...buttonOverrideStyle,
        }}
      >
        <RenderIf value={sm || mdLg}>
          <RenderIf value={label !== undefined}>
            <Box
              sx={{
                color: Color.textHint,
                fontSize: '14px',
                lineHeight: '24px',
                letterSpacing: '-0.5px',
                ...overrideLabelStyle,
              }}
              component='span'
            >
              {label}
              {label ? ':' : ''}
            </Box>
          </RenderIf>
        </RenderIf>

        <RenderIf value={xs}>
          <RenderIf value={label !== undefined}>
            <Box sx={{ color: Color.textHint, fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px' }} component='span'>
              {label}
              {label ? ':' : ''}
            </Box>
          </RenderIf>
        </RenderIf>
      </Button>
      <RenderIf value={sm || mdLg}>
        <Menu
          id='basic-menu'
          anchorEl={anchor}
          open={open}
          onClose={onCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              width: 160,
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',

              ...overideStyle,
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.03em', lineHeight: '125%' }}>
                Min
              </Typography>
              <Input
                type={'number'}
                value={min > 0 ? min : undefined}
                disableUnderline
                placeholder={'$0.0'}
                inputProps={{
                  min: 0,
                  sx: {
                    textAlign: 'center',
                  },
                }}
                sx={{
                  width: '96px',
                  height: '40px',
                  mt: '10px',
                  outline: 'transparent',
                  border: '1px solid #eaeaea',
                }}
                onChange={(e) => setState({ min: +e.target.value })}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.03em', lineHeight: '125%' }}>
                Max
              </Typography>
              <Input
                type={'number'}
                value={max > 0 ? max : undefined}
                disableUnderline
                placeholder={'$0.0'}
                inputProps={{
                  min: 0,
                  sx: {
                    textAlign: 'center',
                  },
                }}
                sx={{
                  width: '96px',
                  height: '40px',
                  mt: '10px',
                  outline: 'transparent',
                  border: `1px solid ${min > max && max !== 0 ? 'red' : '#eaeaea'}`,
                }}
                onChange={(e) => setState({ max: +e.target.value })}
              />
            </Box>
          </Box>
          <RenderIf value={isApply}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '16px' }}>
              <Button
                variant={'text'}
                sx={{
                  textTransform: 'initial',
                  color: Color.textHint,
                  width: 'auto',
                  padding: '5px 10px 5px 10px',
                }}
                onClick={() => {
                  setState({ min: 0, max: 0, anchor: null });
                  onChange(0, 0);
                }}
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
                onClick={() => onChange(min, max)}
              >
                Apply
              </Button>
            </Box>
          </RenderIf>
        </Menu>
      </RenderIf>
    </div>
  );
}
