/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Box, Button, Link, ListItem, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { resendOtpCode, OtpResponseType } from '../../modules/buyer/account/account-profile-update.service';
import { useSendOtpCodeMutation, useVerifyOtpCodeMutation } from '../../redux/apis/authApi';
import { Color } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RESEND_OTP_TIMEOUT } from '../constants';
import { AlertMessageBox, showToast, ToastTypes } from '../utils';
import { SeparatedInput } from './forms';
import { CodeNumber } from './forms/auto-input';
import useMediaBreakpoint from './breakpoint';
import useLogoutEventHandler from '../utils/hooks/useLogout';
import { useNavigate } from 'react-router-dom';

type Props = {
  phoneNumber: string;
  onSuccess?: (e: boolean) => void;
};

export const VerifyMobileComponent = ({ phoneNumber, onSuccess }: Props) => {
  const ref = useRef<any>(null);
  const [codeValid, setCodeValid] = React.useState(false);
  const [formSubmitted, setformSubmitted] = useState(false);
  const [codeError, setCodeError] = React.useState('');
  const {
    useInfo: { tempData },
  } = useAppSelector((state) => state.mainState);
  const [inputField, setInputField] = CodeNumber();
  const [sendOtpCode, { error: otpError }] = useSendOtpCodeMutation();
  const [verifyCode, { error: otpVerifyError }] = useVerifyOtpCodeMutation();
  const { xs } = useMediaBreakpoint();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUndefined(otpVerifyError)) {
      setformSubmitted(false);
      const verifyCode = otpVerifyError as any;

      if (verifyCode?.status === 'FETCH_ERROR') {
        showToast('No internet connection', ToastTypes.ERROR);
      }

      if (!isUndefined(verifyCode?.data)) {
        if (verifyCode.statusText === 'EXPIRED' && verifyCode.statusCode === 'TVx0010') {
          setCodeError('The code is expired.');
        } else {
          setCodeError('The code is incorrect.');
        }
      }
    }

    if (!isUndefined(otpError)) {
      setformSubmitted(false);
      const sendCodeValidation = otpError as any;

      if (sendCodeValidation.status === 'FETCH_ERROR') {
        showToast('No internet connection', ToastTypes.ERROR);
      }
      if (sendCodeValidation.status === 400 && sendCodeValidation.data.error.message !== 'Max send attempts reached.') {
        sendCodeValidation.data.error.details.errors.map((value: any) => {
          showToast(value.message, ToastTypes.ERROR);
        });
      } else {
        if (!isUndefined(sendCodeValidation.data)) {
          showToast(sendCodeValidation.data.error.message, ToastTypes.ERROR);
        }
      }
    }
  }, [otpVerifyError, otpError]);

  const [countTimeInterval, setCountTimeInterval] = React.useState(0);

  const submitRequest = useCallback(
    async (e: any) => {
      e.preventDefault();
      setformSubmitted(true);
      if (inputField.length === 0) {
        setCodeError('The field should not be empty.');
        setformSubmitted(false);
      } else {
        setCodeError('');

        await verifyCode({ code: inputField, mobile: phoneNumber })
          .then(async (response: any) => {
            const { status, statusText, message } = response.data;

            if (status && statusText === 'SUCCESS') {
              setCodeValid(true);
              onSuccess && onSuccess(true);
            } else {
              setCodeError(message);
              setformSubmitted(true);
            }
          })
          .catch(() => {
            setformSubmitted(false);

            // onSuccess && onSuccess(false);
          });
      }
    },
    [inputField],
  );

  const { clearAll } = useLogoutEventHandler();
  const ResentCode = async () => {
    setCodeError('');

    const resendCode: any = await resendOtpCode(phoneNumber, dispatch);

    if (!isUndefined((resendCode as any)?.error)) {
      if ((resendCode as any)?.error?.data?.message === 'Unauthorized') {
        clearAll();
        AlertMessageBox(xs as boolean, '', 'Token expired');
        navigate('/login');
      }
    }
    if ('data' in resendCode) {
      if (((resendCode.data as any).status as boolean) === true) {
        AlertMessageBox(xs, resendCode?.data.message as string);
        setCountTimeInterval(RESEND_OTP_TIMEOUT);
      } else {
        AlertMessageBox(xs, '', resendCode?.data.message as string);
      }
    }
  };

  const startTimer = () => {
    if (countTimeInterval <= 0) {
      clearTimeout(ref.current);
    } else {
      ref.current = setTimeout(() => {
        setCountTimeInterval(countTimeInterval - 1);
      }, 1000);
    }
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearTimeout(ref.current);
    };
  }, [countTimeInterval]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'flex' },
      }}
    >
      <Typography
        sx={{
          width: '100%',
          maxWidth: '547px',
          fontSize: '14px',
          lineHeight: 1.71,
          color: Color.pureBlack,
        }}
        component='h6'
        variant='h6'
      >
        Please enter the 4-digit verification code sent to
        <span
          style={{
            color: Color.priBlue,
            fontSize: '14px',
            fontWeight: 'bold',
            lineHeight: 1.71,
          }}
        >
          &nbsp; {phoneNumber}{' '}
        </span>
      </Typography>

      <form onSubmit={submitRequest} style={{ width: '100%', maxWidth: '432px' }}>
        <ListItem
          sx={{
            display: 'flex',
            padding: '0',
            flexDirection: 'row',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            gap: '0px',
            marginTop: '16px',
          }}
        >
          <SeparatedInput isError={codeError} setError={setCodeError} />

          <Typography
            sx={{
              width: { sm: '100%', md: '100%', lg: '152px' },
              fontWeight: 600,
              fontSize: '12px',
              color: Color.priBlue,
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              gap: { xs: '5px', md: '0' },
              marginTop: '20px',
            }}
          >
            {countTimeInterval > 0 && !formSubmitted ? (
              <>
                <Typography
                  component={'span'}
                  sx={{
                    display: 'flex',
                    fontSize: '13px',
                    marginLeft: { xs: '30px', sm: '45px' },
                    maxWidth: '160px',
                    justifyContent: 'center',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    letterSpacing: '-0.5px',
                  }}
                >
                  {countTimeInterval}s
                </Typography>
                <Link
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    fontSize: '14px',
                    color: Color.textHint,
                    textDecoration: 'none',
                    marginTop: '2px',
                  }}
                >
                  Resend code
                </Link>
              </>
            ) : (
              <>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: Color.textHint,
                    fontSize: '12px',
                  }}
                >
                  Did not receive message?
                </span>
                <Link
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    color: Color.priBlue,
                    fontSize: '14px',
                    marginTop: '-3px',
                    cursor: 'pointer',
                  }}
                  onClick={ResentCode}
                >
                  Resend now
                </Link>
              </>
            )}
          </Typography>
        </ListItem>
        <p
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '265px',
            color: Color.negative,
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: '-0.5',
            textAlign: 'left',
          }}
        >
          {codeError ? codeError : ''}
        </p>

        <Button
          disabled={formSubmitted}
          type='submit'
          variant='contained'
          color='secondary'
          sx={{
            width: '100%',
            maxWidth: '432px',
            borderRadius: '2px',
            height: '44px',
            fontSize: '1.25rem',
            marginTop: '16px',
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontStretch: 'normal',
              fontStyle: 'normal',
              lineHeight: 1.5,
              letterSpacing: '-0.5px',
              textTransform: 'capitalize',
            }}
          >
            {formSubmitted ? 'Please wait...' : 'Submit'}
          </Typography>
        </Button>
      </form>
    </Box>
  );
};
