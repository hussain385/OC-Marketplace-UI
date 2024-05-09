/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { Box, Divider, Typography } from '@mui/material';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { ReactComponent as VisaIcon } from '../../../../assets/invoice/visa.svg';
import { IInvoiceItems, IInvoiceResponse, INVOICE_STATUS } from '../order/types';
import { Color } from '../../../../theme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import { RetryPurchaseBtn, StatusLabel } from '../../../../common/styles';
import { ReactComponent as MasterCardIcon } from '../../../../assets/invoice/mc.svg';

type Props = {
  data: IInvoiceResponse | undefined | null;
};

export const statusIconandLabel: { [key: string]: { icon: React.ReactNode; label: string } } = {
  paid: {
    icon: <CheckCircleIcon />,
    label: 'Your payment transaction was successful.',
  },
  refunded: {
    icon: <CheckCircleIcon />,
    label: 'You’ve been successfully refunded.',
  },
  refunding: {
    icon: <InfoIcon />,
    label: 'Your refund is being processed. It may take 7-14 business days, depending on your payment method.',
  },
  failed: {
    icon: <InfoIcon />,
    label: 'Your payment couldn’t be processed. Please retry your purchase.',
  },
  pending: {
    icon: <InfoIcon />,
    label: 'This order is waiting for payment to be completed.',
  },
};

export const statusColor: { [key: string]: string } = {
  paid: Color.billingStatus.paid,
  refunded: Color.billingStatus.paid,
  refunding: Color.priRed,
  failed: Color.priRed,
  pending: Color.priRed,
};

export const ccIcons: { [key: string]: React.ReactNode } = {
  Visa: <VisaIcon />,
  MasterCard: <MasterCardIcon />,
};

const InvoiceDetailsDocument = ({ data }: Props) => {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const displayPaymentMethod = () => {
    return !isNull(data) && !isEmpty(data?.items)
      ? data?.items.map((item, index) => {
          if (!isNull(item.transaction) && !isNull(item.transaction.ccbrand)) {
            return (
              <Box key={`${item.id}${index}`} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Typography component='span'>{ccIcons[item.transaction.ccbrand]}</Typography>
                <Typography component='span'>
                  <Divider sx={{ width: '1px', height: '10px', background: Color.line }} orientation='horizontal' />
                </Typography>
                <Typography
                  component='span'
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '-0.02em',
                    color: Color.textBlack,
                    lineHeight: '24px',
                  }}
                >
                  * * * * {!isEmpty(item.transaction.cclast4) && item.transaction.cclast4}
                </Typography>
                <Box>
                  <StatusLabel className={INVOICE_STATUS[data?.status]}>{INVOICE_STATUS[data?.status]}</StatusLabel>
                </Box>
              </Box>
            );
          }
          /*
         else {
          return (
            <Box key={`${item.id}${index}`} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <StatusLabel className={INVOICE_STATUS[data?.status]}>{INVOICE_STATUS[data?.status]}</StatusLabel>
            </Box>
          );
        }
        */
        })
      : null;
  };

  const calculateAmount = (amount: number, fee: number, discount: number): number => {
    return amount + fee - discount;
  };

  const transactionId = data?.items
    .filter((item: IInvoiceItems) => !isNull(item.transaction))
    .map((item: IInvoiceItems) => {
      return item.transaction.id;
    });

  const orderId =
    data && ['2291', '2294'].includes(data?.status) ? (
      'N/A'
    ) : (
      <Link style={{ color: Color.priBlue }} to={`/account/order-management/${data?.order.id}`}>
        {data?.order.id}
      </Link>
    );

  const onRetryBtnClick = (serviceId: string) => {
    navigate(`/service-detail/${serviceId}`);
  };

  return (
    <Box>
      <Box className='print-hide' sx={{ maxWidth: '1440px', marginInline: 'auto', display: 'grid', gridTemplateColumnd: '1fr' }}>
        <Box sx={{ marginY: '32px', display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '32px', letterSpacing: '-0.02em' }}>Transaction details</Typography>
          {data && ['2294'].includes(data?.status) ? (
            <RetryPurchaseBtn onClick={() => onRetryBtnClick(data?.order.serviceId)}>Retry purchase</RetryPurchaseBtn>
          ) : null}
        </Box>
        <Box
          sx={{
            mb: '24px',
            display: 'grid',
            gridTemplateColumns: '0.15fr 0.25fr 0.15fr 0.2fr 0.15fr  minmax(46px, auto)',
            justifyItems: 'start',
            alignItems: 'start',
          }}
        >
          <Box>
            <Typography
              sx={{ color: Color.textHint, fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em', marginBottom: '10px' }}
            >
              Transaction ID
            </Typography>
            <Typography
              sx={{ color: Color.textHint, fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em', marginBottom: '10px' }}
            >
              Order ID
            </Typography>
            <Typography
              sx={{ color: Color.textHint, fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em', marginBottom: '10px' }}
            >
              Date due
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ color: Color.textBlack, fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em', marginBottom: '10px' }}
            >
              {data?.items && data?.items.length > 0
                ? transactionId && transactionId?.length > 0
                  ? transactionId
                  : 'N/A'
                : 'N/A'}
            </Typography>
            <Typography
              sx={{ color: Color.textBlack, fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em', marginBottom: '10px' }}
            >
              {orderId}
            </Typography>
            <Typography
              sx={{ color: Color.textBlack, fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em', marginBottom: '10px' }}
            >
              {moment(data?.createdAt)
                .format('MMMM DD, YYYY')
                .toString() ?? ''}
            </Typography>
          </Box>
          <Box>
            <Box>
              <Typography
                sx={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', color: Color.textHint, lineHeight: '32px' }}
              >
                Payment method
              </Typography>
            </Box>
          </Box>
          <Box>
            {/** display payment method */}
            {displayPaymentMethod()}
            {!isNull(data) ? (
              <Box sx={{ display: 'flex', color: statusColor[INVOICE_STATUS[data?.status as string]] }}>
                <Box sx={{ marginRight: '10px' }}>{statusIconandLabel[INVOICE_STATUS[data?.status as string]].icon} </Box>
                <Box>{statusIconandLabel[INVOICE_STATUS[data?.status as string]].label}</Box>
              </Box>
            ) : null}
          </Box>
        </Box>

        <Divider sx={{ border: `1px solid ${Color.line}` }} />

        <Box>
          <Box sx={{ mt: '24px', display: 'flex', gap: '104px', mb: '24px' }}>
            {(!isUndefined(data?.order.buyerEntityName) || !isEmpty(data?.order.buyerEntityName)) && (
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '16px',
                    letterSpacing: '-0.02em',
                    color: Color.textHint,
                    lineHeight: '32px',
                  }}
                >
                  Customer Info
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '-0.02em',
                    color: Color.textBlack,
                    lineHeight: '24px',
                  }}
                >
                  {data?.order.buyerEntityName ?? ''}
                </Typography>
                {/* <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '-0.02em',
                    color: Color.textBlack,
                    lineHeight: '24px',
                  }}
                >
                  {buyerDetails?.profile?.detail?.firstAddress ?? ''}
                </Typography> */}
                {/* <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '-0.02em',
                    color: Color.textBlack,
                    lineHeight: '24px',
                  }}
                >
                  {buyerDetails?.profile?.mobileNo ?? ''}
                </Typography> */}
                {/* <Typography
                  sx={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.02em', color: Color.priBlue, lineHeight: '24px' }}
                >
                  support@leadingtech.sg
                </Typography> */}
              </Box>
            )}
            {(!isUndefined(data?.order.sellerEntityName) || !isEmpty(data?.order.sellerEntityName)) && (
              <Box>
                <Typography
                  sx={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', color: Color.textHint, lineHeight: '32px' }}
                >
                  Provider Info
                </Typography>
                <Typography
                  sx={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.02em', color: Color.textBlack, lineHeight: '24px' }}
                >
                  {data?.order.sellerEntityName ?? ''}
                </Typography>
                {/* <Typography
                  sx={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.02em', color: Color.textBlack, lineHeight: '24px' }}
                >
                  {sellerDetails?.profile?.detail?.firstAddress ?? ''}
                </Typography> */}
              </Box>
            )}
          </Box>

          <Divider sx={{ border: `1px solid ${Color.line}` }} />

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr', alignItems: 'center' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '0.5fr 0.7fr 1fr 0.5fr 0.5fr 0.5fr', paddingBlock: '15px' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px' }}>
                S/No
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px' }}>
                Service name
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px' }}>
                Service provider
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px' }}>Qty</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px' }}>
                Price
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.5px' }}>
                Amount
              </Typography>
            </Box>

            <Divider sx={{ border: `2px solid ${Color.textBlack}` }} />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '0.5fr 0.7fr 1fr 0.5fr 0.5fr 0.5fr',
                mt: '15px',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '-0.5px',
                }}
              >
                1
              </Typography>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {data?.order.name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '-0.5px',
                    color: Color.textHint,
                  }}
                >
                  {data?.order.metadata.categories.map((category: any, index: number) => {
                    const separator = index + 1 !== data?.order.metadata.categories.length ? ', ' : '';
                    return `${category.name}${separator}`;
                  })}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '-0.5px',
                }}
              >
                {data?.order.sellerEntityName}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '-0.5px',
                }}
              >
                1.0
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '-0.5px',
                }}
              >
                $ {data?.items[0].transaction ? data?.items[0]?.transaction.currency : 'SGD'}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '-0.5px',
                }}
              >
                $ {data?.totalAmount}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ width: '35%' }}>
              <Divider sx={{ border: `1px solid ${Color.line}` }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBlock: '10px' }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Subtotal
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  $ {data?.totalAmount}
                </Typography>
              </Box>
              <Divider sx={{ border: `1px solid ${Color.line}` }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBlock: '10px' }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Discount
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  $ {data?.discountAmount}
                </Typography>
              </Box>
              <Divider sx={{ border: `1px solid ${Color.line}` }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBlock: '10px' }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Service Fee
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  $ {data?.feeAmount}
                </Typography>
              </Box>
              <Divider sx={{ border: `1px solid ${Color.line}` }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBlock: '10px' }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Amount paid (SGD)
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  $ {calculateAmount(data?.totalAmount as number, data?.feeAmount as number, data?.discountAmount as number)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/*  */}
        </Box>

        <Box
          sx={{
            maxWidth: '1440px',
            mb: '20px',
          }}
        >
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '14px' }}>
            <Typography
              sx={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.5px', lineHeight: '24px', color: Color.textHint }}
            >
              {search.get('id')}-$ {data?.totalAmount}.00 due{' '}
              {moment(data?.items[0]?.createdAt)
                .format('DD MMM YYYY')
                .toString()}
              {''}
            </Typography>
            <Typography
              sx={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.5px', lineHeight: '24px', color: Color.textHint }}
            >
              Page 1-1
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InvoiceDetailsDocument;
