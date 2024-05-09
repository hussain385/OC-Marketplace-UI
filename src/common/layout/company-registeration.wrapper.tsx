// @flow
import React from 'react';
import { styled } from '@mui/system';
import { Box, SxProps } from '@mui/material';
import UserFooter from '../components/user-footer.component';
import { isUndefined } from 'lodash';
import NavBar from '@/common/components/navbar';

const Wrapper = styled(Box)(() => ({
  minHeight: '100vh',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const BackgroundWrapper = styled(Box)(() => ({
  backgroundPosition: 'center bottom',
  backgroundAttachment: 'fixed',
  backgroundColor: 'transparent',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  objectFit: 'contain',
  width: '100%',
  height: '100%',
  minHeight: '87vh',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2em',
  alignItems: 'center',
}));

type propTypes = {
  children: React.ReactElement;
  isFooterHidden?: boolean;
  wrapperStyle?: React.CSSProperties | SxProps;
};

export const CompanyRegisterationWrapper = ({ children, isFooterHidden, wrapperStyle }: propTypes) => {
  return (
    <Wrapper>
      <NavBar />
      <BackgroundWrapper
        sx={{
          background: { xs: 'white', sm: `url(${require('../../assets/login-bg/login_bg.svg').default})` },
          overflowY: 'auto',
          ...wrapperStyle,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </Box>
      </BackgroundWrapper>

      {isUndefined(isFooterHidden) && <UserFooter customStyle={{ width: '100%', marginTop: 'auto', height: '50px' }} />}
    </Wrapper>
  );
};
