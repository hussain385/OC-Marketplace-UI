/* eslint-disable no-unused-vars */
import { FormHelperText, Typography, FormControl, Input as _Input, InputAdornment } from '@mui/material';

import { styled } from '@mui/material/styles';

import { isEmpty, isUndefined } from 'lodash';

import React, { FC, useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Invalid } from '..';

import { ButtonDrop } from '../../styles';

import { Color } from '../../../theme';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import { FormMobilePropsType } from '../../utils';

import Valid from '../valid.component';
import { useServerError, useServerErrorMessage } from '../../utils/global_state.util';
import { userValidUpdated } from '../../../redux/reducers/authReducers';

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

const MobileForm: FC<FormMobilePropsType> = ({
  name,
  label,
  children,
  onClickHandler,
  countryNumber,
  countryName,
  getValuebyInput,
  validated,
  mobileErr,
  setMobileExist,
  ...otherProps
}) => {
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

  const [serverErr, serServerError] = useServerError();
  const [serverErrMsg, setServerErrMsg] = useServerErrorMessage();

  function onValue() {
    if (!isEmpty(mobileErr)) {
      setMobileExist('');

      ('');
    }
    serServerError(false);
    setServerErrMsg('');
  }

  return (
    <Controller
      control={control}
      defaultValue={!isUndefined(getValuebyInput) ? getValuebyInput : ''}
      name={name}
      render={({ field }) => {
        const validLetter = /^((?=.*[a-zA-Z]).{0,})$/.test(field.value);

        const validateDigit = /^(?=.*\d).{0,}$/.test(field.value);

        const validEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            field.value,
          );

        const getValue = field.value;
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
            {label && (
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
            )}
            <Input
              onKeyUp={onValue}
              type={'number'}
              {...field}
              fullWidth
              disableUnderline
              startAdornment={
                <InputAdornment
                  sx={{
                    display: 'flex',
                  }}
                  position='start'
                >
                  <ButtonDrop
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
                        fontWeight: 600,
                        lineHeight: 1.71,
                        letterSpacing: '-0.5px',
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
                <InputAdornment position='end'>
                  <span>
                    {(errors[name] && field.value.length) || serverErr === true ? (
                      <Invalid resetValue={resetField} name={name} setValue={setValue} />
                    ) : field.value.length > 0 && !errors[name] && isValid === false ? (
                      <Invalid isNotError={true} resetValue={resetField} name={name} setValue={setValue} />
                    ) : field.value.length > 0 &&
                      !errors[name] &&
                      !isUndefined(isValid) &&
                      isValid === true &&
                      serverErr === false &&
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

                '&.MuiInput-root': {
                  borderColor:
                    field.value.length > 0 && !errors[name] && control._formState.isSubmitted && serverErr === false
                      ? Color.positive
                      : errors[name] || serverErr === true
                      ? Color.negative
                      : Color.line,
                },
                '&.MuiInput-root.Mui-focused': {
                  borderColor:
                    field.value.length > 0 && !errors[name] && control._formState.isSubmitted && serverErr === false
                      ? Color.positive
                      : errors[name] || serverErr === true
                      ? Color.negative
                      : Color.textBlack,
                },

                // '& input[type=number]': {
                // 	'-moz-appearance': 'textfield',
                // },
                // '& input[type=number]::-webkit-outer-spin-button': {
                // 	'-webkit-appearance': 'none',
                // 	margin: 0,
                // },
                // '& input[type=number]::-webkit-inner-spin-button': {
                // 	'-webkit-appearance': 'none',
                // 	margin: 0,
                // },
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
                  display: !isEmpty(serverErrMsg) && (errors[name]?.message as never) !== 'isRequired' ? 'block' : 'none',
                  color:
                    !isEmpty(serverErrMsg) && (errors[name]?.message as never) !== 'isRequired' ? Color.negative : Color.textHint,
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: '-0.5',
                }}
              >
                {!isEmpty(serverErrMsg) && (errors[name]?.message as never) !== 'isRequired' ? serverErrMsg : ''}
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
              <span
                style={{
                  color: Color.negative,
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: '-0.5',
                }}
              >
                {name === 'phone' && !isEmpty(mobileErr) && !errors[name] ? mobileErr : ''}
              </span>
              {children}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default MobileForm;
