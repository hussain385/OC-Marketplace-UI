import { useLocation, useNavigate } from 'react-router-dom';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Box, Divider, IconButton, InputAdornment, InputBase, List, ListItem, ListItemText, Typography } from '@mui/material';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { globalSearchFilter } from '@/common/utils/global_state.util';
import { useCatalogSearchOptions } from '@/common/utils/hooks/useCatalogSearch';
import { Color } from '../../../../theme';
import { ReactComponent as SearchIcon } from '../../../../assets/catalog-search/left.svg';
import { ReactComponent as SearchClose } from '../../../../assets/catalog-search/right.svg';
import useQueryParams from '../../../../common/utils/hooks/useQueryParams';
import { useDebounce } from '@/common/utils/hooks/useDebounce';
import { useGet4MetaServiceDetails1Query } from '@/redux/apis/marketplace';
import { useClickAway } from 'react-use';
import { USER_GROUP_LOWERCASE } from '@/common/interface';
import { useAppSelector } from '@/redux/hooks';

const CatalogSearchNavigation = ({
  catalogSearchPage,
  scrollDirection,
}: {
  catalogSearchPage?: boolean;
  scrollDirection: number;
}) => {
  const { pathname } = useLocation();
  const { clientType } = useAppSelector((state) => state.mainState.useInfo);
  const [searchActive] = globalSearchFilter();
  const [activeColor, setActiveColor] = React.useState<boolean>(false);
  const [isCloseAppear, setCloseAppear] = React.useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [isSugg, setIsSugg] = useState(false);
  const location: any = useLocation();
  const navigate = useNavigate();
  const [, setParams] = useQueryParams();
  const options = useCatalogSearchOptions();
  const { data } = useGet4MetaServiceDetails1Query(
    {
      ...options,
      filter: {
        ...options.filter,
        $or: [
          { 'metadata.companyName': { $regex: search, $options: 'i' } },
          { 'metadata.companyAbout': { $regex: search, $options: 'i' } },
          { 'metadata.serviceName': { $regex: search, $options: 'i' } },
          { 'metadata.serviceDescription': { $regex: search, $options: 'i' } },
        ],
      },
    },
    { skip: search === '' },
  );
  const navbarSellerCondition = useMemo(
    () => clientType === USER_GROUP_LOWERCASE.seller && scrollDirection < 475 && pathname === '/seller',
    [scrollDirection, clientType, pathname],
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const suggRef = useRef<HTMLInputElement>(null);

  useClickAway(suggRef, () => setIsSugg(false));

  const onSearchChange = useDebounce((text: string) => {
    setSearch(text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
  }, 500);

  const setParamOrChange = useCallback(
    (text: string) => {
      const changedText = text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      if (location.pathname === '/catalog/search') {
        setParams('s', changedText);
      } else {
        navigate(`/catalog/search${text !== '' ? '?s=' + changedText : ''}`);
      }
    },
    [location.pathname, navigate, setParams],
  );

  const clearAllInput = () => {
    setCloseAppear(false);
    if (inputRef.current) {
      inputRef.current.value = '';
      if (location.pathname === '/catalog/search') {
        setParams('s', '');
      } else {
        navigate('/catalog/search');
      }
    }
  };

  const onChangeInputValue = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      value: string | undefined;
    };

    const value = target.value as string;

    if (value.length > 0) {
      setIsSugg(true);
      setCloseAppear(true);
    } else {
      setCloseAppear(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: { xs: '10px', md: '0px' },
          marginTop: '0px',
          width: { xs: '100%', md: 'auto' },
          position: { xs: 'absolute', md: 'inherit' },
          top: { xs: '1em', md: undefined },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <InputBase
            id={'searchOrder'}
            name='searchOrder'
            inputRef={inputRef}
            sx={{
              background: activeColor || searchActive ? 'transparent' : Color.bgGreyLight,
              width: { xs: '100%', md: '200px', lg: '359px' },
              height: '40px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: activeColor ? Color.priBlue : Color.line,
              borderRadius: '100px',
              outline: 'transparent',
              px: '10px',
              fontSize: '14px !important',
              '& input': {
                '&::placeholder': {
                  letterSpacing: '-0.02em',
                  lineHeight: '20px',
                  fontWeight: 400,
                  color: '#7e7e7e',
                  fontSize: '12px',
                },
              },
            }}
            startAdornment={
              <InputAdornment position={'start'}>
                <SearchIcon />
              </InputAdornment>
            }
            endAdornment={
              isCloseAppear && (
                <InputAdornment position={'end'}>
                  <IconButton onClick={clearAllInput}>
                    <SearchClose />
                  </IconButton>
                </InputAdornment>
              )
            }
            onChange={onChangeInputValue}
            placeholder='What service or provider are you looking for?'
            onFocus={() => setActiveColor(true)}
            onBlur={() => setActiveColor(false)}
            onKeyUp={(e) => {
              if (e.target.value.trim() === '') {
                e.target.value = '';
              }
              setTimeout(() => {
                onSearchChange(e.target.value);
                // handlerSearchActive(e);
              }, 200);
            }}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'enter') {
                if (e.target.value.trim() === '') {
                  e.target.value = '';
                }

                setParamOrChange(e.target.value);
              }
            }}
          />
        </Box>

        {isSugg && data?.docs && data.docs.length > 0 && (
          <Box
            ref={suggRef}
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              top: { xs: undefined, md: '100%' },
              width: { xs: '100%', md: '200px', lg: '359px' },
              background: Color.priWhite,
              height: 'auto',
              maxHeight: '216px',
              overflow: 'auto',
              boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
          >
            <List
              sx={{
                width: '90%',
                marginInline: 'auto',
              }}
            >
              {data.docs.map((item, index: number) => (
                <ListItem
                  key={index}
                  sx={{ '&:hover': { background: '#F6F6F6' }, padding: 0, cursor: 'pointer' }}
                  onClick={() => {
                    if (inputRef?.current) {
                      inputRef.current.value = item.name;
                    }

                    setIsSugg(false);

                    setParamOrChange(item.name);
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          color: '#7e7e7e',
                          fontWeight: 600,
                          fontSize: '14px',
                          maxWidth: '40ch',
                          maxHeight: '45px',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
      {!catalogSearchPage && (
        <>
          <Divider style={{ width: '1px', backgroundColor: '#DCD9D9', height: '20px' }} aria-orientation={'horizontal'} />
          <AppThemeBtnComponent
            customButtonStyle={{
              height: '40px',
              padding: '0px',
              minWidth: '0px !important',
              border: 'transparent',
              '&:hover': {
                border: 'transparent',
              },
            }}
            overrideFontStyle={{ width: 'min-content', fontWeight: '700' }}
            color={navbarSellerCondition ? Color.priWhite : Color.priBlue}
            backgroundColor={'transparent'}
            width={'fit-content'}
            fontSize={'14px'}
            text={'SGD$'}
          />
        </>
      )}
    </>
  );
};

export default CatalogSearchNavigation;
