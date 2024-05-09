import React, { useCallback, useMemo } from 'react';
import { useSetState } from 'react-use';
import { BasicModal } from './modal.component';
import { Box, Button, Divider, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { PrimaryButton, SecondryButton } from '../../../../../common/styles';
import OtpModalComponent from './OtpModal.component';
import { NumericFormat } from 'react-number-format';
import { Breakpoints, Color } from '../../../../../theme';
import { useGetPayoutInfoQuery, useGetReportQuery, useWithdrawNowMutation } from '../services/index.api';
import { ReactComponent as SuccessImage } from '../../../../../assets/success-img/stock-verification-progress.svg';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

const MinAmount = import.meta.env.VITE_ENVIRONMENT === 'production' ? 2 : 150;

function WithdrawModal({ isOpen, onClose, balance }: IProps) {
  const [{ isOtp, withdraw, isSuccess, withdrawId }, setState] = useSetState({
    isOtp: false,
    isSuccess: false,
    withdraw: undefined as undefined | number,
    withdrawId: '',
  });
  const { data: payoutData } = useGetPayoutInfoQuery({});
  const firstCard = useMemo(() => payoutData?.data?.[0], [payoutData?.data]);
  const { data } = useGetReportQuery({
    url: '/withdrawal',
  });
  const [WithDrawlNow, { isLoading }] = useWithdrawNowMutation();

  const onOtpVerify = useCallback(
    (otp: string) => {
      // setState({ actualAmount: data?.balance ?? 0 });
      WithDrawlNow({ otp, grossAmount: withdraw ?? 0 })
        .unwrap()
        .then((data3) => {
          onClose();
          setState({ isSuccess: true, isOtp: false, withdrawId: data3.data.id });
        });
    },
    [WithDrawlNow, data?.balance, onClose, setState, withdraw],
  );

  return (
    <>
      <BasicModal
        isOpen={isOpen}
        onClose={onClose}
        boxSx={{ padding: '40px', maxWidth: '545px' }}
        heading={'Withdraw funds'}
        isClose
      >
        <MainContainer>
          <Box className={'funds-container'}>
            <Box className={'fund-text'}>
              <Typography className={'available'}>Available funds</Typography>
              <Typography className={'dollar'}>
                S$
                <NumericFormat value={balance} thousandSeparator displayType={'text'} decimalScale={2} fixedDecimalScale />
              </Typography>
            </Box>

            <NumericFormat
              customInput={TextField}
              thousandSeparator
              allowNegative={false}
              decimalScale={2}
              isAllowed={(values) => (values?.floatValue ?? 0) <= balance}
              value={withdraw}
              sx={{
                height: '64px',
                padding: '16px',
                borderRadius: '4px',
                border: withdraw && withdraw < MinAmount ? '1px solid red' : '1px solid var(--line, #EAEAEA)',
              }}
              placeholder={'0.00'}
              InputProps={{
                disableUnderline: true,
                sx: { fontWeight: 700, fontSize: '20px !important' },
                startAdornment: (
                  <InputAdornment
                    sx={{ '.MuiTypography-root': { fontSize: '20px !important', fontWeight: 700, color: '#7E7E7E' } }}
                    position='end'
                  >
                    S$
                  </InputAdornment>
                ),
                endAdornment: (
                  <Button
                    variant={'outlined'}
                    sx={{
                      padding: '8px 16px',
                      width: '55px',
                      height: '32px',
                      backgroundColor: 'transparent',
                      border: `1px solid ${Color.priBlue}`,
                      color: Color.priBlue,
                      textTransform: 'inherit',
                      ':hover': {
                        border: `1px solid ${Color.priBlue}`,
                      },
                    }}
                    onClick={() => setState({ withdraw: balance })}
                  >
                    Max
                  </Button>
                ),
              }}
              variant='standard'
              onValueChange={(values) => setState({ withdraw: values?.floatValue })}
            />

            <Typography className={'sub-text'} sx={{ color: withdraw && withdraw < MinAmount ? 'red !important' : undefined }}>
              Minimum withdrawal amount is S${MinAmount.toFixed(2)}
            </Typography>
          </Box>

          <Box className={'payout-container'}>
            <Typography>Payout method</Typography>
            <Box>
              <Typography sx={{ minWidth: '121px' }}>Direct to local bank</Typography>
              <Box>
                <Typography>{firstCard?.accountName}</Typography>
                <Typography>{firstCard?.accountNumber}</Typography>
                <Typography>
                  {firstCard?.bankName} - {firstCard?.bankCode}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Divider />
            <Box className={'data-container'}>
              <Typography className={'sub'}>Withdrawal fee ( per payment)</Typography>
              <Typography className={'value'}>-S${Number(data?.metadata.withdrawFee).toFixed(2)}</Typography>
            </Box>
            <Divider />
            <Box className={'data-container'} sx={{ pY: '16px' }}>
              <Typography className={'value'}>You will get</Typography>
              <Typography className={'value-2'}>
                S$
                <NumericFormat
                  value={withdraw ? withdraw - Number(data?.metadata.withdrawFee ?? 0) : '0.00'}
                  thousandSeparator
                  decimalScale={2}
                  fixedDecimalScale
                  displayType={'text'}
                />
              </Typography>
            </Box>
          </Box>

          <Typography className={'sub-text'}>
            * Withdrawals can’t be undone. It may take up to 7 business days to transfer.
          </Typography>

          <Box className={'btn-container'}>
            <SecondryButton sx={{ padding: '8px 24px', color: '#7E7E7E', background: 'transparent' }} onClick={onClose}>
              Cancel
            </SecondryButton>
            <PrimaryButton
              sx={{ padding: '8px 32px', borderRadius: '2px' }}
              onClick={() => {
                if (withdraw && withdraw >= MinAmount) {
                  setState({ isOtp: true });
                }
              }}
            >
              Confirm & withdraw
            </PrimaryButton>
          </Box>
        </MainContainer>
      </BasicModal>

      <OtpModalComponent
        isOpen={isOtp}
        isLoading={isLoading}
        onClose={() => setState({ isOtp: false })}
        countryCode={data?.metadata.ownerMobileCountryCode ?? ''}
        mobile={data?.metadata.ownerMobile ?? ''}
        onVerifyOtp={onOtpVerify}
        preText={'To authorise withdrawal, '}
      />

      <BasicModal
        isOpen={isSuccess}
        onClose={() => setState({ isSuccess: false })}
        isClose
        boxSx={{
          maxWidth: '545px',
          padding: '40px',
          borderRadius: '4px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <SuccessImage width={'100%'} />

          <Box
            sx={{
              textAlign: 'center',
              '.head': { fontSize: '20px !important', fontWeight: 700 },
              '.sub': { fontWeight: 600, span: { fontWeight: 700, color: Color.priBlue } },
            }}
          >
            <Typography className={'head'}>Withdrawal request submitted</Typography>
            <Typography className={'sub'}>
              Your withdrawal ID: <Typography component={'span'}>{withdrawId}</Typography>
            </Typography>
          </Box>

          <Typography sx={{ textAlign: 'center' }}>
            The funds will be transferred to your bank account{' '}
            <Typography component={'span'} sx={{ fontWeight: 700 }}>
              within 7 business days
            </Typography>
            . You&apos;ll be notified via email once the transfer is successful.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '16px',
              borderRadius: '4px',
              border: '1px solid var(--line, #EAEAEA)',
              width: '100%',
              '> div': {
                display: 'flex',
                gap: '4px',
                '> p': {
                  ':first-child': { color: '#7E7E7E', fontWeight: 700 },
                },
                '> div': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  '> p': {
                    ':first-child': { color: 'black', fontWeight: 700 },
                  },
                },
              },
            }}
          >
            <Box>
              <Typography sx={{ minWidth: '105px' }}>Actual amount:</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '15px !important' }}>
                S$
                <NumericFormat
                  value={data && withdraw ? withdraw - Number(data?.metadata.withdrawFee ?? 0) : '0.00'}
                  thousandSeparator
                  decimalScale={2}
                  fixedDecimalScale
                  displayType={'text'}
                />
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ minWidth: '105px' }}>Sent to:</Typography>
              <Box>
                <Typography>{firstCard?.accountName}</Typography>
                <Typography>{firstCard?.accountNumber}</Typography>
                <Typography>
                  {firstCard?.bankName} - {firstCard?.bankCode}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </BasicModal>
    </>
  );
}

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;

  > .btn-container {
    display: flex;
    justify-content: end;
    gap: 16px;
  }

  .sub-text {
    color: var(--grey-text-7-e, #7e7e7e);
    font-size: 12px !important;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.5px;
  }

  > .funds-container {
    display: flex;
    flex-direction: column;
    gap: 8px;

    > .fund-text {
      display: flex;
      justify-content: end;
      gap: 4px;

      > p {
        color: #7e7e7e;
      }

      > .available {
        font-weight: 600;
      }

      > .dollar {
        font-weight: 700;

        > span {
          color: black;
          font-weight: 700;
        }
      }
    }
  }

  .data-container {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    padding-bottom: 8px;
    align-items: center;

    > .sub {
      color: var(--grey-text-7-e, #7e7e7e);
      font-weight: 600;
      letter-spacing: -0.5px;
    }

    > .value {
      color: var(--black-text, #000);
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    > .value-2 {
      color: var(--grey-text-7-e, #7e7e7e);
      font-size: 20px !important;
      font-weight: 700;
      letter-spacing: -0.5px;

      > span {
        color: var(--black-text, #000);
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.5px;
      }
    }
  }

  > .payout-container {
    > p {
      color: black;
      font-weight: 600;
    }

    > div {
      margin-top: 8px;
      padding: 16px;
      border-radius: 4px;
      border: 1px solid var(--line, #eaeaea);
      display: flex;
      gap: 24px;

      > p {
        color: var(--grey-text-7-e, #7e7e7e);
        font-weight: 700;
        letter-spacing: -0.5px;
      }

      > div {
        display: flex;
        flex-direction: column;
        gap: 8px;

        p {
          color: black;
          font-weight: 400;
          letter-spacing: -0.28px;

          :first-child {
            font-weight: 700;
          }
        }
      }

      @media (max-width: ${Breakpoints.sm}px) {
        flex-direction: column;
        gap: 9px;
      }
    }
  }
`;

export default WithdrawModal;
