/* eslint-disable no-unused-vars */
import { FormHelperText, Typography, FormControl, Input as _Input, InputAdornment } from '@mui/material';

import { styled } from '@mui/material/styles';

import { isEmpty, isUndefined } from 'lodash';

import React, { FC, useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Color } from '../../../theme';

import { FormEmailMobilePropsType } from '../../interface/form-interface';

import useMediaBreakpoint from '../breakpoint';

import Invalid from '../invalid.component';

import RenderIf from '../render-if.component';

import Valid from '../valid.component';

import { ButtonDrop } from '../../styles';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { userValidUpdated } from '../../../redux/reducers/authReducers';

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

const EmailMobileForm: FC<FormEmailMobilePropsType> = ({
  name,
  label,
  children,
  onClickHandler,
  countryNumber,
  countryName,
  setValue,
  validated,
  isNotEmail,
  disabled,
  ...otherProps
}) => {
  const {
    control,
    resetField,
    setValue: setValues,
    formState: { errors },
  } = useFormContext();

  let clickHoldTimer: NodeJS.Timeout | undefined = undefined;

  const [, setPressed] = useState<boolean>(false);

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

  const { email, username, phone, country } = !isUndefined(useInfo.payload) ? useInfo.payload : '';

  const { isValid, active } = !isUndefined(useInfo.userValue) ? useInfo.userValue : '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const userInviteEmail = useInfo.userInviteEmail;

  const { sm, mdLg } = useMediaBreakpoint();

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

  React.useEffect(() => {
    if (!isEmpty(setValue)) {
      setValues(name, setValue);
    }
  }, [setValue]);

  return (
    <Controller
      control={control}
      defaultValue={setValue ?? ''}
      name={name}
      render={({ field }) => {
        const validLetter = /^((?=.*[a-zA-Z]).{0,})$/.test(field.value);

        const validEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            field.value,
          );

        return (
          <FormControl
            fullWidth
            sx={{
              mb: '8px',
              // '&.MuiFormControl-root': {
              // 	background: 'red',
              // },
            }}
          >
            <RenderIf value={sm || mdLg}>
              <Typography
                variant='body2'
                sx={{
                  color: '#000000',
                  mb: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                {label}
              </Typography>
            </RenderIf>
            <Input
              disabled={validated}
              id={field?.name}
              {...field}
              fullWidth
              disableUnderline
              type={validLetter || validEmail || (field.value.length === 0 && isUndefined(isNotEmail)) ? 'email' : 'text'}
              startAdornment={
                <InputAdornment
                  sx={{
                    display: validLetter || validEmail || (field.value.length === 0 && isUndefined(isNotEmail)) ? 'none' : 'flex',
                  }}
                  position='start'
                >
                  <ButtonDrop
                    disabled={validated}
                    type='button'
                    rowCenter='center'
                    columnCenter={'center'}
                    display={'flex'}
                    // flexWidth={mobileActive ? '25%' : '0'}
                    onClick={onClickHandler}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: 1.71,
                        letterSpacing: '-0.5px',
                        color: validated === true ? Color.textHint : Color.textBlack,
                      }}
                    >
                      {countryNumber}
                    </span>
                    <img
                      style={{
                        marginLeft: '8px',
                      }}
                      src='../createpage/ic-arrow-down.svg'
                      alt=''
                    />
                  </ButtonDrop>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment sx={{ display: disabled ? 'none' : 'flex' }} position='end'>
                  <span>
                    {errors[name] && field.value.length ? (
                      <Invalid resetValue={resetField} name={name} setValue={setValues} />
                    ) : field.value.length > 0 && !errors[name] && isValid === false ? (
                      <Invalid isNotError={true} resetValue={resetField} name={name} setValue={setValues} />
                    ) : field.value.length > 0 &&
                      !errors[name] &&
                      !isUndefined(isValid) &&
                      isValid === true &&
                      control._formState.isSubmitted ? (
                      <Valid />
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
                background: validated === true ? '#F4F3F2' : 'initial',

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
                  display: (errors[name]?.message as never) === 'isRequired' ? 'block' : 'none',
                  color: (errors[name]?.message as never) === 'isRequired' ? Color.negative : Color.textHint,
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: '-0.5',
                }}
              >
                {(errors[name]?.message as never) === 'isRequired' ? 'The field should not be empty.' : ''}
                <br />
              </span>
              <span
                style={{
                  color: Color.negative,
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {errors[name] &&
                field.value.length > 0 &&
                errors[name]?.message !== ('Expected string, received function' as never)
                  ? (errors[name]?.message as never)
                  : ''}
              </span>
              {children}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default EmailMobileForm;
