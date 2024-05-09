import React from 'react';
import { Grid } from '@mui/material';
import InputForm from '@/common/components/forms/input.form.tsx';
import SelectForm from '@/common/components/forms/select.form.tsx';
import { isEmpty, isNil } from 'lodash';
import useCountries from '@/common/utils/hooks/useCountries';
import { ICountrySelectInfo } from '@/common/interface/country-interface';

type componentPropType = {
  control: any;
  mainSelectedCountry: ICountrySelectInfo | undefined;
};

const SelectLocationComponent = ({ control, mainSelectedCountry }: componentPropType) => {
  const {
    selectedCountry,
    selectedState,
    countries,
    states,
    cities,
    setState: setCountryState,
  } = useCountries({
    city: undefined,
    state: undefined,
    country: mainSelectedCountry ? mainSelectedCountry.name : 'Singapore',
  });

  return (
    <Grid container columnSpacing={'16px'} rowSpacing={'8px'} sx={{ marginBlock: '1em' }}>
      <Grid item xs={12} md={6}>
        <SelectForm
          isDisabled={isNil(countries)}
          items={countries?.map((e) => ({ label: e.name, value: e.name, option: e })) ?? []}
          label={'Country'}
          defaultValue={'Singapore'}
          name={'country'}
          control={control}
          placeholder={'Select country'}
          onChange={(value, option) => {
            setCountryState({ selectedCountry: option, selectedState: null, selectedCity: null });
            // setValue('data.profile.detail.location.country', option?.name ?? '');
            // setValue('data.profile.detail.location.state', undefined);
            // setValue('data.profile.detail.location.city', undefined);
          }}
          boxSx={{
            '.MuiOutlinedInput-notchedOutline': {
              border: '1px solid #EAEAEA',
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SelectForm
          isDisabled={isNil(states) || !selectedCountry || isEmpty(states)}
          label={'State/Province'}
          name={'state'}
          control={control}
          items={
            states && !!selectedCountry
              ? states.map((e) => ({
                  label: e.name,
                  value: e.state_code,
                  option: e,
                }))
              : []
          }
          placeholder={'Select state or province'}
          onChange={(value, option) => {
            setCountryState({ selectedState: option, selectedCity: null });
          }}
          boxSx={{
            '.MuiOutlinedInput-notchedOutline': {
              border: '1px solid #EAEAEA',
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SelectForm
          isDisabled={isNil(cities) || !selectedState || isEmpty(cities) || isEmpty(states)}
          label={'City'}
          name={'city'}
          control={control}
          items={cities && !!selectedState ? cities.map((e) => ({ label: e.name, value: e.name, option: e })) : []}
          placeholder={'Select city'}
          onChange={(value, option) => {
            setCountryState({ selectedCity: option });
          }}
          boxSx={{
            '.MuiOutlinedInput-notchedOutline': {
              border: '1px solid #EAEAEA',
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputForm
          label={'Postal code'}
          name={'postalCode'}
          control={control}
          sx={{
            '.MuiOutlinedInput-notchedOutline': {
              border: '1px solid #EAEAEA',
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SelectLocationComponent;
