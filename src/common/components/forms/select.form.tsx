import React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, SelectProps, SxProps } from '@mui/material';
import { Color } from '../../../theme';
import { ReactComponent as ArrowDown } from '../../../assets/icons/ic-arrow-down.svg';

interface Item<T> {
  value: string | number;
  label: string;
  option?: T;
}

type IProps<T extends FieldValues, I> = {
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isLoading?: boolean;
  selectProps?: SelectProps;
  placeholder?: string;
  items: Item<I>[];
  onChange?: (value: string | number, option?: I) => void;
  boxSx?: SxProps;
  labelSx?: SxProps;
} & UseControllerProps<T>;

const SelectForm = <T extends FieldValues, I>({
  label,
  isDisabled,
  isRequired,
  selectProps,
  items,
  placeholder,
  onChange,
  boxSx,
  labelSx,
  isLoading,
  ...control
}: IProps<T, I>) => {
  const {
    field,
    fieldState: { error },
  } = useController(control);

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
        '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
          border: '1px solid var(--line, #EAEAEA)',
        },
        ...boxSx,
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
            ...labelSx,
          }}
        >
          {label}
        </FormLabel>
      )}
      <Select
        fullWidth
        {...selectProps}
        id={field.name}
        IconComponent={ArrowDown}
        // defaultValue={items?.[0].value}
        MenuProps={{
          sx: {
            marginTop: '10px',
            ...selectProps?.MenuProps?.sx,
          },
          ...selectProps?.MenuProps,
        }}
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
          '& .MuiSelect-select .notranslate::after': placeholder
            ? {
                content: `"${placeholder}"`,
                opacity: 0.42,
              }
            : {},
          ...selectProps?.sx,
        }}
        {...field}
        onChange={(e) => {
          field.onChange(e);
          if (onChange) {
            const index = items.findIndex((x) => x.value === e.target.value);
            if (index >= 0) {
              onChange(items[index].value, items[index].option);
            }
          }
        }}
      >
        {isLoading && (
          <MenuItem value=''>
            <span style={{ color: '#808080' }}>Loading...</span>
          </MenuItem>
        )}
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default SelectForm;
