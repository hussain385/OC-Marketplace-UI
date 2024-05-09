/* eslint-disable no-unused-vars */
import { Typography, FormControl, Input as _Input, InputAdornment, FormHelperText, Box } from '@mui/material';

import { styled } from '@mui/material/styles';

import { isUndefined } from 'lodash';

import React, { FC, useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { BusineProfileFormProps } from '../utils';

import { Color } from '../../theme';

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';

import InvalidComponent from './invalid.component';

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

const BusinessProfileFormField: FC<BusineProfileFormProps> = ({ name, label, getValuebyInput, optional, ...otherProps }) => {
  const {
    control,
    resetField,
    setValue,
    formState: { errors },
  } = useFormContext();

  let clickHoldTimer: NodeJS.Timeout | undefined = undefined;

  const [pressed, setPressed] = useState<boolean>(false);

  const handleMouseDown = () => {
    clickHoldTimer = setTimeout(() => {
      setPressed(true);
      //Action to be performed after holding down mouse
    }, 100); //Change 1000 to number of milliseconds required for mouse hold
  };

  const handleMouseUp = () => {
    clearTimeout(clickHoldTimer);

    setPressed(false);
  };

  const dispatch = useAppDispatch();

  const { useInfo } = useAppSelector((state) => state.mainState);

  const { isValid, active } = !isUndefined(useInfo.userValue) ? useInfo.userValue : '';

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={!isUndefined(getValuebyInput) ? getValuebyInput : ''}
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: '8px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mb: '8px',
              height: '24px',
              width: '100%',
            }}
          >
            <Typography
              variant='body2'
              sx={{
                fontSize: '14px',
                fontWeight: ' 600',
                color: Color.lightBlack,
              }}
            >
              {label}
            </Typography>
            {optional && (
              <Typography
                variant='body2'
                sx={{
                  fontSize: '12px',
                  fontWeight: ' 600',
                  color: Color.bgGreyDark,
                }}
              >
                Optional
              </Typography>
            )}
          </Box>
          <Input
            {...field}
            fullWidth
            disableUnderline
            endAdornment={
              <InputAdornment position='end'>
                <span>
                  {errors[name] && field.value.length ? (
                    <InvalidComponent resetValue={resetField} name={name} setValue={setValue} />
                  ) : field.value.length > 0 && !errors[name] && isValid === false ? (
                    <InvalidComponent isNotError={true} resetValue={resetField} name={name} setValue={setValue} />
                  ) : field.value.length > 0 &&
                    !errors[name] &&
                    !isUndefined(isValid) &&
                    isValid === true &&
                    control._formState.isSubmitted ? (
                    <CheckTwoToneIcon sx={{ fontSize: '16px', color: Color.positive }} />
                  ) : (
                    ''
                  )}
                </span>
              </InputAdornment>
            }
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            sx={{
              borderStyle: 'solid',
              borderWidth: '1px',
              height: '44px',
              borderRadius: '2px',
              backgroundColor: otherProps.disabled ? '#eee' : 'transparent',
              '&.MuiInput-root': {
                borderColor:
                  field.value.length > 0 && !errors[name] && control._formState.isSubmitted
                    ? Color.positive
                    : errors[name]
                    ? Color.negative
                    : Color.line,
              },
              '&.MuiInput-root.Mui-focused': {
                borderColor:
                  field.value.length > 0 && !errors[name] && control._formState.isSubmitted
                    ? Color.positive
                    : errors[name]
                    ? Color.negative
                    : Color.textBlack,
              },
            }}
            error={!!errors[name]}
            {...otherProps}
          />
          <FormHelperText sx={{ margin: 0, mt: 0 }} error={!!errors[name]}>
            <span
              style={{
                color: Color.negative,
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
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

export default React.memo(BusinessProfileFormField);
