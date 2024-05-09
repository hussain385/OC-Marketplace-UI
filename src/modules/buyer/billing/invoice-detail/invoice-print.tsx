/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { Box, Divider, Typography } from '@mui/material';
import { isEmpty, isNull, isUndefined } from 'lodash';
import React from 'react';
import { Color } from '../../../../theme';
// import { ReactComponent as Logo } from '../../../assets/logos/new_logo.svg';
import Logo from '../.././../../assets/invoice/logo.png';
import { useSearchParams } from 'react-router-dom';
import { IInvoiceItems, IInvoiceResponse, INVOICE_STATUS } from '../order/types';
import { StatusLabel } from '../../../../common/styles';
import { ccIcons, statusColor, statusIconandLabel } from './invoice-document';

type Props = {
  data: IInvoiceResponse | undefined | null;
};

const DocumentPrintInvoice = ({ data }: Props) => {
  const [search] = useSearchParams();
  const calculateAmount = (amount: number, fee: number, discount: number): number => {
    return amount + fee - discount;
  };

  const transactionId = data?.items
    .filter((item: IInvoiceItems) => !isNull(item.transaction))
    .map((item: IInvoiceItems) => {
      return item.transaction.id;
    });

  const orderId = data && ['2291', '2294'].includes(data?.status) ? 'N/A' : data?.order.id;

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
          } else {
            return (
              <Box key={`${item.id}${index}`} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StatusLabel className={INVOICE_STATUS[data?.status]}>{INVOICE_STATUS[data?.status]}</StatusLabel>
              </Box>
            );
          }
        })
      : null;
  };
  return (
    <Box className='print-details' sx={{ display: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '54px',
          padding: '17px 24px 15px 24px',
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em' }}>Transaction Details</Typography>

        <img src={Logo} alt='logo' width='132px' height='32px' />
      </Box>
      <Box sx={{ maxWidth: '100%', marginInline: 'auto', display: 'grid', gridTemplateColumnd: '1fr' }}>
        <Box
          sx={{
            width: '100%',
            mb: '24px',
            display: 'grid',
            gridTemplateColumns: '60% 40%',
            justifyItems: 'start',
            alignItems: 'start',
            paddingInline: '24px',
            mt: '24px',
          }}
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', rowGap: '13px' }}>
            <Typography sx={{ color: Color.textHint, fontWeight: 700, fontSize: '12px', letterSpacing: '-0.02em' }}>
              Transaction ID
            </Typography>
            <Typography
              sx={{
                color: Color.textBlack,
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '-0.02em',
                marginBottom: '10px',
              }}
            >
              {data?.items && data?.items.length > 0
                ? transactionId && transactionId.length > 0
                  ? transactionId
                  : 'N/A'
                : 'N/A'}
            </Typography>
            <Typography sx={{ color: Color.textHint, fontWeight: 700, fontSize: '12px', letterSpacing: '-0.02em' }}>
              Order Id
            </Typography>
            <Typography sx={{ color: Color.textBlack, fontWeight: 700, fontSize: '12px', letterSpacing: '-0.02em' }}>
              {orderId}
            </Typography>
            <Typography sx={{ color: Color.textHint, fontWeight: 700, fontSize: '12px', letterSpacing: '-0.02em' }}>
              Due Date
            </Typography>
            <Typography>
              {moment(data?.createdAt)
                .format('MMMM DD, YYYY')
                .toString() ?? ''}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Divider sx={{ border: `1px solid ${Color.line}` }} />
        </Box>
        <Box sx={{ paddingInline: '24px' }}>
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
                  sx={{
                    fontWeight: 700,
                    fontSize: '16px',
                    letterSpacing: '-0.02em',
                    color: Color.textHint,
                    lineHeight: '32px',
                  }}
                >
                  Provider Info
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
        </Box>
        <Box>
          <Divider sx={{ border: `1px solid ${Color.line}` }} />
        </Box>
        {/** Payment Method */}
        <Box sx={{ paddingInline: '24px' }}>
          <Box sx={{ mt: '24px', display: 'flex', gap: '104px', mb: '24px' }}>
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
                Payment method
              </Typography>
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
        </Box>
        <Divider sx={{ border: `1px solid ${Color.line}` }} />
        <Box sx={{ paddingInline: '24px' }}>
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
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            left: 0,
            right: 0,
            maxWidth: '595px',
            marginInline: 'auto',
            paddingInline: '20px',
            mb: '20px',
          }}
        >
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '14px' }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '-0.5px',
                lineHeight: '24px',
                color: Color.textHint,
              }}
            >
              {search.get('id')}-$ {data?.totalAmount}.00 due{' '}
              {moment(data?.items[0]?.createdAt)
                .format('DD MMM YYYY')
                .toString()}
              {''}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '-0.5px',
                lineHeight: '24px',
                color: Color.textHint,
              }}
            >
              Page 1-1
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentPrintInvoice;
