// @flow
import React, { useCallback } from 'react';

import { Box, Button } from '@mui/material';

import { HeadingText } from '../../common/styles/homepage.styles';

import { Color } from '../../theme';

import { useNavigate } from 'react-router-dom';

import { useValidated } from '../../common/utils/global_state.util';

import { useAppDispatch } from '../../redux/hooks';
import { userFromStateUpdated } from '../../redux/reducers/authReducers';

export const BecomeSellerComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [, setValidated] = useValidated();

  const userRoute = useCallback((route: string) => {
    setValidated(false);
    dispatch(userFromStateUpdated({ email: '', active: route }));
    navigate('/login');
  }, []);

  return (
    <Box
      sx={{
        background: `url(${require('../../assets/home-page/become_seller.svg').default})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        backgroundSize: 'cover',
        height: '21em',
        borderRadius: '1em',
      }}
    >
      <HeadingText
        sx={{
          fontWeight: 600,
          textAlign: 'center',
          fontSize: { xs: '24px !important', sm: '40px !important' },
          maxWidth: { xs: '255px !important', sm: '100% !important' },
          color: 'white !important',
        }}
      >
        Interested to be a seller on the platform?
      </HeadingText>
      <Button
        sx={{
          width: { xs: 'auto', sm: '200px', md: '202.3px' },
          height: '48px',
          color: Color.textBlack,
          marginTop: { xs: '16px', sm: '56px', md: '32px' },
          textTransform: 'initial',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.07)',
          padding: '12px 24px',
          fontSize: { xs: '14px', sm: '16px' },
        }}
        onClick={() => userRoute('seller')}
        variant='contained'
        color='primary'
      >
        Become a seller
      </Button>
    </Box>
  );
};
