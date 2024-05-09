import React from 'react';
import { ICountrySelectInfo } from '@/common/interface/country-interface';
import countryData from '@/mock/country-info.json';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Color } from '@/theme';

type componentPropType = {
  setSelectedCountry: React.Dispatch<React.SetStateAction<ICountrySelectInfo | undefined>>;
  selectedCountry: ICountrySelectInfo | undefined;
};

const AutoCompleteCountryDropDown = ({ setSelectedCountry, selectedCountry }: componentPropType) => {
  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      getOptionLabel={(country: ICountrySelectInfo) => `${country.flag} ${country.name}`}
      value={selectedCountry}
      onSelect={(val: any) => {
        if (countryData.find((data) => data.flag === val.target.value.split(' ')[0])) {
          setSelectedCountry(countryData.find((data) => data.flag === val.target.value.split(' ')[0]));
        }
      }}
      onChange={(val: any) => {
        if (countryData.find((data) => data.flag === val.target.value.split(' ')[0])) {
          setSelectedCountry(countryData.find((data) => data.flag === val.target.value.split(' ')[0]));
        }
      }}
      options={countryData.map((country) => ({ label: `${country.flag} ${country.name}`, ...country }))}
      sx={{ width: 300, marginTop: '2em', height: '3em', padding: 0 }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={'select country'}
          sx={{
            border: `1px solid ${Color.bgLine}`,
            borderRadius: '5px',
            width: '100%',
            height: '100%',
            outline: 'none',
            '& .MuiInputBase-root': {
              height: '100%',
              padding: '0px 9px !important',
            },
            '& .MuiOutlinedInput-root': {
              '& > fieldset': {
                border: 'none',
                borderRadius: '4px',
              },
            },
            '& .MuiOutlinedInput-root:hover': {
              '& > fieldset': {
                border: 'none',
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
              '& > fieldset': {
                borderColor: 'none',
                borderRadius: '4px',
              },
            },
          }}
        />
      )}
    />
  );
};

export default AutoCompleteCountryDropDown;
