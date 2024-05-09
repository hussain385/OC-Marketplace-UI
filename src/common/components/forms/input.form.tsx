import React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { FormControl, FormHelperText, FormLabel, OutlinedInput, OutlinedInputProps, SxProps } from '@mui/material';
import { Color } from '../../../theme';

type IProps<T extends FieldValues> = {
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  inputProps?: OutlinedInputProps;
  isHidden?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  sx?: SxProps;
  labelSx?: SxProps;
  renderLabel?: React.ReactNode;
} & UseControllerProps<T>;

const InputForm = <T extends FieldValues>({
  label,
  isDisabled,
  isRequired,
  inputProps,
  isHidden,
  endAdornment,
  startAdornment,
  sx,
  labelSx,
  renderLabel,
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
        ...sx,
      }}
    >
      {(label || renderLabel) && (
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
            ...labelSx,
          }}
        >
          {label ?? renderLabel}
        </FormLabel>
      )}
      <OutlinedInput
        fullWidth
        {...inputProps}
        id={field.name}
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
        endAdornment={endAdornment}
        startAdornment={startAdornment}
        {...field}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default InputForm;
