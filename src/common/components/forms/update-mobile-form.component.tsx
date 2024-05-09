/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { Box } from '@mui/material';

import { SecondryButton, PrimaryButton } from '../../styles';

import { MobileAutoCompleteComponent } from './mobile-autocomplete.component';

import { getCookie } from '../../utils/cookie';
import { USER_GROUP_LOWERCASE } from '../../interface';

type Props = {
  value: string;
  country: string;
  isSubmitting?: boolean;
  mobileExist: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;

  onOk?: (e: any) => void;
  onCancel?: () => void;
  onSubmit?: (e: any) => void;
  onInputChange?: (e: string) => void;
};

const UpdateMobileForm = (props: Props) => {
  const [value, setValue] = useState<string>(props.value);
  const [touch, setTouch] = useState<boolean>(false);

  const getMobileValue = touch === true ? value : props.country.concat(value);

  const onSubmitMobileHandle = (data: string) => {
    props.onSubmit && props.onSubmit(data);
  };

  return (
    <Box>
      <MobileAutoCompleteComponent
        mobileExist={props.mobileExist}
        country={props.country}
        setCountry={props.setCountry}
        value={value}
        onSubmit={onSubmitMobileHandle}
        onInputChange={(v) => {
          props.onInputChange && props.onInputChange(v);
          setValue(v);
          setTouch(true);
        }}
      />
      <Box sx={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
        {getCookie('x-client-type') === USER_GROUP_LOWERCASE.seller && <Box />}
        <Box sx={{ display: 'flex' }}>
          <SecondryButton onClick={props.onCancel}>Cancel</SecondryButton>
          <PrimaryButton
            disabled={props.isSubmitting}
            type='submit'
            sx={{ marginLeft: 2 }}
            onClick={() => props.onOk && props.onOk(getMobileValue)}
          >
            {props.isSubmitting ? 'Loading...' : getCookie('x-client-type') === USER_GROUP_LOWERCASE.seller ? 'Update' : 'Verify'}
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};
export default UpdateMobileForm;
