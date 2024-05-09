/* eslint-disable no-unused-vars */
import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import React from 'react';

import { Box, FormControl } from '@mui/material';

import { nameSchema } from '../../utils/schema/validation-schemas';

import { MuiInputField, ErrorLabel, SecondryButton, PrimaryButton } from '../../styles';

type Props = {
  id: number;
  name: string;
  value: string;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onOk?: () => void;
  onCancel?: () => void;
  onSubmit?: (e: string) => void;
};

type FullNameTypes = {
  [key: string]: string;
};

const FullNameForm = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(nameSchema),
    defaultValues: {
      [props.name]: props.value,
    },
  });

  const onSubmitHandler = (e: FullNameTypes) => {
    props.onSubmit && props.onSubmit(e[props.name]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Controller
        control={control}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name={props.name}
        render={({ field }) => {
          return (
            <>
              <FormControl sx={{ width: '100%' }}>
                <MuiInputField
                  value={field.value}
                  type='text'
                  // onChange={field.onChange}
                  onChange={(e) => {
                    field.onChange(e);
                    //setValue(props.name, e.target.value);
                    props.onInputChange && props.onInputChange(e);
                  }}
                />
                <ErrorLabel>{(errors as any).fullname?.message}</ErrorLabel>
              </FormControl>
            </>
          );
        }}
      />
      <Box sx={{ display: 'flex' }}>
        <SecondryButton onClick={props.onCancel}>Cancel</SecondryButton>
        <PrimaryButton
          disabled={isSubmitting || !!(errors as any).fullname}
          type='submit'
          sx={{ marginLeft: 2 }}
          onClick={props.onOk}
        >
          Update
        </PrimaryButton>
      </Box>
    </form>
  );
};

export default FullNameForm;
