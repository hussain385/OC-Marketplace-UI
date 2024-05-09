/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordSchema, forgotPasswordSchema } from '../../../common/utils/schema/forgot_password_schema';
import { Color } from '../../../theme';
import usePayload from '../../../common/utils/hooks/usePayload';
import { InputForm } from '../../../common/components/forms';
import { useGetUserEmailExistMutation, useForgotPasswordMutation } from '../../../redux/apis/authApi';
import BackgroundBoxWrapper from '@/common/components/background-box.wrapper';
import BoxWrapper from '@/common/components/box-wrapper';
import { ToastTypes, showToast } from '@/common/utils';
import OnBoardingLayout from '../components/onboarding-layout';

const ForgotPassword = () => {
  const method = useForm<ForgotPasswordSchema>({ resolver: yupResolver(forgotPasswordSchema), defaultValues: { email: '' } });

  const { handleSubmit } = method;

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { email, active } = usePayload();

  const [getUserEmailExist] = useGetUserEmailExistMutation();

  const [forgotPassword] = useForgotPasswordMutation();

  const submitRequest: SubmitHandler<ForgotPasswordSchema> = async (formData) => {
    const { email } = formData as { email: string };
    const emailExist = await getUserEmailExist({ email: email });

    if ('data' in emailExist) {
      const { data } = emailExist;
      if (data === 1) {
        const res = await forgotPassword(email);

        if ('data' in res) {
          navigate(`/check-inbox?email=${email}`);
        }
      } else {
        showToast('Email does not exist', ToastTypes.ERROR);
      }
    }
  };

  const subComponent = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Typography component={'span'} sx={{ marginRight: '5px', fontWeight: '400', fontSize: '14px' }}>
          No worries! Enter your sign-up email, and we&apos;ll send you a password reset link.
        </Typography>
      </Box>
    );
  };

  return (
    <OnBoardingLayout title='Forgot password' subTextComponent={subComponent()}>
      <FormProvider {...method}>
        <form
          onSubmit={handleSubmit(submitRequest)}
          style={{
            width: '100%',
            padding: '46px',
          }}
        >
          <InputForm
            label='Email address'
            placeholder='Email address'
            name='email'
            getValuebyInput={email ?? ''}
            setEmail={() => ''}
          />

          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              sx={{
                width: '100%',
                borderRadius: '4px',
                height: '44px',
                fontSize: '1.25rem',
                marginTop: '8px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  lineHeight: 1.5,
                  letterSpacing: '-0.5px',
                  textTransform: 'initial',
                }}
              >
                {/* {formSubmitted ? 'Please Wait...' : 'Continue'} */}
                Send password reset link
              </Typography>
            </Button>
          </Box>
        </form>
      </FormProvider>
    </OnBoardingLayout>
  );
};

export default ForgotPassword;
