import { FormControlLabel } from '@mui/material';
import { isUndefined } from 'lodash';
import React from 'react';

import { RadioLabel, RadioDefaultStyled, RadioCustomStyled } from '../../styles/option.radion.btn.styles';

type OptionProps = {
  customStyles?: boolean;
  isSubmitting?: boolean;
  label: string | React.ReactNode;
  value: string;
  checked?: boolean;
};

const RadioOptionButton = ({ isSubmitting, label, value, customStyles, checked }: OptionProps) => {
  return (
    <FormControlLabel
      value={value}
      disabled={isSubmitting}
      checked={checked}
      control={!isUndefined(customStyles) ? <RadioCustomStyled /> : <RadioDefaultStyled />}
      label={<RadioLabel>{label}</RadioLabel>}
    />
  );
};

export default RadioOptionButton;
