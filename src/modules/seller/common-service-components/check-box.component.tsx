import React from 'react';
import { FormControlLabel, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Controller } from 'react-hook-form';

type componentType = {
  name: string;
  control: any;
  labelValue: string;
  setValue: any;
  disabled?: boolean;
  checkedBoxColor?: string;
  onChange?: (value: boolean) => void;
};

const CheckBoxComponent = ({ name, control, labelValue, setValue, disabled, checkedBoxColor, onChange }: componentType) => {
  const label = { inputProps: { 'aria-label': labelValue } };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  defaultChecked
                  checked={field.value}
                  disabled={disabled}
                  sx={{
                    borderRadius: 2,
                    color: '#eaeaea',

                    '&.Mui-checked': {
                      color: checkedBoxColor ? checkedBoxColor : '#66d19e',
                    },
                  }}
                  onChange={(e) => {
                    setValue(name, e.target.checked);
                    onChange && onChange(e.target.checked);
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '1.71',
                  }}
                >
                  {labelValue}
                </Typography>
              }
            />
          </>
        );
      }}
    />
  );
};

export default CheckBoxComponent;
