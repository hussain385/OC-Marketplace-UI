// @flow
import React from 'react';
import { Box, FormHelperText, Input, Typography } from '@mui/material';
import { AppThemeBtnComponent } from '../../../common/components/app-theme-btn.component';
import { Color } from '../../../theme';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { SkipAlertComponent } from '../components/skip-alert.component';
import { identityUserInfoTempDataUpdated } from '../../../redux/reducers/authReducers';

type Props = {
  step: number;
  setStep: (step: number) => void;
  setOrganisationName: (name: string) => void;
  defaultValue?: string;
};

const organisationInputValidation = object().shape({
  organisationName: string()
    .min(1, 'Must contain at least 1 character(s)')
    .max(255, 'Character(s) should be less then 255')
    .required('This field is required.'),
});

export const OrganisationInputView = ({ step, setStep, setOrganisationName, defaultValue }: Props) => {
  const {
    useInfo: { verifying_status },
  } = useAppSelector((state) => state.mainState);
  const dispatch = useAppDispatch();
  const method = useForm<any>({
    resolver: yupResolver(organisationInputValidation),
    defaultValues: {
      organisationName: defaultValue ?? '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = method;

  const onSubmitHandler = async (values: any) => {
    setOrganisationName(values.organisationName);
    dispatch(
      identityUserInfoTempDataUpdated({
        ...verifying_status,
        isSubmittingValues: undefined,
        dataUrl: undefined,
        companyInfo: { ...verifying_status?.companyInfo, companyName: values.organisationName },
      }),
    );
    setStep(step + 1);
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Typography sx={{ fontSize: '16px !important', marginBottom: '5px', fontWeight: '600' }}>
          What’s your organisation name?
        </Typography>
        <Typography sx={{ fontSize: '14px !important', marginBottom: '5px', fontWeight: '400' }}>
          Providing your organisation name will help service providers know who they&apos;re transacting with
        </Typography>
        <Controller
          control={control}
          name={'organisationName'}
          render={({ field }) => (
            <Input
              {...field}
              fullWidth
              type='text'
              disableUnderline
              placeholder={'Enter organisation name'}
              style={{
                paddingInline: '16px',
                border: errors['organisationName']?.message ? `1px solid ${Color.negative}` : `1px solid ${Color.bgLine}`,
                height: '44px',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          )}
        />
        <FormHelperText sx={{ margin: 0, mt: 0 }} error={!!errors['organisationName']}>
          <span
            style={{
              color: Color.negative,
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            {errors['organisationName'] && errors['organisationName']?.message !== ('Expected string, received function' as never)
              ? (errors['organisationName']?.message as never)
              : ''}
          </span>
        </FormHelperText>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-between', marginTop: '2em' }}>
          <SkipAlertComponent />
          <AppThemeBtnComponent
            type={'submit'}
            hover={'#1b39a2'}
            color={isSubmitting ? '#333333' : 'white'}
            backgroundColor={isSubmitting ? Color.bgGreyDark : Color.priBlue}
            width={'42%'}
            text={'Create organisation'}
            customButtonStyle={{ display: 'block' }}
          />
        </Box>

        <Box sx={{ display: { xs: 'flex', sm: 'none' }, position: 'fixed', bottom: 0, width: '100%', left: 0, right: 0 }}>
          <SkipAlertComponent
            buttonSx={{ width: '50%', height: '50px', borderRadius: 0, border: 0, borderTop: '1px solid #EAEAEA', m: 0 }}
          />
          <AppThemeBtnComponent
            type={'submit'}
            hover={'#1b39a2'}
            color={isSubmitting ? '#333333' : 'white'}
            backgroundColor={isSubmitting ? Color.bgGreyDark : Color.priBlue}
            width={'50%'}
            text={'Create organisation'}
            customButtonStyle={{ display: 'block', height: '50px', borderRadius: 0, border: 0 }}
          />
        </Box>
      </form>
    </FormProvider>
  );
};
