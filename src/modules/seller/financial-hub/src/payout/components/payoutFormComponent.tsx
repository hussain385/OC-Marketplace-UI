import React, { useCallback, useEffect, useMemo } from 'react';
import { MainFormContainer } from './addForm.styles';
import { Box, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGetKeyStatusQuery } from '../../../../../../redux/apis/transactionApi';
import InputForm from '../../../../../../common/components/forms/input.form';
import { PrimaryButton, SecondryButton } from '../../../../../../common/styles';
import { useSetState } from 'react-use';
import PhoneForm from '../../../../../../common/components/forms/phone.form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectForm from '../../../../../../common/components/forms/select.form';
import useCountryValue from '../../../../../../common/utils/hooks/useCountryValue';
import InfoFormComponent from './infoForm.component';
import { useAppSelector } from '../../../../../../redux/hooks';
import { RenderIf } from '../../../../../../common/components';
import { companyProfiles } from '../../../../../../common/interface/busines-company-profile-interface';
import PatternInputForm from '../../../../../../common/components/forms/pattern-input.form';
import useCountries from '@/common/utils/hooks/useCountries';
import { isEmpty, isNil } from 'lodash';

const payoutSchema = (isIndividual: boolean) =>
  yup.object({
    id: yup.string(),
    bankName: yup.string().required('Please select a bank name from the list'),
    companyName: isIndividual ? yup.string() : yup.string().required('This filed can not be empty'),
    bankAccountUsername: yup
      .string()
      .required('This filed can not be empty')
      .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, {
        message: 'Invalid format. Please use only letters',
      }),
    bankAccountNumber: yup
      .string()
      .required('This filed can not be empty')
      .matches(/^\d+$/, { message: 'Invalid format. Please use only numbers' }),
    contactEmail: yup
      .string()
      .email('Invalid format. Please enter a valid email address')
      .required('This filed can not be empty'),
    bankCode: yup.string().required(),
    companyRegistrationId: isIndividual
      ? yup.string()
      : yup
          .string()
          .required('This filed can not be empty')
          .matches(/^[a-zA-Z0-9_]*$/, { message: 'Invalid format. Please use alphabet and numbers only' }),
    contactMobile: yup.number().typeError('Invalid format. Please use only numbers').required('This filed can not be empty'),
    contactMobileCountryCode: yup.string().required('This filed can not be empty'),
    location: yup.object({
      country: yup.string(),
      state: yup.string(),
      city: yup.string(),
      streetAddress: yup.string().required('This filed can not be empty'),
      postalCode: yup
        .string()
        .matches(/^\d+$/, { message: 'Invalid format. Please use only numbers' })
        .required('This filed can not be empty'),
    }),
  });

export type PayoutFormType = yup.InferType<ReturnType<typeof payoutSchema>>;

interface IProps {
  defaultValues?: PayoutFormType;
  isView?: boolean;
  onCancelOrDelete?: () => void;
  isUpdate?: boolean;
}

function PayoutFormComponent({ defaultValues, isView, onCancelOrDelete, isUpdate }: IProps) {
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const isIndividual = useMemo(
    () => selectedEntity?.profile.type.includes(companyProfiles.individual),
    [selectedEntity?.profile.type],
  );
  const { data: bankData } = useGetKeyStatusQuery({ filter: ['type||eq||banks'] });

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(payoutSchema(!!isIndividual)),
    defaultValues: {
      companyName: selectedEntity?.profile.detail.name,
      companyRegistrationId: selectedEntity?.profile.detail.registrationId,
      ...defaultValues,
      location: {
        country: defaultValues?.location?.country ?? 'Singapore',
        ...defaultValues?.location,
      },
    },
  });

  const [{ isInfo, data }, setState] = useSetState({
    isInfo: false,
    data: {} as PayoutFormType,
  });

  const { country, countryName, setCountryName, setCountry } = useCountryValue();

  const {
    selectedCountry,
    selectedState,
    countries,
    states,
    cities,
    setState: setCountryState,
  } = useCountries({
    ...defaultValues?.location,
    country: defaultValues?.location?.country ?? 'Singapore',
  });

  useEffect(() => {
    setValue('contactMobileCountryCode', country);
  }, [country, setValue]);

  useEffect(() => {
    setCountry(defaultValues?.contactMobileCountryCode ?? '+65');
  }, [defaultValues?.contactMobileCountryCode, setCountry]);

  const onSubmit: SubmitHandler<PayoutFormType> = useCallback(
    (data) => {
      setState({ data, isInfo: true });
    },
    [setState],
  );

  const bodyRender = useCallback(
    () => (
      <>
        <Box className={'head-container'}>
          <Typography className={'head'}>Bank account details</Typography>
          <Typography className={'sub'}>Your local bank account to withdraw your earnings in SGD</Typography>
        </Box>

        <Box className={'form-row'}>
          <SelectForm
            isDisabled={isView}
            control={control}
            name={'bankName'}
            label={'Bank name (Singapore)'}
            items={bankData?.data?.map((e) => ({ label: e.text, value: e.text, option: e })) ?? []}
            placeholder='Select bank name'
            onChange={(value, option) => setValue('bankCode', option?.code ?? '')}
          />
          <InputForm
            isDisabled
            control={control}
            name={'bankCode'}
            label={'Bank code'}
            inputProps={{ placeholder: 'Ex:9102031012', sx: { background: '#F6F6F6' } }}
          />
        </Box>

        <RenderIf value={!isIndividual}>
          <Box className={'form-row'}>
            <InputForm
              isDisabled={isView}
              control={control}
              name={'companyName'}
              label={'Company name'}
              inputProps={{
                placeholder: 'Ex:Venture Haven Corp',
              }}
            />
            <InputForm
              isDisabled={isView}
              control={control}
              name={'companyRegistrationId'}
              label={'Company registration number (CRN)'}
              inputProps={{ placeholder: 'Ex:0543199821' }}
            />
          </Box>
        </RenderIf>

        <InputForm
          isDisabled={isView}
          control={control}
          name={'bankAccountUsername'}
          label={'Account holder name'}
          inputProps={{ placeholder: 'Ex:John Smith' }}
        />
        <PatternInputForm
          isDisabled={isView}
          control={control}
          name={'bankAccountNumber'}
          label={'Account number'}
          inputProps={{ placeholder: 'Ex:910 203 101 2' }}
          format={'### ### ### ###'}
        />

        <Typography className={'sub-head'}>Account holder&apos;s details</Typography>

        <InputForm
          isDisabled={isView}
          control={control}
          name={'location.streetAddress'}
          label={'Street address'}
          inputProps={{ type: 'address', placeholder: 'Ex: 123 A street, Apt 11' }}
        />

        <Box className={'form-row'}>
          <SelectForm
            isDisabled={isView || isNil(countries)}
            control={control}
            name={'location.country'}
            label={'Country'}
            items={countries?.map((e) => ({ label: e.name, value: e.name, option: e })) ?? []}
            placeholder='Select country'
            onChange={(value, option) => {
              setCountryState({ selectedCountry: option, selectedState: null, selectedCity: null });
              setValue('location.country', option?.name ?? '');
              setValue('location.state', undefined);
              setValue('location.city', '');
            }}
          />

          <SelectForm
            isDisabled={isView || isNil(states) || !selectedCountry || isEmpty(states)}
            control={control}
            name={'location.state'}
            label={'State/Province'}
            items={
              states && !!selectedCountry
                ? states.map((e) => ({
                    label: e.name,
                    value: e.name,
                    option: e,
                  }))
                : []
            }
            placeholder='Select state or province'
            onChange={(value, option) => {
              setCountryState({ selectedState: option, selectedCity: null });
              setValue('location.state', option?.name ?? '');
              setValue('location.city', '');
            }}
          />
        </Box>

        <Box className={'form-row'}>
          <SelectForm
            isDisabled={isView || isNil(cities) || !selectedState || isEmpty(cities) || isEmpty(states)}
            control={control}
            name={'location.city'}
            label={'City'}
            items={cities && !!selectedState ? cities.map((e) => ({ label: e.name, value: e.name, option: e })) : []}
            placeholder='Select city'
            onChange={(value, option) => {
              setCountryState({ selectedCity: option });
              setValue('location.city', option?.name ?? '');
            }}
          />

          <InputForm
            isDisabled={isView}
            control={control}
            name={'location.postalCode'}
            label={'Postal code'}
            inputProps={{ type: 'number', placeholder: 'Ex: 123456' }}
          />
        </Box>

        <Box className={'form-row'}>
          <InputForm
            isDisabled={isView}
            control={control}
            name={'contactEmail'}
            label={'Email address'}
            inputProps={{ type: 'email', placeholder: 'Ex:John.smth@gmail.com' }}
          />
          <PhoneForm
            isDisabled={isView}
            control={control}
            name={'contactMobile'}
            label={'Phone number'}
            inputProps={{ placeholder: 'Ex:0543199821' }}
            country={country}
            countryName={countryName}
            setCountryName={setCountryName}
            setCountry={setCountry}
          />
        </Box>
      </>
    ),
    [
      bankData?.data,
      cities,
      control,
      countries,
      country,
      countryName,
      isIndividual,
      isView,
      selectedCountry,
      selectedState,
      setCountry,
      setCountryName,
      setCountryState,
      setValue,
      states,
    ],
  );

  if (isInfo) {
    return <InfoFormComponent data={data} onEdit={() => setState({ isInfo: false })} isUpdate={!!isUpdate} />;
  }

  if (isView) {
    return <MainFormContainer sx={{ border: 'none', margin: 0, padding: 0 }}>{bodyRender()}</MainFormContainer>;
  }

  return (
    <MainFormContainer as={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ padding: { xs: '24px 16px', sm: '40px 56px' } }}>
      {bodyRender()}

      <Box className={'btn-container'}>
        <SecondryButton
          sx={{ padding: '8px 32px', color: '#7E7E7E', bgcolor: 'transparent', ':hover': { bgcolor: 'transparent' } }}
          disableRipple
          onClick={onCancelOrDelete}
        >
          Cancel
        </SecondryButton>

        <PrimaryButton type={'submit'} sx={{ padding: '8px 32px' }}>
          {isUpdate ? 'Update' : 'Add bank account'}
        </PrimaryButton>
      </Box>
    </MainFormContainer>
  );
}

export default PayoutFormComponent;
