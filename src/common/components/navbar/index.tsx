import React, { useEffect, useMemo, useState } from 'react';
import { globalSearchFilter } from '@/common/utils/global_state.util';
import { AppBar, Box, Divider, IconButton } from '@mui/material';
import { appBarStyles, mainContainer, SecondaryBox } from '@/common/styles/navbar.styles';
import NavBarLogoComponent from '@/common/components/navbar/navbar-logo.component';
import CatalogSearchNavigation from '@/modules/catalog/search/component/catalog-search-navigation';
import NotificaionMenu from '@/common/components/notification_menu/notification-menu.component';
import UserInfoDropdownComponent from '@/common/components/navbar/user-info-dropdown.component';
import DrawerComponent from '@/common/components/navbar/drawer.component';
import { RenderIf, useMediaBreakpoint } from '@/common/components';
import LoginButtonComponent from '@/common/components/navbar/login-button.component';
import SwitchBtnComponent from '@/common/components/navbar/switch-btn.component';
import { isEmpty } from 'lodash';
import { USER_GROUP_LOWERCASE } from '@/common/interface';
import { Color } from '@/theme';
import { useAppSelector } from '@/redux/hooks';
import { useLocation } from 'react-router-dom';
import AvatarComponent from '@/common/components/navbar/avatar.component';
import { MdKeyboardArrowDown } from 'react-icons/md';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const { pathname } = useLocation();
  const [, setSearchActive] = globalSearchFilter();
  const { xs, sm } = useMediaBreakpoint();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.mainState.useInfo);
  const { clientType } = useAppSelector((state) => state.mainState.useInfo);
  const [scrollDirection, setScrollDirection] = useState<number>(0);
  const navbarSellerCondition = useMemo(
    () => clientType === USER_GROUP_LOWERCASE.seller && scrollDirection < 475 && pathname === '/seller',
    [scrollDirection, clientType, pathname],
  );

  useEffect(() => {
    const updateScrollDirection = () => {
      setScrollDirection(Number(window.scrollY));
    };
    window.addEventListener('scroll', updateScrollDirection); // add event listener

    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <AppBar
        position='sticky'
        color={'primary'}
        sx={{
          ...appBarStyles,
          backgroundColor: {
            xs: Color.priWhite,
            md: navbarSellerCondition ? 'transparent' : 'white',
          },
          boxShadow: navbarSellerCondition
            ? { xs: '0px 2px 4px rgba(0, 0, 0, 0.06)', md: 'none' }
            : '0px 2px 4px rgba(0, 0, 0, 0.06)',
        }}
        onMouseLeave={() => setSearchActive(false)}
      >
        <Box
          sx={{
            ...mainContainer,
            paddingInline: navbarSellerCondition ? { xs: '0', md: '1.5em' } : '0em',
          }}
        >
          <NavBarLogoComponent />
          {!xs && !sm ? (
            <SecondaryBox>
              <CatalogSearchNavigation scrollDirection={scrollDirection} />
              <Divider
                style={{
                  width: '1px',
                  backgroundColor: navbarSellerCondition ? '#ffffff' : '#DCD9D9',
                  height: '20px',
                }}
                aria-orientation={'horizontal'}
              />
              <RenderIf value={!!user}>
                <NotificaionMenu />
                <Divider
                  style={{
                    width: '1px',
                    backgroundColor: navbarSellerCondition ? '#ffffff' : '#DCD9D9',
                    height: '20px',
                  }}
                  aria-orientation={'horizontal'}
                />
              </RenderIf>
              {!isEmpty(user) ? <UserInfoDropdownComponent /> : <LoginButtonComponent scrollDirection={scrollDirection} />}
              {isEmpty(user) && <SwitchBtnComponent />}
            </SecondaryBox>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <RenderIf value={!!user}>
                <NotificaionMenu />
              </RenderIf>
              <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' sx={{ ml: 1 }}>
                {user ? (
                  <>
                    <AvatarComponent />
                    <MdKeyboardArrowDown style={{ color: 'black' }} />
                  </>
                ) : (
                  <MenuIcon style={{ color: 'black' }} />
                )}
              </IconButton>
            </div>
          )}
        </Box>
      </AppBar>
      {(xs || sm) && (
        <AppBar
          position='sticky'
          color={'primary'}
          sx={{ ...appBarStyles, marginTop: '1px' }}
          onMouseLeave={() => setSearchActive(false)}
        >
          <CatalogSearchNavigation catalogSearchPage scrollDirection={scrollDirection} />
        </AppBar>
      )}
      <DrawerComponent setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default NavBar;
