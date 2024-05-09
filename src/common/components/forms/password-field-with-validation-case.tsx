/* eslint-disable no-unused-vars */
import { FormHelperText, Typography, FormControl, Input as _Input, InputProps, InputAdornment } from '@mui/material';

import { styled } from '@mui/material/styles';

import { isEmpty, isUndefined } from 'lodash';

import React, { useRef, useState, useCallback, FC } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Invalid } from '..';

import { Color } from '../../../theme';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import Valid from '../valid.component';
import { userValidUpdated } from '../../../redux/reducers/authReducers';

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

type IFormInputProps = {
  name: string;
  label: string;
  children?: React.ReactNode;
  getValuebyInput?: string;
} & InputProps;

const MuiPasswordField: FC<IFormInputProps> = ({ name, label, children, getValuebyInput, ...otherProps }) => {
  const {
    control,
    resetField,
    setValue,
    formState: { errors },
  } = useFormContext();

  let clickHoldTimer: NodeJS.Timeout | undefined = undefined;

  const ref = useRef<HTMLInputElement | null>(null);

  const [pressed, setPressed] = useState<boolean>(false);

  const handleMouseDown = useCallback(() => {
    clickHoldTimer = setTimeout(() => {
      setPressed(true);
    }, 100); //Change 1000 to number of milliseconds required for mouse hold
  }, [clickHoldTimer]);

  const handleMouseUp = useCallback(() => {
    clearTimeout(clickHoldTimer);
    setPressed(false);
  }, [clickHoldTimer, setPressed]);

  const dispatch = useAppDispatch();

  const { useInfo } = useAppSelector((state) => state.mainState);

  const { email, username, phone, country } = !isUndefined(useInfo.payload) ? useInfo.payload : '';

  const { isValid, active } = !isUndefined(useInfo.userValue) ? useInfo.userValue : '';

  React.useEffect(() => {
    function founError() {
      if (!isEmpty(errors[name])) {
        dispatch(
          userValidUpdated({
            isValid: false,
            email,
            username,
            phone,
            country,
            active: active,
          }),
        );
      }
    }

    founError();
  }, [errors]);

  return (
    <Controller
      control={control}
      defaultValue={!isUndefined(getValuebyInput) ? getValuebyInput : ''}
      name={name}
      render={({ field }) => {
        return (
          <FormControl fullWidth sx={{ mb: '8px' }}>
            <Typography
              variant='body2'
              sx={{
                color: '#000000',
                mb: '8px',
                fontWeight: 600,
                lineHeight: 1.71,
                fontSize: '14px',
              }}
            >
              {label}
            </Typography>
            <Input
              inputRef={ref}
              {...field}
              fullWidth
              disableUnderline
              endAdornment={
                <InputAdornment
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: '10%',
                  }}
                  position='end'
                >
                  <span
                    style={{
                      width: 'auto',
                      height: 'auto',
                      marginTop: '20px',
                    }}
                  >
                    {errors[name] && field.value.length ? (
                      <Invalid resetValue={resetField} name={name} setValue={setValue} />
                    ) : field.value.length > 0 && !errors[name] && isValid === false ? (
                      <Invalid isNotError={true} resetValue={resetField} name={name} setValue={setValue} />
                    ) : field.value.length > 0 &&
                      !errors[name] &&
                      !isUndefined(isValid) &&
                      isValid === true &&
                      control._formState.isSubmitted ? (
                      <Valid />
                    ) : (
                      ''
                    )}
                    &nbsp; &nbsp;
                  </span>
                  {ref?.current?.type === 'password' ? (
                    <span
                      style={{
                        display: !errors[name] && control._formState.isSubmitted ? 'none' : 'inline-block',
                        color: Color.textHint,
                        fontWeight: '600',
                        fontSize: '12px',
                        lineHeight: 1.35,
                        letterSpacing: '1.35',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        if (ref.current !== null) {
                          ref.current.type = 'text';
                        }
                      }}
                    >
                      Show
                    </span>
                  ) : (
                    <span
                      style={{
                        display: !errors[name] && control._formState.isSubmitted ? 'none' : 'inline-block',
                        color: Color.textHint,
                        fontWeight: '600',
                        fontSize: '12px',
                        lineHeight: 1.35,
                        letterSpacing: '1.35',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        if (ref.current !== null) {
                          ref.current.type = 'password';
                        }
                      }}
                    >
                      Hide
                    </span>
                  )}
                </InputAdornment>
              }
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              sx={{
                borderStyle: 'solid',
                borderWidth: '1px',
                height: '44px',
                borderRadius: '2px',
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
            <span
              style={{
                display: (errors[name]?.message as never) ? 'block' : 'none',
                color: (errors[name]?.message as never) ? Color.negative : Color.textHint,
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: '-0.5',
              }}
            >
              {(errors[name]?.message as never) === 'isRequired' && 'The field should not be empty.'}
              {(errors[name]?.message as never) === 'upperLower' && 'Enter upper case and lower case in password'}
              {(errors[name]?.message as never) === 'digit' && 'Enter upper a digit to make your password strong'}
              {(errors[name]?.message as never) === 'minHeight' && 'Password should be at least 8 characters long'}
              <br />
            </span>
          </FormControl>
        );
      }}
    />
  );
};

export default MuiPasswordField;
