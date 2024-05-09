/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroup } from '@mui/material';
import React from 'react';

import { Controller, FieldPath, FieldPathValue, SetValueConfig } from 'react-hook-form';

import RadioOptionButton from './option-radio.component';

export type OptionControllerProps = {
  control: any;
  setValue: (name: FieldPath<any>, value: FieldPathValue<any, FieldPath<any>>, options?: SetValueConfig) => void;
  setDocumentType: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
};

const OptionForm = ({ control, setValue, setDocumentType, isSubmitting }: OptionControllerProps) => {
  return (
    <Controller
      name='documentType'
      control={control}
      render={({ field }) => {
        return (
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={field.value}
            onChange={(event) => {
              setDocumentType((event.target as HTMLInputElement).value);
              field.onChange(event);
            }}
          >
            <RadioOptionButton isSubmitting={isSubmitting} value='NATIONAL' label=' National ID' />
            <RadioOptionButton isSubmitting={isSubmitting} value='PASSPORT' label='International passport' />
          </RadioGroup>
        );
      }}
    />
  );
};

export default OptionForm;
