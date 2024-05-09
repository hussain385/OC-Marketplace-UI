/* eslint-disable no-unused-vars */
import { isUndefined } from 'lodash';

import React, { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/material';

import { useAppSelector } from '../../../redux/hooks';

import useMobileCountry from '../../utils/hooks/useMobileCountry';

import MobileForm from './mobile-form';

import PhoneAutoComplete from './phone-autocomplete.component';

type Props = {
  value?: string;
  country: string;
  mobileExist?: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
  onSubmit?: (mobile: string) => void;
  onInputChange?: (e: string) => void;
};

const Schema = yup.object().shape({
  phone: yup.number().required('mobile number is required'),
});

export const MobileAutoCompleteComponent = (props: Props) => {
  const { open, phoneHandlerInput, setOpen } = useMobileCountry();
  const { user } = useAppSelector((state) => state.mainState.useInfo);

  const [countryName, setCountryName] = useState<string>(() => user?.countryName ?? 'Singapore');

  const _registerMethods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      phone: props.value,
    },
  });
  const { handleSubmit } = _registerMethods;

  const onSubmitHandle = (value: any) => {
    props.onSubmit && props.onSubmit(props.country.concat(value.phone as string));
  };

  const onKeupUpHandle = (value: string) => {
    const phone = props.country.concat(value);
    props.onInputChange && props.onInputChange(phone);
  };

  return (
    <FormProvider {..._registerMethods}>
      <Box sx={{ height: open ? '288px' : 'auto' }} component='form' onSubmit={handleSubmit(onSubmitHandle)}>
        <MobileForm
          name='phone'
          onClickHandler={phoneHandlerInput}
          countryNumber={props.country}
          countryName={countryName}
          getValuebyInput={!isUndefined(user?.mobile) ? user?.mobile : props.value}
          mobileErr={props.mobileExist}
          setMobileExist={() => ''}
          onKeyUp={(e) => {
            onKeupUpHandle(e.target.value);
          }}
        />
        <PhoneAutoComplete
          open={open}
          setOpen={setOpen}
          setCountry={props.setCountry}
          country={props.country}
          countryName={countryName}
          setCountryName={setCountryName}
        />
      </Box>
    </FormProvider>
  );
};
