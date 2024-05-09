import React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { FormControl, FormHelperText, FormLabel, SxProps } from '@mui/material';
import { CalenderCustomHeader, CalenderCustomInput } from '@/modules/seller/account/company-profile/company-info.component.tsx';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { isNumber } from 'lodash';
import { Color } from '@/theme.ts';

type IProps<T extends FieldValues> = {
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isHidden?: boolean;
  sx?: SxProps;
  labelSx?: SxProps;
  datePickerProps?: Omit<ReactDatePickerProps, 'onChange' | 'selected'>;
  renderLabel?: React.ReactNode;
} & UseControllerProps<T>;

const DatePickerYearForm = <T extends FieldValues>({
  label,
  isDisabled,
  isRequired,
  isHidden,
  datePickerProps,
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
      <DatePicker
        minDate={new Date(1800, 0, 1)}
        selected={!field.value ? undefined : isNumber(field.value) ? new Date(Number(field.value), 0, 1) : new Date(field.value)}
        renderCustomHeader={({ increaseYear, decreaseYear, date, nextYearButtonDisabled }) => (
          <CalenderCustomHeader
            increaseYear={increaseYear}
            decreaseYear={decreaseYear}
            date={date}
            nextYearButtonDisabled={nextYearButtonDisabled}
          />
        )}
        onChange={(date) => {
          field.onChange(date?.getFullYear());
        }}
        filterDate={(date) => {
          return !(date > new Date());
        }}
        yearItemNumber={12}
        maxDate={new Date()}
        customInput={<CalenderCustomInput error={!!error} sx={{ borderColor: error ? Color.priRed : 'rgba(0, 0, 0, 0.23)' }} />}
        showYearPicker
        dateFormat='yyyy'
        {...datePickerProps}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default DatePickerYearForm;
