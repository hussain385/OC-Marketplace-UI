/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Typography, FormControl, Input as _Input, FormHelperText, Select, MenuItem, Box } from '@mui/material';

import React, { FC, useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import {
  dropdownNationalityCustomStyle,
  selectLabelStyle,
  selectWrapper,
  selectErrorStyleHelperText,
} from '../../styles/select-input-form.styles';

import { BusineProfileFormProps } from '../../utils';

import { MdKeyboardArrowDown } from 'react-icons/md';

import { isEmpty } from 'lodash';

import { Color } from '../../../theme';

// eslint-disable-next-line react/prop-types
const SelectInputForm: FC<BusineProfileFormProps & { nameKey: any; mapValue: any[] }> = ({
  name,
  label,
  nameKey,
  mapValue,
  getValuebyInput,
  ...otherProps
}) => {
  const {
    control,
    resetField,
    setValue,
    setError,
    formState: { errors },
  } = useFormContext();

  const [selectedValue, setSelectedValue] = useState('Singapore');

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
    setValue(name, event.target.value);
    setError(name, { type: 'focus' }, { shouldFocus: false });
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={'Singapore'}
      render={({ field }) => (
        <FormControl fullWidth sx={selectWrapper}>
          <Typography variant='body2' sx={selectLabelStyle}>
            {label}
          </Typography>

          <Select
            {...field}
            IconComponent={MdKeyboardArrowDown}
            sx={{
              ...dropdownNationalityCustomStyle,
              border: errors[name] && errors[name]?.message ? `1px solid ${Color.negative}` : '1px solid #eaeaea',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
            }}
            value={selectedValue}
            onChange={handleChange}
            error={!!errors[name]}
            renderValue={() => {
              if (isEmpty(field.value)) {
                return <em>Select</em>;
              }
              return field.value;
            }}
            MenuProps={{
              PaperProps: { sx: { maxHeight: 250, width: 320 } },
            }}
          >
            {mapValue.map((item, index) => (
              <MenuItem key={index} value={item[nameKey]}>
                {item[nameKey]}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText sx={{ margin: 0, mt: 0 }} error={!!errors[name]}>
            <span style={selectErrorStyleHelperText}>
              {errors[name] && errors[name]?.message !== ('Expected string, received function' as never)
                ? (errors[name]?.message as never)
                : ''}
            </span>
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default React.memo(SelectInputForm);
