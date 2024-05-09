/* eslint-disable no-unused-vars */
import { isEmpty, isUndefined } from 'lodash';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box, InputAdornment, Typography } from '@mui/material';

import React, { useState } from 'react';

import { confirmPasswordSchema } from '../../utils/schema/validation-schemas';

import { MuiInputField, MuiPlainInputField, PrimaryButton, SecondryButton, TextButton } from '../../styles';

import { PasswordFieldType } from '../../../modules/buyer/account/account-profile-update.service';

import { ErrorLabel } from '../../styles/common.styles';
import { useServerErrorMessage } from '../../utils/global_state.util';

type Props = {
  id: number;
  name: string;
  value?: string;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onOk?: () => void;
  onCancel?: () => void;
  onSubmit?: (e: PasswordFieldType) => void;
};

const cssClasses = {
  error: {
    color: '#ED5151',
  },
  success: {
    color: '#2CAF70',
  },
};

type TogglePassword = {
  [key: string]: boolean;
};

const PasswordForm = (props: Props) => {
  const [togglePassword, setTogglePassword] = useState<TogglePassword>({
    current: false,
    password: false,
    confirm: false,
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(confirmPasswordSchema),
    defaultValues: {
      password: '',
      currentpwd: '',
      confirmpwd: '',
    },
  });

  const [serverError] = useServerErrorMessage();

  const onSubmitHandler: SubmitHandler<PasswordFieldType> = (e) => {
    // const oldPassword = Decrypt(props.value);
    // if (e.currentpwd !== oldPassword) {
    //   setError('currentpwd', { type: 'focus', message: 'Password is incorrect' }, { shouldFocus: true });
    //   return;
    // }
    props.onSubmit && props.onSubmit(e);
  };

  const togglePasswordHandler = (key: string) => {
    setTogglePassword({
      ...togglePassword,
      [key]: !togglePassword[key],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Controller
        control={control}
        defaultValue=''
        name='currentpwd'
        render={({ field }) => {
          return (
            <>
              <Box sx={{ width: '100%', marginBottom: 2 }}>
                <MuiPlainInputField
                  {...field}
                  value={field.value}
                  type={togglePassword['current'] ? 'text' : 'password'}
                  placeholder='Current password'
                  // onChange={field.onChange}
                  onChange={(e) => {
                    field.onChange(e);
                    //setValue(props.name, e.target.value);
                    //props.onInputChange && props.onInputChange(e);
                  }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <TextButton variant='text' onClick={() => togglePasswordHandler('current')}>
                        {togglePassword['current'] ? 'Hide' : 'Show'}
                      </TextButton>
                    </InputAdornment>
                  }
                />
                <ErrorLabel>{errors.currentpwd?.message}</ErrorLabel>
                {!isEmpty(serverError) && <ErrorLabel>{serverError}</ErrorLabel>}
              </Box>
            </>
          );
        }}
      />
      <Controller
        control={control}
        name='password'
        defaultValue={''}
        render={({ field }) => {
          return (
            <>
              <Box sx={{ width: '100%', marginBottom: 2 }}>
                <MuiInputField
                  value={field.value}
                  type={togglePassword['password'] ? 'text' : 'password'}
                  placeholder='New password'
                  // onChange={field.onChange}
                  onChange={(e) => {
                    field.onChange(e);
                    //setValue(props.name, e.target.value);
                    //props.onInputChange && props.onInputChange(e);
                  }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <TextButton variant='text' onClick={() => togglePasswordHandler('password')}>
                        {togglePassword['password'] ? 'Hide' : 'Show'}
                      </TextButton>
                    </InputAdornment>
                  }
                />
                <Box sx={{ marginBottom: 2 }}>
                  <ErrorLabel>{errors.password?.message}</ErrorLabel>
                  <Typography
                    fontSize={'12px'}
                    sx={
                      errors.password && (field.value as string).length < 8
                        ? cssClasses.error
                        : (field.value as string).length >= 8
                          ? cssClasses.success
                          : null
                    }
                  >
                    At least 8 characters in length
                  </Typography>
                  <Typography
                    fontSize={'12px'}
                    sx={
                      /(?=.*[a-z])(?=.*[A-Z])/.test(field.value ?? '')
                        ? cssClasses.success
                        : !isUndefined(errors.password)
                          ? cssClasses.error
                          : null
                    }
                  >
                    At least one upper case and lower case letter
                  </Typography>
                  <Typography
                    fontSize={'12px'}
                    sx={
                      /(?=.*\d)/.test(field.value ?? '')
                        ? cssClasses.success
                        : !isUndefined(errors.password)
                          ? cssClasses.error
                          : null
                    }
                  >
                    At least one number
                  </Typography>
                </Box>
              </Box>
            </>
          );
        }}
      />
      <Controller
        control={control}
        name='confirmpwd'
        defaultValue=''
        render={({ field }) => {
          return (
            <>
              <Box sx={{ width: '100%', marginBottom: 2 }}>
                <MuiInputField
                  value={field.value}
                  type={togglePassword['confirm'] ? 'text' : 'password'}
                  placeholder='Confirm password'
                  // onChange={field.onChange}
                  onChange={(e) => {
                    field.onChange(e);
                    //setValue(props.name, e.target.value);
                    props.onInputChange && props.onInputChange(e);
                  }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <TextButton variant='text' onClick={() => togglePasswordHandler('confirm')}>
                        {togglePassword['confirm'] ? 'Hide' : 'Show'}
                      </TextButton>
                    </InputAdornment>
                  }
                />
                <ErrorLabel>{errors.confirmpwd?.message}</ErrorLabel>
              </Box>
            </>
          );
        }}
      />
      <Box sx={{ display: 'flex' }}>
        <SecondryButton onClick={props.onCancel}>Cancel</SecondryButton>
        <PrimaryButton disabled={isSubmitting} type='submit' sx={{ marginLeft: 2 }} onClick={props.onOk}>
          Update
        </PrimaryButton>
      </Box>
    </form>
  );
};
export default PasswordForm;
