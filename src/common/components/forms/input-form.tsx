import { Typography, FormControl, Input as _Input, InputAdornment } from '@mui/material';

import { styled } from '@mui/material/styles';

import { isEmpty, isUndefined } from 'lodash';

import React, { FC, useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import { Color } from '../../../theme';

import { FormInputPropsType } from '../../interface/form-interface';

import VisibilityIcon from '@mui/icons-material/Visibility';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Invalid from '../invalid.component';

import RenderIf from '../render-if.component';

import Valid from '../valid.component';
import { userValidUpdated } from '../../../redux/reducers/authReducers';

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

const InputForm: FC<FormInputPropsType> = ({
  name,
  label,
  children,
  getValuebyInput,
  emailErr,
  setEmail,
  disabled,
  showPassword,
  inputOverrideStyle,
  placeholder,
  ...otherProps
}) => {
  const {
    control,
    resetField,
    setValue,
    formState: { errors },
  } = useFormContext();

  let clickHoldTimer: NodeJS.Timeout | undefined = undefined;

  // eslint-disable-next-line no-unused-vars
  const [pressed, setPressed] = useState<boolean>(false);
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

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

  function onValue() {
    if (!isEmpty(emailErr)) {
      setEmail('');
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={!isUndefined(getValuebyInput) ? getValuebyInput : ''}
      render={({ field }) => (
        <FormControl
          fullWidth
          sx={{
            mb: '8px',
            ...inputOverrideStyle,
          }}
        >
          <Typography
            variant='body2'
            sx={{
              mb: '8px',
              height: '24px',
              fontSize: '14px',
              fontWeight: ' 600',
              lineHeight: 1.71,
              letterSpacing: '-0.5x',
              color: Color.lightBlack,
            }}
          >
            {label}
          </Typography>
          <Input
            type={togglePassword === true ? 'text' : togglePassword === false && showPassword === true ? 'password' : 'text'}
            onKeyUp={onValue}
            {...field}
            fullWidth
            placeholder={placeholder}
            disableUnderline
            disabled={disabled}
            endAdornment={
              <InputAdornment sx={{ display: disabled ? 'none' : 'flex' }} position='end'>
                <span>
                  {errors[name] && field.value.length ? (
                    <Invalid resetValue={resetField} name={name} setValue={setValue} />
                  ) : field.value.length > 0 && !errors[name] && isValid === false ? (
                    <Invalid isNotError={true} resetValue={resetField} name={name} setValue={setValue} />
                  ) : field.value.length > 0 &&
                    !errors[name] &&
                    !isUndefined(isValid) &&
                    isValid === true &&
                    control._formState.isSubmitted ? (
                    <RenderIf value={!showPassword}>
                      <Valid />
                    </RenderIf>
                  ) : (
                    ''
                  )}
                </span>
                <RenderIf value={!!showPassword && field.value.length > 0}>
                  {!togglePassword ? (
                    <span
                      style={{
                        display: errors[name] && !control._formState.isSubmitted ? 'none' : 'inline-block',
                        color: Color.textHint,
                        fontWeight: '600',
                        fontSize: '12px',
                        lineHeight: 1.35,
                        letterSpacing: '1.35',
                        cursor: 'pointer',
                        paddingLeft: '5px',
                      }}
                      onClick={() => {
                        setTogglePassword(!togglePassword);
                      }}
                    >
                      <VisibilityIcon />
                    </span>
                  ) : (
                    <span
                      style={{
                        display: errors[name] && !control._formState.isSubmitted ? 'none' : 'inline-block',
                        color: Color.textHint,
                        fontWeight: '600',
                        fontSize: '12px',
                        lineHeight: 1.35,
                        paddingLeft: '5px',
                        letterSpacing: '1.35',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setTogglePassword(!togglePassword);
                      }}
                    >
                      <VisibilityOffIcon />
                    </span>
                  )}
                </RenderIf>
              </InputAdornment>
            }
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            sx={{
              borderStyle: 'solid',
              borderWidth: '1px',
              height: '44px',
              borderRadius: '4px',
              backgroundColor: disabled ? Color.bgGreyLight : undefined,
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
          />
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
            {errors[name] && field.value.length > 0 && errors[name]?.message !== ('Expected string, received function' as never)
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
            {name === 'email' && !isEmpty(emailErr) && !errors[name] && field.value !== '' ? emailErr : ''}
          </span>
          {children}
        </FormControl>
      )}
    />
  );
};

export default React.memo(InputForm);
