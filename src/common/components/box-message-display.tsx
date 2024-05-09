/* eslint-disable no-unused-vars */
import React from 'react';

import { Box } from '@mui/material';

import LogoutModal from './logout-popup.component';

import RenderIf from './render-if.component';

import UserFooter from './user-footer.component';

import { useGlobalLogoutState } from '../utils/global_state.util';

import useMediaBreakpoint from './breakpoint';

import { Color } from '../../theme';
import NavBar from '@/common/components/navbar';

type Children = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overideStyle?: any;
};

const BoxMessageDisplay = ({ children, overideStyle }: Children) => {
  const [logoutModal] = useGlobalLogoutState();
  const { sm, mdLg } = useMediaBreakpoint();
  return (
    <Box
      sx={{
        width: '100%',
        margin: '0, auto',
        background: {
          xs: '#e5e5e5',
          sm: `url(../login/login_bg.svg)`,
          md: `url(../login/login_bg.svg)`,
        },

        objectFit: 'contain',
        height: '100vh',
        ...overideStyle,
      }}
    >
      <NavBar />
      <Box
        sx={(theme) => ({
          width: { xs: '92%', sm: '100%', md: '100%' },
          margin: '0 auto',
          height: { xs: '90vh', sm: '85vh', md: '85vh' },
          paddingTop: { xs: '20px', sm: '0', md: '0' },

          [theme.breakpoints.down(321)]: {
            paddingTop: '100px',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItens: 'center',
            height: '100%',
          }}
        >
          {children}
        </Box>
      </Box>
      <RenderIf value={sm || mdLg}>
        <Box sx={{ height: '5vh', minHeight: '5vh', background: Color.priWhite, ...overideStyle }}>
          <UserFooter />
        </Box>
      </RenderIf>

      {logoutModal && <LogoutModal />}
    </Box>
  );
};

export default BoxMessageDisplay;
