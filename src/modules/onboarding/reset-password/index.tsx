import { Box, Button, FormControl, FormLabel, IconButton, OutlinedInput, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import React, { useState } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';

import { isEmpty, isUndefined } from 'lodash';

import { Color } from '../../../theme';

import { showToast, ToastTypes } from '@/common/utils';

import { changePassword, ResetPasswordType } from '@/common/utils/schema/reset-password.schema';

import { useAppDispatch } from '@/redux/hooks';

import { useResetPasswordMutation } from '@/redux/apis/authApi';

import { updateUserInfo, userValidUpdated } from '@/redux/reducers/authReducers';

import OnBoardingLayout from '../components/onboarding-layout';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { ObjectValues } from '@/common/interface';

const Hints = {
  character: 'CHARACTER',
  number: 'NUMBER',
  uppercase: 'UPPERCASE',
  lowercase: 'LOWERCASE',
  special: 'SPECIAL',
} as const;

type HINT_OPTIONS = ObjectValues<typeof Hints>;

const UserResetPassword = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [resetPassword, errors] = useResetPasswordMutation();
  const [search] = useSearchParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isUndefined(errors)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = errors.error as any;

      if (message?.status === 'FETCH_ERROR') {
        showToast('No internet connection', ToastTypes.ERROR);
      } else {
        showToast(message?.data?.error?.message, ToastTypes.ERROR);
      }
    }
  }, [errors, dispatch]);

  const passwordForm = useForm<ResetPasswordType>({
    resolver: yupResolver(changePassword),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, setValue, formState } = passwordForm;

  const _tokenReq = search.get('token');

  const submitRequest: SubmitHandler<ResetPasswordType> = async (formData) => {
    const { newPassword, newPasswordConfirmation } = formData;

    if (!isEmpty(newPassword) && !isEmpty(newPasswordConfirmation)) {
      const res: any = await resetPassword({
        token: _tokenReq,
        newPassword,
        newPasswordConfirmation,
      });

      if ('data' in res) {
        const { jwt, user } = res.data;
        dispatch(userValidUpdated({ isValid: true }));
        if (!isEmpty(jwt) && !isEmpty(user)) {
          dispatch(updateUserInfo({ user: { ...user }, token: jwt, reset: true }));
          localStorage.setItem('requestPassword', JSON.stringify(true));
          showToast('Your password has been successfully updated!', ToastTypes.SUCCESS);
          navigate('/login');
        }
      } else {
        dispatch(userValidUpdated({ isValid: false }));
      }
    }
  };

  const renderPasswordHint = (option: HINT_OPTIONS, value: string) => {
    const hints_text = {
      CHARACTER: 'At least 8 characters',
      NUMBER: 'At least number',
      UPPERCASE: 'At least 1 upper character',
      LOWERCASE: 'At least 1 lowercase character',
      SPECIAL: 'At least 1 symbol',
    };
    const checkRegex = () => {
      switch (option) {
        case Hints.character:
          return value.length >= 8;
        case Hints.lowercase:
          return /(?=.*[a-z])/.test(value);
        case Hints.uppercase:
          return /(?=.*[A-Z])/.test(value);
        case Hints.number:
          return /(?=.*\d)/.test(value);
        case Hints.special:
          return /\W|_/.test(value);
      }
    };

    return (
      <Box sx={{ color: checkRegex() ? Color.green : Color.textGray7E, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ fontSize: 16, marginRight: '10px' }}>
          <IoCheckmarkCircleOutline />
        </Box>
        <Typography component={'span'}>{hints_text[option]}</Typography>
      </Box>
    );
  };

  return (
    <OnBoardingLayout title='Create a new password'>
      <Box component='form' onSubmit={handleSubmit(submitRequest)} sx={{ padding: '46px' }}>
        <Box>
          <Controller
            control={control}
            name='newPassword'
            defaultValue=''
            render={({ field }) => {
              setValue('newPasswordConfirmation', field.value);
              return (
                <Box sx={{ width: '100%' }}>
                  <FormControl
                    error={false}
                    sx={{
                      width: '100%',
                      '& label.Mui-focused': {
                        color: 'inherit',
                      },
                      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid rgba(0, 0, 0, 0.87)!important',
                      },
                      '& .MuiOutlinedInput-root': {
                        border: formState.errors.newPassword ? '1px solid red !important' : 'inhert',
                      },
                    }}
                  >
                    <FormLabel
                      htmlFor='newPassword'
                      sx={{
                        color: '#000000',
                        mb: '8px',
                        fontWeight: 600,
                        fontSize: '14px',
                        '&.Mui-disabled': {
                          color: 'black',
                        },
                      }}
                    >
                      New password
                    </FormLabel>
                    <OutlinedInput
                      sx={{
                        height: '44px',
                        '& fieldset': {
                          top: 0,
                          '& legend': { display: 'none' },
                        },

                        '& > .MuiInputBase-input': {
                          padding: '10px 16px',
                        },
                      }}
                      {...field}
                      placeholder='New password'
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
                  </FormControl>
                  <Box>
                    <Typography sx={{ color: Color.textGray7E, fontWeight: '600', marginY: '16px', fontSize: '12px' }}>
                      Password must contain:
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Box>
                        {renderPasswordHint(Hints.character, field.value)}
                        {renderPasswordHint(Hints.uppercase, field.value)}
                        {renderPasswordHint(Hints.lowercase, field.value)}
                      </Box>
                      <Box>
                        {renderPasswordHint(Hints.number, field.value)}
                        {renderPasswordHint(Hints.special, field.value)}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '26px',
          }}
        >
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            sx={{
              width: '100%',
              borderRadius: '4px',
              height: '44px',
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
              {formState.isSubmitting ? 'Please Wait...' : 'Reset password'}
            </Typography>
          </Button>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
};

export default UserResetPassword;
