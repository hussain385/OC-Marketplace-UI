import React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  FormLabel,
  OutlinedInputProps,
  RadioGroup,
  RadioGroupProps,
  SxProps,
  Typography,
} from '@mui/material';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import BpRadio from '@/common/components/bp-radio.component.tsx';

interface items<T> {
  label: string;
  value: string;
  options?: T;
}

type IProps<T extends FieldValues, TItems> = {
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  inputProps?: OutlinedInputProps;
  isHidden?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  sx?: SxProps;
  labelSx?: SxProps;
  radioGroupProps?: Omit<RadioGroupProps, 'onChange' | 'value' | 'ref' | 'onBlur'>;
  itemLabelProps?: Omit<FormControlLabelProps, 'value'>;
  items: items<TItems>[];
  radioIcon?: React.ReactNode;
} & UseControllerProps<T>;

function RatioForm<T extends FieldValues, TItems>({
  label,
  isDisabled,
  isRequired,
  inputProps,
  isHidden,
  endAdornment,
  startAdornment,
  sx,
  labelSx,
  radioGroupProps,
  items,
  itemLabelProps,
  ...control
}: IProps<T, TItems>) {
  const {
    field,
    fieldState: { error },
  } = useController(control);

  return (
    <Box>
      <FormControl fullWidth error={!!error} hidden={isHidden} required={isRequired} disabled={isDisabled} sx={sx}>
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
              ...labelSx,
            }}
          >
            {label}
          </FormLabel>
        )}
        <RadioGroup {...radioGroupProps} {...field}>
          {items.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<BpRadio />}
              label={
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: 1.71,
                    letterSpacing: '-0.5px',
                  }}
                >
                  {item.label}
                </Typography>
              }
              {...itemLabelProps}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {error && <FormHelperText sx={{ color: 'red' }}>{error.message}</FormHelperText>}
    </Box>
  );
}

export default RatioForm;
