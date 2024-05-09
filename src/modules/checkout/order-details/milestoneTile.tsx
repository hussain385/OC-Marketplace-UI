import React, { useMemo } from 'react';
import { Milestone, milestoneType } from '@/common/interface/service-interface.ts';
import { ReactComponent as InitialIcon } from '@/assets/checkout/initial-dep.svg';
import { ReactComponent as FlagIcon } from '@/assets/checkout/flag.svg';
import { Box, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import ordinalSuffixOf from '@/common/utils/helpers/ordinalSuffix.ts';

interface IMilestoneTile {
  milestone: Milestone;
  currency: string;
}

export function useMilestoneSeparator(milestone: Milestone) {
  const initialMilestone = useMemo(() => milestone.items.find((e) => e.type === milestoneType.initial), [milestone.items]);
  const paymentItem = useMemo(() => milestone.items.find((e) => e.type === milestoneType.payment), [milestone.items]);
  const deliveryItem = useMemo(() => milestone.items.find((e) => e.type === milestoneType.deliverable), [milestone.items]);

  return {
    initial: initialMilestone,
    payment: paymentItem,
    delivery: deliveryItem,
  };
}

function MilestoneTile({ milestone, currency }: IMilestoneTile) {
  const { initial: initialMilestone, delivery: deliveryItem, payment: paymentItem } = useMilestoneSeparator(milestone);

  return (
    <Box className={'milestone-main'}>
      <Box className={'milestone-head'}>
        {initialMilestone ? (
          <Box className={'init'}>
            <InitialIcon width={32} height={32} color={'#96979C'} />
          </Box>
        ) : (
          <Box className={'flag-icon'}>
            <FlagIcon />
          </Box>
        )}

        <Box className={'head'}>
          <Typography>{initialMilestone ? 'Initial Deposit' : `${ordinalSuffixOf(milestone.no)} Milestone:`}</Typography>
          <Typography>
            <NumericFormat
              value={initialMilestone ? initialMilestone.price : paymentItem?.price}
              thousandSeparator
              displayType={'text'}
              prefix={`${currency} `}
              decimalScale={2}
              fixedDecimalScale
            />
          </Typography>
        </Box>
      </Box>

      <Box className={'milestone-body'}>
        {!initialMilestone && (
          <>
            <Typography className={'days'}>{deliveryItem?.deliveryDays}-day delivery</Typography>
            <Typography>{deliveryItem?.deliverableText}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default MilestoneTile;
