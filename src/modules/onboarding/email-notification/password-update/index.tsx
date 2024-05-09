/**
 * TODO this component should be removed. Check the usage.
 */
import { Box, Button, Typography } from '@mui/material';

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { isUndefined } from 'lodash';

import { Color } from '../../../../theme';

import { useGlobalLogoutState } from '../../../../common/utils/global_state.util';

import { unmountCacheData } from '../../../../common/utils/helpers/cache';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

import LogoutModal from '../../../../common/components/logout-popup.component';

import { Wrapper } from '../../../../common/styles/navbar.styles';

import { userLogout } from '../../../../redux/reducers/authReducers';
import UserFooter from '../../../../common/components/user-footer.component';
import NavBar from '@/common/components/navbar';

function PasswordUpdateNotification() {
  const navigate = useNavigate();
  const [logoutModal] = useGlobalLogoutState();
  const dispatch = useAppDispatch();
  const { reset } = useAppSelector((state) => state.mainState.useInfo);

  const navigateLocation = React.useCallback(() => {
    if (reset === true && !isUndefined(reset)) {
      dispatch(userLogout());
      unmountCacheData();
      localStorage.removeItem('persist:root');
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [dispatch, navigate, reset]);

  return (
    <Wrapper
      sx={{
        background: Color.bgGreyLight,
        minHeight: '100vh',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',

          height: '79vh',
        }}
      >
        <Box
          sx={{
            background: Color.priWhite,
            width: '96%',
            maxWidth: '544px',
          }}
        >
          <i style={{ background: Color.priWhite }}>
            <img src='../verify/stock-verification-progress.svg' style={{ maxWidth: '100%', width: '100%' }} />
          </i>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: '18px',
            }}
          >
            <Typography
              sx={{
                marginTop: '24px',
                fontSize: ' 24px',
                fontWeight: 'bold',
                letterSpacing: '-0.48px',
                color: Color.lightBlack,
              }}
            >
              Password updated
            </Typography>

            <Box
              sx={{
                width: '100%',
                maxWidth: '432px',
                height: 'auto',
                padding: '14px 0px 14px 16px',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '24px',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: Color.textBlack,
                    lineHeight: 1.57,
                    letterSpacing: '-0.5px',
                  }}
                >
                  Your new password has now been set and you are logged in. Return to homepage.
                </Typography>
              </Box>
            </Box>

            <Button
              type='submit'
              variant='contained'
              color='secondary'
              sx={{
                width: '100%',
                maxWidth: '432px',
                borderRadius: '2px',
                height: '44px',
                fontSize: '1.25rem',
                marginTop: '24px',
                marginBottom: '16px',
              }}
              onClick={navigateLocation}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  lineHeight: 1.5,
                  letterSpacing: '-0.5px',
                  textTransform: 'initial',
                }}
              >
                Done
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      <UserFooter />
      {logoutModal && <LogoutModal />}
    </Wrapper>
  );
}

export default PasswordUpdateNotification;
