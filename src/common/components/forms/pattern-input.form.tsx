import React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { FormControl, FormHelperText, FormLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';
import { Color } from '../../../theme';
import { PatternFormat, PatternFormatProps } from 'react-number-format';

type IProps<T extends FieldValues> = {
  format: string;
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  inputProps?: Omit<PatternFormatProps<OutlinedInputProps>, 'format'>;
  isHidden?: boolean;
} & UseControllerProps<T>;

const PatternInputForm = <T extends FieldValues>({
  label,
  isDisabled,
  isRequired,
  inputProps,
  isHidden,
  format,
  ...control
}: IProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(control);

  return (
    <FormControl
      fullWidth
      error={!!error}
      hidden={isHidden}
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
      <PatternFormat
        format={format}
        customInput={OutlinedInput}
        fullWidth
        {...inputProps}
        id={field.name}
        inputRef={field.ref}
        value={field.value}
        onBlur={field.onBlur}
        onValueChange={(values) => field.onChange(values.value)}
        sx={{
          height: '44px',
          backgroundColor: isDisabled ? Color.bgGreyLight : undefined,

          '& fieldset': {
            top: 0,
            '& legend': { display: 'none' },
          },

          '& > .MuiInputBase-input': {
            padding: '10px 16px',
          },
          ...inputProps?.sx,
        }}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default PatternInputForm;
