/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEmailConfirmationMutation } from '../../../redux/apis/authApi';
import OnBoardingLayout from '../components/onboarding-layout';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { isUndefined } from 'lodash';

const EmailVerify = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const token = query.get('token') as string;
  const [emailConfirmation] = useEmailConfirmationMutation();
  const { useInfo } = useAppSelector((state) => state.mainState);

  const confirmEmail = useCallback(async () => {
    const response = await emailConfirmation({ token });
    if (response && 'data' in response) {
      setTimeout(() => {
        if (isUndefined(useInfo.user)) {
          navigate('/');
        } else {
          navigate('/account');
        }
      }, 5000);
    }
  }, [emailConfirmation, navigate, token]);

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  return (
    <OnBoardingLayout
      title='Your email address has been confirmed'
      hideMainFooter={true}
      customStyles={{ innerBoxStyle: { border: 'none', background: 'transparent' } }}
    >
      <Box sx={{ width: '100%', textAlign: 'center', padding: '46px' }}>
        <Typography>You’ll be redirected shortly or you can</Typography>
        <Typography sx={{ paddingLeft: '5px' }} component='a' href='/' target='_blank'>
          click here to go to homepage
        </Typography>
      </Box>
    </OnBoardingLayout>
  );
};

export default EmailVerify;
