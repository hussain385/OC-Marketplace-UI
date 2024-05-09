import React, { useCallback, useEffect } from 'react';
import { Box, InputAdornment, Typography } from '@mui/material';
import Modal from '@/common/components/modal.component.tsx';
import { useUpdateUserMutation } from '@/redux/apis/accountApi.ts';
import { useSetState } from 'react-use';
import { useChangePasswordMutation, useVerifyOtpCodeMutation } from '@/redux/apis/authApi.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputForm from '@/common/components/forms/input.form.tsx';
import {
  fullNameSchema,
  fullNameSchemaType,
  mobileSchema,
  mobileSchemaType,
  passwordSchema,
  passwordSchemaType,
} from '@/modules/setting/Schema';
import PhoneForm from '@/common/components/forms/phone.form.tsx';
import useCountryValue from '@/common/utils/hooks/useCountryValue.tsx';
import OtpModalComponent from '@/modules/seller/financial-hub/src/components/OtpModal.component.tsx';

interface IFullNameModal {
  value?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FullNameModal({ value, isOpen, onClose }: IFullNameModal) {
  const [Update, { isLoading }] = useUpdateUserMutation();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(fullNameSchema),
    defaultValues: {
      name: value ?? '',
    },
  });

  const onSubmit: SubmitHandler<fullNameSchemaType> = useCallback(
    (data) => {
      Update({
        data,
      })
        .unwrap()
        .then(onClose);
    },
    [Update, onClose],
  );

  return (
    <Modal
      isBottomSheet
      maxWidth={'md'}
      content={
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Update full name</Typography>
          <Typography sx={{ color: '#7A7A7A', fontWeight: 400, fontSize: '12px' }}>Your full name on your ID</Typography>
          <InputForm
            sx={{
              mt: '8px',
              mb: '24px',
            }}
            name={'name'}
            control={control}
          />
        </Box>
      }
      isOpen={isOpen}
      okBtnLabel={'Update'}
      isLoading={isLoading}
      onCancel={onClose}
      footerSx={{
        alignItems: 'center',
      }}
      extraFooter={<div />}
      isForm
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

interface IMobileModal {
  mobile?: string;
  contactMobileCountryCode?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileModal({ mobile, isOpen, onClose, contactMobileCountryCode }: IMobileModal) {
  const [Update, { isLoading }] = useUpdateUserMutation();
  const [VerifyOtp, { isLoading: verifyLoading }] = useVerifyOtpCodeMutation();
  const [{ isOtp, newMobile }, setState] = useSetState({
    isOtp: false,
    newMobile: '',
  });
  const { control, handleSubmit, setValue } = useForm<mobileSchemaType>({
    resolver: yupResolver(mobileSchema),
    defaultValues: {
      contactMobile: mobile ? Number(mobile.replace(contactMobileCountryCode ?? '+65', '')) : undefined,
      contactMobileCountryCode: contactMobileCountryCode ?? '+65',
    },
  });
  const { country, countryName, setCountryName, setCountry } = useCountryValue();

  const onSubmit: SubmitHandler<mobileSchemaType> = useCallback(
    (data) => {
      setState({ isOtp: true, newMobile: data.contactMobileCountryCode + data.contactMobile });
    },
    [setState],
  );

  const onVerifyOtp = useCallback(
    async (otp: string) => {
      if (import.meta.env.VITE_ENVIRONMENT !== 'develop') {
        await VerifyOtp({ code: otp, mobile: newMobile }).unwrap();
      }

      setState({ isOtp: false });
      Update({
        data: {
          mobile: newMobile,
          mobileCountryCode: country,
        },
      })
        .unwrap()
        .then(onClose);
    },
    [Update, VerifyOtp, country, newMobile, onClose, setState],
  );

  useEffect(() => {
    setValue('contactMobileCountryCode', country);
  }, [country, setValue]);

  useEffect(() => {
    setCountry(contactMobileCountryCode ?? '+65');
  }, [contactMobileCountryCode, setCountry]);

  return (
    <>
      <Modal
        isBottomSheet
        maxWidth={'md'}
        content={
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Update mobile number</Typography>
            <Typography sx={{ color: '#7A7A7A', fontWeight: 400, fontSize: '12px', mb: '8px' }}>
              To change the mobile number associated with your account, you&apos;ll need to verify it in the next step
            </Typography>
            <PhoneForm
              name={'contactMobile'}
              control={control}
              country={country}
              countryName={countryName}
              setCountryName={setCountryName}
              setCountry={setCountry}
            />
          </Box>
        }
        isOpen={isOpen}
        okBtnLabel={'Update'}
        isLoading={isLoading}
        onCancel={onClose}
        footerSx={{
          alignItems: 'center',
        }}
        extraFooter={<div />}
        isForm
        onSubmit={handleSubmit(onSubmit)}
      />
      <OtpModalComponent
        isOpen={isOtp}
        onClose={() => setState({ isOtp: false })}
        countryCode={country}
        mobile={newMobile}
        onVerifyOtp={onVerifyOtp}
        preText={''}
        isLoading={verifyLoading}
      />
    </>
  );
}

export function PasswordModal({ isOpen, onClose }: IFullNameModal) {
  const [ChangePassword, { isLoading }] = useChangePasswordMutation();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(passwordSchema),
  });
  const [{ showCurr, showPass, showConfirm }, setState] = useSetState({
    showCurr: false,
    showPass: false,
    showConfirm: false,
  });

  const onSubmit: SubmitHandler<passwordSchemaType> = useCallback(
    (data) => {
      ChangePassword(data).unwrap().then(onClose);
    },
    [ChangePassword, onClose],
  );

  return (
    <Modal
      isBottomSheet
      maxWidth={'md'}
      onSubmit={handleSubmit(onSubmit)}
      content={
        <Box sx={{ mb: '20px' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: '16px' }}>Update your password</Typography>
          <Box sx={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
            <InputForm
              name={'currentPassword'}
              control={control}
              inputProps={{
                placeholder: 'Current password',
                type: showCurr ? 'text' : 'password',
              }}
              endAdornment={
                <InputAdornment
                  position={'end'}
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      showCurr: !prevState.showCurr,
                    }))
                  }
                >
                  <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>show</Typography>
                </InputAdornment>
              }
            />
            <Box>
              <InputForm
                name={'newPassword'}
                control={control}
                inputProps={{
                  placeholder: 'New password',
                  type: showPass ? 'text' : 'password',
                }}
                endAdornment={
                  <InputAdornment
                    position={'end'}
                    sx={{ cursor: 'pointer' }}
                    onClick={() =>
                      setState((prevState) => ({
                        ...prevState,
                        showPass: !prevState.showPass,
                      }))
                    }
                  >
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>show</Typography>
                  </InputAdornment>
                }
              />
              <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#7A7A7A', mt: '8px', lineHeight: '16.2px' }}>
                At least 8 characters in length
                <br />
                At least one upper and one lower case letter
                <br />
                At least one number
              </Typography>
            </Box>

            <InputForm
              name={'newPasswordConfirmation'}
              control={control}
              inputProps={{
                placeholder: 'Confirm password',
                type: showConfirm ? 'text' : 'password',
              }}
              endAdornment={
                <InputAdornment
                  position={'end'}
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      showConfirm: !prevState.showConfirm,
                    }))
                  }
                >
                  <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>show</Typography>
                </InputAdornment>
              }
            />
          </Box>
        </Box>
      }
      isOpen={isOpen}
      okBtnLabel={'Update'}
      isLoading={isLoading}
      onCancel={onClose}
      footerSx={{
        alignItems: 'center',
      }}
      extraFooter={<div />}
      isForm
    />
  );
}
