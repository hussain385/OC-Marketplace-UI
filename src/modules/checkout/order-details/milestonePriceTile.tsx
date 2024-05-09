import React from 'react';
import { Milestone } from '@/common/interface/service-interface.ts';
import { useMilestoneSeparator } from '@/modules/checkout/order-details/milestoneTile.tsx';
import { Box, Typography } from '@mui/material';
import { ReactComponent as InitialIcon } from '@/assets/checkout/initial-dep.svg';
import { ReactComponent as FlagIcon } from '@/assets/checkout/flag.svg';
import { NumericFormat } from 'react-number-format';
import { Color } from '@/theme.ts';

interface IMilestonePriceTile {
  milestone: Milestone;
  currency: string;
  isActive: boolean;
  isPaid: boolean;
}

function MilestonePriceTile({ milestone, currency, isActive, isPaid }: IMilestonePriceTile) {
  const { initial, payment, delivery } = useMilestoneSeparator(milestone);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&  *': { color: isActive ? '#000' : '#96979C' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {initial ? (
          <Box sx={{ width: '32px', height: '32px' }}>
            <InitialIcon width={32} height={32} />
          </Box>
        ) : (
          <Box
            sx={{
              width: '32px',
              height: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: `1px solid ${isActive ? '#000' : '#DADBDD'}`,
              borderRadius: '50px',
            }}
          >
            <FlagIcon />
          </Box>
        )}

        <Typography sx={{ fontWeight: 700 }}>
          {initial ? 'Initial deposit' : delivery?.deliverableText}{' '}
          {isPaid && (
            <Typography
              component={'span'}
              sx={{
                border: `1px solid ${Color.green2}`,
                color: Color.green2,
                padding: '3.231px 19.385px',
                borderRadius: '26.654px',
                fontWeight: 700,
                fontSize: '12px',
              }}
            >
              Paid
            </Typography>
          )}
          {isActive && (
            <Typography component={'span'} sx={{ color: Color.priBlue, fontWeight: 700 }}>
              (Due now)
            </Typography>
          )}
        </Typography>
      </Box>

      <NumericFormat
        value={initial?.price ?? payment?.price}
        displayType={'text'}
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        prefix={`${currency} `}
        style={{ fontWeight: 600 }}
      />
    </Box>
  );
}

export default MilestonePriceTile;
