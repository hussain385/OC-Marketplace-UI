import { Box, Typography } from '@mui/material';

import React, { useMemo } from 'react';

import { styled } from '@mui/system';

import { titleValue } from './service-info-box';
import { TagStatus } from '@/common/styles/tag-status.styles.tsx';
import useQueryParams from '@/common/utils/hooks/useQueryParams.tsx';
import { useGetOrderDetailsQuery } from '@/modules/servi-order/Service/order.api.ts';
import { Extra } from '@/common/interface/service-interface.ts';
import { NumericFormat } from 'react-number-format';
import MilestonePriceTile from '@/modules/checkout/order-details/milestonePriceTile.tsx';
import ordinalSuffixOf from '@/common/utils/helpers/ordinalSuffix.ts';

type Props = {
  discount: number;
  tax: number;
  servicePackage?: Extra;
};

export const PriceText = styled(Typography)(() => ({
  fontSize: '14px',
}));

export const PriceBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingInline: '0.2em',
  paddingBlock: '0.5em',
  borderBottom: '1px solid #EAEAEA',
  p: {
    fontWeight: 600,
  },
}));

export const PriceDetails = ({ servicePackage, discount }: Props) => {
  const [params] = useQueryParams();
  const orderId = useMemo(() => params.get('orderId'), [params]);
  const { data: orderData } = useGetOrderDetailsQuery(
    { orderId: orderId ?? '', params: { join: ['currentSubOrder'] } },
    { skip: !orderId },
  );
  const isEscrow = useMemo(
    () => servicePackage?.milestones?.some((e) => e.items.some((x) => x.isEscrow)),
    [servicePackage?.milestones],
  );

  const currentMilestone = useMemo(() => {
    if (orderData) {
      return servicePackage?.milestones?.find((e) => e.no === orderData.currentSubOrder.sequence);
    }

    return servicePackage?.milestones?.[0];
  }, [orderData, servicePackage?.milestones]);

  const currentIndex = useMemo(
    () => (orderData ? servicePackage?.milestones?.findIndex((e) => e.no === orderData.currentSubOrder.sequence) ?? 0 : 0),
    [orderData, servicePackage?.milestones],
  );

  return (
    <Box sx={{ border: '1px solid #EAEAEA', padding: '1em', width: '100%', marginBlock: '1em' }}>
      <Typography sx={titleValue}>Price details</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: '10px',
          background: '#F6F6F6',
          paddingBlock: '10px',
          borderRadius: '4px',
          marginTop: '10px',
        }}
      >
        {currentMilestone ? (
          <>
            <Box>
              <Typography sx={{ color: '#000', fontWeight: 600 }}>Milestone Payments</Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '12px', color: '#7E7E7E' }}>
                {ordinalSuffixOf(currentMilestone.no)} payment
              </Typography>
            </Box>
            <PriceText sx={{ fontWeight: 600, color: '#000' }}>
              <NumericFormat
                value={currentMilestone.price}
                displayType={'text'}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                prefix={`${servicePackage?.currency} `}
              />{' '}
              (of{' '}
              <NumericFormat
                value={servicePackage?.price}
                displayType={'text'}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                prefix={`${servicePackage?.currency} `}
              />
              )
            </PriceText>
          </>
        ) : (
          <>
            <Box>
              <Typography sx={{ color: '#000', fontWeight: 600 }}>
                Subscription ({servicePackage?.subscriptionCount} orders)
              </Typography>
            </Box>
            <PriceText sx={{ fontWeight: 600, color: '#000' }}>
              <NumericFormat
                value={servicePackage?.price}
                displayType={'text'}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                prefix={`${servicePackage?.currency} `}
              />{' '}
              / {servicePackage?.paymentFrequency?.replaceAll('LY', '').toLowerCase()}
            </PriceText>
          </>
        )}
      </Box>

      {currentMilestone && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginY: '16px' }}>
          {servicePackage?.milestones?.map((e, index) => (
            <MilestonePriceTile
              key={e.id}
              milestone={e}
              currency={servicePackage?.currency}
              isActive={e.id === currentMilestone.id}
              isPaid={index < currentIndex}
            />
          ))}
        </Box>
      )}

      <PriceBox>
        <Typography>Subtotal</Typography>
        <PriceText>
          <NumericFormat
            value={currentMilestone?.price ?? servicePackage?.price}
            displayType={'text'}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            prefix={`${servicePackage?.currency} `}
          />
        </PriceText>
      </PriceBox>
      <PriceBox>
        <Typography>Discount</Typography>
        <PriceText>
          <NumericFormat
            value={discount}
            displayType={'text'}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            prefix={`${servicePackage?.currency} `}
          />
        </PriceText>
      </PriceBox>

      {isEscrow && (
        <PriceBox>
          <Typography>ServiSafe fee (1%)</Typography>
          <PriceText sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2CAF70' }}>
            <TagStatus variant={'success'} sx={{ fontSize: '10px', padding: '4px', fontWeight: 700 }}>
              WAIVED
            </TagStatus>

            <NumericFormat
              value={1}
              displayType={'text'}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              style={{ textDecoration: 'line-through', color: '#000' }}
              prefix={`${servicePackage?.currency} `}
            />
          </PriceText>
        </PriceBox>
      )}

      <PriceBox>
        <Typography>Service fee (1%)</Typography>
        <PriceText sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2CAF70' }}>
          <TagStatus variant={'success'} sx={{ fontSize: '10px', padding: '4px', fontWeight: 700 }}>
            WAIVED
          </TagStatus>

          <NumericFormat
            value={1}
            displayType={'text'}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            style={{ textDecoration: 'line-through', color: '#000' }}
            prefix={`${servicePackage?.currency} `}
          />
        </PriceText>
      </PriceBox>

      <PriceBox sx={{ borderBottom: 'none', paddingBottom: 0 }}>
        <Typography>Total(SGD)</Typography>
        <PriceText sx={{ fontWeight: '700 !important', fontSize: '20px' }}>
          <NumericFormat
            value={currentMilestone?.price ?? servicePackage?.price}
            displayType={'text'}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            prefix={`${servicePackage?.currency} `}
          />
        </PriceText>
      </PriceBox>
    </Box>
  );
};
