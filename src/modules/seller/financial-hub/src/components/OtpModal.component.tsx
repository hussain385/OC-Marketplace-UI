import React, { useCallback, useEffect } from 'react';
import { InfoFormModal } from '../payout/components/infoForm.styles';
import { Typography } from '@mui/material';
import { SeparatedInput } from '../../../../../common/components/forms';
import { PrimaryButton } from '../../../../../common/styles';
import { BasicModal } from './modal.component';
import { CodeNumber } from '../../../../../common/components/forms/auto-input';
import { useGetOtpMutation } from '../../../../../redux/apis/authApi';
import { useSetState } from 'react-use';
import useCountdown from '../../../../../common/utils/hooks/useCountdown';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  countryCode: string;
  mobile: string;
  preText: string;
  onSendOtpOverride?: (code: string, mobile: string, onComplete: () => void) => Promise<void>;
  isLoading?: boolean;
  onVerifyOtp: (otp: string) => void;
}

function OtpModalComponent({ isOpen, onClose, countryCode, mobile, onSendOtpOverride, isLoading, onVerifyOtp, preText }: IProps) {
  const [inputField] = CodeNumber();
  const [SendOtp, { isLoading: isLoading1 }] = useGetOtpMutation();
  const [{ isOptNumber }, setState] = useSetState({ isOptNumber: false });
  const { time, startTimer } = useCountdown();

  const onSendOtp = useCallback(
    async (code: string, mobile: string) => {
      if (onSendOtpOverride) {
        return onSendOtpOverride(code, mobile, () => setState({ isOptNumber: true }));
      }
      if (import.meta.env.VITE_ENVIRONMENT !== 'develop') {
        await SendOtp({ mobile });
      }
      return setState({ isOptNumber: true });
    },
    [SendOtp, onSendOtpOverride, setState],
  );

  useEffect(() => {
    if (!isOpen) {
      setState({ isOptNumber: false });
    }
  }, [isOpen, setState]);

  return (
    <BasicModal
      isOpen={isOpen}
      onClose={onClose}
      boxSx={{
        padding: { xs: '32px 16px', sm: '48px' },
        borderRadius: '12px',
      }}
      isClose
    >
      <InfoFormModal>
        <Typography className={'head'}>Verify via OTP</Typography>

        <Typography className={'body'}>
          {preText}
          {!preText ? 'Please' : 'please'} enter the 4-digit One-Time Password (OTP) sent to{' '}
          <Typography component={'span'}>{`<${countryCode} > ***${mobile.toString().slice(-4)}`}</Typography>
        </Typography>

        <Typography className={'body'}>Your OTP expires in 5 minutes.</Typography>

        {isOptNumber && (
          <>
            <SeparatedInput
              isError={''}
              setError={(value) => {
                return value;
              }}
            />
            {time > 0 ? (
              <Typography className={'resend-text'}>{time}s</Typography>
            ) : (
              <Typography className={'resend-text'}>
                Didn’t receive the verification code?{' '}
                <Typography
                  component={'span'}
                  className={'body'}
                  onClick={() => {
                    onSendOtp(countryCode, mobile).then(() => startTimer(60));
                  }}
                >
                  Resend now
                </Typography>
              </Typography>
            )}
          </>
        )}

        <PrimaryButton
          onClick={() => (isOptNumber ? onVerifyOtp(inputField) : onSendOtp(countryCode, mobile))}
          disabled={isLoading || isLoading1}
          sx={{ fontWeight: 700 }}
        >
          {isOptNumber ? 'Verify now' : 'Send OTP'}
        </PrimaryButton>
      </InfoFormModal>
    </BasicModal>
  );
}

export default OtpModalComponent;
