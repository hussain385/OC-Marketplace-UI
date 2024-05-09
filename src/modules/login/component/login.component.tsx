/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, IconButton, Link, Typography } from '@mui/material';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { isEmpty, isNull, isUndefined } from 'lodash';

import { yupResolver } from '@hookform/resolvers/yup';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import { LoginProps } from './login.type';

import { useForm } from 'react-hook-form';

import { Color } from '../../../theme';

import { showToast, ToastTypes } from '../../../common/utils';

import { useMediaBreakpoint } from '../../../common/components';

import CustomInput from '../../../common/components/forms/input.form';

import { IIError } from '../../../common/interface';

import { loginSchema, LoginSchemaType } from '../../../common/utils/schema/login-schema';

import { useGetUserEmailExistMutation, useLazySingpassInitSessionQuery } from '../../../redux/apis/authApi';
import useTitle from '@/common/utils/hooks/useTitle';
import { urlHelper } from '@/common/utils/helpers/url';
import { ReactComponent as SingpassLoginButton } from '@/modules/onboarding/assets/singpass-button.svg';
import OnBoardingLayout from '@/modules/onboarding/components/onboarding-layout';

const LoginComponent = ({ onSubmitHandler, formSubmitted, loginError, userInviteEmail, setValidated }: LoginProps) => {
  const urlLocation = useLocation();

  const methods = useForm<LoginSchemaType>({
    resolver: yupResolver<LoginSchemaType>(loginSchema),
    defaultValues: {
      email: !isEmpty(userInviteEmail) ? userInviteEmail : '',
      password: '',
    },
  });

  const { handleSubmit, getValues: getFormValues, setValue, watch } = methods;

  const navigate = useNavigate();

  const [getUserEmail] = useGetUserEmailExistMutation();

  const [initSingpassSession] = useLazySingpassInitSessionQuery();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);

  useTitle('OPNCORP');

  const redirectUrl = useMemo(() => {
    return `/login${urlHelper().params.get('redirect') ? '?redirect=' + urlHelper().params.get('redirect') : ''}`;
  }, []);

  const isEmailExist = useCallback(async () => {
    const res = await getUserEmail({ email: getFormValues().email as string });

    if ('data' in res) {
      const { data } = res;

      if (data === 0) {
        navigate('/create');
      }
    }
  }, [getFormValues, getUserEmail, navigate]);

  useEffect(() => {
    if (!isUndefined(loginError)) {
      const errMsg = (loginError as IIError).data.message;
      const errStatus = (loginError as IIError).status;
      if (errStatus === 'FETCH_ERROR') {
        showToast('Something went wrong, Please contact the administrator to resolve the issue', ToastTypes.ERROR);
      }
    }
  }, [loginError]);

  // useEffect(() => {
  //   if (!isUndefined(acceptError)) {
  //     const message = (acceptError as IIError).data.message;
  //     showToast(message, ToastTypes.ERROR);
  //   } else if (acceptSuccess) {
  //     showToast('Invitation accepted successfully!', ToastTypes.SUCCESS);
  //   }
  // }, [acceptError, acceptSuccess]);

  useEffect(() => {
    if (!isNull(urlLocation.state)) {
      const { email } = urlLocation.state;
      setValue('email', email);
    }
  }, [urlLocation, setValue]);

  useEffect(() => {
    if (!isEmpty(userInviteEmail)) {
      isEmailExist();
      setValidated(true);
      setValue('email', userInviteEmail);
    }
  }, [getFormValues, getUserEmail, isEmailExist, navigate, setValidated, setValue, userInviteEmail]);

  const navigateToForgotPassword = () => {
    navigate('/forgotpassword');
  };

  const { xs } = useMediaBreakpoint();

  /**
   * @description Singpass login button function
   */
  const navigateSingpass = async () => {
    const { data, isError, isSuccess } = await initSingpassSession({});
    if (isError) {
      showToast('There is some problem at the moment.', ToastTypes.ERROR);
    }
    if (isSuccess) {
      const { client_id, nonce, redirect_uri, response_type, scope, state } = data;
      if (redirect_uri) {
        const singpass = `${
          import.meta.env.VITE_SINGPASS
        }/auth?scope=${scope}&response_type=${response_type}&redirect_uri=${redirect_uri}&nonce=${nonce}&client_id=${client_id}&state=${state}`;
        const url = new URL(singpass as string);
        location.href = url.href;
      }
    }
  };

  const onInvalidForm = async (data: any) => {
    const isEmailError = Object.keys(data).includes('email');
    if (!isEmailError) {
      const res = await getUserEmail({ email: watch('email') as string });
      if ('data' in res) {
        const { data } = res;

        if (data === 0) {
          navigate('/create', { state: { email: watch('email') } });
        } else {
          setShowPasswordField(true);
        }
      }
    } else {
      throw 'Email is not valid';
    }
  };

  /**
   * As per Ivan we don't need to show this and revert back to the previous changes. We still keep this code if need in future
   * Date: 24 January 2024
   */
  const subComponent = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Typography component={'span'} sx={{ marginRight: '5px', color: Color.textGray7E, fontWeight: '700' }}>
          Don&apos;t have an account yet?
        </Typography>
        <Link href='/create' sx={{ color: Color.priBlue, fontWeight: '700', textDecoration: 'none' }}>
          Sign up here
        </Link>
      </Box>
    );
  };

  const singPassButton = () => {
    return (
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Button
          disabled={formSubmitted}
          type='button'
          color='secondary'
          sx={{
            width: '100%',
            maxWidth: '520px',
            borderRadius: '2px',
            height: '50px',
            fontSize: '1.25rem',
            padding: 0,
            '&:hover': {
              background: 'transparent',
            },
          }}
          onClick={navigateSingpass}
        >
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: '700',
              fontStyle: 'normal',
              lineHeight: 1.5,
              letterSpacing: '-0.5px',
              textTransform: 'initial',
              textAlign: 'center',
              color: Color.textGray7E,
              marginRight: '5px',
            }}
          >
            or
          </Typography>
          <SingpassLoginButton />
        </Button>
      </Box>
    );
  };

  return (
    <OnBoardingLayout
      title={showPasswordField ? 'Log in' : 'Log in or sign up for an account'}
      customStyles={{ outerBoxStyle: { height: 'auto', display: 'block' } }}
      footerComponent={singPassButton()}
    >
      <div>
        <Box
          sx={{
            width: '96%',
            maxWidth: '432px',
            margin: '46px',
          }}
          component='form'
          onSubmit={handleSubmit(onSubmitHandler, onInvalidForm)}
        >
          <CustomInput
            name='email'
            label='Email'
            isDisabled={!isEmpty(userInviteEmail)}
            inputProps={{
              placeholder: 'Email address',
            }}
            sx={{
              marginBottom: showPasswordField ? '15px' : '0px',
            }}
            control={methods.control}
          />
          <input hidden type={'password'} />
          {showPasswordField && (
            <CustomInput
              name={'password'}
              label={'Password'}
              control={methods.control}
              endAdornment={
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  // onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              inputProps={{
                type: showPassword ? 'text' : 'password',
              }}
            />
          )}
          <Button
            disabled={formSubmitted}
            type='submit'
            variant='contained'
            color='secondary'
            sx={{
              width: '100%',
              maxWidth: '432px',
              borderRadius: '4px',
              height: '44px',
              fontSize: '1.25rem',
              marginTop: '24px',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: 1.5,
                letterSpacing: '-0.5px',
                textTransform: 'none',
              }}
            >
              {formSubmitted ? 'Please wait' : 'Continue'}
            </Typography>
          </Button>
          {showPasswordField && (
            <Box sx={{ display: 'flex' }}>
              <Link
                onClick={navigateToForgotPassword}
                sx={{
                  mt: '26px',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  color: Color.priBlue,
                  lineHeight: 1.71,
                  letterSpacing: '-0.5px',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                Forgot password?
              </Link>
            </Box>
          )}
        </Box>
      </div>
    </OnBoardingLayout>
  );
};

export default LoginComponent;
