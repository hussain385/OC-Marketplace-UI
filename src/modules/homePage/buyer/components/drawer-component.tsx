/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';

import { Box, Button, Drawer, List, ListItem, ListItemText, SxProps, Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { Color } from '../../../../theme';
import { ReactComponent as FooterIcon } from '../../../../assets/home-page/buyer/footer-opn-logo.svg';
import { ReactComponent as CloseIcon } from '../../../../assets/home-page/buyer/drawer/close-xs.svg';
import { ReactComponent as AccountCircle } from '../../../../assets/home-page/buyer/drawer/account-circle.svg';
import { mobileDrawerItemLink, tcItems } from '../utils/mock-data';
import { useNavigate } from 'react-router-dom';
import DraweMenuStyles, { DrawerIcon } from '../../styles/draweer-menu-.styles';
import { getCookie } from '../../../../common/utils/cookie';
import { useAppDispatch } from '../../../../redux/hooks';
import { isEmpty, isUndefined } from 'lodash';
import { RenderIf, useMediaBreakpoint } from '../../../../common/components';
import usePayloadUseInfo from '../../../../common/utils/hooks/usePayloadUseInfo';
import { updateTempData } from '../../../../redux/reducers/authReducers';
import { useGlobalLogoutState } from '../../../../common/utils/global_state.util';
import useValidateUser from '../../../../common/utils/hooks/useValidateUser';
import { companyProfiles } from '../../../../common/interface/busines-company-profile-interface';

type Anchor = 'right';

export default function Drawerbar({
  customIconStyles,
  children,
}: {
  customIconStyles?: React.CSSProperties | SxProps;
  children?: React.ReactNode;
}) {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [, setLogout] = useGlobalLogoutState();

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userRoute = useCallback(() => {
    navigate('/login');
  }, []);

  const { xs } = useMediaBreakpoint();

  const { navigateAccountInfo } = useValidateUser();

  // eslint-disable-next-line no-unused-vars
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const { user, selectedEntity, step } = usePayloadUseInfo();

  const isIndividual = useMemo(
    () =>
      !isUndefined(selectedEntity) &&
      !isEmpty(selectedEntity) &&
      selectedEntity?.profile?.type !== null &&
      selectedEntity?.profile?.type.includes(companyProfiles.individual) === true,
    [selectedEntity, selectedEntity?.profile.type],
  );

  const navigateAccountProfileInfo = useCallback(() => {
    if ((step as number) > 5) {
      navigate(`/account/seller-profile/${selectedEntity && selectedEntity.uid}`, { state: { id: selectedEntity?.uid } });
    } else {
      navigateAccountInfo();
    }
  }, []);

  const onNavigateRoute = (item: string) => {
    if (item.includes('home')) {
      navigate('/');
    }
    if (item.includes('services')) {
      navigate('/catalog/category');
    }
    if (item.includes('help')) {
      // navigate('/');
    }
  };

  const handlerSignout = () => {
    setLogout(true);
    dispatch(updateTempData({}));
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={DraweMenuStyles.boxContainer}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={DraweMenuStyles.gridBoxtem}>
        <Box sx={DraweMenuStyles.gridItem1}>
          <Box sx={DraweMenuStyles.gridItemFlex1}>
            <FooterIcon />
            {getCookie('x-client-type') === 'seller' && (
              <Typography
                component='span'
                sx={{
                  color: Color.pureBlack,
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  fontSize: '0.875rem',
                  mt: '5px',
                }}
              >
                &lt;FOR SELLER&gt;
              </Typography>
            )}
          </Box>
          <CloseIcon />
        </Box>
        <Box sx={DraweMenuStyles.gridItem2}>
          <List>
            {mobileDrawerItemLink.map((item, index) => (
              <ListItem key={index} sx={DraweMenuStyles.listItems}>
                <ListItemText
                  onClick={() => onNavigateRoute(item.value)}
                  primary={
                    <Typography sx={DraweMenuStyles.listItemText}>
                      {getCookie('x-client-type') === 'seller' && item.value.includes('services') ? 'How it works' : item.label}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            {isIndividual && (
              <ListItem sx={DraweMenuStyles.listItems}>
                <ListItemText
                  onClick={navigateAccountProfileInfo}
                  primary={<Typography sx={DraweMenuStyles.listItemText}>Profile info</Typography>}
                />
              </ListItem>
            )}
            {!isEmpty(user) && (
              <>
                <ListItem sx={DraweMenuStyles.listItems}>
                  <ListItemText
                    onClick={navigateAccountInfo}
                    primary={<Typography sx={DraweMenuStyles.listItemText}>Dashboard</Typography>}
                  />
                </ListItem>
                <ListItem sx={DraweMenuStyles.listItems}>
                  <ListItemText
                    onClick={() => {
                      navigate('/account/order-management?profileType=buyer');
                    }}
                    primary={<Typography sx={DraweMenuStyles.listItemText}>Order management</Typography>}
                  />
                </ListItem>
              </>
            )}
          </List>
        </Box>
        <Box sx={DraweMenuStyles.gridItem3}>
          {isEmpty(user) && (
            <Button sx={DraweMenuStyles.buttonWhite} onClick={userRoute}>
              <AccountCircle /> Login / Signup
            </Button>
          )}

          <RenderIf value={xs}>
            {!isEmpty(user) && (
              <Button
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                variant='outlined'
                sx={DraweMenuStyles.buttonWhite}
              >
                <span style={{ display: 'flex' }}>
                  <AccountCircle />
                </span>
                <Typography
                  sx={{
                    width: '100%',

                    fontSize: {
                      xs: '14px',
                      sm: '16px',
                      md: '16px',
                      lineHeight: '150%',
                      fontWeight: 600,
                    },
                  }}
                >
                  {user && !isEmpty(user) ? user.name : ''}
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </Button>
            )}
          </RenderIf>

          {!isUndefined(children) && children}
          {!isEmpty(user) && (
            <Button sx={{ ...DraweMenuStyles.buttonBlue, background: Color.negative, border: 'none' }} onClick={handlerSignout}>
              Log out
            </Button>
          )}
        </Box>
      </Box>
      <Box sx={DraweMenuStyles.footerContainer}>
        <Box sx={DraweMenuStyles.footerContainerBoxItems}>
          {tcItems.map((item, index) => (
            <Typography sx={DraweMenuStyles.footerText} key={index} onClick={() => navigate(item.url)}>
              {item.text}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <div key={anchor}>
          <DrawerIcon
            disableFocusRipple
            disableRipple
            onClick={toggleDrawer(anchor, true)}
            size='large'
            edge='start'
            aria-label='menu'
            title='Open'
            sx={customIconStyles}
          >
            <MenuIcon sx={DraweMenuStyles.menuIcon} />
          </DrawerIcon>
          {/*<Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>*/}
          <Drawer
            PaperProps={{
              sx: { ...DraweMenuStyles.paperProps },
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </div>
      ))}
    </div>
  );
}
