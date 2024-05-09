import React, { useEffect } from 'react';
import OnBoardingLayout from '../components/onboarding-layout';
import { useNavigate } from 'react-router-dom';
import { isEmpty, isNull } from 'lodash';
import { Box, Button, Typography } from '@mui/material';
import { Color } from '@/theme';
import { useResendEmailConfirmationMutation } from '@/redux/apis/authApi';
import { ToastTypes, showToast } from '@/common/utils';
import useQueryParams from '@/common/utils/hooks/useQueryParams';

const ConfirmEmailScreen = () => {
  const navigate = useNavigate();
  const [ResendEmail, { isLoading, data: resendData }] = useResendEmailConfirmationMutation();
  const [params] = useQueryParams();

  useEffect(() => {
    if (isNull(params.get('token')) || isEmpty(params.get('token'))) {
      navigate('/');
    }
    if (resendData?.message) {
      showToast(resendData?.message as string, ToastTypes.SUCCESS);
    }
  }, [navigate, params, resendData?.message]);

  const onResendButtonClick = () => {
    ResendEmail({ userId: params.get('token') ?? '' });
  };

  return (
    <OnBoardingLayout title='Confirm your email address' customStyles={{ innerBoxStyle: { border: 'none', background: 'none' } }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography>Follow the instructions sent to {params.get('email')} to confirm your email address.</Typography>
        <Typography sx={{ marginTop: '16px' }}>
          If you don&apos;t see it, kindly check your junk/spam folder. Otherwise, we can:
        </Typography>
        <Button
          sx={{ color: Color.priBlue, textTransform: 'initial', marginTop: '44px', fontSize: '14px', fontWeight: '600' }}
          onClick={onResendButtonClick}
        >
          {isLoading ? 'Sending...' : 'Resend email'}
        </Button>
      </Box>
    </OnBoardingLayout>
  );
};
export default ConfirmEmailScreen;
