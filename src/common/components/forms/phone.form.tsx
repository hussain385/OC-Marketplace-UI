import React, { useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Box, FormControl, FormHelperText, FormLabel, InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
import { Color } from '../../../theme';
import { ButtonDrop } from '../../styles';
import { ReactComponent as ArrowDown } from '../../../assets/icons/ic-arrow-down.svg';
import PhoneAutoComplete from './phone-autocomplete.component';

type IProps<T extends FieldValues> = {
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  inputProps?: OutlinedInputProps;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setCountryName: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  countryName: string;
} & UseControllerProps<T>;

const PhoneForm = <T extends FieldValues>({
  label,
  isDisabled,
  isRequired,
  inputProps,
  country,
  countryName,
  setCountryName,
  setCountry,
  ...control
}: IProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(control);
  const [open, setOpen] = useState(false);

  return (
    <FormControl
      fullWidth
      error={!!error}
      required={isRequired}
      disabled={isDisabled}
      sx={{
        '& label.Mui-focused': {
          color: 'inherit',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid rgba(0, 0, 0, 0.87)!important',
        },
      }}
    >
      {label && (
        <FormLabel
          htmlFor={field.name}
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
          {label}
        </FormLabel>
      )}
      <OutlinedInput
        fullWidth
        {...inputProps}
        id={field.name}
        type={'tel'}
        startAdornment={
          <InputAdornment
            sx={{
              display: 'flex',
            }}
            position='start'
          >
            <ButtonDrop
              disabled={isDisabled}
              type='button'
              rowCenter='center'
              columnCenter={'center'}
              display={'flex'}
              onClick={() => setOpen(true)}
            >
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: 1.71,
                  letterSpacing: '-0.5px',
                }}
              >
                {country}
              </span>
              <ArrowDown style={{ marginLeft: '8px' }} />
            </ButtonDrop>
          </InputAdornment>
        }
        sx={{
          height: '44px',
          backgroundColor: isDisabled ? Color.bgGreyLight : undefined,

          '& fieldset': {
            top: 0,
            '& legend': { display: 'none' },
          },

          '& > .MuiInputBase-input': {
            padding: '10px',
          },
          ...inputProps?.sx,
        }}
        {...field}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
      <Box sx={{ mt: '10px' }}>
        <PhoneAutoComplete
          open={open}
          setOpen={setOpen}
          setCountry={setCountry}
          country={country}
          countryName={countryName}
          setCountryName={setCountryName}
        />
      </Box>
    </FormControl>
  );
};

export default PhoneForm;
